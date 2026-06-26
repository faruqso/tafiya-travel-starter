function readCatalog(root) {
  const node = root.querySelector('[data-booking-catalog-json]');
  if (!node) return null;
  try {
    return JSON.parse(node.textContent);
  } catch {
    return null;
  }
}

function getQueryPrefill() {
  const params = new URLSearchParams(window.location.search);
  return {
    kind: params.get('kind')?.trim() ?? '',
    item: params.get('item')?.trim() ?? '',
  };
}

function isCatalogKind(catalog, kind) {
  return Boolean(kind && catalog[kind]);
}

function findItemBySlug(catalog, slug) {
  for (const kind of ['destinations', 'hotels', 'flights']) {
    const list = catalog[kind];
    if (!list) continue;
    const item = list.find((entry) => entry.slug === slug);
    if (item) return { kind, item };
  }
  return null;
}

function findItem(catalog, kind, slug) {
  const list = catalog?.[kind];
  if (!list) return null;
  return list.find((entry) => entry.slug === slug) ?? null;
}

function optionLabel(entry) {
  return `${entry.name} — from ${entry.priceFrom}`;
}

function populateItemSelect(itemSelect, catalog, kind, selectedSlug) {
  const list = catalog[kind] ?? [];
  itemSelect.innerHTML = '<option value="">Select…</option>';
  list.forEach((entry) => {
    const option = document.createElement('option');
    option.value = entry.slug;
    option.textContent = optionLabel(entry);
    if (entry.slug === selectedSlug) {
      option.selected = true;
    }
    itemSelect.appendChild(option);
  });
}

function updateSummary(root, entry) {
  const summary = root.querySelector('[data-booking-summary]');
  if (!summary) return;

  if (!entry) {
    summary.hidden = true;
    return;
  }

  summary.hidden = false;
  summary.querySelector('[data-booking-summary-name]').textContent = entry.name;
  summary.querySelector('[data-booking-summary-meta]').textContent = entry.subtitle;
  summary.querySelector('[data-booking-summary-badge]').textContent = entry.badge;
  summary.querySelector('[data-booking-summary-price]').textContent = entry.priceFrom;
  summary.querySelector('[data-booking-summary-region]').textContent = entry.region;

  const durationField = root.querySelector('[name="duration"]');
  if (durationField) {
    durationField.value = entry.subtitle ?? '';
  }

  const priceField = root.querySelector('[name="estimatedPrice"]');
  if (priceField) {
    priceField.value = entry.priceFrom ?? '';
  }
}

function syncSelection(root, catalog) {
  const kindSelect = root.querySelector('[name="kind"]');
  const itemSelect = root.querySelector('[name="item"]');
  if (!kindSelect || !itemSelect) return;

  const kind = kindSelect.value;
  const slug = itemSelect.value;
  const entry = slug ? findItem(catalog, kind, slug) : null;
  updateSummary(root, entry);
}

function resolveClientPrefill(catalog, root) {
  const query = getQueryPrefill();

  if (query.item) {
    const match = findItemBySlug(catalog, query.item);
    if (match) {
      return { kind: match.kind, itemSlug: match.item.slug };
    }
  }

  const kind = isCatalogKind(catalog, query.kind)
    ? query.kind
    : isCatalogKind(catalog, root.dataset.prefillKind)
      ? root.dataset.prefillKind
      : 'destinations';

  const itemSlug =
    query.item ||
    (isCatalogKind(catalog, kind) && findItem(catalog, kind, root.dataset.prefillItem || '')
      ? root.dataset.prefillItem
      : '') ||
    '';

  return { kind, itemSlug };
}

function initBookingForm(root) {
  const catalog = readCatalog(root);
  if (!catalog) return;

  const kindSelect = root.querySelector('[name="kind"]');
  const itemSelect = root.querySelector('[name="item"]');
  if (!kindSelect || !itemSelect) return;

  const { kind, itemSlug } = resolveClientPrefill(catalog, root);

  kindSelect.value = kind;
  populateItemSelect(itemSelect, catalog, kind, itemSlug);
  syncSelection(root, catalog);

  kindSelect.addEventListener('change', () => {
    populateItemSelect(itemSelect, catalog, kindSelect.value, '');
    syncSelection(root, catalog);
  });

  itemSelect.addEventListener('change', () => {
    syncSelection(root, catalog);
  });
}

function bootBookingForms() {
  document.querySelectorAll('[data-booking-form]').forEach((root) => {
    initBookingForm(root);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootBookingForms);
} else {
  bootBookingForms();
}

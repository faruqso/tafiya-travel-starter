function getCheckedValues(root, selector) {
  return [...root.querySelectorAll(selector)]
    .filter((input) => input instanceof HTMLInputElement && input.checked)
    .map((input) => input.value);
}

function formatPrice(value, kind) {
  const amount = Number(value);

  if (kind === 'hotels' || kind === 'flights') {
    return `$${amount.toLocaleString()}`;
  }

  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}k`;
  }

  return `$${amount.toLocaleString()}`;
}

function isMobileLayout() {
  return window.matchMedia('(max-width: 1024px)').matches;
}

const CATALOG_VIEWS = ['grid-2', 'grid-3', 'list'];
const CATALOG_VIEW_STORAGE_KEY = 'tafiya-catalog-view';
const DEFAULT_CATALOG_VIEW = 'grid-3';
const LEGACY_VIEWS = new Set(['grid-4', 'compact']);

function isValidView(view) {
  return CATALOG_VIEWS.includes(view);
}

function normalizeView(view) {
  if (LEGACY_VIEWS.has(view)) return DEFAULT_CATALOG_VIEW;
  return isValidView(view) ? view : DEFAULT_CATALOG_VIEW;
}

function readStoredView() {
  try {
    const stored = localStorage.getItem(CATALOG_VIEW_STORAGE_KEY);
    return normalizeView(stored ?? DEFAULT_CATALOG_VIEW);
  } catch {
    return DEFAULT_CATALOG_VIEW;
  }
}

function storeView(view) {
  try {
    localStorage.setItem(CATALOG_VIEW_STORAGE_KEY, view);
  } catch {
    /* ignore */
  }
}

function applyViewMode(grid, view) {
  if (!(grid instanceof HTMLElement)) return;
  const nextView = normalizeView(view);
  grid.dataset.view = nextView;

  grid.closest('[data-catalog-index]')?.querySelectorAll('[data-catalog-view]').forEach((button) => {
    if (!(button instanceof HTMLButtonElement)) return;
    const isActive = button.dataset.catalogView === nextView;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function getFilterPanel(root) {
  const target = isMobileLayout() ? 'mobile' : 'desktop';
  return root.querySelector(`[data-catalog-filter="${target}"]`);
}

function getSearchInput(root) {
  return root.querySelector('[data-catalog-search]');
}

function getSearchClearButton(root) {
  return root.querySelector('[data-catalog-search-clear]');
}

function syncSearchClearButton(root, query) {
  const clearButton = getSearchClearButton(root);
  if (clearButton instanceof HTMLButtonElement) {
    clearButton.hidden = !query.trim();
  }
}

function readFilters(root, filterRoot, maxPrice) {
  const sortSelect = root.querySelector('[data-catalog-sort]');
  const searchInput = getSearchInput(root);
  const search = searchInput instanceof HTMLInputElement ? searchInput.value : '';

  if (!filterRoot) {
    return {
      regions: [],
      categories: [],
      stars: [],
      cabins: [],
      maxPrice,
      sort: sortSelect instanceof HTMLSelectElement ? sortSelect.value : 'featured',
      search,
    };
  }

  const priceInput = filterRoot.querySelector('[data-catalog-price]');

  return {
    regions: getCheckedValues(filterRoot, '[data-catalog-region]'),
    categories: getCheckedValues(filterRoot, '[data-catalog-category]'),
    stars: getCheckedValues(filterRoot, '[data-catalog-stars]').map(Number),
    cabins: getCheckedValues(filterRoot, '[data-catalog-cabin]'),
    maxPrice: priceInput instanceof HTMLInputElement ? Number(priceInput.value) : maxPrice,
    sort: sortSelect instanceof HTMLSelectElement ? sortSelect.value : 'featured',
    search,
  };
}

function writeFilters(root, filterRoot, filters, maxPrice) {
  const sortSelect = root.querySelector('[data-catalog-sort]');
  const searchInput = getSearchInput(root);

  if (sortSelect instanceof HTMLSelectElement) sortSelect.value = filters.sort;
  if (searchInput instanceof HTMLInputElement) searchInput.value = filters.search ?? '';
  syncSearchClearButton(root, filters.search ?? '');

  if (!filterRoot) return;

  const priceInput = filterRoot.querySelector('[data-catalog-price]');

  if (priceInput instanceof HTMLInputElement) {
    priceInput.value = String(filters.maxPrice ?? maxPrice);
  }

  const setChecks = (selector, values) => {
    const set = new Set(values);
    filterRoot.querySelectorAll(selector).forEach((input) => {
      if (input instanceof HTMLInputElement) {
        input.checked = set.has(input.value);
      }
    });
  };

  setChecks('[data-catalog-region]', filters.regions);
  setChecks('[data-catalog-category]', filters.categories);
  setChecks('[data-catalog-stars]', filters.stars.map(String));
  setChecks('[data-catalog-cabin]', filters.cabins);
}

function syncFilterPanels(root, filters, maxPrice, kind) {
  const desktop = root.querySelector('[data-catalog-filter="desktop"]');
  const mobile = root.querySelector('[data-catalog-filter="mobile"]');

  writeFilters(root, desktop, filters, maxPrice);
  writeFilters(root, mobile, filters, maxPrice);
  updatePriceDisplay(desktop, kind);
  updatePriceDisplay(mobile, kind);
}

function sortItems(items, sort) {
  const sorted = [...items];

  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.priceValue - b.priceValue || a.name.localeCompare(b.name));
    case 'price-desc':
      return sorted.sort((a, b) => b.priceValue - a.priceValue || a.name.localeCompare(b.name));
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating || a.priceValue - b.priceValue);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'featured':
    default:
      return sorted.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating || a.priceValue - b.priceValue,
      );
  }
}

function filterItems(items, filters, pageKind) {
  const query = filters.search?.trim().toLowerCase() ?? '';

  return items.filter((item) => {
    if (item.kind !== pageKind) return false;
    if (query && !String(item.searchText ?? '').includes(query)) return false;
    if (filters.regions.length && !filters.regions.includes(item.region)) return false;
    if (Number(item.priceValue) > Number(filters.maxPrice)) return false;

    if (pageKind === 'destinations' && filters.categories.length) {
      if (!item.category || !filters.categories.includes(item.category)) return false;
    }

    if (pageKind === 'hotels' && filters.stars.length) {
      const matchesStar = filters.stars.some((minStars) => Number(item.stars) >= minStars);
      if (!matchesStar) return false;
    }

    if (pageKind === 'flights' && filters.cabins.length) {
      if (!item.cabin || !filters.cabins.includes(item.cabin)) return false;
    }

    return true;
  });
}

function countActiveFilters(filters, maxPrice) {
  let count = 0;

  if (filters.regions.length) count += filters.regions.length;
  if (filters.categories.length) count += filters.categories.length;
  if (filters.stars.length) count += filters.stars.length;
  if (filters.cabins.length) count += filters.cabins.length;
  if (Number(filters.maxPrice) < maxPrice) count += 1;

  return count;
}

function parseFilterLabels(root) {
  try {
    return JSON.parse(root.dataset.filterLabels ?? '{}');
  } catch {
    return {};
  }
}

function buildActiveFilterEntries(filters, maxPrice, labels, kind) {
  const entries = [];

  filters.regions.forEach((value) => {
    entries.push({
      key: 'region',
      value,
      label: labels.regions?.[value] ?? value,
    });
  });

  filters.categories.forEach((value) => {
    entries.push({
      key: 'category',
      value,
      label: labels.categories?.[value] ?? value,
    });
  });

  filters.stars.forEach((value) => {
    entries.push({
      key: 'stars',
      value: String(value),
      label: `${value}+ ${labels.starsShort ?? 'stars'}`,
    });
  });

  filters.cabins.forEach((value) => {
    entries.push({
      key: 'cabin',
      value,
      label: labels.cabins?.[value] ?? value,
    });
  });

  if (Number(filters.maxPrice) < maxPrice) {
    entries.push({
      key: 'maxPrice',
      value: String(filters.maxPrice),
      label: `${labels.priceLabel ?? 'Max price'}: ${formatPrice(filters.maxPrice, kind)}`,
    });
  }

  if (filters.search?.trim()) {
    entries.push({
      key: 'search',
      value: filters.search.trim(),
      label: `"${filters.search.trim()}"`,
    });
  }

  return entries;
}

function renderActiveFilters(root, filters, maxPrice, kind, onRemove) {
  const container = root.querySelector('[data-catalog-active-filters]');
  if (!(container instanceof HTMLElement)) return;

  const labels = parseFilterLabels(root);
  const entries = buildActiveFilterEntries(filters, maxPrice, labels, kind);

  container.innerHTML = '';

  if (!entries.length) {
    container.hidden = true;
    return;
  }

  container.hidden = false;

  entries.forEach((entry) => {
    const chip = document.createElement('span');
    chip.className = 'catalog-active-filters__chip';

    const text = document.createElement('span');
    text.textContent = entry.label;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.setAttribute('aria-label', `${labels.removeFilter ?? 'Remove'} ${entry.label}`);
    remove.textContent = '×';
    remove.addEventListener('click', () => onRemove(entry.key, entry.value));

    chip.append(text, remove);
    container.appendChild(chip);
  });

  const clearAll = document.createElement('button');
  clearAll.type = 'button';
  clearAll.className = 'catalog-active-filters__clear';
  clearAll.textContent = labels.clearAll ?? 'Clear all';
  clearAll.addEventListener('click', () => onRemove('all'));
  container.appendChild(clearAll);
}

function syncUrl(filters, page, view) {
  const params = new URLSearchParams();

  if (filters.sort && filters.sort !== 'featured') params.set('sort', filters.sort);
  if (view && view !== DEFAULT_CATALOG_VIEW) params.set('view', view);
  if (filters.regions.length) params.set('region', filters.regions.join(','));
  if (filters.categories.length) params.set('category', filters.categories.join(','));
  if (filters.stars.length) params.set('stars', filters.stars.join(','));
  if (filters.cabins.length) params.set('cabin', filters.cabins.join(','));
  if (Number(filters.maxPrice)) params.set('maxPrice', String(filters.maxPrice));
  if (filters.search?.trim()) params.set('q', filters.search.trim());
  if (page > 1) params.set('page', String(page));

  const query = params.toString();
  const next = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, '', next);
}

function applyUrlToFilters(root, maxPrice) {
  const params = new URLSearchParams(window.location.search);
  const filters = {
    regions: params.get('region')?.split(',').filter(Boolean) ?? [],
    categories: params.get('category')?.split(',').filter(Boolean) ?? [],
    stars: params.get('stars')?.split(',').filter(Boolean).map(Number) ?? [],
    cabins: params.get('cabin')?.split(',').filter(Boolean) ?? [],
    maxPrice: params.get('maxPrice') ? Number(params.get('maxPrice')) : maxPrice,
    sort: params.get('sort') ?? 'featured',
    search: params.get('q') ?? '',
  };

  const viewParam = params.get('view');
  const view = normalizeView(viewParam ?? readStoredView());
  const grid = root.querySelector('[data-catalog-grid]');
  applyViewMode(grid, view);
  storeView(view);

  syncFilterPanels(root, filters, maxPrice, root.dataset.kind);
  return {
    page: Number(params.get('page') ?? 1),
    view,
  };
}

function renderPagination(container, page, totalPages, onChange) {
  container.innerHTML = '';

  if (totalPages <= 1) return;

  const createButton = (label, targetPage, disabled = false, active = false) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.className = 'catalog-pagination__btn';
    if (active) button.classList.add('is-active');
    button.disabled = disabled;
    button.addEventListener('click', () => onChange(targetPage));
    return button;
  };

  container.appendChild(createButton('←', page - 1, page === 1));

  for (let index = 1; index <= totalPages; index += 1) {
    container.appendChild(createButton(String(index), index, false, index === page));
  }

  container.appendChild(createButton('→', page + 1, page === totalPages));
}

function updatePriceDisplay(filterRoot, kind) {
  if (!filterRoot) return;

  const priceInput = filterRoot.querySelector('[data-catalog-price]');
  const displays = filterRoot.querySelectorAll('[data-catalog-price-display]');

  if (!(priceInput instanceof HTMLInputElement)) return;

  const formatted = formatPrice(priceInput.value, kind);
  displays.forEach((node) => {
    node.textContent = formatted;
  });
}

function reorderCards(grid, cardsBySlug, orderedSlugs) {
  const fragment = document.createDocumentFragment();

  orderedSlugs.forEach((slug) => {
    const card = cardsBySlug.get(slug);
    if (card) fragment.appendChild(card);
  });

  cardsBySlug.forEach((card, slug) => {
    if (!orderedSlugs.includes(slug)) fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

function setDrawerOpen(drawer, open, root) {
  if (!(drawer instanceof HTMLElement)) return;

  const openButton = root?.querySelector('[data-catalog-filter-open]');

  if (open) {
    drawer.hidden = false;
    requestAnimationFrame(() => drawer.classList.add('is-open'));
    document.body.classList.add('catalog-filter-open');
    if (openButton instanceof HTMLButtonElement) openButton.setAttribute('aria-expanded', 'true');
  } else {
    drawer.classList.remove('is-open');
    document.body.classList.remove('catalog-filter-open');
    if (openButton instanceof HTMLButtonElement) openButton.setAttribute('aria-expanded', 'false');
    window.setTimeout(() => {
      if (!drawer.classList.contains('is-open')) drawer.hidden = true;
    }, 320);
  }
}

function loadCatalogItems(root) {
  const script = root.parentElement?.querySelector('[data-catalog-items]');
  if (!(script instanceof HTMLScriptElement) || !script.textContent) return [];
  try {
    return JSON.parse(script.textContent);
  } catch {
    return [];
  }
}

const CATALOG_DESKTOP_MIN_WIDTH = 1025;
const CATALOG_FILTER_STICKY_GAP = 16;

function readCssLengthPx(value, context = document.documentElement) {
  const raw = getComputedStyle(context).getPropertyValue(value).trim();
  if (!raw) return 0;
  const probe = document.createElement('div');
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.width = raw;
  document.body.appendChild(probe);
  const px = probe.getBoundingClientRect().width;
  probe.remove();
  return px;
}

function initCatalogStickyFilterLayout(root) {
  const stickyHead = root.querySelector('.catalog-index__sticky-head');
  const filterWrap = root.querySelector('[data-catalog-filter-wrap]');
  const filterPanel = root.querySelector('.catalog-filter--desktop');
  const filterBody = root.querySelector('[data-catalog-filter-scroll]');

  if (
    !(stickyHead instanceof HTMLElement) ||
    !(filterWrap instanceof HTMLElement) ||
    !(filterPanel instanceof HTMLElement) ||
    !(filterBody instanceof HTMLElement)
  ) {
    return () => {};
  }

  let isSticky = false;

  const onWheel = (event) => {
    if (!isSticky || filterBody.scrollHeight <= filterBody.clientHeight + 1) return;

    const { scrollTop, scrollHeight, clientHeight } = filterBody;
    const delta = event.deltaY;
    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

    if ((delta < 0 && !atTop) || (delta > 0 && !atBottom)) {
      event.stopPropagation();
    }
  };

  filterBody.addEventListener('wheel', onWheel, { passive: true });

  const getStickyTop = () => {
    const toolbarHeight = stickyHead.offsetHeight;
    const headerHeight = readCssLengthPx('--header-height');
    return headerHeight + toolbarHeight + CATALOG_FILTER_STICKY_GAP;
  };

  const sync = () => {
    if (!window.matchMedia(`(min-width: ${CATALOG_DESKTOP_MIN_WIDTH}px)`).matches) {
      filterPanel.classList.remove('is-sticky');
      isSticky = false;
      root.style.removeProperty('--catalog-toolbar-sticky-height');
      root.style.removeProperty('--catalog-filter-sticky-gap');
      return;
    }

    const toolbarHeight = stickyHead.offsetHeight;
    root.style.setProperty('--catalog-toolbar-sticky-height', `${toolbarHeight}px`);
    root.style.setProperty('--catalog-filter-sticky-gap', `${CATALOG_FILTER_STICKY_GAP}px`);

    const stickyTop = getStickyTop();
    const panelRect = filterPanel.getBoundingClientRect();
    const wrapRect = filterWrap.getBoundingClientRect();
    const nextSticky = panelRect.top <= stickyTop + 1 && wrapRect.bottom > panelRect.bottom + 1;

    if (nextSticky !== isSticky) {
      isSticky = nextSticky;
      filterPanel.classList.toggle('is-sticky', nextSticky);
    }
  };

  const scheduleSync = () => {
    window.requestAnimationFrame(sync);
  };

  let resizeObserver;
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(scheduleSync);
    resizeObserver.observe(stickyHead);
    resizeObserver.observe(filterPanel);
    resizeObserver.observe(filterWrap);
  }

  window.addEventListener('scroll', scheduleSync, { passive: true });
  window.addEventListener('resize', scheduleSync, { passive: true });
  scheduleSync();

  return scheduleSync;
}

function initCatalogIndex(root) {
  if (root.dataset.initialized === 'true') return;
  root.dataset.initialized = 'true';

  const kind = root.dataset.kind;
  const pageSize = Number(root.dataset.pageSize ?? 9);
  const maxPrice = Number(root.dataset.maxPrice ?? Infinity);
  const items = loadCatalogItems(root);
  const grid = root.querySelector('[data-catalog-grid]');
  const empty = root.querySelector('[data-catalog-empty]');
  const countEl = root.querySelector('[data-catalog-count]');
  const pagination = root.querySelector('[data-catalog-pagination]');
  const filterWrap = root.querySelector('[data-catalog-filter-wrap]');
  const drawer = root.querySelector('[data-catalog-filter-drawer]');
  const activeCount = root.querySelector('[data-catalog-active-count]');
  const sortSelect = root.querySelector('[data-catalog-sort]');

  if (!(grid instanceof HTMLElement) || !kind || !items.length) return;

  const cards = [...grid.querySelectorAll('[data-catalog-card]')];
  const cardsBySlug = new Map(
    cards.map((card) => [card instanceof HTMLElement ? card.dataset.slug : '', card]).filter(([slug]) => slug),
  );

  let currentPage = 1;
  let currentView = DEFAULT_CATALOG_VIEW;
  const syncStickyFilterLayout = initCatalogStickyFilterLayout(root);

  const initialState = applyUrlToFilters(root, maxPrice);
  currentPage = initialState.page;
  currentView = initialState.view;

  const render = ({ scrollToTop = false } = {}) => {
    const filterRoot = getFilterPanel(root);
    const filters = readFilters(root, filterRoot, maxPrice);
    syncFilterPanels(root, filters, maxPrice, kind);

    const filtered = filterItems(sortItems(items, filters.sort), filters, kind);
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.min(Math.max(currentPage, 1), totalPages);

    const startIndex = (currentPage - 1) * pageSize;
    const pageItems = filtered.slice(startIndex, startIndex + pageSize);
    const visibleSlugs = new Set(pageItems.map((item) => item.slug));

    reorderCards(grid, cardsBySlug, filtered.map((item) => item.slug));

    cardsBySlug.forEach((card, slug) => {
      if (card instanceof HTMLElement) {
        card.hidden = !visibleSlugs.has(slug);
      }
    });

    if (countEl) {
      const showingLabel = root.dataset.showingLabel ?? 'Showing';
      const ofLabel = root.dataset.ofLabel ?? 'of';
      const resultsLabel = root.dataset.resultsLabel ?? 'results';

      if (filtered.length === 0) {
        countEl.textContent = root.dataset.emptyLabel ?? 'No results';
      } else {
        const start = startIndex + 1;
        const end = startIndex + pageItems.length;
        countEl.textContent = `${showingLabel} ${start}–${end} ${ofLabel} ${filtered.length} ${resultsLabel}`;
      }
    }

    if (empty instanceof HTMLElement) empty.hidden = filtered.length > 0;

    if (pagination instanceof HTMLElement) {
      renderPagination(pagination, currentPage, totalPages, (page) => {
        currentPage = page;
        render({ scrollToTop: true });
      });
    }

    if (activeCount instanceof HTMLElement) {
      const active = countActiveFilters(filters, maxPrice);
      activeCount.textContent = String(active);
      activeCount.hidden = active === 0;
    }

    renderActiveFilters(root, filters, maxPrice, kind, (key, value) => {
      const filterRootCurrent = getFilterPanel(root);
      const next = readFilters(root, filterRootCurrent, maxPrice);

      if (key === 'all') {
        resetFilters();
        return;
      }

      if (key === 'region') next.regions = next.regions.filter((item) => item !== value);
      if (key === 'category') next.categories = next.categories.filter((item) => item !== value);
      if (key === 'stars') next.stars = next.stars.filter((item) => String(item) !== value);
      if (key === 'cabin') next.cabins = next.cabins.filter((item) => item !== value);
      if (key === 'maxPrice') next.maxPrice = maxPrice;
      if (key === 'search') next.search = '';

      syncFilterPanels(root, next, maxPrice, kind);
      currentPage = 1;
      render();
    });

    syncUrl(filters, currentPage, currentView);
    applyViewMode(grid, currentView);
    syncStickyFilterLayout();

    if (scrollToTop) {
      grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetFilters = () => {
    const defaults = {
      regions: [],
      categories: [],
      stars: [],
      cabins: [],
      maxPrice,
      sort: 'featured',
      search: '',
    };

    syncFilterPanels(root, defaults, maxPrice, kind);
    currentPage = 1;
    render();
  };

  const onFilterChange = () => {
    currentPage = 1;
    render();
  };

  root.querySelectorAll('[data-catalog-filter]').forEach((panel) => {
    panel.addEventListener('change', onFilterChange);
    panel.addEventListener('input', (event) => {
      if (event.target instanceof HTMLInputElement && event.target.matches('[data-catalog-price]')) {
        onFilterChange();
      }
    });
  });

  sortSelect?.addEventListener('change', onFilterChange);

  const searchInput = getSearchInput(root);
  const searchClear = getSearchClearButton(root);
  let searchTimer;

  const onSearchChange = () => {
    syncSearchClearButton(root, searchInput instanceof HTMLInputElement ? searchInput.value : '');
    currentPage = 1;
    render();
  };

  searchInput?.addEventListener('input', () => {
    if (searchInput instanceof HTMLInputElement) {
      syncSearchClearButton(root, searchInput.value);
    }
    window.clearTimeout(searchTimer);
    searchTimer = window.setTimeout(onSearchChange, 200);
  });

  searchInput?.addEventListener('search', onSearchChange);

  searchClear?.addEventListener('click', () => {
    if (searchInput instanceof HTMLInputElement) {
      searchInput.value = '';
      searchInput.focus();
    }
    onSearchChange();
  });

  root.querySelectorAll('[data-catalog-view]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!(button instanceof HTMLButtonElement)) return;
      const nextView = button.dataset.catalogView;
      if (!isValidView(nextView) || nextView === currentView) return;
      currentView = nextView;
      storeView(nextView);
      applyViewMode(grid, nextView);
      syncUrl(readFilters(root, getFilterPanel(root), maxPrice), currentPage, currentView);
    });
  });

  filterWrap?.querySelectorAll('[data-catalog-reset]').forEach((button) => {
    button.addEventListener('click', resetFilters);
  });

  filterWrap?.querySelector('[data-catalog-apply]')?.addEventListener('click', () => {
    render();
    setDrawerOpen(drawer, false, root);
  });

  root.querySelector('[data-catalog-filter-open]')?.addEventListener('click', () => {
    setDrawerOpen(drawer, true, root);
  });

  filterWrap?.querySelectorAll('[data-catalog-filter-close]').forEach((button) => {
    button.addEventListener('click', () => setDrawerOpen(drawer, false, root));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer instanceof HTMLElement && drawer.classList.contains('is-open')) {
      setDrawerOpen(drawer, false, root);
    }
  });

  window.addEventListener('resize', () => {
    render();
    syncStickyFilterLayout();
  });

  render();
  syncSearchClearButton(root, searchInput instanceof HTMLInputElement ? searchInput.value : '');
}

function bootCatalog() {
  document.querySelectorAll('[data-catalog-index]').forEach((root) => {
    if (root instanceof HTMLElement) initCatalogIndex(root);
  });
}

bootCatalog();
document.addEventListener('astro:page-load', () => {
  document.querySelectorAll('[data-catalog-index]').forEach((root) => {
    if (root instanceof HTMLElement) delete root.dataset.initialized;
  });
  bootCatalog();
});

const MOCK_AUTH = {
  email: 'traveler@tafiya.co',
  password: 'demo123',
  name: 'Alex Morgan',
  sessionKey: 'tafiya_mock_session',
};

function getSession() {
  try {
    const raw = sessionStorage.getItem(MOCK_AUTH.sessionKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setSession(session) {
  sessionStorage.setItem(MOCK_AUTH.sessionKey, JSON.stringify(session));
}

function clearSession() {
  sessionStorage.removeItem(MOCK_AUTH.sessionKey);
}

function isBookingsPath(pathname) {
  return /\/bookings\/?$/.test(pathname);
}

function getLoginPath() {
  const root = document.documentElement;
  const locale = root.lang && root.lang !== 'en' ? `/${root.lang}` : '';
  return `${locale}/login`;
}

function getBookingsPath() {
  const root = document.documentElement;
  const locale = root.lang && root.lang !== 'en' ? `/${root.lang}` : '';
  return `${locale}/bookings`;
}

function guardBookingsPage() {
  if (!isBookingsPath(window.location.pathname)) return;

  if (!getSession()) {
    const next = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.replace(`${getLoginPath()}?next=${next}`);
  }
}

function initLoginForm() {
  const form = document.querySelector('[data-mock-login]');
  if (!form || form.dataset.mockAuthBound === 'true') return;

  form.dataset.mockAuthBound = 'true';

  const status = form.querySelector('[data-mock-login-status]');
  const emailInput = form.querySelector('input[name="email"]');
  const passwordInput = form.querySelector('input[name="password"]');
  const defaultRedirect = form.dataset.defaultRedirect || getBookingsPath();

  const fillFields = () => {
    if (emailInput) {
      emailInput.value = MOCK_AUTH.email;
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (passwordInput) {
      passwordInput.value = MOCK_AUTH.password;
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (status) {
      status.textContent = '';
      status.classList.remove('is-error', 'is-success');
    }
  };

  document.querySelectorAll('[data-mock-fill]').forEach((fillDemo) => {
    if (fillDemo.dataset.mockFillBound === 'true') return;
    fillDemo.dataset.mockFillBound = 'true';
    fillDemo.addEventListener('click', fillFields);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput?.value.trim().toLowerCase() ?? '';
    const password = passwordInput?.value ?? '';

    if (email !== MOCK_AUTH.email || password !== MOCK_AUTH.password) {
      if (status) {
        status.textContent = 'Invalid email or password. Use the demo credentials below.';
        status.classList.add('is-error');
        status.classList.remove('is-success');
      }
      return;
    }

    setSession({
      email: MOCK_AUTH.email,
      name: MOCK_AUTH.name,
      signedInAt: new Date().toISOString(),
    });

    const params = new URLSearchParams(window.location.search);
    const next = params.get('next');
    const redirect = next && next.startsWith('/') ? next : defaultRedirect;
    window.location.assign(redirect);
  });
}

function initNavAuth() {
  const session = getSession();
  const guest = document.querySelector('[data-nav-guest]');
  const authed = document.querySelector('[data-nav-authed]');
  const userLabel = document.querySelector('[data-nav-user]');
  const bookingsLink = document.querySelector('[data-nav-bookings]');

  if (!guest || !authed) return;

  if (session) {
    guest.hidden = true;
    authed.hidden = false;
    if (userLabel) userLabel.textContent = session.name || session.email;
    if (bookingsLink) bookingsLink.hidden = false;
  } else {
    guest.hidden = false;
    authed.hidden = true;
  }
}

function initLogoutButtons() {
  document.querySelectorAll('[data-mock-logout]').forEach((button) => {
    button.addEventListener('click', () => {
      clearSession();
      const loginPath = button.dataset.logoutRedirect || getLoginPath();
      window.location.assign(loginPath);
    });
  });
}

function initMockAuth() {
  redirectIfAuthedOnLogin();
  guardBookingsPage();
  initLoginForm();
  initNavAuth();
  initLogoutButtons();
}

function redirectIfAuthedOnLogin() {
  if (!/\/login\/?$/.test(window.location.pathname)) return;
  if (!getSession()) return;

  const params = new URLSearchParams(window.location.search);
  const next = params.get('next');
  window.location.replace(next && next.startsWith('/') ? next : getBookingsPath());
}

initMockAuth();
document.addEventListener('astro:page-load', initMockAuth);

async function submitJsonForm(form, endpoint) {
  const status = form.querySelector('[data-form-status]');
  const submit = form.querySelector('[type="submit"]');
  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  status.textContent = '';
  status.classList.remove('is-error', 'is-success');
  submit.disabled = true;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Submission failed.');
    }

    status.textContent = form.dataset.successMessage || 'Thank you! We will be in touch soon.';
    status.classList.add('is-success');
    form.reset();
  } catch (error) {
    status.textContent = error.message || 'Something went wrong. Please try again.';
    status.classList.add('is-error');
  } finally {
    submit.disabled = false;
  }
}

document.querySelectorAll('[data-json-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitJsonForm(form, form.dataset.endpoint);
  });
});

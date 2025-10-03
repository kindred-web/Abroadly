const form = document.getElementById('waitlistForm');
const responseEl = document.getElementById('formResponse');
const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    responseEl.textContent = 'Sending…';
    responseEl.style.color = '#666';
    if (submitBtn) submitBtn.disabled = true;

    try {
      const formData = new FormData(form);

      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });

      if (res.ok || res.status === 0) {
        responseEl.textContent = '🎉 Thanks — you’re on the waitlist!';
        responseEl.style.color = 'green';
        form.reset();
      } else {
        responseEl.textContent = '⚠️ Something went wrong — please try again.';
        responseEl.style.color = 'red';
        console.error('Form submit status:', res.status, res);
      }
    } catch (err) {
      console.error('Form submit error', err);
      responseEl.textContent = '❌ Unable to submit — check your connection.';
      responseEl.style.color = 'red';
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

// Image fallback
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      const isHero = img.closest('.hero') != null;
      img.src = isHero
        ? 'https://via.placeholder.com/1600x900.png?text=Hero+Image'
        : 'https://via.placeholder.com/420x300.png?text=Image+Unavailable';
    });
  });
});

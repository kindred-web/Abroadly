// Waitlist form submission — posts to your Google Apps Script web app.
// Shows a friendly inline message. No page reload.
const form = document.getElementById('waitlistForm');
const responseEl = document.getElementById('formResponse');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    responseEl.textContent = 'Sending…';
    responseEl.style.color = '#666';

    try {
      const formData = new FormData(form);

      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });

      // Accept 2xx or status 0 (some deployments)
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
    }
  });
}

// Image fallback handler — if an image fails to load, replace with placeholder
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.src = 'https://via.placeholder.com/420x300.png?text=Image+Unavailable';
    });
  });
});

// Waitlist form submission — posts to your Google Apps Script web app.
// Shows a friendly inline message. No page reload.

const form = document.getElementById('waitlistForm');
const responseEl = document.getElementById('formResponse');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // show loading text
    responseEl.textContent = 'Sending…';
    responseEl.style.color = '#666';

    try {
      const formData = new FormData(form);

      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        // Do not set mode:no-cors here; allow normal response if possible.
      });

      // Google Apps Script sometimes returns 200 with CORS; treat status 200-299 as OK
      if (res.ok || res.status === 0) {
        responseEl.textContent = '🎉 Thanks — you’re on the waitlist!';
        responseEl.style.color = 'green';
        form.reset();
      } else {
        // Non-OK status
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

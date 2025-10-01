document.getElementById("waitlistForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const responseElement = document.getElementById("formResponse");

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      responseElement.textContent = "🎉 Thanks for joining the waitlist!";
      responseElement.style.color = "green";
      form.reset();
    } else {
      responseElement.textContent = "Something went wrong. Please try again.";
      responseElement.style.color = "red";
    }
  } catch (err) {
    responseElement.textContent = "Error: Unable to connect.";
    responseElement.style.color = "red";
  }
});

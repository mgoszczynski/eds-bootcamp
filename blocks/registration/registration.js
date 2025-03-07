export default async function decorate($block) {
  // Create form element
  const form = document.createElement('form');
  form.classList.add('registration-form');

  // Create input fields
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  nameInput.placeholder = 'Your Name';
  nameInput.required = true;

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.name = 'email';
  emailInput.placeholder = 'Your Email';
  emailInput.required = true;

  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Register';

  // Append input fields and button to form
  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(submitButton);

  // Append form to block
  $block.appendChild(form);

  // Create modal dialog
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.innerHTML = `
    <div class="modal-content">
      <p>Registration successful!</p>
      <button class="ok-button">OK</button>
    </div>
  `;
  document.body.appendChild(modal);

  const okButton = modal.querySelector('.ok-button');
  okButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Add event listener to handle form submission
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
    };

    try {
      const response = await fetch('https://eoyql2x3ouz4vhs.m.pipedream.net', { // Replace with your Pipedream URL
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        modal.style.display = 'block';
        form.reset();
      } else {
        modal.style.display = 'block';
        modal.querySelector('.modal-content').textContent = 'Registration failed. Please try again.';
      }
    } catch (error) {
      modal.style.display = 'block';
      modal.querySelector('.modal-content').textContent = 'An error occurred. Please try again.';
    }
  });
}

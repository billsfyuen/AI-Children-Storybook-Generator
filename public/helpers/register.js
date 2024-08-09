const registerForm = document.getElementById("registerForm")
const registerBtn = document.getElementById("register");

export function registerOpenForm() {
  registerForm.style.display = "block";
}

export function registerCloseForm() {
  document.getElementById("registerForm").style.display = "none";
}

window["register"] = register;
window["registerCloseForm"] = registerCloseForm;

export function register() {
  registerOpenForm()

  document.addEventListener('click', (e) => {
    if(!registerForm.contains(e.target) && !registerBtn.contains(e.target)) {
      registerCloseForm();
    }
  })
}

document.getElementById('registerForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const newUsername = document.getElementById('newUsername').value;
  const newEmail = document.getElementById('newEmail').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newUsername, newEmail, newPassword, confirmPassword })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);

      Swal.fire({
        title: data.message,
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

    } else {

      Swal.fire({
        title: data.message,
        icon: "error"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

    }
  } catch (error) {
    alert('An error occurred during registration.');
    console.error(error);
  }
});
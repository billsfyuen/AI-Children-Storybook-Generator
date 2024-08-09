const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("login");

export function loginOpenForm() {
  loginForm.style.display = "block";
}

export function loginCloseForm() {
  loginForm.style.display = "none";
}

window["loginOpenForm"] = loginOpenForm;
window["loginCloseForm"] = loginCloseForm;

export function login() {

  loginOpenForm();

  // document.addEventListener('click', (e) => {
  //   if (!loginForm.contains(e.target) && !loginBtn.contains(e.target)) {
  //     loginCloseForm();
  //   }
  // })
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (response.ok) {

      Swal.fire({
        title: 'Login successful!',
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

    } else {

      Swal.fire({
        title: `Login failed: ${data.message}`,
        icon: "error"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });

    }
  } catch (error) {
    alert('An error occurred during login.');
    console.error(error);
  }
});
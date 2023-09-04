const btn = document.getElementById('submitbtn');

const headers = {
  'Content-Type': 'application/json',
};

btn.addEventListener('click', () => {
  const email = document.getElementById('email').value; // Get the current email value
  const password = document.getElementById('password').value; // Get the current password value

  const data = {
    email: email,
    password: password
  };

  fetch('http://localhost:5000/api/auth/login', { 
    method: 'POST',
    body: JSON.stringify(data),
    headers: headers,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network error');
      }
      return res.json();
    })
    .then((res) => {
      console.log('Response:', res);
      window.location.href='/congrats.html'
    })
    .catch((err) => {
      console.error('Error', err);
    });
});

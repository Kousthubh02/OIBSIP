let username = document.getElementById('username').value; 
let password = document.getElementById('password').value;
let email = document.getElementById('email').value;

const btn = document.getElementById('submitbtn');

const data = {
  name: username,
  email: email,
  password: password,
};

const headers = {
  'Content-Type': 'application/json',
};

btn.addEventListener('click', () => {
  fetch('http://localhost:5000/api/auth/createuser', { // Added "http://" to the URL
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
    .then((response) => {
      // Handle the response here
      console.log('Response:', response);
    })
    .catch((err) => {
      console.error('Error', err);
    });

    username='';
    email='';
});

// public/auth.js

// Signup function
async function signup(event) {
    event.preventDefault(); // Prevent the form from submitting in the default way
    const name = document.querySelector(".signup input[placeholder='Full Name']").value;
    const email = document.querySelector(".signup input[placeholder='Email-address']").value;
    const password = document.querySelector(".signup input[placeholder='Password']").value;
    console.log({ name, email, password })
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
            alert('Signup successful');
            window.location.href = '/profile.html';
        } else {
            alert(data.msg || 'Signup failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}

// Login function
async function login(event) {
    event.preventDefault(); // Prevent the form from submitting in the default way
    const email = document.querySelector(".login input[placeholder='Email-address']").value;
    const password = document.querySelector(".login input[placeholder='Password']").value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        console.log({email , password})

        const data = await response.json();
        if (response.ok) {
            // alert('Login successful');
            // Optionally save the token to localStorage and redirect
            // Redirect to dashboard or another page
            window.location.href = '/index.html';
        } else {
            alert(data.msg || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}

// Event listeners for form submissions
document.getElementById('signupForm').addEventListener('submit', signup);
document.getElementById('loginForm').addEventListener('submit', login);

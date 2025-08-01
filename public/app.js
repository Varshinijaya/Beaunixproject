const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// app.js

// LOGIN HANDLER
async function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            alert(data.message || "Login failed");
            return;
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Redirect based on role
        if (data.role === "admin") {
            window.location.href = "dashboard.html";
        } else {
            window.location.href = "index.html";
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred. Try again.");
    }
}

// REGISTER HANDLER
async function handleRegister(e) {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Registration failed");
            return;
        }

        alert("Registered successfully. Now you can login.");
    } catch (err) {
        console.error(err);
        alert("An error occurred. Try again.");
    }
}

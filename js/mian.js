let firstNameInput = document.getElementById('firstNameInput');
let emailInput = document.getElementById('emailInput');
let passwordInput = document.getElementById('passwordInput');
let signInBtn = document.getElementById('signInBtn');
let successMessage = document.getElementById('successMessage')
let nameAlert = document.getElementById('nameAlert')
let emailAlert = document.getElementById('emailAlert')
let passwordAlert = document.getElementById('passwordAlert')

let usersList = [];

if (localStorage.getItem('user') !== null) {
    usersList = JSON.parse(localStorage.getItem('user'));
} else {
    usersList = [];
}

function validName() {
    let nameRegex = /^[A-Za-z]{3,}$/;
    if (nameRegex.test(firstNameInput.value)) {
        nameAlert.classList.add('d-none');
        return true;
    } else {
        nameAlert.classList.remove('d-none');
        return false;
    }
}
if (firstNameInput) {

    firstNameInput.addEventListener("change", validName);
}

function validEmail() {
    let emailRegex = /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(emailInput.value)) {
        emailAlert.classList.add('d-none');
        return true;
    } else {
        emailAlert.classList.remove('d-none');
        return false;
    }
}
if (emailInput) {

    emailInput.addEventListener('change', validEmail);
}

function validPassword() {
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordRegex.test(passwordInput.value)) {
        passwordAlert.classList.add('d-none');
        return true;
    } else {
        passwordAlert.classList.remove('d-none');
        return false;
    }
}
if (passwordInput) {

    passwordInput.addEventListener('change', validPassword);
}

// Sign Up Function
function signUP() {
    if (validName() && validEmail() && validPassword()) {
        successMessage.classList.remove('d-none');
        let userData = {
            userName: firstNameInput.value,
            userEmail: emailInput.value,
            userPassword: passwordInput.value
        };
        usersList.push(userData);
        localStorage.setItem('user', JSON.stringify(usersList));
        clearForm();
        setTimeout(() => window.location.href = "login.html", 2000);
    }
}

// Login Function
function login() {
    let userData = JSON.parse(localStorage.getItem('user'));
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;


    console.log('User Data:', userData);
    console.log('Email:', email);
    console.log('Password:', password);


    if (userData && userData.length > 0) {
        let user = userData.find(e => e.userEmail === email && e.userPassword === password);
        if (user) {
            console.log('User found:', user);
            localStorage.setItem('userName', user.userName);
            // window.location.href = "welcome.html";
            successMessage.classList.remove('d-none');
            setTimeout(() => window.location.href = "welcome.html", 2000);
        } else {
            console.log('Invalid email or password');
            window.alert('Invalid email or password.');
        }
        clearForm()
    }
}

function clearForm() {
    firstNameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
}

document.addEventListener('DOMContentLoaded', function () {
    let userName = localStorage.getItem('userName');
    let welcomeElement = document.getElementById('WelcomeName');
    if (userName) {
        welcomeElement.innerHTML = `Welcome, ${userName}`;
    }
});

document.getElementById('logout').addEventListener('click', function () {
    window.location.href = "login.html";
})


const email = document.getElementById("email");
const userName = document.getElementById("name");
const password = document.getElementById("password");
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const createAcc = document.getElementById("createAcc");
const errorMessage = document.getElementById("errormessage");
const universityName = document.getElementById("universityName");
const studyLevel = document.getElementById("studyLevel");

const token = localStorage.getItem('token');


const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
form1.addEventListener('submit', function (event) {
    event.preventDefault();
});
form2.addEventListener('submit', function (event) {
    event.preventDefault();
});


nextBtn.addEventListener('click', async function () {
    const isValid = await validateForm1(userName.value, email.value, password.value);
    if (isValid) { // slide form2 in
        console.log("valid")
        form1.style.display = "none";
        form2.style.display = 'block';
        form1.style.transform = 'translateX(0)';
    }
});
backBtn.addEventListener('click', function () { // slide form1 in
    form1.style.display = 'block';
    form2.style.display = 'none';
    form1.style.transform = 'translateX(0)';
})

async function validateForm1(name, email, password) {
    // Regular expressions for name, email and password validation
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    console.log(name, email, password);
    // Check for name   
    if (name == "") {
        console.log("invalid name");
        return false;
    }

    const emailTaken = await isEmailTaken(email);
    if (emailTaken) {
        alert("email already exists")
        console.log("email taken");
        return false;
    }

    // Check if email is valid
    if (!emailRegEx.test(email)) {
        console.log("invalid email");
        return false;
    }

    if (!passwordRegEx.test(password)) {
        console.log("invalid password");
        return false;
    }
    return true;
}


async function isEmailTaken(email) {
    const response = await fetch('localhost:3003/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (data.error) {
        return false;
    }
    return data;
}


createAcc.addEventListener("click", async function () {
    // validate form
    if (universityName.value == "") {
        return;
    }
    // create user
    // requestbody: name, email, password, universityName, Study Level
    const response = await fetch('localhost:3003/auth/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password, universityName, studyLevel }),
    });

    const data = await response.json();

    if (data.success) {
        // redirect to the user page
        localStorage.setItem("token", data.token);
        window.location.href = "/user-page";
    } else {
        console.log("failed to create account!");
    }
})
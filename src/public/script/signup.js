
const email = document.getElementById("email");
const userName = document.getElementById("name");
const password = document.getElementById("password");
const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const createAcc = document.getElementById("createAcc");
const universityName = document.getElementById("universityName");
const studyLevel = document.getElementById("studyLevel");

function displayErrorMessage(errorContent) {
    const errorPopup = document.getElementById("error-popup");
    const errorText = document.getElementById("error-text");

    errorText.innerHTML = errorContent;
    errorPopup.style.display = "block";

    setTimeout(function () {
        errorPopup.style.display = "none";
    }, 2000);
}

function displayTop(message) {
    const popup = document.getElementById("popup");
    const messageElement = document.getElementById("message");

    messageElement.innerText = message;
    popup.style.display = "block";

    setTimeout(function () {
        popup.style.display = "none";
    }, 4000);
}



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
    if (isValid) {
        // slide form2 in
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
        return false;
    }

    // Check if email is valid
    if (!emailRegEx.test(email)) {
        return false;
    }

    if (!passwordRegEx.test(password)) {
        displayTop("Password Must have at least one of all the following: lowercase character, uppercase character, number, and symbol (!@#$%^&*)")
        return false;
    }
    return true;
}


createAcc.addEventListener("click", async function () {

    // create user fetch
    // requestbody: name, email, password, universityName, Study Level
    const response = await fetch('http:localhost:3003/auth/signup', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName: userName.value, email: email.value, password: password.value, universityName: universityName.value, studyLevel: studyLevel.value }),
    });

    const data = await response.json();

    if (response.ok) {
        // redirect to the user page
        localStorage.setItem("access_token", data.access_token);
        window.location.href = "./user.html";
    } else {
        displayErrorMessage("Email is Already taken.")
    }
})
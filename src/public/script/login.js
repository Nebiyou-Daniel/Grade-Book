

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
    }, 2000);
}


document.getElementById("form").addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    const response = await fetch('http:localhost:3003/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        displayTop("Login Success");
        await Redirect();
    } else {
        displayErrorMessage("Login failed. Please try again.");
        return ;
    }
});


async function Redirect() {
    window.location.replace("./user.html");
}



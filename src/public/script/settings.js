

const userName = document.getElementById('userName');
const fullName = document.getElementById("name");
const universityName = document.getElementById("university");
const email = document.getElementById("email");

update();


function displaySuccessMessage(messageContent) {
    let messageText = document.getElementById("message-text");
    messageText.innerHTML = messageContent;

    let messageContainer = document.getElementById("message-container");
    messageContainer.style.display = "block";

    setTimeout(function () {
        messageContainer.style.display = "none";
    }, 2000);
}

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



/**
 * 
 * @returns void, sets the name at the top right nav to the user's first Name.
 */
async function update() {
    updateProfile();
    updateGradingSystem();
}

async function updateProfile() {
    const response = await fetch('http:localhost:3003/user/me', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });
    const data = await response.json();
    console.log(localStorage.getItem('access_token'))
    console.log(data)
    if (response.ok) {
        console.log("here")
        userName.innerHTML = (data.fullName).split(' ')[0];
        fullName.value = (data.fullName);
        email.value = (data.email);
        if (data.universityName) {
            universityName.value = (data.universityName);
        } else {
            universityName.value = "_";
        }
    } else {
        fullName.innerHTML = '_';
    }

}

async function updateGradingSystem() {
    const response = await fetch('http:localhost:3003/gradingSystem', {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('A_plus').value = data['A_plus'];
        document.getElementById('A').value = data['A'];
        document.getElementById('A_minus').value = data['A_minus'];
        document.getElementById('B_plus').value = data['B_plus'];
        document.getElementById('B').value = data['B'];
        document.getElementById('B_minus').value = data['B_minus'];
        document.getElementById('C_plus').value = data['C_plus'];
        document.getElementById('C').value = data['C'];
        document.getElementById('C_minus').value = data['C_minus'];
        document.getElementById('D').value = data['D'];
        document.getElementById('F').value = data['F'];
    }

}


document.getElementById("updateProfile").addEventListener('click', async () => {
    if (validateFormProfile()) {
        const response = await fetch('http:localhost:3003/user/me', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({ fullName: fullName.value, universityName: universityName.value, email: email.value }),
        });

        if (response.ok) {
            await update();
            displaySuccessMessage("Profile Updated Successfully.");
        } else {
            displayMessage("Profile Updated Successfully.");
        }
    }
})



/**
 * 
 */
document.getElementById("updatePassword").addEventListener('click', async () => {
    if (validateFormPassword()) {
        const response = await fetch('http:localhost:3003/user/updatePassword', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({ oldPassword: document.getElementById("oldpassword"), newPassword: document.getElementById("newpassword") })
        });

        if (response.status >= 200 || response.status <= 300) {
            displaySuccessMessage("Password updated successfully!");
            document.getElementById("oldpassword").value = "";
            document.getElementById("newpassword").value = "";
            document.getElementById("confirmpassword").value = "";
        } else {
            displayErrorMessage("Invalid Credentials.");
        }
    } else {
        displayTop("New Password doesn't Match Confirm Password.")
    }   
})

document.getElementById("updateGradingSystem").addEventListener("click", async () => {
    const response = await fetch('http:localhost:3003/user/me/password', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
            'A_plus': document.getElementById('A_plus').value,
            'A': document.getElementById('A').value,
            'A_minus': document.getElementById('A_minus').value,
            'B_plus': document.getElementById('B_plus').value,
            'B': document.getElementById('B').value,
            'B_minus': document.getElementById('B_minus').value,
            'C_plus': document.getElementById('C_plus').value,
            'C': document.getElementById('C').value,
            'C_minus': document.getElementById('C_minus').value,
            'D': document.getElementById('D').value,
            'F': document.getElementById('F').value,
        })
    });

    if (response.status >= 200 || response.status <= 300) {
        displaySuccessMessage("Grading System Updated suceesfully");
    } else {
        displayErrorMessage("Failed to Update Grading System");
        updateGradingSystem();
    }
})

function validateFormProfile() {
    if (fullName.value == "") {
        return false;
    }
}

function validateFormPassword() {
    if (document.getElementById("newpassword") !== document.getElementById("confirmpassword")) {
        return false;
    } return true;
}
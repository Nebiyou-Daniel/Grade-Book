


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

/**
 * 
 * @returns void, sets the name at the top right nav to the user's first Name.
 */
async function update() {

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
        return;
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
document.getElementById("updatePassword").addEventListener('click', async() => {
    if (validateFormPassword()) {
        const response = await fetch('http:localhost:3003/user/me/password', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({ oldPassword: document.getElementById("oldpassword"), newPassword: document.getElementById("newPassword")})
        });
        
        const data = await response.json();

        if (response.ok) {
            displaySuccessMessage("Password updated successfully!");
        } else {
            console.log("Invlialid credentials !");
        }
    }
})

function validateFormProfile() {
    if (fullName.value == "") {
        return false;
    }
}


function validateFormPassword() {
    if (document.getElementById("newpassword") !== document.getElementById("confirmpassword")){
        return false;
    } return true;
}
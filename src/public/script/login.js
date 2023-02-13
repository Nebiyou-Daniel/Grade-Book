

const form = document.getElementById("form");


form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    console.log(email,password)
    const response = await fetch('http:localhost:3003/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data)

    if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        console.log(data);
        await Redirect();
    } else {
        alert("Login failed. Please try again.");
        return ;
    }
});


async function Redirect() {
    window.location.replace("./user.html");
}



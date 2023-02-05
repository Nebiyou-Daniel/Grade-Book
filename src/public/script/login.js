

const form = document.getElementById("form");


form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // localhost:3003/api/login
    const response = await fetch('localhost:3003/api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data)

    if (data.token) {
        localStorage.setItem("token", data.token);
        console.log(data);
        await Redirect();
    } else {
        alert("Login failed. Please try again.");
        return ;
    }
});


async function Redirect() {
    window.location.replace("/src/user.html");
}



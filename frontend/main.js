const login = async () => {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password");
  let response = await fetch("http://localhost:1337/api/auth/local", {
    //config)
    method: "POST",
    body: JSON.stringify({
      identifier: username.value,
      password: password.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    let data = await response.json();

    sessionStorage.setItem("token", data.jwt);
    sessionStorage.setItem("user", data.user.username);
    console.log("Got our token!");
    console.log(data);

    onPageLoad();
  } else {
    let errorMessage = document.createElement("h3");
    errorMessage.innerText = "Felaktiga inloggninguppgifter!";
    document.querySelector(".login-box").append(errorMessage);
  }
};

const getUsers = async () => {
  let response = await fetch("http://localhost:1337/api/users", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  let data = await response.json();
  console.log(data);
};

let onPageLoad = async () => {
  if (sessionStorage.getItem("token")) {
    document.querySelector(".login-box").classList.add("hidden");
    document.querySelector(".greeting").classList.remove("hidden");
    document.querySelector("#user").innerText = sessionStorage.getItem("user");

    //Hämta information om den inloggade användaren
    // let response = await fetch("http://localhost:1337/api/users/me", {
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //   },
    // });
    // let data = await response.json();
    // console.log(data);
  } else {
    console.log("No token :(");
  }
};

let registerUser = async () => {
  let response = await fetch("http://localhost:1337/api/auth/local/register", {
    //config
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Magnus",
      password: "Test1234",
      email: "Magnus@company.se",
    }), 
  });
  console.log(response);
};

onPageLoad();

document.querySelector("#register").addEventListener("click", registerUser);
document.querySelector("#login").addEventListener("click", login);
// document.querySelector("#getUsers").addEventListener("click", getUsers);

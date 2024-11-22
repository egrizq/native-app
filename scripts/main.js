import { PostUser } from "./api.js";

const postForm = document.getElementById("postForm");
const listPost = document.getElementById("listPost");
const usernameWarning = document.getElementById("username-warning");
const lengthWarning = document.getElementById("len-warning");

["submit"].forEach((event) => {
  postForm.addEventListener(event, preventDefaults, false);
});

function preventDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
}

postForm.addEventListener("submit", processForm);

function processForm() {
  const formData = new FormData(postForm);

  const username = formData.get("username");
  const dataJSON = JSON.stringify({
    username: username,
  });

  sendData(dataJSON);
}

const bulletPoint = document.createElement("ul");

let listData = [];
async function sendData(dataJSON) {
  try {
    const data = await PostUser.post(dataJSON);

    controlData(data.username);
  } catch (error) {
    console.error(error);
  }
}

usernameWarning.style.display = "none";
lengthWarning.style.display = "none";

function controlData(username) {
  if (username.length > 4) {
    lengthWarning.style.display = "none";
  } else {
    lengthWarning.style.display = "block";
    usernameWarning.style.display = "none";
    return;
  }

  if (!listData.includes(username)) {
    listData.push(username);

    updateDOM(username);

    usernameWarning.style.display = "none";
  } else {
    usernameWarning.style.display = "block";
  }
}

listPost.appendChild(bulletPoint);

function updateDOM(item) {
  const paragraph = document.createElement("li");
  paragraph.textContent = item;

  bulletPoint.appendChild(paragraph);
}

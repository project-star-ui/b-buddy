
const CORRECT_PIN = "111824";

function checkPIN() {
  const pin = document.getElementById('pin').value;
  if (pin === CORRECT_PIN) {
    localStorage.setItem("authenticated", "true");
    window.location.href = "home.html";
  } else {
    document.getElementById('error').innerText = "Incorrect PIN. Try again.";
  }
}

function logout() {
  localStorage.removeItem("authenticated");
  window.location.href = "index.html";
}

function checkAuth() {
  if (localStorage.getItem("authenticated") !== "true") {
    window.location.href = "index.html";
  }
}

if (document.body.contains(document.getElementById("gallery"))) {
  checkAuth();
  displayImages();
}

if (document.body.contains(document.getElementById("messages"))) {
  checkAuth();
  displayMessages();
}

function addImage(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const dataURL = e.target.result;
    const images = JSON.parse(localStorage.getItem("images") || "[]");
    images.push(dataURL);
    localStorage.setItem("images", JSON.stringify(images));
    displayImages();
  };
  reader.readAsDataURL(file);
}

function displayImages() {
  const gallery = document.getElementById("gallery");
  const images = JSON.parse(localStorage.getItem("images") || "[]");
  gallery.innerHTML = "";
  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => deleteImage(index);
    gallery.appendChild(img);
  });
}

function deleteImage(index) {
  const images = JSON.parse(localStorage.getItem("images"));
  images.splice(index, 1);
  localStorage.setItem("images", JSON.stringify(images));
  displayImages();
}

function addMessage() {
  const message = document.getElementById("message").value;
  if (!message.trim()) return;
  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  messages.unshift({ text: message, date: new Date().toLocaleString() });
  localStorage.setItem("messages", JSON.stringify(messages));
  document.getElementById("message").value = "";
  displayMessages();
}

function displayMessages() {
  const container = document.getElementById("messages");
  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  container.innerHTML = messages.map(m => 
    `<div><p>💌 ${m.text}</p><small>${m.date}</small></div><hr>`
  ).join("");
}

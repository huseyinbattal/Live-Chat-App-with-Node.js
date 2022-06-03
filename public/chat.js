//herokuda kullanılacak port.
//const port = "https://live-chat-app-with-node.herokuapp.com/";  


//Yerelde kullanılacak port.
const port = "http://localhost:3000/"; 

const socket = io.connect(`${port}`);


const sender = document.getElementById("sender");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");

submitBtn.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    sender: sender.value,
  });
    sender.disabled = true;
});

socket.on("chat", (data) => {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.sender + " : </strong>" + data.message + "</p>";
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", sender.value);
});

socket.on("typing", (data) => {
  feedback.innerHTML = "<p>" + data + " yazıyor...</p>";
});

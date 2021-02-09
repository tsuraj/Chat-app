// const chatForm  = document.getElementById('chat-form');

// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');

// //get username and room from url

// const {username, room} = Qs.parse(location.search,{
//     ignoreQueryPrefix: true
// });

// const socket = io();


// //join chat room
// socket.emit('joinRoom',{username,room});

// //get room and users

// socket.on('roomUsers',({room,users})=>{
//     outputRoomName(room);
//     outputMessage(users);
// });

// //message from server
// socket.on('message', message =>{
//     console.log(message); 
//     outputMessage(message);
   
//     //scroll down
//     chatMessages.scrollTop = chatMessages.scrollHeight;
// });



// //message submit
// chatForm.addEventListener('submit',(e) =>{
//     e.preventDefault();

//     //Get message text
//     const msg = e.target.elements.msg.value;

//     //Emit messageto server
//     socket.emit('chatMessage',msg);

//     //clear inputs
//     e.target.elements.msg.value = '';
//     e.target.elements.msg.focus();
// })

// //output message to dom
// function outputMessage(message){
//     const div = document.createElement('div');
//     div.classList.add('message');
//     div.innerHTML = 	`<p class="meta">${message.username}<span>${message.time}</span></p>
//     <p class="text">
//         ${message.text}
//     </p>`;
//     document.querySelector('.chat-messages').appendChild(div);
// }


// //add room name to DOM

// function roomRoomName(room){
//     roomName.innerText  = room;
// }

// //add user to dom

// function outputUsers(users) {
//     userList.innerHTML = `
//     ${users.map(user => `<li>${user.username}</li>`).join('')}`;
// }


const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', message => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;
  
  msg = msg.trim();
  
  if (!msg){
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach(user=>{
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
  });
 }
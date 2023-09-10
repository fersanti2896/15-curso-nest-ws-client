import { connectToServer } from './socket-client';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WebSocket Client</h1>
    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="btn-connect">Connect</button>
    <br /><br/>
    <span id="server-status">Offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`

// connectToServer();
const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!;

btnConnect.addEventListener('click', () => {
  if( jwtToken.value.trim().length <= 0 ) return alert('Ingrese token.');

  connectToServer( jwtToken.value.trim() );
})
import { Manager, Socket } from 'socket.io-client'

export const connectToServer = ( token: string ) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: token
        }
    });

    const socket = manager.socket('/');
    addListener( socket );
}

const addListener = ( socket: Socket ) => {
    const clientsUL = document.querySelector<HTMLUListElement>('#clients-ul');
    const messageForm = document.querySelector<HTMLFormElement>('#message-form');
    const messageInput = document.querySelector<HTMLInputElement>('#message-input');
    const messagesUL = document.querySelector<HTMLUListElement>('#messages-ul');
    const serverStatusLabel = document.querySelector('#server-status');

    socket.on('connect', () => {
        serverStatusLabel!.innerHTML = 'Conectado';
    });

    socket.on('disconnect', () => {
        serverStatusLabel!.innerHTML = 'Desconectado';
    });

    socket.on('clients-updated', ( clients: string[] ) => {
        let clientsHTML = '';

        clients.forEach( clientId => {
            clientsHTML += `
                <li>${ clientId }</li>
            `
        } );

        clientsUL!.innerHTML = clientsHTML;
    });

    messageForm?.addEventListener('submit', (event) => {
        event.preventDefault();

        if( messageInput!.value.trim().length <= 0 ) return;

        socket.emit('message-from-client', {
            id: 'Yo',
            message: messageInput!.value
        });

        messageInput!.value = '';
    });

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        const newMessage = `
            <li>
                <strong>${ payload.fullName }</strong>
                <span>${ payload.message }</span>
            </li>
        `;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUL?.append(li);
    });
}
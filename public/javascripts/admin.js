const hostlight = '206.189.162.188:8080';
const socket= new WebSocket('ws://' + hostlight);
socket.onopen = function() {
    // pre defined text command
    document.getElementById('control').addEventListener('click', evt => {
        evt.preventDefault();
        if ( evt.target.nodeName === 'BUTTON' ) {
            const textFly = evt.target.innerText;
            const message = {
                textFly
            };
            socket.send(JSON.stringify(message));
        }
    });

    // new session instruction
    document.getElementById('sessionInsBtn').addEventListener('click', evt => {
        evt.preventDefault();
        const sessionInstruction = document.querySelector('#sessionInstruction textarea') && document.querySelector('#sessionInstruction textarea').value;
        const message = {
            sessionInstruction
        };
        socket.send(JSON.stringify(message));
    });

    // fake as a user
    document.getElementById('cusTextBtn').addEventListener('click', evt => {
        evt.preventDefault();
        const textFly = document.querySelector('#customizedText textarea') && document.querySelector('#customizedText textarea').value;
        const message = {
            textFly
        };
        socket.send(JSON.stringify(message));
    });

    document.getElementById('intervalBtn').addEventListener('click', evt => {
        evt.preventDefault();
        const interval = document.querySelector('#intervalNum') && document.querySelector('#intervalNum').value;
        const message = {
            interval: interval
        };
        socket.send(JSON.stringify(message));
    });
};

socket.onmessage = function (evt) {
    console.log(evt.data);
};

socket.onclose = function() {
    console.log('Connection is closed...');
};

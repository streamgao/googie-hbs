document.getElementById('sequence').addEventListener('touchend', e => {
  	let listEle;
    if (e.target && e.target.nodeName == 'LI') {
        listEle = e.target;
  	} else if (e.target && e.target.className == 'nextArrow') {
        listEle = e.target.parentElement.parentElement;
    } else if (e.target && e.target.className == 'down') {
        listEle = e.target.parentElement.parentElement.parentElement;
    }
    if (listEle && listEle.nextElementSibling) {
        listEle.nextElementSibling.style.display = 'flex';
        listEle.nextElementSibling.classList.add('fadeInAnimation');

        // listEle.classList.add('fadeOutAnimation');
        listEle.style.display = 'none';
    }
});



/* -----------socket----------- */
const NON_SPACE_SPECIALCHA=/\d|\W/g;
const hostlight = 'localhost:8080';

const socket= new WebSocket('ws://' + hostlight);
socket.onopen = () => {
    document.getElementById('wordinput').addEventListener('submit', e => {
        e.preventDefault();
        const textFly = document.getElementById('word').value;
        console.log('.textFly..', textFly);
        if (textFly.match(NON_SPACE_SPECIALCHA)) {
            window.alert('the word cannot contain any number or mark.\nPlease submit a valid word!');
            document.getElementById('word').value = '';
            return false;
        } else {
            const msg = { textFly };
            socket.send(JSON.stringify(textFly));
        }
        return false;
    }, false);
};
socket.onmessage = evt => {
    let msg;
    try {
        msg = JSON.parse(evt.data);
    } catch (e) {
        console.log('not session command', evt.data);
    }

    if (msg.sessionInstruction && msg.sessionInstruction.length) {
        document.getElementById('sessionCommand').innerHTML = msg.sessionInstruction;

        const lists = document.querySelectorAll('#sequence li');
        lists.forEach( li => {
            li.style.display = 'none';
        });

        // fadeInAnimation
        const sessionCommandList = document.getElementById('sessionCommandList');
        sessionCommandList.style.display = 'flex';
        sessionCommandList.classList.add('fadeInAnimation');
    }
    // if (evt.data.startsWith('-----')) {
    //     console.log('----------on command----------', evt.data);
    //     if (evt.data === COMMAND1) {
    //         document.getElementById('sessionCommand').innerHTML = 'First, I need you to send me an adjective!';
    //     } else if (evt.data === COMMAND2) {
    //         document.getElementById('sessionCommand').innerHTML = 'Great! Now give me a noun.';
    //     } else if (evt.data === COMMAND3) {
    //         document.getElementById('sessionCommand').innerHTML = 'Awesome job! Now just a random word!';
    //     } else if (evt.data === COMMAND4) {
    //         document.getElementById('sessionCommand').innerHTML = 'You are done, thank you!<from Stream and Yao>';
    //     }
    // }
};
socket.onclose = () => {
    console.log('Connection is closed...');
};

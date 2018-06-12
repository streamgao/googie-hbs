document.getElementById('sequence').addEventListener('touchend', e => {
  	let listEle;
    if (e.target && e.target.nodeName == 'LI') {
        listEle = e.target;
  	} else if (e.target && e.target.className == 'nextArrow') {
        listEle = e.target.parentElement.parentElement;
    } else if (e.target && e.target.className == 'down') {
        listEle = e.target.parentElement.parentElement.parentElement;
    }
    if (listEle.nextElementSibling) {
        listEle.nextElementSibling.style.display = 'flex';
        listEle.nextElementSibling.classList.add('fadeInAnimation');

        listEle.classList.add('fadeOutAnimation');
        listEle.style.display = 'none';
    }
});





/* -----------socket----------- */
const NON_SPACE_SPECIALCHA=/\d|\W/g;
const COMMAND1 = '-----command1-----';
const COMMAND2 = '-----command2-----';
const COMMAND3 = '-----command3-----';
const COMMAND4 = '-----command4-----';
const hostlight = 'localhost:8080';
const socket= new WebSocket('ws://' + hostlight);
socket.onopen = function() {
    document.getElementById("wordinput").addEventListener("submit", function(e){
        e.preventDefault();
        const inputVal = document.getElementById("word").value;
        console.log('.input', inputVal);
        if (inputVal.match(NON_SPACE_SPECIALCHA)) {
            window.alert('the word cannot contain any number or mark.\nPlease submit a valid word!');
            document.getElementById("word").value = '';
            return false;
        } else {
            socket.send(inputVal);
        }
        return false;
    }, false);
};
socket.onmessage = function (evt) {
    console.log('on mess', evt.data);
    if (evt.data.startsWith('-----')) {
        console.log('----------on mess----------', evt.data);
        if (evt.data === COMMAND1) {
            document.getElementById('sessionCommand').innerHTML = 'First, I need you to send me an adjective!';
        } else if (evt.data === COMMAND2) {
            document.getElementById('sessionCommand').innerHTML = 'Great! Now give me a noun.';
        } else if (evt.data === COMMAND3) {
            document.getElementById('sessionCommand').innerHTML = 'Awesome job! Now just a random word!';
        } else if (evt.data === COMMAND4) {
            document.getElementById('sessionCommand').innerHTML = 'You are done, thank you!<from Stream and Yao>';
        }
    }
};
socket.onclose = function() {
    console.log("Connection is closed...");
};

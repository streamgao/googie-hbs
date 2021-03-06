document.getElementById('sequence').addEventListener('click', e => {
  	let listEle;
    if (e.target && e.target.nodeName === 'LI') {
        listEle = e.target;
  	} else if (e.target && e.target.nodeName === 'div') {
        listEle = e.target.parentElement.parentElement;
    } else {
        listEle = e.target.parentElement.parentElement.parentElement;
    }
    // else if (e.target && e.target.className == 'down') {
    //     listEle = e.target.parentElement.parentElement.parentElement;
    // }
    if (listEle && listEle.nextElementSibling) {
        listEle.nextElementSibling.style.display = 'flex';
        listEle.nextElementSibling.classList.add('fadeInAnimation');

        // listEle.classList.add('fadeOutAnimation');
        listEle.style.display = 'none';
    }
});



/* -----------socket----------- */
const hostlight = '206.189.162.188:8080';

const SINGLE_WORD = /^[a-zA-Z]*$/g;
const SHORT_SENTENCE_30 = /(\w|\s){30}/g;
const sessionRules = {
    singleword: {
        name: 'singleword',
        rule: SINGLE_WORD,
        alert: 'the word cannot contain any number or mark.\nPlease submit a valid word!'
    },
    char30: {
        name: 'char30',
        rule: SHORT_SENTENCE_30,
        alert: 'too many! you can only type 30 characters!'
    }
};

/* global variable */
let inTypeMode = false;
let currentRule = sessionRules.singleword;

const socket= new WebSocket('ws://' + hostlight);
socket.onopen = () => {
    function sendWord (refocus) {
        if (!inTypeMode) {
            inTypeMode = true;
            const textFly = document.getElementById('word').value;
            let shouldSend = true;
            if (currentRule.name === 'singleword') {
                if (!textFly.match(currentRule.rule)) {
                    window.alert(currentRule.alert);
                    shouldSend = false;
                }
            } else if (currentRule.name === 'char30') {
                if (textFly.length > 30) {
                    window.alert(currentRule.alert);
                    shouldSend = false;
                }
            }

            if ( shouldSend && textFly && textFly.length ) {
                const msg = { textFly };
                socket.send(JSON.stringify(msg));
                console.log('...getting, textFly', textFly);
            }

            if (refocus) {
                // hide keyboard then focus
                document.getElementById('word').blur();
                document.getElementById('word').click();
            }

            document.getElementById('word').value = '';
        }
    };
    document.getElementById('sendButton').addEventListener('click', e => { // click submit button
        e.preventDefault();
        sendWord(false);
        inTypeMode = false;
    });
    document.addEventListener('keydown', e => {  // enter code
        if ( e.keyCode === 13 ) {
            sendWord(true);
            inTypeMode = false;
        }
    });
    document.addEventListener('focusout', e => {  // enter code
        sendWord(true);
        inTypeMode = false;
    });
};


socket.onmessage = evt => {
    let msg;
    try {
        msg = JSON.parse(evt.data);
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

            document.getElementById('instructionInInput').innerHTML = msg.sessionInstruction;
        }
        // rule change
        if (msg.sessionRule) {
            console.log('sessionRule', msg);
            currentRule = sessionRules[msg.sessionRule] || sessionRules.char30;
        }
    } catch (e) {
        console.log('..something wrong here..', evt.data, e);
    }
};
socket.onclose = () => {
    console.log('Connection is closed...');
    // fadeInAnimation
    const sessionCommandList = document.getElementById('sessionCommandList');
    sessionCommandList.style.display = 'flex';
    sessionCommandList.classList.add('fadeInAnimation');

    document.getElementById('instructionInInput').innerHTML = 'Oops, something went wrong, you are offline with Googie. Can you try refresh the page?';
};

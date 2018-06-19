const hostlight = '206.189.162.188:8080';
const socket= new WebSocket('ws://' + hostlight);
let sessionId = 0;
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
        sessionId ++;
        const x = document.getElementById('sessionInstruction').selectedIndex;
        const sessionInstruction = document.getElementById('sessionInstruction').options && document.getElementById('sessionInstruction').options[x].text;
        const message = {
            sessionInstruction,
            sessionId
        };
        // console.log('.message', message, sessionInstruction);
        socket.send(JSON.stringify(message));
    });
    document.getElementById('questionFlySelectBtn').addEventListener('click', evt => {
        evt.preventDefault();
        const x = document.getElementById('questionFlySelect').selectedIndex;
        const questionFly = document.getElementById('questionFlySelect').options && document.getElementById('questionFlySelect').options[x].text;
        const message = {
            questionFly
        };
        socket.send(JSON.stringify(message));
    });

    document.getElementById('questionFlyBtn').addEventListener('click', evt => {
        evt.preventDefault();
        const questionFly = document.querySelector('#questionFly textarea') && document.querySelector('#questionFly textarea').value;
        const message = {
            questionFly
        };
        socket.send(JSON.stringify(message));
    });

    // fake as a user
    document.getElementById('textFlyBtn').addEventListener('click', evt => {
        evt.preventDefault();
        const textFly = document.querySelector('#textFly textarea') && document.querySelector('#textFly textarea').value;
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

    document.getElementById('singleword').addEventListener('click', evt => {
        console.log('..click..');
        const message = {
            sessionRule: 'singleword'
        };
        socket.send(JSON.stringify(message));
    });

    document.getElementById('char30').addEventListener('click', evt => {
        const message = {
            sessionRule: 'char30'
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





const sesstionsInfo = [
  {
      sessionId: 1,
      sessionInstruction: 'Good. So tell me what is your name?(single word)',
      sessionRule: 'singleword',
      questionFly: ['Hey, good evening', 'Hey'],
      textFly: 'Stream'
  },
  {
      sessionId: 2,
      sessionInstruction: 'How are you doing today?(single word)',
      sessionRule: 'singleword',
      questionFly: ['Googie is feeling', 'is a good feeling', 'can be a random emotion'],
      textFly: 'fantastic'
  },
  {
      sessionId: 3,
      sessionInstruction: 'Would you like to say something to Googie?(up to 30 characters)',
      sessionRule: 'char30',
      questionFly: ['Hey, good evening', 'I like been given compliment', 'thank you', 'sorry to hear that', 'I am shy'],
      textFly: 'Googie can you travel further?'
  },
  {
      sessionId: 4,
      sessionInstruction: 'What’s the best Wi-Fi name you’ve seen?',
      sessionRule: 'char30',
      questionFly: ['Googie has strong connections to WiFi', 'For example', 'I like', 'is my best mate'],
      textFly: 'verizon 5g'
  },
  {
      sessionId: 5,
      sessionInstruction: 'In one sentence, how would you sum up Googie?',
      sessionRule: 'char30',
      questionFly: ['you know', 'I am', 'someone tells me that'],
      textFly: 'digital everything'
  },
  {
      sessionId: 6,
      sessionInstruction: 'What is the funniest joke you know by heart?',
      sessionRule: 'char30',
      questionFly: ['let me tell you something', 'do you know that'],
      textFly: 'no joke'
  },
  {
      sessionId: 7,
      sessionInstruction: '...oh, jokes are too funny to handle...thanks for participating!',
      sessionRule: 'char30',
      questionFly: ['I lost my lexicon', 'Dead'],
      textFly: 'oh no'
  }
];

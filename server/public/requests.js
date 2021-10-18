import { showMessages } from './ui.js';

// const HOUR = 60 * 60000;
// const FRIEND = 'Diana';

// const friendHash = 'ae16f85601a56';

// const messages = [
//   {
//     authorId: 'me',
//     content: 'Hey how are you doing',
//     timestamp: Date.now() - (HOUR * 2)
//   },
//   {
//     authorId: 'me',
//     content: 'Fancy drinks tonight?',
//     timestamp: Date.now() - (HOUR * 1.9)
//   },
//   {
//     authorId: friendHash,
//     content: 'Nope',
//     timestamp: Date.now() - (HOUR * 1.4)
//   },
//   {
//     authorId: friendHash,
//     content: 'Loser',
//     timestamp: Date.now() - (HOUR * 1.4)
//   },
//   {
//     authorId: 'me',
//     content: 'Great, love you too!',
//     timestamp: Date.now() - (HOUR * 1.1)
//   },
// ];

function getMessages () {
  return new Promise ((resolve, reject) => {
    const req = new XMLHttpRequest;
    req.open('GET', '/messages');
    req.onerror = (err) => reject({ statusCode: req.status, err });
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        resolve(JSON.parse(req.responseText));
      };
    }
    req.send();
  });
}

function sendMessage (message) {
  return new Promise ((resolve, reject) => {
    const req = new XMLHttpRequest;
    req.open('POST', '/messages');
    req.setRequestHeader('Content-Type', 'application/json');
    req.onerror = (err) => reject({ statusCode: req.status, err });
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 201) {
        resolve();
      };
    }
    req.send(JSON.stringify(message));
  });
}

export {
  getMessages,
  sendMessage
};
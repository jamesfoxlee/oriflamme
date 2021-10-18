const HOUR = 60 * 60000;
const FRIEND = 'Diana';

const friendHash = 'ae16f85601a56';

const messages = [
  {
    authorId: 'me',
    content: 'Hey how are you doing',
    timestamp: Date.now() - (HOUR * 2)
  },
  {
    authorId: 'me',
    content: 'Fancy drinks tonight?',
    timestamp: Date.now() - (HOUR * 1.9)
  },
  {
    authorId: friendHash,
    content: 'Nope',
    timestamp: Date.now() - (HOUR * 1.4)
  },
  {
    authorId: friendHash,
    content: 'Loser',
    timestamp: Date.now() - (HOUR * 1.4)
  },
  {
    authorId: 'me',
    content: 'Great, love you too!',
    timestamp: Date.now() - (HOUR * 1.1)
  },
];

function getMessages (req, res, next) {
  res.status(200).send(messages);
}

function postMessage (req, res, next) {
  console.log(req.body);
  messages.push({
    content: req.body.content,
    timestamp: Date.now()
  })
  res.status(201).send('Success');
}

module.exports = {
  getMessages,
  postMessage
};
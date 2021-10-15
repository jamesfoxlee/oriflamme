function getMessages (req, res, next) {
  const messages = [
   { content: 'Screw you' },
   { content: 'Where\'s my money' },
   { content: 'Drinks tomorrow night?' }
 ];
  res.send(messages);
}

function postMessage (req, res, next) {
  console.log(req.body);
  res.send(`Message received: ${JSON.stringify(req.body)}`)
}

module.exports = {
  getMessages,
  postMessage
};
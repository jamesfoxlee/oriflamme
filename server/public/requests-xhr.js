function getMessages() {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("GET", "/messages");
    req.onerror = (err) => reject({ statusCode: req.status, err });
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 200) {
        resolve(JSON.parse(req.responseText));
      }
    };
    req.send();
  });
}

function sendMessage(message) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("POST", "/messages");
    req.setRequestHeader("Content-Type", "application/json");
    req.onerror = (err) => reject({ statusCode: req.status, err });
    req.onreadystatechange = () => {
      if (req.readyState === 4 && req.status === 201) {
        resolve();
      }
    };
    req.send(JSON.stringify(message));
  });
}

export { getMessages, sendMessage };

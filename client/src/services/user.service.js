// singleton
// we are not using context as we need all the methods to save user name etc
// service fits needs better

export default (function UserService () {

  let _instance;

  const _saveId = (id) => {
    localStorage.setItem('user.id', id)
  }

  const _init = () => {
    let _user;
    return {
      get: (socketId) => {
        if (!_user || !_user.id) {
          let userId = localStorage.getItem('user.id');
          let userName = localStorage.getItem('user.name');
          // save socket.id as the user.id if there isn't one in localStorage
          if (!userId) {
            socketId && _saveId(socketId);
            socketId && (userId = socketId);
          }
          _user = {
            id: userId,
            name: userName
          }
        }
        return _user;
      },
      saveName: (name) => {
        if (!localStorage.getItem('user.name')) {
          localStorage.setItem('user.name', name);
        }
      }
    }
  }

  return function () {
    if (!_instance) {
      _instance = _init();
    }
    return _instance;
  }
})();
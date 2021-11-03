import userEvent from "@testing-library/user-event";

// singleton
export default (function UserService () {

  let _instance;

  const _saveId = (id) => {
    localStorage.setItem('user.id', id)
  }

  const _init = () => {
    let _user;
    return {
      get: (id) => {
        if (!_user || !_user.id) {
          let storedId = localStorage.getItem('user.id');
          let storedName = localStorage.getItem('user.name');
          // save socket.id as the user.id if there isn't one in localStorage
          if (!storedId) {
            id && _saveId(id);
          }
          _user = {
            id: storedId,
            name: storedName
          }
        }
        return _user;
      },
      saveUserName: (name) => {
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
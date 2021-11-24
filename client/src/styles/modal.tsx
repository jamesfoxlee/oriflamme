type ModalStyle={	
  overlay: {
    zIndex: 100,
    backgroundColor: 'hsla(0, 0%, 10%, 1)'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',
    margin: '0 auto',
    border: 'none',
    backgroundColor: 'hsla(213, 62%, 15%, 1)'
  } 	  
}

const modalStyles:ModalStyle = {
  overlay: {
    zIndex: 100,
    backgroundColor: 'hsla(0, 0%, 10%, 1)'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%',
    margin: '0 auto',
    border: 'none',
    backgroundColor: 'hsla(213, 62%, 15%, 1)'
  }
};

export default modalStyles;
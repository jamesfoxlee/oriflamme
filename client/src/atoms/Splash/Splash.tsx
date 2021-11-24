import React, {useEffect} from 'react';
import ReactModal from 'react-modal';

import './Splash.css';
import Button from '../Button/Button';

type Props={
  show:boolean;
  dismiss: ()=>void
}

type SplashModalStyles = {
  overlay: {
    zIndex: 100,
    padding: 0,
    backgroundColor: 'var(--color-blue-midnight)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    border: 'none',
    backgroundColor: 'var(--color-blue-midnight)',
  }
};

export default function Splash (props:Props) {
  const { show, dismiss } = props;

 

 const splashModalStyles: SplashModalStyles={
  overlay: {
    zIndex: 100,
    padding: 0,
    backgroundColor: 'var(--color-blue-midnight)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    border: 'none',
    backgroundColor: 'var(--color-blue-midnight)',
  }
};
  return (
    <ReactModal
      isOpen={show}
      onRequestClose={dismiss}
      style={splashModalStyles}
      contentLabel="Oriflamme"
    >
      <div className="splash">
        <div className="splash__title">Oriflamme</div>
        <div className="splash__headline">The King is dead. Long live the King!</div>
        <div className="splash__text">In this game for 3 - 5 players you play a powerful French family with a claim to the throne. Make it yours by laying careful plans and don't be afraid to cheat, stab, and poison your rivals to get to where you need.</div>
        <div className="splash__text">Oriflamme is produced by Studio H Games and rightly won Game of the Year in France in 2020. This is in no way endorsed by them, in fact I didn't even ask. Sorry.</div>
        <div className="splash__buttons">
          <Button
            onClick={dismiss}
            text="Play"
          />
        </div>
        <div className="splash__image"></div>
      </div>
    </ReactModal>
  );
}
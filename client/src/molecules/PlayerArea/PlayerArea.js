import React, { useContext} from 'react';

import './PlayerArea.css';
import PlayerHand from '../PlayerHand/PlayerHand';
import Player from '../Player/Player';

import { UserContext } from '../../context/user.context';

export default function PlayerArea (props) {

  const { gameState } = props;
  const [user] = useContext(UserContext);
  const player = gameState.players.find(player => player.id === user.id);

  const handIsActive = (gameState.activePlayerId === user.id) && (gameState.phase === 'planning');

  return (
    <div className="player-area">
      <div className="player-area__player">
        <Player player={player} />
      </div>
      <div className="player-area__hand">
        <PlayerHand
          cardColor={player.color}
          hand={player.hand}
          handIsActive={handIsActive}
        />
      </div>
    </div>
  );
}
import React, { useContext} from 'react';

import './PlayerArea.css';
import PlayerHand from '../PlayerHand/PlayerHand';
import Player from '../../atoms/Player/Player';

import { UserContext } from '../../context/user.context';

export default function PlayerArea (props) {

  const { cards, gameState, player } = props;
  const [user] = useContext(UserContext);

  const activePlayerId = gameState.turnOrder[0];
  const handIsActive = (activePlayerId === user.id) && (gameState.phase === 'planning');

  return (
    <div className="player-area">
      <div className="player-area__player">
        <Player cards={cards} player={player} />
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
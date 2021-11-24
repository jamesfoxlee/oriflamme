import React, { useContext } from 'react';
import { Players } from '../../types/index';
import './PlayerArea.css';
import PlayerHand from '../../organisms/PlayerHand/PlayerHand';
import Player from '../Player/Player';
import { UserContext } from '../../context/user.context';

export type Props = {
	activePlayerId: string;
	phase: string;
	players: Players;
};

export default function PlayerArea ({ activePlayerId, phase, players }: Props) {

	const [ user ] = useContext(UserContext);
	const player = players[user.id];
	const isActivePlayer = user.id === activePlayerId;
	const isHandActive = isActivePlayer && phase === 'planning';

	return (
		<div className='player-area'>
			<div className='player-area__player'>
				<Player isActivePlayer={isActivePlayer} player={player} />
			</div>
			<div className='player-area__hand'>
				<PlayerHand
					cardColor={player.color}
					hand={player.hand}
					isActive={isHandActive}
				/>
			</div>
		</div>
	);
}

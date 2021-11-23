import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import './QueueCard.css';
import QCButtons from '../../atoms/QCButtons/QCButtons';

import { SocketContext } from '../../context/socket.context';
import { UserContext } from '../../context/user.context';
import {
	getUrlCardFront,
	getUrlCardBack
} from '../../services/card-image.service';
// import { QUEUE_CARD as QC } from "../../config/ui.constants";
import { QCard } from '../../types/queueCard';

export type Props = {
	abilityInterrupted: boolean;
	card: QCard;
	indexInQueue: number;
	isPlayerTurn: boolean;
	isResolving: boolean;
	isTarget: boolean | undefined;
	resolvingCardToBeDiscarded: boolean | undefined;
	targetsNoneValid: boolean;
	targetsSelf: boolean;
	qri: number;
};
export default function QueueCard (props: Props) {
	const handleMouseEnter = () => setHovered(true);
	const handleMouseLeave = () => setHovered(false);

	const handleNoReveal = () => socket.queueNoReveal(qri);
	const handleReveal = () => socket.queueReveal(qri);
	const handleConfirmTarget = () => socket.queueConfirmTarget(indexInQueue);
	const handleConfirmNoTarget = () => socket.queueConfirmNoTarget();
	const handleConfirmTargetSelf = () => socket.queueConfirmTargetSelf();
	const handleConfirmDiscard = () => socket.queueConfirmDiscard(indexInQueue);
	const handleConfirmInterrupt = () => socket.queueConfirmInterrupt();

	// PROPS, STATE, CONTEXT etc

	const {
		abilityInterrupted,
		card,
		indexInQueue,
		isPlayerTurn,
		isResolving,
		isTarget,
		resolvingCardToBeDiscarded,
		targetsNoneValid,
		targetsSelf,
		qri
	} = props;

	const [ hovered, setHovered ] = useState(false);
	const socket = useContext(SocketContext);
	const [ user ] = useContext(UserContext);

	const { revealed } = card;
	const isOwned = card.ownerId === user.id;

	const cardFrontUrl = getUrlCardFront(card.id, card.ownerColor);
	const cardBackUrl = getUrlCardBack(card.ownerColor);

	return (
		<div data-testid='queue-card' className='queue-card'>
			<div
				className='queue-card__card'
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}>
        <div className='queue-card__card-wrapper'>
				<img
					className='queue-card__card-img'
					src={revealed ? cardFrontUrl : cardBackUrl}
				/>
				{isOwned && hovered ? (
					<>
						<div className='queue-card__text'>{card.text}</div>
						<div className='queue-card__name'>{card.name}</div>
          </>
				) : null}
        </div>
				{card.influence ? (
					<span className='queue-card__influence'>{card.influence}</span>
				) : null}
			</div>
			{isPlayerTurn && isResolving && isOwned && !revealed ? (
				<QCButtons onYes={handleReveal} onNo={handleNoReveal} text='Reveal?' />
			) : null}
			{isPlayerTurn && isTarget ? (
				<QCButtons onYes={handleConfirmTarget} text='Target?' />
			) : null}
			{isPlayerTurn &&
			isResolving &&
			isOwned &&
			revealed &&
			targetsNoneValid ? (
				<QCButtons onYes={handleConfirmNoTarget} text='Confirm' />
			) : null}
			{isPlayerTurn && isResolving && isOwned && revealed && targetsSelf ? (
				<QCButtons onYes={handleConfirmTargetSelf} text='Confirm' />
			) : null}
			{isPlayerTurn && isResolving && revealed && abilityInterrupted ? (
				<QCButtons onYes={handleConfirmInterrupt} text='Confirm' />
			) : null}
			{isPlayerTurn &&
			isResolving &&
			isOwned &&
			revealed &&
			resolvingCardToBeDiscarded ? (
				<QCButtons onYes={handleConfirmDiscard} text='Discard' />
			) : null}
		</div>
	);
}

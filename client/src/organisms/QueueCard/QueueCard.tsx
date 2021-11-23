import React, { useState, useContext, SyntheticEvent } from "react";
import PropTypes from "prop-types";

import "./QueueCard.css";
import QCButtons from "../../atoms/QCButtons/QCButtons";

import { SocketContext } from "../../context/socket.context";
import { UserContext } from "../../context/user.context";
import {
  getDataForCardFronts,
  getDataForCardBacks,
} from "../../services/card-image.service";
import { QUEUE_CARD as QC } from "../../config/ui.constants";
import { QCard } from "../../types/queueCard";

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
export default function QueueCard(props: Props) {
  const handleMouseEnter = (e: SyntheticEvent) => setHovered(true);
  const handleMouseLeave = (e: SyntheticEvent) => setHovered(false);

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
    qri,
  } = props;

  const [hovered, setHovered] = useState(false);
  const socket = useContext(SocketContext);
  const [user] = useContext(UserContext);

  const { revealed } = card;
  const isOwned = card.ownerId === user.id;

  // DYNAMIC STYLES

  const width = QC.WIDTH;
  const hoverWidth = width * QC.HOVER_SCALE;
  const baseDims = getDataForCardFronts(card.id, card.ownerColor, width);
  const hoverDims = getDataForCardFronts(card.id, card.ownerColor, hoverWidth);
  const backDims = getDataForCardBacks(card.id, card.ownerColor, width);
  const backHoverDims = getDataForCardBacks(
    card.id,
    card.ownerColor,
    hoverWidth
  );

  const notRevealedStyles = {
    backgroundPosition: hovered
      ? `bottom ${backHoverDims.bottomOffset}px right ${backHoverDims.rightOffset}px`
      : `bottom ${backDims.bottomOffset}px right ${backDims.rightOffset}px`,
  };

  const revealedStyles = {
    backgroundPosition: hovered
      ? `bottom ${hoverDims.bottomOffset}px right ${hoverDims.rightOffset}px`
      : `bottom ${baseDims.bottomOffset}px right ${baseDims.rightOffset}px`,
  };

  const noHoverStyles = {
    width: `${width}px`,
    height: `${baseDims.cardHeight}px`,
    backgroundSize: `${baseDims.sheetWidth}px ${baseDims.sheetHeight}px`,
  };

  const hoverStyles = {
    width: `${hoverWidth}px`,
    height: `${hoverDims.cardHeight}px`,
    backgroundSize: `${hoverDims.sheetWidth}px ${hoverDims.sheetHeight}px`,
  };

  const resolvingStyles = {
    boxShadow: "0 0 1rem 1rem var(--color-white)",
  };

  const targettedStyles = {
    boxShadow: "0 0 1rem 1rem var(--color-gold)",
  };

  const revStyle = card.revealed ? revealedStyles : notRevealedStyles;
  const hovStyle = hovered ? hoverStyles : noHoverStyles;
  const resStyle = isResolving
    ? isTarget
      ? targettedStyles
      : resolvingStyles
    : {};
  const tarStyle = isTarget ? targettedStyles : {};
  const combinedStyle = { ...revStyle, ...hovStyle, ...resStyle, ...tarStyle };

  return (
    <div data-testid="queue-card" className="queue-card">
      <div
        className="queue-card__card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={combinedStyle}
      >
        {isOwned && hovered ? (
          <div className="queue-card__card-wrapper">
            <div className="queue-card__text">{card.text}</div>
            <div className="queue-card__name">{card.name}</div>
          </div>
        ) : null}
        {card.influence ? (
          <span className="queue-card__influence">{card.influence}</span>
        ) : null}
      </div>
      {isPlayerTurn && isResolving && isOwned && !revealed ? (
        <QCButtons onYes={handleReveal} onNo={handleNoReveal} text="Reveal?" />
      ) : null}
      {isPlayerTurn && isTarget ? (
        <QCButtons onYes={handleConfirmTarget} text="Target?" />
      ) : null}
      {isPlayerTurn &&
      isResolving &&
      isOwned &&
      revealed &&
      targetsNoneValid ? (
        <QCButtons onYes={handleConfirmNoTarget} text="Confirm" />
      ) : null}
      {isPlayerTurn && isResolving && isOwned && revealed && targetsSelf ? (
        <QCButtons onYes={handleConfirmTargetSelf} text="Confirm" />
      ) : null}
      {isPlayerTurn && isResolving && revealed && abilityInterrupted ? (
        <QCButtons onYes={handleConfirmInterrupt} text="Confirm" />
      ) : null}
      {isPlayerTurn &&
      isResolving &&
      isOwned &&
      revealed &&
      resolvingCardToBeDiscarded ? (
        <QCButtons onYes={handleConfirmDiscard} text="Discard" />
      ) : null}
    </div>
  );
}

const { bool, object } = PropTypes;

QueueCard.propTypes = {
  card: object.isRequired,
  isResolving: bool,
};

QueueCard.defaultProps = {
  isResolving: false,
};

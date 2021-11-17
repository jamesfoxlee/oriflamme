import React from 'react';

import './EmptyQueue.css';
import { QUEUE_CARD } from '../../config/ui.constants';

export default function EmptyQueue (props) {

  const phantomStyles = {
    width: QUEUE_CARD.WIDTH,
    height: QUEUE_CARD.WIDTH * QUEUE_CARD.HEIGHT_SCALE,
  }

  return (
    <div className="empty-queue">
      <div className="empty-queue__headline">This is the Queue.</div>
      <div className="empty-queue__phantom-cards">
        <div className="empty-queue__phantom-card" style={phantomStyles}></div>
        <div className="empty-queue__phantom-card" style={phantomStyles}></div>
        <div className="empty-queue__phantom-card" style={phantomStyles}></div>
      </div>
      <div className="empty-queue__text">In the Planning Phase, cards are played to either end of the Queue. In the Resolution Phase, revealed cards are resolved from left to right.</div>
    </div>
  );
}
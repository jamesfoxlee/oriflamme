import { Room } from "../types/index";
import { Player, GameManager } from "../types/index";
import  CardHelper from '../helpers/card.helper';
import  { CARD_EFFECTS } from '../config/game.constants';
import { Card } from "../types/index";
import {
  INITIAL_GAMESTATE,
  INITIAL_PLAYERSTATE,
  STARTING_HAND_SIMPLE,
  PHASES,
  PLAYER_IMAGES,
  PLAYER_COLORS
} from '../config/game.constants';

interface Players{
    [id:string]: Player
   
}
type GameState = {
  abilityInterrupted: boolean;
  activePlayerId?: string;
  numPlayers: number;
  phase: string;
  planningPhasePlayed:number;
  players: Players;
  queue: Card[][];
  queueResolutionIndex:number;
  queueTargets?: any[];
  roomId?: string|null;
  round: number;
  targets?: any[];
  targetsNoneValid: boolean;
  targettedIndex?: number|null;
  targetsSelf: boolean;
  turnOrder: any[];
  turnOrderIndex:number;
  resolvingCardToBeDiscarded?: boolean;
}

const cardHelper = CardHelper();

export default function GameManager (): GameManager {

  let _gameState:GameState;

  const _getTopCardInStack = (queue:Card[][], qri:number) => {
    console.log("QUEUE",queue,qri)
    console.log("QRIIIII",qri)
    const stack = queue[qri];
    return stack && stack[stack.length - 1];
  };

  const getGameState = () => _gameState;

  //----------------------------------------------------------------
  // GAME LOOP
  //----------------------------------------------------------------

  // should call _returnToPlayer() if need to "break out" of game loop

  const _checkForAdvanceToResolutionPhase = (prevState:GameState) => {
    console.log('GameManager._checkForAdvanceToResolutionPhase()');
    const nextState = {...prevState};
    if (nextState.planningPhasePlayed === nextState.numPlayers) {
      nextState.phase = PHASES.RESOLUTION;
      _resolveNextCard(nextState);
    } else {
      // otherwise it's the next player
      nextState.turnOrderIndex += 1;
      nextState.activePlayerId = nextState.turnOrder[nextState.turnOrderIndex];
      _returnToPlayer(nextState);
    }
  }

  const _checkForAdvanceToNextRound = (prevState:GameState) => {
    console.log('GameManager._checkForAdvanceToNextRound()');
    const nextState = {
      ...prevState,
      queueResolutionIndex: prevState.queueResolutionIndex + 1,
      resolvingCardToBeDiscarded: false,
      targets: [],
      targetsNoneValid: false,
    };
    const { queue, queueResolutionIndex: qri } = nextState;
    if (qri < queue.length) {
      _resolveNextCard(nextState);
    }
    else {
      // no cards left to resolve, advance the round
      const updatedTurnOrder = nextState.turnOrder.slice(1).concat(nextState.turnOrder.slice(0, 1));
      // TODO: send a message that "New round started. PLAYER is now the first player."
      _returnToPlayer({
        ...nextState,
        activePlayerId: updatedTurnOrder[0],
        phase: PHASES.PLANNING,
        planningPhasePlayed: 0,
        queueResolutionIndex: 0,
        round: nextState.round + 1,
        turnOrder: updatedTurnOrder,
        turnOrderIndex: 0,
      });
    }
  }

  const _resolveNextCard = (prevState:GameState) => {
    const nextState = {...prevState};
    const { queue, queueResolutionIndex: qri } = nextState;
    const resolvingCard = _getTopCardInStack(queue, qri);
    nextState.activePlayerId = resolvingCard.ownerId;
    if (resolvingCard.revealed) {
      // activate card ability
      _requestTargets(nextState);
    } else {
      // prompt for reveal
      _returnToPlayer(nextState);
    }
  };

  const _requestTargets = (prevState:GameState) => {
    const nextState = {...prevState};
    const {queue, queueResolutionIndex: qri} = nextState;
    const resolvingCard = _getTopCardInStack(queue, qri);
    const {
      targets,
      targetsNoneValid,
      targetsNothing,
      targetsSelf
    } = cardHelper.getTargets(resolvingCard, queue, qri);
    if (targetsNothing) {
      _checkForDiscardAfterResolution(nextState);
    }
    else {
      _returnToPlayer({
        ...nextState,
        targets,
        targetsNoneValid,
        targetsSelf,
      });
    }
  }

  const _applyAbility = (prevState:GameState) => {
    const { queue, queueResolutionIndex: qri, targettedIndex } = prevState;
    const resolvingCard = _getTopCardInStack(queue, qri);
    console.log('resolvingCard: ', resolvingCard.name);
    const action = cardHelper.getAction(resolvingCard, queue, qri);
    let nextState;
    if(action.influenceChange){
    switch (action.type) {
      case CARD_EFFECTS.NONE:
        nextState = {...prevState};
        break;
      case CARD_EFFECTS.ELIMINATE:
        nextState = _eliminate(targettedIndex, resolvingCard, action.influenceChange, prevState);
        break;
      case CARD_EFFECTS.GAIN_INFLUENCE:
        nextState = _gainInfluence(resolvingCard, action.influenceChange, prevState);
        break;
      case CARD_EFFECTS.STEAL:
        nextState = _steal(targettedIndex, resolvingCard, action.influenceChange, prevState);
        break;
      case CARD_EFFECTS.MOVE:
        // TODO: implement
        nextState = {...prevState};
        break;
      case CARD_EFFECTS.COPY_ABILITY:
        // TODO: implement
        nextState = {...prevState};
        break;
      default:
        nextState = {...prevState};
    }
    _checkForDiscardAfterResolution(nextState);
    }
  }

  const _checkForDiscardAfterResolution = (prevState:GameState) => {
    let nextState = {
      ...prevState,
      targets: [],
      targetsNoneValid: false,
      targetsNothing: false,
      targetsSelf: false,
    };
    const { queue, queueResolutionIndex:qri } = nextState;
    const resolvingCard = _getTopCardInStack(queue, qri);
    if (!resolvingCard) {
      // if there isn't a resolvingCard, it has eliminated itself!!
      // can happen with e.g. Archer who may be forced to kill themselves
      _checkForAdvanceToNextRound(nextState);
    }
    const toDiscard = cardHelper.getDiscardAfterResolution(resolvingCard, queue, qri);
    if (toDiscard) {
      nextState.resolvingCardToBeDiscarded = true;
      _returnToPlayer(nextState);
    } else {
      _checkForAdvanceToNextRound(nextState);
    }
  }

  const _returnToPlayer = (prevState:GameState) => {
    // TODO: save old gameState in history / DB
    _gameState = prevState;
    // by not calling another function, we "drop out of the loop" and control returns
    // to socket management code (game.socket.js) to emit events and new game state
  };

  //----------------------------------------------------------------
  // CARD ABILITIES & EFFECTS
  //----------------------------------------------------------------

  // all of these should return an updated nextState to the caller

  const _eliminate = (targettedIndex:number|null|undefined, resolvingCard:Card, influenceChange:number, prevState:GameState) => {
    console.log('GameManager._eliminate()');
    const nextState = {...prevState};
    const { players, queue, queueResolutionIndex:qri } = nextState;
    if(targettedIndex){
    const targetStack = queue[targettedIndex];
    const targetCard = targetStack.pop();
    // if we now have an empty stack, remove it completely
    if (_getTopCardInStack(queue, targettedIndex) === undefined) {
      queue.splice(targettedIndex, 1);
      // compensate if splice occurs before / on current qri, otherwise card will be missed
      if (targettedIndex <= qri) {
        nextState.queueResolutionIndex -= 1;
      }
    }
  
    // STAYS SAME EVEN IF AMBUSH IS TARGET CARD
    if(targetCard){
    const targetCardOwner = players[targetCard.ownerId];
    targetCardOwner.discardPile.push(targetCard.id);
    const resolvingCardOwner = players[resolvingCard.ownerId];
    resolvingCardOwner.influence += influenceChange;  
    }
  }
    return nextState;
  }

  const _gainInfluence = (resolvingCard:Card, influenceChange:number, prevState:GameState) => {
    console.log('GameManager._gainInfluence() gaining: ', influenceChange);
    const nextState = {...prevState};
    const { players } = nextState;
    const resolvingCardOwner = players[resolvingCard.ownerId];
    resolvingCardOwner.influence += influenceChange;
    return nextState;
  }

  const _steal = (targettedIndex: number|null|undefined, resolvingCard:Card, influenceToSteal:number, prevState:GameState) => {
    console.log('GameManager._steal() stealing: ', influenceToSteal);
    const nextState = {...prevState};
    const { players, queue } = nextState;
    if(targettedIndex){
    const targetCard = _getTopCardInStack(queue, targettedIndex);
    const targetCardOwner = players[targetCard.ownerId];
    const resolvingCardOwner = players[resolvingCard.ownerId];
    targetCardOwner.influence -= influenceToSteal;
    resolvingCardOwner.influence += influenceToSteal;
    }
    return nextState;
  }

  const _discardCard = (prevState:GameState) => {
    console.log('GameManager._discardCard()');
    const nextState = {
      ...prevState,
      resolvingCardToBeDiscarded: false,
    };
    const { players, queue, queueResolutionIndex:qri } = nextState;
    const discardStack = queue[qri];
    const discardedCard = discardStack.pop();
    if (_getTopCardInStack(queue, qri) === undefined) {
      queue.splice(qri, 1);
      // need to compensate or next card would not get to resolve
      nextState.queueResolutionIndex -= 1;
    }
    if(discardedCard){
    const discardedCardOwner = players[discardedCard.ownerId];
    discardedCardOwner.discardPile.push(discardedCard.id);
    }
    return nextState;
  }
  //----------------------------------------------------------------
  // INITIALISE
  //----------------------------------------------------------------

  const initialise = (room:Room) => {

    // TODO: card randomisation
    // TODO: extract into helper
    // TODO: FY shuffle helper

    console.log('GameManager.initialise()');
    const { players, roomId } = room;
    const numPlayers = players.length;
    const colors = [...PLAYER_COLORS];
    const images = [...PLAYER_IMAGES];
    // create a turn order
    // TODO: first player randomisation of turn order
    // convert array of players into an object ref'd by playerId
    interface PlayersObj{
      [id:string]:Player
    }
    const turnOrder:string[] = [];
    const playersObj:PlayersObj = {};
    players.forEach((player, idx) => {
      turnOrder.push(player.id);
      playersObj[player.id] = {
        ...INITIAL_PLAYERSTATE,
        id: player.id,
        color: colors[idx],
        discardPile: [],
        hand: [...STARTING_HAND_SIMPLE],
        imageUrl: images[idx],
        influence: 1,
        name: player.name,
        roomId: roomId,
      }
    });

    _gameState = {
      ...INITIAL_GAMESTATE,
      activePlayerId: turnOrder[0],
      numPlayers: numPlayers,
      players: playersObj,
      queue: [],
      turnOrder: turnOrder
    }
  };
  //----------------------------------------------------------------
  // TRIGGERED BY EVENTS FROM PLAYER
  //----------------------------------------------------------------
  const cardWasPlayed = (cardPlayed:Card, position:number) => {
    console.log('GameManager.cardWasPlayed()');
    // update hand of player that played card
    const nextState = {..._gameState};
    const playerId = cardPlayed.ownerId;
    const player = nextState.players[playerId];
    const updatedHand = player.hand.filter((handCardId:string) => handCardId !== cardPlayed.id);
    player.hand = updatedHand;
    // NB must add card to queue inside an array - queue is nested arrays!
    // TODO: implement adding to stack here
    nextState.queue.splice(position, 0, [cardPlayed]);
    nextState.planningPhasePlayed += 1;
    _checkForAdvanceToResolutionPhase(nextState);
  };

  const cardWasNotRevealed = (qri:number) => {
    console.log('GameManager.cardWasNotRevealed() at queue index: ', qri);
    let nextState = {..._gameState};
    const card = _getTopCardInStack(nextState.queue, qri);
    card.influence += 1;
    _checkForAdvanceToNextRound(nextState);
  }

  const cardWasRevealed = (qri:number) => {
    console.log('GameManager.cardWasRevealed() at queue index: ', qri);
    const nextState = {..._gameState};
    const { queue } = nextState;
    const card = _getTopCardInStack(queue, qri);
    const owner = nextState.players[card.ownerId];
    console.log('card: ', card.name);
    card.revealed = true;
    // TODO: send message saying 'PLAYER revealed CARD.'
    const influenceChange = cardHelper.getInfluenceGainOnReveal(card, queue, qri);
    owner.influence += influenceChange;
    card.influence = 0;
    // TODO: send message saying 'PLAYER gained INFLUENCE influence accumulated on CARD.'
    _requestTargets(nextState);
  }

  const targetWasConfirmed = (targettedIndex:number|null|undefined) => {
    console.log('GameManager.targetWasConfirmed() at queue index: ', targettedIndex);
    // TODO: Royal Decree - needs further prompt from user, should do anyway
    // to alert other players of final choice
    _applyAbility({
      ..._gameState,
      targettedIndex
    });
  }

  const targetSelfWasConfirmed = () => {
    console.log('GameManager.targetSelfWasConfirmed()');
    // TODO: Royal Decree - needs further prompt from user, should do anyway
    // to alert other players of final choice
    _applyAbility(_gameState);
  }

  const noValidTargetWasConfirmed = () => {
    console.log('GameManager.noValidTargetWasConfirmed()');
    _checkForAdvanceToNextRound(_gameState);
  };

  const discardWasConfirmed = (discardIndex:number) => {
    console.log('GameManager.discardWasConfirmed() at queue index: ', discardIndex);
    const nextState = _discardCard(_gameState);
    _checkForAdvanceToNextRound(nextState);
  };

  const interruptWasConfirmed = () => {
    // TODO implement
  }

  return {
    initialise,
    interruptWasConfirmed,
    getGameState,
    cardWasPlayed,
    cardWasNotRevealed,
    cardWasRevealed,
    targetWasConfirmed,
    targetSelfWasConfirmed,
    noValidTargetWasConfirmed,
    discardWasConfirmed,
  }
}

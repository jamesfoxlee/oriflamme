//Unit test not working due to modal acting weird, test it with Cypress.

// import {getByText, render, screen} from '@testing-library/react'
// import Rooms from './Rooms'
// import * as React from 'react'
// import userEvent from '@testing-library/user-event';
// import { SocketContext } from '../../context/socket.context';
// import { UserContext } from '../../context/user.context';
// import { SOCKET_EVENTS } from '../../config/socket.constants';
// import Socket from './services/socket.service';
// import StorageService from './services/storage.service';
// const { LOBBY } = SOCKET_EVENTS;
// const storageService = StorageService();
// let socket;

// describe('RoomItem component', ()=>{
//     const btnFunc= jest.fn();
//     const prop=
//         {  activeRoomId: null,
//             joinRoom: (roomId, player) => {
//                 socket.registerOneShotListener(LOBBY.GAME_STARTING, handleGameStarting);
//                 socket.joinRoom(roomId, player);
//                 setActiveRoomId(roomId);},
//             leaveRoom: (roomId, player) => {
//                 socket.leaveRoom(roomId, player)
//                 setActiveRoomId(null);
//             },
//             setActiveRoomId: ƒ (),
//             startGame: roomId => { socket.startGame(roomId) }

//         }
//         test('Should render the modal form',()=>{
//              render(<Rooms activeRoomId={prop.activeRoomId} joinRoom={prop.joinRoom} leaveRoom={prop.leaveRoom} setActiveRoomId={prop.setActiveRoomId} startGame={prop.startGame} />)
//              screen.getByRole("button", {name:"New Room"})

//          })

//     })

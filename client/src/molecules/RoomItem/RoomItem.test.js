import {getByText, render, screen} from '@testing-library/react'
import RoomItem from './RoomItem'
import * as React from 'react'
import userEvent from '@testing-library/user-event';

describe('RoomItem component', ()=>{
    const btnFunc= jest.fn();
    const prop=
        {activeRoomId:3,
         joinRoom: btnFunc,
         leaveRoom: btnFunc,
         playerIsOwner:true,
         room:{
             roomId:2,
             ownerName:"test",
             roomName:"test name",
             players:{
                 0:{name:"First"},
                 1:{name:"Second"}
             },
             started:false,
         },
         startGame: btnFunc,   
        }
          test('Should show player info',()=>{
           const {getByText}= render(<RoomItem activeRoomId={prop.activeRoomId} joinRoom={prop.joinRoom} leaveRoom={prop.leaveRoom} playerIsOwner={prop.playerIsOwner} room={prop.room} startGame={prop.startGame}/>)
            
            expect(getByText("2 players (First, Second)")).toBeTruthy();
    
        })
          test('Should show the Leave button if activeRoomId===roomId', async ()=>{
           render(<RoomItem activeRoomId={2} joinRoom={prop.joinRoom} leaveRoom={prop.leaveRoom} playerIsOwner={prop.playerIsOwner} room={prop.room} startGame={prop.startGame}/>)
            const testButton=  screen.getByRole("button",{name:/leave/i});
            await userEvent.click(testButton);
            expect(btnFunc).toHaveBeenCalledTimes(1);
        })
        test('Should show the Start button if activeRoomId===roomId and playerIsOwner', async ()=>{
            render(<RoomItem activeRoomId={2} joinRoom={prop.activeRoomId} leaveRoom={prop.leaveRoom} playerIsOwner={prop.playerIsOwner} room={prop.room} startGame={prop.startGame}/>)
             const testButton=  screen.getByRole("button",{name:/start/i});
             await userEvent.click(testButton);
             expect(btnFunc).toHaveBeenCalledTimes(2);
         })
         test('Should not show the Start button if activeRoomId===roomId and !playerIsOwner', async ()=>{
            render(<RoomItem activeRoomId={2} joinRoom={prop.activeRoomId} leaveRoom={prop.leaveRoom} playerIsOwner={false} room={prop.room} startGame={prop.startGame}/>)
             const testButton=  screen.queryByRole("button",{name:/start/i});
            //  await userEvent.click(testButton);
             expect(testButton).toBeNull();
         })
         test('Should  show the Join button if !activeRoomId && !room.started', async ()=>{
           const {getByText}= render(<RoomItem activeRoomId={false} joinRoom={prop.activeRoomId} leaveRoom={prop.leaveRoom} playerIsOwner={false} room={prop.room} startGame={prop.startGame}/>)
            //  const testButton=  screen.getByRole("button",{name:/join/i});
            //  await userEvent.click(testButton);
            //  expect(btnFunc).toHaveBeenCalledTimes(3);
             expect(getByText("Join")).toBeTruthy();
         })

         
         
         

 

    
    })
import  {Player} from "./index"

export type Room={
    roomId: string,
    ownerId: string,
    players: Player[]
    roomName: string,
    ownerName: string,
    started: boolean 
  }
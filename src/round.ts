import { Room } from './room'
import { Participants } from './participants'

export class Round {
  constructor (
    public readonly roundNumber: number,
    public readonly roomSize: number,
    public readonly rooms: Room[]
  ) {}

  getParticipantsFromAllRoomsFor (participant: string): Participants {
    return this.rooms.reduce((participants, room) => {
      participants.add(room.getParticipantsFor(participant))
      return participants
    }, new Participants())
  }

  getAlreadyPairedParticipantsFromAllRoomsFor (participant: string): Participants {
    return this.rooms.reduce((participants, room) => {
      participants.add(room.getAlreadyPairedParticipantsFor(participant))
      return participants
    }, new Participants())
  }
}

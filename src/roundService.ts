import { Participants } from './participants'
import { RawRoom, Room } from './room'
import { Round } from './round'
import { Rounds } from './rounds'

export class RoundService {
    private rounds = new Rounds()

    getHistory (): Round[] {
      return Array.from(this.rounds.values())
    }

    getRoomsForNextRound (roomSize: number, participants: string[]): RawRoom[] {
      const rooms = this.splitParticipantsInRooms(roomSize, new Participants(participants))
      this.rounds.add({ roomSize, rooms })
      return rooms.map(Room.transformToRawRoom)
    }

    private splitParticipantsInRooms (roomSize: number, participants: Participants, rooms = [] as Room[]): Room[] {
      if (participants.size <= roomSize) {
        return [...rooms, new Room(rooms.length + 1, participants)]
      }
      const sortedParticipants = participants.sort()
      const participantsForRoom: Participants = this.getParticipantsForRoom(roomSize, sortedParticipants)
      return this.splitParticipantsInRooms(
        roomSize,
        sortedParticipants.filter(participant => !participantsForRoom.includes(participant)),
        [...rooms, new Room(rooms.length + 1, participantsForRoom)]
      )
    }

    private getParticipantsForRoom (roomSize: number, participants: Participants): Participants {
      if (this.rounds.size === 0) {
        return participants.slice(0, roomSize)
      } else {
        const nextParticipant = participants.getFirst()
        const possibleParticipants = this.rounds.getParticipantsFor(nextParticipant)
        return new Participants([nextParticipant, ...possibleParticipants.slice(0, roomSize - 1).values()])
      }
    }
}

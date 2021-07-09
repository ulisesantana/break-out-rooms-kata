import { Participants } from './participants'
import { RawRoom, Room } from './room'
import { RoundHistory, Rounds } from './rounds'

export class RoundService {
    private rounds = new Rounds()

    getHistory (): RoundHistory[] {
      return this.rounds.getHistory()
    }

    getRoomsForNextRound (roomSize: number, participants: string[]): RawRoom[] {
      const rooms = this.splitParticipantsInRooms(roomSize, new Participants(participants))
      this.rounds.add({ roomSize, rooms })
      return rooms.map(Room.transformToRawRoom)
    }

    private splitParticipantsInRooms (roomSize: number, participants: Participants, rooms = [] as Room[]): Room[] {
      const currentRoomSize = participants.size % roomSize === 0 ? roomSize : roomSize + 1
      if (participants.size <= currentRoomSize) {
        return [...rooms, new Room(rooms.length + 1, participants)]
      }
      const sortedParticipants = participants.sort()
      const participantsForRoom = this.getParticipantsForRoom(currentRoomSize, sortedParticipants)
      return this.splitParticipantsInRooms(
        roomSize,
        sortedParticipants.filter(participant => !participantsForRoom.includes(participant)),
        [...rooms, new Room(rooms.length + 1, participantsForRoom)]
      )
    }

    private getParticipantsForRoom (roomSize: number, participants: Participants, originalParticipants = participants): Participants {
      if (this.rounds.size === 0) {
        return participants.slice(0, roomSize)
      } else {
        // TODO: Handle when you have no more possible combinations
        if (participants.size === 0) {
          return this.getParticipantsForRoomSkippingRounds(roomSize, originalParticipants)
        }
        const nextParticipant = participants.getFirst()
        const possibleParticipants = this.rounds.getPossibleParticipants(nextParticipant)
        if (possibleParticipants.size > 0) {
          return new Participants([nextParticipant, ...possibleParticipants.slice(0, roomSize - 1).values()])
        }
        return this.getParticipantsForRoom(roomSize, participants.slice(1), originalParticipants)
      }
    }

    private getParticipantsForRoomSkippingRounds (roomSize: number, participants: Participants): Participants {
      const nextParticipant = participants.getFirst()
      const possibleParticipants = this.rounds.getPossibleParticipantsSkippingRounds(nextParticipant)
      if (possibleParticipants.size === 0) {
        return new Participants([...participants.slice(0, roomSize).values()])
      }
      return new Participants([nextParticipant, ...possibleParticipants.slice(0, roomSize - 1).values()])
    }
}

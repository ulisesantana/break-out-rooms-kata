import { Participants } from './participants'

interface Room {
    name: string
    participants: Participants
}

interface RawRoom {
  name: string
  participants: string[]
}

interface Round {
    number: number
    roomSize: number
    rooms: Room[]
}

export class RoundOrganizer {
    private rounds: Map<number, Round> = new Map()

    getRoomsForNextRound (roomSize: number, participants: string[]): RawRoom[] {
      const rooms = this.splitParticipantsInRooms(roomSize, new Participants(participants))
      const roundNumber = this.rounds.size + 1
      this.rounds.set(roundNumber, { number: roundNumber, roomSize, rooms })
      return rooms.map(RoundOrganizer.transformToRawRoom)
    }

    getHistory (): Round[] {
      return Array.from(this.rounds.values())
    }

    private splitParticipantsInRooms (roomSize: number, participants: Participants, rooms = [] as Room[]): Room[] {
      if (participants.size <= roomSize) {
        return [...rooms, RoundOrganizer.createRoom(rooms.length + 1, participants)]
      }
      const sortedParticipants = participants.sort()
      const participantsForRoom: Participants = this.getParticipantsForRoom(roomSize, sortedParticipants)

      return this.splitParticipantsInRooms(
        roomSize,
        sortedParticipants.filter(participant => !participantsForRoom.includes(participant)),
        [...rooms, RoundOrganizer.createRoom(rooms.length + 1, participantsForRoom)]
      )
    }

    private getParticipantsForRoom (roomSize: number, participants: Participants): Participants {
      if (this.rounds.size === 0) {
        return participants.slice(0, roomSize)
      } else {
        const nextParticipant = participants.getFirst()
        const possibleParticipants = Array.from(this.rounds.values()).reduce(
          RoundOrganizer.reducePossibleParticipants(nextParticipant),
          new Participants()
        )
        return new Participants([nextParticipant, ...possibleParticipants.slice(0, roomSize - 1).values()])
      }
    }

    private static reducePossibleParticipants (nextParticipant: string) {
      const alreadyPairedParticipants = new Participants()
      return (possibleParticipants: Participants, { rooms }: Round) => {
        for (const room of rooms) {
          if (!room.participants.includes(nextParticipant)) {
            possibleParticipants.add(...room.participants.values())
          } else {
            alreadyPairedParticipants.add(...room.participants.values())
            room.participants.forEach(participant => alreadyPairedParticipants.add(participant))
          }
        }
        alreadyPairedParticipants.delete(nextParticipant)
        possibleParticipants.delete(...alreadyPairedParticipants.values())
        return possibleParticipants.size === 0 ? alreadyPairedParticipants : possibleParticipants
      }
    }

    private static createRoom (roomNumber: number, participants: Participants): Room {
      return {
        name: `Room ${roomNumber}`,
        participants
      }
    }

    private static transformToRawRoom ({ name, participants }: Room): RawRoom {
      return {
        name,
        participants: participants.values()
      }
    }
}

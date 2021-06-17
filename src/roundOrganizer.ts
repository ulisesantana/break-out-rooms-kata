type Participants = string[]

interface Room {
    name: string
    participants: Participants
}

interface Round {
    number: number
    roomSize: number
    rooms: Room[]
}

export class RoundOrganizer {
    private rounds: Map<number, Round> = new Map()

    getRoomsForNextRound (roomSize: number, participants: Participants): Room[] {
      const rooms = this.splitParticipantsInRooms(roomSize, participants)
      const roundNumber = this.rounds.size + 1
      this.rounds.set(roundNumber, { number: roundNumber, roomSize, rooms })
      return rooms
    }

    getHistory (): Round[] {
      return Array.from(this.rounds.values())
    }

    private splitParticipantsInRooms (roomSize: number, participants: Participants, rooms = [] as Room[]): Room[] {
      if (participants.length <= roomSize) {
        return [...rooms, RoundOrganizer.createRoom(rooms.length + 1, participants)]
      }
      const sortedParticipants = Array.from(participants).sort()
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
        const [nextParticipant] = participants
        const possibleParticipants = Array.from(this.rounds.values()).reduce(
          RoundOrganizer.reducePossibleParticipants(nextParticipant),
          new Set<string>()
        )
        return [nextParticipant, ...Array.from(possibleParticipants).slice(0, roomSize - 1)]
      }
    }

    private static reducePossibleParticipants (nextParticipant: string) {
      const alreadyPairedParticipants = new Set<string>()
      return (possibleParticipants: Set<string>, { rooms }: Round) => {
        for (const room of rooms) {
          if (!room.participants.includes(nextParticipant)) {
            room.participants.forEach(participant => possibleParticipants.add(participant))
          } else {
            room.participants.forEach(participant => alreadyPairedParticipants.add(participant))
          }
        }
        alreadyPairedParticipants.delete(nextParticipant)
        alreadyPairedParticipants.forEach(participant => possibleParticipants.delete(participant))
        return possibleParticipants.size === 0 ? alreadyPairedParticipants : possibleParticipants
      }
    }

    private static createRoom (roomNumber: number, participants: Participants): Room {
      return {
        name: `Room ${roomNumber}`,
        participants
      }
    }
}

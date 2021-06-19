import { Participants } from './participants'
import { Round } from './round'
import { RawRoom, Room } from './room'

export interface RoundHistory {
  roundNumber: number
  roomSize: number
  rooms: RawRoom[]
}

export class Rounds {
  private rounds: Map<number, Round> = new Map()
  private maxCombinationsRound!: number

  get size (): number {
    return this.rounds.size
  }

  add ({ roomSize, rooms }: Pick<Round, 'rooms' | 'roomSize'>): void {
    const roundNumber = this.size + 1
    this.rounds.set(roundNumber, new Round(roundNumber, roomSize, rooms))
  }

  getPossibleParticipants (participant: string): Participants {
    return Rounds.getParticipants(participant, this.values())
  }

  getPossibleParticipantsSkippingRounds (participant: string): Participants {
    if (this.maxCombinationsRound === undefined) {
      this.maxCombinationsRound = this.size
    }
    const filterUntilRound = Math.trunc(this.size / this.maxCombinationsRound) * this.maxCombinationsRound
    return Rounds.getParticipants(
      participant,
      this.filter(({ roundNumber }) => roundNumber > filterUntilRound)
    )
  }

  values (): Round[] {
    return Array.from(this.rounds.values())
  }

  filter (filterCallback: (round: Round, index: number, rounds: Round[]) => boolean): Round[] {
    return this.values().filter(filterCallback)
  }

  getHistory (): RoundHistory[] {
    return Array.from(this.rounds.values()).map(round => ({
      ...round,
      rooms: round.rooms.map(Room.transformToRawRoom)
    }))
  }

  private static getParticipants (participant: string, rounds: Round[]): Participants {
    const possibleParticipants = new Participants()
    const alreadyPairedParticipants = new Participants()
    for (const round of rounds) {
      possibleParticipants.add(round.getParticipantsFromAllRoomsFor(participant))
      alreadyPairedParticipants.add(round.getAlreadyPairedParticipantsFromAllRoomsFor(participant))
    }
    possibleParticipants.delete(alreadyPairedParticipants)
    return possibleParticipants
  }
}

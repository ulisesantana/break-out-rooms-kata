import { Participants } from './participants'
import { Round } from './round'

export class Rounds {
  private rounds: Map<number, Round> = new Map()

  get size (): number {
    return this.rounds.size
  }

  add ({ roomSize, rooms }: Pick<Round, 'rooms' | 'roomSize'>): void {
    const roundNumber = this.size + 1
    this.rounds.set(roundNumber, new Round(roundNumber, roomSize, rooms))
  }

  getParticipantsFor (participant: string): Participants {
    const possibleParticipants = new Participants()
    const alreadyPairedParticipants = new Participants()
    for (const round of this.values()) {
      possibleParticipants.add(round.getParticipantsFromAllRoomsFor(participant))
      alreadyPairedParticipants.add(round.getAlreadyPairedParticipantsFromAllRoomsFor(participant))
    }
    possibleParticipants.delete(alreadyPairedParticipants)
    return possibleParticipants.size === 0 ? alreadyPairedParticipants : possibleParticipants
  }

  values (): Round[] {
    return Array.from(this.rounds.values())
  }
}

import { Participants } from './participants'

export interface RawRoom {
  name: string
  participants: string[]
}

export class Room {
  public readonly name: string
  public readonly participants: Participants

  constructor (roomNumber: number, participants: Participants) {
    this.name = `Room ${roomNumber}`
    this.participants = participants
  }

  getParticipantsFor (participant: string): Participants {
    if (this.participants.includes(participant)) {
      return new Participants()
    } else {
      return new Participants(this.participants.values())
    }
  }

  getAlreadyPairedParticipantsFor (participant: string): Participants {
    if (this.participants.includes(participant)) {
      return this.participants.filter(p => p !== participant)
    } else {
      return new Participants()
    }
  }

  static transformToRawRoom ({ name, participants }: Room): RawRoom {
    return {
      name,
      participants: participants.values()
    }
  }
}

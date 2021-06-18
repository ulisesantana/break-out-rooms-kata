export class Participants {
  private readonly participants: Set<string>

  constructor (participants: string[] = []) {
    this.participants = new Set(participants)
  }

  add (...participants: string[]): void {
    participants.forEach(participant => {
      if (participant !== undefined) {
        this.participants.add(participant)
      }
    })
  }

  delete (...participants: string[]): void {
    participants.forEach(participant => {
      if (participant !== undefined) {
        this.participants.delete(participant)
      }
    })
  }

  get size (): number {
    return this.participants.size
  }

  includes (participant: string): boolean {
    return this.participants.has(participant)
  }

  values (): string[] {
    return Array.from(this.participants)
  }

  filter (filterCallback: (participant: string, index: number, participants: string[]) => boolean): Participants {
    return new Participants(this.values().filter(filterCallback))
  }

  forEach (forEachCallback: (participant: string, index: number, participants: string[]) => void): void {
    this.values().filter(forEachCallback)
  }

  getFirst (): string {
    return this.values()[0]
  }

  slice (start: number, end: number): Participants {
    return new Participants(this.values().slice(start, end))
  }

  sort (): Participants {
    return new Participants(Array.from(this.participants.values()).sort())
  }
}
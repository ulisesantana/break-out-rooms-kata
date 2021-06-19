import { RoundService } from './roundService'

describe('Round service should', () => {
  it('retrieve a list of rooms', () => {
    const roundService = new RoundService()
    const roomSize = 2
    const participants = ['Ulises', 'Paco', 'Manu', 'Juan']

    const rooms = roundService.getRoomsForNextRound(roomSize, participants)

    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Manu'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Paco', 'Ulises'])
  })

  it('retrieve a rounds history', () => {
    const roundService = new RoundService()
    const roomSize = 2
    const participants = ['Ulises', 'Paco', 'Manu', 'Juan']

    roundService.getRoomsForNextRound(roomSize, participants)
    roundService.getRoomsForNextRound(roomSize, participants)
    roundService.getRoomsForNextRound(roomSize, participants)

    expect(roundService.getHistory()).toStrictEqual(expectedRoundHistory())
  })

  describe('retrieve a list of rooms across rounds without repeating participants if it is possible', () => {
    it('with the exact number of participants for splitting into the given room size', () => {
      const roundService = new RoundService()
      const roomSize = 2
      const participants = ['Ulises', 'Paco', 'Manu', 'Juan']

      let rooms = roundService.getRoomsForNextRound(roomSize, participants)
      expect(rooms).toHaveLength(2)
      expect(rooms[0].name).toBe('Room 1')
      expect(rooms[0].participants).toStrictEqual(['Juan', 'Manu'])
      expect(rooms[1].name).toBe('Room 2')
      expect(rooms[1].participants).toStrictEqual(['Paco', 'Ulises'])

      rooms = roundService.getRoomsForNextRound(roomSize, participants)
      expect(rooms).toHaveLength(2)
      expect(rooms[0].name).toBe('Room 1')
      expect(rooms[0].participants).toStrictEqual(['Juan', 'Paco'])
      expect(rooms[1].name).toBe('Room 2')
      expect(rooms[1].participants).toStrictEqual(['Manu', 'Ulises'])

      rooms = roundService.getRoomsForNextRound(roomSize, participants)
      expect(rooms).toHaveLength(2)
      expect(rooms[0].name).toBe('Room 1')
      expect(rooms[0].participants).toStrictEqual(['Juan', 'Ulises'])
      expect(rooms[1].name).toBe('Room 2')
      expect(rooms[1].participants).toStrictEqual(['Manu', 'Paco'])
    })

    it('without the exact number of participants for splitting into the given room size', () => {
      const roundService = new RoundService()
      const roomSize = 2
      const participants = ['Ulises', 'Paco', 'Manu', 'Juan', 'Mireia']

      let rooms = roundService.getRoomsForNextRound(roomSize, participants)
      expect(rooms).toHaveLength(2)
      expect(rooms[0].name).toBe('Room 1')
      expect(rooms[0].participants).toStrictEqual(['Juan', 'Manu', 'Mireia'])
      expect(rooms[1].name).toBe('Room 2')
      expect(rooms[1].participants).toStrictEqual(['Paco', 'Ulises'])

      rooms = roundService.getRoomsForNextRound(roomSize, participants)
      expect(rooms).toHaveLength(2)
      expect(rooms[0].name).toBe('Room 1')
      expect(rooms[0].participants).toStrictEqual(['Juan', 'Paco', 'Ulises'])
      expect(rooms[1].name).toBe('Room 2')
      expect(rooms[1].participants).toStrictEqual(['Manu', 'Mireia'])

      rooms = roundService.getRoomsForNextRound(roomSize, participants)
      expect(rooms).toHaveLength(2)
      expect(rooms[0].name).toBe('Room 1')
      expect(rooms[0].participants).toStrictEqual(['Manu', 'Paco', 'Ulises'])
      expect(rooms[1].name).toBe('Room 2')
      expect(rooms[1].participants).toStrictEqual(['Juan', 'Mireia'])

      rooms = roundService.getRoomsForNextRound(roomSize, participants)
      expect(rooms).toHaveLength(2)
      expect(rooms[0].name).toBe('Room 1')
      expect(rooms[0].participants).toStrictEqual(['Mireia', 'Paco', 'Ulises'])
      expect(rooms[1].name).toBe('Room 2')
      expect(rooms[1].participants).toStrictEqual(['Juan', 'Manu'])

      rooms = roundService.getRoomsForNextRound(roomSize, participants)
      expect(rooms).toHaveLength(2)
      expect(rooms[0].name).toBe('Room 1')
      expect(rooms[0].participants).toStrictEqual(['Juan', 'Manu', 'Mireia'])
      expect(rooms[1].name).toBe('Room 2')
      expect(rooms[1].participants).toStrictEqual(['Paco', 'Ulises'])
    })
  })

  it('retrieve a list of rooms across rounds repeating the rooms after maximum combinations', () => {
    const roundService = new RoundService()
    const roomSize = 2
    const participants = ['Ulises', 'Paco', 'Manu', 'Juan']

    roundService.getRoomsForNextRound(roomSize, participants)
    roundService.getRoomsForNextRound(roomSize, participants)
    roundService.getRoomsForNextRound(roomSize, participants)

    let rooms = roundService.getRoomsForNextRound(roomSize, participants)
    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Manu'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Paco', 'Ulises'])

    rooms = roundService.getRoomsForNextRound(roomSize, participants)
    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Paco'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Manu', 'Ulises'])

    rooms = roundService.getRoomsForNextRound(roomSize, participants)
    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Ulises'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Manu', 'Paco'])

    // After no other possible combinations it starts again
    rooms = roundService.getRoomsForNextRound(roomSize, participants)
    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Manu'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Paco', 'Ulises'])

    rooms = roundService.getRoomsForNextRound(roomSize, participants)
    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Paco'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Manu', 'Ulises'])

    rooms = roundService.getRoomsForNextRound(roomSize, participants)
    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Ulises'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Manu', 'Paco'])
  })
})

function expectedRoundHistory () {
  return [
    {
      roomSize: 2,
      rooms: [
        {
          name: 'Room 1',
          participants: [
            'Juan',
            'Manu'
          ]
        },
        {
          name: 'Room 2',
          participants: [
            'Paco',
            'Ulises'
          ]
        }
      ],
      roundNumber: 1
    },
    {
      roomSize: 2,
      rooms: [
        {
          name: 'Room 1',
          participants: [
            'Juan',
            'Paco'
          ]
        },
        {
          name: 'Room 2',
          participants: [
            'Manu',
            'Ulises'
          ]
        }
      ],
      roundNumber: 2
    },
    {
      roomSize: 2,
      rooms: [
        {
          name: 'Room 1',
          participants: [
            'Juan',
            'Ulises'
          ]
        },
        {
          name: 'Room 2',
          participants: [
            'Manu',
            'Paco'
          ]
        }
      ],
      roundNumber: 3
    }
  ]
}

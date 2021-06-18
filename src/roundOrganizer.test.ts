import { RoundOrganizer } from './roundOrganizer'

describe('Round organizer should', () => {
  it('retrieve a list of rooms', () => {
    const roundOrganizer = new RoundOrganizer()
    const roomSize = 2
    const participants = ['Ulises', 'Paco', 'Manu', 'Juan']

    const rooms = roundOrganizer.getRoomsForNextRound(roomSize, participants)

    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Manu'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Paco', 'Ulises'])
  })

  it('retrieve a list of rooms across rounds without repeating participants if it is possible', () => {
    const roundOrganizer = new RoundOrganizer()
    const roomSize = 2
    const participants = ['Ulises', 'Paco', 'Manu', 'Juan']

    let rooms = roundOrganizer.getRoomsForNextRound(roomSize, participants)
    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Manu'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Paco', 'Ulises'])

    rooms = roundOrganizer.getRoomsForNextRound(roomSize, participants)
    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Paco'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Manu', 'Ulises'])

    rooms = roundOrganizer.getRoomsForNextRound(roomSize, participants)
    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Ulises'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Manu', 'Paco'])

    // After no other possible combinations it starts again
    rooms = roundOrganizer.getRoomsForNextRound(roomSize, participants)
    expect(rooms).toHaveLength(2)
    expect(rooms[0].name).toBe('Room 1')
    expect(rooms[0].participants).toStrictEqual(['Juan', 'Manu'])
    expect(rooms[1].name).toBe('Room 2')
    expect(rooms[1].participants).toStrictEqual(['Paco', 'Ulises'])
  })
})

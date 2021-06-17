# Break out rooms kata

When we run workshops via Zoom using break out rooms for several rounds, sometimes we want the people to rotate so that every round they get to practice with different colleagues. When there are 20+ people in total and more than 3 rounds, it's really hard for a human organizer to group people in rooms without repetition. 

As a code kata, write a function that takes the list of attendees, the size of the rooms (number of people per room) and the round number. The function will organize the rooms minimizing the amount of repetition per round. The result of the function is a list of lists containing rooms with participants. The function will be deterministic, given the same round and the same participants and room size, the result will be the same. This will serve as a history. 

This is could be an interesting problem to solve with TDD using property-based testing ;-)

Example:

Participants: 

Jose Angel, Sara, Airan, Sosa, Ruben, Manu M, Cristian, Nazaret, Juan Antonio, Jorge, F. Mesa, Manuel P., Noe, Kevin, Maria, Michael, Ulises, Ricardo, Ivan, Yazmina, Mireia.

Round 1 - Rooms with 3+ people :

 1. Jose Angel, Sara, Airan
 2. Sosa, Ruben, Manu M.
 3. Cristian, Nazaret, Juan Antonio
 4. Jorge, F. Mesa, Manuel P.
 5. Noe, Kevin, Maria
 6. Michael, Ulises, Ricardo
 7. Ivan, Yazmina, Mireia

Round 2 - Rooms with 2+ people:

 1. Sosa - Maria 
 2. Noe - Ruben - Yodra
 3. Mireia - Ricardo
 4. Juan Antonio - Sara
 5. F. Mesa - Nazaret
 6. Crisitian - Manuel P.
 7. Airan - Ulises
 8. Jorge - Manu M.
 9. Ivan - Kevin
10. Jose Angel - Michael

Round 3 - Rooms with 2+ people:

 1. Maria - Sara
 2. Nazaret - Noe
 3. Mireia - Yodra
 4. Ricardo - Cristian
 5. Airan - Manu M.
 6. Juan Antonio - Jose Angel
 7. Kevin - Ruben
 8. Manuel P. - Ivan
 9. Sosa - F. Mesa
10. Ulises - Michael



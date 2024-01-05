import Ship from '../src/modules/ship';

test('Ship length', () => {
  let ship = new Ship(4);
  expect(ship.length).toBe(4);
});

test('Ship hit', () => {
  let ship = new Ship(4);
  ship.hit(0, 0);
  expect(ship.hits).toBe(1);
});

test('Ship sunk', () => {
  let ship = new Ship(4);
  for (let i=0; i < 4; i++) ship.hit(i, 0);
  expect(ship.isSunk()).toBe(true);
});

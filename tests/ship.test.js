import Ship from '../src/Ship';
import Battlefield from '../src/Battlefield';

test('creating ShipObject with length 4', () => {
  const ship = new Ship(4);
  expect(ship.length).toStrictEqual([1, 1, 1, 1]);
});

test('creating ShipObject with length 2', () => {
  const ship = new Ship(2);
  expect(ship.length).toStrictEqual([1, 1]);
});

test('check if hit( change value to 0', () => {
  const ship = new Ship(4);
  expect(ship.hit(2)).toStrictEqual([1, 0, 1, 1]);
});

test('check if isSunk() return true for destroyed ship', () => {
  const ship = new Ship(4);
  ship.length = [0, 0, 0, 0];
  expect(ship.isSunk()).toStrictEqual(true);
});

test('check if isSunk() return false for ok ship', () => {
  const ship = new Ship(4);
  ship.length = [0, 1, 0, 1];
  expect(ship.isSunk()).toStrictEqual(false);
});

//table

test('check table 0,0 = o', () => {
  const battlefield = new Battlefield();
  battlefield.createTable();

  expect(battlefield.table[0][0]).toBe('o');
});

test('check table 9,9 = o', () => {
  const battlefield = new Battlefield();
  battlefield.createTable();

  expect(battlefield.table[9][9]).toBe('o');
});

test('check table 5,9 = o', () => {
  const battlefield = new Battlefield();
  battlefield.createTable();

  expect(battlefield.table[5][9]).toBe('o');
});

//check placeShip()

test('check placeShip() with x.y = 1,2 horizontal', () => {
  const ship = new Ship(4);
  const battlefield = new Battlefield();
  battlefield.createTable();

  battlefield.placeShip(1, 2, ship, 'horizontal');
  expect(battlefield.table[2][1]).toBe(1);
});

test('check placeShip() with x.y = 1,2 horizontal', () => {
  const ship = new Ship(4);
  const battlefield = new Battlefield();
  battlefield.createTable();

  battlefield.placeShip(1, 2, ship, 'horizontal');
  expect(battlefield.table[2][2]).toBe(1);
});

test('check placeShip() with x.y = 1,2 horizontal', () => {
  const ship = new Ship(4);
  const battlefield = new Battlefield();
  battlefield.createTable();

  battlefield.placeShip(1, 2, ship, 'horizontal');
  expect(battlefield.table[2][3]).toBe(1);
});

test('check placeShip() with x.y = 1,2 horizontal', () => {
  const ship = new Ship(4);
  const battlefield = new Battlefield();
  battlefield.createTable();

  battlefield.placeShip(1, 2, ship, 'horizontal');
  expect(battlefield.table[2][4]).toBe(1);
});

test('check placeShip() with x.y = 1,2 vertical', () => {
  const ship = new Ship(4);
  const battlefield = new Battlefield();
  battlefield.createTable();

  battlefield.placeShip(1, 2, ship, 'vertical');
  expect(battlefield.table[3][1]).toBe(1);
});

test('check placeShip() with x.y = 1,2 vertical', () => {
  const ship = new Ship(4);
  const battlefield = new Battlefield();
  battlefield.createTable();

  battlefield.placeShip(1, 2, ship, 'vertical');
  expect(battlefield.table[4][1]).toBe(1);
});

test('check placeShip() with x.y = 1,2 vertical', () => {
  const ship = new Ship(4);
  const battlefield = new Battlefield();
  battlefield.createTable();

  battlefield.placeShip(1, 2, ship, 'vertical');
  expect(battlefield.table[5][1]).toBe(1);
});

//check shipArray

test('check shipArray with placeShip() coords 1,2', () => {
  const ship = new Ship(4);
  const battlefield = new Battlefield();
  battlefield.createTable();

  battlefield.placeShip(1, 2, ship, 'horizontal');

  expect(battlefield.shipArray[0]).toStrictEqual(ship);
});

test('check shipArray with placeShip() coords 1,2', () => {
  const ship = new Ship(4);
  const battlefield = new Battlefield();
  battlefield.createTable();

  battlefield.placeShip(1, 2, ship, 'vertical');

  expect(battlefield.shipArray[0]).toStrictEqual(ship);
});

//check recieveAttack()

test('check recieveAttach(1,2) for hit', () => {
  const ship = new Ship(4);
  const battlefield = new Battlefield();
  battlefield.createTable();
  battlefield.placeShip(1, 2, ship, 'vertical');

  battlefield.recieveAttack(1, 2);

  expect(battlefield.table[2][1]).toBe(0);
});

test('check recieveAttach(1,9) for miss', () => {
  const ship = new Ship(4);
  const battlefield = new Battlefield();
  battlefield.createTable();
  battlefield.placeShip(1, 2, ship, 'vertical');

  battlefield.recieveAttack(1, 9);

  expect(battlefield.table[9][1]).toBe('-');
});

test('check recieveAttach(1,2) && recieveAttack(1,3) for gameOver', () => {
  const ship = new Ship(2);
  const battlefield = new Battlefield();
  battlefield.createTable();
  battlefield.placeShip(1, 2, ship, 'horizontal');

  battlefield.recieveAttack(1, 2);
  battlefield.recieveAttack(2, 2);

  expect(battlefield.isGameOver).toBe(true);
});

test('check recieveAttach(1,2) && recieveAttack(1,4) for gameOver', () => {
  const ship = new Ship(2);
  const battlefield = new Battlefield();
  battlefield.createTable();
  battlefield.placeShip(1, 2, ship, 'horizontal');

  battlefield.recieveAttack(1, 2);
  battlefield.recieveAttack(1, 4);

  expect(battlefield.isGameOver).toBe(false);
});

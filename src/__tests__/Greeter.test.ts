import { Greeter } from '../greeter';

test('My Greeter', () => {
  expect(Greeter('Carl')).toBe('Hello linked Carl');
});

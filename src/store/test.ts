import { Greeter } from '../greeter.js';

export class TestStore {
  constructor(private myName: string) {}

  greet() {
    return Greeter(this.myName);
  }
}

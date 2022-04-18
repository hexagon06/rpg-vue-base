import { Greeter } from '../greeter';

export class TestingStore {
  constructor(private myName: string) {}

  greet() {
    return Greeter(this.myName);
  }
}

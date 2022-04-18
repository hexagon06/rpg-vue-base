import { Greeter } from '../greeter';

export class TestStore {
  constructor(private myName: string) {}

  greet() {
    return Greeter(this.myName);
  }
}

import { Greeter } from '../greeter.js'

export class TestStore {
  constructor(private myName: string) { }

  greet () {
    console.log(Greeter(this.myName))

  }
}

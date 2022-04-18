import { Greeter } from '../greeter.js'

export class TestingStore {
  constructor(private myName: string) {

  }

  greet () {
    return Greeter(this.myName)

  }
}

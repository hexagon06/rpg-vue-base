import { Greeter } from '../greeter.js'

export class TestingStore {
  constructor(private myName: string) {

  }

  greet () {
    console.log(Greeter(this.myName))

  }
}

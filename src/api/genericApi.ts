import { IdItem } from '../models/index';
import { FirebaseClient } from './firebaseClient';
import { FirestoreAcces } from './firestoreAccess';
import { ErrorLogger } from './utils';

export class Api<T extends IdItem> {
  constructor(
    private collection: string,
    private firebaseClient: FirebaseClient,
    private readonly errorLogger: ErrorLogger,
  ) {}

  async get(id: string): Promise<T | undefined> {
    try {
      const firestore = new FirestoreAcces<T>(this.firebaseClient.store, this.collection, this.errorLogger);

      return await firestore.getById(id);
    } catch (e) {
      throw new Error(`failed to get ${id} in ${this.collection}`, { cause: e as Error });
    }
  }

  async create(creature: T): Promise<string> {
    try {
      const firestore = new FirestoreAcces<T>(this.firebaseClient.store, this.collection, this.errorLogger);

      return await firestore.add(creature);
    } catch (e) {
      throw new Error(`failed to create in ${this.collection}`, { cause: e as Error });
    }
  }

  async update(creature: T): Promise<void> {
    try {
      const firestore = new FirestoreAcces<T>(this.firebaseClient.store, this.collection, this.errorLogger);
      await firestore.update(creature);
    } catch (e) {
      throw new Error(`failed to update ${creature.id} in ${this.collection}`, { cause: e as Error });
    }
  }

  async getAll(): Promise<T[]> {
    try {
      const firestore = new FirestoreAcces<T>(this.firebaseClient.store, this.collection, this.errorLogger);

      return await firestore.get();
    } catch (e) {
      throw new Error(`failed to getAll in ${this.collection}`, { cause: e as Error });
    }
  }

  public childOf<C extends IdItem>(id: string, childPath: string) {
    return new Api<C>(`${this.collection}/${id}/${childPath}`, this.firebaseClient, this.errorLogger);
  }
}

import { IdItem } from '../models/index'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { cloneDeep } from 'lodash'
import { getCollection } from './firestoreUtils'
import { ErrorLogger } from './utils'

export class FirestoreAcces<T extends IdItem> {
  // https://firebase.google.com/docs/firestore/manage-data/add-data
  // https://firebase.google.com/docs/firestore/query-data/get-data

  constructor(
    private readonly db: Firestore,
    private readonly entityCollection: string,
    private readonly errorLogger: ErrorLogger) {
  }

  ref () {
    return collection(this.db, this.entityCollection)
  }

  async get (): Promise<T[]> {
    try {
      const result = await getCollection(this.db, this.entityCollection)
      return result.docs.map<T>((value) => {
        return { ...(value.data() as T), id: value.id }
      })
    } catch (error) {
      this.errorLogger(`Error fetching collection "${this.entityCollection}": `, error)
      return []
    }
  }

  async getById (id: string): Promise<T | undefined> {
    try {
      const docRef = doc(this.db, this.entityCollection, id)
      const result = await getDoc(docRef)
      if (result.exists()) {
        return { ...(result.data() as T), id: result.id }
      } else {
        return undefined
      }
    } catch (error) {
      this.errorLogger(`Error fetching document from "${this.entityCollection}": `, error)
      return undefined
    }
  }

  async add (item: T): Promise<string> {
    // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    try {
      delete item.id
      const reference = await addDoc(collection(this.db, this.entityCollection), item)
      return reference.id
    } catch (error) {
      this.errorLogger(`Error adding document to collection"${this.entityCollection}": `, error)
      throw error
    }
  }

  async addAt (item: T, path: string): Promise<void> {
    try {
      delete item.id
      await setDoc(doc(this.db, this.entityCollection, path), item)
    } catch (error) {
      this.errorLogger(`Error adding document to collection "${this.entityCollection}" at ${path}: `, error)
      throw error
    }
  }

  async update (item: T): Promise<void> {
    // https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
    const { id } = item
    if (id === undefined) throw new Error('item.id is undefined, use add(item) instead')
    const entity = cloneDeep(item) as any
    delete entity.id
    try {
      await updateDoc(doc(this.db, this.entityCollection, id), entity)
    } catch (error) {
      this.errorLogger(`Error updating document in "${this.entityCollection}": `, error)
      throw error
    }
  }

  async delete (item: T): Promise<void> {
    const { id } = item
    if (id === undefined) throw new Error('item.id is undefined, is this item stored?')
    try {
      await deleteDoc(doc(this.db, this.entityCollection, id))
    } catch (error) {
      this.errorLogger(`Error deleting document in "${this.entityCollection}": `, error)
      throw error
    }
  }
}

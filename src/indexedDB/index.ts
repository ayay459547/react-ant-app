import Dexie, { Table } from 'dexie'
import { TodoListType, todoListStore } from './models/todoList'

export class AppDB extends Dexie {
  todoList!: Table<TodoListType, number>

  constructor() {
    super('AppDB')
    this.version(1).stores({
      ...todoListStore
    })
  }
}

export const db = new AppDB()

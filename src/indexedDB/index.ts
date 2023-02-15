import Dexie, { Table } from 'dexie'
import { TodoListType, todoListStore } from './models/todoList'
import { 
  ChatListType,
  ChatItemType,
  chatStore 
} from './models/chat'

export class AppDB extends Dexie {
  todoList!: Table<TodoListType, number>
  chatList!: Table<ChatListType, number>
  chatItem!: Table<ChatItemType, number>

  constructor() {
    super('AppDB')
    this.version(2).stores({
      ...todoListStore,
      ...chatStore,
    })
  }
}

export const db = new AppDB()

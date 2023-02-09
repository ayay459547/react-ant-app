import { TodoListType as TempType } from '../../interface/todoList'

export interface TodoListType extends TempType {}

const dbStructure = '++id, context, isCompleted'

export const todoListStore = {
  todoList: dbStructure
}

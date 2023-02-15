export interface ChatListType {
  id?: number
  title: string
}

export interface ChatItemType {
  id?: number
  chatListId: number
  from: 'user' | 'ai'
  text: string
}
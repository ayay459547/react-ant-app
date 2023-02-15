import { 
  ChatListType as TempListType,
  ChatItemType as TempItemType
} from '../../interface/chat'

export interface ChatListType extends TempListType {}
export interface ChatItemType extends TempItemType {}

const dbListStructure = '++id, title'
const dbItemStructure = '++id, chatListId, from, text'

export const chatStore = {
  chatList: dbListStructure,
  chatItem: dbItemStructure
}


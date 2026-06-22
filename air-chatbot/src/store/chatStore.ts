import { create } from 'zustand'
import type { CardScript, QuestionRow } from '../lib/sheet'

export type MessageType =
  | { type: 'bot-text'; text: string }
  | { type: 'card-grid'; cards: CardScript[] }
  | { type: 'user-text'; text: string }
  | { type: 'question-list'; card: CardScript }
  | { type: 'answer'; question: string; answer: string }

export interface ChatMessage {
  id: string
  payload: MessageType
}

interface ChatStore {
  script: CardScript[]
  messages: ChatMessage[]
  history: ChatMessage[][]
  depth: 1 | 2 | 3
  setScript: (s: CardScript[]) => void
  selectCard: (card: CardScript) => void
  selectQuestion: (card: CardScript, q: QuestionRow) => void
  goBack: () => void
  reset: () => void
}

let _id = 0
const id = () => String(++_id)

export const useChatStore = create<ChatStore>((set, get) => ({
  script: [],
  messages: [],
  history: [],
  depth: 1,

  setScript(script) {
    set({
      script,
      depth: 1,
      history: [],
      messages: [
        { id: id(), payload: { type: 'bot-text', text: '안녕하세요! 무엇이 궁금하신가요? 😊' } },
        { id: id(), payload: { type: 'card-grid', cards: script } },
      ],
    })
  },

  selectCard(card) {
    if (card.card_type === 'banner') return
    const { messages, history, depth } = get()
    set({
      depth: 2,
      history: [...history, messages],
      messages: [
        { id: id(), payload: { type: 'user-text', text: card.label } },
        { id: id(), payload: { type: 'question-list', card } },
      ],
    })
    void depth
  },

  selectQuestion(card, q) {
    const { messages, history } = get()
    set({
      depth: 3,
      history: [...history, messages],
      messages: [
        { id: id(), payload: { type: 'user-text', text: q.question } },
        { id: id(), payload: { type: 'answer', question: q.question, answer: q.answer } },
        { id: id(), payload: { type: 'question-list', card } },
      ],
    })
  },

  goBack() {
    const { history } = get()
    if (history.length === 0) return
    const prev = history[history.length - 1]
    set({
      messages: prev,
      history: history.slice(0, -1),
      depth: history.length === 1 ? 1 : 2,
    })
  },

  reset() {
    const { script } = get()
    _id = 0
    set({
      depth: 1,
      history: [],
      messages: [
        { id: id(), payload: { type: 'bot-text', text: '안녕하세요! 무엇이 궁금하신가요? 😊' } },
        { id: id(), payload: { type: 'card-grid', cards: script } },
      ],
    })
  },
}))

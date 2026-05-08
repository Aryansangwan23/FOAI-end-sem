import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useChatStore = create(
  persist(
    (set) => ({
      messages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Hello! I am your SpacePulse AI assistant. I can answer questions about the current ISS location, speed, astronauts in space, or the latest news dashboard data.',
          timestamp: Date.now(),
        }
      ],
      isOpen: false,
      isTyping: false,
      addMessage: (message) =>
        set((state) => {
          const newMessages = [...state.messages, { ...message, id: Date.now().toString() }];
          // Keep only last 30 messages
          if (newMessages.length > 30) {
            return { messages: newMessages.slice(newMessages.length - 30) };
          }
          return { messages: newMessages };
        }),
      clearChat: () =>
        set({
          messages: [
            {
              id: 'welcome',
              role: 'assistant',
              content: 'Chat cleared. How can I help you with the dashboard data?',
              timestamp: Date.now(),
            }
          ]
        }),
      toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
      setTyping: (isTyping) => set({ isTyping }),
    }),
    {
      name: 'chat-storage',
    }
  )
);

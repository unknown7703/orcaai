"use client"
import { Message, ChatContextType } from "@/types/ai";
import { nanoid } from "nanoid";
import { useContext, createContext, useState, ReactNode } from "react";

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [chat, setChat] = useState<Message[]>([]);

  function addChat(chatMessage: Message) {
    if (!chatMessage.id) {
      chatMessage.id = nanoid();
    }
    setChat((prev) => [...prev, chatMessage]);
  }

  function clearChat() {
    setChat([]);
  }

  function restoreChatPoint(id: string) {
    setChat((prev) => {
      const index = prev.findIndex((msg) => msg.id === id);
      if (index === -1) return prev;
      return prev.slice(0, index + 1);
    });
  }

  return (
    <ChatContext.Provider
      value={{ chat, addChat, clearChat, restoreChatPoint }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx)
    throw new Error("useChatContext must be used inside ChatContextProvider");
  return ctx;
};

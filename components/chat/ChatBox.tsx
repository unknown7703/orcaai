// components/chat/ChatBox.tsx
"use client";

import { useState, useCallback } from "react";
import { nanoid } from 'nanoid';
import { useLocalChatConfig } from "@/hooks/useLocalChatConfig";
import { ChatWindow } from "./ChatWindow";
import { InputBox } from "./InputBox";

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [activeMode, setActiveMode] = useLocalChatConfig<ActiveMode>('chat-active-mode', 'plan');
  const [selectedModel, setSelectedModel] = useLocalChatConfig<Model>('chat-selected-model', 'llama3-70b-8192');

  const handleSubmit = useCallback(async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content: inputValue,
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage], 
          mode: activeMode,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();
      
      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: result.response || "Sorry, I couldn't get a response.",
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);

    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, activeMode, selectedModel, messages]);

  return (
    <div className="w-[90%] flex flex-col h-full justify-between">
      <ChatWindow />
      <InputBox
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        isLoading={isLoading}
        activeMode={activeMode}
        onActiveModeChange={setActiveMode}
        selectedModel={selectedModel}
        onSelectedModelChange={setSelectedModel}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

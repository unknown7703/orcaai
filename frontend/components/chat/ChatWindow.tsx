"use client";

import { useState, useEffect, useRef } from "react";
import Chat from "./Chat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ChatWindow() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleResponse(parsedResponse: ChatResponse) {
    let resp_type = parsedResponse.response_type;
    var displayMessage: string = "";
    switch (resp_type) {
      case "text": {
        displayMessage = parsedResponse.responses?.[1]?.message;
        break;
      }
      case "work": {
        displayMessage += "Making Workplan - \n";
        for (const key in parsedResponse.responses) {
          if (parsedResponse.responses.hasOwnProperty(key)) {
            displayMessage += `# ${parsedResponse.responses[key].message} \n`;
          }
        }
        displayMessage += "Starting Work . . . \n";
        break;
      }
      default: {
        console.log("unknown response type");
        displayMessage = "Can not process message";
      }
    }
    setMessages((prev) => [
      ...prev,
      { user: "orca", text: displayMessage || "No response received." },
    ]);
  }

  async function handleUserChat(userInput: string) {
    try {
      const response = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      console.log("Raw Data:", data);

      const parsedContent = JSON.parse(data.content);
      console.log("Parsed Content:", parsedContent);
      handleResponse(parsedContent);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { user: "orca", text: "Error fetching response." },
      ]);
    }
  }

  function handleSendMessage() {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { user: "user", text: input }]);
    handleUserChat(input);
    setInput("");
  }

  return (
    <div className="w-full h-[94%] mx-auto p-4 border rounded-lg shadow">
      <div className="space-y-2 h-[92%] overflow-y-auto p-2 border-b">
        {messages.map((msg, index) => (
          <Chat key={index} user={msg.user} text={msg.text} />
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Orca Ai ..."
        />
        <Button onClick={handleSendMessage}>
          <Send />
        </Button>
      </div>
    </div>
  );
}

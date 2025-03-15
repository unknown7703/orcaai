"use client";
import { useEffect, useRef, useState } from "react";

export default function TerminalDisplay() {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const prevDataRef = useRef<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/terminal_status");

    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        const messages = parsedData.data;

        if (Array.isArray(messages) && JSON.stringify(messages) !== JSON.stringify(prevDataRef.current)) {
          prevDataRef.current = messages;
          setDisplayText(messages);
        }
      } catch (error) {
        console.error("WebSocket message parse error:", error);
      }
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayText]);

  return (
    <div className="h-2/3 w-[98%] bg-[#1D1D1D] rounded-md">
      <div className="bg-[#131313] min-h-12 rounded-t-md font-mono flex items-center px-4">
        Terminal
      </div>
      <div className="px-6 py-4 max-h-[85%] font-mono h-full overflow-y-auto">
        {displayText.map((text, index) => (
          <div key={index} className="flex flex-row text-[#25A067]">
            $ orca-&gt;&nbsp; <p className="text-white">{text}</p>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}

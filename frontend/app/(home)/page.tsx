"use client";

import ChatWindow from "@/components/chat/ChatWindow";

export default function Home() {
  return (
    <div className="flex flex-col py-4 px-10 w-full h-screen">
      <div className="w-1/2 h-full">
        <p className="font-bold text-xl ml-4 mb-2">Orca Ai</p>
        <ChatWindow />
      </div>
    </div>
  );
}

"use client";

import ChatWindow from "@/components/chat/ChatWindow";
import WorkBox from "@/components/workbox/WorkBox";

export default function Home() {
  return (
    <div className="flex flex-row py-4 px-10 w-full h-screen gap-4">
      <div className="w-1/2 h-full">
        <p className="font-bold text-xl ml-4 mb-2">Orca Ai</p>
        <ChatWindow />
      </div>
      <div className="w-1/2 h-full" >
        <WorkBox/>
      </div>
    </div>
  );
}

import { ChatBox } from "@/components/chat/ChatBox";

export default function Chat() {
  return (
    <div className="bg-background-two h-[91vh] px-16 py-6 w-full flex flex-row items-start justify-center">
      <div className="flex flex-col items-center justify-center w-[70%] h-full">
        <ChatBox />
      </div>
    </div>
  );
}

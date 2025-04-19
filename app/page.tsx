import { ChatForm } from "@/components/chat-form";

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-hidden">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 animate-gradient-y"></div>
          <div className="relative h-full">
            <ChatForm />
          </div>
        </div>
      </div>
    </div>
  );
}


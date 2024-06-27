import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") {
      toast("Message cannot be empty.");
      return;
    }
    const newMessage = { text: input, sender: "user", timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-4 space-y-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Real-time Conversation</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96 p-4 border rounded-md">
            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                <div className="text-sm text-gray-500">{message.sender} - {message.timestamp.toLocaleTimeString()}</div>
                <div className="text-lg">{message.text}</div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="w-full max-w-2xl flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button onClick={handleSend}>Send</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Click to send your message</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Index;
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

// Mock function to simulate sending a message to a large language model (LLM)
const sendMessageToLLM = async (message) => {
  // Simulate a delay for the LLM response
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `LLM Response to: ${message}`;
};

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingInput, setEditingInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") {
      toast("Message cannot be empty.");
      return;
    }
    const newMessage = { text: input, sender: "user", timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setInput("");

    // Send message to LLM and get response
    const response = await sendMessageToLLM(input);
    const responseMessage = { text: response, sender: "LLM", timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, responseMessage]);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingInput(messages[index].text);
  };

  const handleSaveEdit = () => {
    const updatedMessages = [...messages];
    updatedMessages[editingIndex].text = editingInput;
    setMessages(updatedMessages);
    setEditingIndex(null);
    setEditingInput("");
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
                <div className="text-sm text-gray-500">
                  {message.sender} - {message.timestamp.toLocaleTimeString()}
                  <Button variant="link" size="sm" onClick={() => handleEdit(index)} className="ml-2">
                    Edit
                  </Button>
                </div>
                <div className="text-lg">{message.text}</div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
      {editingIndex !== null ? (
        <div className="w-full max-w-2xl flex space-x-2">
          <Input
            value={editingInput}
            onChange={(e) => setEditingInput(e.target.value)}
            placeholder="Edit your message..."
            className="flex-1"
          />
          <Button onClick={handleSaveEdit}>Save</Button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Index;
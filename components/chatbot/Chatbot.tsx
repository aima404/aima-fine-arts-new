"use client";
import { MessageSquare } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ui/chat-input";

export default function Chatbot() {
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([
      { text: "Hello! How can I assist you with paintings, pricing, or custom work today?", user: false }
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    async function sendMessage(message: string) {
      setMessages((prev) => [...prev, { text: message, user: true }]);
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setMessages((prev) => [...prev, { text: data.reply, user: false }]);
      } catch (error) {
        console.error("Error sending message:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
        setMessages((prev) => [...prev, { 
          text: "Sorry, I'm having trouble connecting right now. Please make sure the Flask server is running on port 5000.", 
          user: false 
        }]);
      } finally {
        setLoading(false);
      }
    }

  return (
    <div>
      <MessageSquare 
        size={80} 
        className="bg-white p-2 rounded-xl fixed right-12 bottom-[calc(2rem)] cursor-pointer hover:text-sage transition-all duration-300"
        onClick={() => setShowChat(!showChat)}
      />

      {showChat && (
          <div className="fixed right-12 bottom-[calc(4rem+1.5rem)] bg-white rounded-xl shadow-lg h-[475px] w-[400px] z-50">
            <div className="flex flex-col h-full">
                <div className="bg-foreground text-white rounded-t-xl px-5 py-3">
                    <div className="pl-2">
                        <h2 className="text-lg">Chatbot</h2>
                        <p className="italic">Ask me anything!</p>
                    </div>
                    <button 
                        className="absolute text-2xl top-4 right-4 rounded-full hover:bg-sage transtion-all duration-300 px-2"
                        onClick={() => setShowChat(false)}
                    >
                      &times;
                    </button>
                </div>
                
                <div className="flex flex-col flex-1 items-center p-2 overflow-y-auto">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex w-full my-2 p-3 rounded-lg shadow-md ${
                        msg.user ? "bg-sage text-white self-end" : "bg-gray-100 text-black self-start"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}

                  {loading && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-600 p-3 rounded-lg rounded-bl-none">
                          <div className="flex items-center space-x-1">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-sm ml-2">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded-lg">
                        Error: {error}
                      </div>
                    )}
                </div>

                <ChatInput onSend={sendMessage} />
            </div>
          </div>
        )
      }
    </div>
  );
}
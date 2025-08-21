"use client"

import { useState } from 'react';

import { MessageCircleMore } from 'lucide-react';
import dynamic from "next/dynamic";

const Webchat = dynamic(
  () => import("@botpress/webchat").then(mod => mod.Webchat),
  { ssr: false }
);

const clientId = "8677160f-1e52-4219-a59a-8a1b042de06e";

export default function App() {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false)
  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState)
  }

  return (
    <div>
        <Webchat
            clientId={clientId} // Your client ID here
            style={{
            width: '400px',
            height: '600px',
            position: 'fixed',
            bottom: '120px',
            right: '20px',
            transform: isWebchatOpen ? 'scale(1)' : 'scale(0)',
            transformOrigin: 'bottom right',
            transition: 'transform 0.4s ease-in-out',
            }}
            configuration={{
                botName: "chatbot",
                botAvatar: "https://www.svgrepo.com/show/391312/robot.svg",
                botDescription: "have a question? ask me!",
                color: "#3A5A40",
                themeMode: "light",
                variant: "solid",
                fontFamily: "rubik",
                showPoweredBy: false,
                headerVariant: "solid",
                feedbackEnabled: false
            }}
        />
        
        <div
            className="fixed right-12 bottom-[2rem] z-50 flex items-center justify-center bg-sage hover:bg-foreground rounded-full p-4 cursor-pointer transition-all duration-300"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
            onClick={toggleWebchat}
        >
            <MessageCircleMore size={40} className="text-white" />
        </div>
    </div>
  );
}

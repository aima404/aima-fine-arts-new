import { Bot } from "lucide-react";


export default function BotMessage() {
    return (
        <div className="flex w-full my-2 bg-gray-100 p-3 rounded-lg shadow-md">
            <div className="flex items-center justify-center mr-2 p-1 w-8 h-8 border rounded-full">
                <Bot size={35} />
            </div>

            <div>
                <h3>Bot</h3>
                <p>Hello! How can I assist you today?</p>
            </div>
            
        </div>
    )
}
import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
    const [input, setInput] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (input.trim() === "") return;
        onSend(input);
        setInput("");
    }
    return (
        <div className="flex space-x-2 items-center p-2">
            <form onSubmit={handleSubmit} className="flex items-center justify-center w-full space-x-2">
                <input 
                    type="text" 
                    placeholder="Type your message here..."
                    className="flex h-10 w-full rounded-lg border border-sage px-3 text-sm"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="px-2"><Send /></button>
            </form>
        </div>
    );
}
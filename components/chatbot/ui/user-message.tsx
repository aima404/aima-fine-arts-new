import { User } from "lucide-react";


export default function UserMessage() {
    return (
        <div className="flex w-full my-2 bg-sage text-white p-3 rounded-lg shadow-md">
            <div className="flex items-center justify-center mr-2 p-1 w-8 h-8 border rounded-full">
                <User size={35} />
            </div>

            <div>
                <h3>User</h3>
                <p>I need help choosing a size for paintings</p>
            </div>
            
        </div>
    )
}
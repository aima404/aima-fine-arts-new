"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { MessageCircle } from "lucide-react";
import { StarRating } from 'react-flexible-star-rating';

export default function ReviewForm() {
    const [showForm, setShowForm] = useState(false);
    const initialRatingValue = 0;
    const [rating, setRating] = useState(initialRatingValue);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", rating: 5, message: "" });
    const [image, setImage] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let imageUrl = null;
        if (image) {
            const { data, error } = await supabase.storage
                .from("reviews")
                .upload(`images/${Date.now()}-${image.name}`, image);

            if (error) {
                console.error(error);
            }
        
            if (data) {
                const { data: publicUrl } = supabase.storage
                    .from("reviews")
                    .getPublicUrl(data.path);
                    imageUrl = publicUrl.publicUrl;
            } 
        }

        const { error } = await supabase.from("reviews").insert([{
            name: form.name,
            rating: Number(form.rating),
            message: form.message,
            image_url: imageUrl,
        }]);

        if (error) {
            console.error(error);
        }
        else {
            setForm({ name: "", rating: 5, message: "" });
            setImage(null);
        }

        setLoading(false);
    };

  return (
    <div>
        <button
            className="flex text-md rotate-90 p-5 -ml-18 rounded-xl fixed z-50 left-0 bottom-50 text-white bg-foreground hover:bg-sage transition-all duration-300"
            onClick={() => setShowForm(!showForm)}
        >
            <MessageCircle />
            <p className="pl-2">Write a review!</p>
        </button>

        {showForm && (
            <form
                onSubmit={handleSubmit}
                className="w-1/2 fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center space-y-4 p-10 border rounded-xl shadow-md bg-white"
            >
                <div className="text-center">
                    <h2 className="text-lg lg:text-2xl">review form</h2>
                    <p className="text-sm lg:text-lg">if you've purchased something, please feel free to add a review!</p>

                    <button 
                        className="absolute text-2xl top-4 right-4 rounded-full hover:bg-sage transtion-all duration-300 px-2"
                        onClick={() => setShowForm(false)}
                    >
                      &times;
                    </button>
                </div>
                
                <div className="py-5">
                    <label className="py-5 lg:text-lg">name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="name"
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                

                <div className="py-5">
                    <label className="py-5 lg:text-lg">rating</label>
                    <StarRating 
                        initialRating={initialRatingValue} 
                        onRatingChange={setRating}
                    />
                </div>
                
                <div className="py-5">
                    <label className="lg:text-lg">review</label>
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="full review"
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                

                <div className="w-full flex">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-foreground hover:bg-sage text-white px-4 py-2 items-center justify-center rounded-lg disabled:opacity-50 transition-all duration-300 w-full smt-4"
                    >
                        {loading ? "submitting..." : "submit"}
                    </button>
                </div>
            </form>
        )}
    </div>
  );
}
"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import emailjs from '@emailjs/browser'
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { formSchema } from "@/lib/schemas"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

export default function ContactForm() {
    useEffect(() => {
        emailjs.init({
            publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        });
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        message: ""
        },
    })
    
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const templateParams = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                message: values.message
            };

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams
            );

            form.reset();
            toast.success("Message sent successfully!");
        } catch (error) {
            console.error("Error sending email:", error);
            toast.error("Failed to send message. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-1/2 space-y-6 px-5 py-10 border rounded-xl">
                <div className="text-center">
                    <h2 className="text-2xl">contact form</h2>
                    <p>have any questions? fill out this form and receive a response in 1-2 days</p>
                </div>
                <div className="flex flex-row gap-6 w-full"> 
                    <div className="w-1/2">
                        <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>first name</FormLabel>
                            <FormControl>
                                <Input placeholder="first name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="w-1/2">
                        <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>last name</FormLabel>
                            <FormControl>
                                <Input placeholder="last name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>email address</FormLabel>
                        <FormControl>
                            <Input placeholder="email address" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>message</FormLabel>
                        <FormControl>
                           <Textarea
                                id="message"
                                placeholder="enter your question or message here..."
                                className="border border-middlegray block w-full rounded-md py-1.5 px-3
                                shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 min-h-[120px]"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center justify-center">
                    <button
                    type="submit"
                    className="items-center justify-center bg-sage px-10 py-5 text-xl text-white shadow-sm hover:bg-foreground transition-all duration-300 rounded-xl"
                    >
                    submit
                    </button>
                </div>
            </form>
        </Form>
    );
}
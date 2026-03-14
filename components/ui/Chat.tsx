"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_DESIGN_PROMPT } from "../AgentMetadata/SystemPrompt";

const ai = new GoogleGenAI({
	apiKey:"AIzaSyBPutaYLK2CvAJBmHjp7_OhIWnV4XiMW7o"
});

export default function AIAgentPanel() {

	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");
	const [typing, setTyping] = useState(false);

	const bottomRef = useRef<HTMLDivElement | null>(null);

	const [messages, setMessages] = useState([
		{
			role: "model",
			text: "Hi Komal 👋 I can help generate system design flows."
		}
	]);

	const chat = ai.chats.create({
		model: "gemini-3.1-flash-lite-preview",
		config: {
			systemInstruction: SYSTEM_DESIGN_PROMPT
		},
		history: messages
	})

	console.log("Messages:", messages);

	const suggestions = [
		"Generate microservice architecture",
		"Design scalable API system",
		"Create high level system diagram",
		"Explain load balancer"
	];

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, typing]);

	async function sendMessage(text: string) {

		const msg = text;
		if (!msg.trim()) return;

		setMessages(prev => [...prev, { role: "user", text: msg }] );
		setInput("");
		setTyping(true);
		try {
			const response = await chat.sendMessage({
				message: msg
			});
			console.log("AI Response:", response.text);
			setTyping(false);
			setMessages(prev => [...prev, { role: "model", text: response.text===undefined ? "No response received." : response.text }] );
		} catch (error) {
			console.error("Error sending message:", error);
			setTyping(false);
			setMessages(prev => [
				...prev,
				{
					role: "model",
					text: "Sorry, there was an error processing your request."
				}
			]);
		}
	}

	return (
		<>
			{/* Floating Button */}
			{!open && (
				<button
					onClick={() => setOpen(true)}
					className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
				>
					<Bot size={22} />
				</button>
			)}

			{/* AI Sidebar */}
			<AnimatePresence>

				{open && (

					<motion.div
						initial={{ x: 400 }}
						animate={{ x: 0 }}
						exit={{ x: 400 }}
						transition={{ duration: 0.25 }}
						className="fixed right-0 top-0 h-full w-[420px] bg-white border-l shadow-2xl z-50 flex flex-col"
					>

						{/* Header */}
						<div className="flex items-center justify-between px-5 py-4 border-b">

							<div className="flex items-center gap-2 font-semibold">
								<Sparkles size={18} />
								AI Copilot
							</div>

							<button
								onClick={() => setOpen(false)}
								className="p-1 rounded hover:bg-gray-100"
							>
								<X size={18} />
							</button>

						</div>

						{/* Messages */}
						<div className="flex-1 overflow-y-auto p-5 space-y-4">

							{messages.map((msg, i) => (
								<div
									key={i}
									className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
										}`}
								>

									<div
										className={`px-4 py-2 rounded-xl text-sm max-w-[80%] ${msg.role === "user"
											? "bg-black text-white"
											: "bg-gray-100"
											}`}
									>
										{msg.text}
									</div>

								</div>
							))}

							{typing && (
								<div className="flex gap-1">

									<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
									<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
									<span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300" />

								</div>
							)}

							<div ref={bottomRef} />

						</div>

						{/* Suggestions */}
						<div className="px-4 pb-3 flex flex-wrap gap-2">

							{suggestions.map((s, i) => (
								<button
									key={i}
									onClick={() => sendMessage(s)}
									className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
								>
									{s}
								</button>
							))}

						</div>

						{/* Input */}
						<div className="border-t p-4 flex gap-2">

							<input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Create Uber System design..."
								className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
							/>

							<button
								onClick={() => sendMessage(input)}
								className="p-2 bg-black text-white rounded-lg hover:scale-105 transition"
							>
								<Send size={16} />
							</button>

						</div>

					</motion.div>
				)}

			</AnimatePresence>
		</>
	);
}
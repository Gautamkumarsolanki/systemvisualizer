"use client";

import { useState, useRef, useEffect, SetStateAction, Dispatch } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, X, Square } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_DESIGN_PROMPT } from "../AgentMetadata/SystemPrompt";
import { CustomNodeType } from "../Nodes/NodeTypes";
import { Edge, useReactFlow } from "@xyflow/react";
import { CreateGraph } from "@/lib/Creator/creategraph";


interface AIAgentPanelProps {
	setNode: Dispatch<SetStateAction<CustomNodeType[]>>;
	setEdges: Dispatch<SetStateAction<Edge[]>>;
}

export default function AIAgentPanel({ setNode, setEdges }: AIAgentPanelProps) {

	const ai = new GoogleGenAI({
		apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
	});

	const reactFlow = useReactFlow();

	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const stopRef = useRef(false);

	function autoResize() {
		const el = textareaRef.current;
		if (!el) return;

		el.style.height = "auto";
		el.style.height = Math.min(el.scrollHeight, 120) + "px";
	}
	const [open, setOpen] = useState(false);
	const [input, setInput] = useState("");
	const [typing, setTyping] = useState(false);

	const bottomRef = useRef<HTMLDivElement | null>(null);

	const [messages, setMessages] = useState([
		{
			role: "model",
			text: "Hi Gautam 👋 I can help generate system design flows."
		}
	]);

	const extractAndSetGraph = (htmlString: string) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlString, 'text/html');
		const dataNode = doc.getElementById('react-flow-metadata');

		if (dataNode) {
			console.log(dataNode);
			const { nodes, edges } = JSON.parse(dataNode.textContent);
			console.log("nodes:", nodes);
			console.log("edges:", edges);
			CreateGraph(nodes, edges, setNode, setEdges, reactFlow);
		}
	};

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

		stopRef.current = false;

		if (!text.trim()) return;


		// ✅ use functional update to avoid stale state
		let newMessages: any[] = [];

		setMessages(prev => {
			newMessages = [
				...prev,
				{ role: "user", text }
			];
			return newMessages;
		});
		setInput("");

		setTyping(true);

		const MAX_HISTORY = 8;

		const context = newMessages.slice(-MAX_HISTORY);

		const chat = ai.chats.create({
			model: "gemini-2.5-flash",
			config: {
				systemInstruction: SYSTEM_DESIGN_PROMPT
			},
			history: context.map(m => ({
				role: m.role,
				parts: [{ text: m.text }]
			}))
		});
		try {

			const response = await chat.sendMessage({
				message: text
			});
			console.log(response);
			extractAndSetGraph(response.text ?? "<h1>No Response</h1>");
			setTyping(false);
			setMessages(prev => [
				...prev,
				{
					role: "model",
					text: response.text ?? "No response"
				}
			]);

		} catch {

			setTyping(false);

			setMessages(prev => [
				...prev,
				{
					role: "model",
					text: "Error occurred"
				}
			]);

		}
		
		stopRef.current = false;
	}
	return (
		<>
			{/* Floating Button */}
			{!open && (
				<button
					onClick={() => setOpen(true)}
					className="
				fixed bottom-6 right-6 z-50
				w-14 h-14 rounded-full
				bg-black text-white
				dark:bg-white dark:text-black
				flex items-center justify-center
				shadow-xl hover:scale-105 transition
			"
				>
					<Bot size={22} />
				</button>
			)}

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ x: 420 }}
						animate={{ x: 0 }}
						exit={{ x: 420 }}
						transition={{ duration: 0.25 }}
						className="
					fixed right-0 top-0 h-full w-[420px]
					bg-white dark:bg-zinc-900
					text-black dark:text-white
					border-l dark:border-zinc-800
					shadow-2xl z-50
					flex flex-col
				"
					>

						{/* Header */}
						<div
							className="
						backdrop-blur
						bg-white/70 dark:bg-zinc-900/70
						border-b dark:border-zinc-800
						px-5 py-4
						flex items-center justify-between
						sticky top-0 z-10
					"
						>
							<div className="flex items-center gap-2 font-semibold">
								<Sparkles size={18} />
								AI Copilot
							</div>

							<button
								onClick={() => setOpen(false)}
								className="p-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-800"
							>
								<X size={18} />
							</button>
						</div>


						{/* Messages */}
						<div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">

							{messages.map((msg, i) => (
								<div
									key={i}
									className={`flex ${msg.role === "user"
										? "justify-end"
										: "justify-start"
										}`}
								>

									<div
										className={`
									max-w-[80%]
									px-4 py-2
									rounded-2xl text-sm
									shadow-sm
									${msg.role === "user"
												? "bg-black text-white dark:bg-white dark:text-black"
												: "bg-gray-100 dark:bg-zinc-800"
											}
								`}
									>
										{/* <MarkdownViewer content={msg.text} /> */}
										<div dangerouslySetInnerHTML={{ __html: msg.text }} />
									</div>

								</div>
							))}

							{typing && (
								<div className="flex gap-1 px-2">
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
									className="
								text-xs
								px-3 py-1.5
								rounded-full
								bg-gray-100
								dark:bg-zinc-800
								hover:bg-gray-200
								dark:hover:bg-zinc-700
								transition
							"
								>
									{s}
								</button>
							))}

						</div>


						{/* Input */}
						<div
							className="
						border-t dark:border-zinc-800
						p-3
						bg-white dark:bg-zinc-900
					"
						>

							<div
								className="
							flex items-end gap-2
							bg-gray-100 dark:bg-zinc-800
							rounded-xl
							px-2 py-2
						"
							>

								<textarea
									ref={textareaRef}
									value={input}
									rows={1}
									onChange={(e) => {
										setInput(e.target.value);
										autoResize();
									}}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											sendMessage(input);

											setTimeout(() => autoResize(), 0);
										}
									}}
									className="
	flex-1
	bg-transparent
	outline-none
	text-sm
	resize-none
	overflow-hidden
	min-h-[24px]
	max-h-[120px]
"
									placeholder="Ask AI to design system..."
								/>

								{!typing ? <button
									onClick={() => sendMessage(input)}
									className="
								w-9 h-9
								flex items-center justify-center
								rounded-lg
								bg-black text-white
								dark:bg-white dark:text-black
								hover:scale-105
								transition
							"
								>
									<Send size={16} />
								</button> : <button
									onClick={() => stopRef.current = true}
									className="
							w-9 h-9
							flex items-center justify-center
							rounded-lg
							bg-black text-white
							dark:bg-white dark:text-black
							hover:scale-105
							transition
						"
								>
									<Square size={16} />
								</button>}

							</div>

						</div>

					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
"use client";

export default function MarkdownViewer({ content }: { content: string }) {
	return (
		<div
			className="
			prose
			prose-sm
			dark:prose-invert
			max-w-none
			break-words
		"
			dangerouslySetInnerHTML={{ __html: content }}
		/>
	);
}
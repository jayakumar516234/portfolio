import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Sparkles,
  RotateCcw,
  Cpu,
} from "lucide-react";
import { userData } from "../data/userData";
import { sendChatMessage } from "../services/aiService";
import { useTheme } from "../context/ThemeContext";

// Markdown formatter helper for chat bubbles
function FormattedMessage({ text }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 text-xs leading-relaxed">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1" />;

        // Bullet line
        const isBullet = line.trim().startsWith("•") || line.trim().startsWith("*") || line.trim().startsWith("-");
        const cleanLine = isBullet ? line.replace(/^[\s•*-]+/, "").trim() : line;

        // Parse bold **text**, code `code`, and links [text](url)
        const parts = cleanLine.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

        const renderedParts = parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-bold text-slate-900 dark:text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code
                key={pIdx}
                className="rounded-md bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-800 dark:text-emerald-300"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
          if (linkMatch) {
            return (
              <a
                key={pIdx}
                href={linkMatch[2]}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-emerald-600 dark:text-emerald-400 underline decoration-emerald-500/50 hover:decoration-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                {linkMatch[1]}
              </a>
            );
          }
          return part;
        });

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1">
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              <span className="flex-1">{renderedParts}</span>
            </div>
          );
        }

        return <p key={idx}>{renderedParts}</p>;
      })}
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { bgMood } = useTheme();
  const firstName = userData.name.split(" ")[0] || "Developer";

  // API Key & Provider from env or localStorage
  const provider = import.meta.env.VITE_AI_PROVIDER || localStorage.getItem("ai_provider") || "groq";
  const apiKey = import.meta.env.VITE_AI_API_KEY || localStorage.getItem("ai_api_key") || "";
  const [activeModel, setActiveModel] = useState("AI Assistant");

  const [messages, setMessages] = useState([
    {
      id: "init-1",
      from: "bot",
      text: `Hi there! 👋 I am **${firstName}'s AI Assistant**.\n\nAsk me anything about Jaya's React & frontend skills, real-world projects, experience, or download his resume!`,
      time: "Just now",
    },
  ]);

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = (behavior = "smooth") => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight + 1000,
        behavior,
      });
    }
    messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom(messages.length === 1 ? "auto" : "smooth");

      const t1 = setTimeout(() => scrollToBottom("smooth"), 60);
      const t2 = setTimeout(() => scrollToBottom("smooth"), 180);
      const t3 = setTimeout(() => scrollToBottom("smooth"), 320);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [messages, isTyping, open]);

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === "string" ? textToSend : input;
    if (!query.trim() || isTyping) return;

    setHasInteracted(true);
    const userMsg = {
      id: Date.now().toString(),
      from: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Immediately scroll to bottom on send
    setTimeout(() => scrollToBottom("smooth"), 30);

    try {
      const response = await sendChatMessage({
        message: query,
        history: messages,
        apiKey,
        provider,
      });

      if (response.model) {
        setActiveModel(response.model);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          from: "bot",
          text: response.text,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isLiveLLM: response.isLiveLLM,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          from: "bot",
          text: `⚠️ Sorry, I encountered an issue: ${err.message}`,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const chips = [
    { label: "🚀 Core Projects", prompt: "Tell me about Jaya's core projects and tech stack" },
    { label: "⚡ React & Next.js", prompt: "What are Jaya's main frontend skills and experience?" },
    { label: "💼 Sunpro Experience", prompt: "Tell me about Jaya's experience at Sunpro Inno Apps" },
    { label: "📄 Download Resume", prompt: "How can I download Jaya Kumar's resume?" },
    { label: "📬 Contact Info", prompt: "What are Jaya's contact details and email?" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Prompt Pill when Chat is Closed */}
      <AnimatePresence>
        {!open && !hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
            onClick={() => setOpen(true)}
            className="mb-3 hidden sm:flex cursor-pointer items-center gap-2 rounded-2xl border border-emerald-500/40 bg-white/95 dark:bg-slate-900/95 px-4 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 shadow-xl backdrop-blur-xl hover:border-emerald-400 transition-all hover:scale-105"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Ask {firstName}'s AI Assistant</span>
            <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 25, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 25, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="mb-4 flex h-[530px] w-[350px] sm:w-[410px] flex-col overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 shadow-2xl backdrop-blur-2xl ring-1 ring-white/10"
          >
            {/* Animated Header */}
            <div className="relative flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-950/95 px-5 py-3.5">
              <div className="flex items-center gap-3">
                {/* Holographic Bot Avatar */}
                <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500/30 to-teal-400/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 shadow-inner">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-950"></span>
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                    <span>{firstName}'s AI</span>
                    <Sparkles className="h-3.5 w-3.5 text-emerald-500 animate-spin" style={{ animationDuration: "6s" }} />
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400">
                      🟢 Online &amp; Ready
                    </p>
                  </div>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1">
                {/* Reset Chat */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -45 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    setMessages([
                      {
                        id: "reset",
                        from: "bot",
                        text: `Hi there! 👋 I am **${firstName}'s AI Assistant**. Ask me anything!`,
                        time: "Just now",
                      },
                    ])
                  }
                  className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition"
                  title="Reset conversation"
                >
                  <RotateCcw className="h-4 w-4" />
                </motion.button>

                {/* Close */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="rounded-xl p-2 text-slate-500 hover:bg-rose-500/10 hover:text-rose-500 transition"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div
              ref={chatContainerRef}
              className="flex-1 space-y-3.5 overflow-y-auto p-4 text-xs chat-scrollbar"
            >
              {messages.map((m, idx) => (
                <motion.div
                  key={m.id || idx}
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex gap-2.5 ${
                    m.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.from === "bot" && (
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 mt-0.5 shadow-sm">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed transition-all ${
                      m.from === "user"
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-medium rounded-tr-sm shadow-md shadow-emerald-500/20"
                        : "bg-slate-100/90 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-slate-800/90 rounded-tl-sm shadow-sm hover:border-emerald-500/40"
                    }`}
                  >
                    {m.from === "bot" ? (
                      <FormattedMessage text={m.text} />
                    ) : (
                      <p>{m.text}</p>
                    )}
                    <div
                      className={`mt-1.5 flex items-center justify-between text-[9px] ${
                        m.from === "user"
                          ? "text-slate-950/70 font-semibold"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {m.isLiveLLM && (
                        <span className="font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-bold">
                          <Cpu className="h-2.5 w-2.5" /> Live LLM
                        </span>
                      )}
                      <span className="ml-auto">{m.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Animated Typing Wave Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-slate-500"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-slate-100 dark:bg-slate-900 px-4 py-2.5 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                        className="h-2 w-2 rounded-full bg-emerald-500"
                      />
                      <motion.span
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                        className="h-2 w-2 rounded-full bg-teal-400"
                      />
                      <motion.span
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                        className="h-2 w-2 rounded-full bg-cyan-400"
                      />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 ml-1">
                      Thinking...
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Animated Quick Suggestion Chips */}
            <div className="flex gap-1.5 overflow-x-auto px-4 py-2.5 border-t border-slate-200/80 dark:border-slate-800/80 no-scrollbar bg-slate-50/70 dark:bg-slate-950/60">
              {chips.map((chip) => (
                <motion.button
                  key={chip.label}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend(chip.prompt)}
                  className="flex-shrink-0 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors shadow-sm"
                >
                  {chip.label}
                </motion.button>
              ))}
            </div>

            {/* Animated Input Bar */}
            <div className="flex items-center gap-2 border-t border-slate-200/80 dark:border-slate-800/80 p-3.5 bg-white dark:bg-slate-950">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about skills, projects, resume..."
                className="flex-1 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md transition hover:shadow-emerald-500/30 disabled:opacity-40 disabled:hover:scale-100"
                title="Send message"
              >
                <Send className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Animated Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 text-slate-950 shadow-xl shadow-emerald-500/30 transition-all hover:shadow-emerald-500/60"
        aria-label="Toggle chat"
      >
        {/* Breathing Halo Effect */}
        <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 blur-lg opacity-60 group-hover:opacity-100 transition duration-500 -z-10" />

        {/* Status Indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-200 border-2 border-white dark:border-slate-950"></span>
        </span>

        {open ? (
          <X className="h-6 w-6 font-bold transition-transform duration-200 rotate-0" />
        ) : (
          <MessageSquare className="h-6 w-6 transition-transform group-hover:scale-110" />
        )}
      </motion.button>
    </div>
  );
}

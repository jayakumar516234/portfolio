import { userData } from "../data/userData";

// System prompt injecting user's complete portfolio profile
export const createSystemPrompt = () => {
  return `You are the personal AI Assistant representing ${userData.name}.
Your job is to answer questions from recruiters, clients, and visitors about ${userData.name} in a friendly, professional, and knowledgeable tone.

Here is the verified information about ${userData.name}:
- Name: ${userData.name}
- Role: ${userData.role}
- Tagline: ${userData.tagline}
- Location: ${userData.location}
- About: ${userData.about}
- Email: ${userData.email}
- Phone: ${userData.phone || "Available on request"}
- Resume URL: ${userData.resumeUrl}
- Social Links:
  - LinkedIn: ${userData.social.linkedin || "Not provided"}
  - GitHub: ${userData.social.github || "Not provided"}
  - Twitter: ${userData.social.twitter || "Not provided"}
  - WhatsApp: ${userData.social.whatsapp || "Not provided"}

- Skills:
${userData.skills.map((s) => `  * ${s.category}: ${s.items.join(", ")}`).join("\n")}

- Experience:
${userData.experience
  .map(
    (e) =>
      `  * ${e.role} at ${e.company} (${e.duration}) [${e.industry || ""}]\n    Key responsibilities: ${e.points.join("; ")}\n    Tech: ${e.tech.join(", ")}`
  )
  .join("\n")}

- Projects:
${userData.projects
  .map(
    (p) =>
      `  * ${p.title}: ${p.description}\n    Tech: ${p.tech.join(", ")}\n    Demo: ${p.demo || "N/A"} | Repo: ${p.link || "N/A"}`
  )
  .join("\n")}

Guidelines:
1. Always stay in character as ${userData.name}'s helpful AI representative.
2. Keep answers concise, clear, and relevant to the user's question.
3. If asked for contact info or resume, provide the direct links or email.
4. If asked about something not mentioned in the portfolio, be polite and offer to connect them via email at ${userData.email}.
5. You can answer in English or Tamil/Tanglish if the user asks in Tamil/Tanglish.`;
};

// Client-side Fallback Natural Language Processor if no API key is provided
const localIntelligentFallback = (userMessage) => {
  const q = userMessage.toLowerCase().trim();

  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("built") || q.includes("app")) {
    const list = userData.projects
      .map((p) => `🚀 **${p.title}**\n${p.description}\n*Tech:* \`${p.tech.join(", ")}\`${p.demo ? `\n[Live Demo](${p.demo})` : ""}${p.link ? ` | [GitHub](${p.link})` : ""}`)
      .join("\n\n");
    return `Here are the featured projects built by **${userData.name}**:\n\n${list}\n\nWould you like more details on any specific project?`;
  }

  if (q.includes("ai") || q.includes("chatgpt") || q.includes("claude") || q.includes("antigravity")) {
    return `🤖 **${userData.name}** actively leverages advanced AI tools for modern engineering:\n\n• ⚡ **ChatGPT** (Logic structuring & problem solving)\n• 🧠 **Claude AI** (Refactoring, architecture & UI design)\n• 🚀 **Google Antigravity AI** (Autonomous workflow & full-cycle dev)\n• 💡 **Prompt Engineering & AI-Assisted Coding**\n\nThis enables fast turnaround times and high-quality, bug-free production code!`;
  }

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("tool") || q.includes("framework") || q.includes("language")) {
    const skillList = userData.skills
      .map((s) => `• **${s.category}:** ${s.items.map((i) => `\`${i}\``).join(", ")}`)
      .join("\n");
    return `**${userData.name}** specializes in modern frontend & React web development:\n\n${skillList}\n\nStrong focus on responsive UI, performance optimization, and clean architecture!`;
  }

  if (q.includes("experience") || q.includes("job") || q.includes("career") || q.includes("company") || q.includes("work history")) {
    const expList = userData.experience
      .map(
        (e) =>
          `💼 **${e.role}** @ **${e.company}** (${e.duration})\n${e.points.map((pt) => `• ${pt}`).join("\n")}\n*Technologies:* \`${e.tech.join(", ")}\``
      )
      .join("\n\n");
    return `Here is a breakdown of **${userData.name}**'s career journey:\n\n${expList}`;
  }

  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("call") || q.includes("phone") || q.includes("reach") || q.includes("message")) {
    return `You can reach out directly to **${userData.name}**:\n\n• 📧 **Email:** [${userData.email}](mailto:${userData.email})\n• 📱 **Phone:** ${userData.phone || "Available on request"}\n• 💬 **WhatsApp:** [Chat on WhatsApp](${userData.social.whatsapp || "#"})\n• 💼 **LinkedIn:** [View Profile](${userData.social.linkedin || "#"})\n\nOr drop a note in the contact form below!`;
  }

  if (q.includes("resume") || q.includes("cv") || q.includes("download")) {
    return `You can view or download **${userData.name}**'s complete resume here:\n\n📄 **[Download Resume PDF](${userData.resumeUrl})**\n\nFeel free to reach out via email if you need a customized CV!`;
  }

  if (q.includes("who are you") || q.includes("about") || q.includes("bio") || q.includes("introduction") || q.includes("yourself")) {
    return `**${userData.name}** is a **${userData.role}** based in **${userData.location}**.\n\n"${userData.about}"\n\n*Mission:* ${userData.tagline}`;
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("vanakkam") || q.includes("hola")) {
    return `Hello! 👋 Great to meet you! I'm ${userData.name.split(" ")[0]}'s AI assistant. I can walk you through their projects, tech stack, past work experience, or help you schedule a chat. What would you like to know?`;
  }

  if (q.includes("thank") || q.includes("nandri") || q.includes("great") || q.includes("awesome") || q.includes("good")) {
    return `You're very welcome! 😊 Feel free to ask anything else, or click 'Contact' to reach ${userData.name.split(" ")[0]} directly.`;
  }

  return `Thanks for asking! As **${userData.name}**'s assistant, I can give you detailed insights on:\n\n1. 🚀 **Projects & Demos**\n2. ⚡ **Tech Stack & Skills**\n3. 💼 **Work Experience**\n4. 📄 **Resume Download**\n5. 📬 **Direct Contact & Socials**\n\nWhat would you like to explore?`;
};

// Main function to query LLM (Groq / Gemini / OpenAI / OpenRouter or Local Fallback)
export async function sendChatMessage({
  message,
  history = [],
  apiKey = "",
  provider = "groq", // "groq" | "gemini" | "openai" | "openrouter"
}) {
  const envKey = import.meta.env.VITE_AI_API_KEY || "";
  const finalKey = apiKey.trim() || envKey.trim();

  // If no API key is provided, use natural simulated AI response
  if (!finalKey) {
    // Artificial slight thinking delay for realism
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      text: localIntelligentFallback(message),
      isLiveLLM: false,
    };
  }

  try {
    const systemPrompt = createSystemPrompt();

    // 1. Groq API (Free, ultra-fast Llama-3.3-70b-versatile or Llama-3.1-8b)
    if (provider === "groq" || (!provider && finalKey.startsWith("gsk_"))) {
      const messagesPayload = [
        { role: "system", content: systemPrompt },
        ...history.slice(-6).map((m) => ({
          role: m.from === "user" ? "user" : "assistant",
          content: m.text,
        })),
        { role: "user", content: message },
      ];

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${finalKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: messagesPayload,
          temperature: 0.6,
          max_tokens: 800,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `Groq API returned status ${res.status}`);
      }

      const data = await res.json();
      return {
        text: data.choices[0]?.message?.content || "No response received.",
        isLiveLLM: true,
        model: "Llama 3.3 (Groq)",
      };
    }

    // 2. Google Gemini API
    if (provider === "gemini" || finalKey.startsWith("AIza") || finalKey.startsWith("AQ.")) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${finalKey}`;

      const contents = [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }],
        },
      ];

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `Gemini API returned status ${res.status}`);
      }

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return {
        text: reply || "No response received from Gemini.",
        isLiveLLM: true,
        model: "Gemini 3.8 Flash",
      };
    }

    // 3. OpenAI / OpenRouter API
    const endpoint =
      provider === "openrouter"
        ? "https://openrouter.ai/api/v1/chat/completions"
        : "https://api.openai.com/v1/chat/completions";

    const messagesPayload = [
      { role: "system", content: systemPrompt },
      ...history.slice(-6).map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: message },
    ];

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${finalKey}`,
      },
      body: JSON.stringify({
        model: provider === "openrouter" ? "meta-llama/llama-3.1-8b-instruct:free" : "gpt-4o-mini",
        messages: messagesPayload,
        temperature: 0.6,
        max_tokens: 800,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error (${res.status})`);
    }

    const data = await res.json();
    return {
      text: data.choices[0]?.message?.content || "No response received.",
      isLiveLLM: true,
      model: provider === "openrouter" ? "OpenRouter Free" : "GPT-4o mini",
    };
  } catch (error) {
    console.warn("LLM API Error, using fallback engine:", error);
    // Graceful fallback if network or key fails
    return {
      text: `${localIntelligentFallback(message)}\n\n*(Note: LLM API connection error: ${error.message}. Loaded local knowledge fallback.)*`,
      isLiveLLM: false,
      error: error.message,
    };
  }
}

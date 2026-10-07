import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  MessageSquare,
  Send,
  Sparkles,
  Copy,
  Check,
  CheckCircle,
  Download,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, WhatsappIcon } from "./Icons";
import confetti from "canvas-confetti";
import { userData } from "../data/userData";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userData.email);
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#10b981", "#34d399", "#67e8f9"],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
    });

    setSubmitted(true);
    const mailto = `mailto:${userData.email}?subject=Project inquiry from ${encodeURIComponent(
      formData.name
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.open(mailto, "_blank");

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="relative border-t border-slate-200 dark:border-slate-800/80 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Get In Touch</span>
            </div>

            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl leading-tight">
              Have a project in mind? <br />
              <span className="text-gradient font-black">Let's build together.</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-slate-700 dark:text-slate-200">
              I'm always open to discussing new opportunities, high-impact React web applications, or just talking about cutting-edge tech.
            </p>

            {/* Email Card with 1-Click Copy */}
            <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm dark:shadow-none backdrop-blur-md">
              <p className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">DIRECT EMAIL</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
                <a
                  href={`mailto:${userData.email}`}
                  className="font-display text-xl font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                >
                  {userData.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 transition hover:border-emerald-500/40 hover:text-emerald-700 dark:hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-700 dark:text-emerald-300 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links & Resume Download */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={userData.resumeUrl}
                download="Jaya_Kumar_Resume.pdf"
                className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-sm transition hover:bg-emerald-500/25 hover:scale-[1.02]"
                title="Download Jaya Kumar's Resume (PDF)"
              >
                <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Download Resume (PDF)</span>
              </a>

              {userData.social.github && (
                <a
                  href={userData.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-sm dark:shadow-none transition hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-white"
                >
                  <GithubIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>GitHub</span>
                </a>
              )}
              {userData.social.linkedin && (
                <a
                  href={userData.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-sm dark:shadow-none transition hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-white"
                >
                  <LinkedinIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>LinkedIn</span>
                </a>
              )}
              {userData.social.whatsapp && (
                <a
                  href={userData.social.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-sm dark:shadow-none transition hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-white"
                >
                  <WhatsappIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              )}
              {userData.social.twitter && (
                <a
                  href={userData.social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-sm dark:shadow-none transition hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-white"
                >
                  <TwitterIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Twitter</span>
                </a>
              )}
              {userData.phone && (
                <a
                  href={`tel:${userData.phone}`}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-100 shadow-sm dark:shadow-none transition hover:border-emerald-500/40 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-white"
                >
                  <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{userData.phone}</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Quick Message Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl dark:shadow-2xl relative overflow-hidden">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Send a quick message
              </h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                Fill this out and I'll get back to you as soon as possible.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="my-10 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30"
                >
                  <CheckCircle className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="mt-3 font-display text-lg font-bold text-slate-900 dark:text-white">
                    Message Sent!
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 max-w-xs">
                    Thank you for reaching out. Opening your email client to complete transmission.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Sarah Connor"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/80 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="sarah@example.com"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/80 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Hi, I'd like to collaborate on..."
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/80 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition resize-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-500/50 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>Send Message</span>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

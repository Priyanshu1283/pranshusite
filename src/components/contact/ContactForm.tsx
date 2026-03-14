"use client";

import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContactForm } from "@/hooks/useContactForm";

export function ContactForm() {
  const {
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    loading,
    errors,
    toast,
    submit,
  } = useContactForm();

  const inputBase =
    "w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors";
  const inputError = "border-red-500/50";
  const inputNormal = "border-white/10";

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={(e) => {
          e.preventDefault();
          void submit();
        }}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={cn(inputBase, errors.name ? inputError : inputNormal)}
            disabled={loading}
            autoComplete="name"
            suppressHydrationWarning
          />
          <AnimatePresence mode="wait">
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1.5 text-sm text-red-400"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={cn(inputBase, errors.email ? inputError : inputNormal)}
            disabled={loading}
            autoComplete="email"
            suppressHydrationWarning
          />
          <AnimatePresence mode="wait">
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1.5 text-sm text-red-400"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message..."
            rows={5}
            className={cn(
              inputBase,
              "resize-none",
              errors.message ? inputError : inputNormal
            )}
            disabled={loading}
            suppressHydrationWarning
          />
          <AnimatePresence mode="wait">
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1.5 text-sm text-red-400"
              >
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={!loading ? { scale: 1.02 } : undefined}
          whileTap={!loading ? { scale: 0.98 } : undefined}
          suppressHydrationWarning
          className={cn(
            "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-medium transition-colors",
            "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40",
            "hover:bg-cyan-500/30 hover:border-cyan-500/60 disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden /> Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" aria-hidden /> Send message
            </>
          )}
        </motion.button>
      </motion.form>

      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            role="alert"
            className={cn(
              "mt-6 flex items-center gap-3 px-4 py-3 rounded-xl border",
              toast.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            )}
          >
            {toast.type === "success" ? (
              <CheckCircle className="w-5 h-5 shrink-0" aria-hidden />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0" aria-hidden />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

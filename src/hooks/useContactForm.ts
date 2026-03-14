"use client";

import { useState, useCallback, useEffect } from "react";
import { getClientValidationErrors } from "@/validations/contactSchema";
import type { ContactPayload } from "@/types/message";

export type Toast = { type: "success" | "error"; message: string };

const API_ENDPOINT = "/api/contact";
const TOAST_DISMISS_MS = 5000;

export function useContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), TOAST_DISMISS_MS);
    return () => clearTimeout(t);
  }, [toast]);

  const validate = useCallback((): boolean => {
    const next = getClientValidationErrors(name, email, message);
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [name, email, message]);

  const submit = useCallback(async (): Promise<boolean> => {
    if (!validate()) return false;

    setLoading(true);
    setErrors({});
    setToast(null);

    const payload: ContactPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    };

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setToast({
          type: "error",
          message: (data as { error?: string }).error ?? "Something went wrong.",
        });
        return false;
      }

      setToast({
        type: "success",
        message: (data as { message?: string }).message ?? "Message sent successfully!",
      });
      setName("");
      setEmail("");
      setMessage("");
      return true;
    } catch {
      setToast({ type: "error", message: "Network error. Please try again." });
      return false;
    } finally {
      setLoading(false);
    }
  }, [name, email, message, validate]);

  return {
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    loading,
    errors,
    toast,
    validate,
    submit,
  };
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Developer Portfolio",
  description: "Get in touch — send a message via the contact form.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

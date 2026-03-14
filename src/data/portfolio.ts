/**
 * Mock / placeholder data for the portfolio. Update manually.
 */

export const site = {
  name: "Your Name",
  title: "Full Stack Developer",
  tagline: "Crafting digital experiences with code.",
  email: "priyanshukumarbgs066@gmail.com",
  resumeUrl: "/resume.pdf",
};

export const landingPhrases = [
  "Welcome to My Portfolio",
  "Hello Developers",
  "Crafting Digital Experiences",
  "Full Stack Engineer",
];

export const about = {
  title: "About Me",
  intro:
    "I'm a Full Stack Developer passionate about building fast, accessible web applications. I focus on React, Next.js, Node.js, and modern tooling.",
  tech: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind"],
  stats: [
    { label: "Years coding", value: "5+" },
    { label: "Projects built", value: "30+" },
    { label: "Technologies", value: "15+" },
  ],
};

export const skillsCode = `const developer = {
  name: "Priyanshu Kumar",
  role: "MERN Stack Developer",
  skills: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "Tailwind",
    "Three.js"
  ],
  hireable: () => true,
  speak: () => "Let's build something amazing!",
  funFacts: [
    "Debugging at 2AM",
    "Coffee lover",
    "Animation enthusiast"
  ]
};`;

export const skillTitles = ["SKILLS", "WEAPONS", "SUPERPOWERS"];

export const certifications = [
  {
    id: "1",
    title: "FrontEnd Domination",
    issuer: "Sheryians Coding School",
    description:
      "FrontEnd main React library aur Next.js Framework se sikh raha hu. Aur basic HTML, CSS to aati hai. Additional cheezo mein Tailwind CSS ka use karta hu.",
    image: undefined as string | undefined, // e.g. "/certificates/frontend-domination.jpg" — add image to public/certificates/
  },
  {
    id: "2",
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    description: "Validates ability to develop and maintain applications on AWS.",
    image: undefined as string | undefined,
  },
  {
    id: "3",
    title: "Meta Front-End Developer",
    issuer: "Meta",
    description: "Professional certificate in front-end development.",
    image: undefined as string | undefined,
  },
  {
    id: "4",
    title: "Google Cloud Professional",
    issuer: "Google Cloud",
    description: "Cloud architecture and development.",
    image: undefined as string | undefined,
  },
];

export const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    shortDescription: "Full-stack e-commerce with payments and admin dashboard.",
    fullDescription:
      "A modern e-commerce solution with Stripe payments, inventory management, and a responsive admin dashboard. Built with Next.js and Node.js.",
    image: "/projects/project-1.jpg",
    techStack: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind"],
    visitLink: "https://example.com",
    githubLink: "https://github.com/example/repo1",
  },
  {
    id: "2",
    title: "Real-Time Dashboard",
    shortDescription: "Live analytics and monitoring with WebSockets.",
    fullDescription:
      "Real-time data visualization dashboard with WebSocket updates, charts, and alerts. Used for monitoring system metrics.",
    image: "/projects/project-2.jpg",
    techStack: ["React", "Socket.io", "D3.js", "Express"],
    visitLink: "https://example.com",
    githubLink: "https://github.com/example/repo2",
  },
  {
    id: "3",
    title: "Portfolio Generator",
    shortDescription: "Template-based portfolio generator with CMS.",
    fullDescription:
      "Generate and customize portfolio sites from templates with a simple CMS and deploy to Vercel.",
    image: "/projects/project-3.jpg",
    techStack: ["Next.js", "TypeScript", "Vercel", "MDX"],
    visitLink: "https://example.com",
    githubLink: "https://github.com/example/repo3",
  },
];

export const galleryItems = [
  { id: "1", src: "/gallery/1.jpg", alt: "UI experiment", title: "UI Experiment" },
  { id: "2", src: "/gallery/2.jpg", alt: "Code art", title: "Code Art" },
  { id: "3", src: "/gallery/3.jpg", alt: "3D scene", title: "3D Scene" },
  { id: "4", src: "/gallery/4.jpg", alt: "Animation", title: "Animation" },
  { id: "5", src: "/gallery/5.jpg", alt: "Dashboard", title: "Dashboard" },
  { id: "6", src: "/gallery/6.jpg", alt: "Design", title: "Design" },
];

export const socialLinks = [
  { name: "Email", href: "mailto:hello@example.com", icon: "email" },
  { name: "LinkedIn", href: "https://linkedin.com/in/yourprofile", icon: "linkedin" },
  { name: "GitHub", href: "https://github.com/yourprofile", icon: "github" },
  { name: "Instagram", href: "https://instagram.com/yourprofile", icon: "instagram" },
  { name: "Telegram", href: "https://t.me/yourprofile", icon: "telegram" },
  { name: "Snapchat", href: "https://snapchat.com/add/yourprofile", icon: "snapchat" },
  { name: "Twitter", href: "https://twitter.com/yourprofile", icon: "twitter" },
];

export const navMenu = [
  { label: "Landing", href: "#landing" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export const navSocial = [
  { label: "LinkedIn", href: "https://linkedin.com/in/yourprofile" },
  { label: "GitHub", href: "https://github.com/yourprofile" },
  { label: "Leetcode", href: "https://leetcode.com/yourprofile" },
  { label: "Twitter", href: "https://twitter.com/yourprofile" },
  { label: "Instagram", href: "https://instagram.com/yourprofile" },
  { label: "Telegram", href: "https://t.me/yourprofile" },
];

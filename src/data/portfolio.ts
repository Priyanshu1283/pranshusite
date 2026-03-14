/**
 * Mock / placeholder data for the portfolio. Update manually.
 */

export const site = {
  name: "Priyanshu Kumar",
  title: "MERN Stack Developer",
  tagline: "React · Next.js · Node.js · MongoDB · Tailwind CSS ",
  email: "priyanshukumarbgs066@gmail.com",
  /** Add public/resume.pdf when ready; # avoids broken link */
  resumeUrl: "/resume.pdf",
};  

export const landingPhrases = [
  "Available for opportunities",
  "MERN · React · Next.js",
  "Let’s build together",
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
    image: "/certificates/FrontEnd.png",
  },
  {
    id: "2",
    title: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    description: "Validates ability to develop and maintain applications on AWS.",
    image: "/certificates/AWS.png",
  },
  {
    id: "3",
    title: "Salesforce Certified",
    issuer: "Salesforce",
    description: "Professional certificate in Salesforce development and administration.",
    image: "/certificates/Salesforce.png",
  },
  {
    id: "4",
    title: "Cohort Program",
    issuer: "Sheryians Coding School",
    description: "Advanced cohort-based learning and certification.",
    image: "/certificates/Cohort.png",
  },
  {
    id: "5",
    title: "AgentForce",
    issuer: "Salesforce",
    description: "AgentForce certification for AI and automation.",
    image: "/certificates/AgentForce.png",
  },
  {
    id: "6",
    title: "IoT Certification",
    issuer: "PMKVY",
    description: "Internet of Things fundamentals and applications.",
    image: "/certificates/IOT.png",
  },
  {
    id: "7",
    title: "Salesforce PD1",
    issuer: "Salesforce",
    description: "Salesforce Platform Developer I certification.",
    image: "/certificates/Salesforce_PD1.png",
  },
];

export const projects = [
  {
    id: "1",
    title: "TMDB Movie App",
    shortDescription: "Movie discovery app using TMDB API with search and details.",
    fullDescription:
      "A movie discovery application built with React/Next.js, featuring search, trending movies, and detailed movie information using the TMDB API.",
    image: "/projects/tmdb.png",
    techStack: ["React", "Next.js", "TMDB API", "Tailwind"],
    visitLink: "https://plotify-mmdb.vercel.app/",
    githubLink: "https://github.com/Priyanshu1283/Plotify_MMDB",
  },
  {
    id: "2",
    title: "SocySync",
    shortDescription: "Social sync platform for connecting and sharing.",
    fullDescription:
      "A social platform enabling users to connect, share content, and sync with their networks. Built with modern full-stack technologies.",
    image: "/projects/socySync.png",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    visitLink: "https://example.com",
    githubLink: "https://github.com/Priyanshu1283/SocietySync",
  },
  {
    id: "3",
    title: "Weather App",
    shortDescription: "Real-time weather information and forecasts.",
    fullDescription:
      "Weather application providing current conditions and forecasts. Clean UI with location-based weather data.",
    image: "/projects/Weather.png",
    techStack: ["React", "Weather API", "Tailwind"],
    visitLink: "https://weather-now-ai-seven.vercel.app/",
    githubLink: "https://github.com/Priyanshu1283/WeatherNowAi",
  },
];

export const galleryItems = [
  { id: "1", src: "/images/gallery/prannshu.jpg", alt: "Priyanshu", title: "Priyanshu" },
  { id: "2", src: "/images/gallery/prannshu.jpg", alt: "Gallery", title: "Gallery" },
  { id: "3", src: "/images/gallery/prannshu.jpg", alt: "Portfolio", title: "Portfolio" },
];

export const socialLinks = [
  { name: "Email", href: "mailto:hello@example.com", icon: "email" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/priyanshu-kumar-03310a253/", icon: "linkedin" },
  { name: "GitHub", href: "https://github.com/Priyanshu1283", icon: "github" },
  // { name: "Instagram", href: "https://instagram.com/yourprofile", icon: "instagram" },
  { name: "Leetcode", href: "https://leetcode.com/u/Pranshu_066/", icon: "code" },
  // { name: "Snapchat", href: "https://snapchat.com/add/yourprofile", icon: "snapchat" },
  { name: "Twitter", href: "https://x.com/ShivamS89004941", icon: "twitter" },
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
  { label: "LinkedIn", href: "https://www.linkedin.com/in/priyanshu-kumar-03310a253/" },
  { label: "GitHub", href: "https://github.com/Priyanshu1283" },
  { label: "Leetcode", href: "https://leetcode.com/u/Pranshu_066/" },
  { label: "Twitter", href: "https://x.com/ShivamS89004941" },
  // { label: "Instagram", href: "https://instagram.com/yourprofile" },
  // { label: "Telegram", href: "https://t.me/yourprofile" },
];

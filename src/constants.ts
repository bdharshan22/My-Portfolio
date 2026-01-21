
export const HERO_DATA = {
    name: "Dharshan B",
    title: "Full Stack Developer",
    intro: "Building (and occasionally designing) scalable and user-focused web applications. Currently, I’m focused on creating accessible, innovative, and high-performance digital experiences",
};

export const ABOUT_DATA = {
    summary: "I am a passionate developer with expertise in building modern web applications.",
    description: "I am a passionate developer with expertise in building modern web applications."
}

export const EXPERIENCE_DATA = [
    {
        id: "1",
        role: "Senior Frontend Engineer",
        company: "Tech Corp",
        period: "2023 - Present",
        description: "Leading frontend initiatives.",
        summary: "Specialized in React architecture.",
        techStack: ["React", "TypeScript", "Tailwind"]
    }
];



export const CERTIFICATIONS_DATA = [
    {
        id: "1",
        name: "AWS Certified Practitioner",
        issuer: "Amazon Web Services",
        date: "2024",
        credentialUrl: "#"
    },
    {
        id: "2",
        name: "Meta Frontend Developer",
        issuer: "Coursera / Meta",
        date: "2023",
        credentialUrl: "#"
    },
    {
        id: "3",
        name: "Professional Cloud Architect",
        issuer: "Google Cloud",
        date: "2023",
        credentialUrl: "#"
    }
];

export const PROJECTS_DATA = [
    {
        id: "1",
        title: "E-Commerce Platform",
        description: "A comprehensive online shopping solution.",
        fullDescription: "Built a scalable e-commerce platform with real-time inventory management, secure payments, and an intuitive user interface.",
        status: "Completed",
        tags: ["React", "Node.js", "MongoDB"],
        techStack: ["React", "Redux", "Node.js", "Express", "MongoDB", "Stripe"],
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
        features: ["User Authentication", "Product Search", "Shopping Cart", "Payment Gateway"],
        liveUrl: "#",
        githubUrl: "#",
        link: "#", // Keep for compatibility if needed or remove
        github: "#"
    },
    {
        id: "2",
        title: "Task Management App",
        description: "Smart task organization tool.",
        fullDescription: "A collaborative task management application enabling teams to organize, track, and prioritize work efficiently.",
        status: "In Progress",
        tags: ["TypeScript", "Next.js", "Tailwind"],
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
        features: ["Kanban Board", "Real-time Updates", "Team Collaboration"],
        liveUrl: "#",
        githubUrl: "#",
        link: "#",
        github: "#"
    },
    {
        id: "3",
        title: "AI Analytics Dashboard",
        description: "Data visualization and insights platform.",
        fullDescription: "An intelligent dashboard that processes large datasets to provide actionable insights through interactive visualizations and predictive modeling.",
        status: "Beta",
        tags: ["Python", "React", "FastAPI"],
        techStack: ["React", "FastAPI", "Python", "D3.js", "Docker"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        features: ["Predictive Analytics", "Interactive Charts", "Real-time Data Processing", "Exportable Reports"],
        liveUrl: "#",
        githubUrl: "#",
        link: "#",
        github: "#"
    },
    {
        id: "4",
        title: "Social Connect App",
        description: "Modern social networking platform.",
        fullDescription: "A feature-rich social media application focusing on privacy and real-time connections, featuring stories, messaging, and group interactions.",
        status: "Concept",
        tags: ["React Native", "Firebase", "Redux"],
        techStack: ["React Native", "Firebase", "Redux Toolkit", "TypeScript", "Node.js"],
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
        features: ["Real-time Messaging", "Stories", "Group Chats", "Media Sharing"],
        liveUrl: "#",
        githubUrl: "#",
        link: "#",
        github: "#"
    }
];

// Flattened structure for Skills.tsx
export const SKILLS_DATA = [
    // Frontend
    { category: "Frontend", name: "React", iconName: "Code", level: 90 },
    { category: "Frontend", name: "TypeScript", iconName: "FileCode", level: 85 },
    { category: "Frontend", name: "Tailwind CSS", iconName: "Layout", level: 95 },
    { category: "Frontend", name: "Next.js", iconName: "Layers", level: 85 },
    { category: "Frontend", name: "HTML5", iconName: "FileCode", level: 95 },
    { category: "Frontend", name: "CSS3", iconName: "Palette", level: 90 },
    { category: "Frontend", name: "Redux", iconName: "BrainCircuit", level: 80 },

    // Backend
    { category: "Backend", name: "Node.js", iconName: "Server", level: 80 },
    { category: "Backend", name: "Express", iconName: "Server", level: 85 },
    { category: "Backend", name: "PostgreSQL", iconName: "Database", level: 75 },
    { category: "Backend", name: "Python", iconName: "Terminal", level: 70 },
    { category: "Backend", name: "Django", iconName: "Box", level: 65 }, // Using Terminal/Box replacement
    { category: "Backend", name: "Java", iconName: "Coffee", level: 60 },
    { category: "Backend", name: "Rest API", iconName: "Share2", level: 90 },

    // Database
    { category: "Database", name: "MongoDB", iconName: "Database", level: 80 },
    { category: "Database", name: "Redis", iconName: "Database", level: 60 },
    { category: "Database", name: "Firebase", iconName: "Cloud", level: 75 },

    // Tools
    { category: "Tools", name: "Git", iconName: "GitBranch", level: 90 },
    { category: "Tools", name: "Docker", iconName: "Container", level: 70 },
    { category: "Tools", name: "AWS", iconName: "Cloud", level: 65 },
    { category: "Tools", name: "Figma", iconName: "PenTool", level: 75 },
    { category: "Tools", name: "Postman", iconName: "Zap", level: 85 },

    // Languages
    { category: "Languages", name: "JavaScript", iconName: "Code", level: 95 },
    { category: "Languages", name: "TypeScript", iconName: "FileCode", level: 85 },
    { category: "Languages", name: "C++", iconName: "Binary", level: 60 },
    { category: "Languages", name: "SQL", iconName: "Database", level: 75 }
];

export const CONTACT_DATA = {
    email: "dharshancgm2005@gmail.com",
    phone: "+1234567890",
    social: {
        github: "https://github.com/bdharshan22",
        linkedin: "https://www.linkedin.com/in/dharshanb22"
    }
}



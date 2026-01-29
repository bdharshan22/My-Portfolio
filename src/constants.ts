
export const HERO_DATA = {
    name: "Dharshan B",
    title: "Full Stack Web Developer",
    intro: "Specializing in building and designing scalable, user-centric web applications. Dedicated to delivering accessible, innovative, and high-performance digital experiences that drive real value.",
};

export const ABOUT_DATA = {
    summary: "Full Stack Developer passionate about building and designing scalable, user-focused web applications.",
    description: "I focus on creating accessible, innovative, and high-performance digital experiences. My work ensures applications not only look stunning but perform flawlessly, driven by curiosity and a commitment to clean, efficient code."
}





export const CERTIFICATIONS_DATA = [
    {
        id: "1",
        name: "Introduction to Cyber Security",
        issuer: "Cisco",
        date: "2026",
        credentialUrl: "https://www.credly.com/earner/earned/badge/f970e4ed-f04d-4570-a4ba-666d4bd55ef7"
    },
    {
        id: "2",
        name: "Meta Frontend Developer",
        issuer: "Coursera / Meta",
        date: "Ongoing",
        credentialUrl: "#"
    },
    {
        id: "3",
        name: "Software Engineering Virtual Experience",
        issuer: "JP Morgan and Chase via Forage",
        date: "Completed",
        credentialUrl: "#"
    },
    {
        id: "4",
        name: "Microsoft Azure AI Essentials",
        issuer: "Microsoft & LinkedIn Learning",
        date: "2025",
        credentialUrl: "https://www.linkedin.com/learning/certificates/6a95d60dab231818b85157866be5fb9da8ab1b4ce8b3e13218a2a83d000f1c3c?trk=share_certificate"
    }
];

export const PROJECTS_DATA = [
    {
        id: "1",
        title: "Web Application For Domestic Services",
        description: "A platform connecting users with local service providers.",
        fullDescription: "A comprehensive web application designed to bridge the gap between service seekers and domestic workers, facilitating easy booking and management of household services.",
        status: "Completed",
        tags: ["React", "Node.js", "MongoDB"],
        techStack: ["React", "Tailwind", "MongoDB", "Node.js", "JavaScript"],
        image: "/images/Dom-Services.webp",
        features: ["Service Booking", "Provider Profiles", "Real-time Tracking", "Secure Payments"],
        liveUrl: "https://domestic-services-vt.vercel.app/",
        githubUrl: "https://github.com/bdharshan22/Dom-Services",
        link: "#",
        github: "#"
    },
    {
        id: "2",
        title: "Gear Galaxy E-commerce Platform",
        description: "A futuristic online shopping experience.",
        fullDescription: "A robust e-commerce platform featuring a modern UI, real-time inventory management, and secure checkout, tailored for tech enthusiasts.",
        status: "On Progress",
        tags: ["TypeScript", "Next.js", "Tailwind"],
        techStack: ["Next.js", "Tailwind", "Shadcn UI", "Framer Motion", "Supabase", "TypeScript"],
        image: "/images/Gear-Gal.webp",
        features: ["Product Filtering", "Cart Management", "User Reviews", "Admin Dashboard"],
        liveUrl: "#",
        githubUrl: "#",
        link: "#",
        github: "#"
    },
    {
        id: "3",
        title: "Skycam Photography",
        description: "Portfolio and booking site for aerial photography.",
        fullDescription: "A visually stunning showcase for aerial photography services, including gallery management and client booking systems.",
        status: "On Progress",
        tags: ["React", "Framer Motion", "Firebase"],
        techStack: ["Next.js", "Tailwind", "Three.js", "Shadcn UI", "Framer Motion", "TypeScript"],
        image: "/images/Skycam.webp",
        features: ["Interactive Gallery", "Service Booking", "Client Reviews", "Admin Portal"],
        liveUrl: "#",
        githubUrl: "#",
        link: "#",
        github: "#"
    },
    {
        id: "4",
        title: "Portfolio",
        description: "Modern personal portfolio website.",
        fullDescription: "A responsive and interactive portfolio website designed to showcase my projects, skills, and professional journey.",
        status: "Completed",
        tags: ["React", "TypeScript", "Tailwind"],
        techStack: ["React.js", "Tailwind CSS", "TypeScript"],
        image: "/images/Portfolio.webp",
        features: ["Responsive Design", "Dark Mode", "Interactive UI", "Contact Form"],
        liveUrl: "https://dharshanb.vercel.app",
        githubUrl: "https://github.com/bdharshan22/My-Portfolio",
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
    social: {
        github: "https://github.com/bdharshan22",
        linkedin: "https://www.linkedin.com/in/dharshanb22"
    }
}



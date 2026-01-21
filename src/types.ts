
export interface Project {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    techStack: string[];
    features: string[];
    image: string;
    githubUrl?: string;
    liveUrl?: string;
    status: 'Live' | 'In Progress' | 'Beta' | 'Concept';
}

export interface Skill {
    name: string;
    category: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Design' | 'Languages';
    level: number; // 0-100
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    techStack: string[];
    period: string;
    description: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    year: string;
    description?: string;
}





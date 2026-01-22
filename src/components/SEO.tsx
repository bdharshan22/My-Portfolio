import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string[];
    image?: string;
    url?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = "Dharshan B | Full Stack Developer",
    description = "Full Stack Developer specializing in building scalable web applications with React, TypeScript, and Node.js.",
    keywords = ["Full Stack Developer", "React Developer", "Web Development", "Portfolio", "Dharshan B"],
    image = "/images/Portfolio.webp",
    url = "https://dharshanb.vercel.app"
}) => {
    const siteTitle = title === "Dharshan B | Full Stack Developer" ? title : `${title} | Dharshan B`;

    // Structured Data (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Dharshan B",
        "url": url,
        "image": image,
        "sameAs": [
            "https://github.com/bdharshan22",
            "https://www.linkedin.com/in/dharshanb22",
        ],
        "jobTitle": "Full Stack Developer",
        "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
        },
        "description": description
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords.join(", ")} />
            <meta name="author" content="Dharshan B" />
            <meta name="robots" content="index, follow" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;

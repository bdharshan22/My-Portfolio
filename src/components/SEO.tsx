import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    name?: string;
    type?: string;
    image?: string;
    url?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = "Dharshan B | Full Stack Developer",
    description = "Portfolio of Dharshan B, a Full Stack Developer specializing in building scalable and user-focused web applications.",
    name = "Dharshan B",
    type = "website",
    image = "/images/Portfolio.webp", // Ensure this image exists in public/images
    url = "https://dharshanb.vercel.app", // Replace with actual domain if different
}) => {

    // JSON-LD Structured Data for Person
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": name,
        "url": url,
        "image": `${url}${image}`,
        "sameAs": [
            "https://github.com/bdharshan22",
            "https://www.linkedin.com/in/dharshanb22",
            "https://leetcode.com/u/bdharshan22/",
            "https://www.hackerrank.com/profile/bdharshan22"
        ],
        "jobTitle": "Full Stack Developer",
        "description": description
    };

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name="theme-color" content="#4f46e5" /> {/* Indigo-600 */}

            {/* Facebook Tags */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />

            {/* Twitter Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;

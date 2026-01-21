// Use dynamic import for node-fetch if needed, or just use native fetch (available in Node 18+)
// This script bypasses the SDK to check raw API access

const API_KEY = "AIzaSyAe_L3rpKcUypFLf6MQwS-cD9UR6N-a-BA";

async function listModels() {
    console.log("Fetching available models via REST API...");
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            console.log("❌ API Error:", JSON.stringify(data.error, null, 2));
            return;
        }

        if (!data.models) {
            console.log("❌ No models found in response.");
            console.log("Response:", data);
            return;
        }

        console.log("✅ Available Models:");
        data.models.forEach(m => {
            if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                console.log(`- ${m.name}`);
            }
        });

    } catch (error) {
        console.log("❌ Network Error:", error.message);
    }
}

listModels();



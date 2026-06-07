import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Set CORS headers if testing locally
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    // Vercel Serverless Functions use process.env instead of import.meta.env
    const BEHOLD_API_URL = process.env.VITE_INSTAGRAM_API_URL || 'https://feeds.behold.so/wwlaqUzGCPVfhzCloH14';
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing Gemini API Key in backend." });
    }

    // 1. Fetch raw posts from Behold
    const beholdResponse = await fetch(BEHOLD_API_URL);
    if (!beholdResponse.ok) {
      throw new Error(`Behold API responded with ${beholdResponse.status}`);
    }
    const beholdData = await beholdResponse.json();

    if (!beholdData || !beholdData.posts) {
      return res.status(200).json({ posts: [] });
    }

    // Grab the first 5 posts
    const rawPosts = beholdData.posts.slice(0, 5);

    // 2. Initialize Gemini API
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    // 3. Process each post through Gemini
    const postAnalyses = await Promise.all(rawPosts.map(async (post) => {
      const caption = post.prunedCaption || post.caption || "A new update from KCYM Kottiyoor.";
      
      // Prompt for Gemini
      const prompt = `
        Analyze the following Instagram caption from a catholic youth group (KCYM Kottiyoor). 
        Generate two things:
        1. A catchy, short title (max 5 words).
        2. A concise 1-sentence description.
        
        Caption: "${caption}"
        
        Respond ONLY with a JSON object in this exact format:
        {"title": "The Title", "desc": "The description."}
      `;

      try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });
        
        const resultText = response.text;
        const resultData = JSON.parse(resultText);
        
        return {
          ...post,
          aiTitle: resultData.title || "Instagram Update",
          aiDesc: resultData.desc || "Check out our latest update from the youth community."
        };
      } catch (err) {
        console.error("Gemini failed for a post", err);
        return {
          ...post,
          aiTitle: "Instagram Update",
          aiDesc: caption.substring(0, 100) + "..."
        };
      }
    }));

    // Cache the response for 1 hour at edge (CDN) and 10 minutes locally in browser
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    return res.status(200).json({
      posts: postAnalyses
    });

  } catch (error) {
    console.error("Error in feed API:", error);
    return res.status(500).json({ error: error.message });
  }
}

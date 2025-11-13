import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { file, fileType, fileName } = await req.json();
    console.log(`Processing file: ${fileName}, type: ${fileType}`);

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY not configured");
    }

    let extractedText = "";

    const base64Data = file.split(",")[1];
    const mimeType = file.split(";")[0].split(":")[1];

    console.log(`Extracting text from ${fileType.includes("pdf") ? "PDF" : "image"}`);

    // Use OpenAI for text extraction
    const extractionResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // or "gpt-4.1" if you want stronger OCR/text reasoning
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: fileType.includes("pdf")
                  ? "Extract all text from this PDF document. Maintain formatting where possible."
                  : "Extract all visible text from this image using OCR. Maintain structure and reading order.",
              },
              {
                type: "image_url",
                image_url: {
                  url: file, // data URL base64 format
                },
              },
            ],
          },
        ],
      }),
    });

    if (!extractionResponse.ok) {
      const errorText = await extractionResponse.text();
      console.error("OpenAI extraction error:", errorText);
      throw new Error(`OpenAI extraction failed: ${extractionResponse.status}`);
    }

    const extractionResult = await extractionResponse.json();
    extractedText = extractionResult.choices?.[0]?.message?.content || "Could not extract text";
    console.log("Text extracted:", extractedText.substring(0, 100));

    if (!extractedText || extractedText.length < 10) {
      throw new Error("No text could be extracted from the document");
    }

    // Analyze content with OpenAI
    console.log("Analyzing content with AI");
    const analysisResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // fast + inexpensive model
        messages: [
          {
            role: "user",
            content: `Analyze this social media content and provide:
1. An engagement score (0-100)
2. 3-5 suggested post titles
3. 5-10 relevant hashtags
4. 3-5 suggestions to improve engagement
5. 3-5 improvements needed

Content:
${extractedText}

Respond strictly in JSON format:
{
  "score": <number>,
  "titles": ["..."],
  "hashtags": ["..."],
  "suggestions": ["..."],
  "improvements": ["..."]
}`,
          },
        ],
      }),
    });

    if (!analysisResponse.ok) {
      const errorText = await analysisResponse.text();
      console.error("OpenAI analysis error:", errorText);
      throw new Error(`OpenAI analysis failed: ${analysisResponse.status}`);
    }

    const analysisResult = await analysisResponse.json();
    const analysisText = analysisResult.choices?.[0]?.message?.content || "";
    console.log("Analysis result:", analysisText);

    let analysis;
    try {
      const jsonMatch =
        analysisText.match(/```json\s*([\s\S]*?)\s*```/) ||
        analysisText.match(/```\s*([\s\S]*?)\s*```/) ||
        [null, analysisText];
      analysis = JSON.parse(jsonMatch[1]);
    } catch (e) {
      console.error("Failed to parse analysis JSON:", e);
      analysis = {
        score: 70,
        titles: ["Boost Engagement Today", "Maximize Reach with These Tips", "Transform Your Social Media"],
        hashtags: ["#SocialMedia", "#Marketing", "#Engagement", "#Trends", "#Strategy"],
        suggestions: ["Use eye-catching visuals", "Add strong CTAs", "Post at optimal times"],
        improvements: ["Enhance captions", "Optimize for mobile", "Include trending tags"],
      };
    }

    const responseData = {
      extractedText,
      titles: analysis.titles || [],
      hashtags: analysis.hashtags || [],
      suggestions: analysis.suggestions || [],
      engagement: {
        score: analysis.score || 70,
        improvements: analysis.improvements || [],
      },
    };

    return new Response(JSON.stringify(responseData), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in analyze-content function:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error occurred",
        details: error instanceof Error ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});

import OpenAI from 'openai';
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY, 
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000", 
        "X-Title": "BrainFix",                  
    }
});

const analyzeSubmission = async (req, res) => {
    try {
        const { questionText, imageBase64 } = req.body;

        if (!imageBase64) {
            return res.status(400).json({ error: "Please provide an image of the solution." });
        }

        const response = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini",
            response_format: { type: "json_object" },
            max_tokens: 1500,
            messages: [
                {
                    role: "system",
                    content: `You are BrainFix, an expert Socratic math and science tutor. 
                    Analyze the user's handwritten solution step-by-step against the provided question.
                    
                    INSTRUCTIONS:
                    1. Read the provided question carefully.
                    2. Solve the problem yourself step-by-step to find the absolute truth (write this in "ai_internal_logic").
                    3. Look at the uploaded image and extract the student's step-by-step logic.
                    4. Compare your correct steps with the student's steps to find exactly where they deviated.
                    5. Provide the fully corrected step-by-step solution in the "correctSolution" field.
                    6. Identify if the final answer is correct or incorrect.
                    7. If incorrect, find the exact step where the logic or calculation failed, categorize it, and provide an encouraging explanation.
                    8. Generate 2 targeted practice questions.
                    
                    You MUST return your response in the following strict JSON structure (do not wrap in markdown tags like \`\`\`json):
                    {
                        "ai_internal_logic": "Write your own step-by-step correct solution here first to ensure accuracy.",
                        "isCorrect": boolean,
                        "correctSolution": "The full, correct step-by-step solution to show the student exactly how it should be solved.",
                        "errorStep": "String describing the step that went wrong, or null if correct",
                        "errorCategory": "Conceptual | Calculation | Formula | null",
                        "explanation": "Your explanation here. If correct, praise the student.",
                        "practiceQuestions": [
                            {
                                "question": "Practice question text",
                                "difficulty": "Easy | Medium",
                                "conceptToFix": "Short description of concept"
                            }
                        ]
                    }`
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: `The original question is: ${questionText}` },
                        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
                    ]
                }
            ],
        });

        const aiResult = JSON.parse(response.choices[0].message.content);
        res.status(200).json(aiResult);

    } catch (error) {
        console.error("AI Analysis Error:", error);
        res.status(500).json({ error: "Failed to analyze submission" });
    }
};

export default analyzeSubmission;
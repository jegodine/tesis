import Model from '../config/gemini.mjs';

function fileToGenerativePart(base64Image, mimeType) {
    return {
        inlineData: {
            data: base64Image,
            mimeType
        },
    };
}

export async function CallGemini(history, image, type) {
    const prompt = history
    const imageParts = [
        fileToGenerativePart(image, `image/${type}`)
    ];

    const result = await Model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
}
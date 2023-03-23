import axios from 'axios';

const apiKey = process.env.REACT_APP_CHATGPT_API_KEY;
const baseURL = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
const remdeyBot = 'As pharmaceutical specialist in Mexico City, please recommend in spanish: similar medicines along with their approximate prices in Mexican Pesos and the drugstore where they can find it for this medicine: '

export const sendMessageToChatGPT = async (prompt) => {
  try {
    const response = await axios.post(
      baseURL,
      {
        prompt: `${remdeyBot} ${prompt}`,
        max_tokens: 150, // Customize based on desired response length
        n: 1, // Number of responses to generate
        stop: null, // Any sequence where the API will stop generating further tokens
        temperature: 0.5, // Controls randomness of the output
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(error);
    return 'Error: Ooops! algo salio mal, intenta mas tarde por favor';
  }
};

import { Alert } from 'react-native';

interface ChatGPTResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const sendChatGPTRequest = async (message: string): Promise<string> => {
  const apiKey = process.env.OPENAI_API_KEY;
  Alert.alert('API Key:', apiKey);
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API Error Details:', errorData);
      throw new Error(
        `HTTP error! status: ${response.status} - ${
          errorData.error?.message || 'Unknown error'
        }`,
      );
    }

    const data: ChatGPTResponse = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error('No response from ChatGPT');
    }
  } catch (error) {
    console.error('ChatGPT API Error:', error);
    throw error;
  }
};

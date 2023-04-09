import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENAI_API;

export const keyPointsGenerator = async (question) => {
  console.log(question);
  const APIBody = {
    model: "text-davinci-003",
    prompt:
      "Give a summary of the text and indicate a maximum of 9 key points from the text. First give a summary and then generate key points starting with a bullet point" +
      question,
    temperature: 0,
    max_tokens: 2000,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  const config = {
    method: "POST",
    url: "https://api.openai.com/v1/completions",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + `${API_KEY}`,
    },
    data: JSON.stringify(APIBody),
  };
  try {
    const resp = await axios(config);
    console.log(resp);
    return { status: resp.status, data: resp.data.choices[0].text };
  } catch (err) {
    return { status: err.response.status, data: "error" };
  }
};

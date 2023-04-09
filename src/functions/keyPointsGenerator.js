import axios from 'axios';

// Set up the OpenAI API key
const API_KEY =  process.env.REACT_APP_OPENAI_API;

const keyPointsGenerator = async (question) => {

    const APIBody = {
      "model": "text-davinci-003",
      "prompt": "Give a short summary of the text and indicate a maximum of 9 key points from the text" + question,
      "temperature": 0,
      "max_tokens": 2000,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0
    }
    await axios("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      data: JSON.stringify(APIBody)
    }).then((data) => {
      console.log(data.data.choices[0].text);
      return data.data.choices[0].text
    }).catch((err)=>{
        console.log(err)
    });
};

export default keyPointsGenerator;
import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 2 years of experience.",
};

const ChatbotApp = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message: "Give a short summary of the text and indicate a maximum of 9 key points from the text" + message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${process.env.REACT_APP_OPENAI_API}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    // <div className="App">
    //   <div style={{ position:"relative", height: "800px", width: "700px"  }}>
    //     <MainContainer>
    //       <ChatContainer>
    //         <MessageList
    //           scrollBehavior="smooth"
    //           typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
    //         >
    //           {messages.map((message, i) => {
    //             console.log(message)
    //             return <Message key={i} model={message} />
    //           })}
    //         </MessageList>
    //         <MessageInput placeholder="Type message here" onSend={handleSend} />
    //       </ChatContainer>
    //     </MainContainer>
    //   </div>
    // </div>
    <div>
      <button onClick={()=>handleSend("The exercises, dubbed “United Sharp Sword,” have been denounced by Taiwan. China sees Taiwan as its own territory and has not ruled out using force to bring it under its control. The Chinese military’s Eastern Theater Command announced the drills Saturday, describing them as “a serious warning against the Taiwan separatist forces’ collusion with external forces, and a necessary move to defend national sovereignty and territorial integrity.” “The task force simultaneously organized patrols around the island to create an all-round encirclement and deterrent situation,” the Eastern Theater Command said. A total of 71 Chinese warplanes crossed over the Taiwan Strait on Saturday. with 45 entering Taiwan’s air defense identification zone, Taiwan’s defense ministry said in a statement.")}>send</button>
      <div>
        {messages.map((message, i) => {
          console.log(message);
          return <Message key={i} model={message} />;
        })}
      </div>
    </div>
  );
};

export default ChatbotApp;

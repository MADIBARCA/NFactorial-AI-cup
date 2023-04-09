import './App.css';
import AudioToTextConverter from './AudioToTextConverter';
import Header from './layout/header/Header';
import ChatbotApp from './pages/chatbot/ChatBotApp';
import ImageGenerationForm from './pages/image-generation/ImageGenerationForm';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <MainPage/>
      {/* <AudioToTextConverter/> */}
      {/* <ImageGenerationForm/>
      <ChatbotApp/> */}
    </div>
  );
}

export default App;

import './App.css';
import Header from './layout/header/Header';
import ImageGenerationForm from './pages/image-generation/ImageGenerationForm';
import MainPage from './pages/MainPage/MainPage';

function App() {
  return (
    <div className="App">
      <Header/>
      <MainPage/>
      {/* <AudioToTextConverter/> */}
      {/* <ImageGenerationForm/>*/}
    </div>
  );
}

export default App;

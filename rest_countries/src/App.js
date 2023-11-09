
import './App.css';
import Header from './components/Header';
import { useState } from 'react';
import Countries from './components/Countries';


function App() {
  const [darkMode,setDarkMode] = useState(false);
  

  const handleDarkModeClick = () => {
    setDarkMode((prev) => {
      if(prev === true) return false;
      if(prev === false) return true;
    });

  }



  return (
    <main className={`App ${darkMode ? "darkMode": "lightMode"}`}>
      <Header darkMode={darkMode} onClick={handleDarkModeClick}/>
      <Countries darkMode={darkMode} />
    </main>
  );
}

export default App;

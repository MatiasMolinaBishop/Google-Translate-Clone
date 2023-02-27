import { useState, useEffect } from 'react'
import axios from 'axios'

import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";

function App() {

  const [inputLanguage, setInputLanguage] = useState('en')
  const [outputLanguage, setOutputLanguage] = useState('es')
  const [showModal, setShowModal] = useState(null)
  const [languages, setLanguages] = useState(null)
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')


  const getLanguages = async () => {
    const response = await axios('http://localhost:8000/languages')
    setLanguages(response.data)
  }

  console.log('languages', languages)

  const translate = async () => {

    const data = {
      textToTranslate, outputLanguage, inputLanguage
    }


    const response = await axios('http://localhost:8000/translate', { params: data })

    setTranslatedText(response.data)
  }

  console.log('translated:', translatedText)

  useEffect(() => {
    getLanguages()
  }, [])

  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
  }

  return (
    <div className="App">
      {!showModal && <>
        <TextBox
          style='input'
          selectedLanguage={inputLanguage}
          setShowModal={setShowModal}
          textToTranslate={textToTranslate}
          setTextToTranslate={setTextToTranslate}
          setTranslatedText={setTranslatedText}
        />
        <div className="arrow-container" onClick={handleClick}>
          <Arrows />
        </div>
        <TextBox
          style='output'
          selectedLanguage={outputLanguage}
          setShowModal={setShowModal}
          translatedText={translatedText}
          setTranslatedText={setTranslatedText}
          setTextToTranslate={setTextToTranslate}
        />
        <div className='button-container' onClick={translate}>
          <Button />
        </div>
      </>}
      {showModal &&
        <Modal
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={showModal === 'input' ? inputLanguage : outputLanguage}
          setChosenLanguage={showModal === 'input' ? setInputLanguage : setOutputLanguage}
        />}
    </div>
  );
}

export default App;

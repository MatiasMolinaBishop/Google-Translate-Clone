import SelectDropDown from './SelectDropDown'

//Im getting a prop which will determine the style (passed from App.js)
const TextBox = ({style, selectedLanguage, setShowModal, setTextToTranslate, textToTranslate, translatedText, setTranslatedText}) => {

    const handleClick = () => {
        setTextToTranslate('')
        setTranslatedText('')
        
    }



    return(
        <div className={style}>
            <SelectDropDown 
                selectedLanguage={selectedLanguage} 
                setShowModal={setShowModal}
                style={style}
            />
            <textarea
            //The attribute is passed via props and we render the placeholder dynamically depending on the value its given for each TextBox component
            //if style is input then we render Enter Text as place holder. If not we render what comes after : Translation 
                placeholder={style === 'input'? 'Enter Text' : 'Translation'}
            //We wnat to disable the translation so that the user cannot type in it as it should only show the translation
                disabled={style==='output'}
                onChange={(e) => setTextToTranslate(e.target.value)}
                value={style==='input'? textToTranslate:translatedText}
            />
            {style === 'input' && (
                <div className='delete' onClick={handleClick}>x</div>
            )}
        </div>
    )
}

export default TextBox
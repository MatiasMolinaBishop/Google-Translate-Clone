const SelectDropDown = ({selectedLanguage, style, setShowModal}) => {
    return(
        <div className="select-drop-down">
            {/* input will have the selected languages coming from the API */}
            <input value={selectedLanguage} onClick = {() => setShowModal(style)}/>
            <div className="down-arrow">
                <svg 
                focusable="false"
                xmlns="http://wwww.w3.orf/2000/svg"
                viewBox="0 0 24 25"
                >
                    <path d="M7 10l5 5 5-5z"></path>

                </svg>
            </div>
         
        </div>
    )
}

export default SelectDropDown
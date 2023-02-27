//npm i cors, exppress, dotenv 

const PORT = 8000
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())

//We want to create our route so that we can make requests here and not share our keys when we publish om github
//This was on the front end we juis male an axios get call to the /languages url and we will get the list of languages
app.get('/languages', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
        headers: {
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST
        }
    };
    try {
        const response = await axios.request(options)
        //console.log(response.data);
        const arrayOfData = Object.keys(response.data.data.languages).map(key => response.data.data.languages[key])
        //console.log(arrayOfData)
        //const arrayOfDataValues = Object.values(arrayOfData)
        const arrayOfDataValues = arrayOfData.map(code => code.language)
        res.status(200).json(arrayOfDataValues)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err })
    }
})


app.get('/translate', (req, res) => {

    const { textToTranslate, outputLanguage, inputLanguage } = req.query

    const encodedParams = new URLSearchParams();
    encodedParams.append("q", textToTranslate);
    encodedParams.append("target", outputLanguage);
    encodedParams.append("source", inputLanguage);

    const options = {
        method: 'POST',
        url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST
        },
        data: encodedParams
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
        //setTranslatedText(response.data.data.translations[0].translatedText)
        res.status(200).json(response.data.data.translations[0].translatedText)

    }).catch(function (error) {
        console.error(error);
    });


})

app.listen(PORT, () => console.log('Server listening on PORT:' + PORT))
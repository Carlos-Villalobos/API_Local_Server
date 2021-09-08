// Import packages
const express = require('express')
const axios = require('axios')
const morgan = require('morgan')

// Using packages
const app = express()

// set port for APP
let port = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(morgan('dev'))

/*
NOTA IMPORTANTE:
Para los get y post solo funcionan los id a partir de 3542517 al 3542521
Si se pone uno menor sale un 404
*/
// GET Method Neo
app.get('/getNeo', (req, res) => {

    const END_POINT = 'https://api.nasa.gov/neo/rest/v1/neo/'
    const id = '3542519'
    const api_key='api_key=SdAAwAcnirFUzMARoKfuoNrSbvazILcHjCLV4LEq'

    axios.get(END_POINT + id + '?' + api_key)
        .then(function (response) {
            res.send(response.data)
        })
})

//POST Method NEO
app.post('/postNeo', (req, res) => {

    const { id } = req.body
    const END_POINT = 'https://api.nasa.gov/neo/rest/v1/neo/'
    const api_key='api_key=SdAAwAcnirFUzMARoKfuoNrSbvazILcHjCLV4LEq'

    axios.get(`${END_POINT + id + '?' + api_key}`)
    
        .then(function(response){
            const { name, close_approach_data } = response.data
            res.json({ name, close_approach_data })
        })

        //try, catch
        .catch(function(error){
            const error_code = error.response.status;
            const { message } = error
            res.status(error_code).json({ message })
        })

})
//--------------------------------------------------------------------------------------
/*
NOTA IMPORTANTE:
Para los get y post solo funcionan los id a partir de 2015-06-13 al 2021-08-29
Si se pone uno menor sale un 404
*/
// GET Method EPIC
app.get('/getEpic', (req, res) => {

    const END_POINT = 'https://api.nasa.gov/EPIC/api/natural/date/'
    const date = '2019-05-30'
    const api_key='api_key=SdAAwAcnirFUzMARoKfuoNrSbvazILcHjCLV4LEq'

    axios.get(END_POINT + date + '?' + api_key)
        .then(function (response) {
            res.send(response.data)
        })
})
//--------------------------------------------------------------------------------------
// GET Method DONKI
app.get('/getDonki', (req, res) => {

    const END_POINT = 'https://api.nasa.gov/DONKI/IPS?'
    const location = 'location=EARTH'
    const api_key='api_key=SdAAwAcnirFUzMARoKfuoNrSbvazILcHjCLV4LEq'

    axios.get(END_POINT + location + '&' + api_key)
        .then(function (response) {
            res.send(response.data)
        })
})
//--------------------------------------------------------------------------------------
// GET Method MRP
app.get('/getMRP', (req, res) => {

    const END_POINT = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?'
    const sol = 'sol=1000'
    const api_key='api_key=SdAAwAcnirFUzMARoKfuoNrSbvazILcHjCLV4LEq'

    axios.get(END_POINT + sol + '&' + api_key)
        .then(function (response) {
            res.send(response.data)
        })
})

//POST Method MRP
app.post('/postMRP', (req, res) => {

    const { sol } = req.body
    const END_POINT = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?'
    const api_key='api_key=SdAAwAcnirFUzMARoKfuoNrSbvazILcHjCLV4LEq'

    axios.get(`${END_POINT + 'sol=' + sol + '&' + api_key}`)
    
        .then(function(response){
            const { photos } = response.data
            res.json({ photos })
        })

        //try, catch
        .catch(function(error){
            const error_code = error.response.status;
            const { message } = error
            res.status(error_code).json({ message })
        })

})
//--------------------------------------------------------------------------------------
// GET Method EONET
app.get('/getEonet', (req, res) => {

    const END_POINT = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/events?'
    const status = 'status=open'

    axios.get(END_POINT + status)
        .then(function (response) {
            res.send(response.data)
        })
})

//POST Method EONET
app.post('/postEonet', (req, res) => {

    const { id } = req.body
    const END_POINT = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/'

    axios.get(`${END_POINT + id }`)
    
        .then(function(response){
            const { title, description, events } = response.data
            res.json({ title, description, events })
        })

        //try, catch
        .catch(function(error){
            const error_code = error.response.status;
            const { message } = error
            res.status(error_code).json({ message })
        })

})
//--------------------------------------------------------------------------------------
//POST Method EARTH
app.post('/postEarth', (req, res) => {

    const { lon } = req.body
    const { lat } = req.body
    const { date } = req.body
    const { dim } = req.body
    const END_POINT = 'https://api.nasa.gov/planetary/earth/assets?'
    const api_key='api_key=SdAAwAcnirFUzMARoKfuoNrSbvazILcHjCLV4LEq'

    axios.get(`${END_POINT + 'lon=' + lon + '&lat=' + lat + '&date=' + date + '&dim=' + dim + '&' + api_key}`)
    
        .then(function(response){
            const { date, resource, url } = response.data
            res.json({ date, resource, url })
        })

        //try, catch
        .catch(function(error){
            const error_code = error.response.status;
            const { message } = error
            res.status(error_code).json({ message })
        })

})
//--------------------------------------------------------------------------------------
//POST Method EonetLayer
app.post('/postEonetLayer', (req, res) => {

    const { id } = req.body
    const END_POINT = 'https://eonet.sci.gsfc.nasa.gov/api/v2.1/layers/'

    axios.get(`${END_POINT + id }`)
    
        .then(function(response){
            const { title, description, categories } = response.data
            res.json({ title, description, categories })
        })

        //try, catch
        .catch(function(error){
            const error_code = error.response.status;
            const { message } = error
            res.status(error_code).json({ message })
        })

})



// Listen server
app.listen(port, () => {
    console.log("Server running on port " + port);
})
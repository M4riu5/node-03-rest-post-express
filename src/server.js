'use strict';

const { response, request } = require('express');
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

//middleware
app.use(cors())
app.use(morgan('dev'))
//Gautame request body galetume matyti json atsiustus duomenis turim ijungti json atkodavima
app.use(express.json())
// Atkoduoti request body form data
// app.use(express.urlencoded({extended: false}))

//DATA
const users = [
    {id: 3, name: 'James'},
    {id: 2, name: 'Serbentautas'},
    {id: 1, name: 'Lenteja'},
]


//routes
app.get('/', (request, response) => {
    response.send('<h1>Hello World</h1>')
})

//GET /api/users -> grazinti visu useriu masyva json
app.get('/api/users', (request, response) => {
    response.json(users)
})
// GET /api/users/3 -> grazinti useri kurio id yra 3 (ne pagal indexa)
app.get('/api/users/3', (request,response) => {
    const searchIndex = 3
    const foundUser = users.find((uObj) => uObj.id === searchIndex)
    if (foundUser) {
     response.json(foundUser)   
    } else {
        response.status(404).json({msg: 'not found'})
    }
    
})

// POST /api/users -> sukurti nauja useri su gautu name ir prideti prie esamu, grazinti 201 statusa su zinute
app.post('/api/users', (request, response)=> {
    //Add new user
    // response.sendStatus(400)
    // return
   const newUserName = request.body.name
   const newUserId = users.length +1
   const newUserObj = {
    id: newUserId,
    name: newUserName
   }
   users.push(newUserObj)
    response.status(201).json({
    msg: `${newUserName} Have been added !`,
    success: true
})
})


//404
app.use((req,res)=> {
    res.status(404).json({msg: 'Sorry page not found'})
})

const port = 5000
app.listen(port, ()=> console.log(`server is listening on port 3000`))
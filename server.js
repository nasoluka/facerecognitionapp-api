const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./Controllers/register');
const signin = require('./Controllers/signin')
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectString: process.env.DATABASE_URL,
        ssl: false,
    }
});


app.use(bodyParser.json())
app.use(cors())

app.get('/', (req,res)=>{
    res.send('It is Working');
})

app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req,res,db)})

app.put('/image', (req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});


/*
/ --> res = this is working 
/ --> signin - POST request, respond with SUCCESS or FAIL
/ --> register --> Post = returns USER (Database which would add user to database )
/ --> /profile/:userId --> GET = user 
/ --> image --> PUT (becuase we are updating this keeps count of how many images a user has submitted)
*/
//User and register Routes
const express = require('express');  
const router = express.Router();
const User = require('../models/User')  //21../models becasuse we are out of the routes forlder
const bcrypt = require('bcryptjs')

//Login Page
router.get('/login', (req, res) => {    //need to make sure this route has a corresponding use command in app.js
    //res.send('Login')
    res.render('login')
});

//Register Page
router.get('/register', (req, res) =>{   //path where you want it to go
 //   res.send('Register')
    res.render('register')   //Which view to use.
});

//Register handle
router.post('/register', (req,res) => {  //14 from app.js post request to/userr already in the user file
    const { name, email, password, password2 } = req.body;            //15 Put each thing into a variable by way of destructuring
    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2) {                 //16 first check to be completed to make sure allfields are filled in.
        errors.push({ msg: 'Plesae fill in all fields'})
    }

    if(password !== password2) { //17 Check to see if passwords match.
        errors.push({ msg: 'Passwords do not match'})
    }

    // Check pass length
    if(password.length < 6) {   //18 Check pass length is less than 6 characters
        errors.push({ msg: 'Passwords should be at least 6 characters'})
    }

    if(errors.length > 0) {           //19 Check to see if errors exist
        res.render('register', {       //20 then rerender register form.  But we will pass in some values to partial messages //cereated partials and bootsrtap formatting
            errors,
            name,
            email,
            password,
            password2
        })
    } else {                            //21 after partials, Validation pass.  Use model
        User.findOne({ email: email })
            .then(user => {
                if(user) { 
                    errors.push({  msg: 'Email is alredy registered' })
                    res.render('register', {       //22 if users exist render something //cereated partials and bootsrtap formatting
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })   
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });                                // 23need to encrypt password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            //Set password to hashed
                            newUser.password = hash
                            //Sace user
                            newUser.save()
                                .then(user => {
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err))

                    }))                                       // 24hash pasword
                }
            })
    }
}); 

module.exports =router;
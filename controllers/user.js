const {
    User
  } = require('../models')
  const Sequelize = require('sequelize')
  const bcrypt = require("bcrypt-nodejs");

  const login = async (req, res) => {
    const {email, password} = req.body;

    User.findOne({
      where: {
        email: email
      },
      attributes: [
        "id",
        "email",
        "passHash",
      ]

    }).then(user => {
       let flag = false;
      console.log("USER", user);
      if(user !== null){
        flag = bcrypt.compareSync(password, user.passHash);
      } 

       if(flag){
            res.status(200).send({id: user.id});
       } else{
            res.status(400).send("failed login");
       }
    });
  }
  
  const findUser = async (req, res) => {
    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        "firstName",
        "lastName",
        "userName",
        "email",
        "msgNr",
        "postNr",
        "registrationDate",
        "lastSeenOn",
        "location",
        "profileViews"
      ]
    }).then(user => {
            res.status(200).send(user);
    });
  
  }
  

  
  const reg = async (req, res) => {
    try {
        console.log(req.body);
        const { 
            email,
            userName,
            passHash,
            firstName,
            lastName,
            location
        } = req.body;
        
        const newUser = await User.create({
            email: email,
            userName: userName,
            passHash: bcrypt.hashSync(passHash),
            firstName: firstName,
            lastName: lastName,
            location: location,
            msgNr:0,
            postNr: 0,
            profileViews:0,
            lastSeenOn: new Date(),
            registrationDate: new Date()
        });
        res.status(200).send("register successful");
        
      } catch (err) {
        res.status(400).json({
          error: err
        });
      }
       
    
  }
  
 
  
  module.exports = {
    '/login': {

      post: {
        action: login,
        level: 'public'
      }
    },
    '/register': {
      post: {
        action: reg,
        level: 'public'
      },
    },
    '/profile/:id': {
      get: {
        action: findUser,
        level: 'public'
      }
    }
  }
  
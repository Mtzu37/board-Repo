const {
    User,
    Post
  } = require('../models')
  const Sequelize = require('sequelize')
  const bcrypt = require("bcrypt-nodejs");

  const show = async (req, res) => {
    console.log('Get')
    Post.findAll({
      attributes: [
        'id',
        "tag",
        "title",
        "shortText",
        "linkBanner",
        "dateOfPosting",
        "text",
        "linkVideo",
   
      ],
      include: [{
          model: User,
          as: 'user',
          // where: { },
          attributes: ["id",'userName'],
          through: {
            attributes: []
          }
        }
      ]
    }).then(post => {
      res.send(post);
    });
  
  }


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
      if(user.passHash !== null || user.passHash !== undefined )
       const flag = bcrypt.compareSync(password, user.passHash);

       if(flag){
            res.status(200).send({id: user.id});
       } else{
            res.status(400).send("failed login");
       }
    }) .catch( err=> {
        res.status(400).json({
          error: err
        })
      });
  }
  
  const addPost = async (req, res) => {
    try {
        const {
            tag,
            title,
            shortText,
            text,
            linkBanner,
            linkVideo
        } = req.body;
        console.log("CANDIDATE:", req.body);
        // if (firstName === undefined || lastName === undefined || firstName === '' || lastName === '') {
        //   const err = 'Name or Surname provided is empty.'
        //   throw (err)
        // }
        User.findOne({
          where: {
            id: req.params.id
          },
          include: [{
              model: Post,
              as: 'posts',
              attributes: ['id', 'tag'],
            }
          ]
        }).then(userFound => {

            Post.create({
                tag: tag,
                title: title,
                shortText: shortText,
                text: text,
                views:0,
                likes: 0,
                linkBanner: linkBanner,
                linkVideo:linkVideo,
                dateOfPosting: new Date(),
            }).then(createdPost => {
                userFound.addPost(createdPost);
            });
          res.status(200).send(userFound)
        });
    
      } catch (err) {
        res.status(400).json({
          error: err
        })
      }
  
  }
  

  const userPosts = async (req, res) => {
    User.findOne({
      where: {
        id: req.params.userId
      },
      attributes: [
        'id',
        'userName'
      ],
      include: [{
          model: Post,
          as: 'posts', // where: { },
          attributes: ['title'],
          through: {
            attributes: []
          }
        }
      ]
    }).then(userPosts => {
      res.send(userPosts);
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
    '/addPost/:id': {
      post: {
        action: addPost,
        level: 'public'
      }
    },
    '/viewAllPost': {
        get: {
            action: show,
            level: 'public'
          }
    },
    // '/viewTag/:tag': {
    //     get: {
    //         action: findUser,
    //         level: 'public'
    //       }
    // },
    '/viewUserPost/:userId': {
        get: {
            action: userPosts,
            level: 'public'
          }
    },
    // '/viewPost/:id': {
    //   get: {
    //     action: findUser,
    //     level: 'public'
    //   }
    // }
  }
  
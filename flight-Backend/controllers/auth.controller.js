const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const {OAuth2Client}=require('google-auth-library');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { response } = require("express");

const client=new OAuth2Client("1078266621282-jjhmdnsj31ekdsn9hg9gk6uhcojlt4k0.apps.googleusercontent.com");


exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

exports.googlelogin=(req,res) =>{
const {tokenId} =req.body;
client.verifyIdToken({idToken: tokenId, audience:"1078266621282-jjhmdnsj31ekdsn9hg9gk6uhcojlt4k0.apps.googleusercontent.com"}).then(response=>{
    const{email_verified,username,email}= response.payload;
    if(email_verified){
      User.findOne({email}).exec((err,user)=>{
        if(err) {
          return res.status(400).json({
            error:"Something went wrong..."
          })
        }else{
          if(user){
            const token=jwt.sign({_id: user._id},config.secret,{expiresIn:'7d'})
            const{_id,username,email}=user;
            Role.findOne({ name: "user" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
      
              user.roles = [role._id];
              user.save(err => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
      
                
              });
            });
            res.json({token,
              user:{_id,username:user.email,email,roles:["ROLE_USER"]}
            })
          }else{
                let password=email+config.secret;
                let newUser=new User({username,email,password});
                newUser.save((err,data)=>{
                  if(err){
                    return res.status(400).json({
                      error:"Something went wrong..."
                    })
                  }
                  const token=jwt.sign({_id: data._id},config.secret,{expiresIn:'7d'})
                  const{_id,username,email}=newUser;
                  newUser.username=newUser.email;
                  Role.findOne({ name: "user" }, (err, role) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
            
                    newUser.roles = [role._id];
                    newUser.save(err => {
                      if (err) {
                        res.status(500).send({ message: err });
                        return;
                      }
            
                      
                    });
                  });
                  res.json({token,
                    user:{_id,username:newUser.email,email,roles:["ROLE_USER"]}
                  })
                  
                })    

          }
        }

      })
    }
})
}
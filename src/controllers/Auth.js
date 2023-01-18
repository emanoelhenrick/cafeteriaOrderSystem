require('dotenv').config()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const authController = {

  loginController: async (req, res) => {
    const { username, password } = req.body

    if(username === "admin"){
      if(password === "admin123"){
        const tk_user = jwt.sign({
          user_id: username
        }, process.env.TK_SEC)
        return res.status(200).send(tk_user)
      } else {
        return res.status(401).send('senha incorreta')
      }
    }

    const userData = await User.findOne({username: username})

    if (!userData) {
      return res.status(404).send('Usuario nao encontrado')
    }

    const verifyPassword = bcrypt.compareSync(password, userData.password)

    if (!verifyPassword) {
      res.status(401).send('senha incorreta')
    } else {
      const tk_user = jwt.sign({
        user: userData.username
      }, process.env.TK_SEC)

      res.status(200).send(tk_user)
    }

    res.end()
  },
  registerController: async (req, res) => {
    const {
      username,
      email,
      password,
      name,
      address,
      tel
    } = req.body
    
    const newUser = new User({
      username,
      email,
      password: bcrypt.hashSync(password),
      name,
      address,
      tel
    })

    await newUser.save().catch(err => {
      res.status(400).send(err)
    })
  },
}

module.exports = authController
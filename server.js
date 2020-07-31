//if(process.env.NODE_ENV!=='production'){
  //  require('dotenv').config()
//}
const passport=require('passport')
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const keys=require('./config/keys')
const cookieSession=require('cookie-session')
app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())
require('./models/User')
require('./services/passport')
require('./routes/authRoutes')(app)


mongoose.connect(keys.DATABASE_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log("Connected to Mongoose"))
app.listen(process.env.PORT || 5000)
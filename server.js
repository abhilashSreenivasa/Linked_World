if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
const express=require('express')
const app=express()
const mongoose=require('mongoose')

app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.send('hello')
})

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log("Connected to Mongoose"))
app.listen(process.env.PORT || 5000)
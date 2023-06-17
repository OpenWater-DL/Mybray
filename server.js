if(process.env.NODE_ENV !== 'production'){
    require('dotenv').load()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views') //__dirname 当前模块的目录名
app.set('layout','layouts/layout') //这里默认的也是views这个目录里

app.use(expressLayouts)
app.use(express.static('public'))


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open',()=> console.log('Connected to Mongoose'))

app.use('/',indexRouter)


app.listen(process.env.PORT || 3000 )

const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const startUpDebug = require('debug')('app:startup')
const dbDebug = require('debug')('app:db')
const webDebug = require('debug')('app:web')
//const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const Routes = require('./route')

const publicDir = path.join(__dirname,'/public')
const viewDir = path.join(__dirname,'/views')
const viewPatialDir = path.join(__dirname,'/views/patials')

//Set static & View
app.set('view engine','hbs')
app.set('views',viewDir)
hbs.registerPartials(viewPatialDir)
app.use(express.static(publicDir))

//Set middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet()) // secure http header
if(app.get('env') === "development"){
    app.use(morgan('tiny')) // log http req
}
startUpDebug('App Name : '+config.get('name'))

/* MongoClient.connect('mongodb://127.0.0.1:27017/web_service',{ useUnifiedTopology: true },function(err,db){
    if(err){
        dbDebug('Cannot connect database...')
        throw err;
    }
    dbDebug('Connected database...')
}) */

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/task-manager',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify  : false 
})
.then(()=> dbDebug('Connected to MongoDB'))
.catch((err)=> dbDebug('Can not connect to MongoDB...',err)) 

//Route
app.use('/api/products',Routes.product)
app.use('/api/categories',Routes.category)

//Start Server
const port = process.env.PORT || 3000
app.listen(port,()=>{
    startUpDebug(`Server start at port : ${port}`)

})
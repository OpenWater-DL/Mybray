const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true //是否必填
    },
    description:{
        type: String,
    },
    publishDate:{
        type: Date,
        required: true 
    },
    pageCount:{
        type: Number,
        required: true 
    },
    createdAt:{
        type: Date,
        required: true ,
        default:Date.now
    },
    coverImageName:{
        type:String,
        required:true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Author'
    }
    
    
})

bookSchema.virtual('coverImagePath').get(function(){
    //因为this要获取的是bookSchema本身，所以这里不用箭头函数。箭头函数的this会指向箭头函数本身。
if(this.coverImageName != null){
return path.join('/', coverImageBasePath,this.coverImageName)
}


})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtSecretKey = process.env.JWT_SECRET_KEY

const userSchema = Schema(
	{
		username:{
			type:String,
			required:true,
		},
		email:{
			type:String,
			required:true
		},
		password:{
			type:String,
			required:true,
		},
		level:{
			type:String,
			default:'customer'
		}
	},
	{timestamps: true}
)
userSchema.methods.toJSON = function(){
	const obj = this._doc
	delete obj.password;
	delete obj.updatedAt;
	delete obj.__v;
	return obj;
}

userSchema.methods.generateToken = function(){
	const token = jwt.sign({_id: this._id}, jwtSecretKey, {expiresIn:'1d'})
	return token;
}
const User = mongoose.model("User", userSchema)
module.exports = User

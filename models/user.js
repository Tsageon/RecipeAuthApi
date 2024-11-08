const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  username: { type: String, unique: true },
}, { timestamps: true });

userSchema.pre('save', async function(next){
  const user = this;
  if(!user.isModified('password')) return next();
  try{const saltRounds = 10;
    const hash = await bycrypt.hash(user.password,saltRounds);
    user.password = hash;
    next();}
    catch(error){
      next(error)
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
  try {
    return await bycrypt.compare(candidatePassword,this.password);
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = mongoose.model('User', userSchema);
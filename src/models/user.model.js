import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const salt = 10
const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        lowercase: true
    },
    password: {
        type: String
    },
    provider: {
      type: String,
      required: true,
      enum: ['google', 'local'],
      default: 'local',
      lowercase: true
    },
    provider_id: {
      type: String,
      unique: true,
      sparse: true
    },
    verified: {
      type: Boolean,
      default: false
    }
}, {timestamps: true})
UserModel.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
      try {
        user.password = await bcrypt.hash(user.password, salt)
      } catch (error) {
        next(error)
      }
    } else {
      next()
    }
  })
  UserModel.pre('findOneAndUpdate', async function (next) {
    const user = this.getUpdate()
    if (user.password) {
      try {
        user.password = await bcrypt.hash(user.password, salt)
        this.setUpdate(user)
      } catch (error) {
        next(error)
      }
    } else {
      next()
    }
  })
UserModel.methods.comparePassword = function (password, next) {
    const user = this;
    return bcrypt.compareSync(password, user.Password);
  };
UserModel.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret, option) {
      delete ret.password
      delete ret.resettoken
      delete ret.__v
      delete ret.token
      return ret
    }
  })
 UserModel.statics.findandValidate = async function (email, password) {
    const user = await this.findOne({ email })
    if (!user) {
      return false
    }
    const validate = await bcrypt.compare(password, user.password)
    return validate ? user : false
  }
  
export default mongoose.model('users', UserModel)
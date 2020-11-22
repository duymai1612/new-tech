const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
})
userSchema.index({ username: 1 }, { unique: true })

const saltRounds = 10
userSchema.pre("save", function (next) {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next()

  // generate a salt
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User

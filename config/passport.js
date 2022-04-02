const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = app => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, 
  (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          console.log('email not registed')
          return done(null, false, req.flash('loginError','該電子郵件尚未註冊！'))
        }
        if (user.password !== password) {
          return done(null, false, req.flash('loginError','電子郵件或密碼錯誤！'))
        }
        return done(null, user)
      })
      .catch(err => done(err, false))
  })) 
  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}

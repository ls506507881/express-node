var express = require('express');
var router = express.Router();

var passport = require('passport');
//引入passport，专门负责auth2的认证，所有的第三方登录，都可以使用passport
var GitHubStrategy = require('passport-github').Strategy;
//在passport基础上，对整个协议进行的封装。

passport.serializeUser(function(user, done) {
  console.log('---serializeUser---')
  console.log(user)
  done(null, user);
});
//把用户登陆过来的信息，传递到passport之后，让它生成一个session，存储到内存里面

passport.deserializeUser(function(obj, done) {
  console.log('---deserializeUser---')
  done(null, obj);
});
// 用户刷新页面的时候，会再从内存里面，把对应的session拿出来，解析，知道这个用户
passport.use(new GitHubStrategy({
  clientID: '28928eae8774e53d2247',
  clientSecret: '0485fe61b10dac188ff17d977253ba091113f94d',
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  // User.findOrCreate({ githubId: profile.id }, function (err, user) {
  // });
  done(null, profile);
}
));


//入口
router.get('/github',
passport.authenticate('github'));

router.get('/github/callback',
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
  req.session.user = {
    id: req.user.id,
    username: req.user.displayName || req.user.username,
    avatar: req.user._json.avatar_url,
    provider: req.user.provider
  };
  res.redirect('/');
});

//注销
router.get('/logout',function(req,res){
  req.session.destroy()  //销毁session
  res.redirect('/')  //跳转到首页
})

module.exports = router;

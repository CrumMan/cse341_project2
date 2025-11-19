const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('./db/connect')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require("cors")

const port = process.env.PORT || 3030
const app = express()

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  }))  //basic express session initialization
  .use(passport.initialize())//init passport route call
  .use(passport.session())//allow passport to use express session
  .use(cors({origin: '*'}))
  .use(cors({methods: ['GET', 'POST', 'DELETE', "PUT", 'PATCH']}))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

passport.use(new GitHubStrategy({
  clientID : process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
}, function(accessToken, refreshToken, profile, done){
  //User.findOrCreate({githubId: profile.id}, function(err,user)){
    return done(null, profile)
    //}
  }
))

passport.serializeUser((user,done) => {
  done(null,user)
})
passport.deserializeUser((user,done) => {
  done(null, user)
})

app.get('/', (req,res) => {
  const user = req.session.user
  res.send(req.session.user !== undefined ? 
    `logged in as ${user.username || user.displayName || "Unknown User"}` : 'Logged Out')})
app.get('/github', passport.authenticate('github'))

app.get('/github/callback', passport.authenticate('github', {
      failureRedirect: '/api-docs'}),
      (req, res) => {
        req.session.user = req.user
        res.redirect('/')
      }
    )
  //routes instilation
    
mongodb.initDb((err) => {
    if(err){
        console.log(err)
    } else {

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use('/', require('./routes'))

        app.listen(port)
        console.log(`Connected to DB and listening on ${port}`)
    }
})
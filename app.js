//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash')

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "write your query to us and our service executive will connect you soon";

const app = express();

let postArr = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get('/', function (req, res) {
  // console.log(postArr);
  res.render('home', { content: homeStartingContent, newBlog: postArr })
})


app.get('/about', function (req, res) {
  res.render('about', { content: aboutContent })
})

app.get('/contact', function (req, res) {
  res.render('contact', { content: contactContent })
})

app.get('/compose', function (req, res) {
  res.render('compose')
})

app.post('/compose', function (req, res) {
  // console.log(req.body);
  let post = {
    title: req.body.postTitle,
    body: req.body.postBody
  }
  postArr.push(post)
  res.redirect('/')

})

app.get('/post/:postName', function (req, res) {
  let requestedTitle = _.lowerCase(req.params.postName);
  console.log('requestedTitle :=', requestedTitle);
  postArr.forEach(eachObj => {
    console.log('stored-title; ', _.lowerCase(eachObj.title));
    // console.log(requestedTitle, ' + ', _.lowerCase(eachObj.title));
    if (requestedTitle === _.lowerCase(eachObj.title)) {
      console.log('matchFound');
      res.render('post', { postContent: eachObj })
    } else {
      console.log('not matched');
    }

  })



})

app.post('/contactFeedback', function (req, res) {
  res.render('feedback')
})









app.listen(3000, function () {
  console.log("Server started on port 3000");
});

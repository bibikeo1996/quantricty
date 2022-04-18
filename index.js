var express = require("express");
var flash = require('connect-flash');
var router = express.Router();
var app = express();
// nhúng session
var session = require('express-session');
// nhúng file xử lý user
var register = require('./routes/user-process');
var login = require('./routes/index-process');
// var admin = require('./routes/user-process');
// var profile = require('./routes/user-process');

var admin_dashboard = require('./routes/index-process');

app.use(flash());

app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: true,
  // cookie: { maxAge: 60000 }
}));

app.set("view engine", "ejs"); // template html ejs
app.set("views", "./views"); // folder chứa template

app.use(express.static("public")); // setup đường dẫn css,js,...
app.use("/", register); // set url đăng ký
app.use("/", login); // set url đăng nhập
app.use("/admin", admin_dashboard); // login thành công sẽ điều hướng url admin



app.post("/register_", register);
app.post("/login_", login)



app.listen(3000);

var express = require('express');
var bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
var router = express.Router();
var db = require('../models/database');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })

// url login
router.get('/', function(req, res)  {
    res.render('login');
});

// url đăng ký
router.get('/register', function(req, res, next) {
     res.render('register');
});


// show data theo cấp bậc 
router.get('/profile', function(req, res, next){
  if (req.session.daDangNhap) {
    let name = req.session.username; // đặt biến name = session name user login
    // console.log("Logged with User Admin");
    let sql = 'SELECT * FROM users WHERE username = ?';
    let sql2 = 'SELECT * FROM users';
    db.query(sql, [name] , (err, rows) => {
      db.query(sql2, (err, rows2) => {
        if(err){
            console.log("Connection issues..!");
        }else{
            res.render("../views/admin/profile", {
            u:req.session.username, // biến nam
            daDangNhap: true, // check có đăng nhập chưa ?
            data:rows, // data bảng user
            data2: rows2 // data bảng user
             });
           }
        });
      });
  }else{
    req.session.back="/admin";
    res.render("login");
  }
});


// xử lý show data edit user
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  var sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], function (err, rows) {
  var sess = req.session;
  sess.daDangNhap = true;
  if (err) throw err;
  if (sess.back){
      res.json({data: rows});
  }
  else {
        res.redirect("/");
  } // back về page login
});
});


router.post('/update/:id', urlencodedParser, function(req, res, next) {
  var id = req.params.id;
  var updateData = req.body;
  var sql = `UPDATE users SET ? WHERE id = ?`;
  db.query(sql, [updateData, id], function (err, rows) {
      var sess = req.session;
      sess.daDangNhap = true;
      if (err) throw err;
      if (sess.back){
        var string = 1
        res.redirect("/profile?status="+string);
      }
      else {
        res.redirect("/");
      } // back về page login
  });
});



// xử lý delete user
router.get('/delete/:id', function(req, res, next) {
  var id = req.params.id
  let sql = 'Delete FROM users WHERE id = ?';
  db.query(sql, [id] , (err, rows) => {
    var sess = req.session;
    sess.daDangNhap = true;
    if (sess.back){
      var string = 1
      res.redirect("/profile?status="+string);
    }
    else {
          res.redirect("/");
    } // back về page login
  });
});

// xử lý lưu data new users
router.post('/register_', urlencodedParser, function(req, res, next) {
  let u = req.body.username;
  let p = req.body.password;
  let n = req.body.name;
  let ph = req.body.phone;
  let bir = req.body.birthday;
  let add = req.body.address;
  let level = req.body.level;
  let isEm = req.body.isEm;
  // let date_created = req.body.date_created;

  var salt = bcrypt.genSaltSync(10);
  var pass_mahoa = bcrypt.hashSync(p, salt);

  let user_info ={name: n, username: u, password:pass_mahoa, birthday: bir, phone: ph, address: add, level: level, isEm: isEm};
  let sql = 'INSERT INTO users SET ?';
  db.query(sql, user_info);
  var sess = req.session;
  sess.daDangNhap = true;
  // nếu có đăng nhập redirect về page profile
  if (sess.back){
    var string = 1
    res.redirect("/profile?status="+string);
  }
  else {
    res.redirect("/");
  } // back về page login
});


module.exports = router;

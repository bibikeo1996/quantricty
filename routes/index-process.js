var express = require('express');
var bodyParser = require('body-parser')
const bcrypt = require("bcrypt");
var router = express.Router();
var db = require('../models/database');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })

// xử lý login
router.post('/login_', urlencodedParser, async function(req, res, next) {
    let u = req.body.username;
    let p = req.body.password;
    // console.log(u, p);
    let sql = `SELECT * FROM users WHERE username = ?`;
    db.query(sql, [u] , (err, rows) => {
        if(err) throw err;
        if (rows.length<=0) { res.redirect("/"); return;}
        let user = rows[0];
        let pass_fromdb = user.password;
        let isEm = user.isEm;
        var kq = bcrypt.compareSync(p, pass_fromdb);
        if (kq && isEm === "yes"){
            var sess = req.session;
            sess.daDangNhap = true;
            sess.username = user.username;
            if (sess.back){
                console.log(sess.back);
                res.redirect(sess.back);
            }
            else {
              res.redirect("/admin");
            }
        }
        else {
            console.log("Sai Password!!");
            res.redirect("/"); // back về page login
        }
    });
});

router.get('/dang-xuat', function(req, res, next) {
    req.session.destroy();
    res.redirect("/"); // back về page login
});


// show data theo cấp bậc 
router.get('/admin', function(req, res, next){
    if (req.session.daDangNhap) {
      let name = req.session.username; // đặt biến name = session name user login
      let sql = 'SELECT * FROM users WHERE username = ?';
      let sql2 = 'SELECT * FROM checkinout WHERE user_id = ? ORDER BY id DESC';
      let sql3 = 'SELECT * FROM checkinout ORDER BY id DESC';
      db.query(sql, [name] , (err, rows) => {
        db.query(sql2, [name], (err2, rows2) => {
          db.query(sql3, (err3, rows3) => {
            if(err){
                console.log("Connection issues..!" + err);
            }else{
                var datetime = new Date();
                var date = (datetime.getDate()+"-"+(datetime.getMonth() + 1)+"-"+datetime.getFullYear());
                var hours = datetime.getHours();
                var minutes = datetime.getMinutes();
                var check = (hours+":"+minutes);
                res.render("../views/admin/index", {
                  sang:hours,
                  chieu:hours,
                  full:check,
                  checkdate:date,
                  u:req.session.username, // biến name
                  daDangNhap: true, // check có đăng nhập chưa ?
                  data: rows, //  get user
                  data2: rows2, // get all data theo tài khoản
                  data3: rows3 // get all data chấm công
                });
               }
            });
          });
        });
    }else{
      req.session.back="/admin";
      res.render("login");
    }
});

router.post('/checkin_', urlencodedParser, function(req, res, next) {
    //var user_id = req.params.user_id;
    var updateData = req.body;
    let sql = 'INSERT INTO checkin SET ?';
    db.query(sql, [updateData], function (err, rows) {
        var sess = req.session;
        sess.daDangNhap = true;
        if (err) throw err;
        if (sess.back){
          var string = 1
          res.redirect("/admin?status="+string);
        }
        else {
          res.redirect("/");
        } // back về page login
    });
});

router.post('/checkout_', urlencodedParser, function(req, res, next) {
  //var user_id = req.params.user_id;
  var updateData = req.body;
  let sql = 'INSERT INTO checkout SET ?';
  db.query(sql, [updateData], function (err, rows) {
      var sess = req.session;
      sess.daDangNhap = true;
      if (err) throw err;
      if (sess.back){
        var string = 1
        res.redirect("/admin?status="+string);
      }
      else {
        res.redirect("/");
      } // back về page login
  });
});


router.post('/update-checkinout/:id', urlencodedParser, function(req, res, next) {
    var id = req.params.id;
    var checkout = req.body.checkout;
    var note_2 = req.body.note_2;
    var sql = `UPDATE checkinout SET ? WHERE id = ?`;
    db.query(sql, [{checkout, note_2}, id], function (err, rows) {
        var sess = req.session;
        sess.daDangNhap = true;
        if (err) throw err;
        if (sess.back){
          var string = 1
          res.redirect("/admin?status="+string);
        }
        else {
          res.redirect("/");
        } // back về page login
    });
});


module.exports = router;
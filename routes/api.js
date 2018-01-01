var express = require('express');
var router = express.Router();
var Note = require('../model/note').Note;

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  console.log('/notes...')
  var query = {raw: true}
  if(!req.session.user){
    Note.findAll(query).then(function(notes){
      console.log(notes)
      res.send({status: 0})
    })
  }
  else if(req.session.user){
    query.where = {
      uid: req.session.user.id
    }
  }
  Note.findAll(query).then(function(notes){
    console.log(notes)
    res.send({status: 0, data: notes})
  }).catch(function(){
    res.send({status: 1,errorMsg: '数据库出错'}) //status: 1 出错
  })
  // var data = Note.getAll()  //模型，用于具体的和数据进行操作。
  //假设有个对象叫Note，有getAll方法，把他所有数据赋值给data
});

router.post('/notes/add', function(req, res, next) {
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var uid = req.session.user.id
  var note = req.body.note;

  Note.create({text: note, uid: uid}).then(function(){
    res.send({status: 0})  //status: 0 成功
  }).catch(function(){
    res.send({status: 1,errorMsg: '数据库出错'}) //status: 1 出错
  })
  console.log('add...',note)
})

router.post('/notes/edit', function(req, res, next) {
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var uid = req.session.user.id
  Note.update({text: req.body.note},{where:{id:req.body.id,uid:uid}}).then(function(){
    console.log(arguments)
    res.send({status:0})
  }).catch(function(){
    res.send({status: 1,errorMsg: '数据库出错'}) //status: 1 出错
  })
});

router.post('/notes/delete', function(req, res, next) {
  if(!req.session || !req.session.user){
    return res.send({status: 1, errorMsg: '请先登录'})
  }
  var uid = req.session.user.id
  Note.destroy({where:{id:req.body.id,uid:uid}}).then(function(){
    res.send({status:0})
  }).catch(function(){
    res.send({status: 1,errorMsg: '数据库出错'}) //status: 1 出错
  })
});

module.exports = router;

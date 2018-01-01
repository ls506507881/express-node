var path = require('path')
var Sequelize = require('sequelize')

var sequelize = new Sequelize(undefined, undefined, undefined, {  
    //不需要用户名密码，如果是其他数据库需要做义工配置
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname,'../database/database.sqlite')
  });

  /*
  sequelize
  .authenticate()
  .then(function(err){
    console.log('Connection has been established successfully.');
  })
  .catch(function(err){
    console.log('Unable to connect to the database:',err);
  })
  */



  // id  [字段] [uid] [添加时间] [更新时间]
  //模型起名叫note
  var Note = sequelize.define('note', {
    text: {
      type: Sequelize.STRING
    },
    uid: {
      type: Sequelize.STRING
    }
  });

  //Note.drop();
  // Note.sync({force:true}) //如果存在，清空一下，上次没有写uid的数据
  //再次添加，就会有uid

  /*
  //sync({force: true}) 假设数据库存在这个表，force：true删除。
  Note.sync().then(function(){
     Note.create({text:'hello world'})
  }).then(function(){
    Note.findAll().then(function (notes) {   //findOne({raw: true}) 获取里面的数据
      console.log(notes);
    })
  })
  */

// Note.findOne({raw: true, where:{id:2}}).then(function(notes){
//   console.log(notes)
// })

module.exports.Note = Note;  //导出,提供给其外部使用



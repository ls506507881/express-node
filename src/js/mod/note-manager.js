var Toast = require('./toast.js').Toast;
var Note = require('./note.js').Note;
var Toast = require('./toast.js').Toast;
var Event = require('mod/event.js');


var NoteManager = (function(){

  function load() {
    $.get('/api/notes')
      .done(function(ret){
        if(ret.status == 0){
          $.each(ret.data, function(idx, article) {
              new Note({
                id: article.id,
                context: article.text
              });
          });

          Event.fire('waterfall');
        }else{
          Toast(ret.errorMsg);
        }
      })
      .fail(function(){
        Toast('网络异常');
      });


  }

  function add(){
    new Note();
  }

  return {
    load: load,
    add: add  //获取数据，和添加
  }

})();

module.exports.NoteManager = NoteManager
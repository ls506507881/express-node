require('less/toast.less');

// var $ = require('jquery')


function toast(msg,time){
    this.msg = msg;  //消息赋值
    this.dismissTime = time||1000, //消失的时间，传给参数，默认一秒
    this.createToast();  //页面上创建节点
    this.showToast();   //展示它
}
toast.prototype = {
    createToast: function(){
        var tpl = '<div class="toast">'+this.msg+'</div>';
        this.$toast = $(tpl);
        $('body').append(this.$toast);
    },
    showToast:function(){
        var self = this;
        //在这个函数内部，this已经变掉了，所以用了self
        this.$toast.fadeIn(300,function(){   //默认隐藏，让它出现
            setTimeout(function(){   //消失过了elf.dismissTime时间，再让它消失
                self.$toast.fadeOut(300,function(){
                    self.$toast.remove();  //消失了之后，再删除
                });
            },self.dismissTime);
        })
    }
}

// new toast的时候，创建对象
// 简化过程，当每次调用函数，就new一个函数
function Toast(msg,time){
    return new toast(msg,time);  
}

// Toast('hello')

window.Toast = Toast;
module.exports.Toast = Toast;
// 把toast函数曝光出去，不能直接赋值，增加一条属性，叫toast
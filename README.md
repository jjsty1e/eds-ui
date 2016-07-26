
#使用方法
 头部引入style.css文件和edsUI.js文件

#使用示例：

##toast
edsUI.toast("提示");        //没有遮罩
edsUI.mask().toast("提示")  //带遮罩


##alert

edsUI.alert("提示");
edsUI.mask().alert("提示");

##confirm

edsUI.confirm("标题","提示的内容",['确定','取消'],function(){
   //第一个按钮的回调
},function(){
  // 第二个按钮的回调
});

edsUI.mask().confirm("提示");

##prompt

prompt: function (title,btnArray,btn1Call,btn2Call)

##form 异步表单提交

 form: function (formId,callback,loading)



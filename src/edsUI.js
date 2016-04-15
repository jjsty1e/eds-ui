
var edsUI = {
    toast : function(msg,callback1){
        $("body").append(edsUI.template.toast);
        var divToast = $(".jakes-notice");
        divToast.html(msg);
        divToast.animate({
            'top' : 20
        },500,function(){
            setTimeout(function(){
                divToast.fadeOut(500);
               edsUI.close();
            },500)
        });
        //1秒之后执行回调函数,以防止动画被阻断
        if(callback1){
            setTimeout(function(){
                callback1();
            },1000);
        }
    },

    confirm : function(header,msg,btnArray,btn1Call,btn2Call){
        switch (arguments.length){
            case 2 :
                btn1Call = msg;
                msg = header;
                header = '提示';
                btnArray = ['确定','取消'];
                break;
            case 3 :
                btn1Call = btnArray;
                btnArray = ['确定','取消'];
                break;
            case 4 :
                btn2Call = btn1Call;
                btn1Call = btnArray;
                btnArray = ['确定','取消'];
        }

       $('body').append(this.template.confirm);
        var jakes_confirm = $(".jakes-confirm");
        var headerDiv = $('.jB-confirm-header');
        headerDiv.html(header);
        this._bingCloseIcon(headerDiv);
        $(".jB-confirm-content").html(msg);
        var btn1 = $("div.jakes-confirm-buttons > button:nth-child(1)");
        var btn2 = $("div.jakes-confirm-buttons > button:nth-child(2)");
        btn1.html(btnArray[0]);
        btn2.html(btnArray[1]);
        jakes_confirm.css('top',-250);
        jakes_confirm.show();
        jakes_confirm.animate({
            top : 20
        },500);
        btn1.click(function(){
                if(btn1Call) {
                    btn1Call();
                }
            return true;
            });
        btn2.click(function(){
                if(btn2Call){
                     btn2Call();
                }
                return false;
            });



    },

    alert : function(title,msg,callback1){
        switch (arguments.length){
            case 1:
                msg = title;
                title = "提示";
                break;
            case 2:
                callback1 = msg;
                msg = title;
                title = "提示";
        }
        $('body').append(this.template.alert);
        var jakes_alert = $('.jakes-alert');
        var header = $('.jakes-alert-header');
        var content = $('.jakes-alert-content');
        content.html(msg);
        header.html(title);
        this._bingCloseIcon(header,callback1);
        jakes_alert.css('top',-250);
        jakes_alert.show();
        jakes_alert.animate({
            'top' : 20
        },500);
        $('div.jakes-alert-button > button').click(function(){
            edsUI.close();
            if(callback1){
                callback1();
            }
        });

    },

    mask : function() {
        if($('.jakes-mask').length == 0)
        {
            var htmlMask = "<div class='jakes-mask'></div>";
            $('body').append(htmlMask);
            var divMask = $('.jakes-mask');
            divMask.height($(document).height());
            divMask.show();
        }
      return this;
    },

    _bingCloseIcon : function (node,callback1){
        node.append(this.template.closeIcon);
        $(".jakes-close-icon").click(function(){
            edsUI.close();
            if(callback1){
                callback1();
            }
        });
    },


    template : {
        toast     : "<div class='jakes jakes-notice'></div>",
        confirm   : '<div class="jakes jakes-confirm">'+
        '<div class="jB-confirm-header">'+

        '</div>'+
        '<div class="jB-confirm-content">'+

        '</div>'+
        '<div class="jakes-confirm-buttons">'+
        ' <button>按钮1</button>'+
        '<button>按钮2</button>'+
        '</div>'+
        '</div>',
        closeIcon :'<i class="jakes-close-icon"></i>',
        alert     : '<div class="jakes jakes-alert">'+
        ' <div class="jakes-alert-header">警告</div>'+
        ' <div class="jakes-alert-content">不能删除该内容</div>'+
        '  <div class="jakes-alert-button"><button>确定</button></div>'+
        ' </div>'
    },
    close : function(){
      $(".jakes").remove();
        if($(".jakes-mask").length > 0)
            $(".jakes-mask").remove();
    }
};
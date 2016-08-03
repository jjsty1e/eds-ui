
var edsUI = {

    /**
     * 自动消失弹出层
     * @param msg
     * @param callback1
     */
    toast : function(msg,callback1){
        var timestamp=new Date().getTime();
        $("body").append(edsUI.template.toast);
        var _toastModal = $(".jakes-notice");
        _toastModal.html(msg);
        _toastModal.attr('data-id',timestamp);
        _toastModal.animate({
            'top' : 100
        },500,function(){
            setTimeout(function(){
                _toastModal.fadeOut(500);
                edsUI.close(timestamp);
            },500)
        });
        //1秒之后执行回调函数,以防止动画被阻断
        if(callback1){
            setTimeout(function(){
                callback1();
            },1000);
        }
    },

    /**
     * 确认框
     * @param title
     * @param msg
     * @param btnArray
     * @param btn1Call
     * @param btn2Call
     */
    confirm : function(title,msg,btnArray,btn1Call,btn2Call){
        var timestamp=new Date().getTime();
        switch (arguments.length){
            case 2 :                // (msg,btn1Call)
                btn1Call = msg;
                msg = title;
                title = '提示';
                btnArray = ['确定','取消'];
                break;
            case 3 :               //(title,msg,btn1Call)
                btn1Call = btnArray;
                btnArray = ['确定','取消'];
                break;
            case 4 :               //(title,msg,btn1Call,btn2Call)
                btn2Call = btn1Call;
                btn1Call = btnArray;
                btnArray = ['确定','取消'];
        }

        $('body').append(this.template.confirm);
        var _confirmModal = $(".jakes-confirm");
        _confirmModal.attr('data-id',timestamp);
        var headerDiv = $('.jB-confirm-header');
        headerDiv.html(title);
        headerDiv.prepend('<i class="fa fa-exclamation-circle">&nbsp;&nbsp;');
        this._bingCloseIcon(headerDiv,timestamp);
        $(".jB-confirm-content").html(msg);
        var btn1 = $("div.jakes-confirm-buttons > button:nth-child(1)");
        var btn2 = $("div.jakes-confirm-buttons > button:nth-child(2)");
        btn1.html(btnArray[0]);
        btn2.html(btnArray[1]);
        _confirmModal.css('top',-250);
        _confirmModal.show();
        _confirmModal.animate({
            top : 100
        },500);
        btn1.click(function(){
            if(btn1Call) {
                btn1Call();
            }
            edsUI.close(timestamp);
            return true;
        });
        btn2.click(function(){
            if(btn2Call){
                btn2Call();
            }
            edsUI.close(timestamp);
            return false;
        });

    },

    /**
     *  可选参数2-4个，不过建议还是使用完整的参数列表
     * @param title
     * @param btnArray
     * @param btn1Call
     * @param btn2Call
     */
    prompt: function (title,btnArray,btn1Call,btn2Call) {
        var timestamp=new Date().getTime();
        switch (arguments.length){
            case 2 :                // (title,btn1Call)
                btn1Call = btnArray;
                btnArray = ['确定','取消'];
                break;
            case 3 :                //(title,btn1Call,btn2Call)
                btn2Call = btn1Call;
                btn1Call = btnArray;
                btnArray = ['确定','取消'];
                break;
        }

        $('body').append(this.template.prompt);
        var _promptModal = $(".jakes-confirm");
        _promptModal.attr('data-id',timestamp);
        var headerDiv = $('.jB-confirm-header');
        headerDiv.html(title);
        headerDiv.prepend('<i class="fa fa-exclamation-circle">&nbsp;&nbsp;');
        this._bingCloseIcon(headerDiv,timestamp);
        var btn1 = $("div.jakes-confirm-buttons > button:nth-child(1)");
        var btn2 = $("div.jakes-confirm-buttons > button:nth-child(2)");
        btn1.html(btnArray[0]);
        btn2.html(btnArray[1]);
        _promptModal.css('top',-250);
        _promptModal.show();
        _promptModal.animate({
            top : 100
        },500);
        btn1.click(function(e){
            if(btn1Call) {
                e.content = $('.jB-confirm-content input').val();
                btn1Call(e);
            }
            edsUI.close(timestamp);
        });
        btn2.click(function(){
            if(btn2Call){
                btn2Call();
            }
            edsUI.close(timestamp);
        });

    },

    /**
     * 警告框
     * @param title
     * @param msg
     * @param callback1
     */
    alert : function(title,msg,callback1){
        var timestamp=new Date().getTime();
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
        var _alertModal = $('.jakes-alert');
        _alertModal.attr('data-id',timestamp);
        var header = $('.jakes-alert-header');
        var content = $('.jakes-alert-content');
        content.html(msg);
        header.html(title);
        header.prepend('<i class="fa fa-exclamation-circle">&nbsp;&nbsp;');
        this._bingCloseIcon(header,timestamp);

        _alertModal.css('top',-250);

        if($(window).width() < 1000) {
            var top = $(window).height()/2-_alertModal.height();
        } else {
            top = 100
        }

        _alertModal.animate({
            'top' : top
        },500);


        _alertModal.css('margin-left',-_alertModal.width()/2);
        _alertModal.show();

        $('div.jakes-alert-button > button').click(function(){
            if(callback1){
                callback1();
            }
            edsUI.close(timestamp);
        });

    },

    /**
     * 异步表单提交
     * @param formId
     * @param callback
     * @param loading
     */
    form: function (formId,callback,loading) {
        $(formId).submit(function () {
            $.ajax({
                url : $(formId).attr('action'),
                type: $(formId).attr('method'),
                data: $(formId).serialize(),
                beforeSend : function () {
                    if(loading) {
                        window.eds = {};
                        switch (loading[1]) {
                            case 'text' :
                                window.eds.loaddingHtml = $(loading[0]).html();
                                $(loading[0]).html('正在提交...');
                                $(loading[0]).addClass('disabled');
                                break;
                            default:
                                break;
                        }
                    }
                },
                complete : function () {
                    if(loading) {
                        switch (loading[1]) {
                            case 'text' :
                                $(loading[0]).removeClass('disabled');
                                $(loading[0]).html(window.eds.loaddingHtml);
                                break;
                            default:
                                break;
                        }
                    }
                },
                success : function (result) {
                    if(callback) {
                        callback(result);
                    }
                }
            });
            return false;
        });
    },

    /**
     * 遮罩层
     * @returns {edsUI}
     */
    mask : function() {


        var htmlMask = "<div class='jakes-mask'></div>";
        $('body').append(htmlMask);
        var divMask = $('.jakes-mask');
        divMask.height($(document).height());
        divMask.show();

        return this;
    },

    /**
     * 绑定关闭弹出层角标
     * @access private
     * @param node
     * @param callback1
     * @param eleId
     * @private
     */
    _bingCloseIcon : function (node,callback1,eleId){
        node.append(this.template.closeIcon);
        switch (arguments.length) {
            case 2:
                eleId = callback1;
                callback1 = null;

        }

        $(".jakes-close-icon").click(function(){
            edsUI.close(eleId);
            if(callback1){
                callback1();
            }
        });
    },

    /**
     * @access 模板集
     */
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

        prompt:'<div class="jakes jakes-confirm">'+
        '<div class="jB-confirm-header">'+

        '</div>'+
        '<div class="jB-confirm-content">'+
        '<input type="text" class="form-control">'+
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

    /**
     * 关闭模态框
     * @param eleId
     */
    close : function(eleId){
        eleId = eleId || '';
        if($(".jakes[data-id='"+eleId+"']")) {
            $(".jakes[data-id='"+eleId+"']").remove();
            if($(".jakes-mask").length > 0)
                $(".jakes-mask").remove();
        } else {
            $(".jakes").remove();
            if($(".jakes-mask").length > 0)
                $(".jakes-mask").remove();
        }
    }
};

(function () {
    $(function () {
        $('a[data-edsPost]').click(function (e) {
            e.preventDefault();
            var me = $(this);
            if(typeof window.eds == 'undefined')
                window.eds = {};
            window.eds.me = me;
            var _html = me.html();
            me.html('正在提交...');
            if($(this).hasClass('btn-danger')) {
                edsUI.mask().confirm('您真的要执行此操作吗，操作将不可',function () {
                    doClick(window.eds.me);
                });
            } else {
                doClick(me);
            }

            function doClick(me) {
                $.post(me.attr('href'),{},function (result) {
                    if(result.status) {
                        edsUI.mask().alert(result.message,function () {
                            window.location.reload();
                        });
                    } else {
                        edsUI.mask().alert(result.message);
                        me.html(_html);
                    }
                });
            }

        });
    })
}());
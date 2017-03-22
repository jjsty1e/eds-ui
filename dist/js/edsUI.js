/*!
 * Copyright 2016, Jaggle
 * Released under the MIT License
 * https://github.com/Jaggle/eds-ui
 */
(function ($) {
    window.edsUI = window.edsUI || {};

    /**
     * 自动消失弹出层
     *
     * @param msg
     * @param callback1
     */
    edsUI.toast = function (msg, callback1) {
        var timestamp = new Date().getTime();
        $("body").append(edsUI.template.toast);
        var _toastModal = $(".jakes-notice");
        _toastModal.html(msg);
        _toastModal.attr('data-id', timestamp);
        _toastModal.animate({
            'top': 100
        }, 500, function () {
            setTimeout(function () {
                _toastModal.fadeOut(500);
                edsUI.close(timestamp);
            }, 500)
        });
        //1秒之后执行回调函数,以防止动画被阻断
        if (callback1) {
            setTimeout(function () {
                callback1();
            }, 1000);
        }
    };

    /**
     * 警告框
     *
     * @param title
     * @param msg
     * @param callback1
     */
    edsUI.alert = function (title, msg, btnArray, btn1Call, btn2Call) {
        var timestamp = new Date().getTime();
        switch (arguments.length) {
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
        _alertModal.attr('data-id', timestamp);
        var header = $('.jakes-alert-header');
        var content = $('.jakes-alert-content');
        content.html(msg);
        header.html(title);
        header.prepend('<i class="fa fa-exclamation-circle">&nbsp;&nbsp;');
        this._bingCloseIcon(header, timestamp);

        _alertModal.css('top', -250);

        if ($(window).width() < 1000) {
            var top = $(window).height() / 2 - _alertModal.height();
        } else {
            top = 100
        }

        _alertModal.animate({
            'top': top
        }, 500);


        _alertModal.css('margin-left', -_alertModal.width() / 2);
        _alertModal.show();

        $('*').blur();
        $(document).keydown(function (e) {
            if(e.keyCode == 13) {
                $('div.jakes-alert-button > button').trigger('click');
            }
        });


        $('div.jakes-alert-button > button').click(function () {
            if (callback1) {
                callback1();
            }
            edsUI.close(timestamp);
        });

    };

    /**
     * 确认框
     *
     * @param title
     * @param msg
     * @param btnArray
     * @param btn1Call
     * @param btn2Call
     */
    edsUI.confirm = function (title, msg, btnArray, btn1Call, btn2Call) {
        var timestamp = new Date().getTime();
        switch (arguments.length) {
            case 2 :                // (msg,btn1Call)
                btn1Call = msg;
                msg = title;
                title = '提示';
                btnArray = ['确定', '取消'];
                break;
            case 3 :               //(title,msg,btn1Call)
                btn1Call = btnArray;
                btnArray = ['确定', '取消'];
                break;
            case 4 :               //(title,msg,btn1Call,btn2Call)
                btn2Call = btn1Call;
                btn1Call = btnArray;
                btnArray = ['确定', '取消'];
        }

        $('body').append(this.template.confirm);
        var _confirmModal = $(".jakes-confirm");
        _confirmModal.attr('data-id', timestamp);
        var headerDiv = $('.jB-confirm-header');
        headerDiv.html(title);
        headerDiv.prepend('<i class="fa fa-exclamation-circle">&nbsp;&nbsp;');
        this._bingCloseIcon(headerDiv, btn2Call || function () {
            }, timestamp);
        $(".jB-confirm-content").html(msg);
        var btn1 = $("div.jakes-confirm-buttons > button:nth-child(1)");
        var btn2 = $("div.jakes-confirm-buttons > button:nth-child(2)");
        btn1.html(btnArray[0]);
        btn2.html(btnArray[1]);
        _confirmModal.css('top', -250);
        _confirmModal.show();

        if ($(window).width() < 1000) {
            var top = $(window).height() / 2 - _confirmModal.height();
        } else {
            top = 100
        }
        _confirmModal.animate({
            top: top
        }, 500);
        _confirmModal.css('margin-left', -_confirmModal.width() / 2);

        btn1.click(function () {
            if (btn1Call) {
                btn1Call();
            }
            edsUI.close(timestamp);
            return true;
        });
        btn2.click(function () {
            if (btn2Call) {
                btn2Call();
            }
            edsUI.close(timestamp);
            return false;
        });
    };

    /**
     *  可选参数2-4个，不过建议还是使用完整的参数列表
     *
     * @param title
     * @param btnArray
     * @param btn1Call
     * @param btn2Call
     */
    edsUI.prompt =function (title, btnArray, btn1Call, btn2Call) {
        var timestamp = new Date().getTime();
        switch (arguments.length) {
            case 2 :                // (title,btn1Call)
                btn1Call = btnArray;
                btnArray = ['确定', '取消'];
                break;
            case 3 :                //(title,btn1Call,btn2Call)
                btn2Call = btn1Call;
                btn1Call = btnArray;
                btnArray = ['确定', '取消'];
                break;
        }

        $('body').append(this.template.prompt);
        var _promptModal = $(".jakes-confirm");
        _promptModal.attr('data-id', timestamp);
        var headerDiv = $('.jB-confirm-header');
        headerDiv.html(title);
        headerDiv.prepend('<i class="fa fa-exclamation-circle">&nbsp;&nbsp;');
        this._bingCloseIcon(headerDiv, btn2Call || function () {
            }, timestamp);
        var btn1 = $("div.jakes-confirm-buttons > button:nth-child(1)");
        var btn2 = $("div.jakes-confirm-buttons > button:nth-child(2)");
        btn1.html(btnArray[0]);
        btn2.html(btnArray[1]);
        _promptModal.css('top', -250);
        _promptModal.show();
        _promptModal.animate({
            top: 100
        }, 500);
        btn1.click(function (e) {
            if (btn1Call) {
                e.content = $('.jB-confirm-content input').val();
                btn1Call(e);
            }
            edsUI.close(timestamp);
        });
        btn2.click(function () {
            if (btn2Call) {
                btn2Call();
            }
            edsUI.close(timestamp);
        });

    };

    /**
     * 异步表单提交
     *
     * @param formId
     * @param callback
     * @param loading
     */
    edsUI.form =function (formId, callback, loading) {

        $(document).on('submit',formId,function () {
            $.ajax({
                url: $(formId).attr('action'),
                type: $(formId).attr('method'),
                data: $(formId).serialize(),
                beforeSend: function () {
                    if (loading) {
                        window.eds = {};
                        switch (loading[1]) {
                            case 'text' :
                                if ($(loading[0]).val()) {
                                    window.eds.loaddingHtml = $(loading[0]).val()
                                } else {
                                    window.eds.loaddingHtml = $(loading[0]).html()
                                }
                                if ($(loading[0]).val()) {
                                    $(loading[0]).val('正在提交...');
                                } else {
                                    $(loading[0]).html('正在提交...');
                                }

                                $(loading[0]).addClass('disabled');
                                break;
                            default:
                                break;
                        }
                    }
                },
                complete: function () {
                    if (loading) {
                        switch (loading[1]) {
                            case 'text' :
                                $(loading[0]).removeClass('disabled');
                                if ($(loading[0]).val()) {
                                    $(loading[0]).val(window.eds.loaddingHtml);
                                } else {
                                    $(loading[0]).html(window.eds.loaddingHtml);
                                }
                                break;
                            default:
                                break;
                        }
                    }
                },
                success: function (result) {
                    if (callback) {
                        callback(result);
                    }
                }
            }).error(function (event) {
                var response = JSON.parse(event.responseText);
                if (typeof response.message != 'undefined') {
                    edsUI.mask().alert(response.message);
                } else {
                    console.log(event.responseText);
                }

                $(loading[0]).removeClass('disabled');
                if ($(loading[0]).val()) {
                    $(loading[0]).val(window.eds.loaddingHtml);
                } else {
                    $(loading[0]).html(window.eds.loaddingHtml);
                }
            });
            return false;
        });
    };

    /**
     * 自定义html内容
     *
     * @param title
     * @param htmlContent
     * @param closeCallback 点击关闭角标的回调
     */
    edsUI.html = function (title, htmlContent, closeCallback) {
        var timestamp = new Date().getTime();
        $('body').append(this.template.html);
        var _htmlModal = $('.jakes-html');
        _htmlModal.attr('data-id', timestamp);
        var header = $('.jakes-html-header');
        var content = $('.jakes-html-content');

        header.html(title);
        content.html(htmlContent);

        header.prepend('<i class="fa fa-exclamation-circle">&nbsp;&nbsp;');
        this._bingCloseIcon(header, closeCallback, timestamp);

        _htmlModal.css('top', -250);

        if ($(window).width() < 1000) {
            var top = 100;
        } else {
            top = 100
        }

        _htmlModal.animate({
            'top': top
        }, 500);


       // _htmlModal.css('margin-left', -_htmlModal.width() / 2);
        _htmlModal.show();
    };

    /**
     * 遮罩层
     *
     * @returns {edsUI}
     */
    edsUI.mask = function () {
        var htmlMask = "<div class='jakes-mask'></div>";
        $('body').append(htmlMask);
        var divMask = $('.jakes-mask');
        divMask.height($(document).height());
        divMask.show();

        return this;
    }

    edsUI.location = {
        /**
         * 这个变量应该设置为私有，
         */
        href: '',

        /**
         * 页面跳转
         */
        go: function () {
            window.location.href = this.href;
        },

        /**
         * 获取域名
         * @param url
         */
        getHostName: function (url) {
            if (!url) {
                url = window.location.href;
            }

            if (url.indexOf('?') != -1) {
                var hostName = url.substr(0, url.indexOf('?'));
            } else if (url.indexOf('#') != -1) {
                hostName = url.substr(0, url.indexOf('#'));
            } else {
                hostName = url;
            }

            this.href = hostName.replace(/\/$/, '');
            return this;
        },

        /**
         * 设置路由参数
         *
         * @param name
         * @param value
         */
        setParameter: function (name, value) {

            if (this.hasParameter(name)) {
                this.removeParameter(name);
            }

            if (this.href.indexOf('?') != -1) {
                this.href += '&' + name + '=' + value;
            } else {
                this.href += '?' + name + '=' + value;
            }

            return this;
        },

        /**
         * 去除当前url中的一个参数
         */
        removeParameter: function (name) {
            var reg1 = new RegExp("\\?" + name + '=[^\\&]*');
            var reg2 = new RegExp("\\&" + name + '=[^\\&]*');

            if (this.href.search(reg1) >= 0) {

                this.href = this.href.replace(reg1, '');
                var index = this.href.indexOf('&');

                if (index >= 0) {

                    var str1 = this.href.substr(0,index);
                    var str2 = this.href.substr(index+1);
                    this.href = str1 + '?' + str2;

                }
            }
            this.href = this.href.replace(reg2, '');
            return this;
        },

        /**
         * 获取url中的一个参数
         *
         * @param name
         */
        getParameter: function (name) {
            var parameters = this.getParameters();
            if (parameters.hasOwnProperty(name)) {
                return parameters[name];
            } else {
                console.info('location has no parameter named ' + name);
                return '';
            }
        },

        /**
         * 检查url中是否存在某个参数
         *
         * @param name
         */
        hasParameter: function (name) {
            return this.getParameters().hasOwnProperty(name);
        },

        /**
         * 保留url中的参数，用于需要给url添加新的参数的时候
         */
        holdParameters: function () {

            var parameters = this.getParameters();

            for (var key in parameters) {
                if(!key)
                    return this;
                else {
                    if (parameters.hasOwnProperty(key) && key != 'page') {
                        this.setParameter(key, parameters[key], true)
                    }
                }
            }
            return this;
        },

        /**
         * 获取url中的参数列表
         */
        getParameters: function (href) {
            if (!href) {
                href = window.location.href;
            }
            var start = href.indexOf('?');
            if (start !== -1) {
                var last = href.substr(start + 1);
                var flagStart = last.indexOf('#');
                if (flagStart != -1) {
                    last = last.substr(0, flagStart);
                }
                var nodes = last.split('&');
                var parameters = [];
                for (var i = 0; i < nodes.length; i++) {
                    var _node = nodes[i].split('=');
                    parameters[_node[0]] = _node[1];
                }
            } else {
                parameters = [];
            }
            return parameters;
        }
    };

    /**
     * 简易模板渲染
     *
     * 使用占位符 @@, 例如 @variable_name@ 代表渲染变量variable_name
     *
     * @param template string
     * @param parameters object
     */
    edsUI.parse = function (template, parameters) {
        for (var key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                var reg = new RegExp('@'+key+'@', 'g');
                template = template.replace(reg, parameters[key]);
            }
        }

        return $(template);
    };

    /**
     * 关闭模态框
     *
     * @param eleId
     */
    edsUI.close = function (eleId) {
        var mask = $(".jakes-mask");
        var modal = $(".jakes[data-id='" + eleId + "']");

        if(eleId && modal.length > 0) {
            modal.remove();
        } else {
            $(".jakes").remove();
        }

        mask.length > 0 && mask.remove();
    }

    /**
     * 绑定关闭弹出层角标
     *
     * @access private
     * @param node
     * @param callback1
     * @param eleId
     * @private
     */
    edsUI._bingCloseIcon = function (node, callback1, eleId) {
        node.append(this.template.closeIcon);
        switch (arguments.length) {
            case 2:
                eleId = callback1;
                callback1 = null;

        }

        $(".jakes-close-icon").click(function () {
            edsUI.close(eleId);
            if (callback1) {
                callback1();
            }
        });
    }

    /**
     * 模板集合
     *
     * @access private
     */
    edsUI.template = {
        toast: "<div class='jakes jakes-notice'></div>",

        confirm: '<div class="jakes jakes-confirm">' +
        '<div class="jB-confirm-header">' +

        '</div>' +
        '<div class="jB-confirm-content">' +

        '</div>' +
        '<div class="jakes-confirm-buttons">' +
        ' <button>按钮1</button>' +
        '<button>按钮2</button>' +
        '</div>' +
        '</div>',

        prompt: '<div class="jakes jakes-confirm">' +
        '<div class="jB-confirm-header">' +

        '</div>' +
        '<div class="jB-confirm-content">' +
        '<input type="text" class="form-control">' +
        '</div>' +
        '<div class="jakes-confirm-buttons">' +
        ' <button>按钮1</button>' +
        '<button>按钮2</button>' +
        '</div>' +
        '</div>',

        closeIcon: '<i class="jakes-close-icon"></i>',

        alert: '<div class="jakes jakes-alert">' +
        ' <div class="jakes-alert-header">警告</div>' +
        ' <div class="jakes-alert-content">不能删除该内容</div>' +
        '  <div class="jakes-alert-button"><button id="eds-alert-btn">确定</button></div>' +
        ' </div>',

        html: '<div class="jakes jakes-html">' +
        '<div class="jakes-header jakes-html-header">自定义html</div>' +
        '<div class="jakes-content jakes-html-content"></div>' +
        '</div>'
    };

    $(function () {
        $('a[data-edsPost]').click(function (e) {
            e.preventDefault();
            var me = $(this);
            var meta = me.attr('data-edsPost');
            if(typeof window.eds == 'undefined')
                window.eds = {};
            window.eds.me = me;
            var _html = me.html();
            me.html('正在提交...');
            if($(this).hasClass('btn-danger') || $(this).hasClass('confirm')) {
                edsUI.mask().confirm('警告','您真的要执行此操作吗，操作将不可撤销',function () {
                    doClick(window.eds.me, meta);
                },function () {
                    me.html(_html);
                });
            } else {
                doClick(me, meta);
            }

            function doClick(me, meta) {
                $.post(me.attr('href'),{},function (result) {
                    if(result.status) {
                        if (meta.indexOf('toast') != -1) {
                            edsUI.toast(result.message);
                        } else {
                            edsUI.mask().alert(result.message,function () {
                                window.location.reload();
                            });
                        }
                        me.html(_html);
                    } else {
                        edsUI.mask().alert(result.message);
                        me.html(_html);
                    }
                }).error(function (event) {
                    var response = JSON.parse(event.responseText);
                    if ( typeof response.message != 'undefined') {
                        edsUI.mask().alert(response.message);
                    } else {
                        console.log(event.responseText);
                    }
                    me.html(_html);
                });
            }

        });
        $(document).on('click','.edsUI-close', function (e) {
            edsUI.close($(e.toElement).closest('jakes').attr('data-id'));
        })
    })

})(jQuery)
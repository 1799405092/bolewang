$(document).ready(function() {
    var b = $_CONFIG.template;
    switch (b) {
    case "my/index":
        $("header").addClass("he_fa");
        break;
    case "my/myapply":
        getRecommendList();
        var c = $("#refer_name").val();
        if (c == "my51job" || c == "joblist") {
            $(".btmtab").hide()
        }
        break
    }
    $("#workstatus").click(function() {
        $(this).toggleClass("on");
        var g = $_CONFIG.domain + "";
        var h = $(this).hasClass("on") ? 0 : 4;
        var i = {
            situation: h,
            isenglish: "c"
        };
        var f = ajaxRequest(g, i, "post", "json");
        if (f.status == 0) {
            if (f.url) {
                location.href = f.url
            }
            $(this).toggleClass("on");
            pop.ini({
                msg: ""
            }, {
                title: [],
                callback: ["", "jumpResume()"]
            })
        } else {
            var e = $(this).hasClass("on") ? "MIDUODUO_MY_OPENJOB" : "MIDUODUO_MY_CLOSEJOB";
            var d = $_CONFIG.domain + "/ajax/my/writelog.ajax.php?jsoncallback=?&tracetag=" + e;
            $.getJSON(d);
            return false
        }
    });
    $(".fbut").click(function() {
        pop.ini({
            msg: ""
        }, {
            title: [],
            callback: ["", ]
        })
    });
    $("#changeLinkInfo").click(function() {
        $(".myFm").hide();
        $(".head").hide();
        $("#phone").show();
        $(".btmtab").hide()
    });
    $(".goback").click(function() {
        pageClose()
    });
    $(".switchPage").click(function() {
        $(".up").hide();
        if ($(this).hasClass("email1")) {
            $("#email").show()
        } else {
            if ($(this).hasClass("phone1")) {
                $("#phone").show()
            } else {
                $("#pwd").show()
            }
        }
    });
    $(".cop").click(function() {
        if ($(this).hasClass("email1")) {
            changeEmail();
            return false
        } else {
            if ($(this).hasClass("phone1")) {
                changPhone()
            } else {
                if ($(this).hasClass("pwd1")) {
                    changePwd()
                }
            }
        }
    });
    $("#get_verify_code").bind("click", click_send_sms);
    $(".seeme").click(function() {
        var d = $_CONFIG.deeplinkid != "" ? $_CONFIG.deeplinkid : "dlmdd_mddh5_mddskgw";
        var e = $_CONFIG.c != "" ? $_CONFIG.c : "PM_MDD_APP_SKGW";
        window.location.href = "miduoduo://home/show_resumeviewed?deeplinkid=" + d;
        setTimeout(function() {
            window.location.href = "//app.51mdd.com/?isdownload=1&c=" + e
        }, 2000)
    });
    $(".jobid").click(function() {
        $(this).toggleClass("checked");
        return false
    });
    $("#selAllJob").click(function() {
        var d = false;
        $(".jobid").each(function() {
            if (!$(this).hasClass("checked")) {
                d = true;
                return false
            }
        });
        if (d) {
            $(this).addClass("on");
            $(".jobid").addClass("checked")
        } else {
            $(this).removeClass("on");
            $(".jobid").removeClass("checked")
        }
    });
    $("#delJob").click(function() {
        if ($(".checked").length < 1) {
            pop.ini({
                msg: "你没有选择任何职位"
            }, {
                title: "确定"
            });
            return false
        }
        pop.ini({
            msg: "你确定要删除吗？"
        }, {
            title: ["取消", "确定"],
            callback: ["", "delJobAjax()"]
        })
    });
    $(document).on("click", ".applyJob", function() {
        switch (b) {
        case "my/myapply":
            var f = $(this).attr("jobid");
            var e = applyJob(f);
            if (e.status == 1) {
                pop.msg("恭喜您，职位申请成功！");
                $(this).removeClass("b_light").addClass("b_gray").removeClass("applyJob").text("已申请")
            } else {
                if (e.status == 0) {
                    if (e.url) {
                        location.href = e.url;
                        return false
                    } else {
                        pop.ini({
                            msg: e.desc
                        }, {
                            title: "确定"
                        })
                    }
                }
            }
            return false;
            break;
        case "my/mycollection":
            if ($(".checked").length < 1) {
                pop.ini({
                    msg: "没有选择职位，无法申请"
                }, {
                    title: "确定"
                });
                return false
            }
            var d = new Array();
            $(".checked").each(function() {
                d.push($(this).attr("value"))
            });
            f = d.toString();
            var e = applyJob(f);
            if (e.status == 1) {
                $(".apply").each(function() {
                    var g = $(this).attr("value");
                    if ($.inArray(g, d) >= "0") {
                        $(this).removeClass("apply").addClass("applyed").text("已申请")
                    }
                });
                pop.msg("恭喜您，职位申请成功！")
            } else {
                if (e.status == 0) {
                    if (e.url) {
                        location.href = e.url;
                        return false
                    } else {
                        pop.ini({
                            msg: e.desc
                        }, {
                            title: "确定"
                        })
                    }
                }
            }
            break
        }
    });
    if ($_CONFIG.template == "my/myapply") {
        if (showWxPop()) {
            var a = "";
            a += '<div class="pop_tg" id="wxpop"><div class="in record"><em class="close"></em><img class="tgimg" src="' + $_CONFIG.imgpath + '/record_index20180209.png" alt=""><div class="info"><p><span>-提示-</span><br/><br/>用米多多微信，<br/>可实时接收简历反馈与面试通知~<br/>好机会不容错过！</p><div class="code"><span>扫二维码或微信搜索</span><div class="mdd"><span>"</span>51米多多<span>"</span></div><img width="100" height="100" src="' + $_CONFIG.imgpath + '/mdd_code.png" alt="51米多多"></div></div></div></div>';
            $("body").after(a);
            $("#wxpop,#shadow").show();
            $("#wxpop .close").click(function() {
                $("#wxpop,#shadow").hide();
                return false
            })
        }
    }
});
var showWxPop = function() {
    var a = storage.json_get("wxpop");
    var c = new Date()
      , f = c.getFullYear()
      , h = c.getMonth() + 1
      , e = c.getDate();
    if (!a) {
        storage.json_set("wxpop", {
            year: f,
            month: h,
            day: e
        });
        return true
    } else {
        var d = a.year
          , g = a.month
          , b = a.day;
        if (d == c.getFullYear() && (g == c.getMonth() + 1) && b == c.getDate()) {
            return false
        } else {
            storage.json_set("wxpop", {
                year: f,
                month: h,
                day: e
            });
            return true
        }
    }
};
var jumpResume = function() {
    location.href = $_CONFIG.domain + "/resume/guide1.php";
    return false
};
var pageClose = function() {
    $(".myFm").show();
    $(".head").show();
    $(".up").hide();
    $(".btmtab").show()
};
var loginout = function() {
    location.href = $_CONFIG.domain + "/my/logout.php";
    return false
};
var delJobAjax = function() {
    var e = $("#pageno").val();
    var b = new Array();
    $(".checked").each(function() {
        b.push($(this).attr("value"))
    });
    jobid = b.toString();
    var c = $_CONFIG.domain + "/ajax/my/delcolljob.ajax.php";
    var d = {
        jobid: jobid
    };
    var a = ajaxRequest(c, d, "post", "json");
    if (a.status == 1) {
        $(".checked").parent().remove();
        if ($(".case").length < 1) {
            e = e > 1 ? e - 1 : e;
            window.location.href = $_CONFIG.domain + "/my/mycollection.php?pageno=" + e
        }
    } else {
        if (a.url) {
            location.href = a.url
        } else {
            pop.ini({
                msg: "删除失败"
            }, {
                title: "确定"
            })
        }
    }
    pop.close()
};
var applyJob = function(d) {
    var b = $_CONFIG.domain + "/ajax/search/apply.ajax.php";
    var c = {
        jobid: d
    };
    var a = ajaxRequest(b, c, "post", "json");
    return a
};
var getRecommendList = function() {
    $("#commend").empty();
    var c = $(".city").text();
    var b = $_CONFIG.domain + "/ajax/my/recommend.ajax.php";
    var d = {
        jobarea: c
    };
    var a = ajaxRequest(b, d, "get", "json");
    if (a.status == 1) {
        $("#commend").append(a.html);
        $(".changeAnother").click(function() {
            getRecommendList()
        })
    }
    return false
};
 var changeEmail = function() {
    var f = $(".old_email").val()
      , b = filterTitle($(".new_email")).toLowerCase()
      , d = filterTitle($(".old_pwd"));
    if (b == "") {
        pop.ini({
            msg: "请输入要修改的email"
        }, {
            title: "确定"
        });
        return false
    }
    if (/^(([0-9a-zA-Z]+)|([0-9a-zA-Z]+[_.0-9a-zA-Z-]*))@yahoo.(\S)+$/.test(b)) {
        pop.ini({
            msg: "雅虎邮箱已停止服务，请更换其他邮箱"
        }, {
            title: "确定"
        });
        return false
    }
    if (b == f) {
        pop.ini({
            msg: "新email不能与旧email一致"
        }, {
            title: "确定"
        });
        return false
    }
    if (d == "") {
        pop.ini({
            msg: "请输入密码"
        }, {
            title: "确定"
        });
        return false
    }
    var c = $_CONFIG.domain + "/ajax/my/changeemail.ajax.php";
    var e = {
        old_email: f,
        new_email: b,
        password: d
    };
    var a = ajaxRequest(c, e, "post", "json");
    if (a.status == 0) {
        if (a.url) {
            location.href = a.url
        } else {
            pop.ini({
                msg: a.desc
            }, {
                title: "确定"
            })
        }
    } else {
        if (a.status == 1) {
            pop.ini({
                msg: "邮箱修改成功"
            }, {
                title: "确定",
                callback: ["pop.close();pageClose();"]
            });
            $(".old_email").val(b);
            $(".new_email,.old_pwd").val("");
            return false
        }
    }
};
var changePwd = function() {
    var c = filterTitle($("#old_pwd"))
      , f = filterTitle($("#new_pwd"))
      , e = filterTitle($("#new_pwd_repeat"));
    if (c == "") {
        pop.ini({
            msg: "请输入密码"
        }, {
            title: "确定"
        });
        return false
    }
    if (f == "") {
        pop.ini({
            msg: "请输入新密码"
        }, {
            title: "确定"
        });
        return false
    }
    if (e == "") {
        pop.ini({
            msg: "请输入确认密码"
        }, {
            title: "确定"
        });
        return false
    }
    if (f != e) {
        pop.ini({
            msg: "确认密码必须与新密码一致"
        }, {
            title: "确定"
        });
        return false
    }
    var b = $_CONFIG.domain + "/ajax/my/changepwd.ajax.php";
    var d = {
        oldpwd: c,
        newpwd: f,
        newpwdrepeat: e
    };
    var a = ajaxRequest(b, d, "post", "json");
    if (a.status == 0) {
        pop.ini({
            msg: a.desc
        }, {
            title: "确定"
        });
        return false
    } else {
        if (a.status == 1) {
            pop.ini({
                msg: "密码修改成功"
            }, {
                title: "确定",
                callback: ["pop.close();pageClose();"]
            });
            $("#old_pwd,#new_pwd,#new_pwd_repeat").val("");
            return false
        }
    }
};
var click_send_sms = function() {
    var b = $("#mp_verifystatus").val();
    var d = filterTitle($(".new_phone")).trim();
    var c = filterTitle($("#old_phone"));
    var a = "";
    if (d == "") {
        pop.ini({
            msg: "请输入手机号码"
        }, {
            title: "确定"
        });
        return false
    } else {
        if (!isPhone(d)) {
            pop.ini({
                msg: "请输入正确格式的手机号码"
            }, {
                title: "确定"
            });
            return false
        }
    }
    if (c != "" && isPhone(c)) {
        if (b == "3" && c == d) {
            pop.ini({
                msg: "请输入新的手机号码"
            }, {
                title: "确定"
            });
            return false
        }
    }
    sendSms(a, d)
};
var sendSms = function(b, e) {
    var c = $_CONFIG.domain + "/ajax/my/sendverifycode.ajax.php?";
    var d = {
        code: b,
        mobilephone: e
    };
    var a = ajaxRequest(c, d, "get", "json");
    if (a.status == 1) {
        countDown()
    } else {
        pop.ini({
            msg: a.desc
        }, {
            title: "确定"
        });
        return false
    }
};
var time_binphone = 60;
var countDown = function() {
    $("#get_verify_code").addClass("c_gray");
    $("#get_verify_code").unbind("click");
    if (time_binphone > 0) {
        time_binphone--;
        $("#get_verify_code").text(time_binphone + "秒后重发");
        var a = setTimeout("countDown()", 1000)
    } else {
        time_binphone = 60;
        $("#get_verify_code").text("重新发送");
        $("#get_verify_code").removeClass("c_gray");
        $("#get_verify_code").bind("click", click_send_sms)
    }
};
var changPhone = function() {
    var d = $("#mp_verifystatus").val();
    var g = filterTitle($(".new_phone")).trim();
    var e = filterTitle($("#old_phone"));
    var b = filterTitle($("#smscode"));
    if (g == "") {
        pop.ini({
            msg: "请输入手机号码"
        }, {
            title: "确定"
        });
        return false
    } else {
        if (!isPhone(g)) {
            pop.ini({
                msg: "请输入正确格式的手机号码"
            }, {
                title: "确定"
            });
            return false
        } else {
            if (g == e && d == "3") {
                pop.ini({
                    msg: "请输入新的手机号码"
                }, {
                    title: "确定"
                });
                return false
            }
        }
    }
    if (b == "") {
        pop.ini({
            msg: "请输入验证码"
        }, {
            title: "确定"
        });
        return false
    }
    var c = $_CONFIG.domain + "/ajax/my/bindphone.ajax.php?";
    var f = {
        code: b,
        mobilephone: g
    };
    var a = ajaxRequest(c, f, "get", "json");
    if (a.status == 1) {
        pop.ini({
            msg: a.desc
        }, {
            title: "确定",
            callback: ["pop.close();pageClose();"]
        });
        $("#smscode").val("");
        $(".new_phone").val(g);
        return false
    } else {
        if (a.status == 0) {
            pop.ini({
                msg: a.desc
            }, {
                title: "确定"
            });
            return false
        }
    }
};
var isPhone = function(a) {
    var b = /^(1[3456789]{1,1}[0-9]{9,9})$/;
    return b.test(a)
};

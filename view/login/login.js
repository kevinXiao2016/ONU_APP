function login(username,pwd) {
    var onu_username = username;
    var onu_pwd = pwd;
    var setting = JSON.parse(myStorage.getItem('setting'));
    if(setting == 'undefined' || setting == null || setting[0].ip == '' || setting[0].port == '') {
        mui.confirm('未配置服务器，现在去设置？', '警告', ['是', '否'], function(e) {
            if(e.index == 0) {
                mui.openWindow({
                    id: 'setting',
                    url: '../setting/setting.html'
                });
            }
        });
    } else {
        var ip = JSON.parse(myStorage.getItem('setting'))[0].ip;
        var port = JSON.parse(myStorage.getItem('setting'))[0].port;
        mui.ajax('http://' + ip + ':' + port + '/mobile/login.mb', {
            data: {
                username: username,
                'password': pwd
            },
            dataType: 'json',
            type: 'post',
            timeout: 10000,
            success: function(data) {
                //服务器返回响应，根据响应结果，分析是否登录成功；
                for(var key in data) {
                    console.log(key + ': ' + data[key])
                }

                // 如有错误码，显示对应错误信息
                if(data.errorCode > 0) {
                    switch(data.errorCode) {
                        case 21:
                            mui.alert("没有移动端访问权限", "错误");
                            break;
                        case 11:
                            mui.alert("用户名不存在", "错误");
                            break;
                        case 12:
                            mui.alert("密码错误", "错误");
                            break;
                        case 2:
                            mui.alert("用户被停用", "错误");
                            break;
                        case 3:
                            mui.alert("IP被限制访问", "错误");
                            break;
                    }
                } else {
                    // 保存自动登录时的用户名和密码
                    myStorage.setItem('ONU.token.username',onu_username);
                    myStorage.setItem('ONU.token.password',onu_pwd);
                    //标记用户已登录
                    myStorage.setItem('isLogin',true);
                    // 跳转首页
                    mui.openWindow({
                        id: 'main',
                        url: '../main/main.html'
                    });
                }
            },
            error: function(xhr, type, errorThrown) {
                //异常处理
                mui.alert("登陆失败，请验证服务器设置", "错误")
            }
        })
    }

}
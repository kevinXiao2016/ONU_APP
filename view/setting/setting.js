function changePortAddress() {
    var btnArray = ['确定', '取消'];
    mui.prompt('请输入服务器地址：', '', '提示', btnArray, function(e) {
        if(e.index == 0) {
            var v = e.value;
            document.getElementById("address").innerText = v;
            saveServer('ip', v);
        }
    })
}

function changePortNum() {
    var btnArray = ['确定', '取消'];
    mui.prompt('请输入服务器端口：', '必须是数字', '提示', btnArray, function(e) {
        if(e.index == 0) {
            var v = e.value;
            document.getElementById("portNumber").innerText = v;
            saveServer('port', v);
        }
    })
}

function checkNewVersion() {
    mui.toast('已经是最新版本')
}

function saveServer(id, value) {
    var setting = myStorage.getItem('setting');
    if(!setting) {
        setting = [{
            ip: '',
            port: ''
        }];
        setting[0][id] = value;
    } else {
        setting = JSON.parse(setting);
        setting[0][id] = value;
    }
    myStorage.setItem('setting', JSON.stringify(setting));

    console.log(myStorage.getItem('setting'));
}


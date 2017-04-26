mui.init({
    beforeback: function() {
        var historyList = plus.webview.getWebviewById('historyList');
        mui.fire(historyList, 'refresh');
        return true;
    }
});

mui.plusReady(function() {
    var onuId = plus.webview.currentWebview().onuId;
    if(onuId) {
        document.getElementById('onuId-title').innerHTML = onuId;
    }
    //更新访问
    addAccessOnu(onuId);
    
    //TODO 判断当前是否直连
    // 如果是直连ONU，判断是否登录NM3000
    
    // 加载预配置信息
    loadPreconfig(onuId);
    /*var group = new webviewGroup("viewgroup", {
        items: [{
            id: "onu_realtime",
            url: "onu_realtime.html",
            extras: {}
        }, {
            id: "onu_preconfig",
            url: "onu_preconfig.html",
            extras: {}
        }, {
            id: "onu_operation",
            url: "onu_operation.html",
            extras: {}
        }],
        onChange: function(obj) {
            var c = document.querySelector(".mui-control-item.mui-active");
            if(c) {
                c.classList.remove("mui-active");
            }
            document.querySelector(".mui-scroll .mui-control-item:nth-child(" + (parseInt(obj.index) + 1) + ")").classList.add("mui-active");
        }
    });
    mui(".mui-scroll").on("tap", ".mui-control-item", function(e) {
        var wid = this.getAttribute("data-wid");
        group.switchTab(wid);
    });*/

});

function loadPreconfig(onuId) {
    var onu = getAccessOnu(onuId);
    for(var key in onu) {
        $('#preconfig-' + key).val(onu[key]);
    }
    console.log(onu)
}

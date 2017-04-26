/**
 * @author xiaoyue
 * @desc 搜索功能所需的js
 */
//加载搜索记录
function loadSearchRecord() {
    var searchrecord = JSON.parse(myStorage.getItem('searchrecord'));
    if(searchrecord) {
        document.getElementById("subtitle").innerHTML = '搜索历史';
        var hl = document.getElementById("history");
        hl.classList.remove('widthout-bline');
        var html = template('searchHistoryList', {
            items: searchrecord
        });
        hl.innerHTML = html;
    }
}

/**
 * 保存搜索记录，连续搜索相同内容则只保存一次
 * @param {Object} record
 */
function saveSearchRecord(record) {
    var value = record.replace(/[\ ]/g, "");
    if(value.length == 0) {
        return;
    }
    var searchrecord = myStorage.getItem('searchrecord');
    if(!searchrecord || searchrecord == 'undefined') {
        searchrecord = [];
        searchrecord.unshift(value);
    } else {
        searchrecord = JSON.parse(searchrecord);
        if(searchrecord[0] != value) {
            if(searchrecord.length >= 10) {
                searchrecord.pop();
            }
            searchrecord.unshift(value);
        }
    }
    myStorage.setItem('searchrecord', JSON.stringify(searchrecord));
}

/**
 * 删除搜索记录
 * @param {Object} e
 */
function deleteRecord(e) {
    //阻止事件传播
    e.stopPropagation();
    //获取点击节点的索引
    var index = 0;
    var node = this.parentNode;
    while(node = node.previousSibling) {
        index++;
    }
    index = (index - 1) / 2;
    var searchrecord = JSON.parse(myStorage.getItem('searchrecord'));
    searchrecord.splice(index, 1);
    myStorage.setItem('searchrecord', JSON.stringify(searchrecord));
    loadSearchRecord();
}

//弹出软键盘，搜索框获得焦点
var nativeWebview, imm, InputMethodManager;
var initNativeObjects = function() {
    if(mui.os.android) {
        var main = plus.android.runtimeMainActivity();
        var Context = plus.android.importClass("android.content.Context");
        InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
        imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
    } else {
        nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
    }
};

var showSoftInput = function() {
    if(mui.os.android) {
        imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
    } else {
        nativeWebview.plusCallMethod({
            "setKeyboardDisplayRequiresUserAction": false
        });
    }
    setTimeout(function() {
        //此处可写具体逻辑设置获取焦点的input
        var inputElem = document.querySelector('input');
        inputElem.focus();
    }, 200);
};

var showSoftInput2 = function() {
    var nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
    if(mui.os.android) {
        //强制当前webview获得焦点
        plus.android.importClass(nativeWebview);
        nativeWebview.requestFocus();
        imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
    } else {
        nativeWebview.plusCallMethod({
            "setKeyboardDisplayRequiresUserAction": false
        });
    }
    setTimeout(function() {
        //此处可写具体逻辑设置获取焦点的input
        var inputElem = document.querySelector('input');
        inputElem.focus();
    }, 200);
};

/**
 * 加载匹配的搜索结果
 * @param {Object} resultlist 搜索结果数组
 */
function loadsearchResult(resultlist) {
    document.getElementById("subtitle").innerHTML = '搜索结果';
    var hl = document.getElementById("history");
    hl.classList.remove('widthout-bline');
    var html = template('searchResultList', {
        items: resultlist
    });
    hl.innerHTML = html;
}

/**
 * 未搜到结果，显示新增预配置
 * @param {Object} value 
 */
function loadNewAddView(onuId) {
    saveSearchRecord(onuId);
    document.activeElement.blur(); //隐藏软键盘 
    document.getElementById("subtitle").innerHTML = '搜索结果';
    var hl = document.getElementById("history");

    hl.classList.add('widthout-bline');
    hl.innerHTML = '<li id="noresult" class="no-result">没有搜索到关于<br /><b>' + onuId + '</b> 的任何结果<br/>是否将其新增到预配置?</li>' +
        '<li class="pL15 pR15 pB15"><button type="button" class = "mui-btn mui-btn-primary mui-btn-block" id="newPreconfig">新增到预配置 </button></li>';

    //监听是否新增预配置按钮
    document.getElementById("newPreconfig").addEventListener('tap', function() {
        mui.openWindow({
            id: 'preconfig',
            url: '../preconfig/addpreconfig.html',
            extras: {
                onuId: onuId
            }
        });
    });
}

/**
 * 保存访问记录
 * @param {Object} mac
 */
function saveVisitHistory(mac) {
    //查询该mac对应onu信息
    var onulist = JSON.parse(myStorage.getItem('onulist'));
    var name;
    var sn;
    var time = (new Date()).getTime();
    var preconfig;
    var current;
    for(var i in onulist) {
        if(mac = onulist[i].mac) {
            name = onulist[i].name;
            sn = onulist[i].sn;
            preconfig = onulist[i].preconfig;
            current = onulist[i].current;
            break;
        }
    }
    //保存到访问历史
    var visitrecord = myStorage.getItem('visitrecord');
    if(!visitrecord || visitrecord == 'undefined') {
        visitrecord = [];
    } else {
        visitrecord = JSON.parse(visitrecord);
        if(visitrecord.length >= 10) {
            visitrecord.shift();
        }
    }
    visitrecord.push({
        name: name,
        sn: sn,
        time: time,
        mac: mac,
        preconfig: preconfig,
        current: current
    });
    myStorage.setItem('visitrecord', JSON.stringify(visitrecord));
}

/**
 * 输入框变化时搜索
 */
function inputChangeSearch() {
    var mac = this.value;
    //若输入框没有数据则显示搜索记录
    if(mac.length == 0) {
        loadSearchRecord();
        return;
    }
    //var value = mac.replace(/[\ |\-|\_|\:|\.]/g, "").toUpperCase();
    mac = formatQueryMac(mac);
    var resultlist = [];
    if(mac.length == 0) {
        loadSearchRecord();
    } else {
        resultlist = searchOnu(mac)
        loadsearchResult(resultlist);
    }

}

/**
 * 展示onu信息页面
 */
function showOnuInfo() {
    var mac = this.innerText.replace(' 预配置', '');
    saveSearchRecord(mac);
    mui.openWindow({
        id: 'onuonu',
        url: '../onuinfo/onuinfo.html',
        extras: {
            onuId: mac
        }
    });
}

//查找onu
//function searchOnu(mac) {
//	var resultlist = [];
//	if(mac.length == 0) {
//		return resultlist;
//	}
//	//假数据
//	myStorage.setItem('onulist', JSON.stringify(onus));
//
//	var onulist = JSON.parse(myStorage.getItem('onulist'));
//	if(onulist != 'undefined' && onulist.length > 0) {
//		for(var i in onulist) {
//			var trueMac = onulist[i].mac.toUpperCase();
//			if(mac.indexOf(':') == -1) {
//				trueMac = trueMac.replace(/:/g,'');
//			}
//			if(trueMac.indexOf(mac) == 0) {
//				resultlist.push(onulist[i]);
//			}
//		}
//	}
//	return resultlist;
//}

/**
 * 点击一条搜索历史时触发历史搜索
 */
function historysearch() {
    var record = this.innerText.trim();
    document.getElementById("searchInput").value = record;
    var resultlist = searchOnu(formatQueryMac(record)); //搜索符合条件的onu
    loadsearchResult(resultlist);
}

/**
 * mac格式化，支持3/6段，：.空格三种分隔符
 * @param {Object} mac
 */
formatQueryMac = function(mac) {
    if(!mac) {
        return mac;
    }
    // 将查询字转换成：符串中的所有间隔符
    mac = mac.replace(/[-\.\s]/g, ":").toUpperCase();
    // 考虑到有三段式的情况，如果查询字符串中间有间隔符，需要判断各间隔符之间的位置,并转换为六段式的情况来进行匹配
    var splitIndexs = [];
    for(var i = 0; i < mac.length; i++) {
        if(mac.charAt(i) == ":") {
            splitIndexs.push(i);
        }
    }
    if(splitIndexs.length == 1) {
        // 如果只有一个间隔符，则判断其左右字符的长度，是否需要加上间隔符
        if(mac.length - splitIndexs[0] > 3) {
            mac = mac.substring(0, splitIndexs[0] + 3) + ":" + mac.substring(splitIndexs[0] + 3, mac.length);
        }
        if(splitIndexs[0] > 2) {
            mac = mac.substring(0, splitIndexs[0] - 2) + ":" + mac.substring(splitIndexs[0] - 2, mac.length);
        }
    } else if(splitIndexs.length == 2) {
        // 如果有两个间隔符，则判断其是否为三段式，以及是否需要在指定位置加上间隔符
        if(splitIndexs[1] - splitIndexs[0] == 5) {
            if(mac.length - splitIndexs[1] > 2) {
                mac = mac.substring(0, splitIndexs[1] + 3) + ":" + mac.substring(splitIndexs[1] + 3, mac.length);
            }
            mac = mac.substring(0, splitIndexs[0] + 3) + ":" + mac.substring(splitIndexs[0] + 3, mac.length);
            if(splitIndexs[0] > 2) {
                mac = mac.substring(0, splitIndexs[0] - 2) + ":" + mac.substring(splitIndexs[0] - 2, mac.length);
            }
        }
    }

    // 如果间隔符大于2个，则肯定为六段式，不需做处理
    return mac;
}

//  ==========  = 
//  ==========  = 
//  ==========  = 
//  ==========  = 
//  ==========
//  ==========  = 
//  ==========  = 
//  ==========  = 
//  ==========  = 
//  ========== 
var onus = [{
    name: '湖北省武汉市洪山区关山大道2号',
    mac: '00:24:68:50:4F:E7',
    sn: 'SN8800026325LN',
    preconfig: true,
    current: true
}, {
    name: '湖北省武汉市洪山区关山大道3号鼎点视讯科技有限公司',
    mac: '00:24:68:50:4F:E8',
    sn: 'SN8800026325LN',
    preconfig: true
}, {
    name: '鼎点视讯科技有限公司',
    mac: '11:24:68:50:4F:E8',
    sn: 'SN8800026325LN',
    preconfig: true
}, {
    name: '鼎点视讯科技有限公司',
    mac: '33:24:68:50:4F:E8',
    sn: 'SN8800026325LN',
    preconfig: true
}, {
    name: '鼎点视讯科技有限公司',
    mac: '44:24:68:50:4F:E8',
    sn: 'SN8800026325LN',
    preconfig: true
}, {
    name: '鼎点视讯科技有限公司',
    mac: '55:24:68:50:4F:E8',
    sn: 'SN8800026325LN',
    preconfig: true
}];
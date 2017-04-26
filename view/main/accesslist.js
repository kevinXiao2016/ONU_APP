/**
 * 加载所有访问记录，按时间倒序展示
 */
function loadAccessList() {
	var accessList = myStorage.getItem('accessList');
	if(accessList && accessList != 'undefined') {
		accessList = JSON.parse(accessList);
	} else {
		accessList = [];
	}

	// 排序，按时间倒序
	accessList.sort(function(a, b) {
		return b.time - a.time;
	})
	var html = template('test', {
		list: accessList
	});
	document.getElementById('list-container').innerHTML = html;
}

/**
 * 查找已访问的ONU列表，支持模糊匹配
 * @param {Object} searchTxt
 */
function searchOnu(searchTxt) {
	var resultlist = [];
	if(searchTxt.length == 0) {
		return resultlist;
	}

	var accessList = myStorage.getItem('accessList');
	if(accessList && accessList != 'undefined') {
		accessList = JSON.parse(accessList);
	} else {
		accessList = [];
	}
	if(accessList != 'undefined' && accessList.length > 0) {
		mui.each(accessList, function(index, onu) {
			var _mac = onu.mac ? onu.mac.toUpperCase() : '';
			var _sn = onu.sn ? onu.sn.toUpperCase() : '';
			if(searchTxt.indexOf(':') == -1) {
				_mac = _mac.replace(/:/g, '');
			}
			if(_mac.indexOf(searchTxt) == 0 || _sn.indexOf(searchTxt) == 0) {
				resultlist.push(onu);
			}
		});
	}
	return resultlist;
}

/**
 * 从访问列表中得到ONU
 * @param {Object} onuId
 */
function getAccessOnu(onuId) {
	var accessList = myStorage.getItem('accessList');
	if(accessList && accessList != 'undefined') {
		accessList = JSON.parse(accessList);
	} else {
		accessList = [];
	}

	//遍历当前ONU访问记录，找到对应的ONU
	var _onu = null;
	mui.each(accessList, function(index, onu) {
		if(onu.mac === onuId || onu.sn === onuId) {
			_onu = onu;
			return false;
		}
	});

	return _onu;
}

/**
 * 插入访问ONU记录
 */
function addAccessOnu(onuId) {
	var accessList = myStorage.getItem('accessList');
	if(accessList && accessList != 'undefined') {
		accessList = JSON.parse(accessList);
	} else {
		accessList = [];
	}

	//遍历当前ONU访问记录，找到对应的ONU
	var searchOnuIndex = 0;
	mui.each(accessList, function(index, onu) {
		if(onu.mac === onuId || onu.sn === onuId) {
			searchOnuIndex = index;
			return false;
		}
	});
	console.log(searchOnuIndex)

	// 从accessList中剔除该ONU，修改该ONU访问时间为当前，再放入最前方
	var onu = accessList.splice(searchOnuIndex, 1)[0];
	onu.time = (new Date()).getTime();
	accessList.unshift(onu);
	// 排序，按时间倒序
	accessList.sort(function(a, b) {
		return b.time - a.time;
	});
	myStorage.setItem('accessList', JSON.stringify(accessList));
}

/**
 * 删除访问ONU记录
 */
function deleteAccessOnu() {

}

function openAddPreConfig() {
	mui.openWindowWithTitle({
		id: 'addPreConfig',
		url: '../preconfig/addpreconfig.html'
	}, {
		id: "addPreConfig",
		height: "44px", //导航栏高度值
		backgroundColor: "#009688", //导航栏背景色
		bottomBorderColor: "#cccccc", //底部边线颜色
		title: { //标题配置
			text: "新增预配置", //标题文字
			position: { //绘制文本的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
				top: 0,
				left: 0,
				width: "100%",
				height: "100%"
			},
			styles: { //绘制文本样式，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.TextStyles
				color: "#FFF",
				align: "center",
				family: "'Helvetica Neue',Helvetica,sans-serif",
				size: "17px",
				style: "normal",
				weight: "normal",
				fontSrc: ""
			}
		},
		back: { //左上角返回箭头
			image: { //图片格式
				base64Data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII=', //加载图片的Base64编码格式数据 base64Data 和 imgSRC 必须指定一个.否则不显示返回箭头
				imgSrc: '', //要加载的图片路径
				sprite: { //图片源的绘制区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
					top: '0px',
					left: '0px',
					width: '100%',
					height: '100%'
				},
				position: { //绘制图片的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
					top: "10px",
					left: "10px",
					width: "24px",
					height: "24px"
				}
			}
		}
	});
}
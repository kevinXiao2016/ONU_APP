function beforeback() {
	// 找到当前显示的步骤
	if(currentStep === 0 || currentStep === 4) {
		var historyList = plus.webview.getWebviewById('historyList');
		mui.fire(historyList, 'refresh');
		return true;
	} else {
		//切换到上一步骤
		showCorrectStep(--currentStep);
		return false;
	}
}

function showCorrectStep(step) {
	switch(step) {
		case 0:
			showAddId();
			break;
		case 1:
			showAddWanInfo();
			break;
		case 2:
			showAddWifi();
			break;
		case 3:
			showAddUserInfo();
			break;
	}
}

function showAddId() {
	currentStep = 0;
	$('.step-container').addClass('mui-hidden');
	$('#id-container').removeClass('mui-hidden');
}

function showAddWanInfo() {
	// 获取别名和唯一标识
	currentStep = 1;
	var onuName = document.querySelector('#onuName').value;
	var onuId = document.querySelector('#onuId').value;

	//TODO 校验
	$('.step-container').addClass('mui-hidden');
	$('#wan-container').removeClass('mui-hidden');

	//	mui.openWindowWithTitle({
	//		id: 'addWanInfo',
	//		url: '../preconfig/addpreconfig_waninfo.html',
	//		extras: {
	//			onuId: onuId,
	//			onuName: onuName
	//		}
	//	}, {
	//		id: "addWanInfo",
	//		height: "44px", //导航栏高度值
	//		backgroundColor: "#009688", //导航栏背景色
	//		bottomBorderColor: "#cccccc", //底部边线颜色
	//		title: { //标题配置
	//			text: "添加预配置", //标题文字
	//			position: { //绘制文本的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
	//				top: 0,
	//				left: 0,
	//				width: "100%",
	//				height: "100%"
	//			},
	//			styles: { //绘制文本样式，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.TextStyles
	//				color: "#FFF",
	//				align: "center",
	//				family: "'Helvetica Neue',Helvetica,sans-serif",
	//				size: "17px",
	//				style: "normal",
	//				weight: "normal",
	//				fontSrc: ""
	//			}
	//		},
	//		back: { //左上角返回箭头
	//			image: { //图片格式
	//				base64Data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII=', //加载图片的Base64编码格式数据 base64Data 和 imgSRC 必须指定一个.否则不显示返回箭头
	//				imgSrc: '', //要加载的图片路径
	//				sprite: { //图片源的绘制区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
	//					top: '0px',
	//					left: '0px',
	//					width: '100%',
	//					height: '100%'
	//				},
	//				position: { //绘制图片的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
	//					top: "10px",
	//					left: "10px",
	//					width: "24px",
	//					height: "24px"
	//				}
	//			}
	//		}
	//	});
}

function showAddWifi() {
	var wanId = document.querySelector('#wanId').value;
	var pppoeName = document.querySelector('#pppoeName').value;
	var pppoePwd = document.querySelector('#pppoePwd').value;

	//TODO 校验
	currentStep = 2;
	$('.step-container').addClass('mui-hidden');
	$('#wifi-container').removeClass('mui-hidden');

	//	mui.openWindowWithTitle({
	//		id: 'addWifi',
	//		url: '../preconfig/addpreconfig_wifi.html',
	//		extras: {
	//			onuName: onuName,
	//			onuId: onuId,
	//			wanId: wanId,
	//			pppoeName: pppoeName,
	//			pppoePwd: pppoePwd
	//		}
	//	}, {
	//		id: "addWifi",
	//		height: "44px", //导航栏高度值
	//		backgroundColor: "#009688", //导航栏背景色
	//		bottomBorderColor: "#cccccc", //底部边线颜色
	//		title: { //标题配置
	//			text: "添加预配置", //标题文字
	//			position: { //绘制文本的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
	//				top: 0,
	//				left: 0,
	//				width: "100%",
	//				height: "100%"
	//			},
	//			styles: { //绘制文本样式，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.TextStyles
	//				color: "#FFF",
	//				align: "center",
	//				family: "'Helvetica Neue',Helvetica,sans-serif",
	//				size: "17px",
	//				style: "normal",
	//				weight: "normal",
	//				fontSrc: ""
	//			}
	//		},
	//		back: { //左上角返回箭头
	//			image: { //图片格式
	//				base64Data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII=', //加载图片的Base64编码格式数据 base64Data 和 imgSRC 必须指定一个.否则不显示返回箭头
	//				imgSrc: '', //要加载的图片路径
	//				sprite: { //图片源的绘制区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
	//					top: '0px',
	//					left: '0px',
	//					width: '100%',
	//					height: '100%'
	//				},
	//				position: { //绘制图片的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
	//					top: "10px",
	//					left: "10px",
	//					width: "24px",
	//					height: "24px"
	//				}
	//			}
	//		}
	//	});
}

function showAddUserInfo() {
	var ssid = document.querySelector('#ssid').value;
	var wifiName = document.querySelector('#wifiName').value;
	var wifiPwd = document.querySelector('#wifiPwd').value;

	//TODO 校验
	currentStep = 3;
	$('.step-container').addClass('mui-hidden');
	$('#userinfo-container').removeClass('mui-hidden');

	//	mui.openWindowWithTitle({
	//		id: 'addUserInfo',
	//		url: '../preconfig/addpreconfig_userinfo.html',
	//		extras: {
	//			onuName: onuName,
	//			onuId: onuId,
	//			wanId: wanId,
	//			pppoeName: pppoeName,
	//			pppoePwd: pppoePwd,
	//			ssid: ssid,
	//			wifiName: wifiName,
	//			wifiPwd: wifiPwd
	//		}
	//	}, {
	//		id: "addUserInfo",
	//		height: "44px", //导航栏高度值
	//		backgroundColor: "#009688", //导航栏背景色
	//		bottomBorderColor: "#cccccc", //底部边线颜色
	//		title: { //标题配置
	//			text: "添加预配置", //标题文字
	//			position: { //绘制文本的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
	//				top: 0,
	//				left: 0,
	//				width: "100%",
	//				height: "100%"
	//			},
	//			styles: { //绘制文本样式，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.TextStyles
	//				color: "#FFF",
	//				align: "center",
	//				family: "'Helvetica Neue',Helvetica,sans-serif",
	//				size: "17px",
	//				style: "normal",
	//				weight: "normal",
	//				fontSrc: ""
	//			}
	//		},
	//		back: { //左上角返回箭头
	//			image: { //图片格式
	//				base64Data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEUAAAAAev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8Aev8AAACubimgAAAAI3RSTlMAGfUTGfQTGPMSGPIYGhgaGBsXGxcbFxwXHBccFhwWHRYdHWufDPQAAAABYktHRACIBR1IAAAAB3RJTUUH4QETEBwooeTlkQAAAJVJREFUSMft1EkSgkAQRNFGUXFWHBDBibr/HTUwD5B/48Ig1y+io7u6MqUhf5hsNEY+j5hMgZ/FJ8Xc9ovos3T96utjbfqN/Nb0O/m96Uv5g+mP8ifTn+Ur01/ka9Nf5RvTt/I309/lH6Z/yr9Mn+Q71/MT8B34K/E58Enzv8R/K98HvnF8p3lr8F7izce7lbf3kJ/lDQp9HdBhgg3PAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDE2OjI4OjQwKzA4OjAwpTDFwQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQxNjoyODo0MCswODowMNRtfX0AAAAASUVORK5CYII=', //加载图片的Base64编码格式数据 base64Data 和 imgSRC 必须指定一个.否则不显示返回箭头
	//				imgSrc: '', //要加载的图片路径
	//				sprite: { //图片源的绘制区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
	//					top: '0px',
	//					left: '0px',
	//					width: '100%',
	//					height: '100%'
	//				},
	//				position: { //绘制图片的目标区域，参考：http://www.html5plus.org/doc/zh_cn/nativeobj.html#plus.nativeObj.Rect
	//					top: "10px",
	//					left: "10px",
	//					width: "24px",
	//					height: "24px"
	//				}
	//			}
	//		}
	//	});
}

function showAddPreConfig() {
	var onuName = document.querySelector('#onuName').value;
	var onuId = document.querySelector('#onuId').value;
	var wanId = document.querySelector('#wanId').value;
	var pppoeName = document.querySelector('#pppoeName').value;
	var pppoePwd = document.querySelector('#pppoePwd').value;
	var ssid = document.querySelector('#ssid').value;
	var wifiName = document.querySelector('#wifiName').value;
	var wifiPwd = document.querySelector('#wifiPwd').value;
	var contact = document.querySelector('#contact').value;
	var phoneNo = document.querySelector('#phoneNo').value;
	var address = document.querySelector('#address').value;

	// 通过校验
	currentStep = 4;

	var accessList = myStorage.getItem('accessList')
	if(!accessList || accessList == 'undefined') {
		accessList = [];
	} else {
		accessList = JSON.parse(accessList);
	}
	accessList.push({
		name: onuName,
		mac: onuId,
		wanId: wanId,
		pppoeName: pppoeName,
		pppoePwd: pppoePwd,
		ssid: ssid,
		wifiName: wifiName,
		wifiPwd: wifiPwd,
		contact: contact,
		phoneNo: phoneNo,
		address: address,
		time: (new Date()).getTime(),
		preconfig: true
	})
	myStorage.setItem('accessList', JSON.stringify(accessList))
	mui.back();
}
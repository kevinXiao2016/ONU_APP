var xhr = null;
var testFlag = 0;
var arr = new Array();
//网络连接状态
function testInternet() {
	mui.ajax('http://www.baidu.com/', {
		dataType: 'text',
		type: 'GET',
		success: function(data) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			document.getElementById('InternetConnect').innerHTML = "已连接";
			nextFn(true);
		},
		error: function(xhr, type, errorThrown) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			document.getElementById('InternetConnect').innerHTML = "未连接";
			nextFn(false);
		}
	})
}
//检测光功率信息;
function testOpts(){
	//光接收功率
	mui.ajax('http://' + '172.17.2.160' + '/goform/onuWebPubForm', {
		dataType: 'text',
		type: 'post',
		timeout: 10000,
		data: {
			mnId: 1,
			pgId: 4,
			fcId:0
		},
		success: function(data) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			data=JSON.parse(data);
			document.getElementById('onuOptical').innerHTML = data.rxPower/100+"dBm";
			nextFn(true);
		},
		error: function(xhr, type, errorThrown) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			document.getElementById('onuOptical').innerHTML = "无法获取信息";
			nextFn(false);
		}
	})
}
//检测WAN口状态;
function testWanPort(){
	//wan口状态
	mui.ajax('http://' + '172.17.2.160' + '/goform/onuWebPubForm', {
		dataType: 'text',
		type: 'post',
		timeout: 10000,
		data: {
			mnId: 1,
			pgId: 1,
			fcId: 1
		},
		success: function(data) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			data=JSON.parse(data);
			if(data[2].ConnectionError==''||data[2].ConnectionError=='ERROR_NONE'){
				document.getElementById('WanState').innerHTML = "PPPoE拨号正常";
				nextFn(true);
			}else{
				document.getElementById('WanState').innerHTML = "PPPoE拨号异常";
				nextFn(false);
			}
		},
		error: function(xhr, type, errorThrown) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			document.getElementById('WanState').innerHTML = "无法获取信息";
			nextFn(false);
		}
	})
}
//检测wifi
function testWifi(){
	//wifi下联设备
	mui.ajax('http://' + '172.17.2.160' + '/goform/onuWebPubForm', {
		dataType: 'text',
		type: 'post',
		timeout: 10000,
		data: {
			mnId: 1,
			pgId: 2,
			fcId: 4
		},
		success: function(data) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			data=JSON.parse(data);
			if(data[0].LeaseNum==0){
				document.getElementById('WifiState').innerHTML = "无设备连接";
				nextFn(false);
			}else{
				document.getElementById('WifiState').innerHTML = data.deviceList.MAC;
				nextFn(true);
			}
		},
		error: function(xhr, type, errorThrown) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			document.getElementById('WifiState').innerHTML = "无法获取信息";
			nextFn(false);
		}
	})
}
function testONUstate() {
	//onu上线情况
	mui.ajax('http://' + '172.17.2.160' + '/goform/onuWebPubForm', {
		dataType: 'text',
		type: 'post',
		timeout: 10000,
		data: {
			mnId: 1,
			pgId: 0,
			fcId: 0
		},
		success: function(data) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			data=JSON.parse(data);
			if(data.onuRegStus==1){
				document.getElementById('onuOnlineState').innerHTML = "上线";
				nextFn(true);
			}else{
				document.getElementById('onuOnlineState').innerHTML = "离线";
				nextFn(false);
			}			
		},
		error: function(xhr, type, errorThrown) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			document.getElementById('onuOnlineState').innerHTML = "离线";
			nextFn(false);
		}
	})
}
//NM3000连接状态
function testNMConnect(){
		var urlAdd=myStorage.getItem("serverAddress");
	    var urlPort=myStorage.getItem("serverPort");
		var loginUrl='http://'+urlAdd+':'+urlPort+'/mobile/login.mb'
		mui.ajax(loginUrl, {
		data: {
			username: 'admin',
			'password': 'adminadmin'
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		success: function(data) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			//alert("NM3000Test");
			if(data.errorCode > 0) {
				document.getElementById('NM3000Connect').innerHTML="无法连接";
				nextFn(false);
			} else {
				document.getElementById('NM3000Connect').innerHTML="已连接";
				nextFn(true);
			}
		},
		error: function(xhr, type, errorThrown) {
			if(bCancelDetect){
				stopDetectEnd();
				return;
			}
			document.getElementById('NM3000Connect').innerHTML="无法连接";
			nextFn(false);
		}
	})
}

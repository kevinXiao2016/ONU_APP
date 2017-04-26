//DOM结构;
var TEMPLATE = {
	oltList : [
		'<li class="mui-table-view-cell mui-media" name="{5}">',
	        '<a href="javascript:;">',
	        	'<h5 class="nm3k-delete-img iconfont icon-delete" name="{0}"></h5>',
	            '<div class="mui-media-body nm3k-list">',
	                '{0}',
	                '<p class="mui-ellipsis"><span class="{1}">{2}</span><span class="mac">{3}</span>{4}</p>',
	            '</div>',
	        '</a>',
	    '</li>'
	],
	oltBaseInfo : [
		'<h5>OLT基本信息</h5>',
		'<div class="nm3k-line">',
		'	<label>设备类型</label>',
		'	<span>{type}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>设备别名</label>',
		'	<span>{alias}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>管理IP</label>',
		'	<span>{ip}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>MAC</label>',
		'	<span>{mac}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>状态</label>',
		'	<span>{status}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>在线时间</label>',
		'	<span>{sysTime}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>软件版本</label>',
		'	<span>{softVersion}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>CPU利用率</label>',
		'	<span>{cpu}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>内存利用率</label>',
		'	<span>{mem}</span>',
		'</div>'
	],
	onulist : [
		'<li class="mui-table-view-cell mui-media">',
	    '    <a href="javascript:;" class="pR100-must">',
	    '       <div class="mui-media-body nm3k-list" name="{onuId}">',
	    '        	{mac}',
	    '        	<p class="mui-ellipsis">{alias}</p>',
	    '           <p class="mui-ellipsis"><span class="online">{status}</span>{type}</p>',
	    '        </div>',
	    '    </a>',
	    '    <div class="right-link">',
		'        <a href="javascript:;">重启</a>',
		'        <a href="javascript:;">删除</a>',
	    '    </div>',
	    '</li>',
	],
	onuBaseInfo : [
		'<h5>ONU基本信息</h5>',
		'<div class="nm3k-line">',
		'	<label>设备类型</label>',
		'	<span>{type}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>设备别名</label>',
		'	<span>{alias}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>管理IP</label>',
		'	<span>{ip}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>MAC</label>',
		'	<span>{mac}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>状态</label>',
		'	<span>{status}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>在线时间</label>',
		'	<span>{sysTime}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>软件版本</label>',
		'	<span>{softVersion}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>设备位置</label>',
		'	<span>{location}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>芯片厂商</label>',
		'	<span>{chipvender}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>芯片类型</label>',
		'	<span>{chipType}</span>',
		'</div>',,
		'<div class="nm3k-line">',
		'	<label>LLID</label>',
		'	<span>{LLID}</span>',
		'</div>',
	],
	onuCabilityInfo: [
		'<h5>ONU能力信息</h5>',
		'<div class="nm3k-line">',
		'	<label>GE端口数</label>',
		'	<span>{GEport}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>FE端口数</label>',
		'	<span>{FEport}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>GE端口号</label>',
		'	<span>{GEportNum}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>FE端口号</label>',
		'	<span>{FEportNum}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>上行对列数</label>',
		'	<span>{uplistNum}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>下行对列数</label>',
		'	<span>{downlistNum}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>上行端口最大对列数</label>',
		'	<span>{uplistNumMax}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>下行端口最大对列数</label>',
		'	<span>{downlistNumMax}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>FEC使能</label>',
		'	<span>{FEC}</span>',
		'</div>'
	],
	optInfo : [
		'<h5>ONU光模块信息</h5>',
		'<div class="nm3k-line">',
		'	<label>偏置电流</label>',
		'	<span>{bias}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>工作电压</label>',
		'	<span>{workingVoltage}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>工作温度</label>',
		'	<span>{tempreture}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>ONU PON接收光功率</label>',
		'	<span>{receivedOpticalPower}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>ONU PON发送光功率</label>',
		'	<span>{tramsmittedOpticalPower}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>OLT PON接收光功率</label>',
		'	<span>{oltReceivedOpticalPower}</span>',
		'</div>',
		'<div class="nm3k-line">',
		'	<label>OLT PON发送光功率</label>',
		'	<span>{oltTramsmittedOpticalPower}</span>',
		'</div>'
	],
	uniPortList : [
		'<div class="nm3k-channel-pannel">',
		'	<h5>UNI {num}</h5>',
		'	<div class="nm3k-line">',
		'		<label>工作状态</label>',
		'		<span>{workStatus}</span>',
		'	</div>',
		'	<div class="nm3k-line">',
		'		<label>PVID</label>',
		'		<span>{pvid}</span>',
		'	</div>',
		'	<div class="nm3k-line">',
		'		<label>VLAN模式</label>',
		'		<span>{vlanMode}</span>',
		'	</div>',
		'</div>'
	]
	
}

// 获取url中的参数
function getUrlParam (name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r!= null) {
        return unescape(r[2]);
     }else{
        return null;
     }
}    
//格式化String;
function fStringFormat(string,args){
	var result = string;
	if (arguments.length > 1) {
		if (arguments.length == 2 && typeof (args) == "object") {
			if(args instanceof Array){
				for (var i = 0; i < args.length ; i++) {
					if (args[i] != undefined) {
						var reg = new RegExp("({[" + i + "]})", "g");
						result = result.replace(reg, args[i]);
					}
				}
			} else {
				for (var key in args) {
					if(args[key]!=undefined){
						var reg = new RegExp("({" + key + "})", "g");
						result = result.replace(reg, args[key]);
					}
				}
			}
		}
		else {
			for (var i = 0; i < arguments.length-1 ; i++) {
				if (arguments[i+1] != undefined) {
					var reg = new RegExp("({[" + i + "]})", "g");
					result = result.replace(reg, arguments[i+1]);
				}
			}
		}
	}
	return result;
};//end stringFormat;


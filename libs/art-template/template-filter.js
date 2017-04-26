/**
 * 对日期进行格式化，
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 * @author yanis.wang
 * @see	http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
 */
template.defaults.imports.dateFormat = function(date, format) {
	if(typeof date === "string") {
		var mts = date.match(/(\/Date\((\d+)\)\/)/);
		if(mts && mts.length >= 3) {
			date = parseInt(mts[2]);
		}
	}
	date = new Date(date);
	if(!date || date.toUTCString() == "Invalid Date") {
		return "";
	}

	var map = {
		"M": date.getMonth() + 1, //月份
		"d": date.getDate(), //日
		"h": date.getHours(), //小时
		"m": date.getMinutes(), //分
		"s": date.getSeconds(), //秒
		"q": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};

	format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
		var v = map[t];
		if(v !== undefined) {
			if(all.length > 1) {
				v = '0' + v;
				v = v.substr(v.length - 2);
			}
			return v;
		} else if(t === 'y') {
			return(date.getFullYear() + '').substr(4 - all.length);
		}
		return all;
	});
	return format;
};

/**
 * 对日期进行只能展示，
 * @param date 要格式化的日期
 *     今天的可展示为上午 10：00 下午1：00
 *     昨天展示为 昨天
 *     本周其他日期展示为 星期几
 *     再往前的时间展示为年-月-日
 * @return String
 * @author fanzidong
 */
template.defaults.imports.intelligentTimeFormat = function(date) {
	if(typeof date === "string") {
		var mts = date.match(/(\/Date\((\d+)\)\/)/);
		if(mts && mts.length >= 3) {
			date = parseInt(mts[2]);
		}
	}
	date = new Date(date);
	if(!date || date.toUTCString() == "Invalid Date") {
		return "";
	}
	
	var weekDays = ['天', '一', '二', '三', '四', '五', '六'];

	var _dateFormat = template.defaults.imports.dateFormat;

	// 获取各个分界点的时间戳
	var now = new Date();
	var todayWeekDay = now.getDay(); // 0代表星期天，1-6代表星期一-星期六
	var todayStart = new Date(Date.parse(_dateFormat(now, 'yyyy-MM-dd')));
	var yesterdayStart = new Date();
	yesterdayStart.setTime(todayStart.getTime() - 24 * 3600 * 1000);
	var weekStart = null;
	if(todayWeekDay == 0) {
		weekStart = new Date(todayStart.getTime() - 6 * 24 * 3600 * 1000);
	} else {
		weekStart = new Date(todayStart.getTime() - (todayWeekDay - 1) * 24 * 3600 * 1000);
	}
	
	if(_dateFormat(date, 'yyyy-MM-dd') === _dateFormat(now, 'yyyy-MM-dd')) {
		// 如果是今天，则显示 10：00 1：00这种格式
		var hour = date.getHours();
		if(hour < 12) {
			return '上午 ' + hour + ':' + date.getMinutes();
		} else if(hour == 12) {
			return '下午 ' + hour + ':' + date.getMinutes();
		} else {
			return '下午 ' + (hour - 12) + ':' + date.getMinutes();
		}
	} else if(yesterdayStart.getTime() <= date.getTime() && date.getTime() < todayStart.getTime()) {
		// 如果是昨天
		return '昨天';
	} else if(weekStart.getTime() <= date.getTime() && date.getTime() < yesterdayStart.getTime()){
		// 如果是本周
		return '星期' + weekDays[date.getDay()];
	} else {
		return _dateFormat(date, 'yyyy-MM-dd');
	}

};
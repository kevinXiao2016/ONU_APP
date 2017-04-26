var Nm3kCir = (function(){
	var nm3kCir = function(obj){
		this.renderTo = obj.renderTo;
		this.templateId = obj.templateId || 'nm3k-cir-dom';
		this.topTxt = obj.topTxt || '';
		this.centerTxt = obj.centerTxt || '';
		this.unit = obj.unit || '';
		this.subTxt = obj.subTxt || '';
	}
	nm3kCir.prototype = {
		init : function(){
			var html = template(this.templateId, {
				topTxt : this.topTxt,
				centerTxt : this.centerTxt,
				unit : this.unit,
				subTxt : this.subTxt
			});
			document.getElementById(this.renderTo).innerHTML = html;
		},
		setTopTxt : function(value){
			var $txt = document.getElementById(this.renderTo).querySelector('.nm3k-dashboard-cir-dashline p');
			$txt.innerText = value;
		},
		setCenterTxt : function(value){
			var $txt = document.getElementById(this.renderTo).querySelector('.nm3k-dashboard-cir-dashline span');
			$txt.firstChild.nodeValue = value;
		},
		setUnit : function(value){
			var $txt = document.getElementById(this.renderTo).querySelector('.nm3k-dashboard-cir-dashline label');
			$txt.innerText = value;
		},
		setBottomTxt : function(value){
			var $txt = document.getElementById(this.renderTo).querySelector('.nm3k-dashboard-gradient p');
			$txt.innerText = value;
		},
		//value必须是1-100代表1%~100%;
		setPercent: function(value){
			var len = 46;
			var percent = Math.ceil(len * value / 100);
			//先移除所有百分比样式;
			var $lines = document.getElementById(this.renderTo).querySelectorAll('.nm3k-cir-line');
			for(var i=0; i<$lines.length; i++){
				$lines[i].classList.remove('cir-selected');
			}
			for(var i=0; i<percent; i++){
				$lines[i].classList.add('cir-selected');
			}
		}
	}
	return nm3kCir;
})();
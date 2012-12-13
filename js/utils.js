$(document).ready(function(){
	
	initFullpageBackground();
	initJSPanel();
});


function initJSPanel(){
	var jsp = $('.jsp');
	if (jsp.length > 0) {
		jsp.jScrollPane({
			verticalDragMinHeight: 30,
			verticalDragMaxHeight: 150,
			verticalGutter: 0
		});
		/*
		setTimeout(function(){
			var _o = $('.jspTrack');
			var n_h = _o.height() - 4;
			_o.height(n_h);
			$('.jspVerticalBar').css('margin','2px 0');
		}, 200);
		*/
	}
}

function initFullpageBackground(){
	var holder = $('#fullpage_image_holder');
	if (holder.length == 1){
		_resizeImageSCut(holder);
		$(window).resize(function(){ 
			_resizeImageSCut(holder);
		});
	}
}
function _resizeImageSCut(imgageHolder) {

	var w=1280, h=800;
	var navWidth = $(window).width();
	var navHeight = $(window).height();
	var navRatio = navWidth / navHeight;

	var mainImage = $('.main_image');
	if (mainImage.width() > 1) w = mainImage.width();
	if (mainImage.height() > 1) h = mainImage.height();
	picRatio = w / h;
	
	if (navRatio > picRatio) {
		var newHeight = (navWidth / w) * h;
		var newWidth = navWidth;
	} else {
		var newHeight = navHeight;
		var newWidth = (navHeight / h) * w;
	}
	
	newTop = 0 - ((newHeight - navHeight) / 2);
	newTop = 0;
	newLeft =  0 - ((newWidth - navWidth) / 2);


	imgageHolder.css({height: navHeight, width: navWidth});
	
	
	$('.main_image').css({height: newHeight, width: newWidth, top: newTop, left: newLeft});
}


// add event to window.onload so they don't overwrite each other. Given func will be executed after content is loaded
function addOnLoadEvent(func){
	if (window.addEventListener){
		window.addEventListener('load', func, false); 
	} else if (window.attachEvent) { 
		window.attachEvent('onload', func);
	}
}

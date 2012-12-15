$(document).ready(function(){
	
	initFullpageBackground();
	initJSPanel();
	initMap();
	initModalbox();
});


function initMap(){
	$('#map').hover(
		function(){
			$('a', this).show();
		},
		function(){
			$('a', this).hide();
		}
	);
}

function initModalbox(){
	jQuery(".openmodalbox").modalBox({
		setStylesOfFadingLayer:  {black : 'background-color:#000; filter:alpha(opacity=80); -moz-opacity:0.8; opacity:0.8;'},
		setWidthOfModalLayer : 680,
		minimalTopSpacing : -8,
		callFunctionAfterShow : function(){
			
		}
	});
}

function initJSPanel(){
	var jsp = $('.jsp');
	if (jsp.length > 0) {
		jsp.jScrollPane({
			verticalDragMinHeight: 30,
			verticalDragMaxHeight: 150,
			verticalGutter: 0
		});
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

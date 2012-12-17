var hp_slide_speed = 250;
$(document).ready(function(){
	
	initFullpageBackground();
	initJSPanel();
	initMap();
	initModalbox();
	initTopNavigator();
	initFooter();
	
	initHPSlide();
	
	addOnLoadEvent(function(){
		showRequestedPopup();
	});
});

function showRequestedPopup(){
	var hash = window.location.hash;
	var url = hash.split('-');

	console.log(url);
	
	var a = $('a[href$='+url+']');
	if (a.length == 1) a.trigger('click');
}

function initTopNavigator(){
	$('#top_navigator ul li ul').hover(
		function(){
			var _p = $(this).parents().get(0);
			$(_p).addClass('hover');
		}, 
		function(){
			var _p = $(this).parents().get(0);
			$(_p).removeClass('hover');	
		}
	);
	$('#top_navigator > ul > li > a.active').next().css('display', 'block');
	
	$('#top_navigator .online_register').click(function(){
		var t;
		var _o = $(this);
		if (_o.hasClass('active')) return;
		else {
			_o.addClass('active');
			var _orw = $('#online_register_wrapper');
			_orw.slideDown('fast');
			
			$(_orw).hover(
				function(){
					clearTimeout(t);
				},
				function(){
					t = setTimeout(function(){
						_orw.fadeOut('fast');
						_o.removeClass('active');
					}, 600);
				}
			);
		}
	});
	
	
}

function initHPSlide(){
	var hp_slide = $('#hp_slideshow');
	if (hp_slide.length == 1) {
		var _li = $('#right_nav li');
		
		var index = 0, hash = window.location.hash;
		if (hash) {
			index = /\d+/.exec(hash)[0];
			index = (parseInt(index) || 1) - 1; // slides are zero-based
			
			_li.removeClass('active');
			$('#right_nav li:nth-child('+parseInt(index+1)+')').addClass('active');
			
			if (index > 0) {
				_hideFooter();
			} else {
				_showFooter();
			}
		}
	

		hp_slide.cycle({
			fx: 'scrollVert',
            timeout: 0,
			speed: hp_slide_speed,
			cleartypeNoBg: true,
			startingSlide: index
		});
		
		
		_li.click(function(e){
			var _o = $(this);
			if (_o.hasClass('active')) return;
			
			// change background if any
			var background = _o.attr('data-bg');

			if (background) {
				var img = $('<img src="'+background+'" class="main_image" />');
				$(img).load(function() {
					$('#fullpage_image_holder .main_image').hide();
					$('#fullpage_image_holder').append(img);
					
					initFullpageBackground();
				});
			} else {
				$('#fullpage_image_holder .main_image').hide();
				$('#fullpage_image_holder .main_image[data-default="1"]').show();
			}
			
			// cycle to requested page
			var index = parseInt(_o.attr('data-index'));
			hp_slide.cycle(index);
			
			$('#right_nav li').removeClass('active');
			_o.addClass('active');
			
			// show/hide footer
			if (index > 0) {
				_hideFooter();
			} else {
				_showFooter();
			}
		});
	}
}
function _hideFooter(){
	$('#show_more_info').show();
	$('#show_less_info').hide();
	
	$('#site_footer').animate({
		'bottom': '-90px'
	}, 200);
}
function _showFooter(){
	$('#show_more_info').hide();
	$('#show_less_info').show();
	
	$('#site_footer').animate({
		'bottom': '0'
	}, 200);
}
function initFooter(){
	// init #show_more_info click
	$('#show_more_info').click(function(e){
		_showFooter();
		
		e.preventDefault();
	});
	
	// init #show_more_info click
	$('#show_less_info').click(function(e){
		_hideFooter();
		
		e.preventDefault();
	});
}

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
	var openmodalbox = $('.openmodalbox');
	if (openmodalbox.length > 0) 
	openmodalbox.modalBox({
		setStylesOfFadingLayer:  {black : 'background-color:#000; filter:alpha(opacity=80); -moz-opacity:0.8; opacity:0.8;'},
		setWidthOfModalLayer : 780,
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
	
	var total_other_news = $('.other_news ul li');
	var other_news = $('.other_news ');
	if (total_other_news.length > 5) {
		other_news.jScrollPane({
			verticalDragMinHeight: 30,
			verticalDragMaxHeight: 150,
			verticalGutter: 0
		});
		
		setTimeout(function(){
			var _o = $('.jspTrack');
			var h = _o.height();
			_o.css({
				'height': parseInt(h-2)+'px',
				'margin-top': '2px'
			});
		}, 200);
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
function _realWidth(obj){
    var clone = obj.clone();
    clone.css("visibility","hidden");
    $('body').append(clone);
    var width = clone.outerWidth();
    clone.remove();
    return width;
}
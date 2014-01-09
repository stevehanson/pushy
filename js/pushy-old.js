/*! Pushy - v0.9.1 - 2013-9-16
* Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.
* https://github.com/christophery/pushy/
* by Christopher Yee */

$(function() {
	var pushy = $('.pushy-left'), //menu css class
		pushyRight = $('.pushy-right'), //menu css class
		body = $('body'),
		container = $('#container'), //container css class
		push = $('.push'), //css class to add pushy capability
		siteOverlay = $('.site-overlay'), //site overlay
		pushyClass = "pushy-open", //menu position & menu open class
		pushyActiveClass = "pushy-active", //css class to toggle site overlay
		containerClass = "container-push", //container open class
		pushClass = "push-push", //css class to add pushy capability
		menuBtn = $('.menu-btn, .pushy a'), //css classes to toggle the menu
		menuBtnRight = $('.menu-btn-right, .pushy-right a'), //css classes to toggle the menu
		menuSpeed = 200, //jQuery fallback menu speed
		menuWidth = pushy.width() + "px"; //jQuery fallback menu width
		menuRightWidth = pushyRight.width() + "px"; //jQuery fallback menu width

	function togglePushy(){
		body.toggleClass(pushyActiveClass); //toggle site overlay
		pushy.toggleClass(pushyClass);
		container.toggleClass(containerClass);
		push.toggleClass(pushClass); //css class to add pushy capability
	}

	function togglePushyRight(){
		//body.toggleClass(pushyActiveClass); //toggle site overlay
		pushyRight.toggleClass(pushyClass);
		//container.toggleClass(containerClass);
		//push.toggleClass(pushClass); //css class to add pushy capability
	}

	function openPushyFallback(){
		body.addClass(pushyActiveClass);
		pushy.animate({left: "0px"}, menuSpeed);
		pushy.addClass(pushyClass);
		container.animate({left: menuWidth}, menuSpeed);
		push.animate({left: menuWidth}, menuSpeed); //css class to add pushy capability
	}

	function closePushyFallback(){
		body.removeClass(pushyActiveClass);
		pushy.animate({left: "-" + menuWidth}, menuSpeed);
		pushy.removeClass(pushyClass);
		container.animate({left: "0px"}, menuSpeed);
		push.animate({left: "0px"}, menuSpeed); //css class to add pushy capability
	}

	function openPushyRightFallback(){
		//body.addClass(pushyActiveClass);
		pushyRight.animate({right: "0px"}, menuSpeed);
		pushyRight.addClass(pushyClass);
		//container.animate({left: menuWidth}, menuSpeed);
		//push.animate({left: menuWidth}, menuSpeed); //css class to add pushy capability
	}

	function closePushyRightFallback(){
		//body.removeClass(pushyActiveClass);
		pushyRight.animate({right: "-" + menuRightWidth}, menuSpeed);
		pushyRight.removeClass(pushyClass);
		//container.animate({left: "0px"}, menuSpeed);
		//push.animate({left: "0px"}, menuSpeed); //css class to add pushy capability
	}


	function isOpen(pushyElem) {
		return pushyElem.hasClass('pushy-open');
	}


	if(Modernizr.csstransforms3d){
		//toggle menu
		menuBtn.click(function() {
			togglePushy();
		});

		menuBtnRight.click(function() {
			togglePushyRight();
		});

		//close menu when clicking site overlay
		siteOverlay.click(function(){ 
			if(isOpen(pushy))
				togglePushy();
			if(isOpen(pushyRight))
				togglePushyRight();
		});

	}else{
		//jQuery fallback
		pushy.css({left: "-" + menuWidth}); //hide menu by default
		pushyRight.css({right: '-' + menuRightWidth});
		container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

		//toggle menu
		menuBtn.click(function() {
			if (!isOpen(pushy)) {
				openPushyFallback();
			} else {
				closePushyFallback();
			}
		});

		//toggle menu
		menuBtnRight.click(function() {
			if (!isOpen(pushyRight)) {
				openPushyRightFallback();
			} else {
				closePushyRightFallback();
			}
		});

		//close menu when clicking site overlay
		siteOverlay.click(function(){ 
			if (!isOpen(pushy)) {
				openPushyFallback();
			} else {
				closePushyFallback();
			}
		});
	}
});
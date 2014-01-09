/*
 * jQuery Pushy plugin
 * Original author:
 * Modified By: Steve Hanson (@stephenhanson)
 */
;(function ($, window, document, undefined) {
    

    // Create the defaults once
    var pluginName = 'pushy',
        defaults = {
            propertyName: 'value',
            position: 'left',
            pushyClass: "pushy-open", //menu position & menu open class
            pushyActiveClass: "pushy-active", //css class to toggle site overlay
            containerClass: "container-push", //container open class
            pushClass: "push-push" //css class to add pushy capability
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.pushy = $(element);
        this.id = this.pushy.attr('id');

        this.options = $.extend( {}, defaults, options);
        
        this.menuWidth = (this.pushy.attr('data-pushy-width')) ? this.pushy.attr('data-pushy-width') : this.options.width;
        this.menuWidth = (this.menuWidth) ? this.menuWidth : this.pushy.width() + 'px';
        
        this.position = (this.pushy.hasClass('pushy-left')) ? 'left' : 'right';
        this.position =  (this.position) ? this.position : this.options.position;

        this._name = pluginName;
        this._defaults = defaults;
        this.toggleBtn = $('.menu-btn[data-for="'+this.id+'"]');
        this.container = $('#container'); //container css class
        this.push = $('.push'); //css class to add pushy capability
        this.siteOverlay = $('.site-overlay'); //site overlay
        
        this.menuSpeed = 200; //jQuery fallback menu speed
        //this.menuWidth = this.pushy.width() + "px"; //jQuery fallback menu width

        this.init();
    }

 
    Plugin.prototype.init = function () {
        var t = this;
        var pushy = t.pushy;

        console.log(pushy);

        if(Modernizr.csstransforms3d){

            //toggle menu
            t.toggleBtn.click(function() {
                log('clicked ' + t.id);
                t.togglePushy();
            });

            //close menu when clicking site overlay
            this.siteOverlay.click(function(){
                if(t.isOpen(pushy))
                    t.togglePushy();
            });

        } else{

            //jQuery fallback
            pushy.css({left: "-" + menuWidth}); //hide menu by default
            t.container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

            //toggle menu
            t.toggleBtn.click(function() {
                if (!t.isOpen(pushy)) {
                    openPushyFallback();
                } else {
                    closePushyFallback();
                }
            });


            //close menu when clicking site overlay
            t.siteOverlay.click(function(){
                if (!t.isOpen(pushy)) {
                    t.openPushyFallback();
                } else {
                    t.closePushyFallback();
                }
            });
        }

        
        
    };

    Plugin.prototype.togglePushy = function(){
        this.pushy.toggleClass(this.options.pushyClass);
        if(this.position === 'left') {
            $('body').toggleClass(this.options.pushyActiveClass); //toggle site overlay
            this.container.toggleClass(this.options.containerClass);
            this.push.toggleClass(this.options.pushClass); //css class to add pushy capability
        }
    };


    Plugin.prototype.isOpen = function() {
        return this.pushy.hasClass('pushy-open');
    };

    Plugin.prototype.openPushyFallback = function(){
        $('body').addClass(this.pushyActiveClass);
        this.pushy.animate({left: "0px"}, this.menuSpeed);
        this.pushy.addClass(this.options.pushyClass);
        this.container.animate({left: this.menuWidth}, this.menuSpeed);
        this.push.animate({left: this.menuWidth}, this.menuSpeed); //css class to add pushy capability
    };

    Plugin.prototype.closePushyFallback = function(){
        $('body').removeClass(this.options.pushyActiveClass);
        this.pushy.animate({left: "-" + this.menuWidth}, this.menuSpeed);
        this.pushy.removeClass(this.options.pushyClass);
        this.container.animate({left: "0px"}, this.menuSpeed);
        this.push.animate({left: "0px"}, this.menuSpeed); //css class to add pushy capability
    };


    
    $.fn[pluginName] = function ( options, arg1 ) {

        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    };

    /* Auto initialize Pushy */
    $('.pushy-auto').each(function() {
        $(this).pushy();
    });
    
    function log(msg) {
        if(console && console !== undefined) {
            console.log(msg);
        }
    }

})( jQuery, window, document );

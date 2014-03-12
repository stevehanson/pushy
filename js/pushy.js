/*
 * jQuery Pushy plugin 0.9.2 - https://github.com/stevehanson/pushy
 * Forked from: https://github.com/christophery/pushy
 * Modified By: Steve Hanson (@stephenhanson)
 *
 */
;(function ($, window, document, undefined) {
    

    // Create the defaults once
    var pluginName = 'pushy',
        defaults = {
            propertyName: 'value',
            position: 'left',
            overlay: true, // display overlay when active
            moveContainer: true, // move the container over when menu open
            pushyClass: "pushy-open", //menu position & menu open class
            pushyActiveClass: "pushy-active", //css class to toggle site overlay
            containerClass: "container-push", //container open class
        };
        
    
    function translateX($el, amt) {
        $el.css({
            '-webkit-transform': 'translateX('+amt+')',
            '-moz-transform': 'translateX('+amt+')',
            '-ms-transform': 'translateX('+amt+')',
            '-o-transform': 'translateX('+amt+')',
            'transform': 'translateX('+amt+')'
        });
    }

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.pushy = $(element);
        this.id = this.pushy.attr('id');

        this.options = $.extend( {}, defaults, options);
        
        this.menuWidth = (this.pushy.attr('data-pushy-width')) ? this.pushy.attr('data-pushy-width') : this.options.width;
        this.menuWidth = (this.menuWidth) ? this.menuWidth : this.pushy.width() + 'px';
        this.pushy.css('width', this.menuWidth);
        
        this.position = (this.pushy.hasClass('pushy-left')) ? 'left' : 'right';
        this.position =  (this.position) ? this.position : this.options.position;

        this._name = pluginName;
        this._defaults = defaults;
        this.toggleBtn = $('[data-pushy-for="'+this.id+'"]');
        this.container = $('#container'); //container css class
        this.siteOverlay = $('.site-overlay'); //site overlay
        this.menuSpeed = 200; //jQuery fallback menu speed

        this.init();
    }

 
    Plugin.prototype.init = function () {
        var t = this;
        var pushy = t.pushy;

        if(Modernizr.csstransforms){

            // initially hide the pushy
            if(this.position == 'left'){
                translateX(this.pushy, '-'+this.menuWidth);
            } else { // right
                translateX(this.pushy, this.menuWidth);
            }

            // the pushy menu is display:none in the css. The above code is translating
            // the menu off the screen, but takes time, since it is an animation. Wait
            // until translation is done and then "unhide" the pushy so that it can just
            // be translated on/off the screen to show/hide in the future
            setTimeout(function() {
                t.pushy.show(); // is initially display:none so no blip before above js    
            }, 200);
            
            
            //toggle menu
            t.toggleBtn.click(function() {
                t.togglePushy();
            });

            //close menu when clicking site overlay
            this.siteOverlay.click(function(){
                if(t.isOpen(pushy))
                    t.togglePushy();
            });

        } else{ //jQuery fallback
            
            if(t.position == 'left') {
                pushy.css({left: "-" + t.menuWidth}); //hide menu by default  
            } else {
                pushy.css({right: "-" + t.menuWidth}); //hide menu by default    
            }
            
            pushy.show(); // is initially display:none so no blip before above js
            
            t.container.css({"overflow-x": "hidden"}); //fixes IE scrollbar issue

            //toggle menu
            t.toggleBtn.click(function() {
                if (!t.isOpen(pushy)) {
                    t.openPushyFallback();
                } else {
                    t.closePushyFallback();
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
        if(!this.isOpen()) {
            if(this.options.onOpen) {
                this.options.onOpen();
            }
        } else { // closing
            if(this.options.onClose) {
                this.options.onClose();
            }
        }
        
        if(this.isOpen()) { // close pushy
            var pushyTranslate = (this.position=='left') ? '-'+this.menuWidth : this.menuWidth;
            translateX(this.pushy, pushyTranslate);
            translateX(this.container, '0');
            
            if(this.options.overlay) {
                this.siteOverlay.fadeOut(100);
            }
            
        } else { // closed, open it
            
            translateX(this.pushy, 0); // open pushy
            if(this.options.moveContainer) {
                var containerTranslate = (this.position=='left') ? this.menuWidth : '-'+this.menuWidth;
                translateX(this.container, containerTranslate);
            }
            
            if(this.options.overlay) {
                this.siteOverlay.fadeIn(100);
            }
            
        }
            
        
        this.pushy.toggleClass(this.options.pushyClass);
        
        if(this.options.overlay) {
            $('body').toggleClass(this.options.pushyActiveClass); // toggle site overlay over entire page
        }
    };


    Plugin.prototype.isOpen = function() {
        return this.pushy.hasClass('pushy-open');
    };

    Plugin.prototype.openPushyFallback = function(){
        this.pushy.addClass(this.options.pushyClass);
        if(this.options.onOpen) {
            this.options.onOpen();
        }
        if(this.position == 'left') {
            this.pushy.animate({left: "0px"}, this.menuSpeed); // move pushy
        } else {
            this.pushy.animate({right: "0"}, this.menuSpeed);
        }
        if(this.options.overlay) {
            this.siteOverlay.fadeIn(100); // move overlay
        }
        if(this.options.moveContainer) {
            this.container.animate({left: this.menuWidth}, this.menuSpeed); // move container
        }
    };

    Plugin.prototype.closePushyFallback = function(){
        this.pushy.removeClass(this.options.pushyClass);
        if(this.options.onClose) {
            this.options.onClose();
        }
        if(this.position == 'left') {
            this.pushy.animate({left: "-" + this.menuWidth}, this.menuSpeed);
            if(this.options.moveContainer) {
                this.container.animate({left: "0px"}, this.menuSpeed); // move container
            }
        } else {
            this.pushy.animate({right: "-" + this.menuWidth}, this.menuSpeed);
            if(this.options.moveContainer) {
                this.container.animate({right: "0px"}, this.menuSpeed); // move container
            }
        }
        if(this.options.overlay) {
            this.siteOverlay.fadeOut(100); // move overlay
        }
    };


    
    $.fn[pluginName] = function ( options, arg1 ) {
        return this.each(function () {
            if (!$(this).data('plugin_' + pluginName)) {
                $(this).data('plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

    /* Auto initialize Pushy */
    $(document).ready(function() {
        $('.pushy-auto').each(function() {
            $(this).pushy();
        });
    });
    
    
    function log(msg) {
        if(console && console !== undefined) {
            console.log(msg);
        }
    }

})( jQuery, window, document );

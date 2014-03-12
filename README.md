#Pushy

Pushy is a responsive off-canvas navigation menu using CSS transforms & transitions.

This is a fork, modified by [@stephenhanson]((http://www.twitter.com/stephenhanson).

##Features

- Uses CSS transforms & transitions.
- Smooth performance on mobile devices.
- jQuery animation fallback for IE 7 - 9.
- Menu closes when a link is selected.
- Menu closes when the site overlay is selected.
- It's responsive!

##Requirements

- jQuery 1.9+
- Modernizr

##Usage

1. Include jQuery & Modernizr.

2. Add the stylesheet (pushy.css) in your head and the JS (pushy.min.js) file in your footer.

**Configuration without Javascript**

```html
<!-- Pushy Menu -->
<nav id="pushyLeft" class="pushy pushy-left pushy-auto">
    <ul>
        <li><a href="#">Item 1</a></li>
        <li><a href="#">Item 2</a></li>
    </ul>
</nav>

<!-- Right Pushy Menu -->
<nav id="pushyRight" class="pushy pushy-right pushy-auto" data-pushy-width="500px">
    <ul>
        <li><a href="#">Item 1</a></li>
        <li><a href="#">Item 2</a></li>
    </ul>
</nav>

<!-- Site Overlay -->
<div class="site-overlay"></div>

<!-- Your Content -->
<div id="container">
    <!-- Menu Button -->
    <div class="menu-btn" data-pushy-for="pushyLeft">&#9776; Menu</div>
    <div class="menu-btn" data-pushy-for="pushyRight">&#9776; Right Menu</div>
</div>
```

**Configuration with Javascript**

```html
<!-- Pushy Menu -->
<nav id="pushyLeft" class="pushy pushy-left">
    <ul>
        <li><a href="#">Item 1</a></li>
        <li><a href="#">Item 2</a></li>
    </ul>
</nav>

<!-- Right Pushy Menu -->
<nav id="pushyRight" class="pushy pushy-right">
    <ul>
        <li><a href="#">Item 1</a></li>
        <li><a href="#">Item 2</a></li>
    </ul>
</nav>

<!-- Site Overlay -->
<div class="site-overlay"></div>

<!-- Your Content -->
<div id="container">
    <!-- Menu Button -->
    <div class="menu-btn" data-pushy-for="pushyLeft">&#9776; Menu</div>
    <div class="menu-btn" data-pushy-for="pushyRight">&#9776; Right Menu</div>
</div>

<script>
    $('#pushyLeft').pushy();
    $('#pushyRight').pushy({
        position: 'right',
        width: '500px'
    });

</script>
```


##Modernizr

Pushy uses Modernizr to detect & test for ```CSS Transforms``` support in the browser. Be sure to include this test if you are using the [Modernizr build tool](http://modernizr.com/download/#-csstransforms3d-shiv-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes-load). TODO: could there be an easier way to check for transforms than using Modernizr?


##Tips

- Use the ```.push``` CSS class on HTML elements outside of the ```#container```.

```html
<header class="push">
    <h1>This is a Heading</h1>
    <h2>This is a subheading</h2>
</header>

<!-- Your Content -->
<div id="container"></div>
```

- Add the following to hide horizontal scroll bars when menu is open, disable the webkit tap highlight and fix the focus scrolling in Safari.


```css
html, body{
	overflow-x: hidden; /* prevents horizontal scroll bars */
	-webkit-tap-highlight-color: rgba(0,0,0,0); /* disable webkit tap highlight */
	height: 100%; /* fixes focus scrolling in Safari (OS X) */
}
```

- If you change the width of the ```.pushy``` menu, be sure to update the values in the ```.pushy-left```and ```.container-push, .push-push``` CSS classes.

```css

.pushy{
    width: 400px; /* Changed the width to 400px */
}

.pushy-left{
    transform: translate3d(-400px,0,0); /* Updated the values */
    /* Don't forget the vendor prefixes */
}

.container-push, .push-push{
    transform: translate3d(400px,0,0); /* Updated the values */
    /* Don't forget the vendor prefixes */
}
```

##Browser Compatibility

| Desktop       | Mobile                                     |
| ------------- | -------------------------------------------|
| IE 7-10       | Chrome (Android 4.2.2)                     |
| Chrome        | Android Browser (Android 4.2.2)            |
| Firefox       | Safari (iOS 6-7)                           |
| Safari (Mac)  | Internet Explorer Mobile (Windows Phone 8) |

##Version History

0.9.2 (FORKED)

- Forked form main Pushy repo
- Converted Pushy to jQuery plugin pattern (from module pattern)
- Support for multiple Pushys on a page
- Added configuration parameters for width, position, overlay movement
- Added automatic initialization with class "pushy-auto"

0.9.1

- Added support for more menu items (with scroll bar).
- Added the .push CSS class. This adds pushy support to additional HTML elements outside of the container div.
- Fixed menu transition.
- Tested in iOS 7.
- Updated the demo file.

0.9.0

- Added a site overlay when Pushy is toggled
- Fixed horizonal scroll bar issue on mobile devices
- Disabled webkit tap highlight
- Rejiggered the JS file
- Updated to jQuery 1.10.1
- Updated the demo file

0.8.4

- Fixed performance issue with mobile devices
- Updated to jQuery 1.10
- Updated the demo file
- Updated the read me

##Thanks to

- [HTML5 Boilerplate](http://html5boilerplate.com/)
- [jQuery](http://jquery.com/)
- [Modernizr](http://modernizr.com/)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/christophery/pushy/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

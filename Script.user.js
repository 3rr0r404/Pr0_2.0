// ==UserScript==
// @name        Pr0gramm.com by Error404 hat Verbesserungsauftrag
// @namespace   https://github.com/3rr0r404/Pr0_2.0
// @author		Error404
// @description Improve das Pr0gramm 2.0 Wörk Wörk
// @include     http://pr0gramm.com/*
// @version     2.4
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js
// @updateURL   https://github.com/3rr0r404/Pr0_2.0/raw/master/Script.user.js
// ==/UserScript==

(function() {
    
    var monitorWidth = $(window).width(),        
        monitorHeight = $(window).height(),
        itemViewportWidth,
        itemViewportHeight,    
        spacepressed = false,
        wheelLast = 0,
        offset = 0,
        commentboxwidth = 300;
    
    //Headerbar recoloring
    $('#head').css( 'background-color', '#161618' );
    $('#head-content').css( 'background-color', '#161618' );
    
    /****/// CSS und Kommentarbox links
    
    
    var css = '#upload-form input[type="submit"] { position:relative; top: 290px; left: 350px; }'+
        '.tags { padding-left:3px; } div.item-tags { padding: 4px 0 8px 10% !important;} div.tagsinput { position:absolute; } input[value="Tags speichern"],input[value="Abbrechen"] { float:right; }'+
        '.comments-large-rectangle { height:auto; position:px; width:280px; right:0;top:0; position:relative; } .comments-large-rectangle > a > img { width: 280px; } #footer-links {z-index:200;} div.item-tags { padding: 4px 0 8px 20%;} div.item-info { text-align:center;} #zahlbreite { color: #FFFFFF; margin: 27px 0 0 15px; float: left;} div.stream-row { clear:right; }'+
        '.ui-widget-content {border: 1px solid #AAAAAA;color: #222222;}'+
        '.ui-slider { position: relative; text-align: left;}'+
        '.ui-slider-horizontal { height: 0.8em;}'+
        'div.item-comments { max-width: 300px;}'+
        '.ui-corner-all {  border-radius: 4px;}'+
        '.ui-slider-horizontal .ui-slider-range { height: 100%; top: 0;}'+
        '.ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default {'+
        'background: #E6E6E6; border: 1px solid #D3D3D3; color: #555555; font-weight: normal;}'+
        '.ui-slider-horizontal .ui-slider-handle { margin-left: -0.6em; top: -0.3em;}'+
        '.ui-slider .ui-slider-handle { cursor: default; height: 1.2em; position: absolute; width: 1.2em; z-index: 2;}'+
        '#slider { float: left; clear: left; width: 300px; margin: 30px 15px 5px; }#slider .ui-slider-range { background: #EE4D2E; } #slider .ui-slider-handle { border-color: #EE4D2E; }'+
        '@media screen and (max-width:1400px){ div#head {margin: 0 0 0 305px !important;} div#page {margin: 0 0 0 305px !important;} .item-comments {width: 300px;} #stream-next, #stream-prev { z-index:-1 !important; }} #head { z-index:200; } #stream-next, #stream-prev { z-index:0; } .item-image{max-height:460px;} .item-comments {\n  position: fixed !important;\n  top: 0px !important;\n  left: 0;\n \n  width: 300px;\n  height: 100vh;\n overflow-y: auto;\n  overflow-x: hidden;\n}\n \n.item-comments textarea.comment {\n  resize: none;\n}\n \ndiv.comment-box > div.comment-box {\n    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.1);\n    padding: 0 0 0 6px;\n}'+
        '::-webkit-scrollbar { width: 10px;} ::-webkit-scrollbar-track { -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.3); -webkit-border-radius: 7px; border-radius: 7px;}'+ 
        '::-webkit-scrollbar-thumb { border-radius: 7px; -webkit-border-radius: 7px; background: #949494; -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.5); }';
    
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node);
        } else {
            document.documentElement.appendChild(node);
        }
    }
    
    function update(e) {
        
        if(spacepressed) {
            zoom(true);
        }
        
        // nur wenn Bild offen
        if ($("div.item-container").length) {
            
            //$('.item-container').hide();
            $('.item-container').fadeIn();
            $(".item-container").attr( 'id', 'bild' );
            
            var pageElementpositionX = 0,        
                pageElementpositionY = 0,
                pageElement = document.getElementById('bild');
            pageElementpositionX += pageElement.offsetLeft;        
            pageElementpositionY += pageElement.offsetTop;
            //alert($(window).height());           
            if (spacepressed){
                window.scrollTo(pageElementpositionX, pageElementpositionY);
            } else {
                window.scrollTo(pageElementpositionX, pageElementpositionY-130);
            }
        }
    }
    
    
    setInterval(function() {
        
        if ($('.item-image').length) {
            
            if (document.getElementsByTagName("video").length){
                if($('.item-image').width()==itemViewportWidth){
                    zoom(true);
                }
            }
            
            if (!$('.item-fullsize-link').length) {
                var imgu = document.getElementsByClassName('item-image')[0];
                if (imgu.naturalHeight > 460) {
                    var link = imgu.getAttribute('src');
                    $('.item-image-wrapper').append('<a class="item-fullsize-link" target="_blank" href="'+link+'" style="">+</a>');
                }
            }
            var stil = document.getElementsByTagName('html')[0];
            stil.style.overflow='hidden';
            
            $(".item-container").attr( 'id', 'bild' );
            var positionX = 0,        
                positionY = 0;
            var pageElement = document.getElementById('bild');
            positionX += pageElement.offsetLeft;        
            positionY += pageElement.offsetTop;
            //alert($(window).height());  
            //falls zoomed soll keine bildreihe am oberen rand gezeigt werden
            if (spacepressed){
                window.scrollTo(positionX, positionY);
            } else {
                window.scrollTo(positionX, positionY-130);
            }
        }else{
            var stil = document.getElementsByTagName('html')[0];
            stil.style.overflow='visible';
            zoomremove();
        }
    }, 200);
    
    $('#stream-next').click(function() {
        update();
    });
    $('#stream-prev').click(function() {
        update();
    });    
    
    //Immer ausführen nach Höhe/Breite-zoom
    //Hier wird anhand der aktuellen Monitorbreite der gesamte Container (Tags+Bild) angepasst
    function zoomfinally() {
        
        $(".item-container").css( 'position', 'absolute');
        $(".item-container").css( 'top', offset );
        $(".item-container").css( 'height', (itemViewportHeight+150)+'px' );
        $(".item-container").css( 'width', itemViewportWidth+'px' );
        $(".item-image").css( 'max-height', '100%' );
        $("div#page").css( 'margin', '0 305px');
        $("div#head").css( 'width', itemViewportWidth+10+'px'); //+10 da spacing von viewport nicht relevant
        $("div#head").css( 'margin', '0 0 0 300px');
        $("div#head-content").css( 'margin', 'auto');
        $("div#head-content").css( 'width', '788px'); 
        $("#stream-prev").css( 'visibility', 'hidden' );
        $("#stream-next").css( 'visibility', 'hidden' );
        $(".item-pointer").css( 'visibility', 'hidden' );
        $(".video-position-bar").css( 'width', $('.item-image').width()+'px');
        
        spacepressed = true;
    }
    
    // Falls Bild mehr Höhe hat als Monitor
    function zoomH() {
        $(".item-image").css( 'height', itemViewportHeight+'px' );
        $(".item-image").css( 'width', 'auto' );
        zoomfinally();
    }
    
    // Falls Bild mehr Breite hat als Monitor
    function zoomB() {
        $(".item-image").css( 'width', itemViewportWidth+'px' );
        $(".item-image").css( 'height', 'auto' );
        zoomfinally();
    }
    
    // Zoom entfernen :P
    function zoomremove() {
        $(".item-container").css( 'position', 'static' );
        $(".item-container").css( 'height', 'auto' );
        $(".item-container").css( 'width', 'auto' );
        $(".item-image").css( 'max-height', '460px' );
        $(".item-image").css( 'width', 'auto' );
        $(".item-image").css( 'height', 'auto' );
        $("#stream-prev").css( 'visibility', 'visible' );
        $("#stream-next").css( 'visibility', 'visible' );
        $(".item-pointer").css( 'visibility', 'visible' );
        $("div#page").css( 'margin', '0 auto');
        $("div#head").css( 'width', '788px'); 
        $("div#head").css( 'margin', '0 auto');
        $(".video-position-bar").css( 'width', $('.item-image').width()+'px');
        
        spacepressed = false;
    }
    
    // Funktion um Zoom zu initieren, wird entschieden ob hinzoomen/wegzoomen, sowie ob Breite/Höhe das Limit sind
    function zoom(resized) {
        
        if ($("div.item-container").length) {
            
            if(!spacepressed || resized){
                
                // Prüfen ob eine ausreichende Bildschirmbreite vorhanden ist
                if ($(window).width() < 1100) {
                    alert('Der Zoom macht unter einer Bildschirmbreite von 1100 Pixeln keinen Sinn!');
                } else {
                    
                    //Breite für die Kommentarbox und Spacing abziehen
                    //Kommentarbox ist 300px breit, Spacing jeweils 2x5px
                    itemViewportWidth = monitorWidth -310; 
                    
                    //-180 für die Leiste oben und die Tags unten
                    itemViewportHeight = monitorHeight -180;
                    
                    //Daten von dem Bild abrufen
                    var pictureWidth = $('.item-image').width(),
                        pictureHeight = $('.item-image').height();
                    
                    offset = $(".item-container").offset().top;
                    
                    if ((itemViewportWidth/itemViewportHeight) > (pictureWidth/pictureHeight)) {
                        zoomH();      
                    } else {
                        zoomB();
                    }
                    
                }
            }else{
                zoomremove();
            }    
        }
    }
    
    //Funktion welche ausgeführt wird wenn Taste gedrückt wird
    function keydown(event) {
        
        //Falls a,d,arrow up, arrow down gedrückt
        if (event.keyCode == '37' || event.keyCode == '39' || event.keyCode == '65' || event.keyCode == '68') {
            update();
            return;
            
            // Falls Space gedrückt
        }else if (event.keyCode == '32') {
            
            // falls textarea aktiv
            var el = document.activeElement;
            if (el && (el.tagName.toLowerCase() == 'input' && el.type == 'text' || el.tagName.toLowerCase() == 'textarea')) {
                return;
            }
            
            // Bild mit Space vergrößern
            if ($('.item-image').length !== 0) {
                if ($(window).width() < 1100) {
                    alert('Der Zoom funktioniert erst ab 1100 Pixeln Bildschirmbreite!');
                    event.preventDefault();
                    event.stopPropagation();
                }
                zoom();
                event.preventDefault();
                event.stopPropagation();
            }
        }
            } 
    
    // Event-Listener falls eine Taste gedrückt wird
    document.addEventListener("keydown", keydown, false);
    
    function isHover(e) {
        if (!e) return false;
        return (e.parentElement.querySelector(':hover') === e);
    }
    
    
    //Funktion welche ausgeführt wird wenn Mausrad gedreht wird
    function handleWheel(event) {
        
        if ($("div.item-container").length) {
            var coms = document.getElementsByClassName("item-comments");
            if (coms.length != 1 || isHover(coms[0])) {
                return;
            }
            
            event.preventDefault();
            event.stopPropagation();
            event.returnValue=false;
            
            var wheelWait = 200;
            var time = (new Date()).getTime();
            var msec = time - wheelLast;
            wheelLast = time;
            if (msec < wheelWait) {
                return;
            }
            
            var delta = 0;
            if (!event)
                event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta/120;
            } else if (event.detail) {
                delta = -event.detail/3;
            }
                
                if(delta<0){
                    $('#stream-next').click();
                }else{
                    $('#stream-prev').click();
                }
            update();
            
        }
    }
    
    // Event-Listener falls Mausrad gedreht wird
    // Firefox
    document.addEventListener("DOMMouseScroll", handleWheel, false);
    // IE9, Chrome, Safari, Opera
    document.addEventListener("mousewheel", handleWheel, false);
    // IE 6/7/8
    if(!document.addEventListener) {
        document.attachEvent("onmousewheel", handleWheel);
    }  
    
    function doSomething() {
        monitorWidth = $(window).width();      
        monitorHeight = $(window).height();
        if(spacepressed){
            zoom(true);
        }
    }
    
    //Listener falls Browsergröße verändert wird
    var resizeTimeout = false;
    window.addEventListener("resize", function(){
        if(resizeTimeout !== false)
            clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(doSomething, 100);
    });
    
})();

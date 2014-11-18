// ==UserScript==
// @name        Pr0gramm.com by Error404 hat Verbesserungsauftrag
// @namespace   https://github.com/3rr0r404/Pr0_2.0
// @author		Error404
// @description Improve das Pr0gramm 2.0 Wörk Wörk
// @include     http://pr0gramm.com/*
// @version     2.3.3
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js
// @updateURL   https://github.com/3rr0r404/Pr0_2.0/raw/master/Script.user.js
// ==/UserScript==

(function() {
    
    var monitorWidth = 0,        
        monitorHeight = 0,
    	spacepressed = false,
     	wheelLast = 0,
        offset = 0,
    	design = '1',
        commentboxwidth = 300;
    
    //Headerbar recoloring
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
        '@media screen and (max-width:1400px){ div#head {margin: 0 0 0 25% !important;} div#page {margin: 0 0 0 25% !important;} .item-comments {width: 24% !important;}} #head { z-index:200; } #stream-next, #stream-prev { z-index:122; } .item-image{max-height:460px;} .item-comments {\n  position: fixed !important;\n  top: 0;\n  left: 0;\n \n  width: 300px;\n  height: 100vh;\n  max-height: 100vh;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n \n.item-comments textarea.comment {\n  resize: none;\n}\n \ndiv.comment-box > div.comment-box {\n    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.1);\n    padding: 0 0 0 6px;\n}';
    
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
            zoomremove();
            // spacepressed=false;
            zoom();
        }
        
        // nur in Uploads
        if ($("div.item-container").length) {
            
            //$('.item-container').hide();
            $('.item-container').fadeIn();
            $(".item-container").attr( 'id', 'bild' );
            
            var positionX = 0,        
                positionY = 0;
            var pageElement = document.getElementById('bild');
            positionX += pageElement.offsetLeft;        
            positionY += pageElement.offsetTop;
            //alert($(window).height());           
            if (spacepressed){
                window.scrollTo(positionX, positionY);
            } else {
            window.scrollTo(positionX, positionY-130);
            }
        }
    }
    
    
    setInterval(function() {
        
        if ($('.item-image').length) {
            /*
                            var vids = document.getElementsByTagName("video");
                            for (i = 0; i < vids.length; i++) vids[i].setAttribute("controls", "true");
                            */
            // + bei resized Bildern
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
        
        $(".item-container").css( 'position', 'absolute' );
        $(".item-container").css( 'top', offset );
        $(".item-container").css( 'height', (monitorHeight+150)+'px' );
        $(".item-container").css( 'width', monitorWidth+'px' );
        $(".item-image").css( 'max-height', '100%' );
        //Formel um dynamisch den Container zu verschieben um den ganzen Bildschirm nutzen zu können
        
   //     commentboxwidth = $('.item-comments').width();
        
   //     console.log(commentboxwidth);
   //     console.log( $('.item-container').offset().left);
       
   //     $(".item-container").css( 'left', ($('.item-container').offset().left-commentboxwidth)*(-1)+'px'); 
        
        if (monitorWidth>1100) {
        $(".item-container").css( 'left', (((monitorWidth-1100)/(520/265))*(-1))+'px'); 
        }
        $("#stream-prev").css( 'visibility', 'hidden' );
        $("#stream-next").css( 'visibility', 'hidden' );
        $(".item-pointer").css( 'visibility', 'hidden' );
        
        spacepressed = true;
    }
    
    // Falls Bild mehr Höhe hat als Monitor
    function zoomH() {
        $(".item-image").css( 'height', monitorHeight+'px' );
        $(".item-image").css( 'width', 'auto' );
        zoomfinally();
    }
    
    // Falls Bild mehr Breite hat als Monitor
    function zoomB() {
        $(".item-image").css( 'width', monitorWidth+'px' );
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
        $("#stream-prev").css( 'visibility', 'visible' );
        $("#stream-next").css( 'visibility', 'visible' );
        $(".item-pointer").css( 'visibility', 'visible' );
        spacepressed = false;
    }
    
    // Funktion um Zoom zu initieren, wird entschieden ob hinzoomen/wegzoomen, sowie ob Breite/Höhe das Limit sind
    function zoom() {

        if (!spacepressed && $("div.item-container").length) {
            
            // Prüfen ob eine ausreichende Bildschirmbreite vorhanden ist
            if ($(window).width() < 1060) {
          //      alert('Der Zoom funktioniert erst ab einer Bildschirmbreite von 1050 Pixeln!');
            } else {
                
                //Breite für die Kommentarbox abziehen
                //Kommentarbox ist maximal 300px breit!
                monitorWidth = $(window).width();
                if(monitorWidth < 1250) {
                    monitorWidth = monitorWidth - (monitorWidth*0.26);
                } else {
                   monitorWidth = monitorWidth -300; 
                }
                //-180 für die Leiste oben und die Tags unten
                monitorHeight = $(window).height() - 180;
                var pictureWidth = $('.item-image').width(),
                    pictureHeight = $('.item-image').height();
                
                offset = $(".item-container").offset().top;
                
                //console.log('Breite:'+pictureWidth+' Höhe:'+pictureHeight);
                                
                if ((monitorWidth/monitorHeight) > (pictureWidth/pictureHeight)) {
                    zoomH();      
                } else {
                    zoomB();
                }
                
            }
        }else{
            zoomremove();
        } 
        
    }
    
    function keydown(event) {
        if (event.keyCode == '37' || event.keyCode == '39' || event.keyCode == '65' || event.keyCode == '68') {
            update();
        }else if (event.keyCode == '32') {
            
            // falls textarea aktiv
            var el = document.activeElement;
            if (el && (el.tagName.toLowerCase() == 'input' && el.type == 'text' || el.tagName.toLowerCase() == 'textarea')) {
                return;
            }
            
            // Bild mit Space vergrößern
            if ($('.item-image').length != 0) {
                zoom();
            }
        }
            } 
    
    // Space Vergrößerung und links/rechts Bildwechsel
    document.addEventListener("keydown", keydown, false);
    
    function isHover(e) {
        if (!e) return false;
        return (e.parentElement.querySelector(':hover') === e);
    }
    
    
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
    
    // Image Scroll
    
    // Firefox
    document.addEventListener("DOMMouseScroll", handleWheel, false);
    // IE9, Chrome, Safari, Opera
    document.addEventListener("mousewheel", handleWheel, false);
    // IE 6/7/8
    if(!document.addEventListener) {
        document.attachEvent("onmousewheel", handleWheel);
    }  
    
})();

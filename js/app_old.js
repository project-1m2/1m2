//(function() {
//	var $myDiv = $('#mapView');
//
//		if ( $myDiv.length){
//			//alert('Achou!');			
//			$('#iconmap').show();
//			//alert('Mostra');
//			//you can now reuse  $myDiv here, without having to select it again.
//		} else {
//			$('#iconmap').hide();
//			//alert('Esconde');
//		}
//	}
//)(jQuery);

(function($) {
    "use strict";
	
	
    // Custom options for map
    var options = {
            zoom : 14,
            mapTypeId : 'Styled',
            disableDefaultUI: true,
            mapTypeControlOptions : {
                mapTypeIds : [ 'Styled' ]
            }
        };
    var styles = [{
        stylers : [ {
            hue : "#cccccc"
        }, {
            saturation : -100
        }]
    }, {
        featureType : "road",
        elementType : "geometry",
        stylers : [ {
            lightness : 100
        }, {
            visibility : "simplified"
        }]
    }, {
        featureType : "road",
        elementType : "labels",
        stylers : [ {
            visibility : "on"
        }]
    }, {
        featureType: "poi",
        stylers: [ {
            visibility: "off"
        }]
    }];

    var newMarker = null;
    var markers = [];

    // json for properties markers on map
 //   var props = [{
//        title : 'Modern Residence in New York',
//        image : '1-1-thmb.png',
//        type : 'Venda',
//        price : '$1,550,000',
//        address : '39 Remsen St, Brooklyn, NY 11201, USA',
//        bedrooms : '3',
//        bathrooms : '2',
//        area : '3430 Sq Ft',
//        url : 'anuncio.php',
//        position : {
//            lat : -15.721040595676092,
//            lng : -47.882165799999996
//        },
//        markerIcon : "marker-green.png"
//    }, {
//        title : 'Hauntingly Beautiful Estate',
//        image : '2-1-thmb.png',
//        type : 'Locação',
//        price : '$1,750,000',
//        address : '169 Warren St, Brooklyn, NY 11201, USA',
//        bedrooms : '2',
//        bathrooms : '2',
//        area : '4430 Sq Ft',
//        url : 'anuncio.php',
//        position : {
//            lat : -15.720627495453654,
//            lng : -47.885169874096675
//        },
//        markerIcon : "marker-green.png"
//    }, {
//        title : 'Sophisticated Residence',
//        image : '3-1-thmb.png',
//        type : 'Venda',
//        price : '$1,340,000',
//        address : '38-62 Water St, Brooklyn, NY 11201, USA',
//        bedrooms : '2',
//        bathrooms : '3',
//        area : '2640 Sq Ft',
//        url : 'anuncio.php',
//        position : {
//            lat : -15.71963605149934,
//            lng : -47.880706678295894
//        },
//        markerIcon : "marker-green.png"
//    }, {
//        title : 'House With a Lovely Glass-Roofed Pergola',
//        image : '4-1-thmb.png',
//        type : 'Venda',
//        price : '$1,930,000',
//        address : 'Wunsch Bldg, Brooklyn, NY 11201, USA',
//        bedrooms : '3',
//        bathrooms : '2',
//        area : '2800 Sq Ft',
//        url : 'anuncio.php',
//        position : {
//            lat : 40.694355,
//            lng : -73.985229
//        },
//        markerIcon : "marker-green.png"
//    }, {
//        title : 'Luxury Mansion',
//        image : '5-1-thmb.png',
//        type : 'Locação',
//        price : '$2,350,000',
//        address : '95 Butler St, Brooklyn, NY 11231, USA',
//        bedrooms : '2',
//        bathrooms : '2',
//        area : '2750 Sq Ft',
//        url : 'anuncio.php',
//        position : {
//            lat : -15.71748790636697,
//            lng : -47.884397397900386
//        },
//        markerIcon : "marker-green.png"
//    }, {
//        title : 'Modern Residence in New York',
//        image : '1-1-thmb.png',
//        type : 'Venda',
//        price : '$1,550,000',
//        address : '39 Remsen St, Brooklyn, NY 11201, USA',
//        bedrooms : '3',
//        bathrooms : '2',
//        area : '3430 Sq Ft',
//        url : 'anuncio.php',
//        position : {
//            lat : -15.71847936078307,
//            lng : -47.88551319685058
//        },
//        markerIcon : "marker-green.png"
//    }, {
//        title : 'Hauntingly Beautiful Estate',
//        image : '2-1-thmb.png',
//        type : 'Locação',
//        price : '$1,750,000',
//        address : '169 Warren St, Brooklyn, NY 11201, USA',
//        bedrooms : '2',
//        bathrooms : '2',
//        area : '4430 Sq Ft',
//        url : 'anuncio.php',
//        position : {
//            lat : -15.719305569108178,
//            lng : -47.88757313337402
//        },
//        markerIcon : "marker-green.png"
//    }, {
//        title : 'Sophisticated Residence',
//        image : '3-1-thmb.png',
//        type : 'Venda',
//        price : '$1,340,000',
//        address : '38-62 Water St, Brooklyn, NY 11201, USA',
//        bedrooms : '2',
//        bathrooms : '3',
//        area : '2640 Sq Ft',
//        url : 'anuncio.php',
//        position : {
//            lat : -15.723353941427943,
//            lng : -47.88722981062011
//        },
//        markerIcon : "marker-green.png"
//    }, {
//        title : 'House With a Lovely Glass-Roofed Pergola',
//        image : '4-1-thmb.png',
//        type : 'Venda',
//        price : '$1,930,000',
//        address : 'Wunsch Bldg, Brooklyn, NY 11201, USA',
//        bedrooms : '3',
//        bathrooms : '2',
//        area : '2800 Sq Ft',
//        url : 'anuncio.php',
//        position : {
//            lat : -15.724097511264018,
//            lng : -47.88062084760742
//        },
//        markerIcon : "marker-green.png"
//    }, {
//        title : 'Luxury Mansion',
//        image : '5-1-thmb.png',
//        type : 'Locação',
//        price : '$2,350,000',
//        address : '95 Butler St, Brooklyn, NY 11231, USA',
//        bedrooms : '2',
//        bathrooms : '2',
//        area : '2750 Sq Ft',
//        url : 'anuncio.php',
//        position : {
//            lat : -15.721040595676092,
//            lng : -47.87933338728027
//        },
//        markerIcon : "marker-green.png"
//    }];

    // custom infowindow object
    var infobox = new InfoBox({
        disableAutoPan: false,
        maxWidth: 202,
        pixelOffset: new google.maps.Size(-101, -285),
        zIndex: null,
        boxStyle: {
            background: "url('images/infobox-bg.png') no-repeat",
            opacity: 1,
            width: "202px",
            height: "245px"
        },
        closeBoxMargin: "28px 26px 0px 0px",
        closeBoxURL: "",
        infoBoxClearance: new google.maps.Size(1, 1),
        pane: "floatPane",
        enableEventPropagation: false
    });


//alert("oi");
//	var addMarkers = $.getJSON('../load/mapa.json', function(props, map) { 
//		
//
//		$.each(props, function(i,prop) {
//			
//			
//            var latlng = new google.maps.LatLng(prop.position.lat,prop.position.lng);
//            var marker = new google.maps.Marker({
//                position: latlng,
//                map: map,
//                icon: new google.maps.MarkerImage( 
//                    'images/' + prop.markerIcon,
//                    null,
//                    null,
//                    null,
//                    new google.maps.Size(36, 36)
//                ),
//                draggable: false,
//                animation: google.maps.Animation.DROP,
//			});			
	
	
//     function that adds the markers on map
function carregarPontos() {

    $.getJSON('../load/mapa.json', function(pontos) {
  
        $.each(pontos, function(index, ponto) {
 alert("oi");
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(ponto.Latitude, ponto.Longitude),
                title: "Meu ponto personalizado! :-D",
                map: map
            });
 
        });
 
    });
 
}
 
carregarPontos();	
//$.getJSON('../load/mapa.json');	
    var addMarkers = function(props, map) {
        $.each(props, function(i,prop) {
            var latlng = new google.maps.LatLng(prop.position.lat,prop.position.lng);
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                icon: new google.maps.MarkerImage( 
                    'images/' + prop.markerIcon,
                    null,
                    null,
                    null,
                    new google.maps.Size(36, 36)
                ),
                draggable: false,
                animation: google.maps.Animation.DROP,
            });
			
	
			
            var infoboxContent = '<div class="infoW">' +
                                    '<div class="propImg">' +
                                        '<img src="images/prop/' + prop.image + '">' +
                                        '<div class="propBg">' +
                                            '<div class="propPrice">' + prop.price + '</div>' +
                                            '<div class="propType">' + prop.type + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="paWrapper">' +
                                        '<div class="propTitle">' + prop.title + '</div>' +
                                        '<div class="propAddress">' + prop.address + '</div>' +
                                    '</div>' +
                                    '<div class="propRating">' +
                                        '<span class="fa fa-star"></span>' +
                                        '<span class="fa fa-star"></span>' +
                                        '<span class="fa fa-star"></span>' +
                                        '<span class="fa fa-star"></span>' +
                                        '<span class="fa fa-star-o"></span>' +
                                    '</div>' +
                                    '<ul class="propFeat">' +
                                        '<li><span class="fa fa-moon-o"></span> ' + prop.bedrooms + '</li>' +
                                        '<li><span class="icon-drop"></span> ' + prop.bathrooms + '</li>' +
                                        '<li><span class="icon-frame"></span> ' + prop.area + '</li>' +
                                    '</ul>' +
                                    '<div class="clearfix"></div>' +
                                    '<div class="infoButtons">' +
                                        '<a class="btn btn-sm btn-round btn-gray btn-o closeInfo">Fechar</a>' +
                                        '<a href="' + prop.url + '" class="btn btn-sm btn-round btn-green viewInfo">Abrir</a>' +
                                    '</div>' +
                                 '</div>';

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infobox.setContent(infoboxContent);
                    infobox.open(map, marker);
                }
            })(marker, i));

            $(document).on('click', '.closeInfo', function() {
                infobox.open(null,null);
            });

            markers.push(marker);
        });
		
		
		//var infoWindow = new google.maps.InfoWindow({map: map});

		// Try HTML5 geolocation.
		if (navigator.geolocation) {

		  //window.alert('Entrou GeoLocation');
		  navigator.geolocation.getCurrentPosition(function(position) {
			var pos = {
			  lat: position.coords.latitude,
			  lng: position.coords.longitude
			};

			map.setCenter(pos);


			var contentString = ''+
            'Você está aqui'+
            '';
			var your = new google.maps.InfoWindow({
			  content: contentString
			});
			  
			//var image = 'upload/rafael/img/rafael.jpg';
			var beachMarker = new google.maps.Marker({
			  position: pos,
			  map: map,
			  icon: new google.maps.MarkerImage( 
			  'images/marker-yellow.png',
			  null,
			  null,
			  // new google.maps.Point(0,0),
			  null,
			  new google.maps.Size(36, 36)
			  ),
              draggable: false,
              animation: google.maps.Animation.DROP
			});			  
			beachMarker.addListener('click', function() {
				your.open(map, beachMarker);
			});
			  
			  
		  }, function() {
			handleLocationError(true, infoWindow, map.getCenter());
		  });
		} else {
		  // Browser doesn't support Geolocation
		  handleLocationError(false, infoWindow, map.getCenter());
		}		
		
		
		// Add a marker clusterer to manage the markers.
		var clusterStyles = [
		 {
			textColor: 'white',
			url: 'images/m2.png',
			height: 56,
			width: 56,
			fontFamily:"comic sans ms",
			textSize:15			 
		  },
		 {
			textColor: 'white',
			url: 'images/m4.png',
			height: 78,
			width: 78,
			fontFamily:"comic sans ms",
			textSize:15	
		  },
		 {
			textColor: 'white',
			url: 'images/m5.png',
			height: 90,
			width: 90,
			fontFamily:"comic sans ms",
			textSize:15	
		  }
		];

		var mcOptions = {
			gridSize: 50,
			styles: clusterStyles,
			maxZoom: 15
		};		
		var markerCluster = new MarkerClusterer(map, markers, mcOptions);
		
		//JSON INICIO
//		$.getJSON('load/mapa.json', function(pontos) {
//
//			var latlngbounds = new google.maps.LatLngBounds();
//
//			...
//
//				markers.push(marker);
//
//				latlngbounds.extend(marker.position);
//
//			});
//
//			var markerCluster = new MarkerClusterer(map, markers);
//
//			map.fitBounds(latlngbounds);
//
//		});	
		//JSON FIM		
		
    }


    var map;
    var windowHeight;
    var windowWidth;
    var contentHeight;
    var contentWidth;
    var isDevice = true;

    // calculations for elements that changes size on window resize
    var windowResizeHandler = function() {
        windowHeight = window.innerHeight;
        windowWidth = $(window).width();
        contentHeight = windowHeight - $('#header').height();
        contentWidth = $('#content').width();

        $('#leftSide').height(contentHeight);
        $('.closeLeftSide').height(contentHeight);
        $('#wrapper').height(contentHeight);
        $('#mapView').height(contentHeight);
        $('#content').height(contentHeight);
        setTimeout(function() {
            $('.commentsFormWrapper').width(contentWidth);
        }, 300);

        if (map) {
            google.maps.event.trigger(map, 'resize');
        }

        // Add custom scrollbar for left side navigation
        if(windowWidth > 767) {
            $('.bigNav').slimScroll({
                height : contentHeight - $('.leftUserWraper').height()
            });
        } else {
            $('.bigNav').slimScroll({
                height : contentHeight
            });
        }
        if($('.bigNav').parent('.slimScrollDiv').size() > 0) {
            $('.bigNav').parent().replaceWith($('.bigNav'));
            if(windowWidth > 767) {
                $('.bigNav').slimScroll({
                    height : contentHeight - $('.leftUserWraper').height()
                });
            } else {
                $('.bigNav').slimScroll({
                    height : contentHeight
                });
            }
        }

        // reposition of prices and area reange sliders tooltip
        var priceSliderRangeLeft = parseInt($('.priceSlider .ui-slider-range').css('left'));
        var priceSliderRangeWidth = $('.priceSlider .ui-slider-range').width();
        var priceSliderLeft = priceSliderRangeLeft + ( priceSliderRangeWidth / 2 ) - ( $('.priceSlider .sliderTooltip').width() / 2 );
        $('.priceSlider .sliderTooltip').css('left', priceSliderLeft);

        var areaSliderRangeLeft = parseInt($('.areaSlider .ui-slider-range').css('left'));
        var areaSliderRangeWidth = $('.areaSlider .ui-slider-range').width();
        var areaSliderLeft = areaSliderRangeLeft + ( areaSliderRangeWidth / 2 ) - ( $('.areaSlider .sliderTooltip').width() / 2 );
        $('.areaSlider .sliderTooltip').css('left', areaSliderLeft);
    }

    var repositionTooltip = function( e, ui ){
        var div = $(ui.handle).data("bs.tooltip").$tip[0];
        var pos = $.extend({}, $(ui.handle).offset(), { 
                        width: $(ui.handle).get(0).offsetWidth,
                        height: $(ui.handle).get(0).offsetHeight
                    });
        var actualWidth = div.offsetWidth;

        var tp = {left: pos.left + pos.width / 2 - actualWidth / 2}
        $(div).offset(tp);

        $(div).find(".tooltip-inner").text( ui.value );
    }

    windowResizeHandler();
    $(window).resize(function() {
        windowResizeHandler();
    });

    setTimeout(function() {
        $('body').removeClass('notransition');

        map = new google.maps.Map(document.getElementById('mapView'), options);
        var styledMapType = new google.maps.StyledMapType(styles, {
            name : 'Styled'
        });

        map.mapTypes.set('Styled', styledMapType);
        map.setCenter(new google.maps.LatLng(-15.717632493770024,-47.884182821179195));
        map.setZoom(14);

        if ($('#address').length > 0) {
            newMarker = new google.maps.Marker({
                position: new google.maps.LatLng(-15.717632493770024,-47.884182821179195),
                map: map,
                icon: new google.maps.MarkerImage( 
                    'images/marker-new.png',
                    null,
                    null,
                    // new google.maps.Point(0,0),
                    null,
                    new google.maps.Size(36, 36)
                ),
                draggable: true,
                animation: google.maps.Animation.DROP,
            });

            google.maps.event.addListener(newMarker, "mouseup", function(event) {
                var latitude = this.position.lat();
                var longitude = this.position.lng();
                $('#latitude').text(this.position.lat());
                $('#longitude').text(this.position.lng());
            });
        }

        addMarkers(props, map);
    }, 300);

    if(!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) {
        $('body').addClass('no-touch');
        isDevice = false;
    }

    // Header search icon transition
    $('.search input').focus(function() {
        $('.searchIcon').addClass('active');
    });
    $('.search input').blur(function() {
        $('.searchIcon').removeClass('active');
    });

    // Notifications list items pulsate animation
    $('.notifyList a').hover(
        function() {
            $(this).children('.pulse').addClass('pulsate');
        },
        function() {
            $(this).children('.pulse').removeClass('pulsate');
        }
    );

    // Exapnd left side navigation
    var navExpanded = false;
    $('.navHandler, .closeLeftSide').click(function() {
        if(!navExpanded) {
            $('.logo').addClass('expanded');
            $('#leftSide').addClass('expanded');
            if(windowWidth < 768) {
                $('.closeLeftSide').show();
            }
            $('.hasSub').addClass('hasSubActive');
            $('.leftNav').addClass('bigNav');
            if(windowWidth > 767) {
                $('.full').addClass('m-full');
            }
            windowResizeHandler();
            navExpanded = true;
        } else {
            $('.logo').removeClass('expanded');
            $('#leftSide').removeClass('expanded');
            $('.closeLeftSide').hide();
            $('.hasSub').removeClass('hasSubActive');
            $('.bigNav').slimScroll({ destroy: true });
            $('.leftNav').removeClass('bigNav');
            $('.leftNav').css('overflow', 'visible');
            $('.full').removeClass('m-full');
            navExpanded = false;
        }
    });

    // functionality for map manipulation icon on mobile devices
    $('.mapHandler').click(function() {
        if ($('#mapView').hasClass('mob-min') || 
            $('#mapView').hasClass('mob-max') || 
            $('#content').hasClass('mob-min') || 
            $('#content').hasClass('mob-max')) {
                $('#mapView').toggleClass('mob-max');
                $('#content').toggleClass('mob-min');
        } else {
            $('#mapView').toggleClass('min');
            $('#content').toggleClass('max');
        }

        setTimeout(function() {
            var priceSliderRangeLeft = parseInt($('.priceSlider .ui-slider-range').css('left'));
            var priceSliderRangeWidth = $('.priceSlider .ui-slider-range').width();
            var priceSliderLeft = priceSliderRangeLeft + ( priceSliderRangeWidth / 2 ) - ( $('.priceSlider .sliderTooltip').width() / 2 );
            $('.priceSlider .sliderTooltip').css('left', priceSliderLeft);

            var areaSliderRangeLeft = parseInt($('.areaSlider .ui-slider-range').css('left'));
            var areaSliderRangeWidth = $('.areaSlider .ui-slider-range').width();
            var areaSliderLeft = areaSliderRangeLeft + ( areaSliderRangeWidth / 2 ) - ( $('.areaSlider .sliderTooltip').width() / 2 );
            $('.areaSlider .sliderTooltip').css('left', areaSliderLeft);

            if (map) {
                google.maps.event.trigger(map, 'resize');
            }

            $('.commentsFormWrapper').width($('#content').width());
        }, 300);

    });

    // Expand left side sub navigation menus
    $(document).on("click", '.hasSubActive', function() {
        $(this).toggleClass('active');
        $(this).children('ul').toggleClass('bigList');
        $(this).children('a').children('.arrowRight').toggleClass('fa-angle-down');
    });

    if(isDevice) {
        $('.hasSub').click(function() {
            $('.leftNav ul li').not(this).removeClass('onTap');
            $(this).toggleClass('onTap');
        });
    }

    // functionality for custom dropdown select list
    $('.dropdown-select li a').click(function() {
        if (!($(this).parent().hasClass('disabled'))) {
            $(this).prev().prop("checked", true);
            $(this).parent().siblings().removeClass('active');
            $(this).parent().addClass('active');
            $(this).parent().parent().siblings('.dropdown-toggle').children('.dropdown-label').html($(this).text());
        }
    });

    $('.priceSlider').slider({
        range: true,
        min: 0,
        max: 2000000,
        values: [500000, 1500000],
        step: 10000,
        slide: function(event, ui) {
            $('.priceSlider .sliderTooltip .stLabel').html(
                '$' + ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 
                ' <span class="fa fa-arrows-h"></span> ' +
                '$' + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
            );
            var priceSliderRangeLeft = parseInt($('.priceSlider .ui-slider-range').css('left'));
            var priceSliderRangeWidth = $('.priceSlider .ui-slider-range').width();
            var priceSliderLeft = priceSliderRangeLeft + ( priceSliderRangeWidth / 2 ) - ( $('.priceSlider .sliderTooltip').width() / 2 );
            $('.priceSlider .sliderTooltip').css('left', priceSliderLeft);
        }
    });
    $('.priceSlider .sliderTooltip .stLabel').html(
        '$' + $('.priceSlider').slider('values', 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + 
        ' <span class="fa fa-arrows-h"></span> ' +
        '$' + $('.priceSlider').slider('values', 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    );
    var priceSliderRangeLeft = parseInt($('.priceSlider .ui-slider-range').css('left'));
    var priceSliderRangeWidth = $('.priceSlider .ui-slider-range').width();
    var priceSliderLeft = priceSliderRangeLeft + ( priceSliderRangeWidth / 2 ) - ( $('.priceSlider .sliderTooltip').width() / 2 );
    $('.priceSlider .sliderTooltip').css('left', priceSliderLeft);

    $('.areaSlider').slider({
        range: true,
        min: 0,
        max: 20000,
        values: [5000, 10000],
        step: 10,
        slide: function(event, ui) {
            $('.areaSlider .sliderTooltip .stLabel').html(
                ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' Sq Ft' +
                ' <span class="fa fa-arrows-h"></span> ' +
                ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' Sq Ft'
            );
            var areaSliderRangeLeft = parseInt($('.areaSlider .ui-slider-range').css('left'));
            var areaSliderRangeWidth = $('.areaSlider .ui-slider-range').width();
            var areaSliderLeft = areaSliderRangeLeft + ( areaSliderRangeWidth / 2 ) - ( $('.areaSlider .sliderTooltip').width() / 2 );
            $('.areaSlider .sliderTooltip').css('left', areaSliderLeft);
        }
    });
    $('.areaSlider .sliderTooltip .stLabel').html(
        $('.areaSlider').slider('values', 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' Sq Ft' +
        ' <span class="fa fa-arrows-h"></span> ' +
        $('.areaSlider').slider('values', 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + ' Sq Ft'
    );
    var areaSliderRangeLeft = parseInt($('.areaSlider .ui-slider-range').css('left'));
    var areaSliderRangeWidth = $('.areaSlider .ui-slider-range').width();
    var areaSliderLeft = areaSliderRangeLeft + ( areaSliderRangeWidth / 2 ) - ( $('.areaSlider .sliderTooltip').width() / 2 );
    $('.areaSlider .sliderTooltip').css('left', areaSliderLeft);

    $('.volume .btn-round-right').click(function() {
        var currentVal = parseInt($(this).siblings('input').val());
        if (currentVal < 10) {
            $(this).siblings('input').val(currentVal + 1);
        }
    });
    $('.volume .btn-round-left').click(function() {
        var currentVal = parseInt($(this).siblings('input').val());
        if (currentVal > 1) {
            $(this).siblings('input').val(currentVal - 1);
        }
    });

    $('.handleFilter').click(function() {
        $('.filterForm').slideToggle(200);
    });

    //Enable swiping
    $(".carousel-inner").swipe( {
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
            $(this).parent().carousel('next'); 
        },
        swipeRight: function() {
            $(this).parent().carousel('prev');
        }
    });

    $(".carousel-inner .card").click(function() {
        window.open($(this).attr('data-linkto'), '_self');
    });

    $('#content').scroll(function() {
        if ($('.comments').length > 0) {
            var visible = $('.comments').visible(true);
            if (visible) {
                $('.commentsFormWrapper').addClass('active');
            } else {
                $('.commentsFormWrapper').removeClass('active');
            }
        }
    });

    $('.btn').click(function() {
        if ($(this).is('[data-toggle-class]')) {
            $(this).toggleClass('active ' + $(this).attr('data-toggle-class'));
        }
    });

    $('.tabsWidget .tab-scroll').slimScroll({
        height: '235px',
        size: '5px',
        position: 'right',
        color: '#939393',
        alwaysVisible: false,
        distance: '5px',
        railVisible: false,
        railColor: '#222',
        railOpacity: 0.3,
        wheelStep: 10,
        allowPageScroll: true,
        disableFadeOut: false
    });

    $('.progress-bar[data-toggle="tooltip"]').tooltip();
    $('.tooltipsContainer .btn').tooltip();

    $("#slider1").slider({
        range: "min",
        value: 50,
        min: 1,
        max: 100,
        slide: repositionTooltip,
        stop: repositionTooltip
    });
    $("#slider1 .ui-slider-handle:first").tooltip({ title: $("#slider1").slider("value"), trigger: "manual"}).tooltip("show");

    $("#slider2").slider({
        range: "max",
        value: 70,
        min: 1,
        max: 100,
        slide: repositionTooltip,
        stop: repositionTooltip
    });
    $("#slider2 .ui-slider-handle:first").tooltip({ title: $("#slider2").slider("value"), trigger: "manual"}).tooltip("show");

    $("#slider3").slider({
        range: true,
        min: 0,
        max: 500,
        values: [ 190, 350 ],
        slide: repositionTooltip,
        stop: repositionTooltip
    });
    $("#slider3 .ui-slider-handle:first").tooltip({ title: $("#slider3").slider("values", 0), trigger: "manual"}).tooltip("show");
    $("#slider3 .ui-slider-handle:last").tooltip({ title: $("#slider3").slider("values", 1), trigger: "manual"}).tooltip("show");

    $('#autocomplete').autocomplete({
        source: ["ActionScript", "AppleScript", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"],
        focus: function (event, ui) {
            var label = ui.item.label;
            var value = ui.item.value;
            var me = $(this);
            setTimeout(function() {
                me.val(value);
            }, 1);
        }
    });
    $('#buscaprincipal').autocomplete({
        source: ["Rafael", "Ruscher", "Asp", "BASIC", "C", "C++", "Clojure", "COBOL", "ColdFusion", "Erlang", "Fortran", "Groovy", "Haskell", "Java", "JavaScript", "Lisp", "Perl", "PHP", "Python", "Ruby", "Scala", "Scheme"],
        focus: function (event, ui) {
            var label = ui.item.label;
            var value = ui.item.value;
            var me = $(this);
            setTimeout(function() {
                me.val(value);
            }, 1);
        }
    });

    $('#tags').tagsInput({
        'height': 'auto',
        'width': '100%',
        'defaultText': 'Add a tag',
    });

    $('#datepicker').datepicker();
    $('#datepicker1').datepicker();

    // functionality for autocomplete address field
    if ($('#address').length > 0) {
        var address = document.getElementById('address');
        var addressAuto = new google.maps.places.Autocomplete(address);

        google.maps.event.addListener(addressAuto, 'place_changed', function() {
            var place = addressAuto.getPlace();

            if (!place.geometry) {
                return;
            }
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
            }
            newMarker.setPosition(place.geometry.location);
            newMarker.setVisible(true);
            $('#latitude').text(newMarker.getPosition().lat());
            $('#longitude').text(newMarker.getPosition().lng());

            return false;
        });
    }

    $('input, textarea').placeholder();

	

})(jQuery);
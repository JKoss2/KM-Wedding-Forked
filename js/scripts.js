$(document).ready(function () {

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function () {
        $('.wp1').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp2').waypoint(function () {
        $('.wp2').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp3').waypoint(function () {
        $('.wp3').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp4').waypoint(function () {
        $('.wp4').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function () {
        $('.wp5').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function () {
        $('.wp6').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });
    $('.wp7').waypoint(function () {
        $('.wp7').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp8').waypoint(function () {
        $('.wp8').addClass('animated fadeInLeft');
    }, {
        offset: '75%'
    });
    $('.wp9').waypoint(function () {
        $('.wp9').addClass('animated fadeInRight');
    }, {
        offset: '75%'
    });

    /***************** Initiate Flexslider ******************/
    $('.flexslider').flexslider({
        animation: "slide"
    });

    /***************** Initiate Fancybox ******************/

    $('.single_image').fancybox({
        padding: 4
    });

    $('.fancybox').fancybox({
        padding: 4,
        width: 1000,
        height: 800
    });

    /***************** Tooltips ******************/
    $('[data-toggle="tooltip"]').tooltip();

    /***************** Nav Transformicon ******************/

    /* When user clicks the Icon */
    $('.nav-toggle').click(function () {
        $(this).toggleClass('active');
        $('.header-nav').toggleClass('open');
        event.preventDefault();
    });
    /* When user clicks a link */
    $('.header-nav li a').click(function () {
        $('.nav-toggle').toggleClass('active');
        $('.header-nav').toggleClass('open');

    });

    /***************** Header BG Scroll ******************/

    $(function () {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();

            if (scroll >= 20) {
                $('section.navigation').addClass('fixed').removeClass('nav_hover');
                $('header').css({
                    //"border-bottom": "none",
                    "padding": "15px 0"
                });
                $('header .member-actions').css({
                    "top": "6px",
                });
                $('header .navicon').css({
                    "top": "12px",
                });
            } else {
                $('section.navigation').removeClass('fixed').addClass('nav_hover');
                $('header').css({
                    "padding": "20px 0"
                });
                $('header .member-actions').css({
                    "top": "11px",
                });
                $('header .navicon').css({
                    "top": "17px",
                });
            }
        });
    });
    /***************** Smooth Scrolling ******************/

    $(function () {

        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 50
                    }, 1500);
                    return false;
                }
            }
        });

    });


    /********************** Embed youtube video *********************/
    $('.player').YTPlayer();


    /********************** Toggle Map Content **********************/
    $('#btn-show-ceremony').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
        mapFocus(locCeremony);
    });
    $('#btn-show-reception').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
        mapFocus(locReception);
    });
    $('#btn-show-both').click(function () {
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
        marker.setVisible(false);
        calcRoute();
    });
    $('#btn-show-content').click(function () {
        mapFocus(locInit);
        marker.setVisible(true);
        $('#map-content').toggleClass('toggle-map-content');
        $('#btn-show-content').toggleClass('toggle-map-content');
    });

    /********************** Add to Calendar **********************/
    var myCalendar = createCalendar({
        options: {
            class: '',
            // You can pass an ID. If you don't, one will be generated for you
            id: ''
        },
        data: {
            // Event title
            title: "Joe & Jordan's Wedding!",

            // Event start date
            start: new Date('Oct 24, 2024 10:00'),

            // Event duration (IN MINUTES)
            // duration: 120,

            // You can also choose to set an end time
            // If an end time is set, this will take precedence over duration
            end: new Date('Oct 24, 2024 00:00'),

            // Event Address
            address: '6000 West Osceola Parkway, Kissimmee, FL 34747',

            // Event Description
            description: "We can't wait to see you! For any queries or issues, please contact Joe at (941) 704-2631."
        }
    });

    $('#add-to-cal').html(myCalendar);

});

/********************** Google Map **********************/

// Google map
var locInit = [{lat:28.312516, lng:-81.547851},'Ceremony',12];
var locCenter = [{lat: 28.329346, lng: -81.536406},'Celebration, FL',14];
var locCeremony = [{lat:28.312456072908198, lng:-81.54792385125154},'Ceremony',16];
var locReception = [{lat:28.343154572563147, lng:-81.52600873641599},'Reception',16];
var mapOptions = {
    zoom: locInit[2],
    center: locInit[0],
    scrollwheel: false,
    mapId: '8501ddcf8a0a6fae'};
var map;
var marker;
var directionsService;
var directionsDisplay;
function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    marker = new google.maps.Marker({
        position: locInit[0],
        map: map
    });
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
}

function mapFocus(locData) {
    map.panTo(locData[0]);
    marker.setPosition(locData[0]);
    marker.setTitle(locData[1]);
    map.setZoom(locData[2]);
}
function calcRoute() {
    directionsDisplay.setMap(map);
    //create request
    var request = {
        origin: '1050 Celebration Ave, Celebration, FL',
        destination: '6000 W Osceola Parkway, Kissimmee, FL',
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidTolls: true,
    }

    const ceremonyContentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";
    const ceremonyinfowindow = new google.maps.InfoWindow({
        content: ceremonyContentString,
        ariaLabel: "Ceremony",
    });
    const receptionContentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";
    const receptioninfowindow = new google.maps.InfoWindow({
        content: receptionContentString,
        ariaLabel: "Reception",
    });

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //display route
            directionsDisplay.setDirections(result);
            var step = 1;
            var infowindowtrip = new google.maps.InfoWindow();
            //infowindowtrip.setContent(result.routes[0].legs[0].steps[step].distance.text + "<br>" + result.routes[0].legs[0].steps[step].duration.text + " ");
            infowindowtrip.setContent("3.3 mi" + "<br>" + "10 min" + " ");
            infowindowtrip.setPosition(result.routes[0].legs[0].steps[step].end_location);
            infowindowtrip.open(map);
            document.getElementById("btn-show-content").addEventListener("click", function(){
                directionsDisplay.setMap(null);
                infowindowtrip.close();
            })
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map
            map.panTo(locCenter[0]);
            markerCer = new google.maps.Marker({
                position: locCeremony[0],
                map: map,
                title: 'Ceremony'
            });
            markerCer.addListener("click", () => {
                ceremonyinfowindow.open({
                    anchor: markerCer,
                    map,
                });
            });
            ceremonyinfowindow.addListener('closeclick', function (){
                map.panTo(locCenter[0]);
            })
            markerRec = new google.maps.Marker({
                position: locReception[0],
                map: map,
                title: 'Reception'
            });
            markerRec.addListener("click", function() {
                receptioninfowindow.open({
                    anchor: markerRec,
                    map,
                });
            });
            receptioninfowindow.addListener('closeclick', function (){
                map.panTo(locCenter[0]);
            })
            document.getElementById("btn-show-content").addEventListener("click", function(){
                ceremonyinfowindow.close();
                receptioninfowindow.close();
            })
            alert('Google directions failed to load! Sorry.');
        }
    });

}
/* ================================= */
/* ::::::: 1. Header Sticky :::::::: */
/* ================================= */
$(window).scroll(function() {
var width = $(window).width();	
	if(width >= 1)
	{
		if ($(this).scrollTop() > 1){  
			$('#header').addClass("sticky");
			$('.div-notificationbar').stop().slideUp(50);

		}
		else{
			$('#header').removeClass("sticky");
			$('.div-notificationbar').stop().slideDown('fast');

		}
	}
});

/* ================================= */
/* : 2. Home Page Animation Effect : */
/* ================================= */
$(function () {
var wow = new WOW(
    {
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       false,       // default
        live:         true        // default
    }
);
wow.init();
});

/* ================================= */
/* :::: 3. Home Page Fan Count ::::: */
/* ================================= */
$(document).ready(function() {
$(".timer .count").appear(function() {
            var counter = $(this).html();
            $(this).countTo({
            from: 0,
            to: counter,
            speed: 2500,
            refreshInterval: 100,
        formatter: function (value, options) {
          return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
        }
          });
     });
});

/* ================================= */
/* ::::::::: 4. Tooltips :::::::::: */
/* ================================= */
$(function () {
  $('body').tooltip({
    selector: '.info-btn,.exchange-dw-tooltip'
  });
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
});

/* ================================= */
/* :::::::: 5. Browse File ::::::::: */
/* ================================= */
$(function() {
  // We can attach the `fileselect` event to all file inputs on the page
  $(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
  });

  // We can watch for our custom `fileselect` event like this
  $(document).ready( function() {
      $(':file').on('fileselect', function(event, numFiles, label) {

          var input = $(this).parents('.input-group').find(':text'),
              log = numFiles > 1 ? numFiles + ' files selected' : label;

          if( input.length ) {
              input.val(log);
          }

      });
  });

});
/* ================================= */
/* :::::::: 6. Owl Carousel ::::::::: */
/* ================================= */
$(document).ready(function(){
$('.spotlight-slider').owlCarousel({
    loop:false,
    dots:false,
    nav:true,
    navText: [
    "<i class='glyphicon glyphicon-chevron-left'></i>",
    "<i class='glyphicon glyphicon-chevron-right'></i>"
    ],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    },

});



// Go to the next item
// $('.glyphicon-chevron-right').click(function() {
    
//     //owl.trigger('next.owl.carousel');
// })
// Go to the previous item
// $('.glyphicon-chevron-left').click(function() {
//     // With optional speed parameter
//     // Parameters has to be in square bracket '[]'
//     owl.trigger('prev.owl.carousel', [300]);
// })
/*Badges Slider*/
$('.badges-slider').owlCarousel({
    loop:false,
    dots:true,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
});
/* ================================= */
/* :::::::::: 7. Z-Tabs ::::::::::: */
/* ================================= */
$(document).ready(function () {
    $("#setting-tabs").zozoTabs({
        rounded: true,
        shadows: false,
        bordered: false,
        size: "xlarge",
        position: "top-compact",
        animation: {
            easing: "easeInOutExpo",
            effects: "slideH"
        }
    });
});
/* ================================= */
/* :::: 8. All Modal Box Center :::: */
/* ================================= */
$(document).ready(function(){
    function alignModal(){
        var modalDialog = $(this).find(".modal-dialog");

        // Applying the top margin on modal dialog to align it vertically center
        modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
    }
    // Align modal when it is displayed
    $(".modal").on("shown.bs.modal", alignModal);

    // Align modal when user resize the window
    $(window).on("resize", function(){
        $(".modal:visible").each(alignModal);
        if ($("#upgradetopro:visible").length) {
            adjustPlanHeight('upgradetopro');
        }

        if ($("#changeplanmodal:visible").length) {
            adjustPlanHeight('changeplanmodal');
        }

        if ($("#planSection").length) {
            adjustPlanHeight('planSection');
        }

        if ($("#comparePlanSection").length) {
            adjustPlanHeight('comparePlanSection');
        }
    });
});
/* ================================= */
/* :::: 9. Success Login Pop-Up :::: */
/* ================================= */
$(window).load(function(){
  if (!sessionStorage.dashboardtour_end) {
    $('#success-login-popup').modal({show: 'true', backdrop: 'static', keyboard: false});
  }

  if ($('#payment_status').length > 0) {
    $('#payment_status').modal({show: 'true', backdrop: 'static', keyboard: false});
  }

});
/* ================================= */
/* ::: 10. Support Artist Pop-Up ::: */
/* ================================= */
$(window).load(function(){
  $('#support-artist-popup').modal('show');
});
/* ================================= */
/* ::: 11. Table Sorting Arrow ::: */
/* ================================= */
$(document).ready(function(){
$('table th').click(function(){
	if($(this).attr('data-sort')  != 'undefined')
	{
		if($(this).find('i').hasClass('fa-arrow-down'))
		{
			$(this).find('i').removeClass('fa-arrow-down').addClass('fa-arrow-up');
		}
		else
		{
			$(this).find('i').removeClass('fa-arrow-up').addClass('fa-arrow-down');
		}
	}
});
});
/* ================================= */
/* ::: 12. Footer Notificaion Bar ::: */
/* ================================= */
$(document).ready(function(){
  setTimeout(function(){
   $('.footer-fix').hide();// or fade, css display however you'd like.
  }, 10000);

  if ($("#planSection").length) {
    adjustPlanHeight('planSection');
  }

  if ($("#comparePlanSection").length) {
    adjustPlanHeight('comparePlanSection');
  }
});

$('#upgradetopro').on('shown.bs.modal', function (e) {
    adjustPlanHeight('upgradetopro');
});
$('#changeplanmodal').on('shown.bs.modal', function (e) {
    adjustPlanHeight('changeplanmodal');
});

function adjustPlanHeight (sectionId) {
    var planDesc = $("#" + sectionId + " .plan-desc");
    var planName = $("#" + sectionId + " .plan-name");
    var planDescCount = planDesc.length;
    var planNameCount = planName.length;

    if(planDescCount > 1 || planNameCount > 1) {
        planDesc.css('height', '');
        planName.css('height', '');
        var planDescMaxHeight = getMaxHeight(planDesc);
        var planNameMaxHeight = getMaxHeight(planName);
        if (planDescMaxHeight) {
            planDesc.css('height', planDescMaxHeight+ 'px');
        }
        if (planNameMaxHeight) {
            planName.css('height', planNameMaxHeight+ 'px');
        }
    }
}

function getMaxHeight (obj) {
    var maxHeight = Math.max.apply(null, obj.map(function ()
    {
        return $(this).height();
    }).get());

    return maxHeight;
}

// Sticky Header
jQuery(window).scroll(function() {
    var width = jQuery(window).width();
    if (jQuery(this).scrollTop() > 1){
        jQuery('header.site-header').addClass("sticky");
    }
    else{
        jQuery('header.site-header').removeClass("sticky");
    }
});


// Mobile Menu
jQuery('.hamburger').on('click', function() {
    jQuery(this).toggleClass('is-active');
    jQuery('html, body').toggleClass('overflow-hidden');
    jQuery(this).parents('.row.hy-flex-row').siblings('.row').find('nav.mobile').toggleClass('active');
    jQuery('header.site-header').addClass("sticky");
});


let menuItem = '.mobile-nav > li.menu-item-has-children';
let subMenuItem = '.mobile-nav > li > .sub-menu > li.menu-item-has-children';

jQuery(menuItem + ' > a, ' + subMenuItem + ' > a').on('click', function(e) {
    e.preventDefault();
    jQuery(this).toggleClass('active');
    jQuery(this).siblings('ul').toggleClass('active');
});

jQuery(menuItem).on('click', function() {
    jQuery(this).children('ul').slideToggle();
});

jQuery(subMenuItem).on('click', function(e) {
    e.stopPropagation();
    jQuery(this).children('ul').slideToggle();
});
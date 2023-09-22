// HEADER ANIMATION
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    $(".navbar").addClass("fixed-top");
    $(".body-container").addClass("body-top-padding");
    $(".body-container").addClass("header-small");
  } else {
    $(".navbar").removeClass("fixed-top");
    $(".body-container").removeClass("body-top-padding");
    $(".body-container").removeClass("header-small");
  }
}

// OWL-CAROUSAL
$(".owl-carousel").owlCarousel({
  items: 3,
  loop: true,
  nav: false,
  dot: true,
  autoplay: true,
  slideTransition: "linear",
  autoplayHoverPause: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});

// SCROLLSPY
$(document).ready(function () {
  $(".nav-link").click(function () {
    var t = $(this).attr("href");
    $("html, .body-container").animate(
      {
        scrollTop: $(t).offset().top - 75,
      },
      {
        duration: 1000,
      }
    );
    $(".body-container").scrollspy({
      target: ".navbar",
      offset: $(t).offset().top,
    });
    return false;
  });
});

// AOS
AOS.init({
  offset: 120,
  delay: 0,
  duration: 1200,
  easing: "ease",
  once: true,
  mirror: false,
  anchorPlacement: "top-bottom",
  disable: "mobile",
});

//SIDEBAR-OPEN
$("#navbarSupportedContent").on("hidden.bs.collapse", function () {
  $("#body").removeClass("sidebar-open");
});

$("#navbarSupportedContent").on("shown.bs.collapse", function () {
  $("#body").addClass("sidebar-open");
});

window.onresize = function () {
  var w = window.innerWidth;
  if (w >= 992) {
    $(".navbar-big").removeClass("navbar-hide");
    $(".navbar-small").addClass("navbar-hide");
  } else {
    $(".navbar-big").addClass("navbar-hide");
    $(".navbar-small").removeClass("navbar-hide");
  }
};

// $(".body-container").click(function () {
//   $(".menu").removeClass("menu-show");
//   $(".body-container").removeClass("sidebar-open");
// });

$(function ($) {
  "use strict";

  jQuery(document).ready(function () {

    // preloader
    $("#preloader").delay(300).animate({
      "opacity": "0"
    }, 500, function () {
      $("#preloader").css("display", "none");
    });

    // Scroll Top
    var ScrollTop = $(".scrollToTop");
    $(window).on('scroll', function () {
      if ($(this).scrollTop() < 500) {
        ScrollTop.removeClass("active");
      } else {
        ScrollTop.addClass("active");
      }
    });
    $('.scrollToTop').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      }, 500);
      return false;
    });

    // Navbar Dropdown
    var dropdown_menu = $(".header-section .dropdown-menu");
    $(window).resize(function () {
      if ($(window).width() < 992) {
        dropdown_menu.removeClass('show');
      }
      else {
        dropdown_menu.addClass('show');
      }
    });
    if ($(window).width() < 992) {
      dropdown_menu.removeClass('show');
    }
    else {
      dropdown_menu.addClass('show');
    }

    // Autocomplete off
    $('input[type=text]').attr('autocomplete','off');

    // Password Show Hide
    $('.showPass').on('click', function(){
      var passInput=$("#passInput");
      if(passInput.attr('type')==='password'){
        passInput.attr('type','text');
      }else{
        passInput.attr('type','password');
      }
    })

    // Sticky Header
    var fixed_top = $(".header-section");
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 50) {
        fixed_top.addClass("animated fadeInDown header-fixed");
      }
      else {
        fixed_top.removeClass("animated fadeInDown header-fixed");
      }
    });

    // Scroll-Reactive Navbar
    var isScrolling = false;
    
    function updateActiveNavItem() {
      if (isScrolling) return; // Don't update during programmatic scroll
      
      var scrollPos = $(window).scrollTop();
      var windowHeight = $(window).height();
      var navLinks = $('.navbar-nav .nav-link');
      
      // Remove active class from all nav links
      navLinks.removeClass('active');
      
      // Find the section that's currently in view
      var currentSection = '';
      var sections = ['#home', '#what-is-playparadice', '#why-prd', '#core-features', '#how-it-works', '#roadmap', '#faq'];
      
      // Special case: if at the very top, show home as active
      if (scrollPos < 100) {
        currentSection = '#home';
      } else {
        // Check each section from top to bottom to find the one we're currently in
        for (var i = 0; i < sections.length; i++) {
          var section = $(sections[i]);
          if (section.length) {
            var sectionTop = section.offset().top;
            var sectionHeight = section.outerHeight();
            var sectionBottom = sectionTop + sectionHeight;
            
            // Check if we're in this section (with some offset for better UX)
            if (scrollPos + 150 >= sectionTop && scrollPos + 150 < sectionBottom) {
              currentSection = sections[i];
              break;
            }
          }
        }
        
        // If no section found and we're past the last section, highlight the last one
        if (!currentSection && scrollPos > 0) {
          for (var j = sections.length - 1; j >= 0; j--) {
            var checkSection = $(sections[j]);
            if (checkSection.length && scrollPos + windowHeight > checkSection.offset().top) {
              currentSection = sections[j];
              break;
            }
          }
        }
      }
      
      // Default to home if still no section found
      if (!currentSection) {
        currentSection = '#home';
      }
      
      // Add active class to the corresponding nav link
      navLinks.each(function() {
        var linkHref = $(this).attr('href');
        if (linkHref === currentSection) {
          $(this).addClass('active');
          return false; // Break the loop
        }
      });
    }
    
    // Update on scroll with throttling for better performance
    var scrollTimeout;
    $(window).on('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        updateActiveNavItem();
      }, 10);
    });
    
    // Update on page load and resize
    updateActiveNavItem();
    $(window).on('resize', function() {
      updateActiveNavItem();
    });
    
    // Smooth scroll for nav links
    $('.navbar-nav .nav-link[href^="#"]').on('click', function(e) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        isScrolling = true;
        
        // Remove active from all, add to clicked
        $('.navbar-nav .nav-link').removeClass('active');
        $(this).addClass('active');
        
        // Close mobile menu if open (only on mobile view)
        if ($(window).width() < 992) {
          var navbarCollapse = $('#navbar-content');
          var navbarToggler = $('.navbar-toggler');
          if (navbarCollapse.hasClass('show')) {
            // Close the menu by removing 'show' class and adding 'collapsed' to toggler
            navbarCollapse.removeClass('show');
            navbarToggler.addClass('collapsed');
            navbarToggler.attr('aria-expanded', 'false');
            navbarCollapse.attr('aria-expanded', 'false');
          }
        }
        
        var offset = 100; // Offset for fixed header
        $('html, body').animate({
          scrollTop: target.offset().top - offset
        }, 400, 'swing', function() {
          isScrolling = false;
          // Update active state after scroll completes
          updateActiveNavItem();
        });
      }
    });

    // Buy Ticket
    var numbers = $(".numbers li");
    $(numbers).on("click", function () {
      $(this).toggleClass('numActive');
      if($( numbers ).hasClass( "numActive" )){
        var numbersVal = $(this).text();
      }
      var numItems = $(".numbers .numActive").length;
      if(numItems === 5){
        $(numbers).addClass('deactive');
      }
      if(numItems === 1){
        $(".output-box li span:eq(0)").html(numbersVal);
      }else if(numItems === 2){
        $(".output-box li span:eq(1)").html(numbersVal);
      }else if(numItems === 3){
        $(".output-box li span:eq(2)").html(numbersVal);
      }
      else if(numItems === 4){
        $(".output-box li span:eq(3)").html(numbersVal);
      }
      else if(numItems === 5){
        $(".output-box li span:eq(4)").html(numbersVal);
      }
    });
    var jackpot = $(".jackpot li");
    $(jackpot).on("click", function () {
      $(jackpot).removeClass('jackpotActive');
      $(this).toggleClass('jackpotActive');
      var numbersVal = $(this).text();
      var jackItems = $(".jackpot .jackpotActive").length;
      if(jackItems === 1){
        $(".output-box li span:eq(5)").html(numbersVal);
      }
    });

    // Login Reg Tab
    $('.reg-btn').on("click", function(){
      $("#regArea-tab").click();
    });
    $('.log-btn').on("click", function(){
      $("#loginArea-tab").click();
    });

    // Modal active
    $(".login").on("click", function () {
      $("#loginArea").addClass("show").addClass("active");
      $("#regArea").removeClass("show").removeClass("active");
      $("#loginArea-tab").addClass("active");
      $("#regArea-tab").removeClass("active");
    });
    $(".reg").on("click", function () {
        $("#regArea").addClass("show").addClass("active");
        $("#loginArea").removeClass("show").removeClass("active");
        $("#loginArea-tab").removeClass("active");
        $("#regArea-tab").addClass("active");
    });

    // Navbar Active Class Only for HTML
    var curUrl = $(location).attr('href');
    var terSegments = curUrl.split("/");
    var desired_segment = terSegments[terSegments.length - 1];
    var removeGarbage = desired_segment.split(".html")[0] + ".html";
    var checkLink = $('.navbar-nav a[href="' + removeGarbage + '"]');
    var targetClass = checkLink.addClass('active');
    targetClass.parents(".sub-navbar").find("a").first().addClass('active');

    // Dropdown Active Remove
    $(".radio-box .single-radio").on("click", function () {
      $('.ticket-box').removeClass('active');
    });
    $(".radio-box .manual").on("click", function () {
      $('.ticket-box').addClass('active');
    });

    // Blog Reply btn
    var replybtn = $(".reply-btn");
    $(replybtn).on('click', function () {
      $(this).next().slideToggle('slow');
    });
    
  });
});
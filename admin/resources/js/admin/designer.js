/*===========================================
             All Function
=============================================*/
initUsersidebarToggleclick = function(){
	jQuery('.userheader-toggle,.sidebarbackdrop').on('click', function(event) {
	  jQuery('.uselayout-wrap').toggleClass('open1 close1');
	});
}
initUsersidebarTogglecheck = function(){
  if($(window).outerWidth() < 1025){
	jQuery('.uselayout-wrap').addClass('close1').removeClass('open1');  
  }
}
initheaderstickyset = function () {
   /*-------------------- header sticky --------------------------*/
   if($('header.site-header').length){
	  var hed_height = $('header.site-header').outerHeight();
	  if ($(this).scrollTop() > hed_height) {
		$('header.site-header').addClass('sticky');
	  } else {
		$('header.site-header').removeClass('sticky');
	  }   
   }
}
initmiddlecontentheightset = function () {
   /*----------- middle content min-height set  not content footer set bottom use -------------*/
	if ( $('footer.ste-footer').length && $('.middle-content-load').length) {
	  var win_height = $(window).outerHeight();
	  var head_height = $('header.site-header').outerHeight();
	  var foot_height = $('footer.ste-footer').outerHeight();
	  var middlecont_height = (win_height -  (foot_height + head_height));
	  $('.middle-content-load').css('min-height', middlecont_height);
	} 
}
initBootstrapTooltip = function (){
   /*------------------ bootstrap tooltips  --------------------------*/
   if($('[data-bs-toggle="tooltip"]').length) {
	 $('[data-bs-toggle="tooltip"]').tooltip();
   }
}
initBootstrapPopover = function (){
   /*------------------ bootstrap tooltips  --------------------------*/
   if($('[data-bs-toggle="popover"]').length) {
	 $('[data-bs-toggle="popover"]').popover();
   }
}
initAccordion = function (){
   /*------------------ accordion custom  --------------------------*/
  jQuery('.accordion-wrap.first-open .accordion-row').eq(0).addClass('open'); 
  jQuery('.accordion-wrap .accordion-row.open .accordion-body').slideDown();
  jQuery('.accordion-wrap .accordion-header .accordion-click').click(function (e) {
	if (!jQuery(this).closest('.accordion-row').hasClass('open')){
	  jQuery('.accordion-wrap .accordion-row.open .accordion-body').slideUp();
	  jQuery('.accordion-wrap .accordion-row.open').removeClass('open');
	  jQuery(this).closest('.accordion-row').addClass('open');
	  jQuery(this).closest('.accordion-row').children('.accordion-body').slideDown();
	}
	else{
	  jQuery(this).closest('.accordion-row').removeClass('open');
	  jQuery(this).closest('.accordion-row').children('.accordion-body').slideUp();
	}
  });
}
initRating = function () {
  /*------------------ rating Rate Yo --------------------------*/
  if ($('[data-rateyo-rating]').length) {
	$('[data-rateyo-rating]').rateYo(
	  // {
	  //   onInit:function (rating,rateYoInstance){},
	  //   onSet:function (rating,rateYoInstance){},
	  //   onChange:function (rating,rateYoInstance){}
	  // }
	);
  }
}
initurlgetiditmoveit = function(){
  var urlHash = window.location.href.split("#")[1]; 
  if(urlHash){ 
	setTimeout(function(){ 
	  var targetposition = Math.floor(($('#'+urlHash).offset().top)-(50)); 
	  $('html').stop().animate({scrollTop:(targetposition)},800);
	 }, 100);
  }
}
initurlgetiditmoveitClick = function(){
  $('[data-targetanimated="true"]').click(function (e) { 
	 var urlHash = $(this).attr('href').split("#")[1];
	 if(urlHash){ 
	   var targetposition = Math.floor(($('#'+urlHash).offset().top)-(50)); 
		$('html').stop().animate({scrollTop:(targetposition)},800);
	}
  });
}
initSelect2 = function(){
  if($('select[data-select2init="true"]').length){
	 $('select[data-select2init="true"]:not(.select2-hidden-accessible)').select2({width:'100%'});
  }
}
initformcontrolcustomfile = function(){
  if($(".form-control-cusotm-file").length){
	$('.form-control-cusotm-file input').change(function() {
	  $(this).closest('.form-control-cusotm-file').find('.fl-txt').text($(this)[0].files[0].name);
	});
  }
}
initmcustomscrollbar = function(){
  if($(".CustomScrollbar").length){
	 $(".CustomScrollbar").mCustomScrollbar({
	  mouseWheel:{ 
		enable: true,
		axis: "Y",
		preventDefault: true, 
		mouseWheelPixels:50,
	  },
	  callbacks:{
		  onTotalScroll:function(){
			 if(typeof onTotalScroll == 'function'){
				onTotalScroll(this);
			 }
		  }
	  }
	 });
  }
}
initmcustomscrollbarX = function(){
  if($(".CustomScrollbarX").length){       
	$(".CustomScrollbarX").mCustomScrollbar({
	  horizontalScroll: true,      
	});        
  }
}

$(".reflow-tbl").reflowTable({autoWidth:767});
$(".reflow-tbl-md").reflowTable({autoWidth:991});    

initformwizard = function(){
  // click on next button
  jQuery('.form-wizard-next-btn').click(function() {
	var parentFieldset = jQuery(this).parents('.wizard-fieldset');
	var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
	var next = jQuery(this);
	var nextWizardStep = true;
	// parentFieldset.find('.wizard-required').each(function(){
	//   var thisValue = jQuery(this).val();

	//   if( thisValue == "") {
	//     jQuery(this).siblings(".wizard-form-error").slideDown();
	//     nextWizardStep = false;
	//   }
	//   else {
	//     jQuery(this).siblings(".wizard-form-error").slideUp();
	//   }
	// });
	if( nextWizardStep) {
	  next.parents('.wizard-fieldset').removeClass("show","400");
	  currentActiveStep.removeClass('active').addClass('activated').next().addClass('active',"400");
	  next.parents('.wizard-fieldset').next('.wizard-fieldset').addClass("show","400");
	  jQuery(document).find('.wizard-fieldset').each(function(){
		if(jQuery(this).hasClass('show')){
		  var formAtrr = jQuery(this).attr('data-tab-content');
		  jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function(){
			if(jQuery(this).attr('data-attr') == formAtrr){
			  jQuery(this).addClass('active');
			  var innerWidth = jQuery(this).innerWidth();
			  var position = jQuery(this).position();
			  jQuery(document).find('.form-wizard-step-move').css({"left": position.left, "width": innerWidth});
			}else{
			  jQuery(this).removeClass('active');
			}
		  });
		}
	  });
	}
  });
  //click on previous button
  jQuery('.form-wizard-previous-btn').click(function() {
	var counter = parseInt(jQuery(".wizard-counter").text());;
	var prev =jQuery(this);
	var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
	prev.parents('.wizard-fieldset').removeClass("show","400");
	prev.parents('.wizard-fieldset').prev('.wizard-fieldset').addClass("show","400");
	currentActiveStep.removeClass('active').prev().removeClass('activated').addClass('active',"400");
	jQuery(document).find('.wizard-fieldset').each(function(){
	  if(jQuery(this).hasClass('show')){
		var formAtrr = jQuery(this).attr('data-tab-content');
		jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function(){
		  if(jQuery(this).attr('data-attr') == formAtrr){
			jQuery(this).addClass('active');
			var innerWidth = jQuery(this).innerWidth();
			var position = jQuery(this).position();
			jQuery(document).find('.form-wizard-step-move').css({"left": position.left, "width": innerWidth});
		  }else{
			jQuery(this).removeClass('active');
		  }
		});
	  }
	});
  });
  //click on form submit button
  jQuery(document).on("click",".form-wizard .form-wizard-submit" , function(){
	var parentFieldset = jQuery(this).parents('.wizard-fieldset');
	var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
	parentFieldset.find('.wizard-required').each(function() {
	  var thisValue = jQuery(this).val();
	  if( thisValue == "" ) {
		jQuery(this).siblings(".wizard-form-error").slideDown();
	  }
	  else {
		jQuery(this).siblings(".wizard-form-error").slideUp();
	  }
	});
  });
  // focus on input field check empty or not
  jQuery(".form-control").on('focus', function(){
	var tmpThis = jQuery(this).val();
	if(tmpThis == '' ) {
	  jQuery(this).parent().addClass("focus-input");
	}
	else if(tmpThis !='' ){
	  jQuery(this).parent().addClass("focus-input");
	}
  }).on('blur', function(){
	var tmpThis = jQuery(this).val();
	if(tmpThis == '' ) {
	  jQuery(this).parent().removeClass("focus-input");
	  jQuery(this).siblings('.wizard-form-error').slideDown("3000");
	}
	else if(tmpThis !='' ){
	  jQuery(this).parent().addClass("focus-input");
	  jQuery(this).siblings('.wizard-form-error').slideUp("3000");
	}
  });
}

/*===========================================
		   All Function End
=============================================*/
/*==============
window  ready 
==================*/
$(window).ready(function (e) {
 $('a,img').on('dragstart', function(event) { event.preventDefault(); });
 initBootstrapTooltip();
 initBootstrapPopover();
 initRating();
 initSelect2();
 initmcustomscrollbar();
 //initmcustomscrollbarX();   
 initUsersidebarToggleclick();
 initurlgetiditmoveit();
 initurlgetiditmoveitClick();
 initAccordion();   
});
/*==========================
window on resize or load
============================*/
$(window).on("resize load",function (e){
initmiddlecontentheightset();
initUsersidebarTogglecheck();
});
/*===========================
  window on load scroll
=============================*/
$(window).on("load scroll",function (e){
initheaderstickyset();
});
/*=================================
  window on load resize scroll
===================================*/
// $(window).on("load resize scroll", function (e) {});


/*-------------------
password show
-------------------*/
$(window).ready(function (e) {
  $("#show_hide_password a").on('click', function(event) {
	event.preventDefault();

	if($('#show_hide_password input').attr("type") == "text"){
	  $('#show_hide_password input').attr('type', 'password');
	  $('#show_hide_password i').addClass( "icon-light-show" );
	  $('#show_hide_password i').removeClass( "icon-light-hide" );

	}else if($('#show_hide_password input').attr("type") == "password"){
	  $('#show_hide_password input').attr('type', 'text');
	  $('#show_hide_password i').removeClass( "icon-light-show" );
	  $('#show_hide_password i').addClass( "icon-light-hide" );

	}
  });
  $("#repeat_password a").on('click', function(event) {
	event.preventDefault();

	if($('#repeat_password input').attr("type") == "text"){
	  $('#repeat_password input').attr('type', 'password');
	  $('#repeat_password i').addClass( "icon-light-show" );
	  $('#repeat_password i').removeClass( "icon-light-hide" );

	}else if($('#repeat_password input').attr("type") == "password"){
	  $('#repeat_password input').attr('type', 'text');
	  $('#repeat_password i').removeClass( "icon-light-show" );
	  $('#repeat_password i').addClass( "icon-light-hide" );

	}
  });

});




jQuery(document).ready(function() {
jQuery(".toogle-btn").click(function(){
  jQuery("body").toggleClass("menu-open");
});
jQuery(".menu nav li a").on("click", function(event) {
 jQuery("body").removeClass("menu-open"); 
});

var header_height = jQuery('header').outerHeight();
var stickyHeader = jQuery('header').offset().top + header_height + 40;
jQuery(window).scroll(function(){
  if( jQuery(window).scrollTop() > stickyHeader ) {
	jQuery('header').addClass('stickyheader');
  } else {
	jQuery('header').removeClass('stickyheader');
  }
});
});


$( document ).ready(function() {

/*  $("#contact_no").CcPicker({ 
  "countryCode":"us",
  //setCountryByPhoneCode: "91", 
  dataUrl: "md-elevated/public/js/data.json",
  searchPlaceHolder: "Find..."
});

$("#contact_no").CcPicker("setCountryByCode","in");*/
$( "#xlargeModel, #largeModel" ).on('shown.bs.modal', function(){
  initmcustomscrollbar();
});


/*-------------- keywords Input-------------*/
$(".keywords-container").each(function() {

  var keywordInput = $(this).find(".keyword-input");
  var keywordsList = $(this).find(".keywords-list");

	// adding keyword
	function addKeyword() {
	  var $newKeyword = $("<span class='keyword'><span class='keyword-text'>"+ keywordInput.val() +"<input name='learning_objectives[]' value='"+ keywordInput.val() +"'/></span><span class='keyword-remove'></span></span>");
	  keywordsList.append($newKeyword).trigger('resizeContainer');
	  keywordInput.val('');
	}

	// add via enter key
	keywordInput.on('keydown', function(e){
	  if(e.keyCode == 13){
		e.preventDefault();
		if(keywordInput.val()!==""){
		  addKeyword();
		}
	  }
	});

	// add via button
	$('.keyword-input-button').on('click', function(){ 
	  if((keywordInput.val()!=="")){
		addKeyword();
	  }
	});

	// removing keyword
	$(document).on("click",".keyword-remove", function(){
	  $(this).parent().addClass('keyword-removed');

	  function removeFromMarkup(){
		$(".keyword-removed").remove();
	  }
	  setTimeout(removeFromMarkup, 500);
	  keywordsList.css({'height':'auto'}).height();
	});


	// animating container height
	keywordsList.on('resizeContainer', function(){
	  var heightnow = $(this).height();
	  var heightfull = $(this).css({'max-height':'auto', 'height':'auto'}).height();

	  $(this).css({ 'height' : heightnow }).animate({ 'height': heightfull }, 200);
	});

	$(window).on('resize', function() {
	  keywordsList.css({'height':'auto'}).height();
	});

	// Auto Height for keywords that are pre-added
	$(window).on('load', function() {
	  var keywordCount = $('.keywords-list').children("span").length;

	  // Enables scrollbar if more than 3 items
	  if (keywordCount > 0) {
		keywordsList.css({'height':'auto'}).height();

	  } 
	});
});
});



jQuery(window).ready(function(e){
	jQuery('.admin-menutoggle').on('click', function(event) {
		jQuery('body').toggleClass('close1');
	});
	
	if($('select[data-select2init="true"]').length){
       $('select[data-select2init="true"]:not(.select2-hidden-accessible)').select2({width:'100%'});
    }
    
    jQuery(".reflow-tbl").reflowTable({autoWidth:767,widthRatio:40});
    jQuery(".reflow-tbl-md").reflowTable({autoWidth:991,widthRatio:40});   

    jQuery('.admin-menutoggle').on('click', function (event) {

	  jQuery('.admin-menutoggle > i').toggleClass('fa-times');

	});
});

jQuery(window).on("resize ready load", function(e) {   
	if($(window).outerWidth() < 1025){
		jQuery('body').addClass('close1');  
	}
});




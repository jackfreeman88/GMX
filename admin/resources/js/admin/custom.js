 function readURL(input) {
          if (input.files && input.files[0]) {
              var reader = new FileReader();
              reader.onload = function(e) {
                  $('#preview_profile').attr('src', e.target.result);
              }
              reader.readAsDataURL(input.files[0]);
          }
      }
 $(document).on('change','#profile_image',function(e){
          readURL(this);
      });
$( document ).ready(function() {
    console.log( "ready!" );
});

if($(window).width() <= 991){  
  $(document).on('click', ".user_chat_list li, .top_chat", function(){
    $("body").addClass('overflow-hidden');
    $("#messages_section").addClass('mob_view');
    $("#messages_section").removeClass('d-none');
    $("#profile_section").addClass('d-none');
  });
  $(document).on('click', ".back_list", function(){
    $("body").removeClass('overflow-hidden');
    $("#messages_section").removeClass('mob_view');
    $("#messages_section").addClass('d-none');
    $("#profile_section").addClass('d-none');
    $(".user_chat_list li").removeClass('active');
    $(".user_chat_list li").css('pointer-events', '');
    $(".top_chat").css('pointer-events', '');
  });

  $(document).on('click', ".back_chat", function(){
    $("body").addClass('overflow-hidden');
    $("#messages_section").addClass('mob_view');
    $("#messages_section").removeClass('d-none');
    $("#profile_section").addClass('d-none');
  });

  $(document).on('click', ".viewProfile", function(){
    $("body").addClass('overflow-hidden');
    $("#messages_section").addClass('d-none');
    $("#profile_section").addClass('mob_view');
    $("#profile_section").removeClass('d-none');
  });
}

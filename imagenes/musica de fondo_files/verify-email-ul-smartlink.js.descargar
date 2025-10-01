var is_captcha = 0;
$(document).ready(function ($)
{
    // event for subscribe for newsletter  ///
    $('.email_to_downloads').on('click', function (e)
    {
        var email_get      = $("#email_address").val().trim();
        var email_name_get = '';
        if($("#email_name").length) {

          email_name_get = $("#email_name").val().trim();
          // 
          if (email_name_get === '')
          {
              $(".name_error_email_name").show();
              $(".name_error_email_name").html('Please enter your name.').parent().addClass('has-error');
              $("#loader").hide();
              return false;

          }else{
            $('div').removeClass('has-error');
            $(".name_error_email_name").html('').hide();
          }
        }
        // 
        if ($("#email_address").val() == '')
        {
            $(".name_error_email").show();
            $(".name_error_email").html('Please enter your email.').parent().addClass('has-error');
            $("#loader").hide();
            return false;

        }
        if ($("#email_address").val() != '')
        {
            var sEmail = $("#email_address").val().trim();
            if (!validateEmail(sEmail))
            {
                $(".name_error_email").show();
                $(".name_error_email").html('Please enter a valid email address.').parent().addClass('has-error');
                $("#loader").hide();
                return false;
            }
        }
        if ($("#email_address").val() != '')
        {
            var sEmail = $("#email_address").val().trim();
            $('div').removeClass('has-error');
            $(".name_error_email").html('');
            $(".name_error_email").hide();
            //$(this).addClass('hy-loading-btn').prop('disabled', true);
            
            if (validateEmail(sEmail))
            {

               /* HYPE-109*/
                
               var email_address = $("#email_address").val();
               var fan_gate_id   =  $("#fan_gate_id").val();
               var iAttemptCount = 0;

               // Check cookie exist and then get the particular fangate email verify attempt
               if ($.cookie('teb3456767win')) {
                   var iAttemptCookie = JSON.parse($.cookie('teb3456767win'));
                   iAttemptCount = iAttemptCookie[fan_gate_id];
               }

            //    $("#modal_close_button_text").addClass('hy-loading-btn')

               // var runEmailVerificationStatus = runEmailVerification();
               runEmailVerification();

               var max_attempsts_value = document.getElementById("captchalog").getAttribute("data-max-attempts");

               // If value of email attempt is equal to 5 then enable google captcha 
               if(iAttemptCount == (max_attempsts_value-1)) {
                  // get sitekey
                  is_captcha = 1;
                  var sitekey = document.getElementById("captchalog").getAttribute("data-sitekey");
                   grecaptcha.render('html_element', {
                   'sitekey' : sitekey,
                   });
               }
               // console.log('runEmailVerificationStatus ' + runEmailVerificationStatus);
               // return runEmailVerificationStatus;
            }
            else
            {
                $(".name_error_email").show();
                $(".name_error_email").html('Please enter a valid email address.').parent().addClass('has-error');
                $("#loader").hide();
                return false;
            }
        }
    });
    
    

});

/* code for google recaptcha */
/* HYPE-109 Revert back */

  $(document).ready(function() {

      var fan_gate_id   =  $("#fan_gate_id").val();
      var max_attempsts_value = document.getElementById("captchalog").getAttribute("data-max-attempts");
      var attempts = document.getElementById("captchalog").getAttribute("data-attempts");
      if ($.cookie('teb3456767win')) {

          var iAttemptCookie = JSON.parse($.cookie('teb3456767win'));
          var iAttemptCount = iAttemptCookie[fan_gate_id];


          $( "#overlay-modal-box" ).on('shown.bs.modal', function (e) {
            setTimeout(function(){

            if( (iAttemptCount && (iAttemptCount >= max_attempsts_value)) || attempts == 'over' ) {
                // get sitekey
                is_captcha = 1;
                var sitekey = document.getElementById("captchalog").getAttribute("data-sitekey"); 
                grecaptcha.render('html_element', {
                'sitekey' : sitekey,
                });
            }

             }, 3000);

          });
      }else if(attempts == 'over' ) {

        $( "#overlay-modal-box" ).on('shown.bs.modal', function (e) {
            setTimeout(function(){
                // get sitekey
                is_captcha = 1;
                var sitekey = document.getElementById("captchalog").getAttribute("data-sitekey"); 
                grecaptcha.render('html_element', {
                'sitekey' : sitekey,
                });

             }, 2000);

          });
      }


  });


function runEmailVerification() {

    var email_address = $("#email_address").val().trim();
    var email_name    = '';
    //var runEmailVerificationStatus = true;
    if($("#email_name").length) {
        email_name    = $("#email_name").val().trim();
    }

    var adcode = '';
    if($("#adcode").length) {
        adcode    = $("#adcode").val().trim();
    }
    var hypesource = '';
    if($("#hypesource").length) {
        hypesource    = $("#hypesource").val().trim();
    }

    var fan_gate_id   = $("#fan_gate_id").val();
    var external_id = jsonSmartLinkData['externID'];
    /* HYPE-109 Revert back */
    if (validateEmail(email_address)) {

        var postData = { validateEmailAddress: email_address, fan_gate_id: fan_gate_id,email_name:email_name,external_id:external_id,adcode:adcode,hypesource:hypesource };

        if (is_captcha == 1) {

            var v = grecaptcha.getResponse();
            if (v.length == 0) {
                $('#html_element').addClass('form-relative has-error');
                $('#error-captcha').remove();
                $('#html_element').append("<div id='error-captcha' class='name_error_email error-msg' style='display: block;'>Please verify that you are not a robot.</div>");
                // runEmailVerificationStatus = false;
            } else {

               $('#error-captcha').remove();

                $.ajax({
                    type: "POST",
                    url: '/verifyEmailAddress',
                    dataType: "json",
                    data: postData,
                    beforeSend: function() {
                        // setting a timeout
                        $("#email_to_downloads_next").addClass('hy-loading-btn');//.removeClass('hy-btn-lightblue');
                        $("#modal_close_button_text").addClass('hy-loading-btn').removeClass('button-primary');//.removeClass('hy-btn-lightblue');
                    },
                    success: function(res) {
                        // console.log(res);
                        if (res.status === 'T') {
                            // H-1256
                            if (typeof openNewSmartLink == 'function') { 
                              openNewSmartLink(res.eventID); 
                            }
                            
                        } else {
                            $(".name_error_email").show();
                            $(".name_error_email").html('Please enter a valid email address.').parent().addClass('has-error');
                            $("#modal_close_button_text").addClass('button-primary').removeClass('hy-loading-btn');
                            // runEmailVerificationStatus = false;
                        }
                    }
                });
            }
        } else {
            $.ajax({
                type: "POST",
                url: '/verifyEmailAddress',
                dataType: "json",
                data: postData,
                beforeSend: function() {
                    // setting a timeout
                    $("#email_to_downloads_next").addClass('hy-loading-btn');//.removeClass('hy-btn-lightblue');
                    $("#modal_close_button_text").addClass('hy-loading-btn').removeClass('button-primary');//.removeClass('hy-btn-lightblue');
                },
                success: function(res) {
                    if (res.status === 'T') {
                        // console.log(res);
                        if (typeof openNewSmartLink == 'function') { 
                          openNewSmartLink(res.eventID); 
                        }
                        // $("#modal_close_button_text").removeClass('hy-loading-btn');
                        
                    } else {
                        $(".name_error_email").show();
                        $(".name_error_email").html('Please enter a valid email address.').parent().addClass('has-error');
                        $("#modal_close_button_text").addClass('button-primary').removeClass('hy-loading-btn');
                        // runEmailVerificationStatus = false;
                    }
                }
            });

        }

        /* HYPE-109 Revert back */
    } else {
        $(".name_error_email").show();
        $(".name_error_email").html('Please enter a valid email address.').parent().addClass('has-error');
        $("#loader").hide();
        grecaptcha.reset();
        // runEmailVerificationStatus = false;
    }
    // return runEmailVerificationStatus;
}

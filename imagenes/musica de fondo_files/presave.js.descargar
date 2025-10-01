var inapp = $("#presavejs").attr("data-inapp");
var inappmobile = $("#presavejs").attr("data-inappmobile");
var isFacebookApp = /FBMD|FBAV|FBAN|Instagram|musical_ly/i.test(navigator.userAgent);
var isiOSWithoutSafari = (navigator.userAgent.match(/iPhone|iPod|iPad/i) && !navigator.userAgent.match(/Safari/i));
var newTheme = $("#presavejs").attr("data-newtheme");
// HYPE-1015
$(document).ready(function(){
  var external_id = jsonSmartLinkData['externID'];
  $('body').on('click','.smartlink-click-button',function(e){
      if (! $(this).hasClass('hype-smart-link-part') && newTheme == 1) {
        e.stopPropagation();
      }
      var link = $(this).data('link');
      var link_id = $(this).data('id');
      var fid = $(this).data('fid');
      var link_type = $(this).data('type');
      var button_type = $(this).data('button_type');
      var preheading = $(this).data('preheading');
      var eventID = 'event.smartclick.'+hyp_generate_token(32);
      var hypesource = $.trim($("#presavejs").data('hypesource'));
      var adcode = $.trim($("#presavejs").data('adcode'));

      if(link_type == 'custom' || link_type == 'fanclub'){
        link_type = $(this).data('button_text');
      }
      console.log("Checking pixel cookie: getCookieHype('tr', 'pixel') =", getCookieHype("tr", "pixel"));
      if (getCookieHype("tr", "pixel") == "yes") {

        // try {
        //     console.log(jsonSmartLinkData['artist_name']);
        //     var custom_facebook_pixel = jsonSmartLinkData['facebook_pixel'];
        //     if ((custom_facebook_pixel !== '') && (custom_facebook_pixel != '0')) {
        //         // console.log('custom_facebook_pixel ' + custom_facebook_pixel);
        //         fbq('init', custom_facebook_pixel,{external_id: external_id});
        //     }    //
        //     fbq('trackCustom', 'Hypeddit Smart Link Click', {
        //       // content_type: 'smart_link_click',
        //       music_service: link_type,
        //       artist_name : jsonSmartLinkData['artist_name'],
        //       title : jsonSmartLinkData['title'],
        //       genre : jsonSmartLinkData['genre'],
        //       call_to_action: button_type,

        //     },{eventID: eventID});
        //     //
        // } catch(e) {
        //   console.log(e.message);
        // }

        try {
          console.log("fbq is defined:", typeof fbq === 'function');
          console.log("Artist Name:", jsonSmartLinkData['artist_name']);

          var custom_facebook_pixel = jsonSmartLinkData['facebook_pixel'];
          console.log("Custom Facebook Pixel:", custom_facebook_pixel);

          if ((custom_facebook_pixel !== '') && (custom_facebook_pixel != '0')) {
              console.log("Initializing Facebook Pixel with ID:", custom_facebook_pixel);
              fbq('init', custom_facebook_pixel, { external_id: external_id });
          } else {
              console.log("No valid Facebook Pixel ID provided.");
          }

          console.log("Tracking 'Hypeddit Smart Link Click' with the following data:");
          console.log("  Music Service:", link_type);
          console.log("  Artist Name:", jsonSmartLinkData['artist_name']);
          console.log("  Title:", jsonSmartLinkData['title']);
          console.log("  Genre:", jsonSmartLinkData['genre']);
          console.log("  Call to Action:", button_type);
          console.log("  Event ID:", eventID);

          fbq('trackCustom', 'Hypeddit Smart Link Click', {
              music_service: link_type,
              artist_name : jsonSmartLinkData['artist_name'],
              title : jsonSmartLinkData['title'],
              genre : jsonSmartLinkData['genre'],
              call_to_action: button_type,
          }, { eventID: eventID });

          console.log("Pixel event successfully sent.");

        } catch(e) {
            console.error("Error during Facebook Pixel tracking:", e.message);
        }

        try {
            //
            var data = [{
                        content_type:'product',
                        content_name:'Hypeddit Smart Link Click',
                        content_id  :eventID
                      }];
            ttq.track('ClickButton',{contents:data},{event_id:eventID});
        } catch(e) {
          console.log(e.message);
        }

        try {
            snapchat_event_name = 'VIEW_CONTENT';
            snapchat_event_tag = 'Hypeddit Smart Link Click';
            snaptr('track', snapchat_event_name, {'event_name':snapchat_event_name, 'event_tag':snapchat_event_tag, 'event_id':eventID, 'client_dedup_id':eventID});
        } catch(e) {
            console.log(e.message);
        }

        if(jsonSmartLinkData['google_pixel'] && jsonSmartLinkData['google_pixel_label']){ 
          gtag_report_conversion(); 
        }
      }

      $.ajax({
          type: "POST",
          url: '/smartlink/clicked',
          dataType: "json",
          data: {'link_id':link_id,'link_type':link_type,'button_text':button_type,'eventID':eventID,'external_id':external_id,'smartlinkclick_isajax':1,'hypesource':hypesource,'adcode':adcode},
          success: function(res) {
              if(res.success == '1'){
                  return true;
              }
          },
          error: function() {
              return false;
          }
      });
      // 
      if($(this).hasClass('fan_club') || $(this).hasClass('fan_club_always')) {
        // 
        $("#fanclubLink").val(link);
        $("#fanclubLinkId").val(link_id);
        $("#fanclubLinkType").val(link_type);
        // 
        if(link == '' || link == undefined) {
          $("#fanclubCaptureModalClosex, #fanclubCaptureModalCloseLink, #modal_close_button_text")
          .attr('href', 'javascript:void(0)')
          .attr('target', '_self');
          // 
          $("#preheading").addClass('hide');
        }else{
          $("#fanclubCaptureModalClosex, #fanclubCaptureModalCloseLink, #modal_close_button_text").attr('href', link).attr('target', '_blank');
          if(preheading != '' || preheading != undefined) {
              $("#preheading").removeClass('hide').text('WAIT! Before you ' + preheading + '…' );
            }else{
              $("#preheading").addClass('hide').text();
            }
        }
        // 
        $('#fanclubCaptureModal').modal({show: 'true', backdrop: 'static', keyboard: false});
        // 
        $(".smartlink-click-button").each(function(){
          if($(this).data('button_type')!='PRE-SAVE' && $(this).data('button_type')!='PRE-ADD' && $(this).data('button_type')!='SAVE'){
            $(this).removeClass('fan_club').attr('href', $(this).data('link')).attr('target', '_blank');  
          }
        })
        return false;
      }
  });
  // 
  
  $("#fanclubCaptureModalClosex, #fanclubCaptureModalCloseLink").click(function(){
      $("#fanclubCaptureModal").modal('hide');
  })
  
  $('body').on('click','.smartlink-click-save-button',function(e){
      e.stopPropagation()
      var link = $(this).data('link');
      var link_id = $(this).data('id');
      var link_type = $(this).data('type');
      var button_type = $(this).data('button_type');
      var preheading = $(this).data('preheading');
      if(link_type == 'deezer'){
        $('#deezer-authentication-modal-popup').modal({show: 'true',backdrop: 'static',keyboard: false});
      }
      if(link_type == 'spotify'){
        $('#spotify-authentication-modal-popup').modal({show: 'true',backdrop: 'static',keyboard: false});
      }
      if(link_type == 'imusic'){
        $('#applemusic-authentication-modal-popup').modal({show: 'true',backdrop: 'static',keyboard: false});
      }
      
  });

  $('body').on('click','.add-to-playlist',function(e){
        var call_to_button = $(this).data('call_to_button');
        // console.log(call_to_button);
        // console.log(PresaveId);
        
        addtolibrary(PresaveId,call_to_button);
  });


  $('body').on('click','#presave_play',function(e){
    $('#presave_play').toggleClass('move-bottom');
    $('#presave_buttons').show().toggleClass('move-bottom-now');
  });

  if ( navigator.userAgent.match(/FBMD/i) || navigator.userAgent.match(/FBAV/i) || navigator.userAgent.match(/FBAN/i) || navigator.userAgent.match(/Instagram/i) || navigator.userAgent.match(/musical_ly/i))
  {
    var hash = window.location.hash;
    if(hash){
      musicAuthorize();
    }
  }

});

var PresaveId;
function savetolibrary(call_on_action, referral = null){
  
  try {
      if(jsonSmartLinkData['presave']==1){
          var str = 'presave';var str1 = 'Pre-Save';
      }else{
          var str = 'save';var str1 = 'Save';
      }
      var eventID = 'event.'+str+'.'+hyp_generate_token(32);
      var external_id = jsonSmartLinkData['externID'];
      var custom_facebook_pixel = jsonSmartLinkData['facebook_pixel'];

      if (getCookieHype("tr", "pixel") == "yes") {
        if ((custom_facebook_pixel !== '') && (custom_facebook_pixel != '0')) {
            // console.log('custom_facebook_pixel ' + custom_facebook_pixel);
            fbq('init', custom_facebook_pixel,{external_id: external_id});
        }
        fbq('trackCustom', 'Hypeddit Smart Link '+str1, {
          // content_type: 'smart_link_click',
          music_service: call_on_action,
          artist_name : jsonSmartLinkData['artist_name'],
          title : jsonSmartLinkData['title'],
          genre : jsonSmartLinkData['genre'],
          call_to_action: 'save',
        },{eventID: eventID});
      }

      if (getCookieHype("tr", "pixel") == "yes") {
          try {
              var data = [{
                content_type:'product',
                content_name:'Hypeddit Smart Link '+str1,
                content_id  :eventID
              }];
              ttq.track('ClickButton',{contents:data},{event_id:eventID});
          } catch(e) {
            console.log(e.message);
          }

          try {
              snapchat_event_name = 'VIEW_CONTENT';
              snapchat_event_tag = 'Hypeddit Smart Link '+str1;
              snaptr('track', snapchat_event_name, {'event_name':snapchat_event_name, 'event_tag':snapchat_event_tag, 'event_id':eventID, 'client_dedup_id':eventID});
          } catch(e) {
              console.log(e.message);
          }
      }
         

  } catch(e) {}
  
  try {
      AjaxURL = '/smartlink/save';
      future_email = 0;
      var hypesource = $.trim($("#presavejs").data('hypesource'));
      var adcode = $.trim($("#presavejs").data('adcode'));
      var additional_sp_array = new Array();
      var lifetime_fan = 0;
      if(call_on_action == 'spotify'){
        $('input[name="additional_sp_user_id[]"]').each(function() {
            additional_sp_array.push($(this).val());
        });
        add_to_playlist = jsonSmartLinkData['sp_add_to_playlist'];
        redirection = jsonSmartLinkData['sp_redirection'];

        if($('input[name="future_email_sp"]').is(':checked')){
          future_email = $('input[name="future_email_sp"]').val();
        }
        if($('input[name="lifetime_fan_sp"]').is(':checked')){
          lifetime_fan = $('input[name="lifetime_fan_sp"]').val();
        }
      }

      var additional_dz_array = new Array();
      var additional_dz_type_array = new Array();
      if(call_on_action == 'deezer'){
        $('input[name="additional_dz_user_id[]"]').each(function() {
            additional_dz_array.push($(this).val());
            additional_dz_type_array.push($(this).data('profile_type'));
        });
        add_to_playlist = jsonSmartLinkData['dz_add_to_playlist'];
        redirection = jsonSmartLinkData['dz_redirection'];

        if($('input[name="future_email_dz"]').is(':checked')){
          future_email = $('input[name="future_email_dz"]').val();
        }
        if($('input[name="lifetime_fan_dz"]').is(':checked')){
          lifetime_fan = $('input[name="lifetime_fan_dz"]').val();
        }
      }

      var additional_ap_array = new Array();
      var additional_ap_type_array = new Array();
      if(call_on_action == 'imusic'){
        $('input[name="additional_ap_user_id[]"]').each(function() {
            additional_ap_array.push($(this).val());
            additional_ap_type_array.push($(this).data('profile_type'));
        });
        add_to_playlist = jsonSmartLinkData['ap_add_to_playlist'];
        redirection = jsonSmartLinkData['ap_redirection'];
        if($('input[name="lifetime_fan_ap"]').is(':checked')){
          lifetime_fan = $('input[name="lifetime_fan_ap"]').val();
        }
      }

      var isArtistPage = $("#isArtistPage").val();
      
      playlist_id  = '';
      playlist_name  = '';
        
      var postData = {
          uid:jsonSmartLinkData['uid'],
          additional_sp_user_id : additional_sp_array,
          additional_dz_user_id : additional_dz_array,
          additional_dz_type_array : additional_dz_type_array,
          additional_ap_user_id : additional_ap_array,
          additional_ap_type_array : additional_ap_type_array,
          future_email :future_email,
          lifetime_fan :lifetime_fan,
          playlist_id :playlist_id,
          playlist_name:playlist_name,
          social_type:'pre-save',
          call_on_action:call_on_action,
          eventID: eventID,
          external_id:external_id,
          hypesource:hypesource,
          adcode:adcode
      };
      
      // Check if referral exists and add it to postData
      if (typeof referral !== 'undefined' && referral !== null) {
        postData.referral = referral;
      }
      
      $.ajax({
          type: "POST",
          url: AjaxURL,
          dataType: "json",
          data: postData,
          success: function (response) {
              if(add_to_playlist == 0 && isArtistPage != 1){
                $.notify(jsonSmartLinkData['title'] +' will be added to your music library', {pos: 'top-right'});
                if(redirection){
                   window.open(redirection, "_blank") || window.location.replace(redirection);
                   // window.location= redirection;
                }
              }
              if (isArtistPage == 1 && response.follow && response.follow == 1) {
                $.notify(jsonSmartLinkData['artist_name'] +' was followed', {pos: 'top-right'});
              }
              PresaveId = response.oDownloadAccountPresaveId;
            },
          error: function() {
              console.log('error');
          }
      });
  } catch (ee) {
     console.log(ee.message);
  }
}

function addtolibrary(PresaveId,call_to_button){
  $('.add-to-playlist').addClass('hy-loading-btn').attr('disabled',true);
  //playlist_count = $.trim($("#playlist_id").val());
  
  //console.log($(".sppage:checked").val());
  // ajax to update games visits 
  try {
      if(jsonSmartLinkData['presave']==1){
          var str = 'presave';var str1 = 'Pre-Save';
      }else{
          var str = 'save';var str1 = 'Save';
      }
      var eventID = 'event.'+str+'.'+hyp_generate_token(32);
      var external_id = jsonSmartLinkData['externID'];
      var custom_facebook_pixel = jsonSmartLinkData['facebook_pixel'];

      if (getCookieHype("tr", "pixel") == "yes") {
        if ((custom_facebook_pixel !== '') && (custom_facebook_pixel != '0')) {
            // console.log('custom_facebook_pixel ' + custom_facebook_pixel);
            fbq('init', custom_facebook_pixel,{external_id: external_id});
        }
        fbq('trackCustom', 'Hypeddit Smart Link '+str1, {
          // content_type: 'smart_link_click',
          music_service: call_to_button,
          artist_name : jsonSmartLinkData['artist_name'],
          title : jsonSmartLinkData['title'],
          genre : jsonSmartLinkData['genre'],
          call_to_action: 'add-to-playlist',

        },{eventID: eventID});
      }

  } catch(e) {}

  if (getCookieHype("tr", "pixel") == "yes") {
    try {
        var data = [{
          content_type:'product',
          content_name:'Hypeddit Smart Link '+str1,
          content_id  :eventID
        }];
        ttq.track('ClickButton',{contents:data},{event_id:eventID});
    } catch(e) {
      console.log(e.message);
    }

    try {
        snapchat_event_name = 'VIEW_CONTENT';
        snapchat_event_tag = 'Hypeddit Smart Link '+str1;
        snaptr('track', snapchat_event_name, {'event_name':snapchat_event_name, 'event_tag':snapchat_event_tag, 'event_id':eventID, 'client_dedup_id':eventID});
    } catch(e) {
        console.log(e.message);
    }
  }

  try {
      AjaxURL = '/smartlink/presave';
      
      if(call_to_button == 'spotify'){
          playlist_id  = $.trim($("#playlist_id").val());
          playlist_name  = $.trim($("#playlist_name").val());
          redirection = jsonSmartLinkData['sp_redirection'];
      }

      if(call_to_button == 'deezer'){
          playlist_id  = $.trim($("#deezer_playlist_id").val());
          playlist_name  = $.trim($("#deezer_playlist_name").val());
          redirection = jsonSmartLinkData['dz_redirection'];
      }

      if(call_to_button == 'imusic'){
          playlist_id  = $.trim($("#applemusic_playlist_id").val());
          playlist_name  = $.trim($("#applemusic_playlist_name").val());
          redirection = jsonSmartLinkData['ap_redirection'];
      }
      
      
      if(playlist_id !== '' || playlist_name !== ''){  
        var postData = {
            uid:jsonSmartLinkData['uid'],
            playlist_id :playlist_id,
            playlist_name:playlist_name,
            social_type:'pre-save-spotify',
            PresaveId:PresaveId,
            call_to_button:call_to_button,
            eventID: eventID,
            external_id:external_id
        };
        
        $.ajax({
            type: "POST",
            url: AjaxURL,
            dataType: "json",
            data: postData,
            success: function (response) {
                //console.log('response');
                if(call_to_button == 'spotify'){
                    $("#spotify-authentication-success-modal-popup").modal('hide');
                }
                if(call_to_button == 'deezer'){
                    $("#deezer-authentication-success-modal-popup").modal('hide');
                }
                if(call_to_button == 'imusic'){
                    $("#applemusic-authentication-success-modal-popup").modal('hide');
                }
                $('.add-to-playlist').removeClass('hy-loading-btn').attr('disabled',false);
                //$.notify('Authentication Successfully', {pos: 'top-right'});
                if(playlist_id != '' || playlist_name != ''){
                  $.notify(jsonSmartLinkData['title'] +' will be added to music library', {pos: 'top-right'});
                }
                if(redirection){
                   // window.location= redirection;
                   window.open(redirection, "_blank") || window.location.replace(redirection);

                }
            },
            error: function() {
                console.log('success');
            }
        });
      }else{
        if(call_to_button == 'spotify'){
            $("#spotify-authentication-success-modal-popup").modal('hide');
        }
        if(call_to_button == 'deezer'){
            $("#deezer-authentication-success-modal-popup").modal('hide');
        }
        if(call_to_button == 'imusic'){
            $("#applemusic-authentication-success-modal-popup").modal('hide');
        }
        $('.add-to-playlist').removeClass('hy-loading-btn').attr('disabled',false);
        if(redirection){
           // window.location= redirection;
           window.open(redirection, "_blank") || window.location.replace(redirection);

        }
      }
  } catch (ee) {
     console.log(ee.message);
  }
}
// 
function openNewSmartLink(eventID=null) {
  try {
      var custom_facebook_pixel = jsonSmartLinkData['facebook_pixel'];
      var external_id = jsonSmartLinkData['externID'];

      if (getCookieHype("tr", "pixel") == "yes") {
        if ((custom_facebook_pixel !== '') && (custom_facebook_pixel != '0')) {
            // console.log('custom_facebook_pixel ' + custom_facebook_pixel);
            fbq('init', custom_facebook_pixel,{external_id: external_id});
        }
        fbq('trackCustom', 'Hypeddit Smart Link Email Capture', {
            //content_type: 'smart_link_email_capture'
            artist_name : jsonSmartLinkData['artist_name'],
            title : jsonSmartLinkData['title'],
            genre : jsonSmartLinkData['genre'],
        },{eventID: eventID});
      }

  } catch(e) {console.log(e.message);}

  if (getCookieHype("tr", "pixel") == "yes") {
    try {
        var data = [{
          content_type:'product',
          content_name:'Hypeddit Smart Link Email Capture',
          content_id  :eventID
        }];
        ttq.track('ClickButton',{contents:data},{event_id:eventID});
    } catch(e) {
      console.log(e.message);
    }

    try {
        snapchat_event_name = 'VIEW_CONTENT';
        snapchat_event_tag = 'Hypeddit Smart Link Email Capture',
        snaptr('track', snapchat_event_name, {'event_name':snapchat_event_name, 'event_tag':snapchat_event_tag, 'event_id':eventID, 'client_dedup_id':eventID});
    } catch(e) {
        console.log(e.message);
    }
  }

  $("#fanclubCaptureModal").modal('hide'); 
  
  var redirectLink = $("#fanclubLink").val();
  if( redirectLink != '' ) {
    window.open(redirectLink, "_blank") || window.location.replace(redirectLink);
  }
}
// 
$('#fanclubCaptureModal').on('hidden.bs.modal', function () {
    $("#email_name, #email_address").val('');
    $("#modal_close_button_text").removeClass('hy-loading-btn').addClass('button-primary')
    // is_captcha=0;
    try {
      grecaptcha.reset();
    } catch(e) {}
});


$("#apple-music-authorize").click(function () {
    //console.log('click');
    musicAuthorize();
});
function musicAuthorize() {
  //console.log('after click');
  MusicKit.configure({
      developerToken: jsonSmartLinkData['token'],
      app: {
          name: "Hypeddit",
          icon: "https://hypeddit.com/images/hype-icon-76x76.jpg",
          build: "1"
      }
  });

  let music = MusicKit.getInstance();
  music.authorize().then(() => {
      var token = music.musicUserToken;
      var html = '';
      if (typeof token !== typeof undefined && token != '') {
        AjaxURL = '/smartlink/getplaylists';
        $.ajax({
            type: "POST",
            url: AjaxURL,
            dataType: "json",
            data: {
                      token :token,
            },
            success: function (response) {
                //console.log('response');
                if ( navigator.userAgent.match(/FBMD/i) || navigator.userAgent.match(/FBAV/i) || navigator.userAgent.match(/FBAN/i) || navigator.userAgent.match(/Instagram/i) || navigator.userAgent.match(/musical_ly/i))
                {
                    uid  = jsonSmartLinkData['uid'];
                    if(jsonSmartLinkData['ap_add_to_playlist'] == 1){
                        // url = "/link/"+uid+"?inapp=true&call_on_action=imusic&playlist=1";
                        url = pUrl+"?inapp=true&call_on_action=imusic&playlist=1";
                    }else{
                        // url = "/link/"+uid+"?inapp=true&call_on_action=imusic&playlist=0";
                        url = pUrl+"?inapp=true&call_on_action=imusic&playlist=0";
                    }
                    window.location.href = url;
                }else{
                  if(response.get_playlist_status == true){
                    savetolibrary('imusic');
                    $('#applemusic-authentication-modal-popup').modal('hide');
                    //console.log(jsonSmartLinkData['ap_add_to_playlist']);
                    if(jsonSmartLinkData['ap_add_to_playlist'] == 1){
                      
                      var res = response.data;
                      var result = res.data;
                      //console.log(result);
                      html +='';
                      if(result.length > 0){
                          count =0;
                          $.each(result, function( index, value ) {
                              //console.log(value.attributes.canEdit);   
                              if(value.attributes.canEdit== true){
                                  count++;
                              }
                          });
                          if(count>0){
                              html += '<div class="select">';
                              html += '<select id="applemusic_playlist_id" name="applemusic_playlist_id" class="form-control selectpicker" data-live-search="true" data-size="5">';
                              html += '<option value="">Select playlist or leave blank to skip</option>';
                              $.each(result, function( index, value ) {
                                  if(value.attributes.canEdit == true){
                                      html += '<option value ="'+value.id+'">'+value.attributes.name+'</option>';
                                  }
                              });
                              html += '</div>';
                                  
                          }else{
                              html += '<div class="select">';
                              html +='<input name="applemusic_playlist_name" id="applemusic_playlist_name" type="text" autocomplete="nope" placeholder="Give your new playlist a name" tabindex="0" class="form-control">';
                              html += '</div>';
                          }   
                      }else{
                          html += '<div class="select">';
                          html +='<input name="applemusic_playlist_name" id="applemusic_playlist_name" type="text" autocomplete="nope" placeholder="Give your new playlist a name" tabindex="0" class="form-control">';
                          html += '</div>';
                      }
                      $('#applemusic-authentication-success-modal-popup').modal({show: 'true',backdrop: 'static',keyboard: false});
                      $('#applemusic-playlist-data').html(html);
                      $('#applemusic_playlist_id').selectpicker('refresh');      
                    }
                  }
                }
            },
            error: function() {
              console.log('success');
            }
        });
      }
  });
}

if(jsonSmartLinkData['inapp'] == "true" && jsonSmartLinkData['playlist']== 0){
  if (isFacebookApp || inapp == true || isiOSWithoutSafari) {
      window.onload = function ()
      {   
          savetolibrary(jsonSmartLinkData['call_on_action'], jsonSmartLinkData['referral']);
      }
  }
}
if(jsonSmartLinkData['inapp'] == "true" && jsonSmartLinkData['playlist']== 1){
  if (isFacebookApp || inapp == true || isiOSWithoutSafari) {
    window.onload = function ()
    {
      savetolibrary(jsonSmartLinkData['call_on_action'], jsonSmartLinkData['referral']);
        if(jsonSmartLinkData['call_on_action'] == 'imusic'){
            $("#applemusic-authentication-success-modal-popup").modal({show: 'true'});
        }else{
            $('#'+jsonSmartLinkData['call_on_action']+'-authentication-success-modal-popup').modal({show: 'true'});
        }
    } 
  }  
}
function hyp_generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}
var newWindow = "";
function spotifyURL(url, title, w, h) {
  if(inappmobile){
    $("#dialog-action").removeClass('hide');
  }
  // Fixes dual-screen position Most browsers Firefox
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
  var dualScreenTop =  window.screenTop != undefined ? window.screenTop : screen.top;
  width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop;
  newWindow = window.open(url, title, "scrollbars=yes, width=" + w +", height=" + h +", top=" + top + ", left=" +left);

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
}
  
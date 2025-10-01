// hype cookie

$(document).ready(function () {

    hyDeleteBlockedCookies();

    setTimeout(hyDeleteBlockedCookies, 4000); // Adjust the delay time as needed

});

var cookieConsoleLog = false;

function revisitHypeCookieConsent() {

    var hypeCookie = getHypeCookie();

    if (cookieConsoleLog) { console.log('revisitHypeCookieConsent: hypeCookie: '+hypeCookie); }

    if (hypeCookie.includes('an:no')) {

        if (cookieConsoleLog) { console.log('revisitHypeCookieConsent: an:no'); }

        $("#cookie_hype_category_analytics").attr('checked', false);
    } else {

        if (cookieConsoleLog) { console.log('revisitHypeCookieConsent: an:yes'); }

        $("#cookie_hype_category_analytics").prop('checked', true);
    }
    if (hypeCookie.includes('tr:no')) {

        if (cookieConsoleLog) { console.log('revisitHypeCookieConsent: tr:no'); }

        $("#cookie_hype_category_tracking").attr('checked', false);
    } else {

        if (cookieConsoleLog) { console.log('revisitHypeCookieConsent: tr:yes'); }

        $("#cookie_hype_category_tracking").prop('checked', true);
    }

    hyckySidebarOpenCookie();
};

function revisitHypeCookieConsentOptIn() {

    var hypeCookie = getHypeCookie();

    if (cookieConsoleLog) { console.log('revisitHypeCookieConsentOptIn: hypeCookie: '+hypeCookie); }

    if (hypeCookie.includes('action:yes')) {

        if (cookieConsoleLog) { console.log('revisitHypeCookieConsentOptIn: action:yes'); }

        $("#cookie_hype_category_action").prop('checked', true);
    } else {

        if (cookieConsoleLog) { console.log('revisitHypeCookieConsentOptIn: action:no'); }

        $("#cookie_hype_category_action").attr('checked', false);
    }

    hyckySidebarOpenOptIn();
};



function acceptAllHypeCookie() {

    if (cookieConsoleLog) { console.log('acceptAllHypeCookie'); }

    $("#cookie_hype_category_analytics").prop('checked', true);
    $("#cookie_hype_category_tracking").prop('checked', true);

    if ($("#cookie_hype_category_tracking").is(':checked')) {
        if (cookieConsoleLog) { console.log('acceptAllHypeCookie:tracking checked: on'); }
    }
    if ($("#cookie_hype_category_analytics").is(':checked')) {
        if (cookieConsoleLog) { console.log('acceptAllHypeCookie:tracking checked: on'); }
    }

    var hypeCookie = getHypeCookie();

    if (cookieConsoleLog) { console.log('acceptAllHypeCookie:cookie: '+ hypeCookie); }

    var consentId = getHypeConsentIdFromCookie(hypeCookie);

    hypeCookie = 'consentid:' + consentId + ',consent:yes,action:no,an:yes,tr:yes';

    setHypeCookie(hypeCookie);

    $('.hype-cookie-close-modal').click();
}

function rejectAllHypeCookie() {

    $("#cookie_hype_category_analytics").attr('checked', false);
    $("#cookie_hype_category_tracking").attr('checked', false);

    if (cookieConsoleLog) { console.log('rejectAllHypeCookie'); }

    var hypeCookie = getHypeCookie();

    if (cookieConsoleLog) { console.log('rejectAllHypeCookie:cookie: '+ hypeCookie); }

    var consentId = getHypeConsentIdFromCookie(hypeCookie);

    if (cookieConsoleLog) { console.log('rejectAllHypeCookie:consentId: '+ consentId); }

    hypeCookie = 'consentid:' + consentId + ',consent:no,action:yes,an:no,tr:no';

    setHypeCookie(hypeCookie);

    $('.hype-cookie-close-modal').click();
}

function saveAllHypeCookie() {

    if (cookieConsoleLog) { console.log('saveAllHypeCookie'); }

    var hypeCookie = getHypeCookie();

    if (cookieConsoleLog) { console.log('saveAllHypeCookie:cookie: '+ hypeCookie); }

    var consentId = getHypeConsentIdFromCookie(hypeCookie);

    if (cookieConsoleLog) { console.log('saveAllHypeCookie:consentId: '+ consentId); }

    if ($("#cookie_hype_category_analytics").is(':checked')) {
        if (hypeCookie.includes('an:')) {
            hypeCookie = hypeCookie.replace('an:no','an:yes');
        } else {
            hypeCookie = hypeCookie + ',an:yes';
        }
    } else {
        if (hypeCookie.includes('tr:')) {
            hypeCookie = hypeCookie.replace('an:yes','an:no');
        } else {
            hypeCookie = hypeCookie + ',an:no';
        }
    }

    if ($("#cookie_hype_category_tracking").is(':checked')) {
        if (hypeCookie.includes('tr:')) {
            hypeCookie = hypeCookie.replace('tr:no','tr:yes');
        } else {
            hypeCookie = hypeCookie + ',tr:yes';
        }
    } else {
        if (hypeCookie.includes('tr:')) {
            hypeCookie = hypeCookie.replace('tr:yes','tr:no');
        } else {
            hypeCookie = hypeCookie + ',tr:no';
        }
    }

    if (hypeCookie.includes('an:no') && hypeCookie.includes('tr:no')) {
        hypeCookie = hypeCookie.replace('consent:yes','consent:no');
        hypeCookie = hypeCookie.replace('action:no','action:yes');
    } else {
        hypeCookie = hypeCookie.replace('consent:no','consent:yes');
        hypeCookie = hypeCookie.replace('action:yes','action:no');
    }

    setHypeCookie(hypeCookie);

    $('.hype-cookie-close-modal').click();
}

function saveOptInHypeCookie() {

    if (cookieConsoleLog) { console.log('saveOptInHypeCookie'); }

    var hypeCookie = getHypeCookie();

    if (cookieConsoleLog) { console.log('saveOptInHypeCookie:cookie: '+ hypeCookie); }

    var consentId = getHypeConsentIdFromCookie(hypeCookie);

    if (cookieConsoleLog) { console.log('saveOptInHypeCookie:consentId: '+ consentId); }

    if ($("#cookie_hype_category_action").is(':checked')) {
        if (hypeCookie.includes('action:')) {
            hypeCookie = hypeCookie.replace('action:no','action:yes');
        } else {
            hypeCookie = hypeCookie + ',action:yes';
        }
        hypeCookie = hypeCookie.replace('an:yes','an:no');
        hypeCookie = hypeCookie.replace('tr:yes','tr:no');
    } else {
        if (hypeCookie.includes('tr:')) {
            hypeCookie = hypeCookie.replace('action:yes','action:no');
        } else {
            hypeCookie = hypeCookie + ',action:no';
        }
        hypeCookie = hypeCookie.replace('an:no','an:yes');
        hypeCookie = hypeCookie.replace('tr:no','tr:yes');
    }

    if (hypeCookie.includes('an:no') && hypeCookie.includes('tr:no')) {
        hypeCookie = hypeCookie.replace('consent:yes','consent:no');
        hypeCookie = hypeCookie.replace('action:no','action:yes');
    } else {
        hypeCookie = hypeCookie.replace('consent:no','consent:yes');
        hypeCookie = hypeCookie.replace('action:yes','action:no');
    }

    setHypeCookie(hypeCookie);

    $('.hype-cookie-close-modal').click();
}

function cancelOptInHypeCookie() {

    if (cookieConsoleLog) { console.log('cancelOptInHypeCookie'); }

    $('.hype-cookie-close-modal').click();
}

function resetHypeCookieCategory(category, value) {
    var hypeCookie = getHypeCookie();

    var consentId = getHypeConsentIdFromCookie(hypeCookie);

    var checkcategoryStr = category+":"+value;
    if (hypeCookie.includes(category+':')) {
        hypeCookie = hypeCookie.replace(category+':yes',checkcategoryStr);
        hypeCookie = hypeCookie.replace(category+':no',checkcategoryStr);
    } else {
        hypeCookie = hypeCookie + ',' + category + ':' + value;
    }

    setHypeCookie(hypeCookie);
}

function getHypeConsentIdFromCookie(hypeCookie) {

    if (cookieConsoleLog) { console.log('getHypeConsentIdFromCookie: '+ hypeCookie); }

    var consentId = '';
    try {
        var hypeCookieArr = hypeCookie.split(",");
        var hypeCookieConsentArr = hypeCookieArr[0].split(":");
        if (hypeCookieConsentArr[0] == 'consentid' && hypeCookieConsentArr[1] != '') {
            consentId = hypeCookieConsentArr[1];
        }
    } catch (e) {
    }
    return consentId;
}

function getHypeCookie() {

    var cookieFound = getHypeCookieFull('cookiehype-consent');
    if (cookieFound == '') {
        return 'consentid:' + generateHypeCookieGuid() + ',consent:yes,action:no,an:yes,tr:yes';
    } else {
        return cookieFound;
    }

};

function setHypeCookie(hypeCookie) {

    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = "cookiehype-consent=" + hypeCookie + ";" + expires + ";path=/";

    if (cookieConsoleLog) { console.log('setHypeCookie: '+ hypeCookie); }

    // ajax call to save token
    try {
        $.ajax({
            type: "POST",
            url: "/storehypecookie",
            dataType: "json",
            data: { "cookie":  hypeCookie},
            success: function (result) {},
        });
    } catch(e) {
    }

};

function generateHypeCookieGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getHypeCookieFull(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

function getHypeCookieByKey(key) {

    try {
        const cookies = document.cookie
            .split(";")
            .reduce(
                (ac, cv, i) =>
                    Object.assign(ac, { [cv.split("=")[0].trim()]: cv.split("=")[1] }),
                {}
            )["cookiehype-consent"];
        const { [key]: value } = cookies
            .split(",")
            .reduce(
                (obj, pair) => (
                    (pair = pair.split(":")), (obj[pair[0]] = pair[1]), obj
                ),
                {}
            );
        return value;
    } catch (error) {
        console.log(error);
        return "yes";
    }

}


function hyckyShowMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("showmore");
  var btnText = document.getElementById("showmorebtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Show more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Show less"; 
    moreText.style.display = "inline";
  }
}


function hyckySidebarOpenCookie() {
    document.getElementById("SidebarCookie").style.display = "block";
    document.getElementById("SidebarOverlayCookie").style.display = "block";
    document.getElementById("SidebarOptIn").style.display = "none";
    document.getElementById("SidebarOverlayOptIn").style.display = "none";
}

function hyckySidebarOpenOptIn() {
    document.getElementById("SidebarCookie").style.display = "none";
    document.getElementById("SidebarOverlayCookie").style.display = "none";
    document.getElementById("SidebarOptIn").style.display = "block";
    document.getElementById("SidebarOverlayOptIn").style.display = "block";
}

function hyckySidebarClose() {
    document.getElementById("SidebarCookie").style.display = "none";
    document.getElementById("SidebarOverlayCookie").style.display = "none";
    document.getElementById("SidebarOptIn").style.display = "none";
    document.getElementById("SidebarOverlayOptIn").style.display = "none";
}

function hyDeleteCookie(cookieName) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname; // Deleting with current domain
    if (cookieConsoleLog) {
        console.log('hyDeleteCookie: deleted: '+cookieName);
        console.log('hyDeleteCookie: cookie: '+document.cookie);
    }

    // remove subdomain
    try {
        var sHostname = window.location.hostname
        var domian = sHostname.replace(/^[^.]+\./g, "");
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + domian;
    } catch (error) {
        
    }
}

function hyDeleteBlockedCookies() {

    if (cookieConsoleLog) { console.log('hyDeleteBlockedCookies'); }

    var blockedCookiesAn = ['_gcl_au', '_scid', '_scid_r', '_sctr', '_ga'];
    var blockedCookiesAnPrefixes = ['_gcl_', '_scid_',  '_ga_'];
    var blockedCookiesTr = ['_fbp', '_fbc', '_hjSessionUser_', '_hjSession_'];
    var blockedCookiesTrPrefixes = ['_fbp_', 'fbsr_', '_hjSessionUser_', '_hjSession_'];

    var hypeCookie = getHypeCookie();

    if (cookieConsoleLog) { console.log('hyDeleteBlockedCookies: getHypeCooke: '+hypeCookie); }

    if (hypeCookie.includes('an:no') || hypeCookie.includes('tr:no')) {

        var cookiesList = document.cookie.split(';');
        cookiesList.forEach(function(cookie) {
            var cookieName = cookie.split('=')[0].trim();

            if ((hypeCookie.includes('an:no')) && (blockedCookiesAn.includes(cookieName))) {
                hyDeleteCookie(cookieName);
                if (cookieConsoleLog) { console.log('hyDeleteBlockedCookies: deleted an: '+cookieName); }
            }
            if (hypeCookie.includes('an:no') && blockedCookiesAnPrefixes) {
                blockedCookiesAnPrefixes.forEach(function(prefix) {
                    if (cookieName.indexOf(prefix) === 0) {
                        hyDeleteCookie(cookieName);
                        if (cookieConsoleLog) { console.log('hyDeleteBlockedCookies: deleted an: ' + cookieName); }
                    }
                });
            }
            if ((hypeCookie.includes('tr:no')) && (blockedCookiesTr.includes(cookieName))) {
                hyDeleteCookie(cookieName);
                if (cookieConsoleLog) { console.log('hyDeleteBlockedCookies: deleted tr: '+cookieName); }
            }
            if (hypeCookie.includes('tr:no') && blockedCookiesTrPrefixes) {
                blockedCookiesTrPrefixes.forEach(function(prefix) {
                    if (cookieName.indexOf(prefix) === 0) {
                        hyDeleteCookie(cookieName);
                        if (cookieConsoleLog) { console.log('hyDeleteBlockedCookies: deleted tr: ' + cookieName); }
                    }
                });
            }
        });
    }

}
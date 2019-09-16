export function detectmob() {
    return (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    );
}

export function detect(extensionId, notInstalledCallback, installedCallback) {
    let img = new Image();
    console.log(extensionId);
    img.onerror = notInstalledCallback;
    img.onload = installedCallback;
    img.src = 'chrome-extension://' + extensionId + '/icons/icon16.png';
}

export function extendObject(a, b) {
    for (var key in b)
        if (b.hasOwnProperty(key)) a[key] = b[key];
    return a;
}

export function notify(params, callback = false) {
    let element = document.getElementsByClassName('message_box_wrap');
    if (typeof element !== 'undfeined' && element.length > 0)
        element[0].parentNode.removeChild(element[0]);
    let time;
    if (params.time) {
        time = new Date(params.time)
    } else {
        time = new Date();
    }
    let minutes = time.getMinutes() >= 10 ? time.getMinutes() : '0'+time.getMinutes(),
        hours = time.getHours() % 12,
        ampm = time.getHours() >= 12 ? 'pm' : 'am';
    let html = '<div class="message_box_wrap">\n' +
        '\n' +
        '    <div class="msg_inner_wrap_all">\n' +
        '        <div class="msg_inner_wrap msc_processing msg_transaction_pocess_wrap animated delay-1s">\n' +
        '            <div class="msg_ico msg_loader"><img src="' + params.img + '"></div>\n' +
        '            <div style="height: 69px" class="main_txt_wrap">\n' +
        '                <h3>' + params.title + '</h3>\n' +
        '                <p>' + params.description + '</p>\n' +
        '            </div>\n' +
        '            <div class="time_logo">\n' +
        '                <span>' + hours + ':' + minutes + ' ' + ampm + '</span>\n' +
        '                <img src="img/logo.jpg">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '\n' +
        '</div>';
    params = null;
    console.log(html);
    if(typeof callback === 'function'){
        callback(null, html);
    }else{
        document.body.innerHTML += html;
    }
}

export function isChrome() {
    return 'chrome' in window
}

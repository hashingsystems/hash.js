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

export function isChrome() {
    return 'chrome' in window
}

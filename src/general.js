import * as Config from './config';

let production = Config.default.production;

let today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
    time = today.getHours() + ":" + today.getMinutes(),
    dateTime = date + ' ' + time,
    timestamp = new Date(dateTime).getTime();

export function getmodalContent() {
    return '<div class="popup_outer_wrap">\n' +
    '\t  \t<div class="popup_wrap">\n' +
    '\t  \t\t<div class="popup_header">Setup Task <a href="javascript:void(0)" class="popup_close" id="popup-close-btn">x</a></div>\n' +
    '\n' +
    '\t  \t\t<div class="popup_inner">\n' +
    '\t  \t\t\t<div class="popup_inner_left">\n' +
    '\n' +
    '\t  \t\t\t\t<form action="/action_page.php" class="popup_form">\n' +
    '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_one" class="popup_chkbox toggle__input" name="img_chkbox" value="img_one">\n' +
    '\t\t\t\t\t  <label for="img_one">&nbsp; Install Hedera Wallet</label>\n' +
    '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_two" class="popup_chkbox toggle__input" name="img_chkbox" value="img_two">\n' +
    '\t\t\t\t\t  <label for="img_two">&nbsp; "Pair your Account"</label>\n' +
    '\n' +
    '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_three" class="popup_chkbox toggle__input" name="img_chkbox" value="img_three">\n' +
    '\t\t\t\t\t  <label for="img_three">&nbsp; "Allow Payment Requests"</label>\n' +
    '\n' +
    '\t\t\t\t\t  <input type="checkbox" onchange= "imgchangeFunction()" id="img_four" class="popup_chkbox toggle__input" name="img_chkbox" value="img_four">\n' +
    '\t\t\t\t\t  <label for="img_four">&nbsp; "Get some HBAR"</label>\n' +
    '\t\t\t\t\t</form>\n' +
    '\n' +
    '\t\t\t\t\t<div class="popup_logo">\n' +
    '\t\t\t\t\t\t<div class="logo_txt">Powered by</div>\n' +
    '\t\t\t\t\t\t<div class="logo_icon"><img src="//api.hashingsystems.com/img/popup_logo.png"></div>\n' +
    '\t\t\t\t\t</div>\n' +
    '\t  \t\t\t\t\n' +
    '\t  \t\t\t</div>\n' +
    '\t  \t\t\t<div class="popup_inner_right">\n' +
    '\n' +
    '\t  \t\t\t\t<div class="popup_img_sec">\n' +
    '\t  \t\t\t\t\t<img class="img_one" src="//api.hashingsystems.com/img/img_one.png">\n' +
    '\t  \t\t\t\t\t<img style="display: none;" class="img_two" src="//api.hashingsystems.com/img/img_two.png">\n' +
    '\t  \t\t\t\t\t<img style="display: none;" class="img_three" src="//api.hashingsystems.com/img/img_three.png">\n' +
    '\t  \t\t\t\t\t<img style="display: none;" class="img_four" src="//api.hashingsystems.com/img/img_four.png">\n' +
    '\t  \t\t\t\t</div>\n' +
    '\t  \t\t\t\t<div class="txt_wrap">\n' +
    '\t\t  \t\t\t\t<div class="txt_header">Lets get you started!</div>\n' +
    '\t\t  \t\t\t\t<div class="txt_content">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et </div>\n' +
    '\t\t  \t\t\t\t<div class="popup_btn">\n' +
    '\t\t  \t\t\t\t\t<a href="">I\'m Ready</a>\n' +
    '\t\t  \t\t\t\t</div>\n' +
    '\t\t  \t\t\t</div>\n' +
    '\t  \t\t\t\t\n' +
    '\t  \t\t\t</div>\n' +
    '\t  \t\t</div>\n' +
    '\t  \t</div>';
}



export function constructConfiguration(){
    return {
        paymentserver: production ? Config.default.productionServer : 'http://localhost:8099',
        //extensionid: "dafkdmjifphnfjcajcbkhdjlkohanphh",
        extensionid: "ialacmdboeeibeonceeefibpfggkdddh",
        error: "/no-extension",
        type: "article",
        time: Date.now(),
        redirect: '{ "nonPayingAccount": "/insufficient-amount/", "noAccount": "/account-not-paired/", "homePage": "/", "success:/success"}',
        submissionnode: "0.0.3",
        memo: Date.now(),
        recipientlist: '[{ "to": "0.0.99", "tinybars": "200000" }]',
        contentid: '79',
        attrID: 'article-1',
        timestamp: timestamp,
        /*this might make a good default id for the content*/
        id: window.location.pathname,
    };
}

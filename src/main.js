import {ping, prechecker} from './services';
import * as methods from './methods';
import * as general from './general';
import * as Apis from './apis';
import * as libraries from './libraries';

// enlist all methods supported by API (e.g. `mw('event', 'user-login');`)
const supportedAPI = methods.methods();
/**
 * The main entry of the application
 */

let configurations = general.constructConfiguration();

function app(window) {
    /* *
      * all methods that were called till now and stored in queue
      * needs to be called now
      * */
    let globalObject = window[window['HASH-JS']];
    let queue = globalObject.q;
    console.log(queue);
    if (queue) {
        for (let i = 0; i < queue.length; i++) {

            configurations = libraries.extendObject(configurations, queue[i][1]);
            let method = queue[i][0];
            let callback;
            if (typeof queue[i][1] === 'function') {
                callback = queue[i][1];
            } else if (typeof queue[i][queue[0].length - 1] === 'function') {
                callback = queue[i][queue[0].length - 1];
            } else {
                callback = false;
            }
            if (supportedAPI.indexOf(method) === -1)
                throw Error(`Method ${method} is not supported`);
            Apis[method](configurations, callback);
        }
    }
    // override temporary (until the app loaded) handler
    // for widget's API calls
    globalObject = Apis;
    globalObject.configurations = configurations;
}
//app(window);

window.hash = function(params, callback){
    let queue = params;
    console.log(queue);
    if (queue) {
            configurations = libraries.extendObject(configurations, queue[1]);
            let method = queue[0];

            /*let callback;
            if (typeof queue[1] === 'function') {
                callback = queue[1];
            } else if (typeof queue[queue[0].length - 1] === 'function') {
                callback = queue[queue[0].length - 1];
            } else {
                callback = false;
            }*/

            console.log(supportedAPI.indexOf(method));
            if (supportedAPI.indexOf(method.toLowerCase()) === -1)
                throw Error(`Method ${method} is not supported`);
            Apis[method](configurations, callback);
        }
};

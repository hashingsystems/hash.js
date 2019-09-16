export function methods() {
    return [
        //object creation methods
        'createhederaobject', 'createcontractobject',

        //main initial method to check readyness for performing transaction
        'init',

        //transaction related methods
        'makepayment', 'makeTransaction', 'checktransaction', 'assist_transaction',

        //modal related methods
        'getmodal', 'notify'
    ];
}

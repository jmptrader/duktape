/*
 *  Duktape 1.3.0 had a bug where whitespace inside padding bytes was not
 *  tolerated.
 */

/*@include util-buffer.js@*/

/*===
foo
foo
fo
fo
f
f
f
TypeError
===*/

function test() {
    // Whitespace is accepted at any point.
    print(bufferToString(Duktape.dec('base64', 'Zm9v')));
    print(bufferToString(Duktape.dec('base64', ' Z m 9 v ')));

    // Works also for padding.
    print(bufferToString(Duktape.dec('base64', 'Zm9=')));
    print(bufferToString(Duktape.dec('base64', ' Z m 9 =')));

    // Whitespace between padding bytes was not accepted by Duktape 1.3.0.
    try {
        print(bufferToString(Duktape.dec('base64', 'Zm==')));
    } catch (e) {
        print(e);
    }
    try {
        print(bufferToString(Duktape.dec('base64', 'Zm==')));
    } catch (e) {
        print(e);
    }
    try {
        print(bufferToString(Duktape.dec('base64', ' Z m = = ')));
    } catch (e) {
        print(e);
    }

    // Mixed padding not allowed.
    try {
        print(bufferToString(Duktape.dec('base64', 'Z=m=')));
    } catch (e) {
        print(e.name);
    }
}

try {
    test();
} catch (e) {
    print(e.stack || e);
}

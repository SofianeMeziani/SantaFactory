var _global = typeof window === 'object' && window.window === window ?
    window : typeof self === 'object' && self.self === self ?
        self : typeof global === 'object' && global.global === global ?
            global :
            this

function bom(blob, opts) {
    if (typeof opts === 'undefined') opts = {
        autoBom: false
    }
    else if (typeof opts !== 'object') {
        console.warn('Deprecated: Expected third argument to be a object')
        opts = {
            autoBom: !opts
        }
    }

    // prepend BOM for UTF-8 XML and text/* types (including HTML)
    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
        return new Blob([String.fromCharCode(0xFEFF), blob], {
            type: blob.type
        })
    }
    return blob
}

function download(url, name, opts) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.onload = function () {
        saveAs(xhr.response, name, opts)
    }
    xhr.onerror = function () {
        console.error('could not download file')
    }
    xhr.send()
}

function corsEnabled(url) {
    var xhr = new XMLHttpRequest()
    // use sync to avoid popup blocker
    xhr.open('HEAD', url, false)
    xhr.send()
    return xhr.status >= 200 && xhr.status <= 299
}
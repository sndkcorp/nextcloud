// @Thu 06/08/ 092651 
/*
 * Dynamsoft JavaScript Library
 * Product: Dynamsoft Web Twain
 * Web Site: http://www.dynamsoft.com
 *
 * Copyright 2017, Dynamsoft Corporation 
 * Author: Dynamsoft Support Team
 * Version: 13.0
 */
var Dynamsoft = Dynamsoft || {
        Lib: {}
    },
    dynamsoft = dynamsoft || {};
(function(b, c) {
    var a = b.WebTwainEnv || (b.WebTwainEnv = {});
    a.initQueue = [];
    a.inited = !1;
    a.IfUseActiveXForIE10Plus = !1;
    c.initOrder = c.initOrder || []
})(Dynamsoft, dynamsoft);
var dynamsoft = dynamsoft || {};
dynamsoft.lib = dynamsoft.lib || {};
(function(lib, undefined) {
    var OP = Object.prototype,
        AP = Array.prototype,
        toString = OP.toString,
        win = window,
        nil = undefined,
        EMPTY_STR = "",
        FALSE = !1,
        TRUE = !0,
        _console = FALSE,
        class2TypeMap = {},
        mix, each, navInfo, isNil, types, mixIsFunctions;
    lib.mix = mix = function(dest, source) {
        for (var i in source) {
            dest[i] = source[i]
        }
        return dest
    };
    isNil = function(o) {
        return o === nil
    };
    isDef = function(o) {
        return o !== nil
    };
    mix(lib, {
        isDef: isDef,
        isUndef: isNil,
        isUndefined: isNil,
        isNull: function(o) {
            return (o === null)
        },
        isNaN: function(o) {
            return isNaN(o)
        },
        type: function(o) {
            if (o === null || o === nil) {
                return String(o)
            }
            return class2TypeMap[toString.call(o)] || "object"
        },
        isPlainObject: function(obj) {
            if (!obj || lib.type(obj) !== "object" || obj.nodeType || obj.window == obj) {
                return FALSE
            }
            var key, objConstructor;
            try {
                if ((objConstructor = obj.constructor) && !hasOwnProperty(obj, "constructor") && !hasOwnProperty(objConstructor.prototype, "isPrototypeOf")) {
                    return FALSE
                }
            } catch (e) {
                return FALSE
            }
            for (key in obj) {}
            return (isNil(key) || hasOwnProperty(obj, key))
        }
    });
    mixIsFunctions = function(name, lc) {
        class2TypeMap["[object " + name + "]"] = (lc = name.toLowerCase());
        lib["is" + name] = function(o) {
            return lib.type(o) === lc
        }
    };
    mixIsFunctions("Function");
    lib.each = each = function(object, fn, context) {
        if (object) {
            var key, val, keys, i = 0,
                length = object.length,
                isObj = isNil(length) || lib.isFunction(object);
            context = context || null;
            if (isObj) {
                keys = lib.keys(object);
                for (; i < keys.length; i++) {
                    key = keys[i];
                    if (fn.call(context, object[key], key, object) === FALSE) {
                        break
                    }
                }
            } else {
                for (val = object[0]; i < length; val = object[++i]) {
                    if (fn.call(context, val, i, object) === FALSE) {
                        break
                    }
                }
            }
        }
        return object
    };
    types = ["String", "Object", "Boolean", "Number"];
    if (Array.isArray) {
        lib.isArray = Array.isArray
    } else {
        types.push("Array")
    }
    each(types, mixIsFunctions);
    if (!isNil(win.console)) {
        _console = win.console;
        if (!lib.isFunction(_console.log) || !lib.isFunction(_console.error)) {
            _console = false
        }
    }
    mix(lib, {
        debug: FALSE,
        log: function(txt) {
            if (lib.debug && _console) {
                _console.log(txt)
            }
        },
        error: function(txt) {
            if (lib.debug && _console) {
                _console.error(txt)
            }
        },
        getLogger: function() {
            var _ = lib.log;
            return {
                warn: _,
                log: _,
                info: _,
                debug: _
            }
        },
        nil: nil,
        noop: function() {}
    });
    mix(lib, {
        startsWith: function(str, prefix) {
            return str.lastIndexOf(prefix, 0) === 0
        },
        endsWith: function(str, suffix) {
            var ind = str.length - suffix.length;
            return ind >= 0 && str.indexOf(suffix, ind) === ind
        },
        replaceAll: function(str, sFind, sReplace) {
            return str.replace(eval("/" + sFind + "/gi"), sReplace)
        },
        upperCaseFirst: function(str) {
            return str.charAt(0).toUpperCase() + str.substr(1)
        },
        makeArray: function(o) {
            if (o == null) {
                return []
            }
            if (lib.isArray(o)) {
                return o
            }
            var lengthType = typeof o.length,
                oType = typeof o;
            if (lengthType !== "number" || o.alert || oType === "string" || (oType === "function" && !("item" in o && lengthType === "number"))) {
                return [o]
            }
            var ret = [];
            for (var i = 0, l = o.length; i < l; i++) {
                ret[i] = o[i]
            }
            return ret
        }
    });
    var hasEnumBug = !({
            toString: 1
        }.propertyIsEnumerable("toString")),
        enumProperties = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toString", "toLocaleString", "valueOf"];
    lib.keys = Object.keys || function(o) {
        var result = [],
            p, i;
        for (p in o) {
            if (o.hasOwnProperty(p)) {
                result.push(p)
            }
        }
        if (hasEnumBug) {
            for (i = enumProperties.length - 1; i >= 0; i--) {
                p = enumProperties[i];
                if (o.hasOwnProperty(p)) {
                    result.push(p)
                }
            }
        }
        return result
    };

    function hasOwnProperty(o, p) {
        return OP.hasOwnProperty.call(o, p)
    }
    var doc = win.document,
        docElement = doc && doc.documentElement,
        head = doc.getElementsByTagName("head")[0] || docElement,
        scriptOnload = doc.createElement("script").readyState ? function(node, callback) {
            var oldCallback = node.onreadystatechange;
            node.onreadystatechange = function() {
                var rs = node.readyState;
                if (rs === "loaded" || rs === "complete") {
                    node.onreadystatechange = null;
                    oldCallback && oldCallback();
                    callback.call(this)
                }
            }
        } : function(node, callback) {
            node.addEventListener("load", callback, FALSE);
            node.addEventListener("error", callback, FALSE)
        };
    lib.getScript = function(url, isAsync, callback) {
		//console.log(url);
		//return '';
        var node, u;
        if (!lib.isFunction(callback)) {
            callback = function() {}
        }
        if (!lib.isString(url) || url == EMPTY_STR) {
            callback();
            return
        }
		
		url = url.replace('/index.php/','/');
		
        node = doc.createElement("script");
        u = ["", url].join(EMPTY_STR);
        node.src = u;
        if (isAsync) {
            node.async = TRUE
        }
        node.charset = "utf-8";
        scriptOnload(node, callback);
        head.insertBefore(node, head.firstChild);
        return node
    };
    lib.getCss = function(url, callback) {
		//console.log(url);
		//return '';
        var node, u, c = callback;
        if (!lib.isFunction(c)) {
            c = !1
        }
        if (!lib.isString(url) || url == EMPTY_STR) {
            c && c();
            return
        }
		
		url =  url.replace('/index.php/','/');
		
        node = doc.createElement("link");
        node.href = url;
        node.rel = "stylesheet";
        node.async = TRUE;
        c && scriptOnload(node, c);
        head.insertBefore(node, head.firstChild);
        return node
    };
    lib.getRandom = function() {
        var a = new Date().getTime() % 10000,
            b = [],
            tmp;
        for (var i = 0; i < 5; i++) {
            tmp = Math.floor(Math.random() * 10);
            if (i == 0 && tmp == 0) {
                i = -1;
                continue
            }
            b.push(tmp)
        }
        if (a < 10) {
            b.push("000")
        } else {
            if (a < 100) {
                b.push("00")
            } else {
                if (a < 1000) {
                    b.push("0")
                }
            }
        }
        b.push(a);
        return b.join("")
    };
    mix(lib, {
        get: function(id) {
            return doc.getElementById(id)
        },
        hide: function(id) {
            var o = lib.isString(id) ? lib.get(id) : id;
            if (o) {
                o.style.display = "none"
            }
        },
        show: function(id) {
            var o = lib.isString(id) ? lib.get(id) : id;
            if (o) {
                o.style.display = EMPTY_STR
            }
        },
        toggle: function(id) {
            var o = lib.isString(id) ? lib.get(id) : id;
            if (o) {
                if (o.style.display === "none") {
                    o.style.display = EMPTY_STR
                } else {
                    o.style.display = "none"
                }
            }
        },
        empty: function(el) {
            if (!el) {
                return
            }
            while (el.firstChild) {
                el.removeChild(el.firstChild)
            }
        },
        getOffset: function(evt, _parent, target) {
            evt = evt || window.event;
            var el = target || evt.target,
                x = 0,
                y = 0,
                parentLeft = 0,
                parentTop = 0,
                scrollTop, scrollLeft, bFixed = false;
            while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
                scrollLeft = el.scrollLeft;
                scrollTop = el.scrollTop;
                if (el.tagName === "BODY") {
                    if (bFixed) {
                        scrollLeft = 0;
                        scrollTop = 0
                    } else {
                        scrollLeft = scrollLeft | document.documentElement.scrollLeft;
                        scrollTop = scrollTop | document.documentElement.scrollTop
                    }
                } else {
                    if (el.style.position === "fixed") {
                        bFixed = true
                    }
                }
                x += el.offsetLeft - scrollLeft;
                y += el.offsetTop - scrollTop;
                el = el.offsetParent
            }
            if (_parent) {
                parentLeft = _parent.left;
                parentTop = _parent.top
            }
            x = evt.clientX - x - parentLeft;
            y = evt.clientY - y - parentTop;
            return {
                x: x,
                y: y
            }
        },
        getElDimensions: function(el, bOffset) {
            var displayFormat, elDimensions;
            if (!el) {
                return false
            }
            displayFormat = el.style.display;
            el.style.display = "";
            elDimensions = bOffset ? {
                offsetTop: el.offsetTop,
                offsetLeft: el.offsetLeft,
                offsetWidth: el.offsetWidth,
                offsetHeight: el.offsetHeight
            } : {
                clientTop: el.clientTop,
                clientLeft: el.clientLeft,
                clientWidth: el.clientWidth ? el.clientWidth : (parseInt(el.style.width) ? parseInt(el.style.width) : 0),
                clientHeight: el.clientHeight ? el.clientHeight : (parseInt(el.style.height) ? parseInt(el.style.height) : 0)
            };
            el.style.display = displayFormat;
            return elDimensions
        }
    });
    var ua = navigator.userAgent.toLowerCase(),
        _platform = navigator.platform.toLowerCase(),
        _protocol = doc.location.protocol,
        _ssl = (_protocol === "https:"),
        _bFileSystem = (_protocol !== "https:" && _protocol !== "http:"),
        _bWin = (_platform == "win32") || (_platform == "win64") || (_platform == "windows"),
        _bMac = (_platform == "mac68k") || (_platform == "macppc") || (_platform == "macintosh") || (_platform == "macintel") || (_platform == "iphone"),
        _bLinux = (_platform.indexOf("linux") >= 0),
        _isX64 = (_platform == "win64") || (ua.indexOf("WOW64") >= 0) || (ua.indexOf("x86_64") >= 0) || (ua.indexOf("win64") >= 0) || (ua.indexOf("x64") >= 0),
        _nMSIE = ua.indexOf("msie"),
        _nTrident = ua.indexOf("trident"),
        _nRV = ua.indexOf("rv:"),
        _nEdge = ua.indexOf("edge"),
        _tmp = ua.match(/version\/([\d.]+).*safari/),
        _bSafari = _tmp ? TRUE : FALSE,
        _nSafari = _tmp ? _tmp[1] : 0,
        _nFirefox = ua.indexOf("firefox"),
        _bFirefox = (_nFirefox != -1),
        _bEdge = _bWin && !_bFirefox && (_nEdge != -1),
        _indexOfChrome = ua.indexOf("chrome"),
        _bChrome = !_bEdge && (_indexOfChrome != -1),
        _bIE = _bWin && !_bFirefox && !_bEdge && !_bChrome && (_nMSIE != -1 || _nTrident != -1 || _nRV != -1),
        _strIEVersion = "",
        _IEMode = 0,
        _bGecko = ua.match(/Gecko/) ? TRUE : FALSE,
        _bHTML5Edition = FALSE,
        _strBrowserVersion = EMPTY_STR,
        _bQuerySelector = FALSE,
        _nativeJson = win.JSON,
        guidNum = 0;
    if (_bEdge) {
        _tmp = ua.slice(_nEdge + 5);
        _tmp = _tmp.slice(0, _tmp.indexOf(" "));
        _strIEVersion = _tmp;
        _tmp = _tmp.slice(0, _tmp.indexOf("."));
        if (_tmp >= 27) {
            _bHTML5Edition = TRUE
        }
    } else {
        if (_bChrome) {
            _tmp = ua.slice(_indexOfChrome + 7);
            _tmp = _tmp.slice(0, _tmp.indexOf(" "));
            _strBrowserVersion = _tmp;
            _tmp = _tmp.slice(0, _tmp.indexOf("."));
            if (_tmp >= 27) {
                _bHTML5Edition = TRUE
            }
        } else {
            if (_bFirefox) {
                _tmp = ua.slice(_nFirefox + 8);
                _tmp = _tmp.slice(0, _tmp.indexOf(" "));
                _strBrowserVersion = _tmp;
                _tmp = _tmp.slice(0, _tmp.indexOf("."));
                if (_tmp >= 27) {
                    _bHTML5Edition = TRUE
                }
            } else {
                if (_bIE) {
                    if (_nMSIE != -1) {
                        _tmp = ua.slice(_nMSIE + 4);
                        _tmp = _tmp.slice(0, _tmp.indexOf(";"));
                        _strIEVersion = _tmp
                    } else {
                        if (_nRV != -1) {
                            _tmp = ua.slice(_nRV + 3);
                            _tmp = _tmp.slice(0, _tmp.indexOf(";"));
                            _tmp = _tmp.slice(0, _tmp.indexOf(")"));
                            _strIEVersion = _tmp
                        } else {
                            if (_nTrident != -1) {
                                _tmp = ua.slice(_nTrident + 7);
                                _tmp = _tmp.slice(0, _tmp.indexOf(";"));
                                _strIEVersion = _tmp
                            }
                        }
                    }
                    if (_strIEVersion === "" || _strIEVersion > 8) {
                        _bHTML5Edition = TRUE
                    }
                    _strBrowserVersion = _tmp
                } else {
                    if (_bSafari) {
                        if (_tmp) {
                            _strBrowserVersion = _tmp[1]
                        }
                        _tmp = _nSafari;
                        _tmp = _tmp.slice(0, _tmp.indexOf("."));
                        if (_tmp >= 7) {
                            _bHTML5Edition = TRUE
                        }
                    }
                }
            }
        }
    }
    if (_bEdge || _bIE) {
        if (doc.documentMode) {
            _IEMode = doc.documentMode
        } else {
            _IEMode = 5;
            if (doc.compatMode) {
                if (doc.compatMode == "CSS1Compat") {
                    _IEMode = 7
                }
            }
        }
    }
    if (docElement && docElement.querySelector && (!_bIE || _bIE && (_strBrowserVersion > 8))) {
        _bQuerySelector = TRUE
    }
    if (_bIE && _strBrowserVersion < 9) {
        _nativeJson = null
    }
    dynamsoft.navInfo = navInfo = {
        host: win,
        bSSL: _ssl,
        bFileSystem: _bFileSystem,
        bWin: _bWin,
        bMac: _bMac,
        bLinux: _bLinux,
        isX64: _isX64,
        bIE: _bIE,
        bEdge: _bEdge,
        bChrome: _bChrome,
        bFirefox: _bFirefox,
        bSafari: _bSafari,
        bGecko: _bGecko,
        bHTML5Edition: _bHTML5Edition,
        strBrowserVersion: _strBrowserVersion,
        IEMode: _IEMode,
        bQuerySelectorSupported: _bQuerySelector,
        nativeJson: _nativeJson,
        nodejs: FALSE,
        scrollBarWidth: false
    };
    var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g,
        trim = String.prototype.trim,
        indexOf = AP.indexOf,
        lastIndexOf = AP.lastIndexOf,
        filter = AP.filter,
        every = AP.every,
        some = AP.some,
        map = AP.map;
    mix(lib, {
        now: Date.now || function() {
            return +new Date()
        },
        guid: function(pre) {
            return (pre || EMPTY_STR) + guidNum++
        },
        trim: trim ? function(str) {
            return str == null ? EMPTY_STR : trim.call(str)
        } : function(str) {
            return str == null ? EMPTY_STR : (str + "").replace(RE_TRIM, EMPTY_STR)
        },
        filter: filter ? function(arr, fn, context) {
            return filter.call(arr, fn, context || this)
        } : function(arr, fn, context) {
            var ret = [];
            each(arr, function(item, i, arr) {
                if (fn.call(context || this, item, i, arr)) {
                    ret.push(item)
                }
            });
            return ret
        },
        indexOf: indexOf ? function(item, arr) {
            return indexOf.call(arr, item)
        } : function(item, arr) {
            each(arr, function(v, k) {
                if (v === item) {
                    return k
                }
            });
            return -1
        }
    });
    var logger = lib.getLogger(),
        SEP = "&",
        EQ = "=",
        HEX_BASE = 16,
        htmlEntities = {
            "&amp;": "&",
            "&gt;": ">",
            "&lt;": "<",
            "&#x60;": "`",
            "&#x2F;": "/",
            "&quot;": '"',
            "&#x27;": "'"
        },
        reverseEntities = {},
        escapeReg, unEscapeReg, escapeRegExp = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
    (function() {
        for (var k in htmlEntities) {
            reverseEntities[htmlEntities[k]] = k
        }
    })();

    function isValidParamValue(val) {
        var t = typeof val;
        return val == null || (t !== "object" && t !== "function")
    }

    function getEscapeReg() {
        if (escapeReg) {
            return escapeReg
        }
        var str = EMPTY_STR;
        each(htmlEntities, function(entity) {
            str += entity + "|"
        });
        str = str.slice(0, -1);
        escapeReg = new RegExp(str, "g");
        return escapeReg
    }

    function getUnEscapeReg() {
        if (unEscapeReg) {
            return unEscapeReg
        }
        var str = EMPTY_STR;
        each(reverseEntities, function(entity) {
            str += entity + "|"
        });
        str += "&#(\\d{1,5});";
        unEscapeReg = new RegExp(str, "g");
        return unEscapeReg
    }
    lib.mix(lib, {
        urlEncode: function(s) {
            return encodeURIComponent(String(s))
        },
        urlDecode: function(s) {
            return decodeURIComponent(s.replace(/\+/g, " "))
        },
        fromUnicode: function(str) {
            return str.replace(/\\u([a-f\d]{4})/ig, function(m, u) {
                return String.fromCharCode(parseInt(u, HEX_BASE))
            })
        },
        escapeHtml: function(str) {
            return (str + "").replace(getEscapeReg(), function(m) {
                return reverseEntities[m]
            })
        },
        escapeRegExp: function(str) {
            return str.replace(escapeRegExp, "\\$&")
        },
        unEscapeHtml: function(str) {
            return str.replace(getUnEscapeReg(), function(m, n) {
                return htmlEntities[m] || String.fromCharCode(+n)
            })
        },
        param: function(o, sep, eq, serializeArray) {
            sep = sep || SEP;
            eq = eq || EQ;
            if (isNil(serializeArray)) {
                serializeArray = TRUE
            }
            var buf = [],
                key, i, v, len, val, encode = lib.urlEncode;
            for (key in o) {
                val = o[key];
                key = encode(key);
                if (isValidParamValue(val)) {
                    buf.push(key);
                    if (isDef(val)) {
                        buf.push(eq, encode(val + EMPTY_STR))
                    }
                    buf.push(sep)
                } else {
                    if (lib.isArray(val) && val.length) {
                        for (i = 0, len = val.length; i < len; ++i) {
                            v = val[i];
                            if (isValidParamValue(v)) {
                                buf.push(key, (serializeArray ? encode("[]") : EMPTY_STR));
                                if (isDef(v)) {
                                    buf.push(eq, encode(v + EMPTY_STR))
                                }
                                buf.push(sep)
                            }
                        }
                    }
                }
            }
            buf.pop();
            return buf.join(EMPTY_STR)
        },
        unparam: function(str, sep, eq) {
            if (!lib.isString(str) || !(str = lib.trim(str))) {
                return {}
            }
            sep = sep || SEP;
            eq = eq || EQ;
            var ret = {},
                eqIndex, decode = lib.urlDecode,
                pairs = str.split(sep),
                key, val, i = 0,
                len = pairs.length;
            for (; i < len; ++i) {
                eqIndex = lib.indexOf(eq, pairs[i]);
                if (eqIndex === -1) {
                    key = decode(pairs[i]);
                    val = nil
                } else {
                    key = decode(pairs[i].substring(0, eqIndex));
                    val = pairs[i].substring(eqIndex + 1);
                    try {
                        val = decode(val)
                    } catch (e) {
                        logger.error("decodeURIComponent error : " + val);
                        logger.error(e)
                    }
                    if (lib.endsWith(key, "[]")) {
                        key = key.substring(0, key.length - 2)
                    }
                }
                if (key in ret) {
                    if (lib.isArray(ret[key])) {
                        ret[key].push(val)
                    } else {
                        ret[key] = [ret[key], val]
                    }
                } else {
                    ret[key] = val
                }
            }
            return ret
        }
    });
    var splitPathRe = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/;

    function normalizeArray(parts, allowAboveRoot) {
        var up = 0,
            i = parts.length - 1,
            newParts = [],
            last;
        for (; i >= 0; i--) {
            last = parts[i];
            if (last !== ".") {
                if (last === "..") {
                    up++
                } else {
                    if (up) {
                        up--
                    } else {
                        newParts[newParts.length] = last
                    }
                }
            }
        }
        if (allowAboveRoot) {
            for (; up--; up) {
                newParts[newParts.length] = ".."
            }
        }
        newParts = newParts.reverse();
        return newParts
    }
    var Path = lib.Path = {
        resolve: function() {
            var resolvedPath = "",
                resolvedPathStr, i, args = (arguments),
                path, absolute = 0;
            for (i = args.length - 1; i >= 0 && !absolute; i--) {
                path = args[i];
                if (lib.isString(path) && !!path) {
                    resolvedPath = path + "/" + resolvedPath;
                    absolute = path.charAt(0) === "/"
                }
            }
            resolvedPathStr = normalizeArray(lib.filter(resolvedPath.split("/"), function(p) {
                return !!p
            }), !absolute).join("/");
            return ((absolute ? "/" : "") + resolvedPathStr) || "."
        },
        normalize: function(path) {
            var absolute = path.charAt(0) === "/",
                trailingSlash = path.slice(-1) === "/";
            path = normalizeArray(lib.filter(path.split("/"), function(p) {
                return !!p
            }), !absolute).join("/");
            if (!path && !absolute) {
                path = "."
            }
            if (path && trailingSlash) {
                path += "/"
            }
            return (absolute ? "/" : "") + path
        },
        join: function() {
            var args = lib.makeArray(arguments);
            return Path.normalize(lib.filter(args, function(p) {
                return p && (lib.isString(p))
            }).join("/"))
        },
        relative: function(from, to) {
            from = Path.normalize(from);
            to = Path.normalize(to);
            var fromParts = lib.filter(from.split("/"), function(p) {
                    return !!p
                }),
                path = [],
                sameIndex, sameIndex2, toParts = lib.filter(to.split("/"), function(p) {
                    return !!p
                }),
                commonLength = Math.min(fromParts.length, toParts.length);
            for (sameIndex = 0; sameIndex < commonLength; sameIndex++) {
                if (fromParts[sameIndex] !== toParts[sameIndex]) {
                    break
                }
            }
            sameIndex2 = sameIndex;
            while (sameIndex < fromParts.length) {
                path.push("..");
                sameIndex++
            }
            path = path.concat(toParts.slice(sameIndex2));
            path = path.join("/");
            return path
        },
        basename: function(path, ext) {
            var result = path.match(splitPathRe) || [],
                basename;
            basename = result[3] || "";
            if (ext && basename && basename.slice(-1 * ext.length) === ext) {
                basename = basename.slice(0, -1 * ext.length)
            }
            return basename
        },
        dirname: function(path) {
            var result = path.match(splitPathRe) || [],
                root = result[1] || "",
                dir = result[2] || "";
            if (!root && !dir) {
                return "."
            }
            if (dir) {
                dir = dir.substring(0, dir.length - 1)
            }
            return root + dir
        },
        extname: function(path) {
            return (path.match(splitPathRe) || [])[4] || ""
        }
    };
    var logger = lib.getLogger(),
        reDisallowedInSchemeOrUserInfo = /[#\/\?@]/g,
        reDisallowedInPathName = /[#\?]/g,
        reDisallowedInQuery = /[#@]/g,
        reDisallowedInFragment = /#/g,
        URI_SPLIT_REG = new RegExp("^(?:([\\w\\d+.-]+):)?(?://(?:([^/?#@]*)@)?([\\w\\d\\-\\u0100-\\uffff.+%]*|\\[[^\\]]+\\])(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
        Path = lib.Path,
        REG_INFO = {
            scheme: 1,
            userInfo: 2,
            hostname: 3,
            port: 4,
            path: 5,
            query: 6,
            fragment: 7
        };

    function parseQuery(self) {
        if (!self._queryMap) {
            self._queryMap = lib.unparam(self._query)
        }
    }

    function Query(query) {
        this._query = query || ""
    }
    Query.prototype = {
        constructor: Query,
        clone: function() {
            return new Query(this.toString())
        },
        reset: function(query) {
            var self = this;
            self._query = query || "";
            self._queryMap = null;
            return self
        },
        count: function() {
            var self = this,
                count = 0,
                _queryMap, k;
            parseQuery(self);
            _queryMap = self._queryMap;
            for (k in _queryMap) {
                if (lib.isArray(_queryMap[k])) {
                    count += _queryMap[k].length
                } else {
                    count++
                }
            }
            return count
        },
        has: function(key) {
            var self = this,
                _queryMap;
            parseQuery(self);
            _queryMap = self._queryMap;
            if (key) {
                return key in _queryMap
            } else {
                return !lib.isEmptyObject(_queryMap)
            }
        },
        get: function(key) {
            var self = this,
                _queryMap;
            parseQuery(self);
            _queryMap = self._queryMap;
            if (key) {
                return _queryMap[key]
            } else {
                return _queryMap
            }
        },
        keys: function() {
            var self = this;
            parseQuery(self);
            return lib.keys(self._queryMap)
        },
        set: function(key, value) {
            var self = this,
                _queryMap;
            parseQuery(self);
            _queryMap = self._queryMap;
            if (lib.isString(key)) {
                self._queryMap[key] = value
            } else {
                if (key instanceof Query) {
                    key = key.get()
                }
                each(key, function(v, k) {
                    _queryMap[k] = v
                })
            }
            return self
        },
        remove: function(key) {
            var self = this;
            parseQuery(self);
            if (key) {
                delete self._queryMap[key]
            } else {
                self._queryMap = {}
            }
            return self
        },
        add: function(key, value) {
            var self = this,
                _queryMap, currentValue;
            if (lib.isString(key)) {
                parseQuery(self);
                _queryMap = self._queryMap;
                currentValue = _queryMap[key];
                if (isNil(currentValue)) {
                    currentValue = value
                } else {
                    currentValue = [].concat(currentValue).concat(value)
                }
                _queryMap[key] = currentValue
            } else {
                if (key instanceof Query) {
                    key = key.get()
                }
                for (var k in key) {
                    self.add(k, key[k])
                }
            }
            return self
        },
        toString: function(serializeArray) {
            var self = this;
            parseQuery(self);
            return lib.param(self._queryMap, nil, nil, serializeArray)
        }
    };

    function padding2(str) {
        return str.length === 1 ? "0" + str : str
    }

    function equalsIgnoreCase(str1, str2) {
        return str1.toLowerCase() === str2.toLowerCase()
    }

    function encodeSpecialChars(str, specialCharsReg) {
        return encodeURI(str).replace(specialCharsReg, function(m) {
            return "%" + padding2(m.charCodeAt(0).toString(16))
        })
    }

    function Uri(uriStr) {
        if (uriStr instanceof Uri) {
            return uriStr.clone()
        }
        var components, self = this;
        lib.mix(self, {
            scheme: "",
            userInfo: "",
            hostname: "",
            port: "",
            path: "",
            query: "",
            fragment: ""
        });
        components = Uri.getComponents(uriStr);
        each(components, function(v, key) {
            v = v || "";
            if (key === "query") {
                self.query = new Query(v)
            } else {
                try {
                    v = lib.urlDecode(v)
                } catch (e) {
                    logger.error(e + "urlDecode error : " + v)
                }
                self[key] = v
            }
        });
        return self
    }
    Uri.prototype = {
        constructor: Uri,
        clone: function() {
            var uri = new Uri(),
                self = this;
            each(REG_INFO, function(index, key) {
                uri[key] = self[key]
            });
            uri.query = uri.query.clone();
            return uri
        },
        resolve: function(relativeUri) {
            if (lib.isString(relativeUri)) {
                relativeUri = new Uri(relativeUri)
            }
            var self = this,
                override = 0,
                lastSlashIndex, order = ["scheme", "userInfo", "hostname", "port", "path", "query", "fragment"],
                target = self.clone();
            each(order, function(o) {
                if (o === "path") {
                    if (override) {
                        target[o] = relativeUri[o]
                    } else {
                        var path = relativeUri.path;
                        if (path) {
                            override = 1;
                            if (!lib.startsWith(path, "/")) {
                                if (target.hostname && !target.path) {
                                    path = "/" + path
                                } else {
                                    if (target.path) {
                                        lastSlashIndex = target.path.lastIndexOf("/");
                                        if (lastSlashIndex !== -1) {
                                            path = target.path.slice(0, lastSlashIndex + 1) + path
                                        }
                                    }
                                }
                            }
                            target.path = Path.normalize(path)
                        }
                    }
                } else {
                    if (o === "query") {
                        if (override || relativeUri.query.toString()) {
                            target.query = relativeUri.query.clone();
                            override = 1
                        }
                    } else {
                        if (override || relativeUri[o]) {
                            target[o] = relativeUri[o];
                            override = 1
                        }
                    }
                }
            });
            return target
        },
        getScheme: function() {
            return this.scheme
        },
        setScheme: function(scheme) {
            this.scheme = scheme;
            return this
        },
        getHostname: function() {
            return this.hostname
        },
        setHostname: function(hostname) {
            this.hostname = hostname;
            return this
        },
        setUserInfo: function(userInfo) {
            this.userInfo = userInfo;
            return this
        },
        getUserInfo: function() {
            return this.userInfo
        },
        setPort: function(port) {
            this.port = port;
            return this
        },
        getPort: function() {
            return this.port
        },
        setPath: function(path) {
            this.path = path;
            return this
        },
        getPath: function() {
            return this.path
        },
        setQuery: function(query) {
            if (lib.isString(query)) {
                if (lib.startsWith(query, "?")) {
                    query = query.slice(1)
                }
                query = new Query(encodeSpecialChars(query, reDisallowedInQuery))
            }
            this.query = query;
            return this
        },
        getQuery: function() {
            return this.query
        },
        getFragment: function() {
            return this.fragment
        },
        setFragment: function(fragment) {
            var self = this;
            if (lib.startsWith(fragment, "#")) {
                fragment = fragment.slice(1)
            }
            self.fragment = fragment;
            return self
        },
        isSameOriginAs: function(other) {
            var self = this;
            return equalsIgnoreCase(self.hostname, other.hostname) && equalsIgnoreCase(self.scheme, other.scheme) && equalsIgnoreCase(self.port, other.port)
        },
        toString: function(serializeArray) {
            var out = [],
                self = this,
                scheme, hostname, path, port, fragment, query, userInfo;
            if ((scheme = self.scheme)) {
                out.push(encodeSpecialChars(scheme, reDisallowedInSchemeOrUserInfo));
                out.push(":")
            }
            if ((hostname = self.hostname)) {
                out.push("//");
                if ((userInfo = self.userInfo)) {
                    out.push(encodeSpecialChars(userInfo, reDisallowedInSchemeOrUserInfo));
                    out.push("@")
                }
                out.push(encodeURIComponent(hostname));
                if ((port = self.port)) {
                    out.push(":");
                    out.push(port)
                }
            }
            if ((path = self.path)) {
                if (hostname && !lib.startsWith(path, "/")) {
                    path = "/" + path
                }
                path = Path.normalize(path);
                out.push(encodeSpecialChars(path, reDisallowedInPathName))
            }
            if ((query = (self.query.toString.call(self.query, serializeArray)))) {
                out.push("?");
                out.push(query)
            }
            if ((fragment = self.fragment)) {
                out.push("#");
                out.push(encodeSpecialChars(fragment, reDisallowedInFragment))
            }
            return out.join("")
        }
    };
    Uri.Query = Query;
    Uri.getComponents = function(url) {
        url = url || EMPTY_STR;
        var m = url.match(URI_SPLIT_REG) || [],
            ret = {};
        each(REG_INFO, function(index, key) {
            ret[key] = m[index]
        });
        return ret
    };
    lib.Uri = Uri;
    var logger = lib.getLogger();
    var win = navInfo.host,
        doc = win.document,
        docElem = doc && doc.documentElement,
        location = win.location,
        domReady = 0,
        callbacks = [],
        POLL_RETIRES = 500,
        POLL_INTERVAL = 40,
        RE_ID_STR = /^#?([\w-]+)$/,
        RE_NOT_WHITESPACE = /\S/,
        standardEventModel = !!(doc && doc.addEventListener),
        DOM_READY_EVENT = "DOMContentLoaded",
        READY_STATE_CHANGE_EVENT = "readystatechange",
        LOAD_EVENT = "load",
        COMPLETE = "complete",
        addEventListener = standardEventModel ? function(el, type, fn) {
            el.addEventListener(type, fn, false)
        } : function(el, type, fn) {
            el.attachEvent("on" + type, fn)
        },
        removeEventListener = standardEventModel ? function(el, type, fn) {
            el.removeEventListener(type, fn, false)
        } : function(el, type, fn) {
            el.detachEvent("on" + type, fn)
        };
    lib.mix(lib, {
        isWindow: function(obj) {
            return obj != null && obj == obj.window
        },
        globalEval: function(data) {
            if (data && RE_NOT_WHITESPACE.test(data)) {
                if (win.execScript) {
                    win.execScript(data)
                } else {
                    (function(data) {
                        win.eval.call(win, data)
                    })(data)
                }
            }
        },
        ready: function(fn) {
            if (domReady) {
                try {
                    fn(lib)
                } catch (e) {
                    lib.log(e.stack || e, "error");
                    setTimeout(function() {
                        throw e
                    }, 0)
                }
            } else {
                callbacks.push(fn)
            }
            return this
        }
    });

    function fireReady() {
        if (domReady) {
            return
        }
        if (doc && !navInfo.nodejs) {
            removeEventListener(win, LOAD_EVENT, fireReady)
        }
        domReady = 1;
        for (var i = 0; i < callbacks.length; i++) {
            try {
                callbacks[i](lib)
            } catch (e) {
                lib.log(e.stack || e, "error");
                setTimeout(function() {
                    throw e
                }, 0)
            }
        }
    }

    function bindReady() {
        if (!doc || doc.readyState === COMPLETE) {
            fireReady();
            return
        }
        addEventListener(win, LOAD_EVENT, fireReady);
        if (standardEventModel) {
            var domReady = function() {
                removeEventListener(doc, DOM_READY_EVENT, domReady);
                fireReady()
            };
            addEventListener(doc, DOM_READY_EVENT, domReady)
        } else {
            var stateChange = function() {
                if (doc.readyState === COMPLETE) {
                    removeEventListener(doc, READY_STATE_CHANGE_EVENT, stateChange);
                    fireReady()
                }
            };
            addEventListener(doc, READY_STATE_CHANGE_EVENT, stateChange);
            var notframe, doScroll = docElem && docElem.doScroll;
            try {
                notframe = (win.frameElement === null)
            } catch (e) {
                notframe = false
            }
            if (doScroll && notframe) {
                var readyScroll = function() {
                    try {
                        doScroll("left");
                        fireReady()
                    } catch (ex) {
                        setTimeout(readyScroll, POLL_INTERVAL)
                    }
                };
                readyScroll()
            }
        }
    }
    bindReady();
    if (navInfo.bIE) {
        try {
            doc.execCommand("BackgroundImageCache", false, true)
        } catch (e) {}
    }
    lib.switchEvent = function(e) {
        e = e || window.event;
        if (e.which == null) {
            e.which = (e.button < 2) ? 1 : ((e.button == 4) ? 2 : 3)
        } else {
            e.which = (e.which < 2) ? 1 : ((e.which == 2) ? 2 : 3)
        }
        return e
    };
    lib.currentStyle = function(obj, prop) {
        if (obj.currentStyle) {
            return obj.currentStyle[prop]
        } else {
            if (window.getComputedStyle) {
                propprop = prop.replace(/([A-Z])/g, "-$1");
                propprop = prop.toLowerCase();
                return document.defaultView.getComputedStyle(obj, null)[prop]
            }
        }
        return null
    };
    lib.extend = function(ParentClass, childAddConstructor) {
        var ChildClass = function() {
            ParentClass.apply(this, arguments);
            if (childAddConstructor) {
                childAddConstructor.apply(this, arguments)
            }
        };
        for (var i in ParentClass.prototype) {
            ChildClass.prototype[i] = ParentClass.prototype[i]
        }
        ChildClass.prototype.constructor = ChildClass;
        return ChildClass
    };
    lib.colorStrToInt = function(str) {
        var mystr = "0x";
        if (/^(rgb|RGB)/.test(str)) {
            var nums = str.replace(/[^\d,.]/g, "").split(",");
            for (var i = 0; i < 3; ++i) {
                var hex = Number(nums[i]).toString(16);
                if (hex.length == 1) {
                    hex = "0" + hex
                }
                mystr += hex
            }
            if (nums.length == 4) {
                var hex = Math.round(Number(nums[i]) * 255).toString(16);
                if (hex.length == 1) {
                    hex = "0" + hex
                }
                mystr += hex
            } else {
                mystr += "ff"
            }
        } else {
            if (str == "transparent") {
                mystr += "00000000"
            } else {
                if (/^#[0-9a-fA-f]{6}$/.test(str)) {
                    mystr += str.replace(/#/, "") + "ff"
                } else {
                    if (/^#[0-9a-fA-f]{3}$/.test(str)) {
                        for (var i = 0; i < 3; ++i) {
                            mystr += str[i] + str[i]
                        }
                        mystr += "ff"
                    } else {
                        mystr = "-1"
                    }
                }
            }
        }
        return Number(mystr)
    };
    lib.IntToColorStr = function(value) {
        if (value > 4294967295 || value < 0) {
            return null
        }
        var str;
        if (!navInfo.bHTML5Edition) {
            if (value % 256 == 0) {
                str = "transparent"
            } else {
                str = Math.floor(value / 256).toString(16);
                while (str.length != 6) {
                    str = "0" + str
                }
                str = "#" + str
            }
        } else {
            str = "rgba(" + Math.floor(value / 16777216) + "," + Math.floor(value / 65536) % 256 + "," + Math.floor(value / 256) % 256 + "," + (value % 256) / 255 + ")"
        }
        return str
    };
    var customEvent = {
        fire: function(type) {
            var self = this,
                args;
            self.exec = self.exec || {};
            type = type.toLowerCase();
            args = AP.slice.call(arguments, 1);
            each(self.exec[type] || [], function(item) {
                var fn = item.f,
                    ctx = item.c || self;
                try {
                    fn.apply(ctx, args)
                } catch (e) {
                    console.log(e)
                }
            })
        },
        on: function(type, fn, ctx) {
            var self = this;
            self.exec = self.exec || {};
            type = type.toLowerCase();
            self.exec[type] = self.exec[type] || [];
            self.exec[type].push({
                f: fn,
                c: ctx
            })
        },
        off: function(type, fn, c) {
            var self = this,
                exec = self.exec;
            if (!exec) {
                return
            }
            if (!type) {
                self.exec = null;
                return
            }
            type = type.toLowerCase();
            if (!fn) {
                exec[type] = null;
                return
            }
            var arr = exec[type] || [];
            for (var i = arr.length - 1; i >= 0; i--) {
                if (arr[i] === fn) {
                    arr.splice(i, 1)
                }
            }
        }
    };

    function Attributes(config) {
        var self = this;
        self.__attrs = {};
        self.__attrVals = {};
        self.userConfig = config;
        while (c) {
            self.addAttrs(c.ATTRS);
            c = c.superclass ? c.superclass.constructor : null
        }
        lib.mix(self.__attrs, config)
    }
    lib.mix(Attributes.prototype, {
        get: function(name) {
            var self = this;
            if (name in self.__attrs) {
                return self.__attrs[name]
            }
            return ""
        },
        set: function(name, v) {
            var self = this;
            if (name in self.__attrs) {
                self.__attrs[name] = v
            }
        },
        addAttrs: function(attrsConfig) {
            lib.mix(this.__attrs, attrsConfig)
        }
    });
    Attributes.extend = function(px) {
        var SuperClass = this,
            childAddConstructor, ret;
        px = px || {};
        if (px.constructor) {
            childAddConstructor = px.constructor
        }
        ret = extend(SuperClass, childAddConstructor);
        lib.mix(ret, px);
        return ret
    };
    lib.obj = {
        Attributes: Attributes,
        customEvent: customEvent
    }
})(dynamsoft.lib);
(function(s) {
    var ao, g = RegExp,
        ac, Z, f, k, t, aj, W, S, r, u, o, p, am = !0,
        d, K, b, Q, ak = "dws_" + 1 * new Date(),
        al = window.document,
        I = 0,
        w = 0,
        ag = ar(),
        ah = ar(),
        E = ar(),
        x = function(i, e) {
            if (i === e) {
                r = true
            }
            return 0
        },
        G = [],
        T = G.pop,
        Y = G.push,
        ai = G.push,
        C = G.slice,
        F = function(av, au) {
            var at = 0,
                e = av.length;
            for (; at < e; at++) {
                if (av[at] === au) {
                    return at
                }
            }
            return -1
        },
        ae = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        O = "[\\x20\\t\\r\\n\\f]",
        z = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        ab = ["\\[", O, "*(", z, ")(?:", O, "*([*^$|!~]?=)", O, "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(", z, "))|)", O, "*\\]"].join(""),
        B = new g(O + "+", "g"),
        af = new g(["^", O, "+|((?:^|[^\\\\])(?:\\\\.)*)", O, "+$"].join(""), "g"),
        m = new g(["^", O, "*,", O, "*"].join("")),
        V = new g(["^", O, "*([>+~]|", O, ")", O, "*"].join("")),
        D = new g("=" + O + "*([^\\]'\"]*?)" + O + "*\\]", "g"),
        h = new g("^" + z + "$"),
        U = {
            ID: new g("^#(" + z + ")"),
            CLASS: new g("^\\.(" + z + ")"),
            TAG: new g("^(" + z + "|[*])"),
            ATTR: new g("^" + ab),
            needsContext: new g(["^", O, "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(", O, "*((?:-\\d)?\\d*)", O, "*\\)|)(?=[^-]|$)"].join(""), "i")
        },
        J = /^[^{]+\{\s*\[native \w/,
        aa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        P = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        l = function(i, e) {
            if (e) {
                if (i === "\0") {
                    return "\uFFFD"
                }
                return i.slice(0, -1) + "\\" + i.charCodeAt(i.length - 1).toString(16) + " "
            }
            return "\\" + i
        },
        q = function() {
            u()
        };
    try {
        ai.apply((G = C.call(al.childNodes)), al.childNodes);
        G[al.childNodes.length].nodeType
    } catch (aq) {
        ai = {
            apply: G.length ? function(i, e) {
                Y.apply(i, C.call(e))
            } : function(av, au) {
                var e = av.length,
                    at = 0;
                while ((av[e++] = au[at++])) {}
                av.length = e - 1
            }
        }
    }

    function ad(az, at, aC, aF) {
        var ax, aD, aw, e, aE, av, aA, au = at && at.ownerDocument,
            aB = at ? at.nodeType : 9;
        aC = aC || [];
        if (typeof az !== "string" || !az || aB !== 1 && aB !== 9 && aB !== 11) {
            return aC
        }
        if (!aF) {
            if ((at ? at.ownerDocument || at : al) !== o) {
                u(at)
            }
            at = at || o;
            if (aB !== 11 && (aE = aa.exec(az))) {
                if ((ax = aE[1])) {
                    if (aB === 9) {
                        if ((aw = at.getElementById(ax))) {
                            if (aw.id === ax) {
                                aC.push(aw);
                                return aC
                            }
                        } else {
                            return aC
                        }
                    } else {
                        if (au && (aw = au.getElementById(ax)) && Q(at, aw) && aw.id === ax) {
                            aC.push(aw);
                            return aC
                        }
                    }
                } else {
                    if (aE[2]) {
                        ai.apply(aC, at.getElementsByTagName(az));
                        return aC
                    } else {
                        if ((ax = aE[3]) && ac.getElementsByClassName && at.getElementsByClassName) {
                            ai.apply(aC, at.getElementsByClassName(ax));
                            return aC
                        }
                    }
                }
            }
            if (ac.qsa && !E[az + " "] && (!d || !d.test(az))) {
                if (aB !== 1) {
                    au = at;
                    aA = az
                } else {
                    if (at.nodeName.toLowerCase() !== "object") {
                        if ((e = at.getAttribute("id"))) {
                            e = e.replace(P, l)
                        } else {
                            at.setAttribute("id", (e = ak))
                        }
                        av = k(az);
                        aD = av.length;
                        while (aD--) {
                            av[aD] = "#" + e + " " + a(av[aD])
                        }
                        aA = av.join(",");
                        au = at
                    }
                }
                if (aA) {
                    try {
                        ai.apply(aC, au.querySelectorAll(aA));
                        return aC
                    } catch (ay) {} finally {
                        if (e === ak) {
                            at.removeAttribute("id")
                        }
                    }
                }
            }
        }
        return aj(az.replace(af, "$1"), at, aC, aF)
    }

    function ar() {
        var i = [];

        function e(at, au) {
            if (i.push(at + " ") > Z.cacheLength) {
                delete e[i.shift()]
            }
            return (e[at + " "] = au)
        }
        return e
    }

    function an(e) {
        e[ak] = true;
        return e
    }

    function X(at) {
        var i = o.createElement("fieldset");
        try {
            return !!at(i)
        } catch (au) {
            return false
        } finally {
            if (i.parentNode) {
                i.parentNode.removeChild(i)
            }
            i = null
        }
    }

    function y(e, i) {}

    function j(i, e) {
        var au = e && i,
            at = au && i.nodeType === 1 && e.nodeType === 1 && i.sourceIndex - e.sourceIndex;
        if (at) {
            return at
        }
        if (au) {
            while ((au = au.nextSibling)) {
                if (au === e) {
                    return -1
                }
            }
        }
        return i ? 1 : -1
    }

    function R(e) {
        return e && typeof e.getElementsByTagName !== "undefined" && e
    }
    ac = ad.support = {};
    u = ad.setDocument = function(at) {
        var e, i, au = at ? at.ownerDocument || at : al;
        if (au === o || au.nodeType !== 9 || !au.documentElement) {
            return o
        }
        o = au;
        p = o.documentElement;
        if (al !== o && (i = o.defaultView) && i.top !== i) {
            if (i.addEventListener) {
                i.addEventListener("unload", q, false)
            } else {
                if (i.attachEvent) {
                    i.attachEvent("onunload", q)
                }
            }
        }
        ac.attributes = X(function(av) {
            av.className = "i";
            return !av.getAttribute("className")
        });
        ac.getElementsByTagName = X(function(av) {
            av.appendChild(o.createComment(""));
            return !av.getElementsByTagName("*").length
        });
        ac.getElementsByClassName = J.test(o.getElementsByClassName);
        ac.getById = X(function(av) {
            p.appendChild(av).id = ak;
            return !o.getElementsByName || !o.getElementsByName(ak).length
        });
        if (ac.getById) {
            Z.filter.ID = function(aw) {
                var av = aw;
                return function(ax) {
                    return ax.getAttribute("id") === av
                }
            }
        } else {
            Z.filter.ID = function(aw) {
                var av = new g(["^", aw, "$"].join(""), "g");
                return function(ay) {
                    var ax = typeof ay.getAttributeNode !== "undefined" && ay.getAttributeNode("id");
                    return ax && av.test(ax.value)
                }
            }
        }
        Z.find.TAG = ac.getElementsByTagName ? function(av, aw) {
            if (typeof aw.getElementsByTagName !== "undefined") {
                return aw.getElementsByTagName(av)
            } else {
                if (ac.qsa) {
                    return aw.querySelectorAll(av)
                }
            }
        } : function(av, az) {
            var aA, ay = [],
                ax = 0,
                aw = az.getElementsByTagName(av);
            if (av === "*") {
                while ((aA = aw[ax++])) {
                    if (aA.nodeType === 1) {
                        ay.push(aA)
                    }
                }
                return ay
            }
            return aw
        };
        Z.find.CLASS = ac.getElementsByClassName && function(aw, av) {
            if (typeof av.getElementsByClassName !== "undefined") {
                return av.getElementsByClassName(aw)
            }
        };
        K = [];
        d = [];
        if ((ac.qsa = J.test(o.querySelectorAll))) {
            X(function(av) {
                p.appendChild(av).innerHTML = "<a id='" + ak + "'></a><select id='" + ak + "-\r\\' msallowcapture=''><option selected=''></option></select>";
                if (av.querySelectorAll("[msallowcapture^='']").length) {
                    d.push("[*^$]=" + O + "*(?:''|\"\")")
                }
                if (!av.querySelectorAll("[selected]").length) {
                    d.push("\\[" + O + "*(?:value|" + ae + ")")
                }
                if (!av.querySelectorAll("[id~=" + ak + "-]").length) {
                    d.push("~=")
                }
                if (!av.querySelectorAll(":checked").length) {
                    d.push(":checked")
                }
                if (!av.querySelectorAll("a#" + ak + "+*").length) {
                    d.push(".#.+[+~]")
                }
            });
            X(function(aw) {
                aw.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var av = o.createElement("input");
                av.setAttribute("type", "hidden");
                aw.appendChild(av).setAttribute("name", "D");
                if (aw.querySelectorAll("[name=d]").length) {
                    d.push("name" + O + "*[*^$|!~]?=")
                }
                if (aw.querySelectorAll(":enabled").length !== 2) {
                    d.push(":enabled", ":disabled")
                }
                p.appendChild(aw).disabled = true;
                if (aw.querySelectorAll(":disabled").length !== 2) {
                    d.push(":enabled", ":disabled")
                }
                aw.querySelectorAll("*,:x");
                d.push(",.*:")
            })
        }
        if ((ac.matchesSelector = J.test((b = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.oMatchesSelector || p.msMatchesSelector)))) {
            X(function(av) {
                ac.disconnectedMatch = b.call(av, "*");
                b.call(av, "[s!='']:x")
            })
        }
        d = d.length && new g(d.join("|"));
        K = K.length && new g(K.join("|"));
        e = J.test(p.compareDocumentPosition);
        Q = e || J.test(p.contains) ? function(aw, av) {
            var ay = aw.nodeType === 9 ? aw.documentElement : aw,
                ax = av && av.parentNode;
            return aw === ax || !!(ax && ax.nodeType === 1 && (ay.contains ? ay.contains(ax) : aw.compareDocumentPosition && aw.compareDocumentPosition(ax) & 16))
        } : function(aw, av) {
            if (av) {
                while ((av = av.parentNode)) {
                    if (av === aw) {
                        return true
                    }
                }
            }
            return false
        };
        x = e ? function(aw, av) {
            if (aw === av) {
                r = true;
                return 0
            }
            var ax = !aw.compareDocumentPosition - !av.compareDocumentPosition;
            if (ax) {
                return ax
            }
            ax = (aw.ownerDocument || aw) === (av.ownerDocument || av) ? aw.compareDocumentPosition(av) : 1;
            if (ax & 1 || (!ac.sortDetached && av.compareDocumentPosition(aw) === ax)) {
                if (aw === o || aw.ownerDocument === al && Q(al, aw)) {
                    return -1
                }
                if (av === o || av.ownerDocument === al && Q(al, av)) {
                    return 1
                }
                return S ? (F(S, aw) - F(S, av)) : 0
            }
            return ax & 4 ? -1 : 1
        } : function(aw, av) {
            if (aw === av) {
                r = true;
                return 0
            }
            var aC, az = 0,
                aB = aw.parentNode,
                ay = av.parentNode,
                ax = [aw],
                aA = [av];
            if (!aB || !ay) {
                return aw === o ? -1 : av === o ? 1 : aB ? -1 : ay ? 1 : S ? (F(S, aw) - F(S, av)) : 0
            } else {
                if (aB === ay) {
                    return j(aw, av)
                }
            }
            aC = aw;
            while ((aC = aC.parentNode)) {
                ax.unshift(aC)
            }
            aC = av;
            while ((aC = aC.parentNode)) {
                aA.unshift(aC)
            }
            while (ax[az] === aA[az]) {
                az++
            }
            return az ? j(ax[az], aA[az]) : ax[az] === al ? -1 : aA[az] === al ? 1 : 0
        };
        return o
    };
    ad.matches = function(i, e) {
        return ad(i, null, null, e)
    };
    ad.matchesSelector = function(at, av) {
        if ((at.ownerDocument || at) !== o) {
            u(at)
        }
        av = av.replace(D, "='$1']");
        if (ac.matchesSelector && !E[av + " "] && (!K || !K.test(av)) && (!d || !d.test(av))) {
            try {
                var i = b.call(at, av);
                if (i || ac.disconnectedMatch || at.document && at.document.nodeType !== 11) {
                    return i
                }
            } catch (au) {}
        }
        return ad(av, o, null, [at]).length > 0
    };
    ad.contains = function(e, i) {
        if ((e.ownerDocument || e) !== o) {
            u(e)
        }
        return Q(e, i)
    };
    ad.escape = function(e) {
        return (e + "").replace(P, l)
    };
    ad.error = function(e) {
        throw new Error("Syntax error, unrecognized expression: " + e)
    };
    ad.uniqueSort = function(au) {
        var av, aw = [],
            e = 0,
            at = 0;
        r = !ac.detectDuplicates;
        S = !ac.sortStable && au.slice(0);
        au.sort(x);
        if (r) {
            while ((av = au[at++])) {
                if (av === au[at]) {
                    e = aw.push(at)
                }
            }
            while (e--) {
                au.splice(aw[e], 1)
            }
        }
        S = null;
        return au
    };
    f = ad.getText = function(aw) {
        var av, at = "",
            au = 0,
            e = aw.nodeType;
        if (!e) {
            while ((av = aw[au++])) {
                at += f(av)
            }
        } else {
            if (e === 1 || e === 9 || e === 11) {
                if (typeof aw.textContent === "string") {
                    return aw.textContent
                } else {
                    for (aw = aw.firstChild; aw; aw = aw.nextSibling) {
                        at += f(aw)
                    }
                }
            } else {
                if (e === 3 || e === 4) {
                    return aw.nodeValue
                }
            }
        }
        return at
    };
    Z = ad.selectors = {
        cacheLength: 50,
        match: U,
        find: {},
        relative: {
            ">": {
                dir: "parentNode",
                first: true
            },
            " ": {
                dir: "parentNode"
            },
            "+": {
                dir: "previousSibling",
                first: true
            },
            "~": {
                dir: "previousSibling"
            }
        },
        preFilter: {
            ATTR: function(e) {
                e[3] = (e[3] || e[4] || e[5] || "");
                if (e[2] === "~=") {
                    e[3] = " " + e[3] + " "
                }
                return e.slice(0, 4)
            }
        },
        filter: {
            TAG: function(i) {
                var e = i.toLowerCase();
                return i === "*" ? function() {
                    return true
                } : function(at) {
                    return at.nodeName && at.nodeName.toLowerCase() === e
                }
            },
            CLASS: function(e) {
                var i = ag[e + " "];
                return i || (i = new g("(^|" + O + ")" + e + "(" + O + "|$)")) && ag(e, function(at) {
                    return i.test(typeof at.className === "string" && at.className || typeof at.getAttribute !== "undefined" && at.getAttribute("class") || "")
                })
            },
            ATTR: function(at, i, e) {
                return function(av) {
                    var au = ad.attr(av, at);
                    if (au == null) {
                        return i === "!="
                    }
                    if (!i) {
                        return true
                    }
                    au += "";
                    return i === "=" ? au === e : i === "!=" ? au !== e : i === "^=" ? e && au.indexOf(e) === 0 : i === "*=" ? e && au.indexOf(e) > -1 : i === "$=" ? e && au.slice(-e.length) === e : i === "~=" ? (" " + au.replace(B, " ") + " ").indexOf(e) > -1 : i === "|=" ? au === e || au.slice(0, e.length + 1) === e + "-" : false
                }
            }
        }
    };

    function A() {}
    A.prototype = Z.filters = Z.pseudos;
    Z.setFilters = new A();
    k = ad.tokenize = function(av, aA) {
        var i, aw, ay = [],
            az, ax, at, e, au = ah[av + " "];
        if (au) {
            return aA ? 0 : au.slice(0)
        }
        ax = av;
        at = [];
        e = Z.preFilter;
        while (ax) {
            if (!i || (aw = m.exec(ax))) {
                if (aw) {
                    ax = ax.slice(aw[0].length) || ax
                }
                at.push((ay = []))
            }
            i = false;
            if ((aw = V.exec(ax))) {
                i = aw.shift();
                ay.push({
                    value: i,
                    type: aw[0].replace(af, " ")
                });
                ax = ax.slice(i.length)
            }
            for (az in Z.filter) {
                if ((aw = U[az].exec(ax)) && (!e[az] || (aw = e[az](aw)))) {
                    i = aw.shift();
                    ay.push({
                        value: i,
                        type: az,
                        matches: aw
                    });
                    ax = ax.slice(i.length)
                }
            }
            if (!i) {
                break
            }
        }
        return aA ? ax.length : ax ? ad.error(av) : ah(av, at).slice(0)
    };

    function a(av) {
        var au = 0,
            at = av.length,
            e = "";
        for (; au < at; au++) {
            e += av[au].value
        }
        return e
    }

    function M(ax, av, aw) {
        var e = av.dir,
            au = av.next,
            at = au || e,
            ay = aw && at === "parentNode",
            i = w++;
        return av.first ? function(aB, aA, az) {
            while ((aB = aB[e])) {
                if (aB.nodeType === 1 || ay) {
                    return ax(aB, aA, az)
                }
            }
            return false
        } : function(aE, aC, aB) {
            var aF, az, aD, aA = [I, i];
            if (aB) {
                while ((aE = aE[e])) {
                    if (aE.nodeType === 1 || ay) {
                        if (ax(aE, aC, aB)) {
                            return true
                        }
                    }
                }
            } else {
                while ((aE = aE[e])) {
                    if (aE.nodeType === 1 || ay) {
                        aD = aE[ak] || (aE[ak] = {});
                        az = aD[aE.uniqueID] || (aD[aE.uniqueID] = {});
                        if (au && au === aE.nodeName.toLowerCase()) {
                            aE = aE[e] || aE
                        } else {
                            if ((aF = az[at]) && aF[0] === I && aF[1] === i) {
                                return (aA[2] = aF[2])
                            } else {
                                az[at] = aA;
                                if ((aA[2] = ax(aE, aC, aB))) {
                                    return true
                                }
                            }
                        }
                    }
                }
            }
            return false
        }
    }

    function v(e) {
        return e.length > 1 ? function(aw, av, at) {
            var au = e.length;
            while (au--) {
                if (!e[au](aw, av, at)) {
                    return false
                }
            }
            return true
        } : e[0]
    }

    function H(at, aw, av) {
        var au = 0,
            e = aw.length;
        for (; au < e; au++) {
            ad(at, aw[au], av)
        }
        return av
    }

    function L(e, at, au, av, ay) {
        var aw, aB = [],
            ax = 0,
            az = e.length,
            aA = at != null;
        for (; ax < az; ax++) {
            if ((aw = e[ax])) {
                if (!au || au(aw, av, ay)) {
                    aB.push(aw);
                    if (aA) {
                        at.push(ax)
                    }
                }
            }
        }
        return aB
    }

    function ap(at, i, av, au, aw, e) {
        if (au && !au[ak]) {
            au = ap(au)
        }
        if (aw && !aw[ak]) {
            aw = ap(aw, e)
        }
        return an(function(aH, aE, az, aG) {
            var aJ, aF, aB, aA = [],
                aI = [],
                ay = aE.length,
                ax = aH || H(i || "*", az.nodeType ? [az] : az, []),
                aC = at && (aH || !i) ? L(ax, aA, at, az, aG) : ax,
                aD = av ? aw || (aH ? at : ay || au) ? [] : aE : aC;
            if (av) {
                av(aC, aD, az, aG)
            }
            if (au) {
                aJ = L(aD, aI);
                au(aJ, [], az, aG);
                aF = aJ.length;
                while (aF--) {
                    if ((aB = aJ[aF])) {
                        aD[aI[aF]] = !(aC[aI[aF]] = aB)
                    }
                }
            }
            if (aH) {
                if (aw || at) {
                    if (aw) {
                        aJ = [];
                        aF = aD.length;
                        while (aF--) {
                            if ((aB = aD[aF])) {
                                aJ.push((aC[aF] = aB))
                            }
                        }
                        aw(null, (aD = []), aJ, aG)
                    }
                    aF = aD.length;
                    while (aF--) {
                        if ((aB = aD[aF]) && (aJ = aw ? F(aH, aB) : aA[aF]) > -1) {
                            aH[aJ] = !(aE[aJ] = aB)
                        }
                    }
                }
            } else {
                aD = L(aD === aE ? aD.splice(ay, aD.length) : aD);
                if (aw) {
                    aw(null, aE, aD, aG)
                } else {
                    ai.apply(aE, aD)
                }
            }
        })
    }

    function N(ay) {
        var at, aw, au, ax = ay.length,
            aB = Z.relative[ay[0].type],
            aC = aB || Z.relative[" "],
            av = aB ? 1 : 0,
            az = M(function(i) {
                return i === at
            }, aC, true),
            aA = M(function(i) {
                return F(at, i) > -1
            }, aC, true),
            e = [function(aF, aE, aD) {
                var i = (!aB && (aD || aE !== W)) || ((at = aE).nodeType ? az(aF, aE, aD) : aA(aF, aE, aD));
                at = null;
                return i
            }];
        for (; av < ax; av++) {
            if ((aw = Z.relative[ay[av].type])) {
                e = [M(v(e), aw)]
            } else {
                aw = Z.filter[ay[av].type].apply(null, ay[av].matches);
                if (aw[ak]) {
                    au = ++av;
                    for (; au < ax; au++) {
                        if (Z.relative[ay[au].type]) {
                            break
                        }
                    }
                    return ap(av > 1 && v(e), av > 1 && a(ay.slice(0, av - 1).concat({
                        value: ay[av - 2].type === " " ? "*" : ""
                    })).replace(af, "$1"), aw, av < au && N(ay.slice(av, au)), au < ax && N((ay = ay.slice(au))), au < ax && a(ay))
                }
                e.push(aw)
            }
        }
        return v(e)
    }

    function n(au, at) {
        var e = at.length > 0,
            av = au.length > 0,
            i = function(aF, az, aE, aD, aI) {
                var aA, aB, aG, aK = 0,
                    aC = "0",
                    aw = aF && [],
                    aL = [],
                    aJ = W,
                    ay = aF || av && Z.find.TAG("*", aI),
                    ax = (I += aJ == null ? 1 : Math.random() || 0.1),
                    aH = ay.length;
                if (aI) {
                    W = az === o || az || aI
                }
                for (; aC !== aH && (aA = ay[aC]) != null; aC++) {
                    if (av && aA) {
                        aB = 0;
                        if (!az && aA.ownerDocument !== o) {
                            u(aA);
                            aE = !am
                        }
                        while ((aG = au[aB++])) {
                            if (aG(aA, az || o, aE)) {
                                aD.push(aA);
                                break
                            }
                        }
                        if (aI) {
                            I = ax
                        }
                    }
                    if (e) {
                        if ((aA = !aG && aA)) {
                            aK--
                        }
                        if (aF) {
                            aw.push(aA)
                        }
                    }
                }
                aK += aC;
                if (e && aC !== aK) {
                    aB = 0;
                    while ((aG = at[aB++])) {
                        aG(aw, aL, az, aE)
                    }
                    if (aF) {
                        if (aK > 0) {
                            while (aC--) {
                                if (!(aw[aC] || aL[aC])) {
                                    aL[aC] = T.call(aD)
                                }
                            }
                        }
                        aL = L(aL)
                    }
                    ai.apply(aD, aL);
                    if (aI && !aF && aL.length > 0 && (aK + at.length) > 1) {
                        ad.uniqueSort(aD)
                    }
                }
                if (aI) {
                    I = ax;
                    W = aJ
                }
                return aw
            };
        return e ? an(i) : i
    }
    t = ad.compile = function(e, au) {
        var av, at = [],
            ax = [],
            aw = E[e + " "];
        if (!aw) {
            if (!au) {
                au = k(e)
            }
            av = au.length;
            while (av--) {
                aw = N(au[av]);
                if (aw[ak]) {
                    at.push(aw)
                } else {
                    ax.push(aw)
                }
            }
            aw = E(e, n(ax, at));
            aw.selector = e
        }
        return aw
    };
    aj = ad.select = function(e, ax, aw, at) {
        var av, ay = typeof e === "function" && e,
            au = !at && k((e = ay.selector || e));
        aw = aw || [];
        (ay || t(e, au))(at, ax, !am, aw, !ax || ax);
        return aw
    };
    ac.sortStable = ak.split("").sort(x).join("") === ak;
    ac.detectDuplicates = !!r;
    u();
    ac.sortDetached = X(function(e) {
        return e.compareDocumentPosition(o.createElement("fieldset")) & 1
    });
    if (!X(function(e) {
            e.innerHTML = "<a href='#'></a>";
            return e.firstChild.getAttribute("href") === "#"
        })) {
        y("type|href|height|width", function(i, e) {
            return i.getAttribute(e, e.toLowerCase() === "type" ? 1 : 2)
        })
    }
    if (!ac.attributes || !X(function(e) {
            e.innerHTML = "<input/>";
            e.firstChild.setAttribute("value", "");
            return e.firstChild.getAttribute("value") === ""
        })) {
        y("value", function(i, e) {
            if (i.nodeName.toLowerCase() === "input") {
                return i.defaultValue
            }
        })
    }
    if (!X(function(e) {
            return e.getAttribute("disabled") == null
        })) {
        y(ae, function(i, e) {
            var at;
            return i[e] === true ? e.toLowerCase() : (at = i.getAttributeNode(e)) && at.specified ? at.value : null
        })
    }
    s.support = ac;
    s.all = ad
})(dynamsoft.lib);
(function(l) {
    var Z = Array.prototype,
        v = Z.slice,
        T = Z.push,
        r = l.makeArray,
        h = document,
        f = h.documentElement;

    function J(ag, ah, af) {
        var ae = this;
        if (!(ae instanceof J)) {
            return new J(ag, ah, af)
        }
        if (!ag) {
            return ae
        }
        if (typeof ag === "string") {
            l.error("Err 4001.");
            return ae
        }
        if (l.isArray(ag) || ag.isNodeList) {
            T.apply(ae, r(ag));
            return ae
        }
        ae[0] = ag;
        ae.length = 1;
        return ae
    }
    var F;
    F = J.prototype = {
        isNodeList: true,
        length: 0,
        item: function(af) {
            var ae = this;
            if (l.isNumber(af)) {
                if (af >= ae.length) {
                    return null
                } else {
                    return new J(ae[af])
                }
            } else {
                return new J(af)
            }
        },
        slice: function() {
            return new J(v.apply(this, arguments))
        },
        getDOMNodes: function() {
            return v.call(this)
        },
        each: function(ag, af) {
            var ae = this;
            l.each(ae, function(ai, ah) {
                ai = new J(ai);
                return ag.call(af || ai, ai, ah, ae)
            });
            return ae
        },
        getEL: function() {
            return this[0]
        },
        all: function(ae) {
            var ag, af = this;
            if (af.length > 0) {
                ag = J.all(ae, af)
            } else {
                ag = new J()
            }
            return ag
        },
        one: function(ae) {
            var af = this,
                ah = af.all(ae),
                ag = ah.length ? ah.slice(0, 1) : null;
            return ag
        }
    };
    l.mix(J, {
        all: function(ae, ag) {
            var af = ag;
            if (af && af.isNodeList) {
                af = ag.getEL()
            }
            if (typeof ae === "string") {
                if ((ae = l.trim(ae)) && ae.length >= 3 && l.startsWith(ae, "<") && l.endsWith(ae, ">")) {
                    l.err("Err 4002.")
                }
                return new J(l.all(ae, af))
            }
            if (ae.isNodeList) {
                return ae
            }
            return new J(ae)
        },
        one: function(ae, af) {
            var ag = J.all(ae, af);
            return ag.length ? ag.slice(0, 1) : null
        }
    });
    l.one = J.one;
    var M = l.support,
        Q = l.all;
    var d, R, U, I, t, m, L = document.createElement("div"),
        X = document.createElement("div");
    if (!X.style) {
        return
    }
    X.style.cssText = "float:left;opacity:.5";
    M.opacity = X.style.opacity === "0.5";
    M.cssFloat = !!X.style.cssFloat;
    X.style.backgroundClip = "content-box";
    X.cloneNode(true).style.backgroundClip = "";
    M.clearCloneStyle = X.style.backgroundClip === "content-box";
    L = document.createElement("div");
    L.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute";
    X.innerHTML = "";
    L.appendChild(X);
    M.boxSizing = X.style.boxSizing === "" || X.style.MozBoxSizing === "" || X.style.WebkitBoxSizing === "";
    l.mix(M, {
        reliableHiddenOffsets: function() {
            if (d == null) {
                q()
            }
            return I
        },
        boxSizingReliable: function() {
            if (d == null) {
                q()
            }
            return U
        },
        pixelMarginRight: function() {
            if (d == null) {
                q()
            }
            return R
        },
        pixelPosition: function() {
            if (d == null) {
                q()
            }
            return d
        },
        reliableMarginRight: function() {
            if (d == null) {
                q()
            }
            return t
        },
        reliableMarginLeft: function() {
            if (d == null) {
                q()
            }
            return m
        }
    });

    function q() {
        var af, ae;
        f.appendChild(L);
        X.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%";
        d = U = m = false;
        R = t = true;
        if (window.getComputedStyle) {
            ae = window.getComputedStyle(X);
            d = (ae || {}).top !== "1%";
            m = (ae || {}).marginLeft === "2px";
            U = (ae || {
                width: "4px"
            }).width === "4px";
            X.style.marginRight = "50%";
            R = (ae || {
                marginRight: "4px"
            }).marginRight === "4px";
            af = X.appendChild(document.createElement("div"));
            af.style.cssText = X.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0";
            af.style.marginRight = af.style.width = "0";
            X.style.width = "1px";
            t = !parseFloat((window.getComputedStyle(af) || {}).marginRight);
            X.removeChild(af)
        }
        X.style.display = "none";
        I = X.getClientRects().length === 0;
        if (I) {
            X.style.display = "";
            X.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
            X.childNodes[0].style.borderCollapse = "separate";
            af = X.getElementsByTagName("td");
            af[0].style.cssText = "margin:0;border:0;padding:0;display:none";
            I = af[0].offsetHeight === 0;
            if (I) {
                af[0].style.display = "";
                af[1].style.display = "none";
                I = af[0].offsetHeight === 0
            }
        }
        f.removeChild(L)
    }
    var k, i, s = /^(top|right|bottom|left)$/;
    if (window.getComputedStyle) {
        k = function(af) {
            var ae = af.ownerDocument.defaultView;
            if (!ae || !ae.opener) {
                ae = window
            }
            return ae.getComputedStyle(af)
        };
        i = function(al, af, ak) {
            var ai, ah, aj, ae, ag = al.style;
            ak = ak || k(al);
            ae = ak ? ak.getPropertyValue(af) || ak[af] : undefined;
            if ((ae === "" || ae === undefined) && !x.contains(al.ownerDocument, al)) {
                ae = x.style(al, af)
            }
            if (ak) {
                if (!M.pixelMarginRight() && K.test(ae) && rmargin.test(af)) {
                    ai = ag.width;
                    ah = ag.minWidth;
                    aj = ag.maxWidth;
                    ag.minWidth = ag.maxWidth = ag.width = ae;
                    ae = ak.width;
                    ag.width = ai;
                    ag.minWidth = ah;
                    ag.maxWidth = aj
                }
            }
            return ae === undefined ? ae : ae + ""
        }
    } else {
        if (f.currentStyle) {
            k = function(ae) {
                return ae.currentStyle
            };
            i = function(ak, ah, aj) {
                var al, af, ae, ag, ai = ak.style;
                aj = aj || k(ak);
                ag = aj ? aj[ah] : undefined;
                if (ag == null && ai && ai[ah]) {
                    ag = ai[ah]
                }
                if (K.test(ag) && !s.test(ah)) {
                    al = ai.left;
                    af = ak.runtimeStyle;
                    ae = af && af.left;
                    if (ae) {
                        af.left = ak.currentStyle.left
                    }
                    ai.left = ah === "fontSize" ? "1em" : ag;
                    ag = ai.pixelLeft + "px";
                    ai.left = al;
                    if (ae) {
                        af.left = ae
                    }
                }
                return ag === undefined ? ag : ag + "" || "auto"
            }
        }
    }
    var g = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        p = (/<([\w:-]+)/),
        e = (/^\s+/),
        w = /<|&#?\w+;/,
        G = /^-ms-/,
        z = /-([\da-z])/gi,
        A = /^(none|table(?!-c[ea]).+)/,
        O = (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/);
    var b = ["Top", "Right", "Bottom", "Left"];
    var S = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: M.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    var C, Y = ["Webkit", "O", "Moz", "ms"],
        H = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    var X = document.createElement("div");
    if (!X.style) {
        return
    }
    C = X.style;
    M.cssFloat = !!X.style.cssFloat;
    var B = function(ae, af) {
        return af.toUpperCase()
    };
    var x = {
        type: function(ae) {
            if (ae == null) {
                return ae + ""
            }
            return typeof ae === "object" || typeof ae === "function" ? class2type[toString.call(ae)] || "object" : typeof ae
        },
        cssHooks: {},
        htmlPrefilter: function(ae) {
            return ae.replace(g, "<$1></$2>")
        },
        nodeName: function(af, ae) {
            return af.nodeName && af.nodeName.toLowerCase() === ae.toLowerCase()
        },
        merge: function(ai, ag) {
            var ae = +ag.length,
                af = 0,
                ah = ai.length;
            while (af < ae) {
                ai[ah++] = ag[af++]
            }
            if (ae !== ae) {
                while (ag[af] !== undefined) {
                    ai[ah++] = ag[af++]
                }
            }
            ai.length = ah;
            return ai
        },
        camelCase: function(ae) {
            return ae.replace(G, "ms-").replace(z, B)
        },
        cssProps: {
            "float": M.cssFloat ? "cssFloat" : "styleFloat"
        },
        cssNumber: {
            animationIterationCount: true,
            columnCount: true,
            fillOpacity: true,
            flexGrow: true,
            flexShrink: true,
            fontWeight: true,
            lineHeight: true,
            opacity: true,
            order: true,
            orphans: true,
            widows: true,
            zIndex: true,
            zoom: true
        }
    };

    function N(ae) {
        if (ae in C) {
            return ae
        }
        var ag = ae.charAt(0).toUpperCase() + ae.slice(1),
            af = Y.length;
        while (af--) {
            ae = Y[af] + ag;
            if (ae in C) {
                return ae
            }
        }
    }

    function o(ah, ae) {
        var af, ai, ag = 0,
            aj = typeof ah.getElementsByTagName !== "undefined" ? ah.getElementsByTagName(ae || "*") : typeof ah.querySelectorAll !== "undefined" ? ah.querySelectorAll(ae || "*") : undefined;
        if (!aj) {
            for (aj = [], af = ah.childNodes || ah;
                (ai = af[ag]) != null; ag++) {
                if (!ae || x.nodeName(ai, ae)) {
                    aj.push(ai)
                } else {
                    x.merge(aj, o(ai, ae))
                }
            }
        }
        return ae === undefined || ae && x.nodeName(ah, ae) ? x.merge([ah], aj) : aj
    }

    function j(af, ah) {
        var am, aj, al, ao, aq, ap, ag, ak = af.length,
            ai = V(ah),
            ae = [],
            an = 0;
        for (; an < ak; an++) {
            aj = af[an];
            if (aj || aj === 0) {
                if (l.type(aj) === "object") {
                    x.merge(ae, aj.nodeType ? [aj] : aj)
                } else {
                    if (!w.test(aj)) {
                        ae.push(ah.createTextNode(aj))
                    } else {
                        ao = ao || ai.appendChild(ah.createElement("div"));
                        aq = (p.exec(aj) || ["", ""])[1].toLowerCase();
                        ag = S[aq] || S._default;
                        ao.innerHTML = ag[1] + x.htmlPrefilter(aj) + ag[2];
                        am = ag[0];
                        while (am--) {
                            ao = ao.lastChild
                        }
                        if (!M.leadingWhitespace && e.test(aj)) {
                            ae.push(ah.createTextNode(e.exec(aj)[0]))
                        }
                        if (!M.tbody) {
                            aj = aq === "table" && !rtbody.test(aj) ? ao.firstChild : ag[1] === "<table>" && !rtbody.test(aj) ? ao : 0;
                            am = aj && aj.childNodes.length;
                            while (am--) {
                                if (x.nodeName((ap = aj.childNodes[am]), "tbody") && !ap.childNodes.length) {
                                    aj.removeChild(ap)
                                }
                            }
                        }
                        x.merge(ae, ao.childNodes);
                        ao.textContent = "";
                        while (ao.firstChild) {
                            ao.removeChild(ao.firstChild)
                        }
                        ao = ai.lastChild
                    }
                }
            }
        }
        if (ao) {
            ai.removeChild(ao)
        }
        an = 0;
        while ((aj = ae[an++])) {
            al = Q.contains(aj.ownerDocument, aj);
            ao = o(ai.appendChild(aj), "script");
            if (al) {
                setGlobalEval(ao)
            }
        }
        ao = null;
        return ai
    }

    function V(ag) {
        var af = H.split("|"),
            ae = ag.createDocumentFragment();
        if (ae.createElement) {
            while (af.length) {
                ae.createElement(af.pop())
            }
        }
        return ae
    }
    var E = function(aj, ai, ak, ah) {
        var ag, af, ae = {};
        for (af in ai) {
            ae[af] = aj.style[af];
            aj.style[af] = ai[af]
        }
        ag = ak.apply(aj, ah || []);
        for (af in ai) {
            aj.style[af] = ae[af]
        }
        return ag
    };
    var W = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
    var K = new RegExp("^(" + W + ")(?!px)[a-z%]+$", "i");

    function ac(ai, af, ae) {
        var ah = true,
            aj = af === "width" ? ai.offsetWidth : ai.offsetHeight,
            ag = k(ai),
            ak = M.boxSizing && x.css(ai, "boxSizing", false, ag) === "border-box";
        if (aj <= 0 || aj == null) {
            aj = i(ai, af, ag);
            if (aj < 0 || aj == null) {
                aj = ai.style[af]
            }
            if (K.test(aj)) {
                return aj
            }
            ah = ak && (M.boxSizingReliable() || aj === ai.style[af]);
            aj = parseFloat(aj) || 0
        }
        return (aj + u(ai, af, ae || (ak ? "border" : "content"), ah, ag))
    }

    function u(ai, af, ae, ak, ah) {
        var ag = ae === (ak ? "border" : "content") ? 4 : af === "width" ? 1 : 0,
            aj = 0;
        for (; ag < 4; ag += 2) {
            if (ae === "margin") {
                aj += x.css(ai, ae + b[ag], true, ah)
            }
            if (ak) {
                if (ae === "content") {
                    aj -= x.css(ai, "padding" + b[ag], true, ah)
                }
                if (ae !== "margin") {
                    aj -= x.css(ai, "border" + b[ag] + "Width", true, ah)
                }
            } else {
                aj += x.css(ai, "padding" + b[ag], true, ah);
                if (ae !== "padding") {
                    aj += x.css(ai, "border" + b[ag] + "Width", true, ah)
                }
            }
        }
        return aj
    }

    function P(ae) {
        return new RegExp("^(?:([+-])=|)(" + ae + ")([a-z%]*)$", "i")
    }

    function y(ae, ag, ah) {
        var af = P(ag);
        return af ? Math.max(0, af[2] - (ah || 0)) + (af[3] || "px") : ag
    }

    function n(af, ae, ai, an) {
        var ao, ag = 1,
            ak = 20,
            am = an ? function() {
                return an.cur()
            } : function() {
                return x.css(af, ae, "")
            },
            aj = am(),
            al = ai && ai[3] || (x.cssNumber[ae] ? "" : "px"),
            ah = (x.cssNumber[ae] || al !== "px" && +aj) && P(x.css(af, ae));
        if (ah && ah[3] !== al) {
            al = al || ah[3];
            ai = ai || [];
            ah = +aj || 1;
            do {
                ag = ag || ".5";
                ah = ah / ag;
                x.style(af, ae, ah + al)
            } while (ag !== (ag = am() / aj) && ag !== 1 && --ak)
        }
        if (ai) {
            ah = +ah || +aj || 0;
            ao = ai[1] ? ah + (ai[1] + 1) * ai[2] : +ai[2];
            if (an) {
                an.unit = al;
                an.start = ah;
                an.end = ao
            }
        }
        return ao
    }
    l.each(["height", "width"], function(ae, af) {
        x.cssHooks[ae] = {
            get: function(ai, ah, ag) {
                if (ah) {
                    return A.test(x.css(ai, "display")) && ai.offsetWidth === 0 ? E(ai, cssShow, function() {
                        return ac(ai, ae, ag)
                    }) : ac(ai, ae, ag)
                }
            },
            set: function(ai, aj, ag) {
                var ah = ag && k(ai);
                return y(ai, aj, ag ? u(ai, ae, ag, M.boxSizing && x.css(ai, "boxSizing", false, ah) === "border-box", ah) : 0)
            }
        }
    });
    l.style = x.style = function(ag, af, al, ah) {
        if (!ag || ag.nodeType === 3 || ag.nodeType === 8 || !ag.style) {
            return
        }
        var aj, ak, am, ai = x.camelCase(af),
            ae = ag.style;
        af = x.cssProps[ai] || (x.cssProps[ai] = N(ai) || ai);
        am = x.cssHooks[af] || x.cssHooks[ai];
        if (al !== undefined) {
            ak = typeof al;
            if (ak === "string" && (aj = P(al)) && aj[1]) {
                al = n(ag, af, aj);
                ak = "number"
            }
            if (al == null || al !== al) {
                return
            }
            if (ak === "number") {
                al += aj && aj[3] || (x.cssNumber[ai] ? "" : "px")
            }
            if (!M.clearCloneStyle && al === "" && af.indexOf("background") === 0) {
                ae[af] = "inherit"
            }
            if (!am || !("set" in am) || (al = am.set(ag, al, ah)) !== undefined) {
                ae[af] = al
            }
        } else {
            if (am && "get" in am && (aj = am.get(ag, false, ah)) !== undefined) {
                return aj
            }
            return ae[af]
        }
    };
    l.css = x.css = function(ak, ai, af, aj) {
        var ah, al, ae, ag = x.camelCase(ai);
        ai = x.cssProps[ag] || (x.cssProps[ag] = N(ag) || ag);
        ae = x.cssHooks[ai] || x.cssHooks[ag];
        if (ae && "get" in ae) {
            al = ae.get(ak, true, af)
        }
        if (al === undefined) {
            al = i(ak, ai, aj)
        }
        if (al === "normal" && ai in cssNormalTransform) {
            al = cssNormalTransform[ai]
        }
        if (af === "" || af) {
            ah = parseFloat(al);
            return af === true || isFinite(ah) ? ah || 0 : al
        }
        return al
    };
    var a = " ",
        ad = /[\n\t\r]/g,
        ab = function(ae) {
            return (a + ae + a).replace(ad, a)
        },
        aa = function(ai, ak) {
            var ah = ai.className,
                ae, af = ak.length,
                aj, ag;
            if (ah) {
                ae = ab(ah);
                aj = ah;
                ag = 0;
                for (; ag < af; ag++) {
                    if (ae.indexOf(a + ak[ag] + a) < 0) {
                        aj += a + ak[ag]
                    }
                }
                aj = l.trim(aj)
            } else {
                aj = ak.join(" ")
            }
            ai.className = aj
        },
        D = function(ai, ak) {
            var ag = ai.className,
                ah, ae = ak.length,
                af, aj;
            if (ag && ae) {
                ah = ab(ag);
                af = 0;
                for (; af < ae; af++) {
                    aj = a + ak[af] + a;
                    while (ah.indexOf(aj) >= 0) {
                        ah = ah.replace(aj, a)
                    }
                }
                ai.className = l.trim(ah)
            }
        };
    l.mix(F, {
        before: function(af) {
            var ag = this.getEL(),
                ae = af;
            if (typeof af === "string" && (af = l.trim(af)) && af.length >= 3 && l.startsWith(af, "<") && l.endsWith(af, ">")) {
                ae = l.parseHTML(af)[0]
            }
            ag.insertBefore(ae, ag.childNodes[0])
        },
        append: function(af) {
            var ag = this.getEL(),
                ae = af;
            if (typeof af === "string" && (af = l.trim(af)) && af.length >= 3 && l.startsWith(af, "<") && l.endsWith(af, ">")) {
                ae = l.parseHTML(af)[0]
            }
            ag.appendChild(ae)
        },
        html: function(ae) {
            this.getEL().innerHTML = ae
        },
        attr: function(ag, ae) {
            var af = this.getEL();
            if (ag == "class") {
                af.className = ae
            } else {
                af[ag] = ae
            }
        },
        style: function(ag, ae) {
            var af = this.getEL();
            x.style(af, ag, ae)
        },
        css: function(ae) {
            var af = this.getEL();
            l.each(ae, function(ag, ah) {
                x.style(af, ah, ag)
            })
        },
        addClass: function(ae) {
            var af = this.getEL();
            aa(af, ae.split(a))
        },
        removeClass: function(ae) {
            var af = this.getEL();
            D(af, ae.split(a))
        },
        parent: function() {
            var ae = this.getEL();
            return new J(ae.parentNode)
        },
        remove: function() {
            var ae = this.getEL();
            ae.parentNode.removeChild(ae)
        }
    });
    l.parseHTML = function(ag, af) {
        if (!ag || typeof ag !== "string") {
            return null
        }
        if (typeof af === "boolean") {
            af = false
        }
        af = af || document;
        var ae = O.exec(ag);
        if (ae) {
            return [af.createElement(ae[1])]
        }
        ae = j([ag], af);
        return x.merge([], ae.childNodes)
    }
})(dynamsoft.lib);
(function(d) {
    var b = Array.prototype,
        a = Function.prototype;
    if (!d.isFunction(b.indexOf)) {
        b.indexOf = function(g, h) {
            var f;
            if (this == null) {
                return -1
            }
            var i = Object(this);
            var e = i.length >>> 0;
            if (e === 0) {
                return -1
            }
            var j = +h || 0;
            if (Math.abs(j) === Infinity) {
                j = 0
            }
            if (j >= e) {
                return -1
            }
            f = Math.max(j >= 0 ? j : e - Math.abs(j), 0);
            while (f < e) {
                if (f in i && i[f] === g) {
                    return f
                }
                f++
            }
            return -1
        }
    }
    if (!d.isFunction(a.bind)) {
        a.bind = function(g) {
            var f = this;
            if (1 < arguments.length) {
                var e = b.slice.call(arguments, 1);
                return function() {
                    return f.apply(g, arguments.length ? e.concat(b.slice.call(arguments)) : e)
                }
            }
            return function() {
                return arguments.length ? f.apply(g, arguments) : f.call(g)
            }
        }
    }
    if (!String.prototype.trim) {
        String.prototype.trim = function() {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        }
    }
})(dynamsoft.lib);
(function(a) {
    var g = a.lib,
        d = a.navInfo,
        f = window.document,
        b, e;
    e = function(i) {
        var h = i;
        if (h == "mousewheel") {
            h = d.bGecko ? "DOMMouseScroll" : "mousewheel"
        }
        return h
    };
    b = {
        addEventListener: f.addEventListener ? function(i, k, j) {
            var h = e(k);
            if (i) {
                i.addEventListener(h, j, false)
            }
        } : function(i, k, j) {
            var h = e(k);
            if (i) {
                i.attachEvent("on" + h, j)
            }
        },
        removeEventListener: f.removeEventListener ? function(i, k, j) {
            var h = e(k);
            if (i) {
                i.removeEventListener(h, j, false)
            }
        } : function(i, k, j) {
            var h = e(k);
            if (i) {
                i.detachEvent("on" + h, j)
            }
        },
        getWheelDelta: function(h) {
            h = h || window.event;
            var k, j = h.wheelDelta,
                i = h.detail;
            if (j) {
                k = j / 120
            }
            if (i) {
                k = -(i % 3 === 0 ? i / 3 : i)
            }
            return k
        }
    };
    g.mix(g, b)
})(dynamsoft);
(function(a) {
    a.Events = {
        registedClass: [],
        registedObjs: []
    };
    var b = function(f) {
        f = f || window.event;
        var d = true;
        a.each(a.Events.registedObjs, function(e) {
            a.each(a.Events.registedClass, function(g) {
                if (e instanceof g) {
                    if (e.bFocus && e.handlerKeyDown) {
                        d = e.handlerKeyDown(f);
                        if (!d) {
                            return false
                        }
                    }
                }
            })
        });
        return d
    };
    a.addEventListener(document.documentElement, "keydown", b)
})(dynamsoft.lib);
(function(a) {
    a.stopPropagation = function(b) {
        var d = b || window.event;
        if (d.preventDefault) {
            d.preventDefault()
        }
        if (d.stopPropagation) {
            d.stopPropagation()
        }
        d.returnValue = false;
        d.cancelBubble = true
    }
})(dynamsoft.lib);
(function(b) {
    var a = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    };
    b.EnumMouseButton = a;
    b.detectButton = function(d) {
        d = d || window.event;
        if (d.which == null) {
            return (d.button < 2) ? a.LEFT : ((d.button == 4) ? a.MIDDLE : a.RIGHT)
        } else {
            return (d.which < 2) ? a.LEFT : ((d.which == 2) ? a.MIDDLE : a.RIGHT)
        }
    };
    b.fireEvent = function(d, e) {
        var f;
        if (doc.createEvent) {
            f = doc.createEvent("HTMLEvents");
            f.initEvent(d, TRUE, TRUE);
            if (e.dispatchEvent) {
                e.dispatchEvent(f)
            }
        } else {
            if (doc.createEventObject) {
                f = doc.createEventObject();
                f.bubbles = TRUE;
                f.cancelable = TRUE;
                e.fireEvent(d, f)
            } else {
                f = new Event(d);
                if (e.dispatchEvent) {
                    e.dispatchEvent(f)
                }
            }
        }
    }
})(dynamsoft.lib);
(function(s, e, o) {
    var l = window,
        h = /^(?:about|app|app\-storage|.+\-extension|file|widget)$/,
        F = 200,
        b = 204,
        g = 300,
        t = 304,
        n = 404,
        f = 1223,
        u = 500,
        C = -1022,
        E = "The local service (Dynamsoft Service) is disconnected.",
        x = "open error: ",
        v = "send error: ",
        i = new s.Uri(location.href),
        B = i && h.test(i.getScheme()),
        D = false,
        j = function() {
            try {
                return new l.XMLHttpRequest
            } catch (H) {}
            return o
        },
        w = function() {
            try {
                var H = false;
                s.each(["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.3.0", "Msxml3.XMLHTTP"], function(J) {
                    try {
                        return (H = new l.ActiveXObject(J))
                    } catch (K) {
                        s.error("new xhr error: " + K.message)
                    }
                });
                return H
            } catch (I) {}
            return o
        },
        r = (!B && l.XMLHttpRequest) ? ("withCredentials" in (j() || [])) : false,
        A = l.ActiveXObject ? function(H) {
            if (e.bIE && (parseInt(e.strBrowserVersion) <= 9)) {
                return w()
            }
            if (!r && H && D) {
                return new D
            }
            return !B && j() || w()
        } : j,
        p = function(H) {
            return D && (H instanceof D)
        },
        y = {
            url: false,
            onSuccess: false,
            onError: false,
            onComplete: false,
            method: "GET",
            async: true,
            xhrFields: false,
            mimeType: false,
            username: false,
            password: false,
            data: false,
            dataType: "text",
            headers: false,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            beforeSend: false,
            afterSend: false,
            timeout: 0,
            crossDomain: false
        },
        m = /^(?:GET|HEAD)$/,
        a = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        G = {
            xml: "application/xml, text/xml",
            html: "text/html",
            text: "text/plain",
            json: "application/json, text/javascript",
            "*": "*/*"
        },
        z = s.nil,
        k, d;
    if (e.bIE && parseInt(e.strBrowserVersion) <= 10) {
        z = s.noop
    }
    k = {
        setRequestHeader: function(I, J) {
            var H = this;
            H.headers[I] = J;
            return H
        },
        getAllResponseHeaders: function() {
            var H = this;
            return H.state === 2 ? H.responseHeadersString : null
        },
        getNativeXhr: function() {
            var H = this;
            return H.nativeXhr
        },
        getResponseHeader: function(J) {
            var I, H = this,
                K;
            J = J.toLowerCase();
            if (H.state === 2) {
                if (!(K = H.responseHeaders)) {
                    K = H.responseHeaders = {};
                    while (I = a.exec(H.responseHeadersString)) {
                        K[I[1].toLowerCase()] = I[2]
                    }
                }
                I = K[J]
            }
            return I === o ? null : I
        },
        overrideMimeType: function(I) {
            var H = this;
            if (!H.state) {
                H.mimeType = I
            }
            return H
        },
        abort: function(I) {
            var H = this;
            I = I || "abort";
            if (H.nativeXhr) {
                H.nativeXhr.abort()
            }
            H._ioReady(0, I);
            return H
        },
        _ioReady: function(L, J) {
            var R = this,
                I;
            if (R.state === 2) {
                return
            }
            R.state = 2;
            R.readyState = 4;
            if (L >= F && L < g || L === t) {
                if (L === t) {
                    J = "not modified";
                    I = true
                } else {
                    J = "success";
                    I = true
                }
            } else {
                if (L < 0) {
                    L = 0
                }
            }
            try {
                if (L >= F) {
                    R.handleResponseData()
                }
            } catch (N) {
                s.error(N.stack || N, "error");
                J = N.message || "parser error"
            }
            R.status = L;
            R.statusText = J;
            var K = R,
                O;
            if (O = R.timeoutTimer) {
                clearTimeout(O);
                R.timeoutTimer = 0
            }
            var Q = I ? "onSuccess" : "onError",
                M, P = [R.responseData, J, R],
                H = K.context;
            M = K[Q];
            if (s.isFunction(M)) {
                M.apply(H, P)
            }
            M = K.onComplete;
            if (s.isFunction(M)) {
                M.apply(H, P)
            }
        },
        handleResponseData: function() {
            var J = this,
                H, I = J.dataType,
                L = J.nativeXhr;
            if (I === "blob" || I === "arraybuffer") {
                H = !!l.Blob ? L.response : L.responseBody
            } else {
                if (I == "json") {
                    if (L.responseType && L.responseType.toLowerCase() == "json") {
                        H = L.response
                    } else {
                        H = L.responseText ? ((l.JSON && l.JSON.parse) ? l.JSON.parse(L.responseText) : s.parse(L.responseText)) : {}
                    }
                } else {
                    if (I === "user-defined") {
                        H = L.response !== o ? L.response : L.responseText
                    } else {
                        J.responseText = H = L.responseText || "";
                        try {
                            var K = L.responseXML;
                            if (K && K.documentElement) {
                                J.responseXML = K
                            }
                        } catch (M) {}
                    }
                }
            }
            J.responseData = H
        },
        sendInternal: function() {
            var S = this,
                W = S,
                O, I, J, V, T, U, K, P, N, M;
            I = S.method;
            J = S.url;
            V = S.dataType;
            K = S.mimeType;
            if (!s.isString(J)) {
                return
            }
            W.nativeXhr = T = A(S.crossDomain);
            if (!T) {
                return
            }
            try {
                W.state = 1;
                if (S.username) {
                    T.open(I, J, S.async, S.username, S.password)
                } else {
                    T.open(I, J, S.async)
                }
                if ((S.async || e.bIE) && V && V != "user-defined" && ("responseType" in T)) {
                    try {
                        T.responseType = V
                    } catch (Q) {}
                }
            } catch (R) {
                if (W.state < 2) {
                    s.error(R.stack || R, "error");
                    W._ioReady(-1, x + (s.isNumber(R.number) ? "(" + R.number + ")" : "") + (R.message || ""))
                } else {
                    s.error(R)
                }
                return
            }
            U = S.xhrFields || {};
            if ("withCredentials" in U) {
                if (!r) {
                    delete U.withCredentials
                }
            }
            for (O in U) {
                try {
                    T[O] = U[O]
                } catch (Q) {
                    s.error(Q)
                }
            }
            if (K && T.overrideMimeType) {
                T.overrideMimeType(K)
            }
            P = S.headers || {};
            var L = P["X-Requested-With"];
            if (L === false) {
                delete P["X-Requested-With"]
            }
            if (typeof T.setRequestHeader !== "undefined") {
                if (S.contentType) {
                    T.setRequestHeader("Content-Type", S.contentType)
                }
                T.setRequestHeader("Accept", V && G[V] ? G[V] + (V === "*" ? "" : ", */*; q=0.01") : G["*"]);
                for (O in P) {
                    T.setRequestHeader(O, P[O])
                }
            }
            N = !m.test(S.method);
            M = N && S.data || null;
            if (N && e.bIE && parseInt(e.strBrowserVersion) < 10) {
                M = S.data
            }
            if (S.async && S.timeout > 0) {
                W.timeoutTimer = setTimeout(function() {
                    W.abort("timeout")
                }, S.timeout * 1000)
            }
            try {
                W.state = 1;
                if (s.isFunction(W.beforeSend)) {
                    var H = W.beforeSend(T, W);
                    if (H === false) {
                        W.abort("cancel");
                        return
                    }
                }
                T.send(M);
                if (s.isFunction(W.afterSend)) {
                    W.afterSend(W)
                }
            } catch (Q) {
                if (W.state < 2) {
                    s.error(Q.stack || Q, "error");
                    W._ioReady(-1, v + (Q.message || ""))
                } else {
                    s.error(Q)
                }
            }
            if (!S.async || T.readyState === 4) {
                W._callback()
            } else {
                if (p(T)) {
                    T.onload = function() {
                        T.readyState = 4;
                        T.status = F;
                        W._callback()
                    };
                    T.onerror = function() {
                        T.readyState = 4;
                        T.status = u;
                        W._callback()
                    }
                } else {
                    T.onreadystatechange = function() {
                        W._callback()
                    }
                }
            }
        },
        _callback: function(I, N) {
            var J = this,
                K = J.nativeXhr;
            try {
                if (K.readyState === 4 || N) {
                    if (p(K)) {
                        K.onerror = z;
                        K.onload = z
                    } else {
                        K.onreadystatechange = z
                    }
                    if (N) {
                        if (K.readyState !== 4) {
                            K.abort()
                        }
                    } else {
                        if (!p(K)) {
                            J.responseHeadersString = K.getAllResponseHeaders()
                        }
                        var H = K.status,
                            M;
                        try {
                            M = K.statusText
                        } catch (L) {
                            s.error("xhr statusText error: ");
                            s.error(L);
                            M = ""
                        }
                        J._ioReady(H, M)
                    }
                }
            } catch (L) {
                s.error(L.stack || L, "error");
                if (L.errorCode === C) {
                    throw {
                        errorCode: C,
                        errorString: E,
                        toString: function() {
                            return this.errorCode + ": " + this.errorString
                        }
                    }
                }
                K.onreadystatechange = z;
                if (!N) {
                    J._ioReady(-1, L.message || "process error")
                }
            }
        },
        _setupCfg: function(L) {
            var I = this,
                H, K, N, J, M;
            J = L.url;
            if (s.startsWith(J, "http://") || s.startsWith(J, "https://")) {
                M = new s.Uri(J)
            } else {
                if (s.startsWith(J, "//")) {
                    L.url = J = "http:" + J
                }
                M = i.resolve(J)
            }
            if (!L.dataType) {
                H = "text"
            } else {
                H = L.dataType.toLowerCase()
            }
            L.dataType = H;
            if (!L.method) {
                L.method = "GET"
            } else {
                L.method = L.method.toUpperCase()
            }
            if (!("crossDomain" in L)) {
                L.crossDomain = !M.isSameOriginAs(i)
            }
            N = L.headers;
            for (K in N) {
                if (s.isUndefined(N[K])) {
                    delete N[K]
                }
            }
            s.mix(I, L);
            I.state = 1
        }
    };

    function q(I) {
        var H = this;
        if (!I || !s.isString(I.url)) {
            s.log("the url is error.");
            return
        }
        if (!(H instanceof q)) {
            return new q(I)
        }
        s.mix(H, y);
        s.mix(H, k);
        if (I instanceof q) {
            I = I.config
        }
        H.config = I;
        H.config.context = H;
        H._setupCfg(I);
        H.sendInternal()
    }
    q._strOpenErr = x;
    q._strSendErr = v;
    q._strConnectionToServiceLostString = E;
    d = {
        ajax: q,
        io: {
            get: function(I, J, K, H) {
                return new q({
                    method: "GET",
                    url: I,
                    onSuccess: J,
                    onError: K,
                    dataType: H
                })
            },
            post: function(I, K, J, L, H) {
                return new q({
                    method: "POST",
                    data: K,
                    url: I,
                    onSuccess: J,
                    onError: L,
                    dataType: H
                })
            },
            put: function(I, K, J, L, H) {
                return new q({
                    method: "PUT",
                    data: K,
                    url: I,
                    onSuccess: J,
                    onError: L,
                    dataType: H
                })
            }
        }
    };
    s.mix(s, d)
})(dynamsoft.lib, dynamsoft.navInfo);
(function(i) {
    var l = (function() {
        var p = {
                "\b": "\\b",
                "\f": "\\f",
                "\n": "\\n",
                "\r": "\\r",
                "\t": "\\t",
                '"': '\\"'
            },
            o = {},
            q = /["\b\f\n\r\t\x00-\x1f]/g,
            n = /\\\\|\\\/|\\b|\\f|\\n|\\r|\\t|\\"|\\u[0-9a-zA-Z]{4}/g;
        i.each(p, function(r, s) {
            o[r] = s
        });
        o["\\/"] = "/";
        o["\\\\"] = "\\";
        return {
            quote: function(r) {
                return '"' + r.replace(q, function(s) {
                    var t;
                    if (!(t = p[s])) {
                        t = "\\u" + ("0000" + s.charCodeAt(0).toString(16)).slice(0 - 4)
                    }
                    return t
                }) + '"'
            },
            unQuote: function(r) {
                return r.slice(1, r.length - 1).replace(n, function(s) {
                    var t;
                    if (!(t = o[s])) {
                        t = String.fromCharCode(parseInt(s.slice(2), 16))
                    }
                    return t
                })
            }
        }
    })();

    function b(o) {
        return o < 10 ? "0" + o : o
    }

    function j(q, p, t, r, u, o, n) {
        var s = p[q];
        if (s && typeof s === "object") {
            if (typeof s.toJSON === "function") {
                s = s.toJSON(q)
            } else {
                if (s instanceof Date) {
                    s = isFinite(s.valueOf()) ? s.getUTCFullYear() + "-" + b(s.getUTCMonth() + 1) + "-" + b(s.getUTCDate()) + "T" + b(s.getUTCHours()) + ":" + b(s.getUTCMinutes()) + ":" + b(s.getUTCSeconds()) + "Z" : null
                } else {
                    if (s instanceof String || s instanceof Number || s instanceof Boolean) {
                        s = s.valueOf()
                    }
                }
            }
        }
        if (t !== undefined) {
            s = t.call(p, q, s)
        }
        switch (typeof s) {
            case "number":
                return isFinite(s) ? String(s) : "null";
            case "string":
                return l.quote(s);
            case "boolean":
                return String(s);
            case "object":
                if (!s) {
                    return "null"
                }
                if (i.isArray(s)) {
                    return m(s, t, r, u, o, n)
                }
                return g(s, t, r, u, o, n)
        }
        return undefined
    }

    function g(E, y, q, D, C, s) {
        var t = s;
        s += D;
        var u, o, w, r;
        if (q !== undefined) {
            u = q
        } else {
            u = i.keys(E)
        }
        var B = [];
        for (w = 0, o = u.length; w < o; w++) {
            r = u[w];
            var n = j(r, E, y, q, D, C, s);
            if (n !== undefined) {
                var v = l.quote(r);
                v += ":";
                if (D) {
                    v += " "
                }
                v += n;
                B[B.length] = v
            }
        }
        var z;
        if (!B.length) {
            z = "{}"
        } else {
            if (!D) {
                z = "{" + B.join(",") + "}"
            } else {
                var x = ",\n" + s;
                var A = B.join(x);
                z = "{\n" + s + A + "\n" + t + "}"
            }
        }
        return z
    }

    function m(A, s, o, z, y, p) {
        var q = p;
        p += z;
        var x = [];
        var u = A.length;
        var t = 0;
        while (t < u) {
            var n = j(String(t), A, s, o, z, y, p);
            if (n === undefined) {
                x[x.length] = "null"
            } else {
                x[x.length] = n
            }++t
        }
        var v;
        if (!x.length) {
            v = "[]"
        } else {
            if (!z) {
                v = "[" + x.join(",") + "]"
            } else {
                var r = "\n," + p;
                var w = x.join(r);
                v = "[\n" + p + w + "\n" + q + "]"
            }
        }
        return v
    }
    i.stringify = function(q, n, p) {
        var s = "";
        var o, r;
        if (n) {
            if (typeof n === "function") {
                r = n
            } else {
                if (i.isArray(n)) {
                    o = n
                }
            }
        }
        if (typeof p === "number") {
            p = Math.min(10, p);
            s = new Array(p + 1).join(" ")
        } else {
            if (typeof p === "string") {
                s = p.slice(0, 10)
            }
        }
        return j("", {
            "": q
        }, r, o, s, [], "")
    };
    var d = {},
        e = {
            SHIFT_TYPE: 1,
            REDUCE_TYPE: 2,
            ACCEPT_TYPE: 0,
            TYPE_INDEX: 0,
            PRODUCTION_INDEX: 1,
            TO_INDEX: 2
        },
        a;
    d.yy = {
        unQuote: l.unQuote
    };
    a = function(n) {
        var o = this;
        o.rules = [];
        i.mix(o, n);
        o.resetInput(o.input)
    };
    a.prototype = {
        constructor: function(n) {
            var o = this;
            o.rules = [];
            i.mix(o, n);
            o.resetInput(o.input)
        },
        resetInput: function(n) {
            i.mix(this, {
                input: n,
                matched: "",
                stateStack: [a.STATIC.INITIAL],
                match: "",
                text: "",
                firstLine: 1,
                lineNumber: 1,
                lastLine: 1,
                firstColumn: 1,
                lastColumn: 1
            })
        },
        getCurrentRules: function() {
            var n = this,
                o = n.stateStack[n.stateStack.length - 1],
                p = [];
            o = n.mapState(o);
            i.each(n.rules, function(q) {
                var s = q.state || q[3];
                if (!s) {
                    if (o == a.STATIC.INITIAL) {
                        p.push(q)
                    }
                } else {
                    if (i.inArray(o, s)) {
                        p.push(q)
                    }
                }
            });
            return p
        },
        pushState: function(n) {
            this.stateStack.push(n)
        },
        popState: function() {
            return this.stateStack.pop()
        },
        getStateStack: function() {
            return this.stateStack
        },
        showDebugInfo: function() {
            var p = this,
                r = a.STATIC.DEBUG_CONTEXT_LIMIT,
                n = p.matched,
                q = p.match,
                o = p.input;
            n = n.slice(0, n.length - q.length);
            var t = (n.length > r ? "..." : "") + n.slice(-r).replace(/\n/, " "),
                s = q + o;
            s = s.slice(0, r) + (s.length > r ? "..." : "");
            return t + s + "\n" + new Array(t.length + 1).join("-") + "^"
        },
        mapSymbol: function(p) {
            var n = this,
                o = n.symbolMap;
            if (!o) {
                return p
            }
            return o[p] || (o[p] = (++n.symbolId))
        },
        mapReverseSymbol: function(o) {
            var n = this,
                q = n.symbolMap,
                p, r = n.reverseSymbolMap;
            if (!r && q) {
                r = n.reverseSymbolMap = {};
                for (p in q) {
                    r[q[p]] = p
                }
            }
            if (r) {
                return r[o]
            } else {
                return o
            }
        },
        mapState: function(p) {
            var n = this,
                o = n.stateMap;
            if (!o) {
                return p
            }
            return o[p] || (o[p] = (++n.stateId))
        },
        lex: function() {
            var x = this,
                v = x.input,
                q, u, n, s, y, w = x.getCurrentRules();
            x.match = x.text = "";
            if (!v) {
                return x.mapSymbol(a.STATIC.END_TAG)
            }
            for (q = 0; q < w.length; q++) {
                u = w[q];
                var t = u.regexp || u[1],
                    o = u.token || u[0],
                    p = u.action || u[2] || undefined;
                if (n = v.match(t)) {
                    y = n[0].match(/\n.*/g);
                    if (y) {
                        x.lineNumber += y.length
                    }
                    i.mix(x, {
                        firstLine: x.lastLine,
                        lastLine: x.lineNumber + 1,
                        firstColumn: x.lastColumn,
                        lastColumn: y ? y[y.length - 1].length - 1 : x.lastColumn + n[0].length
                    });
                    var r;
                    r = x.match = n[0];
                    x.matches = n;
                    x.text = r;
                    x.matched += r;
                    s = p && p.call(x);
                    if (s === undefined) {
                        s = o
                    } else {
                        s = x.mapSymbol(s)
                    }
                    v = v.slice(r.length);
                    x.input = v;
                    if (s) {
                        return s
                    } else {
                        return x.lex()
                    }
                }
            }
            i.error("lex error at line " + x.lineNumber + ":\n" + x.showDebugInfo());
            return undefined
        }
    };
    a.STATIC = {
        INITIAL: "I",
        DEBUG_CONTEXT_LIMIT: 20,
        END_TAG: "$EOF"
    };
    var f = new a({
        rules: [
            [2, /^"(\\"|\\\\|\\\/|\\b|\\f|\\n|\\r|\\t|\\u[0-9a-zA-Z]{4}|[^\\"\x00-\x1f])*"/, 0],
            [0, /^[\t\r\n\x20]/, 0],
            [3, /^,/, 0],
            [4, /^:/, 0],
            [5, /^\[/, 0],
            [6, /^\]/, 0],
            [7, /^\{/, 0],
            [8, /^\}/, 0],
            [9, /^-?\d+(?:\.\d+)?(?:e-?\d+)?/i, 0],
            [10, /^true|false/, 0],
            [11, /^null/, 0],
            [12, /^./, 0]
        ]
    });
    d.lexer = f;
    f.symbolMap = {
        "$EOF": 1,
        STRING: 2,
        COMMA: 3,
        COLON: 4,
        LEFT_BRACKET: 5,
        RIGHT_BRACKET: 6,
        LEFT_BRACE: 7,
        RIGHT_BRACE: 8,
        NUMBER: 9,
        BOOLEAN: 10,
        NULL: 11,
        INVALID: 12,
        "$START": 13,
        json: 14,
        value: 15,
        object: 16,
        array: 17,
        elementList: 18,
        member: 19,
        memberList: 20
    };
    d.productions = [
        [13, [14]],
        [14, [15], function() {
            return this.$1
        }],
        [15, [2], function() {
            return this.yy.unQuote(this.$1)
        }],
        [15, [9], function() {
            return parseFloat(this.$1)
        }],
        [15, [16], function() {
            return this.$1
        }],
        [15, [17], function() {
            return this.$1
        }],
        [15, [10], function() {
            return this.$1 === "true"
        }],
        [15, [11], function() {
            return null
        }],
        [18, [15], function() {
            return [this.$1]
        }],
        [18, [18, 3, 15], function() {
            this.$1[this.$1.length] = this.$3;
            return this.$1
        }],
        [17, [5, 6], function() {
            return []
        }],
        [17, [5, 18, 6], function() {
            return this.$2
        }],
        [19, [2, 4, 15], function() {
            return {
                key: this.yy.unQuote(this.$1),
                value: this.$3
            }
        }],
        [20, [19], function() {
            var n = {};
            n[this.$1.key] = this.$1.value;
            return n
        }],
        [20, [20, 3, 19], function() {
            this.$1[this.$3.key] = this.$3.value;
            return this.$1
        }],
        [16, [7, 8], function() {
            return {}
        }],
        [16, [7, 20, 8], function() {
            return this.$2
        }]
    ];
    d.table = {
        gotos: {
            "0": {
                "14": 7,
                "15": 8,
                "16": 9,
                "17": 10
            },
            "2": {
                "15": 12,
                "16": 9,
                "17": 10,
                "18": 13
            },
            "3": {
                "19": 16,
                "20": 17
            },
            "18": {
                "15": 23,
                "16": 9,
                "17": 10
            },
            "20": {
                "15": 24,
                "16": 9,
                "17": 10
            },
            "21": {
                "19": 25
            }
        },
        action: {
            "0": {
                "2": [1, 0, 1],
                "5": [1, 0, 2],
                "7": [1, 0, 3],
                "9": [1, 0, 4],
                "10": [1, 0, 5],
                "11": [1, 0, 6]
            },
            "1": {
                "1": [2, 2, 0],
                "3": [2, 2, 0],
                "6": [2, 2, 0],
                "8": [2, 2, 0]
            },
            "2": {
                "2": [1, 0, 1],
                "5": [1, 0, 2],
                "6": [1, 0, 11],
                "7": [1, 0, 3],
                "9": [1, 0, 4],
                "10": [1, 0, 5],
                "11": [1, 0, 6]
            },
            "3": {
                "2": [1, 0, 14],
                "8": [1, 0, 15]
            },
            "4": {
                "1": [2, 3, 0],
                "3": [2, 3, 0],
                "6": [2, 3, 0],
                "8": [2, 3, 0]
            },
            "5": {
                "1": [2, 6, 0],
                "3": [2, 6, 0],
                "6": [2, 6, 0],
                "8": [2, 6, 0]
            },
            "6": {
                "1": [2, 7, 0],
                "3": [2, 7, 0],
                "6": [2, 7, 0],
                "8": [2, 7, 0]
            },
            "7": {
                "1": [0, 0, 0]
            },
            "8": {
                "1": [2, 1, 0]
            },
            "9": {
                "1": [2, 4, 0],
                "3": [2, 4, 0],
                "6": [2, 4, 0],
                "8": [2, 4, 0]
            },
            "10": {
                "1": [2, 5, 0],
                "3": [2, 5, 0],
                "6": [2, 5, 0],
                "8": [2, 5, 0]
            },
            "11": {
                "1": [2, 10, 0],
                "3": [2, 10, 0],
                "6": [2, 10, 0],
                "8": [2, 10, 0]
            },
            "12": {
                "3": [2, 8, 0],
                "6": [2, 8, 0]
            },
            "13": {
                "3": [1, 0, 18],
                "6": [1, 0, 19]
            },
            "14": {
                "4": [1, 0, 20]
            },
            "15": {
                "1": [2, 15, 0],
                "3": [2, 15, 0],
                "6": [2, 15, 0],
                "8": [2, 15, 0]
            },
            "16": {
                "3": [2, 13, 0],
                "8": [2, 13, 0]
            },
            "17": {
                "3": [1, 0, 21],
                "8": [1, 0, 22]
            },
            "18": {
                "2": [1, 0, 1],
                "5": [1, 0, 2],
                "7": [1, 0, 3],
                "9": [1, 0, 4],
                "10": [1, 0, 5],
                "11": [1, 0, 6]
            },
            "19": {
                "1": [2, 11, 0],
                "3": [2, 11, 0],
                "6": [2, 11, 0],
                "8": [2, 11, 0]
            },
            "20": {
                "2": [1, 0, 1],
                "5": [1, 0, 2],
                "7": [1, 0, 3],
                "9": [1, 0, 4],
                "10": [1, 0, 5],
                "11": [1, 0, 6]
            },
            "21": {
                "2": [1, 0, 14]
            },
            "22": {
                "1": [2, 16, 0],
                "3": [2, 16, 0],
                "6": [2, 16, 0],
                "8": [2, 16, 0]
            },
            "23": {
                "3": [2, 9, 0],
                "6": [2, 9, 0]
            },
            "24": {
                "3": [2, 12, 0],
                "8": [2, 12, 0]
            },
            "25": {
                "3": [2, 14, 0],
                "8": [2, 14, 0]
            }
        }
    };
    d.parse = function h(x) {
        var z = this,
            n = z.lexer,
            s, E, D, H = z.table,
            A = H.gotos,
            r = H.action,
            q = z.productions,
            t = [null],
            u = [0];
        n.resetInput(x);
        while (1) {
            s = u[u.length - 1];
            if (!E) {
                E = n.lex()
            }
            if (!E) {
                i.log("it is not a valid input: " + x, "error");
                return false
            }
            D = r[s] && r[s][E];
            if (!D) {
                var v = [],
                    C;
                if (r[s]) {
                    i.each(r[s], function(K, L) {
                        v.push(z.lexer.mapReverseSymbol(L))
                    })
                }
                C = "Syntax error at line " + n.lineNumber + ":\n" + n.showDebugInfo() + "\nexpect " + v.join(", ");
                i.log(C);
                return false
            }
            switch (D[e.TYPE_INDEX]) {
                case e.SHIFT_TYPE:
                    u.push(E);
                    t.push(n.text);
                    u.push(D[e.TO_INDEX]);
                    E = null;
                    break;
                case e.REDUCE_TYPE:
                    var I = q[D[e.PRODUCTION_INDEX]],
                        y = I.symbol || I[0],
                        p = I.action || I[2],
                        B = I.rhs || I[1],
                        G = B.length,
                        F = 0,
                        J, w = t[t.length - G];
                    z.$$ = w;
                    J = undefined;
                    for (; F < G; F++) {
                        z["$" + (G - F)] = t[t.length - 1 - F]
                    }
                    if (p) {
                        J = p.call(z)
                    }
                    if (J !== undefined) {
                        w = J
                    } else {
                        w = z.$$
                    }
                    if (G) {
                        u = u.slice(0, -1 * G * 2);
                        t = t.slice(0, -1 * G)
                    }
                    u.push(y);
                    t.push(w);
                    var o = A[u[u.length - 2]][u[u.length - 1]];
                    u.push(o);
                    break;
                case e.ACCEPT_TYPE:
                    return w
            }
        }
        return undefined
    };
    i.parser = d;

    function k(v, n, w) {
        var r = v[n],
            s, u, t;
        if (typeof r === "object") {
            if (i.isArray(r)) {
                s = 0;
                u = r.length;
                var q = [];
                while (s < u) {
                    t = k(r, String(s), w);
                    if (t !== undefined) {
                        q[q.length] = t
                    }
                }
                r = q
            } else {
                var x = i.keys(r);
                for (s = 0, u = x.length; s < u; s++) {
                    var o = x[s];
                    t = k(r, o, w);
                    if (t === undefined) {
                        delete r[o]
                    } else {
                        r[o] = t
                    }
                }
            }
        }
        return w.call(v, n, r)
    }
    i.parse = function(r, n) {
        var q = window,
            p = q.JSON;
        if (p && p.parse) {
            return p.parse(String(r))
        }
        var o = d.parse(String(r));
        if (n) {
            return k({
                "": o
            }, "", n)
        } else {
            return o
        }
    }
})(dynamsoft.lib);
(function(m, l) {
    var i = window,
        o = document,
        e = !0,
        k = !1,
        p = {},
        j = (l.bIE && l.IEMode < 8),
        q = j && (l.IEMode < 7),
        r = 500000,
        f = 1000,
        b = function(s) {
            var v, u, t;
            v = o.body.scrollTop || o.documentElement.scrollTop;
            if (i.innerHeight) {
                t = i.innerHeight
            } else {
                t = o.documentElement.clientHeight
            }
            u = v + (t - s.offsetHeight) / 2;
            s.style.top = u + "px";
            s._dlgInfo.isTopOverridden = e
        },
        n = function(s, u) {
            for (var t = 0; t < s.length; ++t) {
                if (s[t] == u) {
                    return e
                }
            }
            return k
        },
        d = function(v) {
            for (var w = 0; w < o.styleSheets.length; ++w) {
                var B = o.styleSheets[w],
                    y = k,
                    t = k,
                    A, C;
                try {
                    y = B.cssRules;
                    t = o.querySelectorAll
                } catch (x) {}
                if (y && t) {
                    for (var u = 0; u < y.length; ++u) {
                        A = y[u];
                        C = k;
                        try {
                            C = t(A.selectorText)
                        } catch (x) {}
                        if (C && n(C, v)) {
                            var s = A.style.getPropertyValue("top"),
                                z = A.style.getPropertyValue("bottom");
                            if ((s && s != "auto") || (z && z != "auto")) {
                                return e
                            }
                        }
                    }
                }
            }
            return k
        },
        a = function(t) {
            var s = k;
            if (i.getComputedStyle) {
                s = i.getComputedStyle(t)
            } else {
                if (t.currentStyle) {
                    s = t.currentStyle
                }
            }
            if (s && s.position != "absolute") {
                return k
            }
            if ((t.style.top != "auto" && t.style.top != "") || (t.style.bottom != "auto" && t.style.bottom != "")) {
                return k
            }
            return !d(t)
        };
    p.showDialog = function(x) {
        var y = this,
            u;
        if (y.open) {
            m.error("showDialog called on open dialog.");
            return
        }
        y.open = e;
        y.setAttribute("open", "open");
        if (j) {
            u = q ? o.body : o.documentElement;
            y._dlgInfo.docOverflow = u.style.overflow;
            u.style.overflow = "hidden"
        }
        if (a(y)) {
            b(y)
        }
        if (x) {
            y._dlgInfo.modal = e;
            p.dm.pushDialog(y);
            if (j) {
                var t, s, w = k,
                    v = k;
                t = y.currentStyle.left;
                s = y.currentStyle.top;
                if (t === "auto") {
                    if (q) {
                        y.style.textAlign = "center"
                    }
                    t = (u.clientWidth - y.currentStyle.width) / 2
                } else {
                    if (t.indexOf("%") > 0) {
                        w = t;
                        t = Number(t.replace("%", "") * u.clientWidth / 100)
                    } else {
                        t = Number(t.replace("px", ""))
                    }
                }
                if (!(t > 0)) {
                    t = 0
                }
                if (s === "auto") {
                    s = (u.clientHeight - y.currentStyle.height) / 2
                } else {
                    if (s.indexOf("%") > 0) {
                        v = s;
                        s = Number(s.replace("%", "") * u.clientHeight / 100)
                    } else {
                        s = Number(s.replace("px", ""))
                    }
                }
                if (!(s > 0)) {
                    s = 0
                }
                setTimeout(function() {
                    var A = y.style,
                        z = y._dlgInfo.mask;
                    z.style.backgroundColor = "#000";
                    z.style.filter = "alpha(opacity=30)";
                    A.position = "absolute";
                    A.left = t + "px";
                    A.top = s + "px"
                }, 0);
                y._scrollFn = function() {
                    var A = u.scrollTop + "px",
                        D = u.scrollLeft + "px",
                        z = p.dm.overlay,
                        C = y._dlgInfo.mask,
                        B = y.style;
                    if ((s + u.scrollTop + u.clientHeight) < u.scrollHeight) {
                        B.top = s + u.scrollTop + "px"
                    } else {
                        B.top = A
                    }
                    if (z) {
                        z.style.top = A
                    }
                    if (C) {
                        C.style.top = A
                    }
                    B.left = D;
                    if (z) {
                        z.style.left = D
                    }
                    if (C) {
                        C.style.left = D
                    }
                    setTimeout(function() {
                        y._resizeFn()
                    }, 100)
                };
                y._resizeFn = function() {
                    var D = q ? o.body : o.documentElement,
                        B = D.clientWidth + "px",
                        C = D.clientHeight + "px",
                        z = p.dm.overlay,
                        A = y._dlgInfo.mask;
                    z.style.width = B;
                    if (A) {
                        A.style.width = B
                    }
                    z.style.height = C;
                    if (A) {
                        A.style.height = C
                    }
                    setTimeout(function() {
                        var F, H, E = y.style,
                            G = q ? o.body : o.documentElement;
                        if (w) {
                            F = Number(w.replace("%", "") * G.clientWidth / 100);
                            E.left = F + "px"
                        }
                        if (v) {
                            H = Number(v.replace("%", "") * G.clientHeight / 100);
                            E.top = H + "px"
                        }
                    }, 0)
                };
                y._scrollFn();
                i.attachEvent("onscroll", y._scrollFn);
                i.attachEvent("onresize", y._resizeFn)
            }
        }
    };
    p.closeDialog = function(s) {
        var u = this;
        if (!u.open) {
            m.error("closeDialog called on closed dialog.")
        }
        u.open = k;
        u.removeAttribute("open");
        if (j) {
            var t = q ? o.body : o.documentElement;
            t.style.overflow = u._dlgInfo.docOverflow
        }
        if (typeof s != "undefined") {
            u.returnValue = s
        }
        if (u._dlgInfo.isTopOverridden) {
            u.style.top = "auto"
        }
        if (u._dlgInfo.modal) {
            if (j) {
                i.detachEvent("onscroll", u._scrollFn);
                i.detachEvent("onresize", u._resizeFn)
            }
            p.dm.removeDialog(this)
        }
        return u.returnValue
    };
    p.createMouseEvent = function(t) {
        var s = o.createEvent("MouseEvents");
        s.initMouseEvent(t.type, t.bubbles, t.cancelable, i, t.detail, t.screenX, t.screenY, t.clientX, t.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, t.button, t.relatedTarget);
        return s
    };
    p.setup = function(s) {
        var t = this;
        s.show = t.showDialog.bind(s, k);
        s.showModal = t.showDialog.bind(s, e);
        s.close = t.closeDialog.bind(s);
        s._dlgInfo = {}
    };
    var h = function() {
            var t = this,
                s;
            t.pendingDialogStack = [];
            t.overlay = o.createElement(j ? "iframe" : "div");
            s = t.overlay.style;
            s.position = j ? "absolute" : "fixed";
            s.display = "block";
            s.left = s.top = s.margin = s.padding = 0;
            s.backgroundColor = "#000";
            s.filter = "alpha(opacity=30)";
            s.opacity = s.MozOpacity = 0.3;
            s.zIndex = r;
            s.width = "100%";
            if (j && o.documentElement.clientHeight > 0) {
                s.height = o.documentElement.clientHeight + "px"
            } else {
                s.height = "100%"
            }
            if (o.createEvent) {
                m.addEventListener(t.overlay, "click", function(u) {
                    var v = p.createMouseEvent(u);
                    o.body.dispatchEvent(v)
                })
            }
        },
        g = h.prototype;
    g._blockDocument = function() {
        if (!o.body.contains(this.overlay)) {
            o.body.appendChild(this.overlay)
        }
    };
    g._unblockDocument = function() {
        o.body.removeChild(this.overlay)
    };
    g._updateStacking = function() {
        var w = this,
            s, u, t, v;
        u = w.pendingDialogStack;
        if (u.length == 0) {
            w._unblockDocument();
            return
        }
        w._blockDocument();
        v = r;
        m.each(u, function(x) {
            v++;
            x._dlgInfo.mask.style.zIndex = v++;
            x.style.zIndex = v
        })
    };
    g.pushDialog = function(t) {
        var u = this,
            s;
        if (u.pendingDialogStack.length >= f) {
            m.error("Too many modal dialogs.");
            return
        }
        s = o.createElement("div");
        s.className = "backdrop";
        if (j) {
            s.style.position = "absolute"
        }
        if (o.createEvent) {
            m.addEventListener(s, "click", function(v) {
                if (t.dispatchEvent) {
                    var w = p.createMouseEvent(v);
                    t.dispatchEvent(w)
                }
            })
        }
        t.parentNode.insertBefore(s, t.nextSibling);
        t._dlgInfo.mask = s;
        u.pendingDialogStack.push(t);
        u._updateStacking()
    };
    g.removeDialog = function(u) {
        var v = this,
            t, s;
        t = m.isArray(v.pendingDialogStack) ? v.pendingDialogStack.indexOf(u) : -1;
        if (t == -1) {
            return
        }
        v.pendingDialogStack.splice(t, 1);
        s = u._dlgInfo.mask;
        s.parentNode.removeChild(s);
        u._dlgInfo.mask = null;
        v._updateStacking()
    };
    p.dm = new h();
    m.dialog = p
})(dynamsoft.lib, dynamsoft.navInfo);
(function(e) {
    if (dynamsoft.dcp) {
        return
    }
    var d = dynamsoft.navInfo,
        b, a = {
            bConnected: false,
            curPortIndex: 0,
            bTrial: true,
            bConnectNumLimited: true,
            IMAXCONNECTCOUNT: 2
        };
    dynamsoft.dcp = b = {
        ip: "127.0.0.1",
        ports: [
            [18625, 18626],
            [18993, 18994]
        ],
        sdkVersion: [13, 0, 0, "0404"],
        detect: a,
        versionInfo: function(j) {
            var i = 0,
                g = function(n, l) {
                    var k = [b._getPreUrl(a.curPortIndex), b._getModuleName(), b._getModuleVer(), "/VersionInfo?ts=", e.now()].join(""),
                        m = e.stringify({
                            id: "1",
                            method: "VersionInfo",
                            version: "dwasm_" + b.sdkVersion.join(""),
                            parameter: []
                        });
                    e.ajax({
                        method: "POST",
                        url: k,
                        data: m,
                        onSuccess: n,
                        onError: l
                    })
                },
                h = function(k, l) {
                    ++i;
                    a.curPortIndex = i % b.ports.length;
                    a.bConnected = false;
                    if (a.bConnectNumLimited && i >= a.IMAXCONNECTCOUNT) {
                        if (e.isFunction(j)) {
                            setTimeout(function() {
                                j(k, l)
                            }, 0)
                        }
                        return
                    }
                    setTimeout(function() {
                        g(f, h)
                    }, 1000)
                },
                f = function(m) {
                    var l = b._getJSON(m);
                    if (l && "result" in l) {
                        l = l.result;
                        if (e.isArray(l) && l.length > 1 && l[0] && l[1]) {
                            var k = l[0].split(","),
                                n = l[1].toLowerCase();
                            if (b._isCompitable(k, b.sdkVersion)) {
                                a.bTrial = n.indexOf("trial") >= 0;
                                a.curPort = b.ports[i % b.ports.length];
                                a.bConnected = true;
                                if (e.isFunction(j)) {
                                    setTimeout(j, 0);
                                    return
                                }
                            }
                        }
                    }
                    setTimeout(h, 1000)
                };
            g(f, h)
        },
        loadZip: function(f, i, h, j) {
            var g = [b._getPreUrl(a.curPortIndex), b._getModuleName(), b._getModuleVer(), "/LoadZipFromBytes?ts=", e.now()].join("");
            new e.ajax({
                method: "POST",
                url: g,
                async: true,
                data: f,
                mimeType: "text/plain; charset=x-user-defined",
                onSuccess: h,
                onError: j
            })
        },
        _getPreUrl: function(h) {
            var f, g;
            if (d.bSSL) {
                g = "https://";
                f = b.ports[h][1]
            } else {
                g = "http://";
                f = b.ports[h][0]
            }
            return [g, b.ip, ":", f, "/"].join("")
        },
        _isCompitable: function(g, f) {
            return (g.length > 3 && g[0] == f[0] && g[1] == f[1])
        },
        _getJSON: function(f) {
            return f ? e.parse(f) : !1
        },
        _getModuleName: function() {
            return "dcp/dwasm_"
        },
        _getModuleVer: function() {
            return b.sdkVersion.join("")
        }
    }
})(dynamsoft.lib);
(function(h) {
    var b = "",
        f = "[bio]: ",
        c = !0,
        g = !1;
    var e = dynamsoft.navInfo.host,
        i = e && e.FormData;

    function a(k) {
        var j = this;
        j.__attrs = {};
        h.mix(j.__attrs, {
            action: b,
            data: {},
            bChunkedSendData: c,
            blockSize: 0,
            ajaxConfig: {
                value: {},
                type: "post",
                processData: g,
                cache: g,
                dataType: "text",
                async: c,
                contentType: g,
                headers: {
                    "X-Requested-With": g
                }
            },
            ajax: b,
            formData: b,
            CORS: g
        });
        h.mix(j.__attrs, k);
        j._setWithCredentials()
    }
    h.mix(a, {
        event: {
            SUCCESS: "success",
            ERROR: "error",
            PROGRESS: "progress"
        },
        status: {
            SUCCESS: "success",
            ERROR: "error"
        }
    });
    h.mix(a.prototype, h.obj.customEvent);
    h.mix(a.prototype, {
        get: function(k) {
            var j = this;
            if (k in j.__attrs) {
                return j.__attrs[k]
            }
            return ""
        },
        set: function(l, k) {
            var j = this;
            if (l in j.__attrs) {
                j.__attrs[l] = k
            }
        },
        _setWithCredentials: function() {
            var j = this;
            var l = j.get("CORS");
            var k = j.get("ajaxConfig");
            h.mix(k, {
                xhrFields: {
                    withCredentials: false
                }
            });
            return k
        },
        uploadToServer: function(m) {
            var j = this,
                l = j.get("blockSize"),
                k;
            if (l > 0 && m.size > 0) {
                k = j._chunkedUpload(m)
            } else {
                k = j._fullUpload(m)
            }
            return k
        },
        _fullUpload: function(m) {
            var j = this,
                l = j.get("ajaxConfig"),
                k = true;
            sFun = function(p) {
                var o = "";
                if (p) {
                    if (p && h.isArray(p) && p.length > 1) {
                        o = p[0]
                    } else {
                        if (h.isString(p)) {
                            o = p
                        }
                    }
                }
                o = j._processResponse(o);
                j.fire(a.event.SUCCESS, o)
            }, fFun = function(s, p, r) {
                var o, q;
                k = false;
                if (s && h.isArray(s) && s.length > 2) {
                    o = s[1];
                    q = s[2]
                } else {
                    o = p;
                    q = r
                }
                j._errorHandler(q, o, m)
            };
            j._setFormData();
            if (m.size > 0) {
                j._addFileData(m)
            }
            h.mix(l, {
                data: j.get("formData"),
                url: j.get("action"),
                beforeSend: function(q, p, o) {
                    q.upload.addEventListener("progress", function(r) {
                        j.fire(a.event.PROGRESS, {
                            loaded: r.loaded,
                            total: r.total
                        })
                    }, false)
                }
            });
            h.mix(l, {
                method: "POST",
                onSuccess: sFun,
                onError: fFun
            });
            var n = new h.ajax(l);
            if (l.async) {
                j.set("ajax", n);
                return true
            } else {
                j.set("ajax", false);
                return k
            }
        },
        _chunkedUpload: function(l) {
            var r = this;
            var p = r.get("ajaxConfig"),
                n = function(u) {
                    var t = "";
                    if (u) {
                        if (u && h.isArray(u) && u.length > 1) {
                            t = u[0]
                        } else {
                            if (h.isString(u)) {
                                t = u
                            }
                        }
                    }
                    t = r._processResponse(t);
                    r.fire(a.event.SUCCESS, t)
                },
                k = function(x, u, w) {
                    var t, v;
                    if (x && h.isArray(x) && x.length > 2) {
                        t = x[1];
                        v = x[2]
                    } else {
                        t = u;
                        v = w
                    }
                    r._errorHandler(v, t, l)
                };
            h.mix(p, {
                url: r.get("action")
            });
            var s = l.size;
            var m = 0;
            var j = r.get("blockSize") || s;
            var o = l.slice || l.webkitSlice || l.mozSlice;

            function q(v) {
                var t = o.call(l, m, m + j, l.type);
                var w = t.size;
                r._setContentRange(m, w, s);
                r._setFormData();
                if (v) {
                    r.set("data", [])
                }
                t.name = l.name;
                r._addFileData(t);
                h.mix(p, {
                    data: r.get("formData")
                });
                h.mix(p, {
                    method: "POST",
                    onSuccess: function(x) {
                        m = r._getUploadedBytes(u) || m + w;
                        r.fire(a.event.PROGRESS, {
                            loaded: m,
                            total: s
                        });
                        if (m < s) {
                            q(false)
                        } else {
                            n(x)
                        }
                    },
                    onError: k
                });
                var u = new h.ajax(p)
            }
            q(true)
        },
        abort: function() {
            var j = this,
                k = j.get("ajax");
            if (!h.isObject(k)) {
                h.log(f + "abort(), the value of io invalid!");
                return j
            }
            k.abort();
            j.set("ajax", false);
            return j
        },
        _setFormData: function() {
            var j = this,
                k = j.get("data"),
                m;
            if (!i) {
                h.log(f + "the browser does not support ajax.");
                return
            }
            m = new i();
            try {
                h.each(k, function(o, n) {
                    m.append(n, o)
                });
                j.set("formData", m)
            } catch (l) {
                h.log(f + "something error when reset FormData.")
            }
        },
        setRequestHeader: function(l, m) {
            var j = this;
            var k = j.get("ajaxConfig");
            k.headers[l] = m;
            j.set("ajaxConfig", k);
            return m
        },
        _addFileData: function(l) {
            if (!h.isObject(l)) {
                h.log(f + "_addFileData(), file parameter invalid!");
                return false
            }
            var k = this;
            var m = k.get("formData");
            var n = l.name,
                j = l.remoteFilename;
            if (!j) {
                j = "RemoteFile"
            }
            m.append(j, l, n);
            k.set("formData", m);
            return m
        },
        _errorHandler: function(n, m, o) {
            var l = this,
                k = a.status.ERROR,
                j = {
                    status: k,
                    msg: m,
                    response: false
                };
            if (n) {
                j.httpStatus = n.status;
                j.response = n.responseText
            }
            l.fire(k, j)
        },
        _getUploadedBytes: function(l) {
            var j = l.getResponseHeader("Range");
            var m = j && j.split("-");
            var k = m && m.length > 1 && parseInt(m[1], 10);
            return k && k + 1
        },
        _setContentRange: function(m, p, l) {
            var o = "bytes " + m + "-" + (m + p - 1) + "/" + l;
            var j = this;
            var k = j.get("ajaxConfig");
            var n = k.headers;
            n["Content-Range"] = o;
            return o
        },
        _processResponse: function(n) {
            var r = this,
                u, k, j, p = false,
                t = n,
                l = a.status.SUCCESS,
                q = a.event.ERROR;
            h.log("Response from server: " + n);
            if (h.isUndefined(n) || n === "") {
                u = {
                    status: l,
                    msg: false,
                    json: false,
                    response: ""
                }
            } else {
                if (h.isString(n)) {
                    try {
                        for (k = 0; k < n.length; k++) {
                            if (k > 10) {
                                break
                            }
                            j = n[k];
                            if (j == "{") {
                                p = true;
                                break
                            } else {
                                if (j == " " || j == "\r" || j == "\n" || j == "\t") {} else {
                                    break
                                }
                            }
                        }
                        if (p) {
                            var o = h.parse(n);
                            if (o.status == 1) {
                                u = {
                                    status: l,
                                    msg: false,
                                    json: o,
                                    response: n
                                }
                            } else {
                                u = {
                                    status: q,
                                    msg: false,
                                    json: o,
                                    response: n
                                }
                            }
                        }
                    } catch (m) {
                        p = false;
                        h.log(m)
                    }
                    if (!p) {
                        var s = new String(n);
                        s = s.replace(/( |\t|\r|\n)/g, "");
                        if (s == "") {
                            u = {
                                status: l,
                                msg: false,
                                json: false,
                                response: n
                            }
                        } else {
                            u = {
                                status: q,
                                msg: false,
                                json: false,
                                response: n
                            }
                        }
                    }
                } else {
                    u = {
                        status: l,
                        msg: false,
                        json: false,
                        response: ""
                    }
                }
            }
            return u
        }
    });

    function d(k) {
        var j = this;
        j.__attrs = {};
        h.mix(j.__attrs, {
            action: b,
            timeout: 0,
            CORS: g,
            async: c,
            dataType: "text",
            fileStatus: b,
            uploadType: g,
            data: {}
        });
        h.mix(j.__attrs, k);
        j._init()
    }
    h.mix(d, {
        event: {
            SUCCESS: "success",
            ERROR: "error",
            PROGRESS: "progress"
        }
    });
    h.mix(d.prototype, h.obj.customEvent);
    h.mix(d.prototype, {
        get: function(k) {
            var j = this;
            if (k in j.__attrs) {
                return j.__attrs[k]
            }
            return ""
        },
        set: function(l, k) {
            var j = this;
            if (l in j.__attrs) {
                j.__attrs[l] = k
            }
        },
        upload: function(k) {
            if (!h.isObject(k)) {
                h.log(f + 'upload() the parameter "file" invalid!');
                return false
            }
            var j = this,
                l = j.get("uploadType");
            if (!k.size) {
                k.size = 0
            } else {
                if (!k.name) {
                    k.name = k.fileName || b
                }
                if (!k.id) {
                    k.id = h.guid("file-")
                }
                if (k.size) {
                    k.textSize = j._convertByteSize(k.size)
                }
            }
            return l.uploadToServer(k)
        },
        abort: function() {
            var j = this,
                k = j.get("uploadType");
            k.abort();
            return true
        },
        setRequestHeader: function(k, m) {
            var j = this,
                l = j.get("uploadType");
            l.setRequestHeader(k, m)
        },
        _convertByteSize: function(j) {
            var k = -1;
            do {
                j = j / 1024;
                k++
            } while (j > 99 && k < 4);
            return Math.max(j, 0.1).toFixed(1) + ["KB", "MB", "GB", "TB"][k]
        },
        _init: function() {
            var j = this;
            var m = {
                    action: j.get("action"),
                    data: j.get("data"),
                    CORS: j.get("CORS")
                },
                l = new a(m);
            var k = l.get("ajaxConfig");
            if (k) {
                k.dataType = j.get("dataType");
                k.async = j.get("async")
            }
            l.on(a.event.SUCCESS, j._uploadCompleteHandler, j);
            l.on(a.event.ERROR, j._uploadCompleteHandler, j);
            l.on(a.event.PROGRESS, j._uploadProgressHandler, j);
            j.set("uploadType", l);
            return l
        },
        _uploadProgressHandler: function(k) {
            var j = this;
            j.fire(d.event.PROGRESS, k)
        },
        _uploadCompleteHandler: function(n) {
            var k = this,
                j = n.status,
                m = n.msg,
                l = k.get("file");
            h.mix(n, {
                file: l
            });
            if (j === "success") {
                k.fire(d.event.SUCCESS, n)
            } else {
                if (m === false) {} else {
                    if (m === "abort") {
                        h.mix(n, {
                            canceled: true
                        })
                    } else {
                        if (m === "timeout") {
                            h.mix(n, {
                                timeout: true
                            })
                        }
                    }
                }
                k.fire(d.event.ERROR, n)
            }
        }
    });
    h.BIO = d
})(dynamsoft.lib);
var OnWebTwainNotFoundOnWindowsCallback = OnWebTwainNotFoundOnWindowsCallback || false,
    OnWebTwainNotFoundOnMacCallback = OnWebTwainNotFoundOnMacCallback || false,
    OnWebTwainNotFoundOnLinuxCallback = OnWebTwainNotFoundOnLinuxCallback || false,
    OnWebTwainOldPluginNotAllowedCallback = OnWebTwainOldPluginNotAllowedCallback || false,
    OnWebTwainNeedUpgradeCallback = OnWebTwainNeedUpgradeCallback || false,
    OnWebTwainPreExecuteCallback = OnWebTwainPreExecuteCallback || false,
    OnWebTwainPostExecuteCallback = OnWebTwainPostExecuteCallback || false,
    Dynamsoft_ChangeConfig = Dynamsoft_ChangeConfig || false,
    Dynamsoft_OnLoad = Dynamsoft_OnLoad || false,
    Dynamsoft_OnNotReady = Dynamsoft_OnNotReady || false,
    Dynamsoft_OnReady = Dynamsoft_OnReady || false;
if (!Dynamsoft.Lib) {
    Dynamsoft.Lib = {}
}(function(a, c) {
    var b = c.mix;
    b(a, c)
})(Dynamsoft.Lib, dynamsoft.lib);
(function(b) {
    var a = {},
        c = {
            encodeChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            decodeChars: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]
        };
    a.base64 = {
        UTF16ToUTF8: function(k) {
            var h = [],
                e = k.length;
            for (var g = 0; g < e; g++) {
                var j = k.charCodeAt(g);
                if (j > 0 && j <= 127) {
                    h.push(k.charAt(g))
                } else {
                    if (j >= 128 && j <= 2047) {
                        var f = 192 | ((j >> 6) & 31);
                        var d = 128 | (j & 63);
                        h.push(String.fromCharCode(f), String.fromCharCode(d))
                    } else {
                        if (j >= 2048 && j <= 65535) {
                            var f = 224 | ((j >> 12) & 15);
                            var d = 128 | ((j >> 6) & 63);
                            var l = 128 | (j & 63);
                            h.push(String.fromCharCode(f), String.fromCharCode(d), String.fromCharCode(l))
                        } else {
                            if (j >= 65536 && j <= 2097151) {} else {
                                if (j >= 2097152 && j <= 67108863) {} else {}
                            }
                        }
                    }
                }
            }
            return h.join("")
        },
        UTF8ToUTF16: function(j) {
            var h = [],
                g = j.length;
            var f = 0;
            for (var f = 0; f < g; f++) {
                var d = j.charCodeAt(f);
                if (((d >> 7) & 255) == 0) {
                    h.push(j.charAt(f))
                } else {
                    if (((d >> 5) & 255) == 6) {
                        var m = j.charCodeAt(++f);
                        var n = (d & 31) << 6;
                        var l = m & 63;
                        var e = n | l;
                        h.push(String.fromCharCode(e))
                    } else {
                        if (((d >> 4) & 255) == 14) {
                            var m = j.charCodeAt(++f);
                            var k = j.charCodeAt(++f);
                            var n = (d << 4) | ((m >> 2) & 15);
                            var l = ((m & 3) << 6) | (k & 63);
                            var e = ((n & 255) << 8) | l;
                            h.push(String.fromCharCode(e))
                        } else {
                            if (((d >> 3) & 255) == 30) {} else {
                                if (((d >> 2) & 255) == 62) {} else {}
                            }
                        }
                    }
                }
            }
            return h.join("")
        },
        encode: function(l) {
            var k = this.UTF16ToUTF8(l),
                f = [],
                h = 0,
                d = k.length,
                j, g, e;
            while (h < d) {
                j = k.charCodeAt(h++) & 255;
                if (h == d) {
                    f.push(c.encodeChars.charAt(j >> 2));
                    f.push(c.encodeChars.charAt((j & 3) << 4));
                    f.push("==");
                    break
                }
                g = k.charCodeAt(h++);
                if (h == d) {
                    f.push(c.encodeChars.charAt(j >> 2));
                    f.push(c.encodeChars.charAt(((j & 3) << 4) | ((g & 240) >> 4)));
                    f.push(c.encodeChars.charAt((g & 15) << 2));
                    f.push("=");
                    break
                }
                e = k.charCodeAt(h++);
                f.push(c.encodeChars.charAt(j >> 2));
                f.push(c.encodeChars.charAt(((j & 3) << 4) | ((g & 240) >> 4)));
                f.push(c.encodeChars.charAt(((g & 15) << 2) | ((e & 192) >> 6)));
                f.push(c.encodeChars.charAt(e & 63))
            }
            return f.join("")
        },
        encodeArray: function(k) {
            var f = [],
                h = 0,
                d = k.length,
                j, g, e;
            while (h < d) {
                j = k[h++] & 255;
                if (h == d) {
                    f.push(c.encodeChars.charAt(j >> 2));
                    f.push(c.encodeChars.charAt((j & 3) << 4));
                    f.push("==");
                    break
                }
                g = k[h++] & 255;
                if (h == d) {
                    f.push(c.encodeChars.charAt(j >> 2));
                    f.push(c.encodeChars.charAt(((j & 3) << 4) | ((g & 240) >> 4)));
                    f.push(c.encodeChars.charAt((g & 15) << 2));
                    f.push("=");
                    break
                }
                e = k[h++] & 255;
                f.push(c.encodeChars.charAt(j >> 2));
                f.push(c.encodeChars.charAt(((j & 3) << 4) | ((g & 240) >> 4)));
                f.push(c.encodeChars.charAt(((g & 15) << 2) | ((e & 192) >> 6)));
                f.push(c.encodeChars.charAt(e & 63))
            }
            return f.join("")
        },
        decode: function(m) {
            var k = this,
                g = [],
                j = 0,
                l = m.length,
                h, f, e, d;
            while (j < l) {
                do {
                    h = c.decodeChars[m.charCodeAt(j++) & 255]
                } while (j < l && h == -1);
                if (h == -1) {
                    break
                }
                do {
                    f = c.decodeChars[m.charCodeAt(j++) & 255]
                } while (j < l && f == -1);
                if (f == -1) {
                    break
                }
                g.push(String.fromCharCode((h << 2) | ((f & 48) >> 4)));
                do {
                    e = m.charCodeAt(j++) & 255;
                    if (e == 61) {
                        return k.UTF8ToUTF16(g.join(""))
                    }
                    e = c.decodeChars[e]
                } while (j < l && e == -1);
                if (e == -1) {
                    break
                }
                g.push(String.fromCharCode(((f & 15) << 4) | ((e & 60) >> 2)));
                do {
                    d = m.charCodeAt(j++) & 255;
                    if (d == 61) {
                        return k.UTF8ToUTF16(g.join(""))
                    }
                    d = c.decodeChars[d]
                } while (j < l && d == -1);
                if (d == -1) {
                    break
                }
                g.push(String.fromCharCode(((e & 3) << 6) | d))
            }
            return k.UTF8ToUTF16(g.join(""))
        }
    };
    a.utf8 = {
        fromUTF16: function(g) {
            var e = [],
                f = 0,
                d = g.length,
                h;
            while (f < d) {
                h = g.charCodeAt(f);
                if ((h >= 1) && (h <= 127)) {
                    e.push(g.charAt(f))
                } else {
                    if (h > 2047) {
                        e.push(String.fromCharCode(224 | ((h >> 12) & 15)));
                        e.push(String.fromCharCode(128 | ((h >> 6) & 63)));
                        e.push(String.fromCharCode(128 | ((h >> 0) & 63)))
                    } else {
                        e.push(String.fromCharCode(192 | ((h >> 6) & 31)));
                        e.push(String.fromCharCode(128 | ((h >> 0) & 63)))
                    }
                }
                f++
            }
            return e.join("")
        },
        toUTF16: function(j) {
            var e = [],
                g = 0,
                d = j.length,
                k, h, f;
            while (g < d) {
                k = j.charCodeAt(g++);
                switch (k >> 4) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                        e.push(j.charAt(g - 1));
                        break;
                    case 12:
                    case 13:
                        h = j.charCodeAt(g++);
                        e.push(String.fromCharCode(((k & 31) << 6) | (h & 63)));
                        break;
                    case 14:
                        h = j.charCodeAt(g++);
                        f = j.charCodeAt(g++);
                        e.push(String.fromCharCode(((k & 15) << 12) | ((h & 63) << 6) | ((f & 63) << 0)));
                        break
                }
            }
            return e.join("")
        }
    };
    b.mix(b, a)
})(Dynamsoft.Lib);
(function(a) {
    var b = Dynamsoft.WebTwainEnv;
    Dynamsoft.WebTwainEnv = {
        ServerVersionInfo: "13,0,0,0404",
        ActiveXVersion: "12,1,0,0",
        PluginVersion: "11,1,0,0",
        Containers: false,
        ContainerMap: {},
        DynamicContainers: [],
        DynamicDWTMap: {},
        //ProductKey: "t00986QAAAE85wKGVl4Zg/MUqi746BcRASkJzJqBfpCrFwfz3o1FRJBlEZO9brdjuZvef8U1fOUC/QAxIy3WOl00lSEmwXo/GQr/MOQn4YxJmT36ZA+PgPfa5ETMWyphwA49LLvk=",
		ProductKey: "f0068NQAAAFQveKSYvPvpKzmJEyI/WCKFoNjwOkWbD5u3fbom+puoVJMAUbEj2+sFgH6e6k5O1hVy4Qkce1Ax0hwKkjDOCnE=",
        Trial: false,
        ResourcesPath: "scanfile/Resources",
        Debug: false,
        AutoLoad: true,
        OnWebTwainReady: false,
        UseDefaultInstallUI: true,
        OnWebTwainNotFound: false,
        OnWebTwainOldPluginNotAllowed: false,
        OnWebTwainNeedUpgrade: false,
        OnWebTwainNeedUpgradeWebJavascript: false,
        OnWebTwainInitMessage: false,
        IfUseActiveXForIE10Plus: true
    };
    a.mix(Dynamsoft.WebTwainEnv, b);
    Dynamsoft.WebTwainEnv.RegisterEvent = function(c, d) {
        if ((c === "OnWebTwainReady" || !Dynamsoft.WebTwainEnv.UseDefaultInstallUI) && a.isFunction(d)) {
            Dynamsoft.WebTwainEnv[c] = d
        } else {
            if ((c === "OnWebTwainInitMessage") && a.isFunction(d)) {
                Dynamsoft.WebTwainEnv[c] = d
            }
        }
        return true
    }
})(Dynamsoft.Lib);
(function(n, j, b) {
    var h = !0,
        s = !1,
        x = navigator.userAgent.toLowerCase(),
        w = document.location.protocol,
        c = location.hostname,
        e = location.pathname,
        q = b.bSSL,
        t = b.bMac,
        A = b.bLinux,
        v = b.bWin,
        k = b.isX64,
        l = b.bSafari,
        m = b.bFirefox,
        o = b.bEdge,
        r = b.bChrome,
        u = b.bIE,
        z = b.bFileSystem,
        y = parseFloat(b.strBrowserVersion),
        g = s,
        f = s,
        p = s,
        d = 0,
        a, i;
    if (r || m) {
        if (y >= 27) {
            g = h
        } else {
            f = h
        }
    } else {
        if (o) {
            g = h
        } else {
            if (u) {
                if (y === "" || y > 8) {
                    if (y >= 10 && Dynamsoft.WebTwainEnv.IfUseActiveXForIE10Plus == false) {
                        g = h
                    } else {
                        f = h
                    }
                } else {
                    p = h
                }
            } else {
                if (l) {
                    if (y >= 7) {
                        g = h
                    } else {
                        f = h
                    }
                } else {
                    f = h
                }
            }
        }
    }
    if (c === "") {
        if (v && e.lastIndexOf("\\") > 1) {
            e = e.substring(1, e.lastIndexOf("\\")).replace(/%20/g, " ")
        } else {
            d = 1;
            e = e.substring(1, e.lastIndexOf("/")).replace(/%20/g, " ")
        }
    } else {
        d = 1;
        e = e.substring(0, e.lastIndexOf("/"))
    }
    a = {
        product: {
            name: "Dynamic Web TWAIN",
            bChromeEdition: g,
            bPluginEdition: f,
            bActiveXEdition: p,
            ip: dynamsoft.dcp.ip,
            wsProtocol: "dwt_command",
            _iImageCaptureDriverType: 3,
            _iBrokerProcessType: 1,
            getChromeEditionPath: function() {
                var B;
                if (t) {
                    B = "/DynamsoftServiceSetup.pkg"
                } else {
                    if (A) {
                        B = "/DynamsoftServiceSetup.deb"
                    } else {
                        B = "/DynamsoftServiceSetup.exe"
                    }
                }
                return Dynamsoft.WebTwainEnv.ResourcesPath + B
            },
            getLinuxHTML5DebPath: function() {
                var B = "/DynamsoftServiceSetup.deb";
                return Dynamsoft.WebTwainEnv.ResourcesPath + B
            },
            getLinuxHTML5RpmPath: function() {
                var B = "/DynamsoftServiceSetup.rpm";
                return Dynamsoft.WebTwainEnv.ResourcesPath + B
            },
            getPKGPath: function() {
                var B;
                B = "/DynamicWebTWAINMacEdition.pkg";
                return Dynamsoft.WebTwainEnv.ResourcesPath + B
            },
            getMSIPath: function() {
                return Dynamsoft.WebTwainEnv.ResourcesPath + "/DynamicWebTWAINPlugIn.msi"
            },
            getActiveXCABx86Path: function() {
                if (!Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB) {
                    return Dynamsoft.WebTwainEnv.ResourcesPath + "/DynamicWebTWAINActiveX.exe"
                } else {
                    return Dynamsoft.WebTwainEnv.ResourcesPath + "/DynamicWebTWAIN.cab"
                }
            },
            getActiveXCABx64Path: function() {
                if (!Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB) {
                    return Dynamsoft.WebTwainEnv.ResourcesPath + "/DynamicWebTWAINActiveX.exe"
                } else {
                    return Dynamsoft.WebTwainEnv.ResourcesPath + "/DynamicWebTWAINx64.cab"
                }
            },
            strMIMEType: "Application/DynamicWebTwain-Plugin",
            strProClassID: "5220cb21-c88d-11cf-b347-00aa00a28331",
            strFullClassID: "E7DA7F8D-27AB-4EE9-8FC0-3FEC9ECFE758",
            strTrialClassID: "FFC6F181-A5CF-4ec4-A441-093D7134FBF2",
            scripts: {}
        },
        env: {
            bIE: u,
            bChrome: r,
            bFirefox: m,
            bSafari: l,
            bEdge: o,
            bWin: v,
            bWin64: (x.indexOf("win64") != -1 || x.indexOf("x64") != -1),
            bMac: t,
            bLinux: A,
            isX64: k,
            iPluginLength: (u || o) ? 0 : navigator.plugins.length,
            strChromeVersion: r ? y : "",
            strFirefoxVersion: m ? y : "",
            strIEVersion: (u || o) ? y : "",
            bFileSystem: z,
            basePath: e,
            pathType: d
        },
        config: {
            debug: s,
            devMode: s,
            usingMainMode: s,
            bDiscardBlankImage: s,
            msg: [],
            msgPrefix: '<span style="color:#cE5E04"><b>',
            msgSuffix: "</b></span><br />"
        },
        detect: {
            ssl: q,
            dcpStatus: 0,
            dcpCallbackType: 0,
            arySTwains: [],
            arySTwainsByIP: [],
            aryReconnectSTwains: [],
            bFirst: h,
            bOK: s,
            __dialog: s,
            scriptLoaded: s,
            bNoControlEvent: s,
            bNeedUpgradeEvent: s,
            StartWSTimeoutId: s,
            StartWSByIPTimeoutId: s,
            bPromptJSOrServerOutdated: s,
            detectType: q ? 1 : (w === "http:" || c === "") ? 0 : -1,
            tryTimes: 0,
            ports: [{
                port: 18623,
                ssl: h
            }, {
                port: 18996,
                ssl: h
            }, {
                port: 18622,
                ssl: s
            }, {
                port: 18995,
                ssl: s
            }],
            cUrlIndex: 0,
            urls: [],
            onNoControl: s,
            onNotAllowedForChrome: s,
            OnDetectNext: s,
            OnCreatWS: s
        },
        page: {
            bUnload: s,
            OnUnload: s
        },
        tmp: {
            IfAllowLocalCache: h,
            EmptyFunction: function() {}
        }
    };
    a.appendMessage = function(C) {
        if (typeof(C) === "string") {
            a.config.msg.push(C)
        } else {
            if (Object.prototype.toString.call(C) === "[object Array]") {
                for (var B in C) {
                    a.appendMessage(C[B])
                }
            }
        }
    };
    a.appendRichMessage = function(B) {
        a.appendMessage([a.config.msgPrefix, B, a.config.msgSuffix])
    };
    a.clearMessage = function() {
        if (u && y == 8) {
            a.config.msg.splice(0, a.config.msg.length)
        } else {
            a.config.msg.splice(0)
        }
        return h
    };
    a.getRealPath = function(B) {
        if (B === undefined) {
            return ""
        }
        if (a.env.pathType == 1) {
            return a.env.basePath + B
        }
        return a.env.basePath + B.replace(new RegExp("/", "g"), "\\\\")
    };
    a.getHex = function(C) {
        var B;
        B = Number(C).toString(16).toUpperCase();
        if (B.length == 1) {
            B = ["0", B].join("")
        }
        return B
    };
    a.getColor = function(D) {
        var C, B, F, E;
        B = D >> 16;
        F = (D & 65280) >> 8;
        E = D & 255;
        C = ["#", a.getHex(E), a.getHex(F), a.getHex(B)].join("");
        return C
    };
    a.isLocalIP = function(B) {
        return B && (B === "127.0.0.1" || B === "localhost")
    };
    n.mix(n, a);
    n.Addon_Events = [];
    n.Addon_Sendback_Events = []
})(Dynamsoft.Lib, dynamsoft.lib, dynamsoft.navInfo);
(function(b) {
    var a = {
        getHexColor: function(e) {
            var f = this,
                c = e.length,
                d = [];
            if (c === 7) {
                d.push(parseInt("0x" + e.slice(1, 3)));
                d.push(parseInt("0x" + e.slice(3, 5)));
                d.push(parseInt("0x" + e.slice(5, 7)));
                return d
            }
            return [128, 128, 128]
        },
        drawBoxBorder: function(n, c, h, m, j, l, r) {
            var q = this,
                g, f, s, k, v, e, u, t, o, d, w;
            t = Math.floor(c);
            o = Math.floor(h);
            d = Math.floor(m);
            w = Math.floor(j);
            v = n.getImageData(t, o, d, w);
            k = v.data;
            e = q.getHexColor(l);
            if (b.isUndefined(r)) {
                u = e
            } else {
                u = q.getHexColor(r)
            }
            s = 0;
            for (g = 0; g < d; g++) {
                k[s] = e[0];
                k[s + 1] = e[1];
                k[s + 2] = e[2];
                s += 4
            }
            g = 0;
            for (f = 0; f < w; f++) {
                s = (f * d + g) * 4;
                k[s] = e[0];
                k[s + 1] = e[1];
                k[s + 2] = e[2]
            }
            for (f = 0; f < w; f++) {
                g = d - 1;
                s = (f * d + g) * 4;
                k[s] = u[0];
                k[s + 1] = u[1];
                k[s + 2] = u[2]
            }
            s = (w - 1) * d * 4;
            for (g = 0; g < d; g++) {
                k[s] = u[0];
                k[s + 1] = u[1];
                k[s + 2] = u[2];
                s += 4
            }
            n.putImageData(v, t, o)
        },
        drawImageWithHermite: function(M, l, p, n, o, f) {
            var c = M.width,
                h = M.height,
                A = Math.min(o, l.width),
                q = Math.min(f, l.height),
                N = M.getContext("2d").getImageData(0, 0, c, h),
                L = l.getContext("2d").getImageData(p, n, A, q),
                J = N.data,
                I = L.data,
                m = c / A,
                E = h / q,
                z = Math.ceil(m / 2),
                C = Math.ceil(E / 2),
                G, F;
            for (F = 0; F < q; F++) {
                for (G = 0; G < A; G++) {
                    var D = gx_g = gx_b = gx_a = 0,
                        H = (G + F * A) * 4,
                        v = 0,
                        K = 0,
                        d = 0,
                        g = (F + 0.5) * E;
                    for (var B = Math.floor(F * E); B < (F + 1) * E; B++) {
                        var s = Math.abs(g - (B + 0.5)) / C,
                            k = (G + 0.5) * m,
                            u = s * s;
                        for (var e = Math.floor(G * m); e < (G + 1) * m; e++) {
                            var t = Math.abs(k - (e + 0.5)) / z,
                                r = Math.sqrt(u + t * t);
                            if (r >= -1 && r <= 1) {
                                v = 2 * r * r * r - 3 * r * r + 1;
                                if (v > 0) {
                                    t = 4 * (e + B * c);
                                    gx_a += v * J[t + 3];
                                    d += v;
                                    if (J[t + 3] < 255) {
                                        v = v * J[t + 3] / 250
                                    }
                                    D += v * J[t];
                                    gx_g += v * J[t + 1];
                                    gx_b += v * J[t + 2];
                                    K += v
                                }
                            }
                        }
                    }
                    I[H] = D / K;
                    I[H + 1] = gx_g / K;
                    I[H + 2] = gx_b / K;
                    I[H + 3] = gx_a / d
                }
            }
            l.getContext("2d").clearRect(0, 0, l.width, l.height);
            l.getContext("2d").putImageData(L, p, n)
        }
    };
    b.mix(b, a)
})(Dynamsoft.Lib);
(function(a) {
    a.DOM = {
        getOffset: function(k, f) {
            var c = k.target,
                j = 0,
                i = 0,
                g = 0,
                h = 0,
                b, e, d = false;
            while (c && !isNaN(c.offsetLeft) && !isNaN(c.offsetTop)) {
                e = c.scrollLeft;
                b = c.scrollTop;
                if (c.tagName === "BODY") {
                    if (d) {
                        e = 0;
                        b = 0
                    } else {
                        e = e | document.documentElement.scrollLeft;
                        b = b | document.documentElement.scrollTop
                    }
                } else {
                    if (c.style.position === "fixed") {
                        d = true
                    }
                }
                j += c.offsetLeft - e;
                i += c.offsetTop - b;
                c = c.offsetParent
            }
            if (f) {
                g = f.Left;
                h = f.Top
            }
            j = k.clientX - j - g;
            i = k.clientY - i - h;
            return {
                x: j,
                y: i
            }
        }
    }
})(Dynamsoft.Lib);
Dynamsoft.Lib.ready(function() {
    Dynamsoft.Lib.install = {
        _divInstallBody: "dwt-InstallBody",
        _divDWTNonInstallContainerID: "dwt-NonInstallContainerID",
        _divDWTemessageContainer: "",
        _dlgInstall: false
    };
    Dynamsoft.Lib.install._strDynamsoftWithClose = ['<div style="height:40px;width:350px;position:relative;">', '<span><div class="DYNLogo" ', 'alt="Dynamsoft Corporation" border="0"></div>', "</span>", '<div style="height:30px;padding-left:205px; position:absolute; top:0; left:120px">', '<a href="javascript: void(0)" style="text-decoration:none; padding:15px" class="ClosetblCanNotScan">X</a>', "</div></div>"].join("");
    Dynamsoft.Lib.install._strDynamsoftWithoutClose = ['<div style="height:40px;width:350px;position:relative;">', '<span><div class="DYNLogo" ', 'alt="Dynamsoft Corporation" border="0"></div>', "</span>", "</div>"].join("");
    Dynamsoft.Lib.install._strNonInstallDIV = ['<div style="text-align:center;" id="', Dynamsoft.Lib.install._divDWTNonInstallContainerID, '"></div>'].join("")
});
Dynamsoft.WebTwainEnv.ShowDialog = function(f, j, k, a, g) {
	console.log(1);
    var b = Dynamsoft.Lib,
        e = b.install,
        n;
    if (!b.get("J_waiting")) {
        var c = document.createElement("div");
        c.className = "ds-dialog-wrap";
        c.style.width = "100%";
        if (a) {
            n = ['<div id="J_waiting" class="ds-dialog">', '<div class="ks-dialog-header"></div>', '<div class="ks-dialog-body">', '<div class="ks-dialog-content"><div id="', e._divInstallBody, '"></div></div></div>', '<div class="ks-dialog-footer"></div>', "</div>"]
        } else {
            n = ['<div id="J_waiting" class="ds-dialog">', '<div class="ks-dialog-header"></div>', '<div class="ks-dialog-body">', '<div class="ks-dialog-content"><div id="', e._divInstallBody, '"></div></div></div>', '<div class="ks-dialog-footer"></div>', "</div>"]
        }
        c.innerHTML = n.join("");
        if (a) {
            var d = b.one(".D_ImageUIEditor")[0].parentNode;
            d.appendChild(c)
        } else {
            document.body.appendChild(c)
        }
        e._dlgFromImageEditor = a;
        e._dlgInstall = c;
        b.dialog.setup(e._dlgInstall)
    }
    if (k === false) {
        return
    }
    if (a) {
        b.get(e._divInstallBody).innerHTML = ['<div class="ds-dialog-body">', k, "</div>"].join("")
    } else {
        var l = (g ? e._strDynamsoftWithoutClose : e._strDynamsoftWithClose);
        b.get(e._divInstallBody).innerHTML = ['<div class="ds-dialog-body">', l, k, "</div>"].join("")
    }
    var m = b.get("J_waiting");
	//console.log(2);
    //m.style.width = f;
    if (e._dlgInstall.open) {
        e._dlgInstall.close()
    }
    e._dlgInstall.showModal();
    for (var h = 0; h < document.links.length; h++) {
        if (document.links[h].className == "ClosetblCanNotScan") {
            document.links[h].onclick = DCP_DWT_OnClickCloseInstall
        }
    }
};
Dynamsoft.WebTwainEnv.OnWebTwainPreExecute = function() {
    Dynamsoft.Lib.detect.OnWebTwainPreExecute()
};
Dynamsoft.WebTwainEnv.OnWebTwainPostExecute = function() {
    Dynamsoft.Lib.detect.OnWebTwainPostExecute()
};

function DCP_DWT_OnClickCloseInstall(a) {
    var d = Dynamsoft.Lib,
        g = d.install._dlgInstall;
    if (g) {
        if (g.open) {
            g.close()
        }
        if (d.install._dlgFromImageEditor) {
            var f = d.one(".D_ImageUIEditor")[0].parentNode;
            f.removeChild(g)
        } else {
            document.body.removeChild(g)
        }
        d.install._dlgInstall = false
    }
    var c = d.get(d.install._divDWTNonInstallContainerID);
    if (c) {
        c.parentNode.removeChild(c)
    }
    if (a && d.isString(a)) {
        d.show(a)
    } else {
        var b, e;
        e = Dynamsoft.WebTwainEnv.Containers;
        if (e) {
            for (b = 0; b < e.length; b++) {
                d.show(e[b].ContainerId)
            }
        }
        e = Dynamsoft.WebTwainEnv.DynamicContainers;
        if (e) {
            for (b = 0; b < e.length; b++) {
                d.show(e[b])
            }
        }
        e = null
    }
    if (d.install._divDWTemessageContainer != "") {
        d.show(d.install._divDWTemessageContainer)
    }
}(function(a) {
    a.mix(a.detect, {
        global_dlg: false,
        __dialog: false
    });
    a.detect.showMask = function() {
        if (!Dynamsoft.WebTwainEnv.ScanDirectly) {
            if (a.isFunction(OnWebTwainPreExecuteCallback)) {
                OnWebTwainPreExecuteCallback()
            } else {
                a.detect.OnWebTwainPreExecute()
            }
        }
    };
    a.detect.OnWebTwainPreExecute = function() {
        if (a.detect.__dialog) {
            return
        }
        var d = [Dynamsoft.WebTwainEnv.ResourcesPath.replace('/index.php/','/'), "/reference/loading.gif"].join(""),
            c = ['<div style="margin:0 auto;width:100px;line-height:300px"><img src="', d, '" /></div>'].join("");
        var b = document.createElement("div");
        b.className = "ds-dialog-wrap";
        b.innerHTML = c;
        document.body.appendChild(b);
        a.detect.__dialog = b;
        a.dialog.setup(a.detect.__dialog);
        a.detect.__dialog.showModal()
    };
    a.detect.hideMask = function() {
        if (!Dynamsoft.WebTwainEnv.ScanDirectly) {
            if (a.isFunction(OnWebTwainPostExecuteCallback)) {
                OnWebTwainPostExecuteCallback()
            } else {
                a.detect.OnWebTwainPostExecute()
            }
        }
    };
    a.detect.OnWebTwainPostExecute = function() {
        var b = a.detect.__dialog;
        if (b) {
            b.close();
            document.body.removeChild(b);
            a.detect.__dialog = false
        }
    }
})(Dynamsoft.Lib);
(function(b) {
    a.Orientation = {
        Horizontal: 0,
        Vertical: 1
    };
    a.Direction = {
        LeftToRight: 0,
        RightToLeft: 1,
        TopToBottom: 0,
        BottomToTop: 1
    };
    a.CreationType = {
        Replace: 0,
        AppendChild: 1
    };
    a.AnimationStyle = {
        None: 0,
        Static: 1,
        StaticFull: 2,
        Custom: 3,
        CustomFull: 4,
        Flickering1: 10,
        Flickering2: 11,
        Flickering3: 12,
        LeftToRight1: 20,
        LeftToRight2: 21,
        RightToLeft1: 22,
        RightToLeft2: 23,
        TwoWay: 24
    };

    function a(d, e) {
        var g = this,
            f = 0;
        g.isLoaded = false;
        g.displayType = 0;
        g.progress = 0;
        g.progressPosition = 0;
        g.borderWidth = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        };
        g.orientation = (e.orientation || a.Orientation.Horizontal);
        g.direction = (e.direction || a.Direction.LeftToRight);
        g.creationType = (e.creationType || a.CreationType.Replace);
        g.value = 0;
        g.initialValue = (e.value || 0);
        g.minValue = (e.minValue || 0);
        g.maxValue = (e.maxValue || 100);
        g.showLabel = (typeof e.showLabel == "undefined" ? true : e.showLabel);
        g.labelText = (e.labelText || "");
        g.width = (e.width || 300);
        g.height = (e.height || 20);
        g.borderRadius = (e.borderRadius || 10);
        if (g.orientation == a.Orientation.Horizontal && g.borderRadius > g.height / 2) {
            g.borderRadius = Math.round(g.height / 2)
        }
        if (g.orientation == a.Orientation.Vertical && g.borderRadius > g.width / 2) {
            g.borderRadius = Math.round(g.width / 2)
        }
        g.backColor = (e.backColor || "");
        g.color = (e.color || "#fe8e14");
        g.animationStyle = 0;
        g.animationInterval = (e.animationInterval || 100);
        var c = ["parent", "background", "wrapper", "left", "middle", "right", "horizontalText", "verticalText", "marker"];
        g.extraClassName = {};
        for (f = 0; f < c.length; f++) {
            if (!e.extraClassName) {
                g.extraClassName[c[f]] = ""
            } else {
                if (typeof e.extraClassName == "string") {
                    g.extraClassName[c[f]] = e.extraClassName
                } else {
                    g.extraClassName[c[f]] = (e.extraClassName[c[f]] || "")
                }
            }
        }
        g.onLoad = (e.onLoad || null);
        g.onValueChanged = (e.onValueChanged || null);
        g.onAnimate = (e.onAnimate || null);
        if (g.creationType == a.CreationType.Replace) {
            g.parentElement = document.getElementById(d)
        } else {
            g.parentElement = document.createElement("DIV");
            document.getElementById(d).appendChild(g.parentElement)
        }
        g.finishLoading()
    }
    a.prototype.finishLoading = function() {
        var h = this,
            e = "",
            g;
        h.wrapperElement = null;
        h.backgroundElement = null;
        h.valueElement = null;
        h.leftElement = null;
        h.middleElement = null;
        h.rightElement = null;
        h.backgroundElement = document.createElement("DIV");
        h.backgroundElement.className = "progressbar_background" + (h.extraClassName.background ? " " : "") + h.extraClassName.background;
        h.backgroundElement.style.cssText = h.backgroundElement.style.cssText + a._createBorderRadiusCss(h.borderRadius);
        h.parentElement.appendChild(h.backgroundElement);
        var d = ["border-radius", "border-bottom-right-radius", "-moz-border-radius-bottomright", "-webkit-border-bottom-right-radius", "-khtml-border-radius-bottomright", "-khtml-border-bottom-right-radius"];
        var f = 0,
            c = "";
        for (f = 0; f < d.length; f++) {
            c = a._elementCurrentStyle(h.backgroundElement, d[f]);
            if (c || typeof c == "string") {
                break
            }
        }
        if (c != "" && a._parseInt(c) != h.borderRadius) {
            h.borderRadius = a._parseInt(c)
        }
        if ((h.orientation == a.Orientation.Horizontal) || (h.orientation == a.Orientation.Vertical)) {
            h.displayType = 0
        } else {
            h.displayType = 1
        }
        h.parentElement.className = (h.parentElement.className != "" ? " " : "") + "progressbar_parent" + (h.extraClassName.parent ? " " : "") + h.extraClassName.parent;
        if (h.displayType == 0) {
            g = h.wrapperElement = document.createElement("DIV");
            g.style.border = "1px solid #A0A0A0";
            g.style.cssFloat = "left";
            g.style.display = "inline-block";
            g.style.width = h.width + "px";
            g.style.height = h.height + "px";
            g.style.left = "0px";
            g.style.top = (-h.height) + "px";
            g.style.backgroundColor = h.backColor;
            g.style.backgroundRepeat = "no-repeat";
            g.style.position = "relative";
            g.style.cssText = g.style.cssText + a._createBorderRadiusCss(h.borderRadius);
            h.parentElement.appendChild(g);
            h.borderWidth = {
                left: a._parseInt(a._elementCurrentStyle(g, "border-left-width")),
                right: a._parseInt(a._elementCurrentStyle(g, "border-right-width")),
                top: a._parseInt(a._elementCurrentStyle(g, "border-top-width")),
                bottom: a._parseInt(a._elementCurrentStyle(g, "border-bottom-width"))
            }
        } else {
            if (h.displayType == 1) {
                if (h.orientation == a.Orientation.Horizontal) {
                    if (h.borderRadius > h.width / 2) {
                        h.borderRadius = h.width
                    }
                } else {
                    if (h.orientation == a.Orientation.Vertical) {
                        if (h.borderRadius > h.height / 2) {
                            h.borderRadius = h.height
                        }
                    }
                }
                h.valueElement = document.createElement("DIV");
                h.valueElement.className = "";
                h.leftElement = document.createElement("DIV");
                h.middleElement = document.createElement("DIV");
                h.rightElement = document.createElement("DIV");
                h.leftElement.style.border = "1px solid #A0A0A0";
                h.leftElement.style.cssFloat = "left";
                h.leftElement.style.display = "inline-block";
                h.leftElement.style.backgroundColor = h.backColor;
                h.leftElement.style.backgroundRepeat = "no-repeat";
                h.leftElement.style.position = "relative";
                h.rightElement.style.border = "1px solid #A0A0A0";
                h.rightElement.style.cssFloat = "left";
                h.rightElement.style.display = "inline-block";
                h.rightElement.style.backgroundColor = h.backColor;
                h.rightElement.style.backgroundRepeat = "no-repeat";
                h.rightElement.style.position = "relative";
                h.middleElement.style.border = "1px solid #A0A0A0";
                h.middleElement.style.cssFloat = "left";
                h.middleElement.style.display = "inline-block";
                h.middleElement.style.overflow = "hidden";
                h.middleElement.style.position = "relative";
                h.valueElement.style.backgroundColor = h.backColor;
                h.valueElement.style.position = "relative";
                if (h.orientation == a.Orientation.Horizontal) {
                    h.leftElement.style.width = h.borderRadius + "px";
                    h.leftElement.style.height = h.height + "px";
                    h.leftElement.style.top = -h.height + "px";
                    h.leftElement.style.left = "0px";
                    h.leftElement.style.borderRight = "none";
                    h.leftElement.style.cssText = h.leftElement.style.cssText + a._createBorderRadiusCss(h.borderRadius, 0, 0, h.borderRadius);
                    h.rightElement.style.width = h.borderRadius + "px";
                    h.rightElement.style.height = h.height + "px";
                    h.rightElement.style.top = -h.height + "px";
                    h.rightElement.style.borderLeft = "none";
                    h.rightElement.style.cssText = h.rightElement.style.cssText + a._createBorderRadiusCss(0, h.borderRadius, h.borderRadius, 0);
                    h.middleElement.style.width = (h.width - (h.borderRadius * 2)) + "px";
                    h.middleElement.style.height = h.height + "px";
                    h.middleElement.style.top = -h.height + "px";
                    h.middleElement.style.borderLeft = "none";
                    h.middleElement.style.borderRight = "none";
                    h.valueElement.style.width = "0px";
                    h.valueElement.style.height = h.height + "px"
                } else {
                    if (h.orientation == a.Orientation.Vertical) {
                        h.leftElement.style.width = h.width + "px";
                        h.leftElement.style.height = h.borderRadius + "px";
                        h.leftElement.style.top = (-h.height) + "px";
                        h.leftElement.style.left = "0px";
                        h.leftElement.style.borderBottom = "none";
                        h.leftElement.style.cssText = h.leftElement.style.cssText + a._createBorderRadiusCss(h.borderRadius, h.borderRadius, 0, 0);
                        h.rightElement.style.width = h.width + "px";
                        h.rightElement.style.height = h.borderRadius + "px";
                        h.rightElement.style.top = (-h.height) + "px";
                        h.rightElement.style.left = "0px";
                        h.rightElement.style.borderTop = "none";
                        h.rightElement.style.cssText = h.rightElement.style.cssText + a._createBorderRadiusCss(0, 0, h.borderRadius, h.borderRadius);
                        h.middleElement.style.width = h.width + "px";
                        h.middleElement.style.height = h.height - h.borderRadius * 2 + "px";
                        h.middleElement.style.top = (-h.height) + "px";
                        h.middleElement.style.left = "0px";
                        h.middleElement.style.borderTop = "none";
                        h.middleElement.style.borderBottom = "none";
                        h.valueElement.style.width = h.width + "px";
                        h.valueElement.style.height = "0px"
                    }
                }
                h.middleElement.appendChild(h.valueElement);
                h.parentElement.appendChild(h.leftElement);
                h.parentElement.appendChild(h.middleElement);
                h.parentElement.appendChild(h.rightElement);
                if (h.orientation == a.Orientation.Horizontal) {
                    h.borderWidth = {
                        left: a._parseInt(a._elementCurrentStyle(h.leftElement, "border-left-width")),
                        right: a._parseInt(a._elementCurrentStyle(h.rightElement, "border-right-width")),
                        top: a._parseInt(a._elementCurrentStyle(h.middleElement, "border-top-width")),
                        bottom: a._parseInt(a._elementCurrentStyle(h.middleElement, "border-bottom-width"))
                    }
                } else {
                    if (h.orientation == a.Orientation.Vertical) {
                        h.borderWidth = {
                            left: a._parseInt(a._elementCurrentStyle(h.middleElement, "border-left-width")),
                            right: a._parseInt(a._elementCurrentStyle(h.middleElement, "border-right-width")),
                            top: a._parseInt(a._elementCurrentStyle(h.leftElement, "border-top-width")),
                            bottom: a._parseInt(a._elementCurrentStyle(h.rightElement, "border-bottom-width"))
                        }
                    }
                }
            }
        }
        h.parentElement.style.width = (h.width + h.borderWidth.left + h.borderWidth.right) + "px";
        h.parentElement.style.height = (h.height + h.borderWidth.top + h.borderWidth.bottom) + "px";
        h.backgroundElement.style.cssFloat = "left";
        h.backgroundElement.style.display = "inline-block";
        h.backgroundElement.style.width = (h.width + h.borderWidth.left + h.borderWidth.right) + "px";
        h.backgroundElement.style.height = h.height + "px";
        h.backgroundElement.style.backgroundColor = "#FFFFFF";
        h.backgroundElement.style.position = "relative";
        if (h.displayType == 0) {
            h.backgroundElement.style.width = (h.width + h.borderWidth.left + h.borderWidth.right) + "px"
        }
        h.backgroundElement.style.top = h.borderWidth.top + "px";
        h.markerElement = document.createElement("DIV");
        h.markerElement.style.display = "inline-block";
        h.markerElement.style.zoom = "1.0";
        h.markerElement.style.width = h.width + "px";
        h.markerElement.style.height = h.height + "px";
        h.markerElement.style.top = (-h.height * 2 - h.borderWidth.top) + "px";
        h.markerElement.style.left = h.borderWidth.left + "px";
        h.markerElement.style.backgroundColor = h.color;
        h.markerElement.style.lineHeight = (h.height) + "px";
        h.markerElement.style.position = "relative";
        h.parentElement.appendChild(h.markerElement);
        h.isLoaded = true;
        h.setValue(h.initialValue);
        if (h.onLoad != null) {
            h.onLoad()
        }
    };
    a.prototype.setValue = function(e) {
        var i = this;
        if (e !== null && e < i.minValue) {
            e = i.minValue
        }
        if (e !== null && e > i.maxValue) {
            e = i.maxValue
        }
        if (e === null) {} else {
            i.value = e
        }
        if (i.isLoaded) {
            var c = 0;
            if (i.orientation == a.Orientation.Horizontal) {
                c = (i.value / i.maxValue) * i.width;
                i.progressPosition = c;
                if (i.displayType == 0) {
                    if (i.direction == a.Direction.LeftToRight) {} else {}
                } else {
                    if (i.displayType == 1) {
                        if (i.direction == a.Direction.LeftToRight) {
                            if (c <= i.borderRadius) {
                                i.valueElement.style.width = "0px"
                            } else {
                                if (c >= i.width - i.borderRadius) {
                                    i.valueElement.style.width = i.middleElement.style.width
                                } else {
                                    i.valueElement.style.width = (c - i.borderRadius) + "px"
                                }
                            }
                        } else {
                            if (c <= i.borderRadius) {
                                i.valueElement.style.width = "0px"
                            } else {
                                if (c >= i.width - i.borderRadius) {
                                    i.valueElement.style.left = "0px";
                                    i.valueElement.style.width = i.middleElement.style.width
                                } else {
                                    i.valueElement.style.left = (i.width - c - i.borderRadius) + "px";
                                    i.valueElement.style.width = (c - i.borderRadius) + "px"
                                }
                            }
                        }
                    }
                }
                if (c > 0) {
                    if (i.animationStyle != a.AnimationStyle.StaticFull && i.animationStyle != a.AnimationStyle.CustomFull) {
                        i.markerElement.style.width = c + "px"
                    } else {
                        i.markerElement.style.width = i.width + "px"
                    }
                    i.markerElement.style.visibility = "visible"
                } else {
                    i.markerElement.style.width = i.width + "px";
                    if (i.animationStyle != a.AnimationStyle.StaticFull && i.animationStyle != a.AnimationStyle.CustomFull) {
                        i.markerElement.style.visibility = "hidden"
                    }
                }
                if (i.animationStyle != a.AnimationStyle.StaticFull && i.animationStyle != a.AnimationStyle.CustomFull) {
                    if (i.direction == a.Direction.LeftToRight) {
                        i.markerElement.style.left = i.borderWidth.left + "px"
                    } else {
                        i.markerElement.style.left = (i.width - c + i.borderWidth.left) + "px"
                    }
                } else {
                    i.markerElement.style.left = i.borderWidth.left + "px"
                }
                var l = (-i.height * 2 - i.height - i.borderWidth.top);
                var n = (-i.height * 2 - i.borderWidth.top);
                if (c == 0 || i.width == c) {
                    i.markerElement.style.top = n + "px";
                    i.markerElement.style.height = i.height + "px";
                    i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(i.borderRadius)
                } else {
                    if (c < i.borderRadius) {
                        var m = i.height - 2.25 * (i.borderRadius - Math.sqrt(Math.pow(i.borderRadius, 2) - Math.pow(i.borderRadius - c, 2)));
                        var j = n + (i.height / 2) - (m / 2);
                        var d = l - 2 * (n - j);
                        i.markerElement.style.top = j + "px";
                        i.markerElement.style.height = m + "px";
                        if (i.direction == a.Direction.LeftToRight) {
                            i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(i.borderRadius, 0, 0, i.borderRadius)
                        } else {
                            i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(0, i.borderRadius, i.borderRadius, 0)
                        }
                    } else {
                        if (i.width - c < i.borderRadius) {
                            var h = ((i.borderRadius - (i.width - c)) * 2 + (i.borderRadius - Math.sqrt(Math.pow(i.borderRadius, 2) - Math.pow(i.borderRadius - (i.width - c), 2)))) / 3;
                            if (i.direction == a.Direction.LeftToRight) {
                                i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(i.borderRadius, h, h, i.borderRadius)
                            } else {
                                i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(h, i.borderRadius, i.borderRadius, h)
                            }
                        } else {
                            i.markerElement.style.top = n + "px";
                            i.markerElement.style.height = i.height + "px";
                            if (i.direction == a.Direction.LeftToRight) {
                                i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(i.borderRadius, 0, 0, i.borderRadius)
                            } else {
                                i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(0, i.borderRadius, i.borderRadius, 0)
                            }
                        }
                    }
                }
            } else {
                if (i.orientation == a.Orientation.Vertical) {
                    c = (i.value / i.maxValue) * i.height;
                    i.progressPosition = c;
                    if (i.displayType == 0) {
                        if (i.direction == a.Direction.TopToBottom) {} else {}
                    } else {
                        if (i.displayType == 1) {
                            if (i.direction == a.Direction.TopToBottom) {
                                if (c <= i.borderRadius) {
                                    i.valueElement.style.height = "0px"
                                } else {
                                    if (c >= i.height - i.borderRadius) {
                                        i.valueElement.style.height = i.middleElement.style.height
                                    } else {
                                        i.valueElement.style.height = (c - i.borderRadius) + "px"
                                    }
                                }
                            } else {
                                if (c <= i.borderRadius) {
                                    i.valueElement.style.height = "0px"
                                } else {
                                    if (c >= i.height - i.borderRadius) {
                                        i.valueElement.style.top = "0px";
                                        i.valueElement.style.height = i.middleElement.style.height
                                    } else {
                                        i.valueElement.style.top = (i.height - c - i.borderRadius) + "px";
                                        i.valueElement.style.height = (c + i.borderRadius * 2) + "px"
                                    }
                                }
                            }
                        }
                    }
                    if (c > 0) {
                        if (i.animationStyle != a.AnimationStyle.StaticFull && i.animationStyle != a.AnimationStyle.CustomFull) {
                            i.markerElement.style.height = c + "px"
                        } else {
                            i.markerElement.style.height = i.height + "px";
                            i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(i.borderRadius)
                        }
                        i.markerElement.style.visibility = "visible"
                    } else {
                        i.markerElement.style.height = 0 + "px";
                        if (i.animationStyle != a.AnimationStyle.StaticFull && i.animationStyle != a.AnimationStyle.CustomFull) {
                            i.markerElement.style.visibility = "hidden"
                        }
                    }
                    var g = i.borderWidth.left;
                    var k = i.borderWidth.left;
                    if (c == 0 || i.height == c) {
                        i.markerElement.style.left = k + "px";
                        i.markerElement.style.width = i.width + "px";
                        i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(i.borderRadius)
                    } else {
                        if (c < i.borderRadius) {
                            var f = 2.5 * c;
                            if (f > i.width) {
                                f = i.width
                            }
                            var o = k + (i.width / 2) - (f / 2);
                            i.markerElement.style.left = o + "px";
                            i.markerElement.style.width = f + "px";
                            if (i.direction == a.Direction.BottomToTop) {
                                i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(0, 0, i.borderRadius, i.borderRadius)
                            } else {
                                i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(i.borderRadius, i.borderRadius, 0, 0)
                            }
                        } else {
                            if (i.height - c < i.borderRadius) {
                                var h = ((i.borderRadius - (i.height - c)) * 2 + (i.borderRadius - Math.sqrt(Math.pow(i.borderRadius, 2) - Math.pow(i.borderRadius - (i.height - c), 2)))) / 3;
                                if (i.direction == a.Direction.BottomToTop) {
                                    i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(h, h, i.borderRadius, i.borderRadius)
                                } else {
                                    i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(i.borderRadius, i.borderRadius, h, h)
                                }
                            } else {
                                i.markerElement.style.left = k + "px";
                                i.markerElement.style.width = i.width + "px";
                                if (i.direction == a.Direction.BottomToTop) {
                                    i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(0, 0, i.borderRadius, i.borderRadius)
                                } else {
                                    i.markerElement.style.cssText = i.markerElement.style.cssText + a._createBorderRadiusCss(i.borderRadius, i.borderRadius, 0, 0)
                                }
                            }
                        }
                    }
                    if (i.animationStyle != a.AnimationStyle.StaticFull && i.animationStyle != a.AnimationStyle.CustomFull) {
                        if (i.direction == a.Direction.TopToBottom) {
                            i.markerElement.style.top = (-i.height * 2 - i.borderWidth.top) + "px"
                        } else {
                            i.markerElement.style.top = (-i.height - c - i.borderWidth.top) + "px"
                        }
                    } else {
                        i.markerElement.style.top = (-i.height * 2 - i.borderWidth.top) + "px"
                    }
                }
            }
            i.progress = (i.value / i.maxValue)
        }
        if (i.onValueChanged != null) {
            i.onValueChanged()
        }
    };
    a._elementCurrentStyle = function(f, e) {
        if (f.currentStyle) {
            var d = 0,
                c = "",
                g = false;
            for (d = 0; d < e.length; d++) {
                if (e[d].toString() != "-") {
                    c += (g ? e[d].toString().toUpperCase() : e[d].toString());
                    g = false
                } else {
                    g = true
                }
            }
            e = c;
            return f.currentStyle[e]
        } else {
            return getComputedStyle(f, null).getPropertyValue(e)
        }
    };
    a._parseInt = function(d) {
        var c = parseInt(d);
        if (isNaN(c)) {
            c = 0
        }
        return c
    };
    a._createBorderRadiusCss = function(c, e, d, f) {
        if (c != null && e == null && d == null && f == null) {
            return "; -moz-border-radius: " + c + "px; -ms-border-radius: " + c + "px; -o-border-radius: " + c + "px; -webkit-border-radius: " + c + "px; -khtml-border-radius: " + c + "px; border-radius: " + c + "px;"
        } else {
            c = (c || 0);
            e = (e || 0);
            d = (d || 0);
            f = (f || 0);
            return "; -moz-border-radius: " + c + "px " + e + "px " + d + "px " + f + "px; -ms-border-radius: " + c + "px " + e + "px " + d + "px " + f + "px; -o-border-radius: " + c + "px " + e + "px " + d + "px " + f + "px; -webkit-border-radius: " + c + "px " + e + "px " + d + "px " + f + "px; -khtml-border-radius: " + c + "px " + e + "px " + d + "px " + f + "px; border-radius: " + c + "px " + e + "px " + d + "px " + f + "px;"
        }
    };
    b.ProgressBar = a
})(Dynamsoft.Lib);
var EnumDWT_PixelType = {
    TWPT_BW: 0,
    TWPT_GRAY: 1,
    TWPT_RGB: 2,
    TWPT_PALLETE: 3,
    TWPT_CMY: 4,
    TWPT_CMYK: 5,
    TWPT_YUV: 6,
    TWPT_YUVK: 7,
    TWPT_CIEXYZ: 8,
    TWPT_LAB: 9,
    TWPT_SRGB: 10,
    TWPT_SCRGB: 11,
    TWPT_INFRARED: 16
};
var EnumDWT_BorderStyle = {
    TWBS_NONE: 0,
    TWBS_SINGLEFLAT: 1,
    TWBS_SINGLE3D: 2
};
var EnumDWT_MessageType = {
    TWQC_GET: 1,
    TWQC_SET: 2,
    TWQC_GETDEFAULT: 4,
    TWQC_GETCURRENT: 8,
    TWQC_RESET: 16
};
var EnumDWT_Cap = {
    CAP_NONE: 0,
    CAP_XFERCOUNT: 1,
    ICAP_COMPRESSION: 256,
    ICAP_PIXELTYPE: 257,
    ICAP_UNITS: 258,
    ICAP_XFERMECH: 259,
    CAP_AUTHOR: 4096,
    CAP_CAPTION: 4097,
    CAP_FEEDERENABLED: 4098,
    CAP_FEEDERLOADED: 4099,
    CAP_TIMEDATE: 4100,
    CAP_SUPPORTEDCAPS: 4101,
    CAP_EXTENDEDCAPS: 4102,
    CAP_AUTOFEED: 4103,
    CAP_CLEARPAGE: 4104,
    CAP_FEEDPAGE: 4105,
    CAP_REWINDPAGE: 4106,
    CAP_INDICATORS: 4107,
    CAP_SUPPORTEDCAPSEXT: 4108,
    CAP_PAPERDETECTABLE: 4109,
    CAP_UICONTROLLABLE: 4110,
    CAP_DEVICEONLINE: 4111,
    CAP_AUTOSCAN: 4112,
    CAP_THUMBNAILSENABLED: 4113,
    CAP_DUPLEX: 4114,
    CAP_DUPLEXENABLED: 4115,
    CAP_ENABLEDSUIONLY: 4116,
    CAP_CUSTOMDSDATA: 4117,
    CAP_ENDORSER: 4118,
    CAP_ALARMS: 4120,
    CAP_ALARMVOLUME: 4121,
    CAP_AUTOMATICCAPTURE: 4122,
    CAP_TIMEBEFOREFIRSTCAPTURE: 4123,
    CAP_TIMEBETWEENCAPTURES: 4124,
    CAP_CLEARBUFFERS: 4125,
    CAP_MAXBATCHBUFFERS: 4126,
    CAP_DEVICETIMEDATE: 4127,
    CAP_POWERSUPPLY: 4128,
    CAP_CAMERAPREVIEWUI: 4129,
    CAP_SERIALNUMBER: 4132,
    CAP_PRINTER: 4134,
    CAP_PRINTERENABLED: 4135,
    CAP_PRINTERINDEX: 4136,
    CAP_PRINTERMODE: 4137,
    CAP_PRINTERSTRING: 4138,
    CAP_PRINTERSUFFIX: 4139,
    CAP_LANGUAGE: 4140,
    CAP_FEEDERALIGNMENT: 4141,
    CAP_FEEDERORDER: 4142,
    CAP_REACQUIREALLOWED: 4144,
    CAP_BATTERYMINUTES: 4146,
    CAP_BATTERYPERCENTAGE: 4147,
    CAP_CAMERASIDE: 4148,
    CAP_SEGMENTED: 4149,
    CAP_CAMERAENABLED: 4150,
    CAP_CAMERAORDER: 4151,
    CAP_MICRENABLED: 4152,
    CAP_FEEDERPREP: 4153,
    CAP_FEEDERPOCKET: 4154,
    CAP_AUTOMATICSENSEMEDIUM: 4155,
    CAP_CUSTOMINTERFACEGUID: 4156,
    ICAP_AUTOBRIGHT: 4352,
    ICAP_BRIGHTNESS: 4353,
    ICAP_CONTRAST: 4355,
    ICAP_CUSTHALFTONE: 4356,
    ICAP_EXPOSURETIME: 4357,
    ICAP_FILTER: 4358,
    ICAP_FLASHUSED: 4359,
    ICAP_GAMMA: 4360,
    ICAP_HALFTONES: 4361,
    ICAP_HIGHLIGHT: 4362,
    ICAP_IMAGEFILEFORMAT: 4364,
    ICAP_LAMPSTATE: 4365,
    ICAP_LIGHTSOURCE: 4366,
    ICAP_ORIENTATION: 4368,
    ICAP_PHYSICALWIDTH: 4369,
    ICAP_PHYSICALHEIGHT: 4370,
    ICAP_SHADOW: 4371,
    ICAP_FRAMES: 4372,
    ICAP_XNATIVERESOLUTION: 4374,
    ICAP_YNATIVERESOLUTION: 4375,
    ICAP_XRESOLUTION: 4376,
    ICAP_YRESOLUTION: 4377,
    ICAP_MAXFRAMES: 4378,
    ICAP_TILES: 4379,
    ICAP_BITORDER: 4380,
    ICAP_CCITTKFACTOR: 4381,
    ICAP_LIGHTPATH: 4382,
    ICAP_PIXELFLAVOR: 4383,
    ICAP_PLANARCHUNKY: 4384,
    ICAP_ROTATION: 4385,
    ICAP_SUPPORTEDSIZES: 4386,
    ICAP_THRESHOLD: 4387,
    ICAP_XSCALING: 4388,
    ICAP_YSCALING: 4389,
    ICAP_BITORDERCODES: 4390,
    ICAP_PIXELFLAVORCODES: 4391,
    ICAP_JPEGPIXELTYPE: 4392,
    ICAP_TIMEFILL: 4394,
    ICAP_BITDEPTH: 4395,
    ICAP_BITDEPTHREDUCTION: 4396,
    ICAP_UNDEFINEDIMAGESIZE: 4397,
    ICAP_EXTIMAGEINFO: 4399,
    ICAP_MINIMUMHEIGHT: 4400,
    ICAP_MINIMUMWIDTH: 4401,
    ICAP_AUTODISCARDBLANKPAGES: 4404,
    ICAP_FLIPROTATION: 4406,
    ICAP_BARCODEDETECTIONENABLED: 4407,
    ICAP_SUPPORTEDBARCODETYPES: 4408,
    ICAP_BARCODEMAXSEARCHPRIORITIES: 4409,
    ICAP_BARCODESEARCHPRIORITIES: 4410,
    ICAP_BARCODESEARCHMODE: 4411,
    ICAP_BARCODEMAXRETRIES: 4412,
    ICAP_BARCODETIMEOUT: 4413,
    ICAP_ZOOMFACTOR: 4414,
    ICAP_PATCHCODEDETECTIONENABLED: 4415,
    ICAP_SUPPORTEDPATCHCODETYPES: 4416,
    ICAP_PATCHCODEMAXSEARCHPRIORITIES: 4417,
    ICAP_PATCHCODESEARCHPRIORITIES: 4418,
    ICAP_PATCHCODESEARCHMODE: 4419,
    ICAP_PATCHCODEMAXRETRIES: 4420,
    ICAP_PATCHCODETIMEOUT: 4421,
    ICAP_FLASHUSED2: 4422,
    ICAP_IMAGEFILTER: 4423,
    ICAP_NOISEFILTER: 4424,
    ICAP_OVERSCAN: 4425,
    ICAP_AUTOMATICBORDERDETECTION: 4432,
    ICAP_AUTOMATICDESKEW: 4433,
    ICAP_AUTOMATICROTATE: 4434,
    ICAP_JPEGQUALITY: 4435,
    ICAP_FEEDERTYPE: 4436,
    ICAP_ICCPROFILE: 4437,
    ICAP_AUTOSIZE: 4438,
    ICAP_AUTOMATICCROPUSESFRAME: 4439,
    ICAP_AUTOMATICLENGTHDETECTION: 4440,
    ICAP_AUTOMATICCOLORENABLED: 4441,
    ICAP_AUTOMATICCOLORNONCOLORPIXELTYPE: 4442,
    ICAP_COLORMANAGEMENTENABLED: 4443,
    ICAP_IMAGEMERGE: 4444,
    ICAP_IMAGEMERGEHEIGHTTHRESHOLD: 4445,
    ICAP_SUPPORTEDEXTIMAGEINFO: 4446
};
var EnumDWT_CapType = {
    TWON_NONE: 0,
    TWON_ARRAY: 3,
    TWON_ENUMERATION: 4,
    TWON_ONEVALUE: 5,
    TWON_RANGE: 6
};
var EnumDWT_TransferMode = {
    TWSX_NATIVE: 0,
    TWSX_FILE: 1,
    TWSX_MEMORY: 2
};
var EnumDWT_FileFormat = {
    TWFF_TIFF: 0,
    TWFF_PICT: 1,
    TWFF_BMP: 2,
    TWFF_XBM: 3,
    TWFF_JFIF: 4,
    TWFF_FPX: 5,
    TWFF_TIFFMULTI: 6,
    TWFF_PNG: 7,
    TWFF_SPIFF: 8,
    TWFF_EXIF: 9,
    TWFF_PDF: 10,
    TWFF_JP2: 11,
    TWFF_JPN: 12,
    TWFF_JPX: 13,
    TWFF_DEJAVU: 14,
    TWFF_PDFA: 15,
    TWFF_PDFA2: 16
};
var EnumDWT_TIFFCompressionType = {
    TIFF_AUTO: 0,
    TIFF_NONE: 1,
    TIFF_RLE: 2,
    TIFF_FAX3: 3,
    TIFF_T4: 3,
    TIFF_FAX4: 4,
    TIFF_T6: 4,
    TIFF_LZW: 5,
    TIFF_JPEG: 7,
    TIFF_PACKBITS: 32773
};
var EnumDWT_InterpolationMethod = {
    IM_NEARESTNEIGHBOUR: 1,
    IM_BILINEAR: 2,
    IM_BICUBIC: 3,
    IM_BESTQUALITY: 5
};
var EnumDWT_ImageType = {
    IT_BMP: 0,
    IT_JPG: 1,
    IT_TIF: 2,
    IT_PNG: 3,
    IT_PDF: 4,
    IT_ALL: 5
};
var EnumDWT_PDFCompressionType = {
    PDF_AUTO: 0,
    PDF_FAX3: 1,
    PDF_FAX4: 2,
    PDF_LZW: 3,
    PDF_RLE: 4,
    PDF_JPEG: 5
};
var EnumDWT_ShowMode = {
    SW_ACTIVE: 0,
    SW_MAX: 1,
    SW_MIN: 2,
    SW_CLOSE: 3,
    SW_IFLIVE: 4
};
var EnumDWT_CapValueType = {
    TWTY_INT8: 0,
    TWTY_INT16: 1,
    TWTY_INT32: 2,
    TWTY_UINT8: 3,
    TWTY_UINT16: 4,
    TWTY_int: 5,
    TWTY_BOOL: 6,
    TWTY_FIX32: 7,
    TWTY_FRAME: 8,
    TWTY_STR32: 9,
    TWTY_STR64: 10,
    TWTY_STR128: 11,
    TWTY_STR255: 12
};
var EnumDWT_UnitType = {
    TWUN_INCHES: 0,
    TWUN_CENTIMETERS: 1,
    TWUN_PICAS: 2,
    TWUN_POINTS: 3,
    TWUN_TWIPS: 4,
    TWUN_PIXELS: 5,
    TWUN_MILLIMETERS: 6
};
var EnumDWT_DUPLEX = {
    TWDX_NONE: 0,
    TWDX_1PASSDUPLEX: 1,
    TWDX_2PASSDUPLEX: 2
};
var EnumDWT_CapLanguage = {
    TWLG_DAN: 0,
    TWLG_DUT: 1,
    TWLG_ENG: 2,
    TWLG_FCF: 3,
    TWLG_FIN: 4,
    TWLG_FRN: 5,
    TWLG_GER: 6,
    TWLG_ICE: 7,
    TWLG_ITN: 8,
    TWLG_NOR: 9,
    TWLG_POR: 10,
    TWLG_SPA: 11,
    TWLG_SWE: 12,
    TWLG_USA: 13,
    TWLG_USERLOCALE: -1,
    TWLG_AFRIKAANS: 14,
    TWLG_ALBANIA: 15,
    TWLG_ARABIC: 16,
    TWLG_ARABIC_ALGERIA: 17,
    TWLG_ARABIC_BAHRAIN: 18,
    TWLG_ARABIC_EGYPT: 19,
    TWLG_ARABIC_IRAQ: 20,
    TWLG_ARABIC_JORDAN: 21,
    TWLG_ARABIC_KUWAIT: 22,
    TWLG_ARABIC_LEBANON: 23,
    TWLG_ARABIC_LIBYA: 24,
    TWLG_ARABIC_MOROCCO: 25,
    TWLG_ARABIC_OMAN: 26,
    TWLG_ARABIC_QATAR: 27,
    TWLG_ARABIC_SAUDIARABIA: 28,
    TWLG_ARABIC_SYRIA: 29,
    TWLG_ARABIC_TUNISIA: 30,
    TWLG_ARABIC_UAE: 31,
    TWLG_ARABIC_YEMEN: 32,
    TWLG_BASQUE: 33,
    TWLG_BYELORUSSIAN: 34,
    TWLG_BULGARIAN: 35,
    TWLG_CATALAN: 36,
    TWLG_CHINESE: 37,
    TWLG_CHINESE_HONGKONG: 38,
    TWLG_CHINESE_PRC: 39,
    TWLG_CHINESE_SINGAPORE: 40,
    TWLG_CHINESE_SIMPLIFIED: 41,
    TWLG_CHINESE_TAIWAN: 42,
    TWLG_CHINESE_TRADITIONAL: 43,
    TWLG_CROATIA: 44,
    TWLG_CZECH: 45,
    TWLG_DANISH: 0,
    TWLG_DUTCH: 1,
    TWLG_DUTCH_BELGIAN: 46,
    TWLG_ENGLISH: 2,
    TWLG_ENGLISH_AUSTRALIAN: 47,
    TWLG_ENGLISH_CANADIAN: 48,
    TWLG_ENGLISH_IRELAND: 49,
    TWLG_ENGLISH_NEWZEALAND: 50,
    TWLG_ENGLISH_SOUTHAFRICA: 51,
    TWLG_ENGLISH_UK: 52,
    TWLG_ENGLISH_USA: 13,
    TWLG_ESTONIAN: 53,
    TWLG_FAEROESE: 54,
    TWLG_FARSI: 55,
    TWLG_FINNISH: 4,
    TWLG_FRENCH: 5,
    TWLG_FRENCH_BELGIAN: 56,
    TWLG_FRENCH_CANADIAN: 3,
    TWLG_FRENCH_LUXEMBOURG: 57,
    TWLG_FRENCH_SWISS: 58,
    TWLG_GERMAN: 6,
    TWLG_GERMAN_AUSTRIAN: 59,
    TWLG_GERMAN_LUXEMBOURG: 60,
    TWLG_GERMAN_LIECHTENSTEIN: 61,
    TWLG_GERMAN_SWISS: 62,
    TWLG_GREEK: 63,
    TWLG_HEBREW: 64,
    TWLG_HUNGARIAN: 65,
    TWLG_ICELANDIC: 7,
    TWLG_INDONESIAN: 66,
    TWLG_ITALIAN: 8,
    TWLG_ITALIAN_SWISS: 67,
    TWLG_JAPANESE: 68,
    TWLG_KOREAN: 69,
    TWLG_KOREAN_JOHAB: 70,
    TWLG_LATVIAN: 71,
    TWLG_LITHUANIAN: 72,
    TWLG_NORWEGIAN: 9,
    TWLG_NORWEGIAN_BOKMAL: 73,
    TWLG_NORWEGIAN_NYNORSK: 74,
    TWLG_POLISH: 75,
    TWLG_PORTUGUESE: 10,
    TWLG_PORTUGUESE_BRAZIL: 76,
    TWLG_ROMANIAN: 77,
    TWLG_RUSSIAN: 78,
    TWLG_SERBIAN_LATIN: 79,
    TWLG_SLOVAK: 80,
    TWLG_SLOVENIAN: 81,
    TWLG_SPANISH: 11,
    TWLG_SPANISH_MEXICAN: 82,
    TWLG_SPANISH_MODERN: 83,
    TWLG_SWEDISH: 12,
    TWLG_THAI: 84,
    TWLG_TURKISH: 85,
    TWLG_UKRANIAN: 86,
    TWLG_ASSAMESE: 87,
    TWLG_BENGALI: 88,
    TWLG_BIHARI: 89,
    TWLG_BODO: 90,
    TWLG_DOGRI: 91,
    TWLG_GUJARATI: 92,
    TWLG_HARYANVI: 93,
    TWLG_HINDI: 94,
    TWLG_KANNADA: 95,
    TWLG_KASHMIRI: 96,
    TWLG_MALAYALAM: 97,
    TWLG_MARATHI: 98,
    TWLG_MARWARI: 99,
    TWLG_MEGHALAYAN: 100,
    TWLG_MIZO: 101,
    TWLG_NAGA: 102,
    TWLG_ORISSI: 103,
    TWLG_PUNJABI: 104,
    TWLG_PUSHTU: 105,
    TWLG_SERBIAN_CYRILLIC: 106,
    TWLG_SIKKIMI: 107,
    TWLG_SWEDISH_FINLAND: 108,
    TWLG_TAMIL: 109,
    TWLG_TELUGU: 110,
    TWLG_TRIPURI: 111,
    TWLG_URDU: 112,
    TWLG_VIETNAMESE: 113
};
var EnumDWT_CapSupportedSizes = {
    TWSS_NONE: 0,
    TWSS_A4LETTER: 1,
    TWSS_B5LETTER: 2,
    TWSS_USLETTER: 3,
    TWSS_USLEGAL: 4,
    TWSS_A5: 5,
    TWSS_B4: 6,
    TWSS_B6: 7,
    TWSS_USLEDGER: 9,
    TWSS_USEXECUTIVE: 10,
    TWSS_A3: 11,
    TWSS_B3: 12,
    TWSS_A6: 13,
    TWSS_C4: 14,
    TWSS_C5: 15,
    TWSS_C6: 16,
    TWSS_4A0: 17,
    TWSS_2A0: 18,
    TWSS_A0: 19,
    TWSS_A1: 20,
    TWSS_A2: 21,
    TWSS_A4: 1,
    TWSS_A7: 22,
    TWSS_A8: 23,
    TWSS_A9: 24,
    TWSS_A10: 25,
    TWSS_ISOB0: 26,
    TWSS_ISOB1: 27,
    TWSS_ISOB2: 28,
    TWSS_ISOB3: 12,
    TWSS_ISOB4: 6,
    TWSS_ISOB5: 29,
    TWSS_ISOB6: 7,
    TWSS_ISOB7: 30,
    TWSS_ISOB8: 31,
    TWSS_ISOB9: 32,
    TWSS_ISOB10: 33,
    TWSS_JISB0: 34,
    TWSS_JISB1: 35,
    TWSS_JISB2: 36,
    TWSS_JISB3: 37,
    TWSS_JISB4: 38,
    TWSS_JISB5: 2,
    TWSS_JISB6: 39,
    TWSS_JISB7: 40,
    TWSS_JISB8: 41,
    TWSS_JISB9: 42,
    TWSS_JISB10: 43,
    TWSS_C0: 44,
    TWSS_C1: 45,
    TWSS_C2: 46,
    TWSS_C3: 47,
    TWSS_C7: 48,
    TWSS_C8: 49,
    TWSS_C9: 50,
    TWSS_C10: 51,
    TWSS_USSTATEMENT: 52,
    TWSS_BUSINESSCARD: 53,
    TWSS_MAXSIZE: 54
};
var EnumDWT_CapFeederAlignment = {
    TWFA_NONE: 0,
    TWFA_LEFT: 1,
    TWFA_CENTER: 2,
    TWFA_RIGHT: 3
};
var EnumDWT_CapFeederOrder = {
    TWFO_FIRSTPAGEFIRST: 0,
    TWFO_LASTPAGEFIRST: 1
};
var EnumDWT_CapPrinter = {
    TWPR_IMPRINTERTOPBEFORE: 0,
    TWPR_IMPRINTERTOPAFTER: 1,
    TWPR_IMPRINTERBOTTOMBEFORE: 2,
    TWPR_IMPRINTERBOTTOMAFTER: 3,
    TWPR_ENDORSERTOPBEFORE: 4,
    TWPR_ENDORSERTOPAFTER: 5,
    TWPR_ENDORSERBOTTOMBEFORE: 6,
    TWPR_ENDORSERBOTTOMAFTER: 7
};
var EnumDWT_CapPrinterMode = {
    TWPM_SINGLESTRING: 0,
    TWPM_MULTISTRING: 1,
    TWPM_COMPOUNDSTRING: 2
};
var EnumDWT_CapBitdepthReduction = {
    TWBR_THRESHOLD: 0,
    TWBR_HALFTONE: 1,
    TWBR_CUSTHALFTONE: 2,
    TWBR_DIFFUSION: 3
};
var EnumDWT_CapBitOrder = {
    TWBO_LSBFIRST: 0,
    TWBO_MSBFIRST: 1
};
var EnumDWT_CapFilterType = {
    TWFT_RED: 0,
    TWFT_GREEN: 1,
    TWFT_BLUE: 2,
    TWFT_NONE: 3,
    TWFT_WHITE: 4,
    TWFT_CYAN: 5,
    TWFT_MAGENTA: 6,
    TWFT_YELLOW: 7,
    TWFT_BLACK: 8
};
var EnumDWT_CapFlash = {
    TWFL_NONE: 0,
    TWFL_OFF: 1,
    TWFL_ON: 2,
    TWFL_AUTO: 3,
    TWFL_REDEYE: 4
};
var EnumDWT_CapFlipRotation = {
    TWFR_BOOK: 0,
    TWFR_FANFOLD: 1
};
var EnumDWT_CapImageFilter = {
    TWIF_NONE: 0,
    TWIF_AUTO: 1,
    TWIF_LOWPASS: 2,
    TWIF_BANDPASS: 3,
    TWIF_HIGHPASS: 4,
    TWIF_TEXT: 3,
    TWIF_FINELINE: 4
};
var EnumDWT_CapLightPath = {
    TWLP_REFLECTIVE: 0,
    TWLP_TRANSMISSIVE: 1
};
var EnumDWT_CapLightSource = {
    TWLS_RED: 0,
    TWLS_GREEN: 1,
    TWLS_BLUE: 2,
    TWLS_NONE: 3,
    TWLS_WHITE: 4,
    TWLS_UV: 5,
    TWLS_IR: 6
};
var EnumDWT_MagType = {
    TWMD_MICR: 0,
    TWMD_RAW: 1,
    TWMD_INVALID: 2
};
var EnumDWT_CapNoiseFilter = {
    TWNF_NONE: 0,
    TWNF_AUTO: 1,
    TWNF_LONEPIXEL: 2,
    TWNF_MAJORITYRULE: 3
};
var EnumDWT_CapORientation = {
    TWOR_ROT0: 0,
    TWOR_ROT90: 1,
    TWOR_ROT180: 2,
    TWOR_ROT270: 3,
    TWOR_PORTRAIT: 0,
    TWOR_LANDSCAPE: 3,
    TWOR_AUTO: 4,
    TWOR_AUTOTEXT: 5,
    TWOR_AUTOPICTURE: 6
};
var EnumDWT_CapOverscan = {
    TWOV_NONE: 0,
    TWOV_AUTO: 1,
    TWOV_TOPBOTTOM: 2,
    TWOV_LEFTRIGHT: 3,
    TWOV_ALL: 4
};
var EnumDWT_CapPixelFlavor = {
    TWPF_CHOCOLATE: 0,
    TWPF_VANILLA: 1
};
var EnumDWT_CapPlanarChunky = {
    TWPC_CHUNKY: 0,
    TWPC_PLANAR: 1
};
var EnumDWT_DataSourceStatus = {
    TWDSS_CLOSED: 0,
    TWDSS_OPENED: 1,
    TWDSS_ENABLED: 2,
    TWDSS_ACQUIRING: 3
};
var EnumDWT_FitWindowType = {
    enumFitWindow: 0,
    enumFitWindowHeight: 1,
    enumFitWindowWidth: 2
};
var EnumDWT_PlatformType = {
    enumWindow: 0,
    enumMac: 1,
    enumLinux: 2
};
var EnumDWT_UploadDataFormat = {
    Binary: 0,
    Base64: 1
};
var EnumDWT_MouseShape = {
    Default: 0,
    Hand: 1,
    Crosshair: 2,
    Zoom: 3
};
var EnumDWT_Language = {
    English: 0,
    French: 1,
    Arabic: 2,
    Spanish: 3,
    Portuguese: 4,
    German: 5,
    Italian: 6,
    Russian: 7,
    Chinese: 8
};
var EnumDWT_InitMsg = {
    Info: 1,
    Error: 2
};
var EnumDWT_Error = {
    ModuleNotExists: -2371
};
(function() {
    Dynamsoft.Lib.Errors = {
        Server_Restarted: function(a) {
            a._errorCode = -2208;
            a._errorString = "The connection with the local dynamsoft service encountered a problem and has been reset."
        },
        HTML5NotSupport: function(a) {
            a._errorCode = -2209;
            a._errorString = "The HTML5 edition does not support this method or property."
        },
        HttpServerCannotEmpty: function(a) {
            a._errorCode = -2300;
            a._errorString = "Http upload error: the HTTP Server cannot empty."
        },
        NetworkError: function(a) {
            a._errorCode = -2301;
            a._errorString = "Network error."
        },
        InvalidResultFormat: function(a) {
            a._errorCode = -2302;
            a._errorString = "The result format is invalid."
        },
        UploadError: function(d, c, b, a) {
            if (c) {
                d._errorCode = -2303;
                d._errorString = "Upload cancelled."
            } else {
                d._errorCode = -2003;
                if (a && a > 0) {
                    d._errorString = "HTTP process error: " + a + "."
                } else {
                    d._errorString = "HTTP process error."
                }
                if (b) {
                    d._errorString += " " + b
                }
            }
        },
        HttpDownloadUrlError: function(a) {
            a._errorCode = -2304;
            a._errorString = "Http download error: the url is invalid."
        },
        HttpDownloadError: function(d, c, b, a) {
            if (c) {
                d._errorCode = -2305;
                d._errorString = "User cancelled the operation."
            } else {
                d._errorCode = -2003;
                if (a && a > 0) {
                    d._errorString = "HTTP process error: " + a + "."
                } else {
                    d._errorString = "HTTP process error."
                }
                if (b) {
                    d._errorString += " " + b
                }
            }
        },
        UploadFileCannotEmpty: function(a) {
            a._errorCode = -2306;
            a._errorString = "Upload Error: the upload file cannot be empty."
        },
        InvalidWidthOrHeight: function(a) {
            a._errorCode = -2307;
            a._errorString = "The width or height you entered is invalid."
        },
        Server_Invalid: function(a) {
            if (a._errorCode == 0) {
                a._errorCode = -2308;
                a._errorString = "The local dynamsoft service has been stopped."
            }
        },
        InvalidLocalFilename: function(b, a) {
            b._errorCode = -2309;
            b._errorString = "The LocalFile is emtpy in " + a + " Function."
        },
        BarCode_InvalidIndex: function(b, a) {
            b._errorCode = -2310;
            b._errorString = "The index is out of range."
        },
        BarCode_InvalidRemoteFilename: function(a) {
            a._errorCode = -2311;
            a._errorString = "The RemoteFile is emtpy in Barcode Download Function."
        },
        ImageFileLengthCannotZero: function(a) {
            a._errorCode = -2312;
            a._errorString = "The file length is emtpy."
        },
        UploadExceededMaxSize: function(a) {
            a._errorCode = -2313;
            a._errorString = "The size of the images you are about to upload has exceeded the allowed size."
        },
        ParameterCannotEmpty: function(a) {
            a._errorCode = -2314;
            a._errorString = "The parameter cannot be empty."
        },
        Webcam_InvalidIndex: function(b, a) {
            b._errorCode = -2315;
            b._errorString = "The index is out of range."
        },
        Webcam_InvalidRemoteFilename: function(a) {
            a._errorCode = -2316;
            a._errorString = "The RemoteFile is emtpy in Webcam Download Function."
        },
        OCR_InvalidIndex: function(b, a) {
            b._errorCode = -2321;
            b._errorString = "The index is out of range."
        },
        OCR_InvalidLeftOrTopOrRightOrBottom: function(a) {
            a._errorCode = -2322;
            a._errorString = "The left or top or right or bottom you entered is invalid."
        },
        OCR_InvalidOutputFormat: function(a) {
            a._errorCode = -2323;
            a._errorString = "The OCR output format is not supported."
        },
        OCR_InvalidPageSetMode: function(a) {
            a._errorCode = -2324;
            a._errorString = "The OCR page set mode is not supported."
        },
        InvalidIndex: function(a) {
            a._errorCode = -1033;
            a._errorString = "Invalid index."
        },
        Pdf_InvalidRemoteFilename: function(a) {
            a._errorCode = -2317;
            a._errorString = "The RemoteFile is emtpy in Pdf Download Function."
        },
        InvalidDestination: function(a) {
            a._errorCode = -2318;
            a._errorString = "Invalid destination file."
        },
        InvalidSourceFile: function(a) {
            a._errorCode = -2319;
            a._errorString = "Invalid source file."
        },
        InvalidFile: function(a) {
            a._errorCode = -2320;
            a._errorString = "Invalid file."
        },
        hasLicenseError: function(a) {
            return (a._errorCode >= -2348 && a._errorCode <= -2325)
        },
        LicenseEmptyOrInvalid: function(a) {
            a._errorCode = -2325;
            a._errorString = "The current product key is empty or invalid, please contact the site administrator."
        },
        LicenseExpired: function(b, a) {
            b._errorCode = -2326;
            var c = "";
            if (a && a != "") {
                c = " on " + a
            }
            b._errorString = "The current product key has expired" + c + ", please contact the site administrator."
        },
        LicenseNoChrome: function(a) {
            a._errorCode = -2327;
            a._errorString = "The current product key does not support Chrome, please contact the site administrator."
        },
        LicenseNoFirefox: function(a) {
            a._errorCode = -2328;
            a._errorString = "The current product key does not support Firefox, please contact the site administrator."
        },
        LicenseNoIE: function(a) {
            a._errorCode = -2329;
            a._errorString = "The current product key does not support IE, please contact the site administrator."
        },
        LicenseNoEdge: function(a) {
            a._errorCode = -2330;
            a._errorString = "The current product key does not support Edge, please contact the site administrator."
        },
        LicenseTrialButServiceFull: function(a) {
            a._errorCode = -2331;
            a._errorString = "The current product key is a trial version key but your local dynamsoft service is in full version, please uninstall your local version first and access this page again to install the correct version. If the issue persists, please contact the site administrator."
        },
        LicenseFullButServiceTrial: function(a) {
            a._errorCode = -2332;
            a._errorString = "The current product key is a full version key but your local dynamsoft service is in trial version, please uninstall your local version first and access this page again to install the correct version. If the issue persists, please contact the site administrator."
        },
        LicenseNoCore: function(a) {
            a._errorCode = -2333;
            a._errorString = "The current product key is missing the core license, please contact the site administrator."
        },
        LicenseNo1D: function(a) {
            a._errorCode = -2334;
            a._errorString = "The current product key does not include a license for reading 1D barcode, please contact the site administrator."
        },
        LicenseNo2DQR: function(a) {
            a._errorCode = -2335;
            a._errorString = "The current product key does not include a license for reading QRcode barcode, please contact the site administrator."
        },
        LicenseNo2DPDF417: function(a) {
            a._errorCode = -2336;
            a._errorString = "The current product key does not include a license for reading PDF417 barcode, please contact the site administrator."
        },
        LicenseNo2DDataMatrix: function(a) {
            a._errorCode = -2337;
            a._errorString = "The current product key does not include a license for reading DataMatrix barcode, please contact the site administrator."
        },
        LicenseNoWebcam: function(a) {
            a._errorCode = -2338;
            a._errorString = "The current product key does not support Webcam, please contact the site administrator."
        },
        LicenseNoPDF: function(a) {
            a._errorCode = -2339;
            a._errorString = "The current product key does not support pdf rasterizer, please contact the site administrator."
        },
        LicenseNoOCR: function(a) {
            a._errorCode = -2340;
            a._errorString = "The current product key does not support OCR, please contact the site administrator."
        },
        LicenseNoOCRPro: function(a) {
            a._errorCode = -2341;
            a._errorString = "The current product key does not support OCR pro, please contact the site administrator."
        },
        LicenseBadDomain: function(a) {
            a._errorCode = -2342;
            a._errorString = "The domain of your current site does not match the domain bound in the current product key, please contact the site administrator."
        },
        LicenseNotSupportBorwser: function(a) {
            a._errorCode = -2343;
            a._errorString = "The current product key does not support your browser, please contact the site administrator."
        },
        LicenseNotSupportWindows: function(a) {
            a._errorCode = -2344;
            a._errorString = "The current product key does not support Windows OS, please contact the site administrator."
        },
        LicenseNotSupportMAC: function(a) {
            a._errorCode = -2345;
            a._errorString = "The current product key does not support MAC OS, please contact the site administrator."
        },
        LicenseNotSupportLinux: function(a) {
            a._errorCode = -2346;
            a._errorString = "The current product key does not support Linux OS, please contact the site administrator."
        },
        LicenseNotSupportOS: function(a) {
            a._errorCode = -2347;
            a._errorString = "The current product key does not support your OS, please contact the site administrator."
        },
        LicenseLower: function(a) {
            a._errorCode = -2348;
            a._errorString = "The current product key is invalid because it's generated with the licenses of a different major version."
        },
        BarcodeLicenseEmpty: function(a) {
            a._errorCode = -2349;
            a._errorString = a._errorString = "The current product key does not include a license for reading barcode, please contact the site administrator."
        },
        IndicesCannotEmpty: function(a) {
            a._errorCode = -2350;
            a._errorString = "The indices cannot be empty."
        },
        UploadIndexMoreThanOne: function(a) {
            a._errorCode = -2351;
            a._errorString = "You cannot upload more than one image when the format is BMP, JPG or PNG"
        },
        IndicesOutOfRange: function(a) {
            a._errorCode = -2352;
            a._errorString = "The indices are out of range."
        },
        HttpHeaderNotAllowed: function(a) {
            a._errorCode = -2353;
            a._errorString = "The header name being used is a protected keyword and is not allowed."
        },
        HttpHeaderIsEmpty: function(a) {
            a._errorCode = -2354;
            a._errorString = "The header name cannot be empty."
        },
        HttpHeaderIsNull: function(a) {
            a._errorCode = -2355;
            a._errorString = "The header name cannot be null."
        },
        HttpHeaderIsUndefined: function(a) {
            a._errorCode = -2356;
            a._errorString = "The header name cannot be undefined."
        },
        HttpHeaderIsInvalid: function(a) {
            a._errorCode = -2357;
            a._errorString = "The header name you entered is invalid."
        },
        IndicesNotArray: function(a) {
            a._errorCode = -2358;
            a._errorString = "The type of the parameter indices must be an Array."
        },
        IndexOutOfRange: function(a) {
            a._errorCode = -2359;
            a._errorString = "The index is out of range."
        },
        IndexNullOrUndefined: function(a) {
            a._errorCode = -2360;
            a._errorString = "The index is null or undefined."
        },
        ConvertBase64IndexMoreThanOne: function(a) {
            a._errorCode = -2361;
            a._errorString = "You cannot convert to base64 more than one image when the format is BMP, JPG or PNG."
        },
        InvalidImageType: function(a) {
            a._errorCode = -2362;
            a._errorString = "The image type is not supported."
        },
        InvalidDataFormat: function(a) {
            a._errorCode = -2363;
            a._errorString = "The data format is not supported."
        },
        InvalidUploadInSegements: function(a) {
            a._errorCode = -2364;
            a._errorString = "Please use a Boolean value for the parameter bUploadInSegements."
        },
        InvalidUrl: function(a) {
            a._errorCode = -2365;
            a._errorString = "The url is invalid."
        },
        ConvertBase64Failed: function(a) {
            a._errorCode = -2366;
            a._errorString = "Convert to base64 failed."
        },
        InvalidSegementUploadThreshold: function(a) {
            a._errorCode = -2367;
            a._errorString = "Invalid value for the parameter segementUploadThreshold."
        },
        InvalidModuleSize: function(a) {
            a._errorCode = -2368;
            a._errorString = "Invalid value for the parameter moduleSize."
        },
        MustUpgradeService: function(a) {
            a._errorCode = -2207;
            a._errorString = "The dynamsoft service installed on your computer is outdated and no longer works with the JavaScript code on the website."
        },
        WebTwainModuleDownloadFailure: function(a) {
            a._errorCode = -2369;
            a._errorString = "The module for Dynamic Web TWAIN has failed to download."
        },
        LicenseIsFuture: function(b, a) {
            b._errorCode = -2370;
            b._errorString = "The current product key is invalid, please contact the site administrator."
        },
        WebTwainModuleNotExist: function(a) {
            a._errorCode = EnumDWT_Error.ModuleNotExists;
            a._errorString = "Dynamic Web TWAIN scanner module is not installed and it is also missing on the server, please contact the site administrator."
        },
        __last: false
    }
})();
(function(c) {
    if (!c.product.bPluginEdition && !c.product.bActiveXEdition) {
        return
    }
    if (!Object.defineProperty) {
        Object.defineProperty = function(n, k, m) {
            var j = n[k],
                h = function() {
                    return m.get.apply(n, [j])
                },
                l = function(p) {
                    return j = m.set.apply(n, [p])
                };
            if (n.__defineGetter__) {
                n.__defineGetter__(k, h);
                n.__defineSetter__(k, l)
            } else {
                var i = function(q) {
                    if (event.propertyName == k) {
                        n.detachEvent("onpropertychange", i);
                        var p = l(n[k]);
                        n[k] = h;
                        n[k].toString = h;
                        n.attachEvent("onpropertychange", i)
                    }
                };
                n[k] = h;
                n[k].toString = h;
                n.attachEvent("onpropertychange", i)
            }
        }
    }
    var b = !0,
        d = !1,
        f = {
            isFunction: function(h) {
                return h && typeof(h) === "function"
            },
            checkErrorString: function(i) {
                var h = i.getSWebTwain().ErrorCode;
                if (h == 0) {
                    return b
                }
                return d
            },
            wrapperRet: function(k, i, h, l, j) {
                if (f.checkErrorString(k)) {
                    if (f.isFunction(h)) {
                        if (j) {
                            h(k.getSWebTwain().HTTPPostResponseString)
                        } else {
                            h()
                        }
                    }
                } else {
                    if (f.isFunction(l)) {
                        if (j) {
                            l(k.getSWebTwain().ErrorCode, k.getSWebTwain().ErrorString, k.getSWebTwain().HTTPPostResponseString)
                        } else {
                            l(k.getSWebTwain().ErrorCode, k.getSWebTwain().ErrorString)
                        }
                    }
                }
                return i
            },
            getImageType: function(i) {
                var h = i.length;
                if (h < 4) {
                    return -1
                }
                var j = i.lastIndexOf(".");
                if (j === -1) {
                    return -1
                }
                var k = i.slice(j).toLowerCase();
                if (k === ".bmp" || k === ".dib") {
                    return 0
                }
                if (k === ".jpg" || k === ".jpe" || k === ".jpeg" || k === ".jfif") {
                    return 1
                }
                if (k === ".tif" || k === ".tiff") {
                    return 2
                }
                if (k === ".png") {
                    return 3
                }
                if (k === ".pdf") {
                    return 4
                }
                if (k === ".gif") {
                    return 5
                }
                return -1
            },
            replaceLocalFilename: function(h) {
                var i = h;
                if (c.env.bFileSystem) {
                    i = decodeURI(i)
                }
                return i
            },
            makeParams: function() {
                var h = arguments;
                if (h === undefined || h.length === 0) {
                    return undefined
                } else {
                    return h
                }
            }
        };
    c.wrapperRet = f.wrapperRet;
    c.DynamicLoadAddonFuns = [];
    c.attachAddon = function(h) {
        c.each(c.DynamicLoadAddonFuns, function(i) {
            if (c.isFunction(i)) {
                i(h)
            }
        })
    };
    var e = 0,
        g = 1,
        a = 1;
    c.attachProperty = function(h) {
        var i = function(m, l, j) {
            var k;
            if (l !== e && l !== g) {
                k = l
            } else {
                k = {};
                if (l) {
                    k.set = j ? function(n) {
                        n = n * 1;
                        h.getSWebTwain()[m] = n;
                        return b
                    } : function(n) {
                        h.getSWebTwain()[m] = n;
                        return b
                    }
                }
            }
            if (!k.get) {
                k.get = function() {
                    return h.getSWebTwain()[m]
                }
            }
            Object.defineProperty(h, m, k)
        };
        i("ErrorCode", e);
        i("ErrorString", e);
        i("LogLevel", g, a);
        i("Manufacturer", g);
        i("ProductFamily", g);
        i("ProductKey", {
            set: function(j) {
                Dynamsoft.WebTwainEnv.ProductKey = j;
                h.getSWebTwain().ProductKey = j;
                return b
            }
        });
        i("ProductName", g);
        i("VersionInfo", g);
        i("BitDepth", g);
        i("Brightness", g);
        i("Contrast", g);
        i("CurrentSourceName", e);
        i("DataSourceStatus", e);
        i("DefaultSourceName", e);
        i("Duplex", e);
        i("IfAppendImage", g);
        i("IfAutoBright", g);
        i("IfAutoDiscardBlankpages", g);
        i("IfAutoFeed", g);
        i("IfAutomaticBorderDetection", g);
        i("IfAutomaticDeskew", g);
        i("IfAutoScan", g);
        i("IfDisableSourceAfterAcquire", g);
        i("IfDuplexEnabled", g);
        i("IfFeederEnabled", g);
        i("IfFeederLoaded", e);
        i("IfModalUI", g);
        i("IfPaperDetectable", e);
        i("IfScanInNewThread", g);
        i("IfShowCancelDialogWhenImageTransfer", g);
        i("IfShowUI", g);
        i("IfShowIndicator", g);
        i("IfUseTwainDSM", g);
        i("IfUIControllable", e);
        i("ImageBitsPerPixel", e);
        i("ImageCaptureDriverType", g);
        i("ImageLayoutDocumentNumber", e);
        i("ImageLayoutFrameBottom", e);
        i("ImageLayoutFrameLeft", e);
        i("ImageLayoutFrameNumber", e);
        i("ImageLayoutFrameRight", e);
        i("ImageLayoutFrameTop", e);
        i("ImageLayoutPageNumber", e);
        i("ImageLength", e);
        i("ImagePixelType", e);
        i("ImageWidth", e);
        i("ImageXResolution", e);
        i("ImageYResolution", e);
        i("MagData", e);
        i("MagType", e);
        i("PageSize", g, a);
        i("PendingXfers", e);
        i("PixelFlavor", g);
        i("PixelType", g);
        i("Resolution", g, a);
        i("SourceCount", e);
        i("TransferMode", g);
        i("Unit", g);
        i("XferCount", g, a);
        i("Capability", g);
        i("CapCurrentIndex", g);
        i("CapCurrentValue", g);
        i("CapDefaultIndex", e);
        i("CapDefaultValue", e);
        i("CapDescription", g);
        i("CapMaxValue", g);
        i("CapMinValue", g);
        i("CapNumItems", g);
        i("CapStepSize", g);
        i("CapType", g);
        i("CapValue", g);
        i("CapValueString", g);
        i("CapValueType", g);
        i("AllowMultiSelect", g);
        i("BackgroundColor", g);
        i("BackgroundFillColor", g);
        i("BlankImageCurrentStdDev", e);
        i("BlankImageMaxStdDev", g);
        i("BlankImageThreshold", g);
        i("CurrentImageIndexInBuffer", {
            set: function(j) {
                if (j != h.getSWebTwain().CurrentImageIndexInBuffer) {
                    h.getSWebTwain().CurrentImageIndexInBuffer = j
                }
                return b
            }
        });
        i("FitWindowType", g);
        i("HowManyImagesInBuffer", g);
        i("IfFitWindow", g);
        i("ImageMargin", g);
        i("MaxImagesInBuffer", g);
        i("MouseX", e);
        i("MouseY", e);
        i("SelectedImagesCount", g);
        i("SelectionImageBorderColor", g);
        i("Zoom", g);
        i("MouseShape", g);
        i("HTTPPostResponseString", e);
        i("AsyncMode", g);
        i("FTPPassword", g);
        i("FTPPort", {
            set: function(j) {
                if (j !== "") {
                    j = j * 1;
                    h.getSWebTwain().FTPPort = j;
                    return b
                }
                return d
            }
        });
        i("FTPUserName", g);
        i("HTTPPort", {
            set: function(j) {
                if (j !== "") {
                    j = j * 1;
                    h.getSWebTwain().HTTPPort = j
                } else {
                    j = c.detect.ssl ? 443 : 80;
                    h.getSWebTwain().HTTPPort = j
                }
                return b
            }
        });
        i("HTTPPassword", g);
        i("HTTPUserName", g);
        i("IfPASVMode", g);
        i("IfShowProgressBar", g);
        i("ProxyServer", g);
        i("IfShowFileDialog", g);
        i("IfTiffMultiPage", g);
        i("PDFAuthor", g);
        i("PDFCompressionType", g);
        i("PDFCreationDate", g);
        i("PDFCreator", g);
        i("PDFKeywords", g);
        i("PDFModifiedDate", g);
        i("PDFProducer", g);
        i("PDFSubject", g);
        i("PDFTitle", g);
        i("PDFVersion", g);
        i("TIFFCompressionType", g);
        i("JPEGQuality", {
            set: function(j) {
                j = j * 1;
                if (j >= 100) {
                    j = 100
                }
                h.getSWebTwain().JPEGQuality = j;
                return b
            }
        });
        i("HttpContentTypeFieldValue", g);
        i("SelectionRectAspectRatio", g);
        i("IfAllowLocalCache", g);
        i("_AutoCropMethod", g);
        i("BrokerProcessType", g);
        i("BorderStyle", g);
        i("IfShowPrintUI", g);
        i("VScrollBar", g);
        i("EnableInteractiveZoom", g);
        i("ImageEditorIfEnableEnumerator", g);
        i("ImageEditorIfReadonly", g);
        i("ImageEditorIfModal", g);
        i("ImageEditorWindowTitle", g);
        i("IfSSL", g);
        i("AllowPluginAuthentication", g);
        i("HttpFieldNameOfUploadedImage", g);
        i("MaxInternetTransferThreads", g);
        i("MaxUploadImageSize", g);
        i("IfOpenImageWithGDIPlus", g);
        i("BufferMemoryLimit", g);
        i("Width", {
            get: function() {
                return h.getSWebTwain().style.width
            },
            set: function(j) {
                var k = this;
                h._ChangeWidth(j);
                return b
            }
        });
        i("Height", {
            get: function() {
                return h.getSWebTwain().style.height
            },
            set: function(j) {
                var k = this;
                h._ChangeHeight(j);
                return b
            }
        });
        i("IfThrowException", g);
        i("IfAutoScroll", g);
        i("ShowPageNumber", {
            get: function() {
                return d
            },
            set: function(j) {
                return d
            }
        })
    };
    c.attachMethod = function(h) {
        var i = h;
        h.RegisterEvent = function(j, l) {
            var k = ["__", j].join("");
            i[k] = l;
            i.getSWebTwain().RegisterEvent(j, l);
            return b
        };
        h.onEvent = function(j, k) {
            i.RegisterEvent(j, k);
            return b
        };
        h.on = function(j, k) {
            i.RegisterEvent(j, k);
            return b
        };
        h.CancelAllPendingTransfers = function() {
            return i.getSWebTwain().CancelAllPendingTransfers()
        };
        h.CloseSource = function() {
            return i.getSWebTwain().CloseSource()
        };
        h.CloseSourceManager = function() {
            return i.getSWebTwain().CloseSourceManager()
        };
        h.DisableSource = function() {
            return i.getSWebTwain().DisableSource()
        };
        h.FeedPage = function() {
            return i.getSWebTwain().FeedPage()
        };
        h.GetDeviceType = function() {
            return i.getSWebTwain().GetDeviceType()
        };
        h.GetSourceNameItems = function(j) {
            return i.getSWebTwain().GetSourceNameItems(j)
        };
        h.SourceNameItems = function(j) {
            return i.getSWebTwain().GetSourceNameItems(j)
        };
        h.GetSourceNames = function() {
            return []
        };
        h.GetSourceType = function(j) {
            return i.getSWebTwain().GetSourceType(j)
        };
        h.OpenSource = function() {
            return i.getSWebTwain().OpenSource()
        };
        h.OpenSourceManager = function() {
            return i.getSWebTwain().OpenSourceManager()
        };
        h.ResetImageLayout = function() {
            return i.getSWebTwain().ResetImageLayout()
        };
        h.RewindPage = function() {
            return i.getSWebTwain().RewindPage()
        };
        h.SelectSource = function() {
            return i.getSWebTwain().SelectSource()
        };
        h.SelectSourceByIndex = function(j) {
            return i.getSWebTwain().SelectSourceByIndex(j)
        };
        h.SetFileXferInfo = function(j, l) {
            var k = f.replaceLocalFilename(j);
            return i.getSWebTwain().SetFileXferInfo(k, l)
        };
        h.SetImageLayout = function(m, l, k, j) {
            return i.getSWebTwain().SetImageLayout(m, l, k, j)
        };
        h.CapGet = function() {
            return i.getSWebTwain().CapGet()
        };
        h.CapGetCurrent = function() {
            return i.getSWebTwain().CapGetCurrent()
        };
        h.CapGetDefault = function() {
            return i.getSWebTwain().CapGetDefault()
        };
        h.CapGetFrameBottom = function(j) {
            return i.getSWebTwain().CapGetFrameBottom(j)
        };
        h.CapGetFrameLeft = function(j) {
            return i.getSWebTwain().CapGetFrameLeft(j)
        };
        h.CapGetFrameRight = function(j) {
            return i.getSWebTwain().CapGetFrameRight(j)
        };
        h.CapGetFrameTop = function(j) {
            return i.getSWebTwain().CapGetFrameTop(j)
        };
        h.CapGetHelp = function() {
            return i.getSWebTwain().CapGetHelp()
        };
        h.CapGetLabel = function() {
            return i.getSWebTwain().CapGetLabel()
        };
        h.CapGetLabels = function() {
            return i.getSWebTwain().CapGetLabels()
        };
        h.CapIfSupported = function(j) {
            return i.getSWebTwain().CapIfSupported(j)
        };
        h.CapReset = function() {
            return i.getSWebTwain().CapReset()
        };
        h.CapSet = function() {
            return i.getSWebTwain().CapSet()
        };
        h.CapSetFrame = function(k, n, m, l, j) {
            return i.getSWebTwain().CapSetFrame(k, n, m, l, j)
        };
        h.GetCapItems = function(j) {
            return i.getSWebTwain().GetCapItems(j)
        };
        h.GetCapItemsString = function(j) {
            return i.getSWebTwain().GetCapItemsString(j)
        };
        h.SetCapItems = function(k, j) {
            i.getSWebTwain().SetCapItems(k, j);
            return f.checkErrorString(i)
        };
        h.SetCapItemsString = function(k, j) {
            i.getSWebTwain().SetCapItemsString(k, j);
            return f.checkErrorString(i)
        };
        h.AddText = function(p, j, r, q, n, l, m, k) {
            return i.getSWebTwain().AddText(p, j, r, q, n, l, m, k)
        };
        h.CreateTextFont = function(l, x, r, q, t, u, m, v, j, s, n, p, w, k) {
            return i.getSWebTwain().CreateTextFont(l, x, r, q, t, u, m, v, j, s, n, p, w, k)
        };
        h.CopyToClipboard = function(j) {
            return i.getSWebTwain().CopyToClipboard(j)
        };
        h.Erase = function(l, n, m, k, j) {
            return i.getSWebTwain().Erase(l, n, m, k, j)
        };
        h.GetImageBitDepth = function(j) {
            return i.getSWebTwain().GetImageBitDepth(j)
        };
        h.GetImageWidth = function(j) {
            return i.getSWebTwain().GetImageWidth(j)
        };
        h.GetImageHeight = function(j) {
            return i.getSWebTwain().GetImageHeight(j)
        };
        h.GetImageSize = function(k, j, l) {
            return i.getSWebTwain().GetImageSize(k, j, l)
        };
        h.GetImageSizeWithSpecifiedType = function(j, k) {
            return i.getSWebTwain().GetImageSizeWithSpecifiedType(j, k)
        };
        h.GetImageXResolution = function(j) {
            return i.getSWebTwain().GetImageXResolution(j)
        };
        h.GetImageYResolution = function(j) {
            return i.getSWebTwain().GetImageYResolution(j)
        };
        h.GetSelectedImageIndex = function(j) {
            return i.getSWebTwain().GetSelectedImageIndex(j)
        };
        h.SetSelectedImageIndex = function(k, j) {
            i.getSWebTwain().SetSelectedImageIndex(k, j);
            return f.checkErrorString(i)
        };
        h.GetSelectedImagesSize = function(j) {
            return i.getSWebTwain().GetSelectedImagesSize(j)
        };
        h.GetSkewAngle = function(j) {
            return i.getSWebTwain().GetSkewAngle(j)
        };
        h.GetSkewAngleEx = function(l, n, m, k, j) {
            return i.getSWebTwain().GetSkewAngleEx(l, n, m, k, j)
        };
        h.IsBlankImage = function(j) {
            return i.getSWebTwain().IsBlankImage(j)
        };
        h.IsBlankImageEx = function(l, n, m, k, j, p) {
            return i.getSWebTwain().IsBlankImageEx(l, n, m, k, j, p)
        };
        h.Mirror = function(j) {
            return i.getSWebTwain().Mirror(j)
        };
        h.OverlayRectangle = function(n, q, p, l, k, j, m) {
            i.getSWebTwain().OverlayRectangle(n, q, p, l, k, j, m);
            return f.checkErrorString(i)
        };
        h.RemoveAllImages = function() {
            var j;
            i.getSWebTwain().RemoveAllImages();
            j = f.checkErrorString(i);
            if (j) {
                i.__innerRefreshImage()
            }
            return j
        };
        h.RemoveAllSelectedImages = function() {
            var j;
            i.getSWebTwain().RemoveAllSelectedImages();
            j = f.checkErrorString(i);
            if (j) {
                i.__innerRefreshImage()
            }
            return j
        };
        h.RemoveImage = function(j) {
            return i.getSWebTwain().RemoveImage(j)
        };
        h.Rotate = function(m, k, l) {
            var j = parseInt(m),
                n, p;
            n = i.getSWebTwain().Rotate(j, k, l);
            p = (n == 1);
            return p
        };
        h.RotateEx = function(n, l, m, j) {
            var k = parseInt(n),
                p, q;
            p = i.getSWebTwain().RotateEx(k, l, m, j);
            q = (p == 1);
            return q
        };
        h.RotateLeft = function(k) {
            var j = parseInt(k),
                l, m;
            l = i.getSWebTwain().RotateLeft(j);
            m = (l == 1);
            return m
        };
        h.RotateRight = function(k) {
            var j = parseInt(k),
                l, m;
            l = i.getSWebTwain().RotateRight(j);
            m = (l == 1);
            return m
        };
        h.ChangeImageSize = function(m, q, j, k) {
            var l = parseInt(m),
                n, p;
            n = i.getSWebTwain().ChangeImageSize(l, q, j, k), p = (n == 1);
            return p
        };
        h.Flip = function(k) {
            var j = parseInt(k),
                l, m;
            l = i.getSWebTwain().Flip(j);
            m = (l == 1);
            return m
        };
        h.Crop = function(m, q, p, l, j) {
            var k = parseInt(m),
                n, s;
            n = i.getSWebTwain().Crop(k, q, p, l, j);
            s = (n == 1);
            return s
        };
        h.CropToClipboard = function(m, q, p, l, j) {
            var k = parseInt(m),
                n, s;
            n = i.getSWebTwain().CropToClipboard(k, q, p, l, j);
            s = (n == 1);
            return s
        };
        h.CutFrameToClipboard = function(m, q, p, l, j) {
            var k = parseInt(m),
                n, s;
            n = i.getSWebTwain().CutFrameToClipboard(k, q, p, l, j);
            s = (n == 1);
            return s
        };
        h.CutToClipboard = function(k) {
            var j = parseInt(k),
                l, m;
            l = i.getSWebTwain().CutToClipboard(j);
            m = (l == 1);
            return m
        };
        h.SetDPI = function(p, k, n, j, l) {
            var m = parseInt(p);
            return i.getSWebTwain().SetDPI(m, k, n, j, l)
        };
        h.SetViewMode = function(k, j) {
            return i.getSWebTwain().SetViewMode(k, j)
        };
        h.GetViewModeH = function() {
            return i.getSWebTwain().GetViewModeH()
        };
        h.GetViewModeV = function() {
            return i.getSWebTwain().GetViewModeV()
        };
        h.MoveImage = function(m, l) {
            var k = parseInt(m),
                j = parseInt(l);
            return i.getSWebTwain().MoveImage(k, j)
        };
        h.SwitchImage = function(m, l) {
            var k = parseInt(m),
                j = parseInt(l);
            return i.getSWebTwain().SwitchImage(k, j)
        };
        h.Print = function() {
            return i.getSWebTwain().Print()
        };
        h.checkErrorString = function() {
            var k = i.ErrorCode;
            if (k === -2115) {
                return b
            }
            if (k === -2003) {
                var j = window.open("", "ErrorMessage", "height=500,width=750,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
                j.document.writeln(i.HTTPPostResponseString)
            }
            return (k === 0)
        };
        h.FileExists = function(j) {
            var k = f.replaceLocalFilename(j);
            return i.getSWebTwain().FileExists(k)
        };
        h.SaveAllAsMultiPageTIFF = function(j, n, l) {
            var m = f.replaceLocalFilename(j),
                k;
            k = i.getSWebTwain().SaveAllAsMultiPageTIFF(m);
            return f.wrapperRet(i, k, n, l)
        };
        h.SaveAllAsPDF = function(j, m, k) {
            var l = f.replaceLocalFilename(j);
            _ret = i.getSWebTwain().SaveAllAsPDF(l);
            return f.wrapperRet(i, _ret, m, k)
        };
        h.SaveAsBMP = function(j, l, n, k) {
            var m = f.replaceLocalFilename(j);
            _ret = i.getSWebTwain().SaveAsBMP(m, l);
            return f.wrapperRet(i, _ret, n, k)
        };
        h.SaveAsJPEG = function(j, l, n, k) {
            var m = f.replaceLocalFilename(j);
            _ret = i.getSWebTwain().SaveAsJPEG(m, l);
            return f.wrapperRet(i, _ret, n, k)
        };
        h.SaveAsPDF = function(j, l, n, k) {
            var m = f.replaceLocalFilename(j);
            _ret = i.getSWebTwain().SaveAsPDF(m, l);
            return f.wrapperRet(i, _ret, n, k)
        };
        h.SaveAsPNG = function(j, l, n, k) {
            var m = f.replaceLocalFilename(j);
            _ret = i.getSWebTwain().SaveAsPNG(m, l);
            return f.wrapperRet(i, _ret, n, k)
        };
        h.SaveAsTIFF = function(j, l, n, k) {
            var m = f.replaceLocalFilename(j);
            _ret = i.getSWebTwain().SaveAsTIFF(m, l);
            return f.wrapperRet(i, _ret, n, k)
        };
        h.SaveSelectedImagesAsMultiPagePDF = function(j, n, l) {
            var m = f.replaceLocalFilename(j),
                k;
            k = i.getSWebTwain().SaveSelectedImagesAsMultiPagePDF(m);
            return f.wrapperRet(i, k, n, l)
        };
        h.SaveSelectedImagesAsMultiPageTIFF = function(j, n, l) {
            var m = f.replaceLocalFilename(j),
                k;
            k = i.getSWebTwain().SaveSelectedImagesAsMultiPageTIFF(m);
            return f.wrapperRet(i, k, n, l)
        };
        h.SaveSelectedImagesToBase64Binary = function() {
            return i.getSWebTwain().SaveSelectedImagesToBase64Binary()
        };
        h.ShowFileDialog = function(k, j, r, m, p, q, l, n) {
            return i.getSWebTwain().ShowFileDialog(k, j, r, m, p, q, l, n)
        };
        h.FTPDownload = function(n, m, l, k) {
            var j = i.getSWebTwain().FTPDownload(n, m);
            return f.wrapperRet(i, j, l, k)
        };
        h.FTPDownloadDirectly = function(p, n, j, m, l) {
            var k = i.getSWebTwain().FTPDownloadDirectly(p, n, j);
            return f.wrapperRet(i, k, m, l)
        };
        h.FTPDownloadEx = function(p, n, l, m, k) {
            var j = i.getSWebTwain().FTPDownloadEx(p, n, l);
            return f.wrapperRet(i, j, m, k)
        };
        h.FTPUpload = function(p, l, n, m, k) {
            var j = i.getSWebTwain().FTPUpload(p, l, n);
            return f.wrapperRet(i, j, m, k)
        };
        h.FTPUploadDirectly = function(p, j, n, m, l) {
            var k = i.getSWebTwain().FTPUploadDirectly(p, j, n);
            return f.wrapperRet(i, k, m, l)
        };
        h.FTPUploadEx = function(q, l, p, m, n, k) {
            var j = i.getSWebTwain().FTPUploadEx(q, l, p, m);
            return f.wrapperRet(i, j, n, k)
        };
        h.FTPUploadAllAsMultiPageTIFF = function(n, m, l, k) {
            var j = i.getSWebTwain().FTPUploadAllAsMultiPageTIFF(n, m);
            return f.wrapperRet(i, j, l, k)
        };
        h.FTPUploadAllAsPDF = function(n, m, l, k) {
            var j = i.getSWebTwain().FTPUploadAllAsPDF(n, m);
            return f.wrapperRet(i, j, l, k)
        };
        h.FTPUploadAsMultiPagePDF = function(n, m, l, k) {
            var j = i.getSWebTwain().FTPUploadAsMultiPagePDF(n, m);
            return f.wrapperRet(i, j, l, k)
        };
        h.FTPUploadAsMultiPageTIFF = function(n, m, l, k) {
            var j = i.getSWebTwain().FTPUploadAsMultiPageTIFF(n, m);
            return f.wrapperRet(i, j, l, k)
        };
        h.HTTPDownload = function(m, l, p, k) {
            var j, n = f.getImageType(l);
            return i.HTTPDownloadEx(m, l, n, p, k)
        };
        h.HTTPDownloadDirectly = function(n, m, j, p, l) {
            var k;
            k = i.getSWebTwain().HTTPDownloadDirectly(n, m, j);
            return f.wrapperRet(i, k, p, l)
        };
        h.HTTPDownloadEx = function(m, l, n, p, k) {
            var j;
            j = i.getSWebTwain().HTTPDownloadEx(m, l, n);
            return f.wrapperRet(i, j, p, k)
        };
        h.HTTPUploadThroughPostDirectly = function(n, k, j, q, p, m) {
            var l;
            l = i.getSWebTwain().HTTPUploadThroughPostDirectly(n, k, j, q);
            return f.wrapperRet(i, l, p, m, true)
        };
        h.HTTPUploadThroughPost = function(n, m, j, q, p, l) {
            var k;
            k = i.getSWebTwain().HTTPUploadThroughPost(n, m, j, q);
            return f.wrapperRet(i, k, p, l, true)
        };
        h.HTTPUploadThroughPostEx = function(n, m, j, r, p, q, l) {
            var k;
            k = i.getSWebTwain().HTTPUploadThroughPostEx(n, m, j, r, p);
            return f.wrapperRet(i, k, q, l, true)
        };
        h.ClearAllHTTPFormField = function() {
            i.getSWebTwain().ClearAllHTTPFormField();
            return f.checkErrorString(i)
        };
        h.SetHTTPFormField = function(k, j) {
            i.getSWebTwain().SetHTTPFormField(k, j);
            return f.checkErrorString(i)
        };
        h.HTTPUploadAllThroughPostAsMultiPageTIFF = function(m, j, p, n, l) {
            var k;
            k = i.getSWebTwain().HTTPUploadAllThroughPostAsMultiPageTIFF(m, j, p);
            return f.wrapperRet(i, k, n, l, true)
        };
        h.HTTPUploadThroughPostAsMultiPageTIFF = function(m, j, p, n, l) {
            var k;
            k = i.getSWebTwain().HTTPUploadThroughPostAsMultiPageTIFF(m, j, p);
            return f.wrapperRet(i, k, n, l, true)
        };
        h.HTTPUploadAllThroughPostAsPDF = function(m, j, p, n, l) {
            var k;
            k = i.getSWebTwain().HTTPUploadAllThroughPostAsPDF(m, j, p);
            return f.wrapperRet(i, k, n, l, true)
        };
        h.HTTPUploadThroughPostAsMultiPagePDF = function(m, j, p, n, l) {
            var k;
            k = i.getSWebTwain().HTTPUploadThroughPostAsMultiPagePDF(m, j, p);
            return f.wrapperRet(i, k, n, l, true)
        };
        h.HTTPUploadThroughPutDirectly = function(n, k, j, p, m) {
            var l;
            l = i.getSWebTwain().HTTPUploadThroughPutDirectly(n, k, j);
            return f.wrapperRet(i, l, p, m)
        };
        h.HTTPUploadThroughPut = function(m, l, j, p, k) {
            var n = f.getImageType(j);
            return i.HTTPUploadThroughPutEx(m, l, j, n, p, k)
        };
        h.HTTPUploadThroughPutEx = function(n, m, j, p, q, l) {
            var k;
            k = i.getSWebTwain().HTTPUploadThroughPutEx(n, m, j, p);
            return f.wrapperRet(i, k, q, l)
        };
        h.HTTPUploadAllThroughPutAsMultiPageTIFF = function(m, j, p, l) {
            var k = -1,
                n = 2;
            return i.HTTPUploadThroughPutEx(m, k, j, n, p, l)
        };
        h.HTTPUploadThroughPutAsMultiPageTIFF = function(m, j, p, l) {
            var k = -2,
                n = 2;
            return i.HTTPUploadThroughPutEx(m, k, j, n, p, l)
        };
        h.HTTPUploadAllThroughPutAsPDF = function(m, j, p, l) {
            var k = -1,
                n = 4;
            return i.HTTPUploadThroughPutEx(m, k, j, n, p, l)
        };
        h.HTTPUploadThroughPutAsMultiPagePDF = function(m, j, p, l) {
            var k = -2,
                n = 4;
            return i.HTTPUploadThroughPutEx(m, k, j, n, p, l)
        };
        h.ShowImageEditor = function() {
            return i.getSWebTwain().ShowImageEditor()
        };
        h.SetCookie = function(j) {
            i.getSWebTwain().SetCookie(j);
            return b
        };
        h.LoadImageFromBase64Binary = function(j, k) {
            return i.getSWebTwain().LoadImageFromBase64Binary(j, k)
        };
        h.SaveSelectedImagesToBytes = function(k, j) {
            return i.getSWebTwain().SaveSelectedImagesToBytes(k, j)
        };
        h.LoadImageFromBytes = function(l, j, k) {
            return i.getSWebTwain().LoadImageFromBytes(l, j, k)
        };
        h.UnregisterEvent = function(j, k) {
            return i.getSWebTwain().UnregisterEvent(j, k)
        };
        h.SetImageWidth = function(j, k) {
            return i.getSWebTwain().SetImageWidth(j, k)
        };
        h.HTTPDownloadThroughPost = function(m, l, n, p, k) {
            var j;
            j = i.getSWebTwain().HTTPDownloadThroughPost(m, l, n);
            return f.wrapperRet(i, j, p, k)
        };
        h.SetCustomDSDataEx = function(j) {
            return i.getSWebTwain().SetCustomDSDataEx(j)
        };
        h.SetCustomDSData = function(j) {
            return i.getSWebTwain().SetCustomDSData(j)
        };
        h.GetCustomDSDataEx = function() {
            return i.getSWebTwain().GetCustomDSDataEx()
        };
        h.GetCustomDSData = function(j) {
            return i.getSWebTwain().GetCustomDSData(j)
        };
        h.ChangeBitDepth = function(k, j, l) {
            return i.getSWebTwain().ChangeBitDepth(k, j, l)
        };
        h.ConvertToGrayScale = function(j) {
            return i.getSWebTwain().ConvertToGrayScale(j)
        };
        h.ShowImageEditorEx = function(k, n, j, m, l) {
            return i.getSWebTwain().ShowImageEditorEx(k, n, j, m, l)
        };
        h.ClearTiffCustomTag = function() {
            i.getSWebTwain().ClearTiffCustomTag();
            return f.checkErrorString(i)
        };
        h.SetTiffCustomTag = function(k, j, l) {
            i.getSWebTwain().SetTiffCustomTag(k, j, l);
            return f.checkErrorString(i)
        };
        h.IsBlankImageExpress = function(j) {
            return i.getSWebTwain().IsBlankImageExpress(j)
        };
        h._ChangeWidth = function(k) {
            var j = document.getElementById(h._strDWTInnerContainerID),
                m;
            if (c.isString(k)) {
                if (k.length > 0) {
                    if (k.charAt(k.length - 1) === "%") {
                        m = k
                    }
                }
            }
            if (!m) {
                var l = parseInt(k);
                if (l && l > 2) {
                    m = (l - 2) + "px"
                }
            }
            if (m) {
                i._strWidth = m;
                i.getSWebTwain().style.width = m;
                if (j) {
                    j.style.width = m
                }
            }
            return b
        };
        h._ChangeHeight = function(k) {
            var j = document.getElementById(h._strDWTInnerContainerID),
                m;
            if (c.isString(k)) {
                if (k.length > 0) {
                    if (k.charAt(k.length - 1) === "%") {
                        m = k
                    }
                }
            }
            if (!m) {
                var l = parseInt(k);
                if (l) {
                    m = l + "px"
                }
            }
            if (m) {
                i._strHeight = m;
                i.getSWebTwain().style.height = m;
                if (j) {
                    j.style.height = m
                }
            }
            return b
        };
        h.SetSize = function(j, k) {
            var l = this;
            l._ChangeWidth(j);
            l._ChangeHeight(k);
            return b
        };
        h.SetSelectedImageArea = function(l, n, m, k, j) {
            return i.getSWebTwain().SetSelectedImageArea(l, n, m, k, j)
        };
        h.SetVideoRotateMode = function(j) {
            return i.getSWebTwain().SetVideoRotateMode(j)
        };
        h.SetOpenSourceTimeout = function(j) {
            return i.getSWebTwain().SetOpenSourceTimeout(j)
        };
        h.GetLicenseInfo = function() {
            return {}
        };
        h.SetHTTPHeader = function(j, k) {
            return false
        };
        h.GetImageURL = function(j, k, l) {
            return ""
        };
        h.LoadDibFromClipboard = function(l, k) {
            var j;
            j = i.getSWebTwain().LoadDibFromClipboard();
            return f.wrapperRet(i, j, l, k)
        };
        h.LoadImage = function(j, n, l) {
            var m = f.replaceLocalFilename(j),
                k;
            k = i.getSWebTwain().LoadImage(m);
            return f.wrapperRet(i, k, n, l)
        };
        h.LoadImageEx = function(k, n, q, m) {
            var p = f.replaceLocalFilename(k),
                j = n,
                l;
            if (j == EnumDWT_ImageType.IT_ALL) {
                j = -1
            }
            l = i.getSWebTwain().LoadImageEx(p, j);
            return f.wrapperRet(i, l, q, m)
        };
        h.EnableSource = function(l, m, k) {
            var j;
            j = i.AcquireImage(l, m, k);
            return j
        };
        h.AcquireImage = function(s, r, p) {
            var j = i.getSWebTwain(),
                q, m = null,
                n = null,
                l = null;
            if (c.isUndefined(p) && (c.isFunction(s) && c.isFunction(r) || c.isFunction(s) && c.isUndefined(r) || c.isFunction(s) && r == null || s == null && c.isFunction(r))) {
                m = null;
                if (c.isFunction(s)) {
                    n = s
                }
                if (c.isFunction(r)) {
                    l = r
                }
            } else {
                if (!c.isUndefined(s)) {
                    m = s
                }
                if (c.isFunction(r)) {
                    n = r
                }
                if (c.isFunction(p)) {
                    l = p
                }
            }
            if (m !== undefined && m !== null) {
                var k;
                k = m.SelectSourceByIndex;
                if (k != null && typeof(k) != "undefined") {
                    j.SelectSourceByIndex(k);
                    j.CloseSource();
                    j.OpenSource()
                }
                k = m.IfShowUI;
                if (k != null && typeof(k) != "undefined") {
                    j.IfShowUI = k
                }
                k = m.PixelType;
                if (k != null && typeof(k) != "undefined") {
                    j.PixelType = k
                }
                k = m.Resolution;
                if (k != null && typeof(k) != "undefined") {
                    j.Resolution = k
                }
                k = m.IfFeederEnabled;
                if (k != null && typeof(k) != "undefined") {
                    j.IfFeederEnabled = k
                }
                k = m.IfDuplexEnabled;
                if (k != null && typeof(k) != "undefined") {
                    j.IfDuplexEnabled = k
                }
                k = m.IfDisableSourceAfterAcquire;
                if (k != null && typeof(k) != "undefined") {
                    j.IfDisableSourceAfterAcquire = k
                }
            }
            q = j.AcquireImage();
            return q
        };
        h._innerFun = function(j, k, l) {
            var q = i.getSWebTwain(),
                n = q[j];
            if (typeof(n) === "function") {
                return n.apply(q, k)
            } else {
                return n
            }
        };
        h.ActiveUI = function(k, j) {};
        h.first = function() {
            var j = i.HowManyImagesInBuffer,
                k;
            if (j > 0) {
                i.CurrentImageIndexInBuffer = 0;
                i.__innerRefreshImage()
            }
            return b
        };
        h.previous = function() {
            var j = i.HowManyImagesInBuffer,
                k;
            if (j > 0) {
                k = i.CurrentImageIndexInBuffer;
                if (k > 0) {
                    i.CurrentImageIndexInBuffer = k - 1;
                    i.__innerRefreshImage()
                }
            }
            return b
        };
        h.next = function() {
            var j = i.HowManyImagesInBuffer,
                k;
            if (j > 0) {
                k = i.CurrentImageIndexInBuffer;
                if (k >= 0 && k < j - 1) {
                    i.CurrentImageIndexInBuffer = k + 1;
                    i.__innerRefreshImage()
                }
            }
            return b
        };
        h.last = function() {
            var j = i.HowManyImagesInBuffer,
                k;
            if (j > 0) {
                i.CurrentImageIndexInBuffer = j - 1;
                i.__innerRefreshImage()
            }
            return b
        };
        h.__innerRefreshImage = function() {
            var j = i.HowManyImagesInBuffer,
                k;
            if (j > 0) {
                k = i.CurrentImageIndexInBuffer;
                if (i.__OnRefreshUI) {
                    i.__OnRefreshUI(k, j)
                }
            }
        };
        h._attachEvents = function() {
            var j = i.getSWebTwain(),
                k;
            k = Dynamsoft.Lib.detect.getVersionArray(new String(i.VersionInfo));
            if (k.length <= 2 || k[0] < 9 || k[0] == 9 && k[1] <= 2) {
                return
            }
            if (i.__OnPostTransfer != "") {
                j.RegisterEvent("OnPostTransfer", i.__OnPostTransfer)
            }
            if (i.__OnPostAllTransfers != "") {
                j.RegisterEvent("OnPostAllTransfers", i.__OnPostAllTransfers)
            }
            if (i.__OnMouseClick != "") {
                j.RegisterEvent("OnMouseClick", i.__OnMouseClick)
            }
            if (i.__OnPostLoad != "") {
                j.RegisterEvent("OnPostLoad", i.__OnPostLoad)
            }
            if (i.__OnImageAreaSelected != "") {
                j.RegisterEvent("OnImageAreaSelected", i.__OnImageAreaSelected)
            }
            if (i.__OnMouseDoubleClick != "") {
                j.RegisterEvent("OnMouseDoubleClick", i.__OnMouseDoubleClick)
            }
            if (i.__OnMouseRightClick != "") {
                j.RegisterEvent("OnMouseRightClick", i.__OnMouseRightClick)
            }
            if (i.__OnTopImageInTheViewChanged != "") {
                j.RegisterEvent("OnTopImageInTheViewChanged", i.__OnTopImageInTheViewChanged)
            }
            if (i.__OnImageAreaDeSelected != "") {
                j.RegisterEvent("OnImageAreaDeSelected", i.__OnImageAreaDeSelected)
            }
            if (i.__OnGetFilePath != "") {
                j.RegisterEvent("OnGetFilePath", i.__OnGetFilePath)
            }
            if (i.__OnAfterOperate != "") {
                j.RegisterEvent("OnAfterOperate", i.__OnAfterOperate)
            }
            if (i.__OnBeforeOperate != "") {
                j.RegisterEvent("OnBeforeOperate", i.__OnBeforeOperate)
            }
            if (i.__OnOperateStatus != "") {
                j.RegisterEvent("OnOperateStatus", i.__OnOperateStatus)
            }
            if (i.__OnBitmapChanged != "") {
                j.RegisterEvent("OnBitmapChanged", i.__OnBitmapChanged)
            }
            if (i.__OnMouseMove != "") {
                j.RegisterEvent("OnMouseMove", i.__OnMouseMove)
            }
            if (i.__OnPreAllTransfers != "") {
                j.RegisterEvent("OnPreAllTransfers", i.__OnPreAllTransfers)
            }
            if (i.__OnPreTransfer != "") {
                j.RegisterEvent("OnPreTransfer", i.__OnPreTransfer)
            }
            if (i.__OnSourceUIClose != "") {
                j.RegisterEvent("OnSourceUIClose", i.__OnSourceUIClose)
            }
            if (i.__OnTransferCancelled != "") {
                j.RegisterEvent("OnTransferCancelled", i.__OnTransferCancelled)
            }
            if (i.__OnTransferError != "") {
                j.RegisterEvent("OnTransferError", i.__OnTransferError)
            }
            if (i.__OnInternetTransferPercentage != "") {
                j.RegisterEvent("OnInternetTransferPercentage", i.__OnInternetTransferPercentage)
            }
            if (i.__OnInternetTransferPercentageEx != "") {
                j.RegisterEvent("OnInternetTransferPercentageEx", i.__OnInternetTransferPercentageEx)
            }
        }
    }
})(Dynamsoft.Lib);
(function(b) {
    if (!b.product.bActiveXEdition) {
        return
    }
    var c = {
        noControl: function(d) {
            if (b.isFunction(b.detect.onNoControl)) {
                b.detect.onNoControl(d._strDWTControlContainerID, d._strWidth, d._strHeight)
            } else {
                var e = b.detect.arySTwains;
                for (var f = 0; f < e.length; f++) {
                    var g = e[f];
                    if (!g._vPluginExist) {
                        g._createNonInstallDivPlugin();
                        b.show(g._strDWTNonInstallInnerContainerID);
                        b.hide(g._strDWTInnerContainerID)
                    }
                }
            }
        }
    };

    function a(d) {
        var e = this,
            f = d || {};
        e._strDWTControlContainerID = f.containerID || "dwtcontrolContainer";
        e._strWidth = f.width || 270;
        e._strHeight = f.height || 350;
        if (b.isString(e._strWidth) && e._strWidth.indexOf("%") > 0) {} else {
            e._strWidth = [parseInt(e._strWidth), "px"].join("")
        }
        if (b.isString(e._strHeight) && e._strHeight.indexOf("%") > 0) {} else {
            e._strHeight = [parseInt(e._strHeight), "px"].join("")
        }
        e._strObjectName = e._strDWTControlContainerID + "_Obj";
        e.__config = f;
        e.__OnPluginReady = f.onPluginReady;
        e.__OnPluginNotReady = f.onPluginNotReady;
        e.Addon = {};
        e._strDWTInnerContainerID = e._strDWTControlContainerID + "_CID";
        e._strDWTNonInstallInnerContainerID = e._strDWTControlContainerID + "_NonInstallCID";
        var g = document.createElement("div");
        document.body.appendChild(g);
        e._fakeControl = g;
        e._createControl()
    }
    a.prototype._createControl = function() {
        var e;
        var h = this,
            g = h._strWidth,
            d = h._strHeight,
            f;
        if (b.isString(g)) {
            if (g.indexOf("%") > 0) {
                g = "100%"
            } else {
                g = parseInt(g) + 2 + "px"
            }
        }
        if (b.isString(d)) {
            if (d.indexOf("%") > 0) {
                d = "100%"
            } else {
                d = parseInt(d) + 2 + "px"
            }
        }
        if (!Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB) {
            f = ['<div id="', h._strDWTInnerContainerID, '" style="width:', g, ";height:", d, '">', '<object id="', h._strObjectName, '" style="width:', h._strWidth, ";height:", h._strHeight, ';border:1px solid #AAAAAA"', ' classid="clsid:', Dynamsoft.WebTwainEnv.Trial ? b.product.strTrialClassID : b.product.strFullClassID, '" viewastext>', '<param name="wmode" value="transparent"/>', "</object>", "</div>"]
        } else {
            f = ['<div id="', h._strDWTInnerContainerID, '" style="width:', g, ";height:", d, '">', '<object id="', h._strObjectName, '" style="width:', h._strWidth, ";height:", h._strHeight, ';border:1px solid #AAAAAA"', ' codebase="', (b.env.bWin64) ? b.product.getActiveXCABx64Path() : b.product.getActiveXCABx86Path(), "#version=", Dynamsoft.WebTwainEnv.ActiveXVersion, '"', ' classid="clsid:', Dynamsoft.WebTwainEnv.Trial ? b.product.strTrialClassID : b.product.strFullClassID, '" viewastext>', '<param name="wmode" value="transparent"/>', "</object>", "</div>"]
        }
        f.push('<div id="', h._strDWTNonInstallInnerContainerID, '" style="width: ', g, ';display:none"></div>');
        e = document.getElementById(h._strDWTControlContainerID);
        if (e) {
            e.innerHTML = f.join("")
        }
        h._fakeControl._objWebTwain = null;
        h._fakeControl.getSWebTwain = function() {
            var i = this;
            if (i._objWebTwain === null) {
                i._objWebTwain = document.getElementById(h._strObjectName)
            }
            return i._objWebTwain
        }
    };
    a.prototype.getInstance = function() {
        var e = this,
            d = e._fakeControl.getSWebTwain();
        if (d) {
            return e._fakeControl
        }
        return false
    };
    b.detect._controlDetect = function() {
        var f = b.detect.arySTwains,
            e = f[0],
            d = e && e._fakeControl && e._fakeControl.getSWebTwain();
        if (d) {
            if (d.ErrorCode == 0) {
                clearInterval(b.detect._varSeed);
                for (var g = 0; g < f.length; g++) {
                    var j = f[g],
                        h = j._fakeControl.getSWebTwain();
                    b.__innerInitEvents(j._fakeControl, j.__config);
                    j._fakeControl.__OnRefreshUI = j.__config.onRefreshUI || "";
                    b.attachProperty(j._fakeControl);
                    b.attachMethod(j._fakeControl);
                    j._fakeControl._attachEvents();
                    b.attachAddon(j._fakeControl);
                    h.ProductKey = Dynamsoft.WebTwainEnv.ProductKey;
                    h.BrokerProcessType = b.product._iBrokerProcessType;
                    if (!b.env.bWin) {
                        j._objectWebTwain.ImageCaptureDriverType = b.product._iImageCaptureDriverType
                    }
                    if (b.isFunction(j.__OnPluginReady)) {
                        j.__OnPluginReady()
                    }
                }
            } else {
                if (!Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB) {
                    if (!b.detect.bNoControlEvent) {
                        c.noControl(e);
                        b.detect.bNoControlEvent = true
                    }
                }
                if (b.isFunction(d.__OnPluginNotReady)) {
                    d.__OnPluginNotReady()
                }
            }
        } else {
            clearInterval(b.detect._varSeed)
        }
    };
    b.ie = {};
    b.ie.DynamicWebTwain = function(d) {
        var e = new a(d);
        b.detect.arySTwains.push(e);
        return e
    };
    b.ie.closeAll = function() {
        var d = b.detect.arySTwains,
            e, g, f;
        for (e = 0; e < d.length; e++) {
            g = d[e];
            if (g && g._fakeControl) {
                f = g._fakeControl.getSWebTwain();
                if (f && f.ErrorCode == 0) {
                    f.RemoveAllImages()
                }
            }
        }
        b.detect.arySTwains = []
    };
    Dynamsoft.WebTwainEnv.RemoveAllAuthorizations = function() {
        return false
    }
})(Dynamsoft.Lib);
(function(b) {
    if (!b.product.bPluginEdition) {
        return
    }
    var c = document,
        f = navigator,
        e, d = {
            noControl: function(g) {
                if (b.isFunction(b.detect.onNoControl)) {
                    b.detect.onNoControl(g._strDWTControlContainerID, g._strWidth, g._strHeight)
                } else {
                    var h = b.detect.arySTwains;
                    for (var j = 0; j < h.length; j++) {
                        var k = h[j];
                        if (!k._vPluginExist) {
                            k._createNonInstallDivPlugin();
                            b.show(k._strDWTNonInstallInnerContainerID);
                            b.hide(k._strDWTInnerContainerID)
                        }
                    }
                }
            }
        };

    function a(g) {
        var h = this,
            i = g || {};
        h._strDWTControlContainerID = i.containerID || "dwtcontrolContainer";
        h._strWidth = i.width || 270;
        h._strHeight = i.height || 350;
        if (b.isString(h._strWidth) && h._strWidth.indexOf("%") > 0) {} else {
            h._strWidth = [parseInt(h._strWidth), "px"].join("")
        }
        if (b.isString(h._strHeight) && h._strHeight.indexOf("%") > 0) {} else {
            h._strHeight = [parseInt(h._strHeight), "px"].join("")
        }
        h._strObjectName = h._strDWTControlContainerID + "_Obj";
        b.__innerInitEvents(h, i);
        h.__OnPluginReady = i.onPluginReady;
        h.__OnPluginNotReady = i.onPluginNotReady;
        h.__OnRefreshUI = i.onRefreshUI || "";
        h._objectWebTwain = null;
        h._strDWTInnerContainerID = h._strDWTControlContainerID + "_CID";
        h._strDWTNonInstallInnerContainerID = h._strDWTControlContainerID + "_NonInstallCID";
        h._vNotAllowedForChrome = false;
        h._vPluginExist = false;
        h.Addon = {}
    }
    e = a.prototype;
    e.getSWebTwain = function() {
        var g = this;
        return g._objectWebTwain
    };
    e.getInstance = function() {
        var g = this;
        if (g._objectWebTwain) {
            return g
        }
        return false
    };
    e._createControl = function() {
        var l = this,
            i, k = l._strWidth,
            h = l._strHeight,
            j;
        if (b.isString(k)) {
            if (k.indexOf("%") > 0) {
                k = "100%"
            } else {
                k = parseInt(k) + 2 + "px"
            }
        }
        if (b.isString(h)) {
            if (h.indexOf("%") > 0) {
                h = "100%"
            } else {
                h = parseInt(h) + 2 + "px"
            }
        }
        j = ['<div id="', l._strDWTInnerContainerID, '" style="width:', k, ";height:", h, '">'];
        if (b.env.bIE) {
            if (!Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB) {
                j.push('<object id="', l._strObjectName, '" style="width:', l._strWidth, ";height:", l._strHeight, ';border:1px solid #AAAAAA"', ' classid="clsid:', Dynamsoft.WebTwainEnv.Trial ? b.product.strTrialClassID : b.product.strFullClassID, '" viewastext>', '<param name="wmode" value="transparent"/>', "</object>")
            } else {
                j.push('<object id="', l._strObjectName, '" style="width:', l._strWidth, ";height:", l._strHeight, ';border:1px solid #AAAAAA"', ' codebase="', (b.env.bWin64) ? b.product.getActiveXCABx64Path() : b.product.getActiveXCABx86Path(), "#version=", Dynamsoft.WebTwainEnv.ActiveXVersion, '"', ' classid="clsid:', Dynamsoft.WebTwainEnv.Trial ? b.product.strTrialClassID : b.product.strFullClassID, '" viewastext>', '<param name="wmode" value="transparent"/>', "</object>")
            }
        } else {
            var g = l._strWidth;
            if (b.isString(g) && g.indexOf("%") == -1) {
                g = (parseInt(g) - 2) + "px"
            }
            j.push('<embed id="', l._strObjectName, '" style="display: inline; width:', g, ";height:", l._strHeight, '" type="', b.product.strMIMEType, '"', ' pluginspage="', (b.env.bWin) ? b.product.getMSIPath() : b.product.getPKGPath(), '"></embed>')
        }
        j.push('</div><div id="', l._strDWTNonInstallInnerContainerID, '" style="width: ', k, ';display:none"></div>');
        i = b.get(l._strDWTControlContainerID);
        if (i) {
            i.innerHTML = j.join("")
        }
        l._objectWebTwain = b.get(l._strObjectName)
    };
    e._notAllowedForChrome = function() {
        if (!b.env.bIE) {
            ua = (f.userAgent.toLowerCase());
            if (ua.match(/chrome\/([\d.]+)/)) {
                if (this.__OnNotAllowedForChrome) {
                    this.__OnNotAllowedForChrome(_this._strDWTInnerContainerID)
                } else {
                    this._createNonAllowedDivPlugin();
                    b.get(this._strDWTNonInstallInnerContainerID).style.display = "inline";
                    b.get(this._strDWTInnerContainerID).style.display = "none"
                }
            }
        }
    };
    e._createNonAllowedDivPlugin = function() {
        var k = this;
        o = b.get(k._strDWTNonInstallInnerContainerID);
        if (o.innerHTML != "") {
            return
        }
        var h = k._strHeight;
        if (b.isString(h) && h.indexOf("%") == -1) {
            h = (parseInt(h) - 10) + "px"
        }
        var j = ['<div style="display: block; border:1px solid black; width:', k._strWidth, ";height:", h, '">', '<div style="margin: 200px 0 0 0; padding: 5px; font-size: 16px;line-height: 30px; ">', "<div>The Component is not allowed to run on this site.</div>", '<div>Please click <img src="', Dynamsoft.WebTwainEnv.ResourcesPath + '/reference/imgs/plug-in-blocked.png"/>', 'at the right end of the address bar and click "<b>Always allow plug-ins</b>". Then refresh/restart the browser.</div>', "</div></div>"].join("");
        o.innerHTML = j;
        for (var g = 0; g < c.links.length; g++) {
            if (c.links[g].className == "DWT_CloseNonAllowedDiv") {
                c.links[g].onclick = function() {
                    b.get(k._strDWTNonInstallInnerContainerID).style.display = "none";
                    b.get(k._strDWTInnerContainerID).style.display = "inline"
                }
            }
        }
    };
    e._createNonInstallDivPlugin = function() {
        var k = this,
            j = b.get(k._strDWTNonInstallInnerContainerID);
        if (j.innerHTML != "") {
            return
        }
        var h = "";
        if (Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB && b.env.bIE) {
            var i = ["<div style='display: block; border:solid black 1px; text-align:center; width:", k._strWidth, ";height:", k._strHeight, "'>", "<ul style='padding-top:100px;'>", "<li>The Component is not installed</li>", "<li>You need to download and install the ActiveX to use this sample.</li>", "<li>Please follow the instructions in the information bar.</li>", "</ul></div>"].join("")
        } else {
            var g = ("https:" == location.protocol ? "https://" : "http://");
            if (b.product.bChromeEdition) {
                h = b.product.getChromeEditionPath()
            } else {
                if (!Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB && b.env.bIE) {
                    if (b.env.bWin64) {
                        h = b.product.getActiveXCABx64Path()
                    } else {
                        h = b.product.getActiveXCABx86Path()
                    }
                } else {
                    h = (b.env.bWin) ? b.product.getMSIPath() : b.product.getPKGPath()
                }
            }
            var i = ["<div style='display: block; border:solid black 1px; text-align:center; width:", k._strWidth, ";height:", k._strHeight, "'>", "<ul style='padding-top:100px;'>", "<li>The Component is not installed</li>", "<li>You need to download and install to use this sample.</li>", "<li>Please click the below link to download it.</li>", "<li>After the installation, please RESTART your browser.</li>", "<li><a href='", h, "'>Download</a></li>", "</ul></div>"].join("")
        }
        j.innerHTML = i
    };
    b.detect._controlDetect = function() {
        var m = b.detect.arySTwains,
            k = m[0],
            h = k && k._objectWebTwain;
        if (h) {
            if (h.ErrorCode == 0) {
                clearInterval(b.detect._varSeed);
                for (var n = 0; n < m.length; n++) {
                    var q = m[n];
                    b.attachProperty(q);
                    b.attachMethod(q);
                    q._attachEvents();
                    b.attachAddon(q);
                    q._objectWebTwain.ProductKey = Dynamsoft.WebTwainEnv.ProductKey;
                    q._objectWebTwain.BrokerProcessType = b.product._iBrokerProcessType;
                    if (!b.env.bWin) {
                        q._objectWebTwain.ImageCaptureDriverType = b.product._iImageCaptureDriverType
                    }
                    if (b.isFunction(q.__OnPluginReady)) {
                        q.__OnPluginReady()
                    }
                }
            } else {
                var p = f.mimeTypes;
                if (!b.env.bIE) {
                    var g = true;
                    f.plugins.refresh(false);
                    if (b.env.iPluginLength != f.plugins.length) {
                        for (var n = 0; n < p.length; n++) {
                            if (p[n].type.toLowerCase().indexOf(b.product.strMIMEType.toLowerCase()) > -1) {
                                location.reload()
                            }
                        }
                    }
                    for (var n = 0; n < p.length; n++) {
                        if (p[n].type.toLowerCase().indexOf(b.product.strMIMEType.toLowerCase()) > -1) {
                            for (var l = 0; l < m.length; l++) {
                                var q = m[l];
                                g = false;
                                q._vPluginExist = true;
                                if (q._vNotAllowedForChrome == false) {
                                    q._notAllowedForChrome();
                                    q._vNotAllowedForChrome = true
                                }
                            }
                        }
                    }
                    if (g && !b.detect.bNoControlEvent) {
                        d.noControl(k);
                        b.detect.bNoControlEvent = true
                    }
                } else {
                    if (!Dynamsoft.WebTwainEnv.ActiveXInstallWithCAB) {
                        if (!b.detect.bNoControlEvent) {
                            d.noControl(k);
                            b.detect.bNoControlEvent = true
                        }
                    }
                }
                if (b.isFunction(k.__OnPluginNotReady)) {
                    k.__OnPluginNotReady()
                }
            }
        } else {
            clearInterval(b.detect._varSeed)
        }
    };
    b.plugin = {};
    b.plugin.DynamicWebTwain = function(g) {
        var h = new a(g);
        h._createControl();
        b.detect.arySTwains.push(h);
        return h
    };
    b.plugin.closeAll = function() {
        var g = b.detect.arySTwains,
            h, k, j;
        for (h = 0; h < g.length; h++) {
            k = g[h];
            if (k && k._objectWebTwain) {
                j = k._objectWebTwain;
                if (j && j.ErrorCode == 0) {
                    j.RemoveAllImages()
                }
            }
        }
        b.detect.arySTwains = []
    };
    Dynamsoft.WebTwainEnv.RemoveAllAuthorizations = function() {
        return false
    }
})(Dynamsoft.Lib);
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    a.LS = (function() {
        var b = false,
            c;
        if (a.env.bEdge && a.env.bFileSystem) {} else {
            b = (window.localStorage) ? true : false
        }
        c = {
            isSupportLS: function() {
                return b
            },
            item: function(d, e) {
                var f = null;
                if (this.isSupportLS()) {
                    if (e) {
                        localStorage.setItem(d, e);
                        f = e
                    } else {
                        f = localStorage.getItem(d)
                    }
                    if (f === null) {
                        return false
                    }
                    return f
                } else {
                    return false
                }
            },
            removeItem: function(d) {
                if (this.isSupportLS()) {
                    localStorage.removeItem(d)
                } else {
                    return false
                }
                return true
            }
        };
        return c
    })()
})(Dynamsoft.Lib);
(function(c) {
    c.html5 = c.html5 || {};
    if (!Dynamsoft.Lib.product.bChromeEdition) {
        return
    }
    var g = 1,
        h, f = !1,
        b = !0,
        e = Dynamsoft.WebTwainEnv,
        a = {
            ActiveX: 0,
            Plugin: 1,
            HTML5: 2,
            WinMacLinux: 3,
            Barcode1D: 4,
            Barcode2D: 5,
            BarcodeWriter: 6,
            OCR: 7,
            Webcam: 8,
            PDFRasterizer: 9,
            OCRPro: 10,
            QR: 50,
            PDF417: 51,
            DataMatrix: 52
        },
        d = {
            WinMacLinux: 1,
            Barcode1D: 2,
            Barcode2D: 3,
            OCR: 4,
            Webcam: 6,
            PDFRasterizer: 9
        };
    h = c.html5.Funs = {
        notSupportProperty: function(j) {},
        notSupportMethod: function(j) {},
        getRandom: function() {
            var k = new Date().getTime() % 10000,
                j = [],
                m;
            for (var l = 0; l < 5; l++) {
                m = Math.floor(Math.random() * 10);
                if (l == 0 && m == 0) {
                    l = -1;
                    continue
                }
                j.push(m)
            }
            if (k < 10) {
                j.push("000")
            } else {
                if (k < 100) {
                    j.push("00")
                } else {
                    if (k < 1000) {
                        j.push("0")
                    }
                }
            }
            j.push(k);
            return j.join("")
        },
        generateCmdId: function() {
            g++;
            return g
        },
        sendData: function(k, w, q, u) {
            var v, p, l, m, j, t, n, r;
            if (!u) {
                try {
                    k.send(w)
                } catch (s) {
                    Dynamsoft.Lib.log(s)
                }
                return false
            }
            m = new ArrayBuffer(12);
            p = q && q.size ? q.size : 0;
            r = new Blob([w]);
            v = r.size;
            l = v + p;
            j = new DataView(m);
            for (n = 0; n < 8; n++) {
                if (l) {
                    j.setUint8(n, l % 256);
                    l = parseInt(l / 256)
                } else {
                    break
                }
            }
            for (n = 0; n < 4; n++) {
                if (v) {
                    j.setUint8(8 + n, v % 256);
                    v = parseInt(v / 256)
                } else {
                    break
                }
            }
            t = new Blob([m, r]);
            k.send(t);
            if (p > 0) {
                k.send(q)
            }
            return true
        },
        init: function(n, x) {
            var k, l, u, j, r, q, t, w, m;
            w = [];
            w.push('<dialog id="dialogProgress" class="ds-dwt-dialogProgress" style="top:30%"><h3 id="finalMessage"></h3><p id="status">0%</p>');
            if (Dynamsoft.Lib.env.bIE) {
                w.push('<div id="progressBar" value="" max="100"></div>')
            } else {
                w.push('<progress id="progressBar" value="" max="100"></progress>')
            }
            w.push('<br /><button id="btnCancel" value="cancel" autofcus >cancel</button></dialog>');
            m = '<div class="ds-dwt-container-box"></div>';
            l = c.one("#" + x);
            l.html("");
            l.attr("class", n.containerClass);
            l.append(m);
            q = l.one(".ds-dwt-container-box");
            if (q) {
                q.style("position", "relative");
                h.changeImageUISize(n, n._width, n._height)
            }
            if (!c.dlgProgress) {
                r = c.one("#dialogProgress");
                if (r) {
                    r.remove()
                }
                var p = c.parseHTML(w.join(""));
                if (p && p.length > 0) {
                    document.body.appendChild(p[0])
                }
                if (c.env.bIE) {
                    var v = c.get("progressBar");
                    v.objProgressBar = new c.ProgressBar("progressBar", {
                        width: 300,
                        height: 20
                    })
                }
                r = c.get("dialogProgress");
                if (r) {
                    c.dlgProgress = r;
                    c.dialog.setup(c.dlgProgress)
                }
                c.dlgRef = 0;
                c.dialogShowStatus = false;
                c.cancelFrome = 0;
                var s = function() {
                    var y = c.cancelFrome;
                    c.closeProgress(0);
                    if (c.bio) {
                        c.bio.abort();
                        c.bio = false
                    } else {
                        if (y == 3 || y == 4) {
                            n.SetCancel()
                        }
                    }
                };
                c.addEventListener(c.get("btnCancel"), "mousedown", s)
            }
            h.initImageUI(n, q)
        },
        initImageUI: function(n, q) {
            var k, j, l = n._width,
                p = n._height,
                m = false;
            k = c.one("#" + n._strDWTControlContainerID);
            if (c.isString(l) && l.indexOf("%") >= 0) {
                l = c.css(k, "width") * parseInt(l) / 100;
                m = true
            } else {
                l = parseInt(l)
            }
            if (Dynamsoft.Lib.isString(p) && p.indexOf("%") >= 0) {
                p = c.css(k, "height") * parseInt(p) / 100;
                m = true
            } else {
                p = parseInt(p)
            }
            j = {
                Container: q,
                Width: l,
                Height: p
            };
            h.bindUIViewEvents(n, j);
            n._UIManager = new Dynamsoft.Lib.UI.ImageUIManager(n, j);
            if (m) {
                h.changeImageUISize(n, n._width, n._height)
            }
        },
        changeImageUISize: function(n, m, p) {
            var k, l, t = -1,
                w = -1,
                j = m,
                v = p,
                s = false,
                u, q;
            k = c.one("#" + n._strDWTControlContainerID);
            if (Dynamsoft.Lib.isString(m) && m.indexOf("%") >= 0) {
                u = c.css(k, "width") * parseInt(m) / 100;
                s = true
            } else {
                u = parseInt(m);
                j = [u + 2, "px"].join("")
            }
            if (Dynamsoft.Lib.isString(p) && p.indexOf("%") >= 0) {
                q = c.css(k, "height") * parseInt(p) / 100;
                s = true
            } else {
                q = parseInt(p);
                v = [q + 2, "px"].join("")
            }
            if (k) {
                l = k.one(".ds-dwt-container-box");
                if (l) {
                    l.style("width", j);
                    l.style("height", v)
                }
            }
            if (s) {
                if (!n.__funResize) {
                    n.__funResize = function() {
                        var x = h.__innerGetUIViewRealSize(n._strDWTControlContainerID, n._width, n._height);
                        if (n._UIManager) {
                            return n._UIManager.ChangeSize(x.width, x.height)
                        }
                        return true
                    }
                }
                Dynamsoft.Lib.removeEventListener(window, "resize", n.__funResize);
                Dynamsoft.Lib.addEventListener(window, "resize", n.__funResize)
            } else {
                if (n.__funResize) {
                    Dynamsoft.Lib.removeEventListener(window, "resize", n.__funResize);
                    n.__funResize = false
                }
            }
            var r = h.__innerGetUIViewRealSize(n._strDWTControlContainerID, u, q);
            if (n._UIManager) {
                return n._UIManager.ChangeSize(r.width, r.height)
            }
            return true
        },
        __innerGetUIViewRealSize: function(l, j, n) {
            var k, m = -1,
                p = -1;
            k = c.one("#" + l);
            if (Dynamsoft.Lib.isString(j) && j.indexOf("%") >= 0) {
                m = c.css(k, "width") * parseInt(j) / 100
            }
            if (m < 0 && j) {
                m = parseInt(j)
            }
            if (Dynamsoft.Lib.isString(n) && n.indexOf("%") >= 0) {
                p = c.css(k, "height") * parseInt(n) / 100
            }
            if (p < 0 && n) {
                p = parseInt(n)
            }
            return {
                width: m,
                height: p
            }
        },
        bindUIViewEvents: function(l, j) {
            var m = l,
                k;
            j.onSelected = function(n) {
                var q = n.length,
                    p;
                if (q > 0) {
                    m.__SelectedImagesCount = q;
                    p = n[q - 1];
                    m.__cIndex = p;
                    k = h.__SetSelectedImages(m, m.__cIndex, n);
                    if (k && Dynamsoft.Lib.isFunction(m.__OnRefreshUI)) {
                        m.__OnRefreshUI(p)
                    }
                } else {
                    m.__SelectedImagesCount = 0
                }
            };
            j.onRefreshUI = function(n) {
                h.__innerRefreshFromUIView(m, n)
            };
            j.onResetCurrentIndex = function(n) {
                if (n >= 0 && m.__cIndex != n) {
                    m._innerFun("CurrentImageIndexInBuffer", h.makeParams(n));
                    m.__cIndex = n
                }
            };
            j.onMouseMove = function(q) {
                var p = q.index;
                if (q) {
                    var n = q.x,
                        r = q.y;
                    m.__MouseX = n;
                    m.__MouseY = r
                }
                if (Dynamsoft.Lib.isFunction(m.__OnMouseMove)) {
                    m.__OnMouseMove(p)
                }
            };
            j.onMouseClick = function(q) {
                var p = q.index;
                if (q) {
                    var n = q.x,
                        r = q.y;
                    m.__MouseX = n;
                    m.__MouseY = r
                }
                if (Dynamsoft.Lib.isFunction(m.__OnMouseClick)) {
                    m.__OnMouseClick(p)
                }
            };
            j.onMouseDoubleClick = function(p) {
                var n = p.index;
                if (Dynamsoft.Lib.isFunction(m.__OnMouseDoubleClick)) {
                    m.__OnMouseDoubleClick(n)
                }
            };
            j.onMouseRightClick = function(q) {
                var p = q.index;
                if (q) {
                    var n = q.x,
                        r = q.y;
                    m.__MouseX = n;
                    m.__MouseY = r
                }
                if (Dynamsoft.Lib.isFunction(m.__OnMouseRightClick)) {
                    return m.__OnMouseRightClick(p)
                }
                return true
            };
            j.onImageAreaSelected = function(n) {
                if (Dynamsoft.Lib.isFunction(m.__OnImageAreaSelected)) {
                    m.__OnImageAreaSelected(n.index, n.left, n.top, n.right, n.bottom)
                }
            };
            j.onImageAreaDeSelected = function(n) {
                if (Dynamsoft.Lib.isFunction(m.__OnImageAreaDeSelected)) {
                    m.__OnImageAreaDeSelected(n)
                }
            }
        },
        __pushElement: function(k, j) {
            if (Dynamsoft.Lib.isString(j)) {
                k.push('"');
                k.push(j);
                k.push('"')
            } else {
                if (Dynamsoft.Lib.isArray(j)) {
                    var l = true;
                    k.push("[");
                    Dynamsoft.Lib.each(j, function(m) {
                        if (l) {
                            l = false
                        } else {
                            k.push(",")
                        }
                        h.__pushElement(k, m)
                    });
                    k.push("]")
                } else {
                    if (j === undefined) {
                        k.push('""')
                    } else {
                        k.push(j)
                    }
                }
            }
        },
        makeParams: function() {
            var k = arguments;
            if (k === undefined || k.length === 0) {
                return undefined
            } else {
                var j = [];
                if (k.length === 1) {
                    var m = k[0];
                    j.push("[");
                    h.__pushElement(j, m);
                    j.push("]")
                } else {
                    if (k.length === 2) {
                        var m = k[0],
                            l = k[1];
                        j.push("[");
                        h.__pushElement(j, m);
                        j.push(",");
                        h.__pushElement(j, l);
                        j.push("]")
                    } else {
                        h.__pushElement(j, Array.prototype.slice.call(k))
                    }
                }
                return j.join("")
            }
        },
        getJson: function(r, k, s, j) {
            var q = [];
            q.push("{");
            q.push('"id":"');
            q.push(r.clientId);
            q.push('"');
            if (j) {
                q.push(',"cmdId":"');
                q.push(j);
                q.push('"')
            }
            q.push(',"method":"');
            q.push(k);
            q.push('"');
            q.push(',"module":"dwt","version":"');
            var n = Dynamsoft.WebTwainEnv,
                l = [n.Trial ? "dwt_trial_" : "dwt_", c.replaceAll(n.ServerVersionInfo, ",", "")].join("");
            q.push(l);
            q.push('"');
            if (s !== undefined && s !== null) {
                q.push(',"parameter":');
                q.push(s)
            }
            q.push("}");
            return q.join("")
        },
        refreshImageAfterInvokeFun: function(j, l, k) {
            return (k == 1)
        },
        loadHttpBlob: function(p, w, n, q, x, j, v) {
            var l = "loadHttpBlob",
                y, s, u = false;
            y = function(E, B, D) {
                var A, C;
                if (E && c.isArray(E) && E.length > 2) {
                    A = E[1];
                    C = E[2]
                } else {
                    A = B;
                    C = D
                }
                if (C.state == 2 && C.status == 0) {
                    if (C.statusText === "abort") {
                        var m = true;
                        Dynamsoft.Lib.Errors.HttpDownloadError(p, m)
                    } else {
                        Dynamsoft.Lib.Errors.HttpDownloadUrlError(p)
                    }
                } else {
                    Dynamsoft.Lib.Errors.HttpDownloadError(p, false, A, C.status)
                }
                if (Dynamsoft.Lib.isFunction(j)) {
                    j()
                }
            };
            s = {
                method: w,
                url: n,
                async: q,
                onSuccess: x,
                onError: y,
                onComplete: function() {
                    Dynamsoft.Lib.bio = false
                }
            };
            if (p.HTTPUserName != "") {
                s.username = p.HTTPUserName;
                s.password = p.HTTPPassword
            }
            if (q) {
                s.dataType = "blob";
                if (Dynamsoft.Lib.isFunction(v)) {
                    s.beforeSend = function(m) {
                        m.addEventListener("progress", function(A) {
                            delete(A.totalSize);
                            delete(A.position);
                            v(A)
                        }, false)
                    }
                }
                u = true
            } else {
                if (Dynamsoft.Lib.env.bIE) {
                    s.dataType = "arraybuffer";
                    s.onSuccess = function(D, C, B) {
                        var E, A, m;
                        E = D || B.responseData;
                        if (E) {
                            m = new Uint8Array(E)
                        }
                        p._errorCode = 0;
                        p._errorString = "";
                        x(m);
                        p._HowManyImagesInBuffer = p._innerFun("HowManyImagesInBuffer");
                        p.__cIndex = p._innerFun("CurrentImageIndexInBuffer");
                        u = true
                    }
                } else {
                    s.contentType = "text/plain; charset=x-user-defined";
                    s.mimeType = "text/plain; charset=x-user-defined";
                    s.onSuccess = function(E, D, C) {
                        var F, A, m;
                        F = C.responseText;
                        A = F.length;
                        m = new Uint8Array(A);
                        for (var B = 0; B < A; B++) {
                            m[B] = F.charCodeAt(B)
                        }
                        p._errorCode = 0;
                        p._errorString = "";
                        x(m);
                        p._HowManyImagesInBuffer = p._innerFun("HowManyImagesInBuffer");
                        p.__cIndex = p._innerFun("CurrentImageIndexInBuffer");
                        u = true
                    }
                }
                c.mix(s, {
                    headers: {
                        "X-Requested-With": false
                    }
                })
            }
            if (w == "post") {
                var r = p.httpFormFields,
                    k;
                if (r) {
                    try {
                        k = new FormData();
                        c.each(r, function(A, m) {
                            k.append(m, A)
                        });
                        c.mix(s, {
                            data: k,
                            processData: false,
                            contentType: false
                        })
                    } catch (t) {}
                }
            }
            var z = new c.ajax(s);
            if (q) {
                c.bio = z
            }
            return u
        },
        getServerImageUrlPrefix: function(m, n) {
            var k = m.httpUrl,
                j = false,
                l = [k, "dwt/dwt_", e.Trial ? "trial_" : "", c.replaceAll(e.ServerVersionInfo, ",", ""), "/img?id=", m.clientId];
            return l.join("")
        },
        getServerSmallImageUrl: function(n, p, l) {
            var k = n.httpUrl,
                j = false,
                m = [k, "dwt/dwt_", e.Trial ? "trial_" : "", c.replaceAll(e.ServerVersionInfo, ",", ""), "/img?id=", n.clientId];
            if (p !== undefined && p !== null) {
                m.push("&index=");
                m.push(p)
            }
            if (l) {
                m.push("&act=");
                m.push(l)
            } else {
                m.push("&width=");
                m.push(j ? "-1" : n._width / 2);
                m.push("&height=");
                m.push(j ? "-1" : n._height / 2)
            }
            return m.join("")
        },
        combineUrl: function(n, k, m) {
            var j = [],
                l = k;
            if (l === undefined || m === undefined) {
                return false
            }
            if (!Dynamsoft.Lib.isString(l)) {
                l = new String(k)
            }
            if (l.indexOf("http://") == 0) {
                l = l.replace("http://", "");
                j.push("http://")
            } else {
                if (l.indexOf("https://") == 0) {
                    l = l.replace("https://", "");
                    j.push("https://")
                } else {
                    if (l.indexOf("//") == 0) {
                        l = l.replace("//", "")
                    }
                    if (n.IfSSL) {
                        j.push("https://")
                    } else {
                        j.push("http://")
                    }
                }
            }
            j.push(l);
            if (l.indexOf(":") < 0) {
                if (n.HTTPPort == "") {
                    n.HTTPPort = Dynamsoft.Lib.detect.ssl ? 443 : 80
                }
                if ((!Dynamsoft.Lib.detect.ssl && n.HTTPPort != 80) || (Dynamsoft.Lib.detect.ssl && n.HTTPPort != 443)) {
                    j.push(":");
                    j.push(n.HTTPPort)
                }
            }
            if (m.indexOf("/") !== 0) {
                j.push("/")
            }
            j.push(m);
            return j.join("")
        },
        httpPostUpload: function(p, j, n, s, v, k, q, r, x) {
            if (!n || n.size <= 0) {
                Dynamsoft.Lib.Errors.UploadFileCannotEmpty(p);
                if (Dynamsoft.Lib.isFunction(x)) {
                    x()
                }
                return false
            }
            var m = p.MaxUploadImageSize,
                u = n.size,
                t = n.type,
                l;
            if (u > m && m != -1) {
                Dynamsoft.Lib.Errors.UploadExceededMaxSize(p);
                if (Dynamsoft.Lib.isFunction(x)) {
                    x()
                }
                return false
            }
            if (t === "" || t && t != p.HttpContentTypeFieldValue) {
                var w = n.slice || n.webkitSlice || n.mozSlice;
                l = w.call(n, 0, u, p.HttpContentTypeFieldValue);
                l.name = n.name
            } else {
                l = n
            }
            l.remoteFilename = p.__remoteFilename;
            return this.httpUploadByBIO(p, j, l, v, s, k, q, r, x)
        },
        httpPostUploadString: function(n, j, q, m, t, k, p, r, v) {
            var u, l, s;
            if (q == "") {
                Dynamsoft.Lib.Errors.UploadFileCannotEmpty(n);
                if (Dynamsoft.Lib.isFunction(v)) {
                    v()
                }
                return false
            }
            l = n.MaxUploadImageSize;
            s = q.length;
            if (s > l && l != -1) {
                Dynamsoft.Lib.Errors.UploadExceededMaxSize(n);
                if (Dynamsoft.Lib.isFunction(v)) {
                    v()
                }
                return false
            }
            u = new Blob([q], {
                type: "text/plain"
            });
            u.name = m;
            return this.httpUploadByBIO(n, j, u, t, true, k, p, r, v)
        },
        httpUploadByBIO: function(n, k, j, s, r, l, p, q, t) {
            c.bio = new c.BIO({
                action: k,
                data: n.httpFormFields,
                async: r
            });
            var u, m;
            u = Dynamsoft.Lib.bio.get("uploadType");
            if (u) {
                m = u.get("ajaxConfig");
                if (m && m.headers && l) {
                    c.mix(m.headers, l)
                }
                if (s >= 0) {
                    u.set("blockSize", s)
                }
            }
            n.__HTTPPostResponseString = false;
            Dynamsoft.Lib.bio.on(c.BIO.event.SUCCESS, function(v) {
                Dynamsoft.Lib.bio = false;
                if (v && Dynamsoft.Lib.isString(v.response)) {
                    n.__HTTPPostResponseString = v.response
                } else {
                    n.__HTTPPostResponseString = ""
                }
                if (Dynamsoft.Lib.isFunction(q)) {
                    q(n.__HTTPPostResponseString)
                }
            });
            Dynamsoft.Lib.bio.on(c.BIO.event.ERROR, function(y) {
                var w = (y && y.canceled),
                    z = (y && y.timeout),
                    v = false,
                    x = false;
                Dynamsoft.Lib.bio = false;
                if (y && Dynamsoft.Lib.isString(y.response)) {
                    n.__HTTPPostResponseString = y.response
                } else {
                    n.__HTTPPostResponseString = ""
                }
                if (!w) {
                    if (y && y.msg) {
                        v = y.msg
                    }
                    if (y && y.httpStatus) {
                        x = y.httpStatus
                    }
                }
                Dynamsoft.Lib.Errors.UploadError(n, w, v, x);
                if (Dynamsoft.Lib.isFunction(t)) {
                    t(n.__HTTPPostResponseString)
                }
            });
            if (p) {
                Dynamsoft.Lib.bio.on(c.BIO.event.PROGRESS, function(v) {
                    delete(v.totalSize);
                    delete(v.position);
                    var w = (v.total === 0) ? 100 : Math.round(v.loaded * 100 / v.total),
                        x = [v.loaded, " / ", v.total].join("");
                    n._OnPercentDone([0, w, "", "http"])
                });
                n._OnPercentDone([0, -1, "uploading...", "http"])
            }
            return Dynamsoft.Lib.bio.upload(j)
        },
        httpPutImage: function(m, j, l, n, s, k, q) {
            var r = true,
                p = {
                    method: "PUT",
                    url: j,
                    hasContent: true,
                    processData: false,
                    async: n,
                    data: l,
                    onSuccess: s,
                    onError: function() {
                        r = false;
                        if (c.isFunction(k)) {
                            k()
                        }
                    },
                    onComplete: function() {
                        Dynamsoft.Lib.bio = false
                    },
                    beforeSend: function(t) {
                        if (c.isFunction(q)) {
                            t.upload.addEventListener("progress", function(u) {
                                delete(u.totalSize);
                                delete(u.position);
                                q(u)
                            }, false)
                        }
                    }
                };
            if (m.HTTPUserName != "") {
                p.username = m.HTTPUserName;
                p.password = m.HTTPPassword
            }
            if (!n) {
                c.mix(p, {
                    headers: {
                        "X-Requested-With": false
                    }
                })
            }
            c.bio = new c.ajax(p);
            return r
        },
        dialog: false,
        dialogRef: 0,
        showMask: function(k) {
            var j = this;
            Dynamsoft.Lib.log("showMask:" + k + "--" + j.dialogRef);
            if (j.dialogRef == 0) {
                Dynamsoft.Lib.detect.showMask()
            }
            j.dialogRef++
        },
        hideMask: function(k) {
            var j = this;
            Dynamsoft.Lib.log("hideMask:" + k + "--" + j.dialogRef);
            if (j.dialogRef > 1) {
                j.dialogRef--
            } else {
                if (j.dialogRef <= 1) {
                    Dynamsoft.Lib.detect.hideMask();
                    j.dialog = false;
                    j.dialogRef = 0
                }
            }
        },
        setBtnCancelVisibleForProgress: function(l, k) {
            var j = this;
            if ((Dynamsoft.Lib.cancelFrome == 0 && l.__IfShowProgressBar == true) || (Dynamsoft.Lib.cancelFrome != 0 && l.__IfShowCancelDialogWhenImageTransfer == true)) {
                var m = Dynamsoft.Lib.get("btnCancel");
                if (k == false) {
                    m.style.display = "none"
                } else {
                    m.style.display = ""
                }
            }
        },
        EVENTS: ["OnPostAllTransfers", "OnPostTransfer", "OnPostLoad", "OnPreTransfer", "OnPreAllTransfers", "OnResult", "OnTransferCancelled", "OnTransferError", "OnSourceUIClose", "OnBitmapChanged", "OnGetFilePath", "OnPercentDone"],
        SEND_BACK_EVENTS: ["OnPreAllTransfers", "OnPreTransfer", "OnPostTransfer", "OnGetFilePath", "OnPostLoad"],
        handleEvent: function(m, k) {
            var p = this,
                l = k.result[0],
                j = m._objWS,
                n = false;
            Dynamsoft.Lib.each(h.EVENTS, function(s, r) {
                if (k.event === s) {
                    var q = ["_", s].join("");
                    n = true;
                    if (Dynamsoft.Lib.isFunction(m[q])) {
                        m[q](k.result, k)
                    }
                    return false
                }
            });
            if (n) {
                Dynamsoft.Lib.log("handled event:" + k.event);
                Dynamsoft.Lib.each(h.SEND_BACK_EVENTS, function(r, q) {
                    if (h.isServerInvalid(m)) {
                        return false
                    }
                    if (k.event === r) {
                        Dynamsoft.Lib.log("sendback event:" + k.event);
                        h.sendData(j, h.getJson(m, k.event, h.makeParams(l), 0), false, true);
                        return false
                    }
                })
            } else {
                Dynamsoft.Lib.each(c.Addon_Events, function(s, r) {
                    if (k.event === s) {
                        var q = ["_", s].join("");
                        n = true;
                        if (Dynamsoft.Lib.isFunction(m[q])) {
                            m[q](k.result)
                        }
                        return false
                    }
                });
                if (n) {
                    Dynamsoft.Lib.log("handled addon event:" + k.event);
                    Dynamsoft.Lib.each(c.Addon_Sendback_Events, function(r, q) {
                        if (h.isServerInvalid(m)) {
                            return false
                        }
                        if (k.event === r) {
                            Dynamsoft.Lib.log("sendback addon event:" + k.event);
                            h.sendData(j, h.getJson(m, k.event, h.makeParams(l), 0), false, true);
                            return false
                        }
                    })
                }
            }
            return n
        },
        getImageType: function(k) {
            if (k === undefined) {
                return -1
            }
            var j = k.length;
            if (j < 4) {
                return -1
            }
            var l = k.lastIndexOf(".");
            if (l === -1) {
                return -1
            }
            var m = k.slice(l).toLowerCase();
            if (m === ".bmp" || m === ".dib") {
                return EnumDWT_ImageType.IT_BMP
            }
            if (m === ".jpg" || m === ".jpe" || m === ".jpeg" || m === ".jfif") {
                return EnumDWT_ImageType.IT_JPG
            }
            if (m === ".tif" || m === ".tiff") {
                return EnumDWT_ImageType.IT_TIF
            }
            if (m === ".png") {
                return EnumDWT_ImageType.IT_PNG
            }
            if (m === ".pdf") {
                return EnumDWT_ImageType.IT_PDF
            }
            if (m === ".gif") {
                return 6
            }
            return -1
        },
        addImageFileExt: function(k, j) {
            var l;
            if (j == EnumDWT_ImageType.IT_BMP) {
                l = [k, ".bmp"].join("")
            } else {
                if (j == EnumDWT_ImageType.IT_JPG) {
                    l = [k, ".jpg"].join("")
                } else {
                    if (j == EnumDWT_ImageType.IT_PNG) {
                        l = [k, ".png"].join("")
                    } else {
                        if (j == EnumDWT_ImageType.IT_TIF) {
                            l = [k, ".tif"].join("")
                        } else {
                            if (j == EnumDWT_ImageType.IT_PDF) {
                                l = [k, ".pdf"].join("")
                            }
                        }
                    }
                }
            }
            return l
        },
        autoDiscardBlankImage: function(m, j) {
            if (Dynamsoft.Lib.config.bDiscardBlankImage) {
                var k = m.__cIndex;
                if (m.IsBlankImage(k)) {
                    m.RemoveImage(k)
                }
                var l = ["Blank Discard (", j, "): ", m.ErrorString].join("");
                if (Dynamsoft.Lib.isFunction(m.__OnPrintMsg)) {
                    m.__OnPrintMsg(l)
                }
            }
        },
        replaceLocalFilename: function(j) {
            var k;
            if (j === undefined) {
                return ""
            }
            j = new String(j);
            k = j.replace(/\\/g, "\\\\");
            if (Dynamsoft.Lib.env.bFileSystem) {
                k = decodeURI(k)
            }
            return k
        },
        __innerRefreshFromUIView: function(k, l, j) {
            var m = k;
            if (l >= 0) {
                if (!j) {
                    m.CurrentImageIndexInBuffer = l
                }
                m._UIManager.refreshEditor(m._UIManager.GetCurrentImageIndex(), m._UIManager.count())
            }
            if (Dynamsoft.Lib.isFunction(m.__OnRefreshUI)) {
                m.__OnRefreshUI(l)
            }
        },
        __SetSelectedImages: function(l, k, j) {
            l.__SelectedImagesCount = j.length;
            if (k === undefined) {
                k = ""
            }
            return l._innerFun("SetSelectedImages", h.makeParams(k, j.join(",")))
        },
        GetImageInfo: function(j, k) {
            var l = j;
            return j._innerFun("GetImageInfo", h.makeParams(k))
        },
        isServerInvalid: function(k) {
            var m = k,
                j, l;
            j = !m.bReady || m._objWS === null;
            l = m.__bMustUpgradeService;
            if (j) {
                Dynamsoft.Lib.Errors.Server_Invalid(m)
            } else {
                if (l) {
                    Dynamsoft.Lib.Errors.MustUpgradeService(m)
                }
            }
            return j || l || m._errorCode == -2208
        },
        isHttpServerInvalid: function(k) {
            var m = k,
                j, l;
            j = !m.bReady || m.httpUrl === null;
            l = m.__bMustUpgradeService;
            if (j) {
                Dynamsoft.Lib.Errors.Server_Invalid(m)
            } else {
                if (l) {
                    Dynamsoft.Lib.Errors.MustUpgradeService(m)
                }
            }
            return j || l || m._errorCode == -2208
        },
        isExpiredOrFuture: function(k, n) {
            if (k == "") {
                return false
            }
            if (!n) {
                var j = k.length;
                if (j > 2 && k[j - 2] == "/" && k[j - 1] == "0") {
                    return false
                }
            }
            var m = this.parseDateFromString(k),
                l = (new Date()).getTime(),
                p = l + (60 * 24 * 3600000);
            if (m.getTime() < l) {
                return true
            } else {
                if (n && (m.getTime() > p)) {
                    return true
                }
            }
            return false
        },
        isOSOK: function(j) {
            if (j == "" || j == "0") {
                return true
            }
            j = j.toLowerCase();
            if (j.indexOf("windows") > -1 && (c.env.bWin || c.env.bWin64)) {
                return true
            } else {
                if (j.indexOf("mac") > -1 && c.env.bMac) {
                    return true
                } else {
                    if (j.indexOf("linux") > -1 && c.env.bLinux) {
                        return true
                    }
                }
            }
            return false
        },
        isBrowserOK: function(j) {
            if (j == "" || j == "0") {
                return true
            }
            if (j) {
                j = j.toLowerCase();
                if (j == "chrome" && Dynamsoft.Lib.env.bChrome) {
                    return true
                } else {
                    if (j == "ie" && Dynamsoft.Lib.env.bIE) {
                        return true
                    } else {
                        if (j == "firefox" && Dynamsoft.Lib.env.bFirefox) {
                            return true
                        }
                    }
                }
            }
            return false
        },
        isBindDomainOK: function(q) {
            if (c.isUndefined(q) || q == null || q == "" || q == "*" || q == "*.*") {
                return true
            }
            var t = location.hostname,
                j = false;
            if (t == "") {
                return true
            }
            var u = t.toLowerCase().split("."),
                k = u.length,
                n = q.toLowerCase().split(";");
            for (var p = 0; p < n.length; p++) {
                var m = n[p];
                if (m == "*.*") {
                    j = true;
                    break
                }
                var s = m.split("."),
                    v = s.length;
                if (v > 0 && v - 1 <= k) {
                    var r = true;
                    for (var l = v - 1; l > 0; l--) {
                        if (l + k - v >= 0) {
                            if (u[l + k - v] != s[l]) {
                                r = false;
                                break
                            }
                        } else {
                            if (s[l] != "*") {
                                r = false;
                                break
                            }
                        }
                    }
                    if (r) {
                        if (s[0] == "*" || k >= v && u[k - v] == s[0]) {
                            j = true;
                            break
                        }
                    }
                }
            }
            return j
        },
        parseDateFromString: function(k) {
            var l, j = k;
            j = j.replace(/-/g, "/");
            l = Date.parse(j);
            if (isNaN(l)) {
                l = 0
            }
            return new Date(l)
        },
        getEnumLicenseType: function(n) {
            var k = f,
                s = f,
                q = f,
                m = f,
                t = f,
                r = f,
                p = f,
                l = f,
                j = f;
            if (c.isString(n)) {
                c.each(n.split(";"), function(v) {
                    var u = v * 1;
                    if (u == a.HTML5 || u == a.WinMacLinux) {
                        k = b
                    } else {
                        if (u == a.Barcode1D) {
                            s = b
                        } else {
                            if (u == a.QR) {
                                q = b
                            } else {
                                if (u == a.PDF417) {
                                    m = b
                                } else {
                                    if (u == a.DataMatrix) {
                                        t = b
                                    } else {
                                        if (u == a.OCR) {
                                            r = b
                                        } else {
                                            if (u == a.Webcam) {
                                                p = b
                                            } else {
                                                if (u == a.PDFRasterizer) {
                                                    l = b
                                                } else {
                                                    if (u == a.OCRPro) {
                                                        j = b
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                })
            }
            return {
                Core: k,
                PDFRasterizer: l,
                Webcam: p,
                barcode1D: s,
                QR: q,
                PDF417: m,
                DataMatrix: t,
                OCR: r,
                OCRPro: j
            }
        },
        getLicenseType: function(n) {
            var k = f,
                s = f,
                q = f,
                m = f,
                t = f,
                r = f,
                p = f,
                l = f,
                j = f;
            if (n && n != "") {
                n = n.toLowerCase();
                if (n == "html5" || n == "win=(aph) or mac=(ph) or linux(h)") {
                    k = b
                } else {
                    if (n == "1d barcode reader") {
                        s = b
                    } else {
                        if (n == "2d barcode reader(qrcode)") {
                            q = b
                        } else {
                            if (n == "2d barcode reader(pdf417)") {
                                m = b
                            } else {
                                if (n == "2d barcode reader(data matrix)") {
                                    t = b
                                } else {
                                    if (n == "ocr") {
                                        r = b
                                    } else {
                                        if (n == "webcam") {
                                            p = b
                                        } else {
                                            if (n == "pdf rasterizer") {
                                                l = b
                                            } else {
                                                if (n == "proocr") {
                                                    j = b
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return {
                Core: k,
                PDFRasterizer: l,
                Webcam: p,
                barcode1D: s,
                QR: q,
                PDF417: m,
                DataMatrix: t,
                OCR: r,
                OCRPro: j
            }
        },
        isAllowLicenseType: function(j, k) {
            if (k.Core) {
                return j.Core
            } else {
                if (k.PDFRasterizer) {
                    return j.PDFRasterizer
                } else {
                    if (k.Webcam) {
                        return j.Webcam
                    } else {
                        if (k.barcode1D) {
                            return j.barcode1D
                        } else {
                            if (k.QR) {
                                return j.QR
                            } else {
                                if (k.PDF417) {
                                    return j.PDF417
                                } else {
                                    if (k.DataMatrix) {
                                        return j.DataMatrix
                                    } else {
                                        if (k.OCR) {
                                            return j.OCR
                                        } else {
                                            if (k.OCRPro) {
                                                return j.OCRPro
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return j.Core
        },
        setNoAllowedLicenseTypeError: function(k, j) {
            if (j.Core) {
                Dynamsoft.Lib.Errors.LicenseNoCore(k)
            } else {
                if (j.PDFRasterizer) {
                    Dynamsoft.Lib.Errors.LicenseNoPDF(k)
                } else {
                    if (j.Webcam) {
                        Dynamsoft.Lib.Errors.LicenseNoWebcam(k)
                    } else {
                        if (j.barcode1D) {
                            Dynamsoft.Lib.Errors.LicenseNo1D(k)
                        } else {
                            if (j.QR) {
                                Dynamsoft.Lib.Errors.LicenseNo2DQR(k)
                            } else {
                                if (j.PDF417) {
                                    Dynamsoft.Lib.Errors.LicenseNo2DPDF417(k)
                                } else {
                                    if (j.DataMatrix) {
                                        Dynamsoft.Lib.Errors.LicenseNo2DDataMatrix(k)
                                    } else {
                                        if (j.OCR) {
                                            Dynamsoft.Lib.Errors.LicenseNoOCR(k)
                                        } else {
                                            if (j.OCRPro) {
                                                Dynamsoft.Lib.Errors.LicenseNoOCRPro(k)
                                            } else {
                                                Dynamsoft.Lib.Errors.LicenseEmptyOrInvalid(k)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        promptLicenseErr: function(l) {
            if (l.ErrorCode < 0) {
                var k = 220,
                    j = ['<div class="dwt-box-title"></div>', '<div style="margin:35px 0 0 20px;font-size:16px">', l.ErrorString, "</div>"];
                Dynamsoft.WebTwainEnv.ShowDialog(392, 220, j.join(""))
            }
        },
        checkPDFProductKeyWhenNeeds: function(n, p) {
            if (n.__addon && n.__addon.PDF) {
                var l = 1,
                    k = 2,
                    j = 4,
                    m = n.__addon.PDF.GetConvertMode();
                if (p == j) {
                    if (m == l || m == k) {
                        return this.checkProductKey(n, {
                            PDFRasterizer: true
                        })
                    }
                }
            }
            return true
        },
        checkProductKey: function(G, z, E) {
			//console.log(Dynamsoft.WebTwainEnv.ProductKey);
            var n;
            if (TestLicense) {
                n = TestLicense
            } else {
                n = G.__licenseInfo
            }
            if (Dynamsoft.WebTwainEnv.ProductKey == "" || Dynamsoft.WebTwainEnv.ProductKey == "******" || !n || !c.isArray(n.Detail) || (n.Detail.length == 0)) {
                c.Errors.LicenseEmptyOrInvalid(G);
                this.promptLicenseErr(G);
                return false
            }
            var F = 0,
                j = 0,
                D = [],
                l = f,
                q = f,
                t = f,
                H = f,
                v = f,
                C, w = G.__bTrial;
            if (!this.isBindDomainOK(n.Domain)) {
                c.Errors.LicenseBadDomain(G);
                this.promptLicenseErr(G);
                return false
            }
            for (C = 0; C < n.Detail.length; C++) {
                var x = n.Detail[C],
                    r = true,
                    m;
                m = this.getEnumLicenseType(x.EnumLicenseType);
                if (this.isAllowLicenseType(m, z)) {
                    if (w && x.Trial == "TRUE" || !w && x.Trial == "FALSE") {
                        var y = x.ExpireDate.replace(/-/g, "/");
                        if (!this.isExpiredOrFuture(y, w)) {
                            if (m.Core && parseInt(x.Version) >= 13 || !m.Core) {
                                if (this.isBrowserOK(x.Browser) || E) {
                                    if (this.isOSOK(x.OS)) {
                                        F++;
                                        r = false
                                    } else {
                                        t = true
                                    }
                                } else {
                                    H = true
                                }
                            } else {
                                v = true
                            }
                        } else {
                            if (w) {
                                var B = y.length;
                                if (B > 2 && y[B - 2] == "/" && y[B - 1] == "0") {
                                    y = "2000/10/10"
                                }
                            }
                            D.push(y)
                        }
                    } else {
                        if (w) {
                            q = true
                        } else {
                            l = true
                        }
                    }
                    if (r) {
                        j++
                    }
                }
            }
            if (F > 0) {
                return true
            }
            if (j == 0) {
                this.setNoAllowedLicenseTypeError(G, z);
                this.promptLicenseErr(G);
                return false
            }
            if (l) {
                c.Errors.LicenseTrialButServiceFull(G);
                this.promptLicenseErr(G);
                return false
            }
            if (q) {
                c.Errors.LicenseFullButServiceTrial(G);
                this.promptLicenseErr(G);
                return false
            }
            if (D.length > 0) {
                var s = 0,
                    y = "",
                    p = 100000000000000000000,
                    A = "",
                    k = (new Date()).getTime();
                for (C = 0; C < D.length; C++) {
                    var u = this.parseDateFromString(D[C]);
                    if (u.getTime() < k && u.getTime() > s) {
                        s = u.getTime();
                        y = D[C]
                    } else {
                        if (u.getTime() > k && u.getTime() < p) {
                            p = u.getTime();
                            A = D[C]
                        }
                    }
                }
                if (y != "") {
                    var u = this.parseDateFromString(y);
                    y = this.getLicenseDateString(u);
                    c.Errors.LicenseExpired(G, y)
                } else {
                    if (A != "") {
                        var u = this.parseDateFromString(A);
                        A = this.getLicenseDateString(u);
                        c.Errors.LicenseIsFuture(G, A)
                    } else {
                        c.Errors.LicenseExpired(G, "")
                    }
                }
                this.promptLicenseErr(G);
                return false
            }
            if (v) {
                c.Errors.LicenseLower(G);
                this.promptLicenseErr(G);
                return false
            }
            if (H) {
                if (Dynamsoft.Lib.env.bEdge) {
                    c.Errors.LicenseNoEdge(G)
                } else {
                    if (Dynamsoft.Lib.env.bChrome) {
                        c.Errors.LicenseNoChrome(G)
                    } else {
                        if (Dynamsoft.Lib.env.bFirefox) {
                            c.Errors.LicenseNoFirefox(G)
                        } else {
                            if (Dynamsoft.Lib.env.bIE) {
                                c.Errors.LicenseNoIE(G)
                            } else {
                                c.Errors.LicenseNotSupportBorwser(G)
                            }
                        }
                    }
                }
                this.promptLicenseErr(G);
                return false
            }
            if (t) {
                if (Dynamsoft.Lib.env.bWin || Dynamsoft.Lib.env.bWin64) {
                    c.Errors.LicenseNotSupportWindows(G)
                } else {
                    if (Dynamsoft.Lib.env.bMac) {
                        c.Errors.LicenseNotSupportMAC(G)
                    } else {
                        if (Dynamsoft.Lib.env.bLinux) {
                            c.Errors.LicenseNotSupportLinux(G)
                        } else {
                            c.Errors.LicenseNotSupportOS(G)
                        }
                    }
                }
                this.promptLicenseErr(G);
                return false
            }
            c.Errors.LicenseEmptyOrInvalid(G);
            this.promptLicenseErr(G);
            return false
        },
        getLicenseDateString: function(j) {
            var l = j.getFullYear(),
                k, n, m;
            k = j.getMonth() + 1;
            if (k >= 10) {
                n = "" + k
            } else {
                n = "0" + k
            }
            if (j.getDate() >= 10) {
                m = "" + j.getDate()
            } else {
                m = "0" + j.getDate()
            }
            return [n, "/", m, "/", l].join("")
        },
        callbacks: [],
        pushCallback: function(j, n, k) {
            var l = {
                method: j,
                callback: n,
                ticks: k
            };
            h.callbacks(l)
        },
        refreshUIRef: 0
    }
})(Dynamsoft.Lib);
var TestLicense = !1;
var o = {
    Domain: "www.dynamsoft.com; www.aa.com",
    Detail: [{
        Trial: "TRUE",
        OS: "Windows",
        Browser: "Chrome",
        EnumLicenseType: 3,
        LicenseType: "win=(aph) or mac=(ph) or linux(h)",
        Version: "13.x",
        ExpireDate: "2016-07-26"
    }, {
        Trial: "TRUE",
        OS: "Windows",
        Browser: "Chrome",
        EnumLicenseType: 3,
        LicenseType: "win=(aph) or mac=(ph) or linux(h)",
        Version: "13.x",
        ExpireDate: "2016-07-21"
    }]
};
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    a.html5 = a.html5 || {};
    var b = function(c) {
        var d = c;
        Object.defineProperty(d, "width", {
            get: function() {
                return this._parent._width
            },
            set: function(e) {
                this.SetSize(e, false)
            }
        });
        Object.defineProperty(d, "height", {
            get: function() {
                return this._parent._height
            },
            set: function(e) {
                this.SetSize(false, e)
            }
        })
    };
    a.html5.STwainStyle = function(d) {
        var c = this;
        c._parent = d;
        b(c)
    };
    a.html5.STwainStyle.prototype.SetSize = function(c, d) {
        this._parent._innerSetSize(c, d)
    }
})(Dynamsoft.Lib);
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    var c = a.html5.Funs;
    a.html5.STwain = function(d) {
        var e = this,
            f = d || {};
        e.clientId = c.getRandom();
        e._strDWTControlContainerID = f.containerID || ("dwt-container-" + e.clientId);
        e._width = f.width;
        e._height = f.height;
        e._customIP = false;
        e._ssl = a.detect.ssl;
        e._ip = a.product.ip;
        if (f.customIP) {
            e._customIP = true;
            e._ip = f.ip;
            e._port = f.port;
            e._portSSL = f.portSSL
        }
        e.containerClass = "ds-dwt-container noPadding";
        c.init(e, e._strDWTControlContainerID);
        e.objectName = e._strDWTControlContainerID + "_obj";
        e.bReady = false;
        e.httpFormFields = {};
        e._objWS = null;
        e.__wsRetry = 0;
        e.curCommand = [];
        e.curCommand_SaveImagesToBytes = [];
        a.__innerInitEvents(e, f);
        e.__OnMouseClick = f.onMouseClick || "";
        e.__OnMouseDoubleClick = f.onMouseDoubleClick || "";
        e.__OnMouseRightClick = f.onMouseRightClick || "";
        e.__OnMouseMove = f.onMouseMove || "";
        e.__OnImageAreaSelected = f.onImageAreaSelected || "";
        e.__OnImageAreaDeSelected = f.onImageAreaDeSelected || "";
        e.__OnInternetTransferPercentage = f.onInternetTransferPercentage || "";
        e.__OnInternetTransferPercentageEx = f.onInternetTransferPercentageEx || "";
        e.__OnWSReady = f.onWSReady || null;
        e.__OnWSReconnect = f.onWSReconnect || null;
        e.__OnWSClose = f.onWSClose || null;
        e.__OnWSMessage = f.onWSMessage || null;
        e.__OnWSError = f.onWSError || null;
        e.__OnPercentDone = f.onPercentDone || "";
        e.__OnRefreshUI = f.onRefreshUI || "";
        e.__OnPrintMsg = f.onPrintMsg || "";
        e.__OnResult = f.onResult || "";
        e.HTTPPassword = f.HTTPPassword || "";
        e.HTTPPort = f.HTTPPort || (a.detect.ssl ? 443 : 80);
        e.HTTPUserName = f.HTTPUserName || "";
        e.__HTTPPostResponseString = "";
        e.__strHttpContentTypeFieldValue = "application/octet-stream";
        e.__IfShowProgressBar = true;
        e.__IfShowCancelDialogWhenImageTransfer = true;
        e.__cIndex = -1;
        e._HowManyImagesInBuffer = 0;
        e._errorCode = 0;
        e._errorString = "";
        e.__bLoadingImage = false;
        e.__backgroundColor = false;
        e.__MouseX = 0;
        e.__MouseY = 0;
        e.__style = new a.html5.STwainStyle(e);
        e.__addon = {};
        e.__remoteFilename = "RemoteFile";
        e.__sourceName = [];
        e.__defaultSourceName = "";
        e.__sourceCount = -1;
        e.__SelectedImagesCount = 0;
        e.__serverId = "";
        e.__fSelectionRectAspectRatio = 0;
        e.__bConnecting = false;
        e.__bTrial = Dynamsoft.WebTwainEnv.Trial;
        e.__licenseInfo = false;
        e.__httpHeaderMap = false;
        e.__bForceClose = false;
        e.__strProductName = "";
        e.__versionInfo = "";
        e.__bMustUpgradeService = false;
        e._moduleSize = 1024 * 1024;
        e._segementUploadThreshold = 500 * 1024 * 1024
    };
    var b = a.html5.STwain.prototype;
    b.getInstance = function() {
        return this
    };
    b._OnReady = function(h) {
        var g = this,
            f, e, d = g._objWS;
        if (d === null) {
            return
        }
        if (g._customIP) {
            f = {
                ip: g._ip,
                ssl: g._ssl,
                port: g._ssl ? g._portSSL : g._port
            }
        } else {
            f = a.detect.urls[a.detect.cUrlIndex];
            f.ip = a.product.ip
        }
        e = a.getHttpUrl(f);
        a.detect.starting = false;
        a.detect.bOK = true;
        g.bReady = true;
        g.__wsRetry = 0;
        d.onopen = null;
        g.httpUrl = e;
        d.onmessage = function(m) {
            var k = m.data;
            if (typeof(k) === "object") {
                var v = g.curCommand_SaveImagesToBytes.shift() || {};
                if (v.sFun) {
                    v.sFun(k)
                }
                return
            }
            if (g.__OnWSMessage) {
                g.__OnWSMessage(k)
            }
            var l = k.replace(/\0/g, "");
            if (l.indexOf("Exception:") >= 0 || l.indexOf("Error") == 0) {
                var u = k,
                    q = false,
                    v = g.curCommand.pop() || {};
                a.log(u + "@" + v.cmd);
                if (v.fFun) {
                    q = v.fFun(u)
                }
                if (!q && a.isFunction(g.__OnPrintMsg)) {
                    g.__OnPrintMsg(u)
                }
                return
            }
            try {
                l = a.parse(l)
            } catch (n) {
                a.log(k)
            }
            if (l.event) {
                c.handleEvent(g, l);
                return
            }
            var v;
            if (l.cmdId) {
                var t = g.curCommand.length,
                    p, j = -1;
                for (p = t - 1; p >= 0; p--) {
                    if (g.curCommand[p].cmdId == l.cmdId) {
                        j = p;
                        v = g.curCommand.splice(j, 1)[0];
                        break
                    }
                }
                if (j < 0) {
                    t = g.curCommand_SaveImagesToBytes.length;
                    for (p = t - 1; p >= 0; p--) {
                        if (g.curCommand_SaveImagesToBytes[p].cmdId == l.cmdId) {
                            j = p;
                            v = g.curCommand_SaveImagesToBytes.splice(j, 1)[0];
                            break
                        }
                    }
                    if (j < 0) {
                        return
                    }
                }
            } else {
                v = g.curCommand.pop() || {}
            }
            if (l.exception !== undefined && l.description !== undefined) {
                g._errorCode = l.exception;
                g._errorString = l.description
            } else {
                g._errorCode = 0;
                g._errorString = ""
            }
            if (l.method == "ReadBarcode" || l.method == "OCRRecognize" || (l.request && l.request.method == "OCRProRecognize")) {
                if (v.sFun) {
                    v.sFun(l)
                }
                return
            } else {
                if (l.method == "ActiveUI" || l.method == "VersionInfo" || l.method == "SaveSelectedImagesToBase64Binary") {
                    if (v.sFun && l.result.length > 0) {
                        v.sFun(l.result);
                        return
                    }
                } else {
                    if (l.method == "ShowFileDialog" || l.method == "SplitTiff" || l.method == "SplitPDF" || l.method == "EncodeAsBase64") {
                        if (v.sFun) {
                            v.sFun(l.result);
                            return
                        }
                    }
                }
            }
            if (l.result && l.result.length && l.result[0] == "1") {
                if (v.sFun) {
                    v.sFun()
                }
            } else {
                if (l.exception) {
                    var q = false;
                    if (v.fFun) {
                        q = v.fFun(g._errorString)
                    }
                    if (!q && l.exception && l.exception < 0 && l.exception != -2115) {
                        if (a.isFunction(g.__OnPrintMsg)) {
                            g.__OnPrintMsg(g._errorString)
                        }
                    }
                } else {
                    var s = ["result:"];
                    if (v.fFun) {
                        v.fFun(c.__pushElement(s, l.result))
                    }
                }
            }
        };
        d.onclose = function() {
            g.bReady = false;
            g.__wsRetry = 0;
            a.Errors.Server_Invalid(g);
            if (!g.__bForceClose && !a.page.bUnload && !a.detect.starting) {
                a.detect.aryReconnectSTwains.push(g);
                setTimeout(a._reconnect, 1000);
                a.detect.starting = true
            }
            if (g.__OnWSClose) {
                g.__OnWSClose()
            }
            c.hideMask(true);
            a.detect.bOK = false;
            g.__bForceClose = false
        };
        d.onerror = function(j) {
            g.bReady = false;
            g.__wsRetry = 0;
            a.Errors.Server_Invalid(g);
            a.detect.bOK = false;
            if (!a.page.bUnload && !a.detect.starting) {
                a.detect.aryReconnectSTwains.push(g);
                setTimeout(a._reconnect, 1000);
                a.detect.starting = true
            }
            if (j) {
                a.log("websocket error: " + j)
            }
            if (g.__OnWSError) {
                g.__OnWSError()
            }
            c.hideMask(true)
        };
        if (h) {
            g._innerActiveUI(function(m) {
                var n = g.__serverId,
                    k, p;
                if (m && m.length >= 3) {
                    k = m[1];
                    p = m[2];
                    g.__strProductName = p
                } else {
                    if (m && m.length >= 2) {
                        k = m[1]
                    } else {
                        a.log("ActiveUI return parameters error.")
                    }
                }
                if (p) {
                    p = p.toLowerCase();
                    if (p.indexOf("trial") > -1) {
                        g.__bTrial = true
                    } else {
                        g.__bTrial = false
                    }
                }
                g.__serverId = k;
                a.closeProgress("Reconnect");
                if (Dynamsoft.WebTwainEnv.ProductKey !== "" && Dynamsoft.WebTwainEnv.ProductKey !== "******") {
                    g.ProductKey = Dynamsoft.WebTwainEnv.ProductKey
                }
                if (n != k) {
                    a.Errors.Server_Restarted(g);
                    if (a.isFunction(g.__OnWSReconnect)) {
                        var j, l;
                        j = (g._ssl) ? g._portSSL : g._port;
                        l = a.getWSUrl(g._ip, j, g._ssl);
                        g.__OnWSReconnect(l, e)
                    }
                } else {
                    g._errorCode = 0;
                    g._errorString = ""
                }
            });
            return
        }
        if (g._ip === "127.0.0.1" || g._ip === "localhost") {
            a.LS.item("DWT_port", f.port);
            a.LS.item("DWT_ssl", f.ssl ? "true" : "false")
        }
        a.attachProperty(g);
        a.attachAddon(g);
        g._UIManager.OnReady();
        g.SetViewMode(1, 1);
        g._innerActiveUI(function(k) {
            var j, m, l = false;
            if (k && k.length >= 3) {
                j = k[1];
                m = k[2];
                g.__strProductName = m
            } else {
                if (k && k.length >= 2) {
                    j = k[1];
                    l = true
                } else {
                    l = true;
                    a.log("ActiveUI return parameters error.")
                }
            }
            if (m) {
                m = m.toLowerCase();
                if (m.indexOf("trial") > -1) {
                    g.__bTrial = true
                } else {
                    g.__bTrial = false
                }
            }
            g.__serverId = j;
            g.__versionInfo = g._innerFun("VersionInfo");
            g.__bMustUpgradeService = l;
            if (!l) {
                if (Dynamsoft.WebTwainEnv.ProductKey !== "" && Dynamsoft.WebTwainEnv.ProductKey !== "******") {
                    g.ProductKey = Dynamsoft.WebTwainEnv.ProductKey
                }
                g.LogLevel = 0
            }
            if (a.isFunction(g.__OnWSReady)) {
                g.__OnWSReady(g)
            }
        })
    };
    b.__unload = function() {
        var g = this,
            d, e = g._strDWTControlContainerID,
            f = document.getElementById(e);
        if (g._UIManager) {
            g._UIManager.clear()
        }
        if (g.bReady) {
            d = g._objWS;
            if (d) {
                g.__bForceClose = true;
                d.close();
                g.curCommand.splice(0);
                delete g._objWS
            }
            g.bReady = false
        }
        if (f) {
            f.innerHTML = ""
        }
    }
})(Dynamsoft.Lib);
(function(c) {
    if (!c.product.bChromeEdition) {
        return
    }
    var e = c.html5.Funs,
        d = 0,
        f = 1,
        a = 1,
        b = function(h, g, l, j) {
            var k;
            if (l !== d && l !== f) {
                k = l
            } else {
                k = {};
                if (l) {
                    k.set = j ? function(m) {
                        var n = m * 1;
                        return h._innerFun(g, e.makeParams(n))
                    } : function(m) {
                        return h._innerFun(g, e.makeParams(m))
                    }
                }
            }
            if (!k.get) {
                k.get = function() {
                    return h._innerFun(g)
                }
            }
            Object.defineProperty(h, g, k)
        };
    c.DynamicLoadAddonFuns = [];
    c.attachAddon = function(g) {
        c.each(c.DynamicLoadAddonFuns, function(h) {
            if (c.isFunction(h)) {
                h(g)
            }
        })
    };
    Dynamsoft.Lib.attachProperty = function(g) {
        var h = g;
        b(h, "ErrorCode", {
            get: function() {
                return h._errorCode
            }
        });
        b(h, "ErrorString", {
            get: function() {
                if (h._errorCode == -2207) {
                    if (h.__bMustUpgradeService) {
                        c.Errors.MustUpgradeService(h)
                    }
                }
                if (h._errorCode != 0) {
                    return h._errorString
                }
                return "Successful."
            }
        });
        b(h, "LogLevel", f, a);
        b(h, "Manufacturer", f);
        b(h, "ProductFamily", f);
        b(h, "ProductKey", {
            get: function() {
                return Dynamsoft.WebTwainEnv.ProductKey
            },
            set: function(j) {
                Dynamsoft.WebTwainEnv.ProductKey = j;
                var k = h._innerFun("ProductKey", e.makeParams(j));
                h.__licenseInfo = false;
                h.GetLicenseInfo();
                return k
            }
        });
        b(h, "ProductName", {
            get: function() {
                return h.__strProductName
            },
            set: function(j) {
                h.__strProductName = j;
                return true
            }
        });
        b(h, "VersionInfo", {
            get: function() {
                return h.__versionInfo
            }
        });
        b(h, "BitDepth", f);
        b(h, "Brightness", f);
        b(h, "Contrast", f);
        b(h, "CurrentSourceName", d);
        b(h, "DataSourceStatus", d);
        b(h, "DefaultSourceName", {
            get: function() {
                var j;
                if (h.__defaultSourceName == "" || h.__sourceCount == -1) {
                    j = h.SourceCount
                }
                return h.__defaultSourceName
            }
        });
        b(h, "Duplex", d);
        b(h, "IfAppendImage", f);
        b(h, "IfAutoBright", f);
        b(h, "IfAutoDiscardBlankpages", f);
        b(h, "IfAutoFeed", f);
        b(h, "IfAutomaticBorderDetection", f);
        b(h, "IfAutomaticDeskew", f);
        b(h, "IfAutoScan", f);
        b(h, "IfDisableSourceAfterAcquire", f);
        b(h, "IfDuplexEnabled", f);
        b(h, "IfFeederEnabled", f);
        b(h, "IfFeederLoaded", d);
        b(h, "IfModalUI", f);
        b(h, "IfPaperDetectable", d);
        b(h, "IfScanInNewThread", f);
        Object.defineProperty(h, "IfShowCancelDialogWhenImageTransfer", {
            get: function() {
                return h.__IfShowCancelDialogWhenImageTransfer
            },
            set: function(j) {
                return h.__IfShowCancelDialogWhenImageTransfer = j
            }
        });
        b(h, "IfShowUI", f);
        b(h, "IfShowIndicator", f);
        b(h, "IfUseTwainDSM", f);
        b(h, "IfUIControllable", d);
        b(h, "ImageBitsPerPixel", d);
        b(h, "ImageCaptureDriverType", f);
        b(h, "ImageLayoutDocumentNumber", d);
        b(h, "ImageLayoutFrameBottom", d);
        b(h, "ImageLayoutFrameLeft", d);
        b(h, "ImageLayoutFrameNumber", d);
        b(h, "ImageLayoutFrameRight", d);
        b(h, "ImageLayoutFrameTop", d);
        b(h, "ImageLayoutPageNumber", d);
        b(h, "ImageLength", d);
        b(h, "ImagePixelType", d);
        b(h, "ImageWidth", d);
        b(h, "ImageXResolution", d);
        b(h, "ImageYResolution", d);
        b(h, "MagData", d);
        b(h, "MagType", d);
        b(h, "PageSize", f, a);
        b(h, "PendingXfers", d);
        b(h, "PixelFlavor", f);
        b(h, "PixelType", f);
        b(h, "Resolution", f, a);
        b(h, "SourceCount", {
            get: function() {
                var k = h._innerFunRaw("GetSourceNames"),
                    j = k.length - 1;
                if (h._errorCode != 0) {
                    return 0
                }
                if (j <= 0) {
                    h.__sourceName = [];
                    h.__defaultSourceName = "";
                    h.__sourceCount = -1;
                    return 0
                } else {
                    if (j == 1) {
                        if (k[0] == "") {
                            h.__sourceName = [];
                            h.__defaultSourceName = "";
                            h.__sourceCount = 0;
                            return 0
                        }
                    }
                }
                h.__defaultSourceName = k[k.length - 1];
                k.splice(k.length - 1, 1);
                h.__sourceName = k;
                h.__sourceCount = j;
                return j
            }
        });
        b(h, "TransferMode", f);
        b(h, "Unit", f);
        b(h, "XferCount", f, a);
        b(h, "Capability", f);
        b(h, "CapCurrentIndex", f);
        b(h, "CapCurrentValue", f);
        b(h, "CapDefaultIndex", d);
        b(h, "CapDefaultValue", d);
        b(h, "CapDescription", f);
        b(h, "CapMaxValue", f);
        b(h, "CapMinValue", f);
        b(h, "CapNumItems", f);
        b(h, "CapStepSize", f);
        b(h, "CapType", f);
        b(h, "CapValue", f);
        b(h, "CapValueString", f);
        b(h, "CapValueType", f);
        b(h, "AllowMultiSelect", {
            get: function() {
                return h._UIManager.getView().GetAllowMultiSelect()
            },
            set: function(j) {
                h._UIManager.getView().SetAllowMultiSelect(j)
            }
        });
        b(h, "BackgroundColor", {
            get: function() {
                return h._UIManager.GetBackgroundColor()
            },
            set: function(j) {
                return h._UIManager.SetBackgroundColor(j)
            }
        });
        b(h, "BackgroundFillColor", f);
        b(h, "BlankImageCurrentStdDev", d);
        b(h, "BlankImageMaxStdDev", f);
        b(h, "BlankImageThreshold", f);
        b(h, "CurrentImageIndexInBuffer", {
            get: function() {
                return h.__cIndex
            },
            set: function(j) {
                var k = j * 1;
                if (k >= 0 && k < h._UIManager.count()) {
                    if (k != h.__cIndex) {
                        h._innerSendCmd("CurrentImageIndexInBuffer", e.makeParams(k))
                    }
                    h.__cIndex = k;
                    h._UIManager.getView().Go(h.__cIndex);
                    e.__innerRefreshFromUIView(h, h.__cIndex, true)
                }
                return true
            }
        });
        b(h, "FitWindowType", {
            get: function() {
                return h._UIManager.getView().GetFitWindowType()
            },
            set: function(j) {
                var k = j * 1;
                return h._UIManager.getView().SetFitWindowType(k)
            }
        });
        b(h, "HowManyImagesInBuffer", {
            get: function() {
                return h._HowManyImagesInBuffer
            }
        });
        b(h, "IfFitWindow", {
            get: function() {
                return h._UIManager.getView().GetIfFitWindow()
            },
            set: function(j) {
                if (j) {
                    return h._UIManager.getView().SetIfFitWindow(true)
                } else {
                    return h._UIManager.getView().SetIfFitWindow(false)
                }
            }
        });
        b(h, "ImageMargin", {
            get: function() {
                return h._UIManager.getView().GetImageMargin()
            },
            set: function(j) {
                return h._UIManager.getView().SetImageMargin(j)
            }
        });
        b(h, "MaxImagesInBuffer", f);
        b(h, "MouseX", {
            get: function() {
                return h.__MouseX
            }
        });
        b(h, "MouseY", {
            get: function() {
                return h.__MouseY
            }
        });
        b(h, "SelectedImagesCount", {
            get: function() {
                if (h._UIManager.count() <= 0) {
                    return 0
                }
                if (h.__SelectedImagesCount == 0) {
                    return 1
                }
                return h.__SelectedImagesCount
            },
            set: function(k) {
                var l, j = k * 1;
                if (h._UIManager.count() <= 0) {
                    j = 0
                } else {
                    if (j < 1) {
                        j = 1
                    }
                }
                h.__SelectedImagesCount = j;
                h._UIManager.getView().SetSelectedImageCount(j);
                return h._innerFun("SelectedImagesCount", e.makeParams(j))
            }
        });
        b(h, "SelectionImageBorderColor", {
            get: function() {
                return h._UIManager.GetSelectionImageBorderColor()
            },
            set: function(j) {
                return h._UIManager.SetSelectionImageBorderColor(j)
            }
        });
        b(h, "Zoom", {
            get: function() {
                return h._UIManager.getView().GetZoom()
            },
            set: function(j) {
                return h._UIManager.getView().SetZoom(j)
            }
        });
        b(h, "MouseShape", {
            get: function() {
                var j = h._UIManager.getView().GetMouseShape();
                return (j == EnumDWT_MouseShape.Hand)
            },
            set: function(j) {
                var k = EnumDWT_MouseShape.Default;
                if (j) {
                    k = EnumDWT_MouseShape.Hand
                }
                return h._UIManager.getView().SetMouseShape(k)
            }
        });
        b(h, "HTTPPostResponseString", {
            get: function() {
                if (h.__HTTPPostResponseString) {
                    return h.__HTTPPostResponseString
                } else {
                    return ""
                }
            }
        });
        b(h, "FTPPassword", f);
        b(h, "FTPPort", {
            get: function() {
                return h._innerFun("FTPPort")
            },
            set: function(j) {
                if (j !== "") {
                    var k = j * 1;
                    return h._innerFun("FTPPort", e.makeParams(k))
                }
            }
        });
        b(h, "FTPUserName", f);
        b(h, "IfPASVMode", f);
        b(h, "IfShowProgressBar", {
            get: function() {
                return h.__IfShowProgressBar
            },
            set: function(j) {
                return h.__IfShowProgressBar = j
            }
        });
        b(h, "ProxyServer", f);
        b(h, "IfShowFileDialog", f);
        b(h, "IfTiffMultiPage", f);
        b(h, "PDFAuthor", f);
        b(h, "PDFCompressionType", f);
        b(h, "PDFCreationDate", f);
        b(h, "PDFCreator", f);
        b(h, "PDFKeywords", f);
        b(h, "PDFModifiedDate", f);
        b(h, "PDFProducer", f);
        b(h, "PDFSubject", f);
        b(h, "PDFTitle", f);
        b(h, "PDFVersion", f);
        b(h, "TIFFCompressionType", f);
        b(h, "JPEGQuality", {
            get: function() {
                return h._innerFun("JPEGQuality")
            },
            set: function(j) {
                var k = j * 1;
                if (k >= 100) {
                    k = 100
                }
                return h._innerFun("JPEGQuality", e.makeParams(k))
            }
        });
        b(h, "HttpContentTypeFieldValue", {
            get: function() {
                return h.__strHttpContentTypeFieldValue
            },
            set: function(j) {
                h.__strHttpContentTypeFieldValue = j;
                return j
            }
        });
        b(h, "SelectionRectAspectRatio", {
            get: function() {
                return h._UIManager.GetSelectionRectAspectRatio()
            },
            set: function(j) {
                var k = parseFloat(j);
                if (k >= 0) {
                    h._UIManager.SetSelectionRectAspectRatio(k);
                    return true
                }
                return false
            }
        });
        b(h, "IfAllowLocalCache", f);
        b(h, "_AutoCropMethod", f);
        b(h, "BrokerProcessType", {
            get: function() {
                return 1
            },
            set: function(j) {
                return true
            }
        });
        b(h, "BorderStyle", {
            get: function() {
                return 0
            },
            set: function(j) {
                return false
            }
        });
        b(h, "IfSSL", f);
        b(h, "AllowPluginAuthentication", f);
        b(h, "HttpFieldNameOfUploadedImage", {
            get: function() {
                return h.__remoteFilename
            },
            set: function(j) {
                return h.__remoteFilename = j
            }
        });
        b(h, "MaxInternetTransferThreads", f);
        b(h, "MaxUploadImageSize", f);
        b(h, "style", {
            get: function() {
                return h.__style
            }
        });
        b(h, "Addon", {
            get: function() {
                return h.__addon
            }
        });
        b(h, "BufferMemoryLimit", f);
        b(h, "Width", {
            get: function() {
                return h._width
            },
            set: function(j) {
                var l = false;
                if (Dynamsoft.Lib.isString(j)) {
                    if (j.length > 0) {
                        if (j.charAt(j.length - 1) === "%") {
                            l = j
                        }
                    }
                }
                if (!l && j) {
                    var k = parseInt(j);
                    if (k) {
                        l = k + "px"
                    }
                }
                if (l) {
                    h._width = l;
                    return e.changeImageUISize(h, l, false)
                }
                return false
            }
        });
        b(h, "Height", {
            get: function() {
                return h._height
            },
            set: function(j) {
                var l = false;
                if (Dynamsoft.Lib.isString(j)) {
                    if (j.length > 0) {
                        if (j.charAt(j.length - 1) === "%") {
                            l = j
                        }
                    }
                }
                if (!l && j) {
                    var k = parseInt(j);
                    if (k) {
                        l = k + "px"
                    }
                }
                if (l) {
                    h._height = l;
                    return e.changeImageUISize(h, false, l)
                }
                return false
            }
        });
        b(h, "ShowPageNumber", {
            get: function() {
                return h._UIManager.getView().GetShowPageNumber()
            },
            set: function(j) {
                return h._UIManager.getView().SetShowPageNumber(j)
            }
        });
        b(h, "IfAutoScroll", {
            get: function() {
                return h._UIManager.getView().GetIfAutoScroll()
            },
            set: function(j) {
                return h._UIManager.getView().SetIfAutoScroll(j)
            }
        });
        b(h, "ImageEditorIfEnableEnumerator", {
            get: function() {
                return true
            },
            set: function(j) {
                return true
            }
        });
        b(h, "ImageEditorIfReadonly", {
            get: function() {
                return true
            },
            set: function(j) {
                return true
            }
        });
        b(h, "ImageEditorIfModal", {
            get: function() {
                return true
            },
            set: function(j) {
                return true
            }
        });
        b(h, "ImageEditorWindowTitle", {
            get: function() {
                return true
            },
            set: function(j) {
                return true
            }
        });
        b(h, "EnableInteractiveZoom", {
            get: function() {
                return true
            },
            set: function(j) {
                return true
            }
        });
        b(h, "IfShowPrintUI", {
            get: function() {
                return true
            },
            set: function(j) {
                return true
            }
        });
        b(h, "VScrollBar", {
            get: function() {
                return true
            },
            set: function(j) {
                return true
            }
        });
        b(h, "AsyncMode", {
            get: function() {
                return true
            },
            set: function(j) {
                return true
            }
        });
        b(h, "IfThrowException", {
            get: function() {
                return true
            },
            set: function(j) {
                return true
            }
        });
        b(h, "IfOpenImageWithGDIPlus", {
            get: function() {
                return true
            },
            set: function(j) {
                return true
            }
        })
    }
})(Dynamsoft.Lib);
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    var c = a.html5.STwain,
        b = c.prototype,
        d = a.html5.Funs;
    b.__innerLoadImage = function(e, k, j, h, g, f) {
        var l = this;
        if (!a.html5.Funs.checkProductKey(l, {
                Core: true
            })) {
            if (a.isFunction(f)) {
                f(l._errorCode, l._errorString)
            }
            return false
        }
        if (!a.html5.Funs.checkPDFProductKeyWhenNeeds(l, j)) {
            if (a.isFunction(f)) {
                f(l._errorCode, l._errorString)
            }
            return false
        }
        if (a.isFunction(g)) {
            return l.__innerAcquireImage(e, k, h, g, f)
        } else {
            return l.__innerLoadImageFun(e, k)
        }
    };
    b.__innerLoadImageFun = function(e, g) {
        var h = this;
        if (d.isServerInvalid(h)) {
            return false
        }
        var f = h._innerFun(e, g);
        if (f) {
            h._HowManyImagesInBuffer = h._innerFun("HowManyImagesInBuffer");
            h.__cIndex = h._innerFun("CurrentImageIndexInBuffer")
        }
        if (h.__cIndex >= 0) {
            if (f) {
                h._UIManager.refreshEditor(h.__cIndex, h._UIManager.count())
            }
            h.OnRefreshUI(h.__cIndex)
        }
        return f
    };
    b.__innerAcquireImage = function(f, l, j, h, g) {
        var n = this,
            e = (f == "LoadImage" || f == "LoadImageEx");
        var k = function(m) {
            n.__bLoadingImage = false;
            var p = n.__cIndex;
            if (p >= 0) {
                n.OnRefreshUI(p)
            }
            if (a.isFunction(g)) {
                g(n.ErrorCode, n.ErrorString)
            }
            if (e) {
                Dynamsoft.Lib.closeProgress(f)
            } else {
                d.hideMask(f)
            }
            if (m) {
                Dynamsoft.Lib.log(m)
            }
            return false
        };
        if (d.isServerInvalid(n)) {
            k();
            return false
        }
        if (e) {
            Dynamsoft.Lib.showProgress(n, f, false)
        } else {
            d.showMask(f)
        }
        n._innerSend(f, l, true, function() {
            n.__bLoadingImage = false;
            if (e) {
                Dynamsoft.Lib.closeProgress(f);
                var m = n._UIManager.GetCurrentImageIndex();
                if (m >= 0) {
                    n._UIManager.refreshEditor(m, n._UIManager.count());
                    n.OnRefreshUI(m)
                }
            } else {
                d.hideMask(f)
            }
            if (a.isFunction(h)) {
                h()
            }
        }, k);
        return true
    };
    b.__innerSaveImage = function(e, g, f, h) {
        return this.__innerProgressFunction(e, g, false, f, h)
    };
    b.__innerFTPDownloadDirectly = function(e, h, g, f, k) {
        var j = this;
        if (!a.html5.Funs.checkProductKey(j, {
                Core: true
            })) {
            if (a.isFunction(k)) {
                k(j._errorCode, j._errorString)
            }
            return false
        }
        if (!a.html5.Funs.checkPDFProductKeyWhenNeeds(j, g)) {
            if (a.isFunction(k)) {
                k(j._errorCode, j._errorString)
            }
            return false
        }
        a.cancelFrome = 4;
        return j.__innerProgressFunction(e, h, true, f, k)
    };
    b.__innerFTPDownload = function(e, k, j, h, n) {
        var l = this,
            g;
        if (!a.html5.Funs.checkProductKey(l, {
                Core: true
            })) {
            if (a.isFunction(n)) {
                n(l._errorCode, l._errorString)
            }
            return false
        }
        if (!a.html5.Funs.checkPDFProductKeyWhenNeeds(l, j)) {
            if (a.isFunction(n)) {
                n(l._errorCode, l._errorString)
            }
            return false
        }
        a.cancelFrome = 4;
        if (a.isFunction(n)) {
            return l.__innerProgressFunction(e, k, true, function() {
                var m = l.__cIndex;
                if (m >= 0) {
                    l.OnRefreshUI(m)
                }
                if (a.isFunction(h)) {
                    h()
                }
            }, n)
        } else {
            g = l._innerFun(e, k);
            var f = l.__cIndex;
            if (f >= 0) {
                l.OnRefreshUI(f)
            }
            return g
        }
    };
    b.__innerFTPUpload = function(e, g, f, h) {
        Dynamsoft.Lib.cancelFrome = 3;
        return this.__innerProgressFunction(e, g, true, f, h)
    };
    b.__innerProgressFunction = function(e, j, f, g, l) {
        var k = this;
        if (!a.isFunction(l)) {
            return this._innerFun(e, j)
        }
        var h = function(m) {
            if (a.isFunction(l)) {
                l(k.ErrorCode, k.ErrorString)
            }
            Dynamsoft.Lib.closeProgress(e);
            if (m) {
                Dynamsoft.Lib.log(m)
            }
            return true
        };
        Dynamsoft.Lib.showProgress(k, e, f);
        return this._innerSend(e, j, true, function() {
            Dynamsoft.Lib.closeProgress(e);
            if (a.isFunction(g)) {
                g()
            }
        }, h)
    };
    b.__innerGetBarcodeResultAsyncFunction = function(f) {
        var e = Dynamsoft.Lib.NewBarcodeResult();
        if (f) {
            e._errorCode = f.exception;
            e._errorString = f.description;
            e._resultlist = f.result;
            e._Count = f.result.length
        }
        return e
    };
    b.__innerGetOCRResultAsyncFunction = function(f) {
        var e = Dynamsoft.Lib.NewOCRResult(this);
        if (f) {
            e._errorCode = f.exception;
            e._errorString = f.description;
            e._resultlist = f.result
        }
        return e
    };
    b.__innerGetOCRProResultAsyncFunction = function(f) {
        var e = Dynamsoft.Lib.NewOCRProResult(this);
        if (f) {
            e._errorCode = f.code;
            e._errorString = f.message;
            e._request = f.request;
            e._errorlist = f.errorList;
            e._ocrTotalCount = f.ocrTotalCount;
            e._alreadyOCRCount = f.alreadyOCRCount;
            e._resultlist = f.resultDetail
        }
        return e
    };
    b._innerSendCmd = function(e, f) {
        var g = this;
        if (d.isHttpServerInvalid(g)) {
            return false
        }
        g._innerFunRaw(e, f, true, false, false)
    };
    b._innerFun = function(e, g) {
        var h = this,
            f;
        if (d.isHttpServerInvalid(h)) {
            return false
        }
        f = h._innerFunRaw(e, g, false, false, false);
        if (Dynamsoft.Lib.isArray(f)) {
            return f[0]
        }
        return f
    };
    b._innerFunRaw = function(h, g, r, j, s, t, f) {
        var n = this,
            e, u, l;
        if (d.isHttpServerInvalid(n)) {
            return false
        }
        n._errorCode = 0;
        n._errorString = "";
        e = [n.httpUrl, "f/", h, "?", d.getRandom()].join("");
        u = d.getJson(n, h, g, 0);
        var q, k = false;
        if (r) {
            k = true
        } else {}
        l = {
            method: "POST",
            url: e,
            data: u,
            async: k,
            onSuccess: function(v, p, m) {
                var w = false;
                try {
                    if (a.isString(v) && m.getResponseHeader("content-type") === "text/json") {
                        w = a.parse(v)
                    } else {
                        w = v
                    }
                } catch (x) {}
                if (w) {
                    if (w.exception !== undefined && w.description !== undefined) {
                        n._errorCode = w.exception;
                        n._errorString = w.description
                    } else {
                        n._errorCode = 0;
                        n._errorString = ""
                    }
                    if (s) {
                        q = w
                    } else {
                        q = w.result
                    }
                } else {
                    Dynamsoft.Lib.Errors.InvalidResultFormat(n);
                    q = ""
                }
                if (a.isFunction(t)) {
                    t(q)
                }
            },
            onError: function() {
                Dynamsoft.Lib.Errors.NetworkError(n);
                q = "";
                if (a.isFunction(f)) {
                    f()
                }
            }
        };
        if (j) {
            if (Dynamsoft.Lib.env.bIE) {
                l.dataType = "arraybuffer";
                l.onSuccess = function(B, D, w) {
                    var p, y, C = false;
                    if (w.responseHeadersString) {
                        var v = w.responseHeadersString;
                        if (v.indexOf("text/json") != -1) {
                            C = true
                        }
                    }
                    p = w.responseData;
                    n._errorCode = 0;
                    n._errorString = "";
                    q = false;
                    if (p) {
                        y = new Uint8Array(p);
                        if (C) {
                            p = String.fromCharCode.apply(null, y)
                        } else {
                            q = new Blob([y], {
                                type: n.__strHttpContentTypeFieldValue
                            })
                        }
                    }
                    if (!p || C) {
                        var A, z, m = false;
                        if (C) {
                            A = p
                        } else {
                            A = w.responseText
                        }
                        z = A.length;
                        if (z > 0) {
                            if (A.charAt(0) == "{") {
                                try {
                                    m = a.parse(A);
                                    C = true
                                } catch (x) {
                                    Dynamsoft.Lib.log(A)
                                }
                            }
                            if (C) {
                                if (m.exception !== undefined && m.description !== undefined) {
                                    n._errorCode = m.exception;
                                    n._errorString = m.description;
                                    q = false
                                } else {
                                    q = true
                                }
                            } else {
                                y = new Uint8Array(A);
                                q = new Blob([y], {
                                    type: n.__strHttpContentTypeFieldValue
                                })
                            }
                        }
                    }
                }
            } else {
                l.contentType = "text/plain; charset=x-user-defined";
                l.mimeType = "text/plain; charset=x-user-defined";
                l.onSuccess = function(A, C, p) {
                    var y, v, z;
                    y = p.responseText;
                    v = y.length;
                    n._errorCode = 0;
                    n._errorString = "";
                    if (v > 0) {
                        var B = false,
                            m;
                        if (y.charAt(0) == "{") {
                            try {
                                m = a.parse(y);
                                B = true
                            } catch (w) {
                                Dynamsoft.Lib.log(y)
                            }
                        }
                        if (B) {
                            if (m.exception !== undefined && m.description !== undefined) {
                                n._errorCode = m.exception;
                                n._errorString = m.description;
                                q = false
                            } else {
                                q = true
                            }
                        } else {
                            z = new Uint8Array(v);
                            for (var x = 0; x < v; x++) {
                                z[x] = y.charCodeAt(x)
                            }
                            q = new Blob([z], {
                                type: n.__strHttpContentTypeFieldValue
                            })
                        }
                    } else {
                        q = ""
                    }
                }
            }
        }
        if (!k) {
            a.mix(l, {
                headers: {
                    "X-Requested-With": false
                }
            })
        }
        if (a.env.bFileSystem) {
            l.crossDomain = false
        }
        new a.ajax(l);
        return q
    };
    b._innerSend = function(j, f, h, l, r) {
        var n = this,
            g = n._objWS,
            s = false,
            k = false,
            e = false;
        if (j != "ActiveUI") {
            e = d.isServerInvalid(n)
        }
        if (e) {
            if (a.isFunction(r)) {
                r()
            }
            return true
        }
        if (a.isFunction(l)) {
            k = l
        }
        if (a.isFunction(r)) {
            s = r
        }
        var t = d.generateCmdId(),
            q;
        if (j == "SaveSelectedImagesToBytes") {
            n.curCommand_SaveImagesToBytes.push({
                cmdId: t,
                sFun: k,
                fFun: s,
                objWS: g,
                json: d.getJson(n, j, f, t),
                binary: h
            });
            if (n.curCommand_SaveImagesToBytes.length == 1) {
                q = d.sendData(g, d.getJson(n, j, f, t), false, h)
            } else {
                q = true
            }
        } else {
            n.curCommand.push({
                cmd: j,
                cmdId: t,
                sFun: k,
                fFun: s
            });
            q = d.sendData(g, d.getJson(n, j, f, t), false, h)
        }
        return q
    };
    b.__SaveSelectedImagesToBytes = function(k, j, g, l, p, f) {
        var m = this;
        if (l) {
            return m.__SaveSelectedImagesToBytesByBlock(k, j, g, p, f)
        } else {
            if (j <= 0 && g <= 0) {
                if (a.isFunction(f)) {
                    f()
                }
                return false
            }
            var n = false,
                h = true,
                e = m._innerFunRaw("SaveSelectedImagesToBytes", d.makeParams(k, -2, "", j, g), n, h, false);
            if (m.ErrorCode == 0) {
                return p(e, j)
            } else {
                if (a.isFunction(f)) {
                    f()
                }
                return false
            }
        }
    };
    b.__GetSelectedImagesLength = function(g, l, m, e) {
        var h = this;
        var k = false,
            f = false,
            n = false,
            j = h._innerFunRaw("SaveSelectedImagesToBytes", d.makeParams(g, l, "", 0, 0), k, f, n);
        if (h.ErrorCode == 0) {
            if (a.isFunction(m)) {
                if (a.isArray(j)) {
                    m(j[0])
                } else {
                    m(j)
                }
            }
            return true
        } else {
            if (a.isFunction(e)) {
                e()
            }
            return false
        }
    };
    b.__SaveSelectedImagesToBytesByBlock = function(g, h, f, e, k) {
        var j = this;
        if (h <= 0 && f <= 0) {
            if (a.isFunction(k)) {
                k()
            }
            return false
        }
        return j._innerSend("SaveSelectedImagesToBytes", d.makeParams(g, -2, "", h, f), true, function(l) {
            if (a.isFunction(e)) {
                e(l, h)
            }
        }, k)
    };
    b.__SaveLocalFileToBytes = function(g, e, j, m) {
        var l = this;
        if (e) {
            return l._innerSend("SaveSelectedImagesToBytes", d.makeParams(0, 0, g), true, j, m)
        } else {
            var k = false,
                h = true,
                f = l._innerFunRaw("SaveSelectedImagesToBytes", d.makeParams(0, 0, g), k, h, false);
            if (l.ErrorCode == 0) {
                return j(f)
            } else {
                m();
                return false
            }
        }
    };
    b.__LoadImageFromBytes = function(v, l, r, n, u, h, j, w) {
        var q = this,
            k = "LoadImageFromBytes",
            z = l || 3,
            s = v.size || v.length,
            g, e = d.isServerInvalid(q),
            y = true;
        if (!isNaN(j) && j >= 0 && !isNaN(w) && w > 0) {
            g = ["[", s, ",", 0, ",", z, ',"', r, '", ', j, ",", w, "]"].join("")
        } else {
            g = ["[", s, ",", 0, ",", z, ',"', r, '"]'].join("")
        }
        var x = function() {
            Dynamsoft.Lib.closeProgress(k);
            q.__bLoadingImage = false;
            if (y) {
                var f = q.__cIndex;
                if (f >= 0) {
                    q.OnRefreshUI(f)
                }
            }
            if (a.isFunction(h)) {
                h(q._errorCode, q._errorString)
            }
            return false
        };
        if (e) {
            y = false;
            return x()
        }
        if (!a.html5.Funs.checkProductKey(q, {
                Core: true
            })) {
            y = false;
            return x()
        }
        if (!a.html5.Funs.checkPDFProductKeyWhenNeeds(q, l)) {
            y = false;
            return x()
        }
        if (s === 0) {
            Dynamsoft.Lib.Errors.ImageFileLengthCannotZero(q);
            y = false;
            return x()
        }
        d.setBtnCancelVisibleForProgress(q, false);
        return this._innerSendBlob(k, g, v, n, function() {
            if (j + s == w || w <= 0 || isNaN(w)) {
                Dynamsoft.Lib.closeProgress(k)
            }
            q.__bLoadingImage = false;
            var f = q._UIManager.GetCurrentImageIndex();
            if (n && f >= 0) {
                q._UIManager.refreshEditor(f, q._UIManager.count());
                q.OnRefreshUI(f)
            }
            if (a.isFunction(u)) {
                u()
            }
            return true
        }, x)
    };
    b._innerSendBlob = function(h, f, t, l, k, s) {
        var q = this,
            g = q._objWS,
            j = false,
            u = false;
        if (d.isServerInvalid(q)) {
            if (a.isFunction(s)) {
                s()
            }
            return false
        }
        if (a.isFunction(k)) {
            j = k
        }
        if (a.isFunction(s)) {
            u = s
        }
        if (l) {
            var v = d.generateCmdId();
            q.curCommand.push({
                cmd: h,
                cmdId: v,
                sFun: j,
                fFun: u
            });
            d.sendData(g, d.getJson(q, h, f, v), t, true)
        } else {
            var r, e, w, n;
            if (d.isHttpServerInvalid(q)) {
                return false
            }
            q._errorCode = 0;
            q._errorString = "";
            e = [q.httpUrl, "f/", h, "?", d.getRandom()].join("");
            w = d.getJson(q, h, f, 0);
            w += "\r\n\r\n";
            w += Dynamsoft.Lib.base64.encodeArray(t);
            n = {
                method: "post",
                url: e,
                processData: false,
                data: w,
                async: false,
                onSuccess: function(x, p, m) {
                    var y = false;
                    try {
                        if (a.isString(x) && m.getResponseHeader("content-type") === "text/json") {
                            y = a.parse(x)
                        } else {
                            y = x
                        }
                    } catch (z) {}
                    if (y !== undefined && y !== null) {
                        if (y.exception !== undefined && y.description !== undefined) {
                            q._errorCode = y.exception;
                            q._errorString = y.description
                        } else {
                            q._errorCode = 0;
                            q._errorString = ""
                        }
                        r = y.result
                    } else {
                        Dynamsoft.Lib.Errors.InvalidResultFormat(q);
                        r = ""
                    }
                },
                onError: function() {
                    Dynamsoft.Lib.Errors.NetworkError(q);
                    r = ""
                }
            };
            a.mix(n, {
                headers: {
                    "X-Requested-With": false
                }
            });
            if (a.env.bFileSystem) {
                n.crossDomain = false
            }
            new a.ajax(n);
            if (q._errorCode == 0) {
                if (a.isFunction(j)) {
                    j()
                }
            } else {
                if (a.isFunction(u)) {
                    u()
                }
            }
            return r
        }
    };
    b._innerActiveUI = function(f, e) {
        this._innerSend("ActiveUI", d.makeParams(Dynamsoft.Lib.env.WSVersion, Dynamsoft.Lib.env.WSSession), false, f, e)
    };
    b._innerSetSize = function(e, j) {
        var l = this,
            g = false,
            k = false;
        if (Dynamsoft.Lib.isString(e)) {
            if (e.length > 0) {
                if (e.charAt(e.length - 1) === "%") {
                    g = e
                }
            }
        }
        if (!g && e) {
            var f = parseInt(e);
            if (f) {
                g = f + "px"
            }
        }
        if (Dynamsoft.Lib.isString(j)) {
            if (j.length > 0) {
                if (j.charAt(j.length - 1) === "%") {
                    k = j
                }
            }
        }
        if (!k && j) {
            var f = parseInt(j);
            if (f) {
                k = f + "px"
            }
        }
        if (g) {
            l._width = g
        }
        if (k) {
            l._height = k
        }
        return d.changeImageUISize(l, g, k)
    }
})(Dynamsoft.Lib);
(function(b) {
    if (!b.product.bChromeEdition) {
        return
    }
    var d = b.html5.STwain,
        c = d.prototype,
        e = b.html5.Funs,
        a = ["OnPreAllTransfers", "OnPreTransfer", "OnPostTransfer"];
    c.LoadDibFromClipboard = function(h, f) {
        var g = -1;
        return this.__innerLoadImage("LoadDibFromClipboard", null, g, true, h, f)
    };
    c.LoadImage = function(h, l, g) {
        var j = e.replaceLocalFilename(h),
            k = b.html5.Funs.getImageType(j);
        return this.__innerLoadImage("LoadImage", e.makeParams(j), k, true, l, g)
    };
    c.LoadImageEx = function(j, k, m, h) {
        var l = e.replaceLocalFilename(j),
            g = k;
        if (g == EnumDWT_ImageType.IT_ALL) {
            g = -1
        }
        return this.__innerLoadImage("LoadImageEx", e.makeParams(l, g), g, true, m, h)
    };
    c.EnableSource = function(g, h, f) {
        return this.AcquireImage(g, h, f)
    };
    c.AcquireImage = function(p, n, m) {
        var j = this,
            l = null,
            f = null,
            q, k;
        if (b.isUndefined(m) && (b.isFunction(p) && b.isFunction(n) || b.isFunction(p) && b.isUndefined(n) || b.isFunction(p) && n == null || p == null && b.isFunction(n))) {
            k = {};
            if (b.isFunction(p)) {
                l = p
            }
            if (b.isFunction(n)) {
                f = n
            }
        } else {
            if (b.isUndefined(p) || p == null) {
                k = {}
            } else {
                k = p
            }
            if (b.isFunction(n)) {
                l = n
            }
            if (b.isFunction(m)) {
                f = m
            }
        }
        if (e.isServerInvalid(j)) {
            if (b.isFunction(f)) {
                f(j._errorCode, j._errorString)
            }
            return false
        }
        if (!b.html5.Funs.checkProductKey(j, {
                Core: true
            })) {
            if (b.isFunction(f)) {
                f(j._errorCode, j._errorString)
            }
            return false
        }
        var h = 0;
        for (var g = 0; g < a.length; g++) {
            var r = ["__", a[g]].join("");
            if (b.isFunction(j[r])) {
                h = h | (1 << g)
            }
        }
        k.EnableEvents = h;
        q = ["[", b.stringify(k), "]"].join("");
        return j.__innerAcquireImage("AcquireImage", q, false, l, f)
    };
    c.CancelAllPendingTransfers = function() {
        return this._innerFun("CancelAllPendingTransfers")
    };
    c.CloseSource = function() {
        return this._innerFun("CloseSource")
    };
    c.CloseSourceManager = function() {
        return this._innerFun("CloseSourceManager")
    };
    c.DisableSource = function() {
        return this._innerFun("DisableSource")
    };
    c.FeedPage = function() {
        return this._innerFun("FeedPage")
    };
    c.GetDeviceType = function() {
        return this._innerFun("GetDeviceType")
    };
    c.GetSourceNameItems = function(f) {
        if (this.__sourceCount < 0) {
            this.SourceCount
        }
        if (f < this.__sourceCount && f >= 0) {
            return this.__sourceName[f]
        } else {
            return ""
        }
    };
    c.SourceNameItems = function(f) {
        if (this.__sourceCount < 0) {
            this.SourceCount
        }
        if (f < this.__sourceCount && f >= 0) {
            return this.__sourceName[f]
        } else {
            return ""
        }
    };
    c.GetSourceNames = function() {
        var g = this,
            f = g._innerFunRaw("GetSourceNames");
        if (g._errorCode != 0) {
            return []
        }
        return f
    };
    c.GetSourceType = function(f) {
        return this._innerFun("GetSourceType", e.makeParams(f))
    };
    c.OpenSource = function() {
        return this._innerFun("OpenSource")
    };
    c.OpenSourceManager = function() {
        return this._innerFun("OpenSourceManager")
    };
    c.ResetImageLayout = function() {
        return this._innerFun("ResetImageLayout")
    };
    c.RewindPage = function() {
        return this._innerFun("RewindPage")
    };
    c.SelectSource = function() {
        return this._innerFun("SelectSource")
    };
    c.SelectSourceByIndex = function(f) {
        return this._innerFun("SelectSourceByIndex", e.makeParams(f))
    };
    c.SetFileXferInfo = function(g, j) {
        var h = e.replaceLocalFilename(g);
        return this._innerFun("SetFileXferInfo", e.makeParams(h, j))
    };
    c.SetImageLayout = function(j, h, g, f) {
        return this._innerFun("SetImageLayout", e.makeParams(j, h, g, f))
    };
    c.CapGet = function() {
        return this._innerFun("CapGet")
    };
    c.CapGetCurrent = function() {
        return this._innerFun("CapGetCurrent")
    };
    c.CapGetDefault = function() {
        return this._innerFun("CapGetDefault")
    };
    c.CapGetFrameBottom = function(f) {
        return this._innerFun("CapGetFrameBottom", e.makeParams(f))
    };
    c.CapGetFrameLeft = function(f) {
        return this._innerFun("CapGetFrameLeft", e.makeParams(f))
    };
    c.CapGetFrameRight = function(f) {
        return this._innerFun("CapGetFrameRight", e.makeParams(f))
    };
    c.CapGetFrameTop = function(f) {
        return this._innerFun("CapGetFrameTop", e.makeParams(f))
    };
    c.CapGetHelp = function() {
        return this._innerFun("CapGetHelp")
    };
    c.CapGetLabel = function() {
        return this._innerFun("CapGetLabel")
    };
    c.CapGetLabels = function() {
        return this._innerFun("CapGetLabels")
    };
    c.CapIfSupported = function(f) {
        return this._innerFun("CapIfSupported", e.makeParams(f))
    };
    c.CapReset = function() {
        return this._innerFun("CapReset")
    };
    c.CapSet = function() {
        return this._innerFun("CapSet")
    };
    c.CapSetFrame = function(g, k, j, h, f) {
        return this._innerFun("CapSetFrame", e.makeParams(g, k, j, h, f))
    };
    c.GetCapItems = function(f) {
        return this._innerFun("GetCapItems", e.makeParams(f))
    };
    c.GetCapItemsString = function(f) {
        return this._innerFun("GetCapItemsString", e.makeParams(f))
    };
    c.SetCapItems = function(g, f) {
        return this._innerFun("SetCapItems", e.makeParams(g, f))
    };
    c.SetCapItemsString = function(g, f) {
        return this._innerFun("SetCapItemsString", e.makeParams(g, f))
    }
})(Dynamsoft.Lib);
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    var c = a.html5.STwain,
        b = c.prototype,
        d = a.html5.Funs;
    b.AddText = function(k, e, m, l, j, g, h, f) {
        return this._innerFun("AddText", d.makeParams(k, e, m, l, j, g, h, f))
    };
    b.CreateTextFont = function(g, t, m, l, p, q, h, r, e, n, j, k, s, f) {
        return this._innerFun("CreateTextFont", d.makeParams(g, t, m, l, p, q, h, r, e, n, j, k, s, f))
    };
    b.CopyToClipboard = function(e) {
        return this._innerFun("CopyToClipboard", d.makeParams(e))
    };
    b.Erase = function(g, j, h, f, e) {
        return this._innerFun("Erase", d.makeParams(g, j, h, f, e))
    };
    b.GetImageBitDepth = function(e) {
        return this._innerFun("GetImageBitDepth", d.makeParams(e))
    };
    b.GetImageWidth = function(e) {
        return this._innerFun("GetImageWidth", d.makeParams(e))
    };
    b.GetImageHeight = function(e) {
        return this._innerFun("GetImageHeight", d.makeParams(e))
    };
    b.GetImageSize = function(f, e, g) {
        return this._innerFun("GetImageSize", d.makeParams(f, e, g))
    };
    b.GetImageSizeWithSpecifiedType = function(e, f) {
        return this._innerFun("GetImageSizeWithSpecifiedType", d.makeParams(e, f))
    };
    b.GetImageXResolution = function(e) {
        return this._innerFun("GetImageXResolution", d.makeParams(e))
    };
    b.GetImageYResolution = function(e) {
        return this._innerFun("GetImageYResolution", d.makeParams(e))
    };
    b.GetSelectedImageIndex = function(e) {
        var f = this;
        if (e >= 0) {
            return f._UIManager.GetSelectedImageIndex(e)
        }
        return -1
    };
    b.SetSelectedImageIndex = function(g, f) {
        var h = this,
            e = h.__SelectedImagesCount;
        if (g < h.__SelectedImagesCount && g >= 0) {
            h._UIManager.getView().SetSelectedImageIndex(g, f);
            return this._innerFun("SetSelectedImageIndex", d.makeParams(g, f))
        } else {
            a.Errors.InvalidIndex(h);
            return false
        }
    };
    b.GetSkewAngle = function(e) {
        return this._innerFun("GetSkewAngle", d.makeParams(e))
    };
    b.GetSkewAngleEx = function(g, j, h, f, e) {
        return this._innerFun("GetSkewAngleEx", d.makeParams(g, j, h, f, e))
    };
    b.IsBlankImageEx = function(g, j, h, f, e, k) {
        return this._innerFun("IsBlankImageEx", d.makeParams(g, j, h, f, e, k))
    };
    b.Mirror = function(e) {
        return this._innerFun("Mirror", d.makeParams(e))
    };
    b.OverlayRectangle = function(j, l, k, g, f, e, h) {
        var m = this;
        if (d.isServerInvalid(m)) {
            return false
        }
        return this._UIManager.getView().OverlayRectangle(j, l, k, g, f, e, h)
    };
    b.RemoveAllImages = function() {
        var f = this,
            e;
        e = f._innerFun("RemoveAllImages");
        if (e) {
            f._HowManyImagesInBuffer = 0;
            f._UIManager.clear()
        }
        return e
    };
    b.RemoveAllSelectedImages = function() {
        var f = this,
            e;
        e = d.__SetSelectedImages(f, f._UIManager.GetCurrentImageIndex(), f._UIManager.GetSelectedIndexes());
        if (e) {
            e = f._innerFun("RemoveAllSelectedImages");
            if (e) {
                f._HowManyImagesInBuffer = f._innerFun("HowManyImagesInBuffer");
                f.__cIndex = f._innerFun("CurrentImageIndexInBuffer");
                if (f._HowManyImagesInBuffer == 0) {
                    f._UIManager.clear()
                }
                f._UIManager.getView().SetSelectedImageCount(0);
                f.__SelectedImagesCount = 0
            }
        }
        return e
    };
    b.RemoveImage = function(g) {
        var h = this,
            f = parseInt(g),
            e;
        if (f < 0 || f >= h.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(h);
            return false
        }
        e = h._innerFun("RemoveImage", d.makeParams(f));
        if (e) {
            h._HowManyImagesInBuffer = h._innerFun("HowManyImagesInBuffer");
            h.__cIndex = h._innerFun("CurrentImageIndexInBuffer");
            if (h._HowManyImagesInBuffer == 0) {
                h._UIManager.clear()
            }
        }
        return e
    };
    b.Rotate = function(h, f, g) {
        var l = this,
            e = parseInt(h),
            j, k;
        if (e < 0 || e >= l.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(l);
            return false
        }
        j = l._innerFun("Rotate", d.makeParams(e, f, g));
        k = (j == 1);
        if (k) {
            d.refreshImageAfterInvokeFun(l, e)
        }
        return k
    };
    b.RotateEx = function(j, g, h, e) {
        var m = this,
            f = parseInt(j),
            k, l;
        if (f < 0 || f >= m.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(m);
            return false
        }
        k = m._innerFun("RotateEx", d.makeParams(f, g, h, e));
        l = (k == 1);
        if (l) {
            d.refreshImageAfterInvokeFun(m, f)
        }
        return l
    };
    b.RotateLeft = function(f) {
        var j = this,
            e = parseInt(f),
            g, h;
        if (e < 0 || e >= j.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(j);
            return false
        }
        g = j._innerFun("RotateLeft", d.makeParams(e));
        h = (g == 1);
        if (h) {
            d.refreshImageAfterInvokeFun(j, e)
        }
        return h
    };
    b.RotateRight = function(f) {
        var j = this,
            e = parseInt(f),
            g, h;
        if (e < 0 || e >= j.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(j);
            return false
        }
        g = j._innerFun("RotateRight", d.makeParams(e));
        h = (g == 1);
        if (h) {
            d.refreshImageAfterInvokeFun(j, e)
        }
        return h
    };
    b.ChangeImageSize = function(p, f, l, n) {
        var h = this,
            j = parseInt(p),
            m = 1 * f,
            k = 1 * l,
            e, g;
        if (j < 0 || j >= h.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(h);
            return false
        }
        if (m <= 0 || k <= 0) {
            a.Errors.InvalidWidthOrHeight(h);
            return false
        }
        e = h._innerFun("ChangeImageSize", d.makeParams(j, m, k, n));
        g = (e == 1);
        if (g) {
            d.refreshImageAfterInvokeFun(h, j)
        }
        return g
    };
    b.Flip = function(f) {
        var j = this,
            e = parseInt(f),
            g, h;
        if (e < 0 || e >= j.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(j);
            return false
        }
        g = j._innerFun("Flip", d.makeParams(e));
        h = (g == 1);
        if (h) {
            d.refreshImageAfterInvokeFun(j, e)
        }
        return h
    };
    b.Crop = function(n, g, l, m, f) {
        var j = this,
            k = parseInt(n),
            e, h;
        if (k < 0 || k >= j.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(j);
            return false
        }
        e = j._innerFun("Crop", d.makeParams(k, g, l, m, f));
        h = (e == 1);
        if (h) {
            d.refreshImageAfterInvokeFun(j, k)
        }
        return h
    };
    b.CropToClipboard = function(n, g, l, m, f) {
        var j = this,
            k = parseInt(n),
            e, h;
        if (k < 0 || k >= j.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(j);
            return false
        }
        e = j._innerFun("CropToClipboard", d.makeParams(k, g, l, m, f));
        h = (e == 1);
        if (h) {
            d.refreshImageAfterInvokeFun(j, k)
        }
        return h
    };
    b.CutFrameToClipboard = function(n, g, l, m, f) {
        var j = this,
            k = parseInt(n),
            e, h;
        if (k < 0 || k >= j.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(j);
            return false
        }
        e = j._innerFun("CutFrameToClipboard", d.makeParams(k, g, l, m, f));
        h = (e == 1);
        if (h) {
            d.refreshImageAfterInvokeFun(j, k)
        }
        return h
    };
    b.CutToClipboard = function(f) {
        var j = this,
            e = parseInt(f),
            g, h;
        if (e < 0 || e >= j.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(j);
            return false
        }
        g = j._innerFun("CutToClipboard", d.makeParams(e));
        h = (g == 1);
        if (h) {
            d.refreshImageAfterInvokeFun(j, e)
        }
        return h
    };
    b.SetDPI = function(k, f, j, e, g) {
        var l = this,
            h = parseInt(k);
        if (h < 0 || h >= l.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(l);
            return false
        }
        return l._innerFun("SetDPI", d.makeParams(h, f, j, e, g))
    };
    b.SetViewMode = function(j, f) {
        var k = this,
            g, e;
        g = Math.floor(j);
        e = Math.floor(f);
        k._UIManager.SetViewMode(g, e);
        return true
    };
    b.MoveImage = function(j, h) {
        var k = this,
            g = parseInt(j),
            e = parseInt(h),
            f;
        if (g < 0 || g >= k.HowManyImagesInBuffer || e < 0 || e >= k.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(k);
            return false
        }
        f = k._innerFun("MoveImage", d.makeParams(g, e));
        if (f) {
            f = k._UIManager.MoveImage(g, e)
        }
        return f
    };
    b.SwitchImage = function(j, h) {
        var k = this,
            g = parseInt(j),
            e = parseInt(h),
            f;
        if (g < 0 || g >= k.HowManyImagesInBuffer || e < 0 || e >= k.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(k);
            return false
        }
        f = k._innerFun("SwitchImage", d.makeParams(g, e));
        if (f) {
            k._UIManager.SwitchImage(g, e)
        }
        return f
    };
    b.Print = function(e) {
        var g = this;
        if (e) {
            var f = true;
            return this._innerSend("PrintEx", d.makeParams(f), function() {}, function() {})
        }
        g._UIManager.getView().Print();
        return true
    };
    b.SetSelectedImageArea = function(h, k, j, g, e) {
        var l = this,
            f = parseInt(h);
        if (f < 0 || f >= l.HowManyImagesInBuffer) {
            a.Errors.IndexOutOfRange(l);
            return false
        }
        if (d.isServerInvalid(l)) {
            return false
        }
        return l._UIManager.getView().SetSelectedImageArea(f, k, j, g, e)
    };
    b.CloseWorkingProcess = function() {
        return this._innerFun("CloseWorkerProcess")
    }
})(Dynamsoft.Lib);
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    var c = a.html5.STwain,
        b = c.prototype,
        e = a.html5.Funs;
    b.FileExists = function(g) {
        var h = e.replaceLocalFilename(g);
        return this._innerFun("FileExists", e.makeParams(h))
    };
    b.SaveAllAsMultiPageTIFF = function(g, k, h) {
        var j = e.replaceLocalFilename(g);
        return this.__innerSaveImage("SaveAllAsMultiPageTIFF", e.makeParams(j), k, h)
    };
    b.SaveAllAsPDF = function(g, k, h) {
        var j = e.replaceLocalFilename(g);
        return this.__innerSaveImage("SaveAllAsPDF", e.makeParams(j), k, h)
    };
    b.SaveAsBMP = function(g, j, l, h) {
        var k = e.replaceLocalFilename(g);
        return this.__innerSaveImage("SaveAsBMP", e.makeParams(k, j), l, h)
    };
    b.SaveAsJPEG = function(g, j, l, h) {
        var k = e.replaceLocalFilename(g);
        return this.__innerSaveImage("SaveAsJPEG", e.makeParams(k, j), l, h)
    };
    b.SaveAsPDF = function(g, j, l, h) {
        var k = e.replaceLocalFilename(g);
        return this.__innerSaveImage("SaveAsPDF", e.makeParams(k, j), l, h)
    };
    b.SaveAsPNG = function(g, j, l, h) {
        var k = e.replaceLocalFilename(g);
        return this.__innerSaveImage("SaveAsPNG", e.makeParams(k, j), l, h)
    };
    b.SaveAsTIFF = function(g, j, l, h) {
        var k = e.replaceLocalFilename(g);
        return this.__innerSaveImage("SaveAsTIFF", e.makeParams(k, j), l, h)
    };
    b.SaveAsGIF = function(g, j, l, h) {
        var k = e.replaceLocalFilename(g);
        return this.__innerSaveImage("SaveAsGIF", e.makeParams(k, j), l, h)
    };
    b.SaveSelectedImagesAsMultiPagePDF = function(h, l, j) {
        var m = this,
            k = e.replaceLocalFilename(h),
            g;
        g = e.__SetSelectedImages(m, m._UIManager.GetCurrentImageIndex(), m._UIManager.GetSelectedIndexes());
        if (g) {
            return m.__innerSaveImage("SaveSelectedImagesAsMultiPagePDF", e.makeParams(k), l, j)
        }
        return false
    };
    b.SaveSelectedImagesAsMultiPageTIFF = function(h, l, j) {
        var m = this,
            k = e.replaceLocalFilename(h),
            g;
        g = e.__SetSelectedImages(m, m._UIManager.GetCurrentImageIndex(), m._UIManager.GetSelectedIndexes());
        if (g) {
            return m.__innerSaveImage("SaveSelectedImagesAsMultiPageTIFF", e.makeParams(k), l, j)
        }
        return false
    };
    b.SaveSelectedImagesToBase64Binary = function(h, g) {
        var j = this,
            f;
        f = e.__SetSelectedImages(j, j._UIManager.GetCurrentImageIndex(), j._UIManager.GetSelectedIndexes());
        if (f) {
            if (a.isFunction(h)) {
                return this._innerSend("SaveSelectedImagesToBase64Binary", null, true, h, g)
            } else {
                return j._innerFun("SaveSelectedImagesToBase64Binary")
            }
        }
        return false
    };
    b.ShowFileDialog = function(k, h, q, p, n, g, j, r) {
        var m = this,
            l = e.replaceLocalFilename(n);
        return this._innerSend("ShowFileDialog", e.makeParams(k, h, q, p, l, g, j, r), true)
    };
    b.FTPDownload = function(l, j, h, f) {
        var k = this,
            g = a.html5.Funs.getImageType(j);
        return k.__innerFTPDownload("FTPDownload", e.makeParams(l, j), g, h, f)
    };
    b.FTPDownloadDirectly = function(p, m, g, l, h) {
        var n = this,
            j = e.replaceLocalFilename(g),
            k = a.html5.Funs.getImageType(j);
        return n.__innerFTPDownloadDirectly("FTPDownloadDirectly", e.makeParams(p, m, j), k, l, h)
    };
    b.FTPDownloadEx = function(k, j, g, h, f) {
        return this.__innerFTPDownload("FTPDownloadEx", e.makeParams(k, j, g), g, h, f)
    };
    b.FTPUpload = function(k, g, j, h, f) {
        return this.__innerFTPUpload("FTPUpload", e.makeParams(k, g, j), h, f)
    };
    b.FTPUploadDirectly = function(n, g, l, k, h) {
        var m = this,
            j;
        if (!a.html5.Funs.checkProductKey(m, {
                Core: true
            })) {
            if (a.isFunction(h)) {
                h(m._errorCode, m._errorString)
            }
            return false
        }
        j = e.replaceLocalFilename(g);
        return m.__innerFTPUpload("FTPUploadDirectly", e.makeParams(n, j, l), k, h)
    };
    b.FTPUploadEx = function(l, g, k, h, j, f) {
        return this.__innerFTPUpload("FTPUploadEx", e.makeParams(l, g, k, h), j, f)
    };
    b.FTPUploadAllAsMultiPageTIFF = function(j, h, g, f) {
        return this.__innerFTPUpload("FTPUploadAllAsMultiPageTIFF", e.makeParams(j, h), g, f)
    };
    b.FTPUploadAllAsPDF = function(j, h, g, f) {
        return this.__innerFTPUpload("FTPUploadAllAsPDF", e.makeParams(j, h), g, f)
    };
    b.FTPUploadAsMultiPagePDF = function(j, h, g, f) {
        return this.__innerFTPUpload("FTPUploadAsMultiPagePDF", e.makeParams(j, h), g, f)
    };
    b.FTPUploadAsMultiPageTIFF = function(j, h, g, f) {
        return this.__innerFTPUpload("FTPUploadAsMultiPageTIFF", e.makeParams(j, h), g, f)
    };
    b.HTTPDownload = function(h, g, k, f) {
        var j = e.getImageType(g);
        return this.HTTPDownloadThroughGet(h, g, j, k, f)
    };
    c.prototype.HTTPDownloadEx = function(h, g, j, k, f) {
        var l = this;
        return l.HTTPDownloadThroughGet(h, g, j, k, f)
    };
    b.HTTPDownloadDirectly = function(t, g, m, s, k) {
        var p = this,
            j = e.combineUrl(p, t, g),
            h, q, n;
        if (j === false) {
            a.Errors.ParameterCannotEmpty(p);
            return false
        }
        if (!m || m == "") {
            a.Errors.InvalidLocalFilename(p, "HTTPDownloadDirectly");
            if (a.isFunction(k)) {
                k(p.ErrorCode, p.ErrorString)
            }
            return false
        }
        h = a.html5.Funs.getImageType(m);
        if (e.isServerInvalid(p)) {
            if (a.isFunction(k)) {
                k(p.ErrorCode, p.ErrorString)
            }
            return false
        }
        if (!a.html5.Funs.checkProductKey(p, {
                Core: true
            })) {
            if (a.isFunction(k)) {
                k(p._errorCode, p._errorString)
            }
            return false
        }
        if (!a.html5.Funs.checkPDFProductKeyWhenNeeds(p, h)) {
            if (a.isFunction(k)) {
                k(p._errorCode, p._errorString)
            }
            return false
        }
        a.cancelFrome = 2;
        n = e.replaceLocalFilename(m);
        q = "get";
        a.showProgress(p, "HTTPDownloadDirectly", true);
        var r = function(f) {
                var u = (f.total === 0) ? 100 : Math.round(f.loaded * 100 / f.total),
                    v = [f.loaded, " / ", f.total].join("");
                p._OnPercentDone([0, u, "", "http"])
            },
            l = true;
        p._OnPercentDone([0, -1, "HTTP Downloading...", "http"]);
        if (!a.isFunction(s)) {
            l = false
        }
        ret = e.loadHttpBlob(p, q, j, l, function(f) {
            p._OnPercentDone([0, -1, "Loading..."]);
            var u = 3;
            return p.__LoadImageFromBytes(f, u, n, l, s, k)
        }, function() {
            a.closeProgress("HTTPDownloadDirectly");
            if (a.isFunction(k)) {
                k(p.ErrorCode, p.ErrorString)
            }
            return false
        }, r);
        return ret
    };
    b.HTTPUploadThroughPostDirectly = function(v, q, g, n, u, l) {
        var s = this,
            h = d.GetHttpHeadersAndClear(s),
            j = "HTTPUploadThroughPostDirectly",
            k = e.combineUrl(s, v, g),
            p = true,
            r, t;
        if (v === "") {
            a.Errors.HttpServerCannotEmpty(s);
            if (a.isFunction(l)) {
                l(s.ErrorCode, s.ErrorString, "")
            }
            return false
        }
        if (k === false || k === "") {
            a.Errors.ParameterCannotEmpty(s);
            if (a.isFunction(l)) {
                l(s.ErrorCode, s.ErrorString, "")
            }
            return false
        }
        if (!a.isFunction(u)) {
            p = false
        }
        if (!a.html5.Funs.checkProductKey(s, {
                Core: true
            })) {
            if (a.isFunction(l)) {
                l(s.ErrorCode, s.ErrorString, "")
            }
            return false
        }
        a.cancelFrome = 1;
        var w = function() {
            a.needShowTwiceShowDialog = false;
            a.closeProgress(j);
            if (a.isFunction(l)) {
                l(s.ErrorCode, s.ErrorString, s.__HTTPPostResponseString)
            }
            return false
        };
        a.needShowTwiceShowDialog = true;
        a.showProgress(s, j, false);
        r = e.replaceLocalFilename(q);
        t = s.__SaveLocalFileToBytes(r, p, function(f) {
            a.needShowTwiceShowDialog = false;
            if (f && (a.dlgRef > 0 || s.__IfShowCancelDialogWhenImageTransfer == false || p == false)) {
                f.name = n;
                e.setBtnCancelVisibleForProgress(s, true);
                return e.httpPostUpload(s, k, f, p, 0, h, true, function(m) {
                    a.closeProgress(j);
                    if (a.isFunction(u)) {
                        u(m)
                    }
                }, w)
            } else {
                a.closeProgress(j);
                return false
            }
        }, w);
        return t
    };
    b.HTTPUploadThroughPost = function(j, h, f, m, l, g) {
        var k = e.getImageType(m);
        return this.HTTPUploadThroughPostEx(j, h, f, m, k, l, g)
    };
    b.HTTPUploadThroughPostEx = function(v, x, f, n, t, u, l) {
        var q = this,
            g = d.GetHttpHeadersAndClear(q),
            j = "HTTPUploadThroughPostEx",
            k = e.combineUrl(q, v, f),
            p = true,
            s = false,
            r = "",
            h = 0;
        q.__HTTPPostResponseString = "";
        if (!a.isFunction(u)) {
            p = false
        }
        a.cancelFrome = 1;
        var w = function() {
            var m = q.curCommand_SaveImagesToBytes.length;
            a.needShowTwiceShowDialog = false;
            a.closeProgress(j);
            if (a.isFunction(l)) {
                l(q.ErrorCode, q.ErrorString, q.__HTTPPostResponseString)
            }
            if (m > 0) {
                a.cancelFrome = 1;
                a.needShowTwiceShowDialog = true;
                a.showProgress(q, j, false);
                var y = q.curCommand_SaveImagesToBytes[0];
                e.sendData(y.objWS, y.json, false, y.binary)
            }
            return false
        };
        a.needShowTwiceShowDialog = true;
        a.showProgress(q, j, false);
        if (v === "") {
            a.Errors.HttpServerCannotEmpty(q);
            return w()
        }
        if (k === false) {
            a.Errors.ParameterCannotEmpty(q);
            return w()
        }
        if (x == -2) {
            s = e.__SetSelectedImages(q, q._UIManager.GetCurrentImageIndex(), q._UIManager.GetSelectedIndexes());
            if (!s) {
                return w()
            }
        } else {
            if (x == -1 || x >= 0) {} else {
                a.Errors.IndexOutOfRange(q);
                return w()
            }
        }
        s = q.__GetSelectedImagesLength(t, x, function(y) {
            var m = y.split(";");
            if (m.length == 2) {
                r = m[0];
                h = parseInt(m[1])
            }
        });
        if (!s) {
            return w()
        }
        if (h == 0) {
            a.Errors.UploadFileCannotEmpty(q);
            return w()
        }
        g["dwt-md5"] = r;
        s = q.__SaveSelectedImagesToBytes(t, 0, h, p, function(m) {
            a.needShowTwiceShowDialog = false;
            if (m && (a.dlgRef > 0 || q.__IfShowCancelDialogWhenImageTransfer == false || p == false)) {
                m.name = n;
                e.setBtnCancelVisibleForProgress(q, true);
                return e.httpPostUpload(q, k, m, p, 0, g, true, function(y) {
                    var z = q.curCommand_SaveImagesToBytes.length;
                    a.closeProgress(j);
                    if (a.isFunction(u)) {
                        u(y)
                    }
                    if (z > 0) {
                        a.cancelFrome = 1;
                        a.needShowTwiceShowDialog = true;
                        a.showProgress(q, j, false);
                        var A = q.curCommand_SaveImagesToBytes[0];
                        e.sendData(A.objWS, A.json, false, A.binary)
                    }
                }, w)
            } else {
                a.closeProgress(j);
                return false
            }
        }, w);
        return s
    };
    b._checkIndices = function(h) {
        var j = this,
            f;
        if (!a.isArray(h)) {
            a.Errors.IndicesNotArray(j);
            return false
        }
        if (h.length == 0) {
            a.Errors.IndicesCannotEmpty(j);
            return false
        }
        f = j._HowManyImagesInBuffer;
        for (i = 0; i < h.length; i++) {
            var g = h[i];
            if (a.isUndefined(g) || g === null) {
                a.Errors.IndexNullOrUndefined(j);
                return false
            }
            g = parseInt(g);
            if (isNaN(g)) {
                a.Errors.InvalidIndex(j);
                return false
            }
            if (g < 0 || g >= f) {
                a.Errors.IndicesOutOfRange(j);
                return false
            }
        }
        return true
    };
    b.SetUploadSegment = function(g, f) {
        var h = this;
        if (!(g >= 0)) {
            a.Errors.InvalidSegementUploadThreshold(h);
            return false
        }
        if (!(f > 0)) {
            a.Errors.InvalidModuleSize(h);
            return false
        }
        h._segementUploadThreshold = g * 1024 * 1024;
        h._moduleSize = f * 1024;
        return true
    };
    b.HTTPUpload = function(h, l, p, F, j, z) {
        var x = this,
            q = parseInt(p),
            B = parseInt(F),
            D, u = "HTTPUpload",
            G, n = h,
            A = true,
            H = false,
            w = x._moduleSize,
            E = x._segementUploadThreshold,
            y, C, r, t;
        x.__HTTPPostResponseString = "";
        D = function() {
            if (a.isFunction(z)) {
                z(x.ErrorCode, x.ErrorString, x.__HTTPPostResponseString)
            }
            return false
        };
        if (a.isUndefined(h) || h === "") {
            a.Errors.ParameterCannotEmpty(x);
            return D()
        } else {
            if (!a.isString(h)) {
                a.Errors.InvalidUrl(x);
                return D()
            }
        }
        if ((h.indexOf("http://") != 0) && (h.indexOf("https://") != 0)) {
            if (a.detect.ssl) {
                h = "https://" + h
            } else {
                h = "http://" + h
            }
        }
        if (e.isServerInvalid(x)) {
            return D()
        }
        if (!x._checkIndices(l)) {
            return D()
        }
        if (q == EnumDWT_ImageType.IT_BMP || q == EnumDWT_ImageType.IT_JPG || q == EnumDWT_ImageType.IT_PNG) {
            if (l.length > 1) {
                a.Errors.UploadIndexMoreThanOne(x);
                return D()
            }
        } else {
            if (q == EnumDWT_ImageType.IT_TIF || q == EnumDWT_ImageType.IT_PDF) {} else {
                a.Errors.InvalidImageType(x);
                return D()
            }
        }
        if (B != EnumDWT_UploadDataFormat.Binary && B != EnumDWT_UploadDataFormat.Base64) {
            a.Errors.InvalidDataFormat(x);
            return D()
        }
        x.__HTTPPostResponseString = "";
        a.cancelFrome = 1;
        var f = function() {
            var m = x.curCommand_SaveImagesToBytes.length;
            a.needShowTwiceShowDialog = false;
            a.closeProgress(u);
            if (m > 0) {
                a.cancelFrome = 1;
                a.needShowTwiceShowDialog = true;
                a.showProgress(x, u, false);
                var I = x.curCommand_SaveImagesToBytes[0];
                e.sendData(I.objWS, I.json, false, I.binary)
            }
            if (a.isFunction(z)) {
                z(x.ErrorCode, x.ErrorString, x.__HTTPPostResponseString)
            }
            return false
        };
        t = function(m) {
            var I = (m.total === 0) ? 100 : Math.round(m.loaded * 100 / m.total),
                J = [m.loaded, " / ", m.total].join("");
            x._OnPercentDone([0, I, "", "http"])
        };
        if (B == EnumDWT_UploadDataFormat.Binary) {
            var g = "",
                v = 0;
            H = e.__SetSelectedImages(x, "", l);
            if (!H) {
                return f()
            }
            a.needShowTwiceShowDialog = true;
            a.showProgress(x, u, false);
            H = x.__GetSelectedImagesLength(q, -2, function(I) {
                var m = I.split(";");
                if (m.length == 2) {
                    g = m[0];
                    v = parseInt(m[1])
                }
            });
            if (!H) {
                return f()
            }
            if (v == 0) {
                a.Errors.UploadFileCannotEmpty(x);
                return f()
            }
            if (E > 0 && v > E) {
                var k = 0,
                    s = d.GetHttpHeadersAndClear(x);
                s["dwt-md5"] = g;
                x._OnPercentDone([0, -1, "HTTP Uploading...", "http"]);
                H = d.UploadBinary(x, n, q, v, s, k, w, t, function() {
                    a.needShowTwiceShowDialog = false;
                    a.closeProgress(u);
                    if (a.isFunction(j)) {
                        j(x.__HTTPPostResponseString)
                    }
                }, f)
            } else {
                x.__innnerHTTPUploadBinaryFull(h, g, v, q, j, f)
            }
        } else {
            if (B == EnumDWT_UploadDataFormat.Base64) {
                var G = e.addImageFileExt("RemoteFile", q);
                a.needShowTwiceShowDialog = true;
                a.showProgress(x, u, false);
                H = x.ConvertToBase64(l, q, function(K) {
                    if (!K || K.getLength() <= 0) {
                        a.Errors.UploadFileCannotEmpty(x);
                        return f()
                    }
                    if (E > 0 && K.getLength() > E) {
                        var L = 0,
                            J = K.getMD5(),
                            I = d.GetHttpHeadersAndClear(x);
                        I["dwt-md5"] = J;
                        x._OnPercentDone([0, -1, "HTTP Uploading...", "http"]);
                        d.UploadBase64(x, n, q, K, G, I, L, w, t, function() {
                            a.needShowTwiceShowDialog = false;
                            a.closeProgress(u);
                            if (a.isFunction(j)) {
                                j(x.__HTTPPostResponseString)
                            }
                        }, f)
                    } else {
                        var m, J = K.getMD5();
                        m = K.getData(0, K.getLength());
                        if (!m || m == "") {
                            a.Errors.UploadFileCannotEmpty(x);
                            return f()
                        }
                        x.__innnerHTTPUploadBase64Full(h, J, m, q, j, f)
                    }
                }, f)
            }
        }
        return H
    };
    var d = {
        UploadBinary: function(p, k, r, h, f, l, q, s, n, u) {
            var t, g, j = "HttpUpload";
            t = h - l;
            if (t > 0) {
                if (t >= q) {
                    t -= q;
                    g = q
                } else {
                    g = t;
                    t = 0
                }
                p.__SaveSelectedImagesToBytesByBlock(r, l, g, function(v, m) {
                    if (!v) {
                        a.Errors.UploadFileCannotEmpty(p);
                        return u()
                    }
                    if (a.dlgRef > 0 || p.__IfShowCancelDialogWhenImageTransfer == false) {
                        v.name = "RemoteFile";
                        e.setBtnCancelVisibleForProgress(p, true);
                        f["Content-Range"] = ["bytes ", m, "-", m + v.size - 1, "/", h].join("");
                        s({
                            total: h,
                            loaded: l
                        });
                        e.httpPostUpload(p, k, v, true, 0, f, false, function(w) {
                            var x = p.curCommand_SaveImagesToBytes.length;
                            if (x > 0) {
                                a.cancelFrome = 1;
                                var y = p.curCommand_SaveImagesToBytes[0];
                                e.sendData(y.objWS, y.json, false, y.binary)
                            }
                            if (t == 0) {
                                a.needShowTwiceShowDialog = false;
                                s({
                                    total: h,
                                    loaded: h
                                });
                                if (a.isFunction(n)) {
                                    n(w)
                                }
                            } else {
                                l += g;
                                setTimeout(function() {
                                    a.cancelFrome = 1;
                                    d.UploadBinary(p, k, r, h, f, l, q, s, n, u)
                                }, 100)
                            }
                        }, u);
                        return true
                    } else {
                        a.Errors.UploadError(p, true);
                        return u()
                    }
                }, u)
            } else {
                a.needShowTwiceShowDialog = false;
                a.closeProgress(j);
                if (a.isFunction(n)) {
                    n("")
                }
            }
            return true
        },
        UploadBase64: function(q, k, s, x, l, f, n, r, t, p, v) {
            var h = x.getLength(),
                j = "HttpUpload",
                u, g, w = 0;
            u = h - n;
            if (u > 0) {
                if (u >= r) {
                    u -= r;
                    g = r
                } else {
                    g = u;
                    u = 0
                }
                q.__GetBase64ResultDataAsync(-1, n, r, function(m) {
                    strBase64Data = m[0];
                    if (!strBase64Data || strBase64Data == "") {
                        a.Errors.UploadFileCannotEmpty(q);
                        return v()
                    }
                    if (a.dlgRef > 0 || q.__IfShowCancelDialogWhenImageTransfer == false) {
                        e.setBtnCancelVisibleForProgress(q, true);
                        f["Content-Range"] = ["bytes ", n, "-", n + g - 1, "/", h].join("");
                        t({
                            total: h,
                            loaded: n
                        });
                        e.httpPostUploadString(q, k, strBase64Data, l, 0, f, false, function(y) {
                            var z = q.curCommand_SaveImagesToBytes.length;
                            if (z > 0) {
                                a.cancelFrome = 1;
                                var A = q.curCommand_SaveImagesToBytes[0];
                                e.sendData(A.objWS, A.json, false, A.binary)
                            }
                            if (u == 0) {
                                a.needShowTwiceShowDialog = false;
                                t({
                                    total: h,
                                    loaded: h
                                });
                                if (a.isFunction(p)) {
                                    p(y)
                                }
                            } else {
                                n += g;
                                setTimeout(function() {
                                    a.cancelFrome = 1;
                                    d.UploadBase64(q, k, s, x, l, f, n, r, t, p, v)
                                }, 100)
                            }
                        }, v);
                        return true
                    } else {
                        a.Errors.UploadError(q, true);
                        return v()
                    }
                }, v)
            } else {
                a.needShowTwiceShowDialog = false;
                a.closeProgress(j);
                if (a.isFunction(p)) {
                    p("")
                }
            }
            return true
        },
        GetHttpHeadersAndClear: function(g) {
            var f = g.__httpHeaderMap;
            g.__httpHeaderMap = {};
            if (!f) {
                f = {}
            }
            return f
        }
    };
    b.__innnerHTTPUploadBinaryFull = function(h, g, u, n, j, f) {
        var t = this,
            q = d.GetHttpHeadersAndClear(t),
            r = "HTTPUpload",
            y, l = h,
            w = true,
            z = false,
            s = 0,
            v, x, p;
        y = e.addImageFileExt("RemoteFile", n);
        var k = 0;
        q["dwt-md5"] = g;
        z = t.__SaveSelectedImagesToBytesByBlock(n, k, u, function(A, m) {
            if (!A || A.size <= 0) {
                a.Errors.UploadFileCannotEmpty(t);
                return f()
            }
            if (a.dlgRef > 0 || t.__IfShowCancelDialogWhenImageTransfer == false) {
                A.name = y;
                e.setBtnCancelVisibleForProgress(t, true);
                return e.httpPostUpload(t, l, A, w, s, q, true, function(B) {
                    var C = t.curCommand_SaveImagesToBytes.length;
                    a.needShowTwiceShowDialog = false;
                    a.closeProgress(r);
                    if (a.isFunction(j)) {
                        j(B)
                    }
                    if (C > 0) {
                        a.cancelFrome = 1;
                        a.needShowTwiceShowDialog = true;
                        a.showProgress(t, r, false);
                        var D = t.curCommand_SaveImagesToBytes[0];
                        e.sendData(D.objWS, D.json, false, D.binary)
                    }
                }, f)
            } else {
                a.Errors.UploadError(t, true);
                return f()
            }
        }, f);
        return z
    };
    b.__innnerHTTPUploadBase64Full = function(g, u, y, w, p, x) {
        var r = this,
            h = d.GetHttpHeadersAndClear(r),
            j = "HTTPUpload",
            l, k = g,
            q = true,
            t = false,
            s = 0,
            n, v, f;
        l = e.addImageFileExt("RemoteFile", w);
        a.needShowTwiceShowDialog = true;
        a.showProgress(r, j, false);
        if (a.dlgRef > 0 || r.__IfShowCancelDialogWhenImageTransfer == false) {
            if (h) {
                h["dwt-md5"] = u
            }
            e.setBtnCancelVisibleForProgress(r, true);
            return e.httpPostUploadString(r, k, y, l, 0, h, true, function(m) {
                var z = r.curCommand_SaveImagesToBytes.length;
                a.needShowTwiceShowDialog = false;
                a.closeProgress(j);
                if (a.isFunction(p)) {
                    p(m)
                }
                if (z > 0) {
                    a.cancelFrome = 1;
                    a.needShowTwiceShowDialog = true;
                    a.showProgress(r, j, false);
                    var A = r.curCommand_SaveImagesToBytes[0];
                    e.sendData(A.objWS, A.json, false, A.binary)
                }
            }, x)
        } else {
            a.Errors.UploadError(r, true);
            return x()
        }
        return t
    };
    b.ConvertToBase64 = function(q, n, j, f) {
        var k = this,
            g = parseInt(n),
            h = "SaveSelectedImagesToBase64Binary",
            l;
        if (e.isServerInvalid(k)) {
            if (a.isFunction(f)) {
                f(k.ErrorCode, k.ErrorString)
            }
            return false
        }
        if (!k._checkIndices(q)) {
            if (a.isFunction(f)) {
                f(k.ErrorCode, k.ErrorString)
            }
            return false
        }
        if (g == EnumDWT_ImageType.IT_BMP || g == EnumDWT_ImageType.IT_JPG || g == EnumDWT_ImageType.IT_PNG) {
            if (q.length > 1) {
                a.Errors.ConvertBase64IndexMoreThanOne(k);
                if (a.isFunction(f)) {
                    f(k.ErrorCode, k.ErrorString)
                }
                return false
            }
        } else {
            if (g == EnumDWT_ImageType.IT_TIF || g == EnumDWT_ImageType.IT_PDF) {} else {
                a.Errors.InvalidImageType(k);
                if (a.isFunction(f)) {
                    f(k.ErrorCode, k.ErrorString)
                }
                return false
            }
        }
        l = e.__SetSelectedImages(k, "", q);
        if (!l) {
            if (a.isFunction(f)) {
                f(k.ErrorCode, k.ErrorString)
            }
            return false
        }
        a.showProgress(k, h, false);
        var p = function() {
            a.closeProgress(h);
            if (a.isFunction(f)) {
                f(k.ErrorCode, k.ErrorString)
            }
            return false
        };
        l = k._innerSend(h, e.makeParams(g, 0, 0), true, function(u) {
            var r, m = 0,
                t = "",
                s;
            if (k.ErrorCode != 0) {
                p();
                return
            }
            if (u && a.isArray(u) && u.length == 1) {
                s = u[0].split(";");
                if (s.length == 2) {
                    t = s[0];
                    m = parseInt(s[1])
                }
                r = new a.html5.Base64Result(k, m, t);
                a.closeProgress(h);
                if (a.isFunction(j)) {
                    j(r)
                }
            } else {
                a.Errors.ConvertBase64Failed(k);
                p()
            }
        }, p);
        return l
    };
    b.ClearAllHTTPFormField = function() {
        var f = this;
        f.httpFormFields = {};
        return true
    };
    b.SetHTTPFormField = function(j, f) {
        var h = this,
            g = j;
        if (!a.isString(g)) {
            g = "" + g
        }
        h.httpFormFields[g] = f;
        return true
    };
    b.HTTPUploadAllThroughPostAsMultiPageTIFF = function(j, f, m, l, h) {
        var g = -1,
            k = 2;
        return this.HTTPUploadThroughPostEx(j, g, f, m, k, l, h)
    };
    b.HTTPUploadThroughPostAsMultiPageTIFF = function(j, f, n, l, h) {
        var m = this,
            g = -2,
            k = 2;
        return m.HTTPUploadThroughPostEx(j, g, f, n, k, l, h)
    };
    b.HTTPUploadAllThroughPostAsPDF = function(j, f, n, l, h) {
        var m = this,
            g = -1,
            k = 4;
        return this.HTTPUploadThroughPostEx(j, g, f, n, k, l, h)
    };
    b.HTTPUploadThroughPostAsMultiPagePDF = function(j, f, n, l, h) {
        var m = this,
            g = -2,
            k = 4;
        return m.HTTPUploadThroughPostEx(j, g, f, n, k, l, h)
    };
    b.HTTPUploadThroughPutDirectly = function(j, g, f, k, h) {
        a.Errors.HTML5NotSupport(this);
        return false
    };
    b.HTTPUploadThroughPut = function(j, h, f, l, g) {
        var k = e.getImageType(f);
        return this.HTTPUploadThroughPutEx(j, h, f, k, l, g)
    };
    b.HTTPUploadThroughPutEx = function(t, v, r, p, s, j) {
        var l = this,
            f = d.GetHttpHeadersAndClear(l),
            g = "HTTPUploadThroughPutEx",
            h = e.combineUrl(l, t, r),
            k = true,
            n = false;
        if (h === false) {
            a.Errors.ParameterCannotEmpty(l);
            return false
        }
        if (!a.isFunction(s)) {
            k = false
        }
        a.cancelFrome = 1;
        var u = function() {
                var m = l.curCommand_SaveImagesToBytes.length;
                a.needShowTwiceShowDialog = false;
                a.closeProgress(g);
                if (a.isFunction(j)) {
                    j(l.ErrorCode, l.ErrorString, l.__HTTPPostResponseString)
                }
                if (m > 0) {
                    a.cancelFrome = 1;
                    a.needShowTwiceShowDialog = true;
                    a.showProgress(l, g, false);
                    var w = l.curCommand_SaveImagesToBytes[0];
                    e.sendData(w.objWS, w.json, false, w.binary)
                }
                return false
            },
            q;
        a.needShowTwiceShowDialog = true;
        a.showProgress(l, g, false);
        if (t === "") {
            a.Errors.HttpServerCannotEmpty(l);
            return u()
        }
        if (v == -2) {
            n = e.__SetSelectedImages(l, l._UIManager.GetCurrentImageIndex(), l._UIManager.GetSelectedIndexes());
            if (!n) {
                return u()
            }
        } else {
            if (v == -1 || v >= 0) {} else {
                a.Errors.IndexOutOfRange(l);
                return u()
            }
        }
        n = l.__GetSelectedImagesLength(p, v, function(w) {
            var m = w.split(";");
            if (m.length == 2) {
                md5 = m[0];
                iLen = parseInt(m[1])
            }
        });
        if (!n) {
            return u()
        }
        if (iLen == 0) {
            a.Errors.UploadFileCannotEmpty(l);
            return u()
        }
        f["dwt-md5"] = md5;
        n = l.__SaveSelectedImagesToBytes(p, 0, iLen, k, function(m) {
            a.needShowTwiceShowDialog = false;
            if (m && (a.dlgRef > 0 || l.__IfShowCancelDialogWhenImageTransfer == false || k == false)) {
                q = function(w) {
                    var x = (w.total === 0) ? 100 : Math.round(w.loaded * 100 / w.total),
                        y = [w.loaded, " / ", w.total].join("");
                    l._OnPercentDone([0, x, "", "http"])
                };
                l._OnPercentDone([0, -1, "uploading...", "http"]);
                e.setBtnCancelVisibleForProgress(l, true);
                return e.httpPutImage(l, h, m, k, function(w) {
                    var x = l.curCommand_SaveImagesToBytes.length;
                    l.__HTTPPostResponseString = w;
                    a.closeProgress(g);
                    if (a.isFunction(s)) {
                        s(l.__HTTPPostResponseString)
                    }
                    if (x > 0) {
                        a.cancelFrome = 1;
                        a.needShowTwiceShowDialog = true;
                        a.showProgress(l, g, false);
                        var y = l.curCommand_SaveImagesToBytes[0];
                        e.sendData(y.objWS, y.json, false, y.binary)
                    }
                }, u, q)
            } else {
                a.closeProgress(g);
                return false
            }
        }, u);
        return n
    };
    b.HTTPUploadAllThroughPutAsMultiPageTIFF = function(j, f, l, h) {
        var g = -1,
            k = 2;
        return this.HTTPUploadThroughPutEx(j, g, f, k, l, h)
    };
    b.HTTPUploadThroughPutAsMultiPageTIFF = function(j, f, l, h) {
        var m = this,
            g = -2,
            k = 2;
        return m.HTTPUploadThroughPutEx(j, g, f, k, l, h)
    };
    b.HTTPUploadAllThroughPutAsPDF = function(j, f, l, h) {
        var g = -1,
            k = 4;
        return this.HTTPUploadThroughPutEx(j, g, f, k, l, h)
    };
    b.HTTPUploadThroughPutAsMultiPagePDF = function(j, f, l, h) {
        var m = this,
            g = -2,
            k = 4;
        return m.HTTPUploadThroughPutEx(j, g, f, k, l, h)
    };
    b.GetSelectedImagesSize = function(g) {
        var h = this,
            f;
        f = e.__SetSelectedImages(h, h._UIManager.GetCurrentImageIndex(), h._UIManager.GetSelectedIndexes());
        if (f) {
            return this._innerFun("GetSelectedImagesSize", e.makeParams(g))
        }
        return false
    };
    b.SetHTTPHeader = function(j, l) {
        var m = this,
            f, h, g, k = j;
        if (!m.__httpHeaderMap) {
            m.__httpHeaderMap = {}
        }
        if (!k || !a.isString(k)) {
            if (a.isUndefined(k)) {
                a.Errors.HttpHeaderIsUndefined(m)
            } else {
                if (k === "") {
                    a.Errors.HttpHeaderIsEmpty(m)
                } else {
                    if (k === null) {
                        a.Errors.HttpHeaderIsNull(m)
                    } else {
                        a.Errors.HttpHeaderIsInvalid(m)
                    }
                }
            }
            return false
        }
        h = ["if-modified-since", "if-none-match", "if-range", "range", "accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "date", "dnt", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via", "dwt-md5"];
        k = k.toLowerCase();
        for (g = 0; g < h.length; g++) {
            if (h[g] == k) {
                a.Errors.HttpHeaderNotAllowed(m);
                return false
            }
        }
        if (a.isUndefined(l) || l === null || l === "") {
            if (j in m.__httpHeaderMap) {
                delete m.__httpHeaderMap[j]
            }
            return true
        }
        if (a.isNumber(l)) {
            l = "" + l
        }
        m.__httpHeaderMap[j] = l;
        return true
    };
    b.__GetBase64ResultData = function(f, h, g) {
        return this._innerFun("SaveSelectedImagesToBase64Binary", e.makeParams(f, h, g))
    };
    b.__GetBase64ResultDataAsync = function(f, j, h, g, k) {
        return this._innerFunRaw("SaveSelectedImagesToBase64Binary", e.makeParams(f, j, h), true, false, false, g, k)
    };
    a.html5.Base64Result = function(f, h, g) {
        var j = this;
        j._stwain = f;
        j._md5 = g;
        j._length = h
    };
    a.html5.Base64Result.prototype.getLength = function() {
        return this._length
    };
    a.html5.Base64Result.prototype.getMD5 = function() {
        return this._md5
    };
    a.html5.Base64Result.prototype.getData = function(j, g) {
        var k = this,
            f = g,
            h = -1;
        if (j < 0 || g <= 0) {
            return ""
        }
        if (j + f > k._length) {
            f = k._length - j
        }
        return k._stwain.__GetBase64ResultData(h, j, f)
    }
})(Dynamsoft.Lib);
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    var c = Dynamsoft.Lib.html5.STwain,
        d = Dynamsoft.Lib.html5.Funs,
        b = c.prototype;
    b.RegisterEvent = function(e, g) {
        var f;
        f = ["__", e].join("");
        this[f] = g;
        return true
    };
    b.onEvent = function(e, f) {
        this.RegisterEvent(e, f)
    };
    b.on = function(e, f) {
        this.RegisterEvent(e, f)
    };
    b.OnRefreshUI = function(g, f, j, h) {
        var k = this,
            e = "On RefreshUI";
        if (j) {
            k._UIManager.refresh(g, f, true, h)
        }
        if (Dynamsoft.Lib.isFunction(k.__OnRefreshUI)) {
            k.__OnRefreshUI(k._UIManager.GetCurrentImageIndex(), f)
        }
        return true
    };
    b._OnBitmapChanged = function(q) {
        var p = this,
            l = q[1].split(","),
            e = q[2],
            g = q[3],
            k = q[4],
            f = 0,
            h = "OnBitmapChanged:",
            n = 1,
            j = 2,
            r = 3,
            s = 4,
            t = 5;
        if (q.length > 5) {
            f = q[5]
        }
        p.__cIndex = g;
        p._HowManyImagesInBuffer = k;
        Dynamsoft.Lib.log(h + q);
        if (e == n || e == j) {
            Dynamsoft.Lib.each(l, function(u) {
                var v = parseInt(u),
                    m = "item_" + v;
                if (isNaN(v) || v < 0) {
                    return true
                }
                p._UIManager.add(v, k, f)
            });
            if (Dynamsoft.Lib.isFunction(p.__OnRefreshUI)) {
                p.__OnRefreshUI(g, k)
            }
        } else {
            if (e == r) {
                if (l.length == 1 && l[0] == -1 || k == 0) {
                    p._UIManager.clear()
                } else {
                    Dynamsoft.Lib.each(l, function(u, m) {
                        var v = parseInt(u);
                        if (isNaN(v) || v < 0) {
                            return true
                        }
                        p._UIManager.remove(v, g)
                    });
                    if (g >= 0 && !p.__bLoadingImage && p._UIManager.count() > 0) {
                        p._UIManager.refreshEditor(g, k)
                    }
                }
                if (Dynamsoft.Lib.isFunction(p.__OnRefreshUI)) {
                    p.__OnRefreshUI(g, k)
                }
            } else {
                if (e == s) {
                    Dynamsoft.Lib.each(l, function(u, m) {
                        var v = parseInt(u);
                        if (isNaN(v) || v < 0) {
                            return true
                        }
                        if (v >= 0 && !p.__bLoadingImage) {
                            p.OnRefreshUI(v, k, true, f)
                        }
                    })
                } else {
                    if (e == t) {
                        if (g >= 0 && !p.__bLoadingImage) {
                            p.OnRefreshUI(g, k, true, f)
                        }
                    }
                }
            }
        }
        if (Dynamsoft.Lib.isFunction(p.__OnBitmapChanged)) {
            p.__OnBitmapChanged(l, e, g, k)
        }
    };
    b._OnPostLoad = function(g, e) {
        var n = this,
            j, m, k, l, h;
        if (e !== undefined && e.exception !== undefined && e.description !== undefined) {
            n._errorCode = e.exception;
            n._errorString = e.description
        }
        Dynamsoft.Lib.log("OnPostLoad Results:");
        l = g[1].split(",");
        m = Dynamsoft.Lib.base64.decode(l[0]);
        name = Dynamsoft.Lib.base64.decode(l[1]);
        Dynamsoft.Lib.log(m);
        Dynamsoft.Lib.log(name);
        Dynamsoft.Lib.log(l[2]);
        d.autoDiscardBlankImage(n, "On PostLoad");
        h = n.__cIndex;
        if (h >= 0) {
            n.OnRefreshUI(h)
        }
        if (Dynamsoft.Lib.isFunction(n.__OnPostLoad)) {
            n.__OnPostLoad(m, name, l[2])
        }
    };
    b._OnPostTransfer = function(e) {
        var f = this;
        Dynamsoft.Lib.log("On PostTransfer Results:" + e);
        d.autoDiscardBlankImage(f, "On PostTransfer");
        if (Dynamsoft.Lib.isFunction(f.__OnPostTransfer)) {
            f.__OnPostTransfer()
        }
    };
    b._OnPostAllTransfers = function(f) {
        var k = this,
            e, h, g = k._UIManager.GetCurrentImageIndex(),
            j = k._UIManager.count();
        if (f.length >= 2) {
            k._errorCode = f[1];
            k._errorString = f[2]
        }
        Dynamsoft.Lib.log("On PostAllTransfers Results:" + f);
        k.__bLoadingImage = false;
        k._UIManager.refreshEditor(g, j);
        if (Dynamsoft.Lib.isFunction(k.__OnPostAllTransfers)) {
            k.__OnPostAllTransfers()
        }
    };
    b._OnResult = function(e) {
        var g = this,
            f = e[1];
        if (Dynamsoft.Lib.isFunction(g.__OnResult)) {
            g.__OnResult(f)
        }
    };
    b._OnTransferCancelled = function(e) {
        var h = this,
            f = h._UIManager.GetCurrentImageIndex(),
            g = h._UIManager.count();
        h.__bLoadingImage = false;
        h._UIManager.refreshEditor(f, g);
        if (Dynamsoft.Lib.isFunction(h.__OnTransferCancelled)) {
            h.__OnTransferCancelled()
        }
    };
    b._OnTransferError = function(e) {
        var f = this;
        if (Dynamsoft.Lib.isFunction(f.__OnTransferError)) {
            f.__OnTransferError()
        }
    };
    b._OnSourceUIClose = function(e) {
        var f = this;
        if (Dynamsoft.Lib.isFunction(f.__OnSourceUIClose)) {
            f.__OnSourceUIClose()
        }
    };
    b._OnPreTransfer = function(e) {
        var f = this;
        if (Dynamsoft.Lib.isFunction(f.__OnPreTransfer)) {
            f.__OnPreTransfer()
        }
    };
    b._OnPreAllTransfers = function(e) {
        var f = this;
        if (Dynamsoft.Lib.isFunction(f.__OnPreAllTransfers)) {
            f.__OnPreAllTransfers()
        }
    };
    b._OnPercentDone = function(p) {
        var j = this;
        var q = false;
        if ((Dynamsoft.Lib.cancelFrome == 0 && j.__IfShowProgressBar == true) || (Dynamsoft.Lib.cancelFrome != 0 && j.__IfShowCancelDialogWhenImageTransfer == true)) {
            var n = Dynamsoft.Lib.get("progressBar"),
                h = Dynamsoft.Lib.get("status"),
                e = Dynamsoft.Lib.get("finalMessage"),
                k = 0,
                l;
            if (Dynamsoft.Lib.cancelFrome == 3 || Dynamsoft.Lib.cancelFrome == 4) {
                var g = p[3];
                if (g == 0) {
                    d.setBtnCancelVisibleForProgress(j, false)
                } else {
                    if (g == 1) {
                        d.setBtnCancelVisibleForProgress(j, true)
                    }
                }
            }
            k = p[1];
            if (k < 0) {
                k = 0;
                Dynamsoft.Lib.progressMessage = p[2];
                l = Dynamsoft.Lib.progressMessage
            } else {
                if (p[2] != "") {
                    l = Dynamsoft.Lib.progressMessage + "(" + p[2] + ")"
                } else {
                    l = Dynamsoft.Lib.progressMessage
                }
                if (Dynamsoft.Lib.cancelFrome == 1 || Dynamsoft.Lib.cancelFrome == 2) {
                    if (p[3] == "http") {
                        q = true
                    }
                }
                if (Dynamsoft.Lib.cancelFrome == 3 || Dynamsoft.Lib.cancelFrome == 4) {
                    if (p[4] == "ftp") {
                        q = true
                    }
                }
            }
            if (e) {
                e.innerHTML = l
            }
            if (k || k === 0) {
                if (h) {
                    h.innerHTML = (k + "%")
                }
                if (n) {
                    if (Dynamsoft.Lib.env.bIE) {
                        if (n.objProgressBar) {
                            n.objProgressBar.setValue(k)
                        } else {
                            n.value = k
                        }
                    } else {
                        n.value = k
                    }
                }
                if (q == true) {
                    if (Dynamsoft.Lib.isFunction(j.__OnInternetTransferPercentage)) {
                        j.__OnInternetTransferPercentage(k, false)
                    }
                    if (Dynamsoft.Lib.isFunction(j.__OnInternetTransferPercentageEx)) {
                        j.__OnInternetTransferPercentageEx(k, false)
                    }
                }
            }
            if (k && (k >= 100 || Dynamsoft.Lib.dlgRef <= 0)) {
                if (Dynamsoft.Lib.dlgRef <= 0) {
                    var f = "OnPercentDone";
                    Dynamsoft.Lib.closeProgress(f)
                }
            }
        }
        if (Dynamsoft.Lib.isFunction(j.__OnPercentDone)) {
            j.__OnPercentDone()
        }
    };
    b._OnGetFilePath = function(e) {
        var l = this,
            g, k, h, j;
        j = e[1].split(",");
        Dynamsoft.Lib.log("On GetFilePath Results:" + e);
        k = Dynamsoft.Lib.base64.decode(j[3]);
        name = Dynamsoft.Lib.base64.decode(j[4]);
        if (Dynamsoft.Lib.isFunction(l.__OnGetFilePath)) {
            l.__OnGetFilePath(j[0], j[1], j[2], k, name)
        }
    };
    b.checkErrorString = function() {
        var g = this,
            f = g.ErrorCode;
        if (f === -2115) {
            return true
        }
        if (f === -2003) {
            var e = window.open("", "ErrorMessage", "height=500,width=750,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no");
            e.document.writeln(g.__HTTPPostResponseString)
        }
        return (f === 0)
    }
})(Dynamsoft.Lib);
(function(b) {
    if (!b.product.bChromeEdition) {
        return
    }
    var f = b.html5.STwain,
        e = f.prototype,
        g = b.html5.Funs,
        d = Dynamsoft.WebTwainEnv,
        c = !1,
        a = !0;
    e.ShowImageEditor = function() {
        var h = this;
        if (g.isServerInvalid(h)) {
            return c
        }
        return h.ShowImageEditorEx(-1, -1, -1, -1, 0)
    };
    e.SetCookie = function(h) {
        this._cookie = h;
        document.cookie = h;
        return a
    };
    e.LoadImageFromBase64Binary = function(l, r, s, k) {
        var p = this,
            j = c,
            h = "LoadImageFromBase64Binary",
            n = r,
            q;
        if (!b.html5.Funs.checkProductKey(p, {
                Core: a
            })) {
            return c
        }
        if (n < -1 || n > 5) {
            n = -1
        }
        if (!b.html5.Funs.checkPDFProductKeyWhenNeeds(p, n)) {
            return c
        }
        if (b.isFunction(s)) {
            j = a
        }
        if (j) {
            if (g.isServerInvalid(p)) {
                if (b.isFunction(k)) {
                    k(p.ErrorCode, p.ErrorString)
                }
                return c
            }
            b.cancelFrome = 2;
            b.showProgress(p, h, a);
            p.__bLoadingImage = a;
            q = p._innerSend(h, g.makeParams(l, n), j, function() {
                Dynamsoft.Lib.closeProgress(h);
                p.__bLoadingImage = false;
                var m = p._UIManager.GetCurrentImageIndex();
                if (m >= 0) {
                    p._UIManager.refreshEditor(m, p._UIManager.count());
                    p.OnRefreshUI(m)
                }
                s && s();
                return true
            }, function() {
                Dynamsoft.Lib.closeProgress(h);
                p.__bLoadingImage = false;
                if (b.isFunction(k)) {
                    k(p.ErrorCode, p.ErrorString)
                }
            })
        } else {
            q = p._innerFun(h, g.makeParams(l, n));
            if (p.ErrorCode == 0) {
                p._HowManyImagesInBuffer = p._innerFun("HowManyImagesInBuffer");
                p.__cIndex = p._innerFun("CurrentImageIndexInBuffer")
            }
        }
        return q
    };
    e.SaveSelectedImagesToBytes = function(j, h) {
        b.Errors.HTML5NotSupport(this);
        return c
    };
    e.LoadImageFromBytes = function(k, h, j) {
        b.Errors.HTML5NotSupport(this);
        return c
    };
    e.UnregisterEvent = function(h, k) {
        var j = ["__", h].join("");
        this[j] = null;
        return a
    };
    e.first = function() {
        var j = this,
            h = j._UIManager.count();
        if (h > 0) {
            j._UIManager.getView().Go(0);
            g.__innerRefreshFromUIView(j, j._UIManager.GetCurrentImageIndex())
        }
        return a
    };
    e.previous = function() {
        var j = this,
            h = j._UIManager.count();
        if (h > 0) {
            j._UIManager.getView().__Previous();
            g.__innerRefreshFromUIView(j, j._UIManager.GetCurrentImageIndex())
        }
        return a
    };
    e.next = function() {
        var j = this,
            h = j._UIManager.count();
        if (h > 0) {
            j._UIManager.getView().__Next();
            g.__innerRefreshFromUIView(j, j._UIManager.GetCurrentImageIndex())
        }
        return a
    };
    e.last = function() {
        var j = this,
            h = j._UIManager.count();
        if (h > 0) {
            j._UIManager.getView().Go(h - 1);
            g.__innerRefreshFromUIView(j, j._UIManager.GetCurrentImageIndex())
        }
        return a
    };
    e.SetCancel = function(j, h) {
        return this._innerSend("SetCancel", null, a, j, h)
    };
    e.SetImageWidth = function(h, j) {
        return this._innerFun("SetImageWidth", g.makeParams(h, j))
    };
    e.HTTPDownloadStreamThroughPost = function(j, h) {
        b.Errors.HTML5NotSupport(this);
        return c
    };
    e.HTTPUploadStreamThroughPost = function(l, k, h, m, j) {
        b.Errors.HTML5NotSupport(this);
        return c
    };
    e.HTTPDownloadThroughPost = function(t, h, j, s, l) {
        var n = this,
            k = g.combineUrl(n, t, h),
            q, p;
        if (k === c) {
            b.Errors.ParameterCannotEmpty(n);
            return c
        }
        if (g.isServerInvalid(n)) {
            if (b.isFunction(l)) {
                l(n.ErrorCode, n.ErrorString)
            }
            return c
        }
        if (!b.html5.Funs.checkProductKey(n, {
                Core: a
            })) {
            if (b.isFunction(l)) {
                l(n._errorCode, n._errorString)
            }
            return c
        }
        if (!b.html5.Funs.checkPDFProductKeyWhenNeeds(n, j)) {
            if (b.isFunction(l)) {
                l(n._errorCode, n._errorString)
            }
            return c
        }
        b.cancelFrome = 2;
        b.showProgress(n, "HttpDownloadThroughPost", a);
        q = "post";
        var r = function(u) {
                var v = (u.total === 0) ? 100 : Math.round(u.loaded * 100 / u.total),
                    w = [u.loaded, " / ", u.total].join("");
                n._OnPercentDone([0, v, "", "http"])
            },
            m = a;
        n._OnPercentDone([0, -1, "HTTP Downloading...", "http"]);
        if (!b.isFunction(s)) {
            m = c
        }
        p = g.loadHttpBlob(n, q, k, m, function(u) {
            n._OnPercentDone([0, -1, "Loading..."]);
            var w = "",
                v = j;
            if (v < -1 || v > 5) {
                v = -1
            }
            n.__LoadImageFromBytes(u, v, w, m, s, l)
        }, function() {
            b.closeProgress("HttpDownloadThroughPost");
            if (b.isFunction(l)) {
                l(n.ErrorCode, n.ErrorString)
            }
        }, r);
        return p
    };
    e.HTTPDownloadThroughGet = function(t, h, j, s, l) {
        var n = this,
            k = g.combineUrl(n, t, h),
            q, p;
        if (k === c) {
            b.Errors.ParameterCannotEmpty(n);
            return c
        }
        if (g.isServerInvalid(n)) {
            if (b.isFunction(l)) {
                l(n.ErrorCode, n.ErrorString)
            }
            return c
        }
        if (!b.html5.Funs.checkProductKey(n, {
                Core: a
            })) {
            if (b.isFunction(l)) {
                l(n._errorCode, n._errorString)
            }
            return c
        }
        if (!b.html5.Funs.checkPDFProductKeyWhenNeeds(n, j)) {
            if (b.isFunction(l)) {
                l(n._errorCode, n._errorString)
            }
            return c
        }
        b.cancelFrome = 2;
        q = "get";
        b.showProgress(n, "HTTPDownloadThroughGet", a);
        var r = function(u) {
                var v = (u.total === 0) ? 100 : Math.round(u.loaded * 100 / u.total),
                    w = [u.loaded, " / ", u.total].join("");
                n._OnPercentDone([0, v, "", "http"])
            },
            m = a;
        n._OnPercentDone([0, -1, "HTTP Downloading...", "http"]);
        if (!b.isFunction(s)) {
            m = c
        }
        p = g.loadHttpBlob(n, q, k, m, function(u) {
            n._OnPercentDone([0, -1, "Loading..."]);
            var w = "",
                v = j;
            if (v < -1 || v > 5) {
                v = -1
            }
            n.__LoadImageFromBytes(u, v, w, m, s, l)
        }, function() {
            b.closeProgress("HTTPDownloadThroughGet");
            if (b.isFunction(l)) {
                l(n.ErrorCode, n.ErrorString)
            }
        }, r);
        return p
    };
    e.SetCustomDSDataEx = function(h) {
        return this._innerFun("SetCustomDSDataEx", g.makeParams(h))
    };
    e.SetCustomDSData = function(h) {
        var j = g.replaceLocalFilename(h);
        return this._innerFun("SetCustomDSData", g.makeParams(j))
    };
    e.GetCustomDSDataEx = function() {
        return this._innerFun("GetCustomDSDataEx")
    };
    e.GetCustomDSData = function(h) {
        var j = g.replaceLocalFilename(h);
        return this._innerFun("GetCustomDSData", g.makeParams(j))
    };
    e.ChangeBitDepth = function(j, h, k) {
        return this._innerFun("ChangeBitDepth", g.makeParams(j, h, k))
    };
    e.ConvertToGrayScale = function(h) {
        return this._innerFun("ConvertToGrayScale", g.makeParams(h))
    };
    e.ShowImageEditorEx = function(j, n, h, m, k) {
        var l = this;
        return l._UIManager.ShowImageEditorEx(j, n, h, m, k)
    };
    e.ClearTiffCustomTag = function() {
        return this._innerFun("ClearTiffCustomTag")
    };
    e.SetTiffCustomTag = function(j, h, k) {
        return this._innerFun("SetTiffCustomTag", g.makeParams(j, h, k))
    };
    e.IsBlankImage = function(h) {
        return this._innerFun("IsBlankImage", g.makeParams(h, c))
    };
    e.IsBlankImageExpress = function(h) {
        return this._innerFun("IsBlankImage", g.makeParams(h, a))
    };
    e.GetVersionInfoAsync = function(j, h) {
        return this._innerSend("VersionInfo", null, a, j, h)
    };
    e.SetOpenSourceTimeout = function(h) {
        return this._innerFun("SetOpenSourceTimeout", g.makeParams(h))
    };
    e.GetLicenseInfo = function() {
        var j = this,
            h;
        if (!j.__licenseInfo) {
            if (g.isHttpServerInvalid(j)) {
                return c
            }
            var h = j._innerFunRaw("GetLicenseInfo", null, c, c, a);
            if (h && !h.exception) {
                j.__licenseInfo = h
            }
        }
        return j.__licenseInfo
    };
    e.GetImageURL = function(p, j, h, t) {
        var n = this,
            q = p,
            r = parseInt(j),
            m = parseInt(h),
            s, k, l;
        if (t) {
            s = "";
            k = "dwt://"
        } else {
            s = n.httpUrl;
            k = "dwt/"
        }
        l = [s, k, "dwt_", d.Trial ? "trial_" : "", b.replaceAll(d.ServerVersionInfo, ",", ""), "/img?id=", n.clientId];
        if (b.isUndefined(q) || q === null) {
            b.Errors.IndexNullOrUndefined(n);
            return ""
        }
        q = parseInt(q);
        if (isNaN(q)) {
            b.Errors.InvalidIndex(n);
            return ""
        }
        if (q < 0 || q >= n.HowManyImagesInBuffer) {
            b.Errors.IndexOutOfRange(n);
            return ""
        }
        l.push("&index=");
        l.push(q);
        if (r > 0 && m > 0) {
            l.push("&width=");
            l.push(r);
            l.push("&height=");
            l.push(m)
        }
        l.push("&t=");
        l.push(new Date().getTime());
        return l.join("")
    };
    e.SetLanguage = function(h) {
        return this._innerFun("SetLanguageForSecurity", g.makeParams(h))
    };
    e.GetImagePartURL = function(h, j, k) {
        return this.GetImageURL(h, j, k, !0)
    }
})(Dynamsoft.Lib);
(function(b) {
    if (!b.product.bChromeEdition) {
        return
    }
    var a = true,
        d = false,
        e = {
            output: function(f) {}
        };

    function c(f) {
        var g = this;
        g._maxPosition = 0;
        g._currentPosition = 0;
        g._PagePositionSize = 1;
        g._track = 1;
        g.Horizontal = d;
        g.Width = 16;
        g.Height = -1;
        g.Left = 0;
        g.Top = 0;
        g.Right = 0 + g.Width;
        g.Bottom = 0 + g.Height;
        g.bgColor = "#D4D0C8";
        g.boxOuterBorderLightColor = "#D4D0C8";
        g.boxOuterBorderDarkColor = "#404040";
        g.boxInnerBorderLightColor = "#FFFFFF";
        g.boxInnerBorderDarkColor = "#808080";
        g.arrowColor = "#D4D0C8";
        g.arrowHoverColor = "#BBBBBB";
        g.slideColor = "#D4D0C8";
        g.draggingColor = "#BBBBBB";
        g.hoverColor = "#D4D0C8";
        g.arrowSize = g.Width;
        g.scrollSize = -1;
        g.scrollZeroPos = g.arrowSize;
        g.slideSize = -1;
        g.minslideSize = 18;
        g.dragging = d;
        g.mousePos_StartDrag = {
            x: -1,
            y: -1
        };
        g.mousePos_Dragging = {
            x: -1,
            y: -1
        };
        g.mousePos = {
            x: -1,
            y: -1
        };
        g.bFocus = d;
        g.borderWidth = 1;
        g.borderStyle = 0;
        g.canvas = d;
        g.bCanvas = d;
        if (b.product.bChromeEdition) {
            g.bCanvas = a
        }
        g.divSlide = d;
        g.divArrow1 = d;
        g.divArrow2 = d;
        g.bFloatValue = a;
        g.__init(f)
    }
    c.prototype.__changeSizeForData = function(g, f) {
        var h = this;
        h.Width = g;
        h.Height = f;
        if (h.Horizontal) {
            h.scrollSize = h.Width - 2 * h.Height;
            h.arrowSize = h.Height
        } else {
            h.scrollSize = h.Height - 2 * h.Width;
            h.arrowSize = h.Width
        }
        h.scrollZeroPos = h.arrowSize;
        if (h.canvas) {
            h.canvas.width = g;
            h.canvas.height = f
        }
    };
    c.prototype.__init = function(f) {
        var h = this,
            g = window.document;
        if (f.MaxValue) {
            h._maxPosition = f.MaxValue
        }
        if (f.Value) {
            h.SetPosition(f.Value)
        }
        h.Horizontal = f.Horizontal;
        h.__changeSizeForData(f.Width, f.Height);
        if (h.bCanvas) {
            h.canvas = document.createElement("canvas");
            h.canvas.width = h.Width;
            h.canvas.height = h.Height
        } else {
            h.canvas = document.createElement("div");
            h.canvas.style.width = h.Width + "px";
            h.canvas.style.height = h.Height + "px";
            h.canvas.style.border = "1px solid #CCC";
            h.canvas.style.position = "relative";
            h.divSlide = document.createElement("div");
            h.divSlide.style.position = "absolute";
            h.divSlide.style.top = "0";
            h.divSlide.style.left = "0";
            h.divArrow1 = document.createElement("div");
            h.divArrow1.style.position = "absolute";
            h.divArrow1.style.top = "0";
            h.divArrow1.style.left = "0";
            h.divArrow2 = document.createElement("div");
            h.divArrow2.style.position = "absolute";
            h.divArrow2.style.top = "0";
            h.divArrow2.style.left = "0";
            h.canvas.appendChild(h.divArrow1);
            h.canvas.appendChild(h.divSlide);
            h.canvas.appendChild(h.divArrow2);
            h.arrowColor = "#777";
            h.arrowSize = 12
        }
        h.canvas.onselectstart = function() {
            return d
        };
        Dynamsoft.Lib.addEventListener(h.canvas, "mousedown", function(j) {
            h.onMouseDown(j);
            b.stopPropagation(j)
        });
        Dynamsoft.Lib.addEventListener(h.canvas, "mouseenter", function(j) {
            h.bFocus = a
        });
        Dynamsoft.Lib.addEventListener(h.canvas, "mouseleave", function(j) {
            h.bFocus = d
        });
        h.onValueChanged = f.onValueChanged
    };
    c.prototype.InitScroll = function(f, g) {
        var j = this,
            h = 0;
        if (f >= g && g >= 0) {
            j._PagePositionSize = g;
            h = (f - g);
            j.SetMaxPosition(h);
            return a
        }
        return d
    };
    c.prototype.GetPagePositionSize = function() {
        var f = this;
        return f._PagePositionSize
    };
    c.prototype.SetPagePositionSize = function(f) {
        var g = this;
        g._PagePositionSize = f;
        return a
    };
    c.prototype.__getCurrentPage = function() {
        var f = this;
        return f._currentPosition / f._PagePositionSize
    };
    c.prototype.GetMaxPage = function() {
        var f = this;
        return f._maxPosition / f._PagePositionSize - 1
    };
    c.prototype.GetCurrentPosition = function() {
        var f = this;
        return f._currentPosition
    };
    c.prototype.SetPosition = function(f) {
        var h = this,
            g = f;
        if (b.isUndefined(f) || b.isNaN(f)) {
            f = 0
        }
        if (g < 0) {
            g = 0
        } else {
            if (g > h._maxPosition) {
                g = h._maxPosition
            }
        }
        h._currentPosition = g
    };
    c.prototype.GetEL = function() {
        return this.canvas
    };
    c.prototype.Refresh = function() {
        this.__drawScroll();
        return a
    };
    c.prototype.ChangeControlSize = function(g, f) {
        var h = this;
        h.__changeSizeForData(g, f);
        h.__drawFrame();
        h.__drawScroll()
    };
    c.prototype.GetControlHeight = function() {
        return this.Height
    };
    c.prototype.GetControlWidth = function() {
        return this.Width
    };
    c.prototype.onMouseDown = function(t) {
        var m = this,
            p = t.target,
            j = d,
            h, r, k, s, l, n, q;
        if (p == m.canvas || p == m.divArrow1 || p == m.divArrow2) {
            if (p == m.canvas) {
                h = b.DOM.getOffset(t);
                e.output("mouse down" + h.x + " " + h.y);
                if (m.Horizontal) {
                    n = h.x
                } else {
                    n = h.y
                }
            } else {
                if (p == m.divArrow1) {
                    n = 0
                } else {
                    if (p == m.divArrow2) {
                        n = m.scrollSize + m.arrowSize
                    }
                }
            }
            if (n <= m.arrowSize) {
                q = m._currentPosition;
                m.__click_previous();
                if (q != m._currentPosition) {
                    m.__fireEvent("onValueChanged", {
                        Value: m._currentPosition,
                        EventName: "onPrevious"
                    })
                }
            } else {
                if (n >= m.scrollSize + m.arrowSize) {
                    q = m._currentPosition;
                    m.__click_next();
                    if (q != m._currentPosition) {
                        m.__fireEvent("onValueChanged", {
                            Value: m._currentPosition,
                            EventName: "onNext"
                        })
                    }
                } else {
                    q = m._currentPosition;
                    r = m.__getPosDirection(h.x, h.y);
                    if (r < 0) {
                        m.PageUp();
                        if (q != m._currentPosition) {
                            m.__fireEvent("onValueChanged", {
                                Value: m._currentPosition,
                                EventName: "onPageUp"
                            })
                        }
                    } else {
                        if (r > 0) {
                            m.PageDown();
                            if (q != m._currentPosition) {
                                m.__fireEvent("onValueChanged", {
                                    Value: m._currentPosition,
                                    EventName: "onPageDown"
                                })
                            }
                        } else {
                            j = a
                        }
                    }
                }
            }
        } else {
            if (p == m.divSlide) {
                h = b.DOM.getOffset(t);
                r = 0;
                j = a;
                e.output("mouse down" + h.x + " " + h.y)
            }
        }
        if (j) {
            m.dragging = a;
            m.canvas.style.cursor = "default";
            m.mousePos_StartDrag.x = h.x;
            m.mousePos_StartDrag.y = h.y;
            m.mousePos_Dragging.x = h.x;
            m.mousePos_Dragging.y = h.y;
            var g, f, u = t || event;
            disX = u.clientX;
            disY = u.clientY;
            if (m.canvas.setCapture) {
                g = m.canvas;
                m.canvas.setCapture()
            } else {
                g = document
            }
            onMouseMove = function(x) {
                var w = x || event,
                    y = {
                        x: 0,
                        y: 0
                    };
                y.x = m.mousePos_StartDrag.x + w.clientX - disX;
                y.y = m.mousePos_StartDrag.y + w.clientY - disY;
                e.output("onMouseMove: " + y.x + " " + y.y);
                if (m.dragging) {
                    var v = m.__caculateDraggingNewPosition(y.x, y.y);
                    if (v != m._currentPosition) {
                        m.SetPosition(v);
                        m.__fireEvent("onValueChanged", {
                            Value: m._currentPosition,
                            EventName: "onMouseMoving"
                        })
                    }
                    m.__drawScroll("mousemove")
                }
            };
            onMouseUp = function(x) {
                var w = x || event,
                    y = {
                        x: 0,
                        y: 0
                    };
                y.x = m.mousePos_StartDrag.x + w.clientX - disX;
                y.y = m.mousePos_StartDrag.y + w.clientY - disY;
                e.output("onMouseUp: " + y.x + " " + y.y);
                if (m.canvas.releaseCapture) {
                    m.canvas.releaseCapture()
                }
                Dynamsoft.Lib.removeEventListener(g, "mouseup", onMouseUp);
                Dynamsoft.Lib.removeEventListener(g, "mousemove", onMouseMove);
                if (m.dragging) {
                    var v = m.__caculateDraggingNewPosition(y.x, y.y);
                    if (v != m._currentPosition) {
                        m.SetPosition(v);
                        m.__drawScroll();
                        m.__fireEvent("onValueChanged", {
                            Value: m._currentPosition,
                            EventName: "onMouseUp"
                        })
                    }
                    m.dragging = d;
                    m.mousePos_StartDrag.x = -1;
                    m.mousePos_StartDrag.y = -1
                }
            };
            Dynamsoft.Lib.addEventListener(g, "mouseup", onMouseUp);
            Dynamsoft.Lib.addEventListener(g, "mousemove", onMouseMove);
            m.__drawScroll("mousedown")
        }
    };
    c.prototype.GetScrollDelta = function(g) {
        var j = this,
            f, h;
        f = j.__caculateSlideSize();
        h = g * f;
        return h
    };
    c.prototype.ManualMoving = function(h) {
        var g = this,
            f;
        e.output("ManualMoving: " + [g._currentPosition, h].join(","));
        if (b.isUndefined(h) || b.isNaN(h) || b.isUndefined(g._currentPosition) || b.isNaN(g._currentPosition)) {
            return
        }
        f = g._currentPosition;
        g.SetPosition(g._currentPosition + h);
        if (f != g._currentPosition) {
            g.__fireEvent("onValueChanged", {
                Value: g._currentPosition,
                EventName: "onMouseMoving"
            })
        }
        g.__drawScroll("mousemove")
    };
    c.prototype.ManualMovingScroll = function(k) {
        var j = this,
            h = 0,
            f, g;
        g = j._currentPosition;
        f = j.__caculateSlideSize();
        h = j._currentPosition + (j._PagePositionSize * k / f);
        e.output("ManualMovingScroll: " + [k, f, k / f, j._currentPosition, h].join(","));
        j.SetPosition(h);
        if (g != j._currentPosition) {
            j.__fireEvent("onValueChanged", {
                Value: j._currentPosition,
                EventName: "onMouseMoving"
            })
        }
        j.__drawScroll("mousemove")
    };
    c.prototype.handlerKeyDown = function(g) {
        var j = this,
            f = a,
            h;
        if (!j.bFocus) {
            return f
        }
        h = j._currentPosition;
        switch (g.keyCode) {
            case 37:
                if (j.Horizontal) {
                    f = d;
                    j.Previous();
                    if (h != j._currentPosition) {
                        j.__fireEvent("onValueChanged", {
                            Value: j._currentPosition,
                            EventName: "onPrevious"
                        })
                    }
                }
                break;
            case 39:
                if (j.Horizontal) {
                    f = d;
                    j.Next();
                    if (h != j._currentPosition) {
                        j.__fireEvent("onValueChanged", {
                            Value: j._currentPosition,
                            EventName: "onNext"
                        })
                    }
                }
                break;
            case 38:
                if (!j.Horizontal) {
                    f = d;
                    j.Previous();
                    if (h != j._currentPosition) {
                        j.__fireEvent("onValueChanged", {
                            Value: j._currentPosition,
                            EventName: "onPrevious"
                        })
                    }
                }
                break;
            case 40:
                if (!j.Horizontal) {
                    f = d;
                    j.Next();
                    if (h != j._currentPosition) {
                        j.__fireEvent("onValueChanged", {
                            Value: j._currentPosition,
                            EventName: "onNext"
                        })
                    }
                }
                break;
            case 33:
                f = d;
                j.PageUp();
                if (h != j._currentPosition) {
                    j.__fireEvent("onValueChanged", {
                        Value: j._currentPosition,
                        EventName: "onPageUp"
                    })
                }
                break;
            case 34:
                f = d;
                j.PageDown();
                if (h != j._currentPosition) {
                    j.__fireEvent("onValueChanged", {
                        Value: j._currentPosition,
                        EventName: "onPageDown"
                    })
                }
                break;
            case 35:
                f = d;
                j.GoPosition(j._maxPosition);
                if (h != j._currentPosition) {
                    j.__fireEvent("onValueChanged", {
                        Value: j._currentPosition,
                        EventName: "onEnd"
                    })
                }
                break;
            case 36:
                f = d;
                j.GoPosition(0);
                if (h != j._currentPosition) {
                    j.__fireEvent("onValueChanged", {
                        Value: 0,
                        EventName: "onBegin"
                    })
                }
                break;
            default:
                break
        }
        return f
    };
    c.prototype.__click_previous = function() {
        var g = this,
            f;
        e.output("__click_previous from mouse click arrow");
        g.GoPosition(g._currentPosition - g._track, 200);
        if (g.canvas && g.bCanvas) {
            f = g.canvas.getContext("2d");
            g.__redrawUpOrLeftArrow(f, a)
        }
    };
    c.prototype.__click_next = function() {
        var g = this,
            f;
        e.output("__click_next from mouse click arrow");
        g.GoPosition(g._currentPosition + g._track, 200);
        if (g.canvas && g.bCanvas) {
            f = g.canvas.getContext("2d");
            g.__redrawDownOrRightArrow(f, a)
        }
    };
    c.prototype.Previous = function() {
        var f = this;
        e.output("previous");
        f.GoPosition(f._currentPosition - f._track)
    };
    c.prototype.Next = function() {
        var f = this;
        e.output("next");
        f.GoPosition(f._currentPosition + f._track)
    };
    c.prototype.PageUp = function() {
        var f = this;
        e.output("pageUp");
        f.GoPosition(f._currentPosition - f._PagePositionSize)
    };
    c.prototype.PageDown = function() {
        var f = this;
        e.output("pageDown");
        f.GoPosition(f._currentPosition + f._PagePositionSize)
    };
    c.prototype.GetMaxPosition = function() {
        return this._maxPosition
    };
    c.prototype.SetMaxPosition = function(f) {
        var g = this;
        if (b.isUndefined(f) || b.isNaN(f)) {
            g._maxPosition = 0;
            g._currentPosition = 0;
            return
        }
        g._maxPosition = f;
        if (g._maxPosition < 0) {
            g._maxPosition = 0
        }
        if (g._currentPosition < 0) {
            g._currentPosition = 0
        } else {
            if (g._currentPosition > g._maxPosition) {
                g._currentPosition = g._maxPosition
            }
        }
    };
    c.prototype.GoPage = function(g) {
        var h = this,
            f;
        e.output("go page: " + g);
        f = g * h._PagePositionSize;
        return h.GoPosition(f)
    };
    c.prototype.GoPosition = function(f, h) {
        var j = this,
            g;
        e.output("go position: " + f);
        j.SetPosition(f);
        if (h && h > 0) {
            setTimeout(function() {
                j.__drawScroll()
            }, h)
        } else {
            j.__drawScroll()
        }
    };
    c.prototype.__drawBoxBorder = function(s, f, l, r, m, q, v) {
        var u = this,
            k, j, w, n, C, h, A, z, t, g, D;
        z = Math.floor(f);
        t = Math.floor(l);
        if (r <= 0 || m <= 0) {
            return
        }
        try {
            g = Math.floor(r);
            D = Math.floor(m)
        } catch (B) {
            return
        }
        C = s.getImageData(z, t, g, D);
        n = C.data;
        h = u.__getHexColor(q);
        A = u.__getHexColor(v);
        w = 0;
        for (k = 0; k < g; k++) {
            n[w] = h[0];
            n[w + 1] = h[1];
            n[w + 2] = h[2];
            w += 4
        }
        k = 0;
        for (j = 0; j < D; j++) {
            w = (j * g + k) * 4;
            n[w] = h[0];
            n[w + 1] = h[1];
            n[w + 2] = h[2]
        }
        for (j = 0; j < D; j++) {
            k = g - 1;
            w = (j * g + k) * 4;
            n[w] = A[0];
            n[w + 1] = A[1];
            n[w + 2] = A[2]
        }
        w = (D - 1) * g * 4;
        for (k = 0; k < g; k++) {
            n[w] = A[0];
            n[w + 1] = A[1];
            n[w + 2] = A[2];
            w += 4
        }
        s.putImageData(C, z, t)
    };
    c.prototype.__drawUpTriangle = function(A, j, t) {
        var q = this,
            u, s, m, g, f, r, v = 9,
            n = 4,
            B, z, k, l;
        B = Math.floor(j);
        z = Math.floor(t);
        k = Math.floor(v);
        l = Math.floor(n);
        f = A.getImageData(B, z, k, l);
        g = f.data;
        for (s = 0; s < 4; s++) {
            u = 4 - s;
            r = u + 1 + 2 * s;
            m = (s * v + u) * 4;
            while (u < r) {
                g[m] = g[m + 1] = g[m + 2] = 0;
                u++;
                m += 4
            }
        }
        A.putImageData(f, j, t)
    };
    c.prototype.__drawDownTriangle = function(A, j, t) {
        var q = this,
            u, s, m, g, f, r, v = 9,
            n = 4,
            B, z, k, l;
        B = Math.floor(j);
        z = Math.floor(t);
        k = Math.floor(v);
        l = Math.floor(n);
        f = A.getImageData(B, z, k, l);
        g = f.data;
        for (s = 0; s < 4; s++) {
            u = s;
            r = u + 7 - 2 * s;
            m = (s * v + u) * 4;
            while (u < r) {
                g[m] = g[m + 1] = g[m + 2] = 0;
                u++;
                m += 4
            }
        }
        A.putImageData(f, j, t)
    };
    c.prototype.__drawLeftTriangle = function(A, j, t) {
        var q = this,
            u, s, m, g, f, r, v = 4,
            n = 7,
            B, z, k, l;
        B = Math.floor(j);
        z = Math.floor(t);
        k = Math.floor(v);
        l = Math.floor(n);
        f = A.getImageData(B, z, k, l);
        g = f.data;
        for (s = 0; s < n; s++) {
            if (s > 3) {
                u = s - 3
            } else {
                u = 3 - s
            }
            m = (s * v + u) * 4;
            while (u < v) {
                g[m] = g[m + 1] = g[m + 2] = 0;
                u++;
                m += 4
            }
        }
        A.putImageData(f, j, t)
    };
    c.prototype.__drawRightTriangle = function(z, j, s) {
        var q = this,
            t, r, m, g, f, u = 4,
            n = 7,
            A, v, k, l;
        A = Math.floor(j);
        v = Math.floor(s);
        k = Math.floor(u);
        l = Math.floor(n);
        f = z.getImageData(A, v, k, l);
        g = f.data;
        for (r = 0; r < n; r++) {
            t = 0;
            if (r > 3) {
                max = 7 - r
            } else {
                max = r + 1
            }
            m = (r * u + t) * 4;
            while (t < max) {
                g[m] = g[m + 1] = g[m + 2] = 0;
                t++;
                m += 4
            }
        }
        z.putImageData(f, j, s)
    };
    c.prototype.__drawBox = function(v, j, r, f, u, s, q, h, m, t) {
        var n = this,
            g = 0,
            k, l;
        if (f <= 0 || u <= 0) {
            return
        }
        try {
            k = Math.floor(f);
            l = Math.floor(u)
        } catch (p) {
            return
        }
        if (v) {
            v.fillStyle = s;
            v.fillRect(j, r, k, l);
            v.lineWidth = n.borderWidth;
            b.drawBoxBorder(v, j + g, r + g, k - g, l - g, q, h);
            j += n.borderWidth;
            r += n.borderWidth;
            k -= 2 * n.borderWidth;
            l -= 2 * n.borderWidth;
            b.drawBoxBorder(v, j + g, r + g, k - g, l - g, m, t)
        } else {
            if (n.divSlide) {
                n.divSlide.style.backgroundColor = s;
                n.divSlide.style.left = j + "px";
                n.divSlide.style.top = r + "px";
                n.divSlide.style.width = k + "px";
                n.divSlide.style.height = l + "px"
            }
        }
    };
    c.prototype.__drawBackground = function(u, s, m) {
        var n = this,
            r, q, l, g, f, v, t, j, k;
        u.fillStyle = n.bgColor;
        if (n.Width > 0 && n.Height > 0) {
            u.fillRect(n.borderWidth, n.borderWidth, n.Width - 2 * n.borderWidth, n.Height - 2 * n.borderWidth);
            v = 0;
            t = 0;
            j = Math.floor(s);
            k = Math.floor(m);
            f = u.getImageData(v, t, j, k);
            g = f.data;
            for (q = 0; q < m; q++) {
                r = (q % 2);
                l = (q * s + r) * 4;
                while (r < s) {
                    g[l] = g[l + 1] = g[l + 2] = 255;
                    r += 2;
                    l += 8
                }
            }
            u.putImageData(f, 0, 0)
        }
    };
    c.prototype.__drawUpButton = function(f, g) {
        var j = this,
            h;
        if (g) {
            h = j.arrowHoverColor
        } else {
            h = j.arrowColor
        }
        if (f) {
            j.__drawBox(f, 0, 0, j.arrowSize, j.arrowSize, h, j.boxOuterBorderLightColor, j.boxOuterBorderDarkColor, j.boxInnerBorderLightColor, j.boxInnerBorderDarkColor);
            j.__drawUpTriangle(f, 3, 6, j.arrowColor)
        } else {
            if (j.divArrow1) {
                j.divArrow1.style.top = -j.arrowSize / 4 + "px";
                j.divArrow1.style.left = (j.Width - j.arrowSize) / 2 + "px";
                j.divArrow1.style.borderStyle = "dotted dotted solid";
                j.divArrow1.style.borderWidth = j.arrowSize / 2 + "px";
                j.divArrow1.style.borderColor = "transparent transparent " + j.arrowColor;
                j.divArrow1.style.overflow = "hidden"
            }
        }
    };
    c.prototype.__drawDownButton = function(f, g) {
        var j = this,
            h;
        if (g) {
            h = j.arrowHoverColor
        } else {
            h = j.arrowColor
        }
        if (f) {
            j.__drawBox(f, 0, j.Height - j.arrowSize, j.arrowSize, j.arrowSize, h, j.boxOuterBorderLightColor, j.boxOuterBorderDarkColor, j.boxInnerBorderLightColor, j.boxInnerBorderDarkColor);
            j.__drawDownTriangle(f, 4, j.Height - 10, j.arrowColor)
        } else {
            if (j.divArrow2) {
                j.divArrow2.style.top = j.Height - j.arrowSize * 3 / 4 + "px";
                j.divArrow2.style.left = (j.Width - j.arrowSize) / 2 + "px";
                j.divArrow2.style.borderStyle = "dotted dotted solid";
                j.divArrow2.style.borderWidth = j.arrowSize / 2 + "px";
                j.divArrow2.style.borderColor = j.arrowColor + " transparent transparent";
                j.divArrow2.style.overflow = "hidden"
            }
        }
    };
    c.prototype.__drawLeftButton = function(f, g) {
        var j = this,
            h;
        if (g) {
            h = j.arrowHoverColor
        } else {
            h = j.arrowColor
        }
        if (f) {
            j.__drawBox(f, 0, 0, j.arrowSize, j.arrowSize, h, j.boxOuterBorderLightColor, j.boxOuterBorderDarkColor, j.boxInnerBorderLightColor, j.boxInnerBorderDarkColor);
            j.__drawLeftTriangle(f, 5, 4, j.arrowColor)
        } else {
            if (j.divArrow1) {
                j.divArrow1.style.top = (j.Height - j.arrowSize) / 2 + "px";
                j.divArrow1.style.left = -j.arrowSize / 4 + "px";
                j.divArrow1.style.borderStyle = "dotted solid dotted dotted";
                j.divArrow1.style.borderWidth = j.arrowSize / 2 + "px";
                j.divArrow1.style.borderColor = "transparent " + j.arrowColor + " transparent transparent";
                j.divArrow1.style.overflow = "hidden"
            }
        }
    };
    c.prototype.__drawRightButton = function(f, g) {
        var j = this,
            h;
        if (g) {
            h = j.arrowHoverColor
        } else {
            h = j.arrowColor
        }
        if (f) {
            j.__drawBox(f, j.Width - j.arrowSize, 0, j.arrowSize, j.arrowSize, h, j.boxOuterBorderLightColor, j.boxOuterBorderDarkColor, j.boxInnerBorderLightColor, j.boxInnerBorderDarkColor);
            j.__drawRightTriangle(f, j.Width - 10, 4, j.arrowColor)
        } else {
            if (j.divArrow2) {
                j.divArrow2.style.top = (j.Height - j.arrowSize) / 2 + "px";
                j.divArrow2.style.left = j.Width - j.arrowSize * 3 / 4 + "px";
                j.divArrow2.style.borderStyle = "dotted dotted solid dotted";
                j.divArrow2.style.borderWidth = j.arrowSize / 2 + "px";
                j.divArrow2.style.borderColor = "transparent transparent transparent " + j.arrowColor;
                j.divArrow2.style.overflow = "hidden"
            }
        }
    };
    c.prototype.__drawFrame = function() {
        var h = this,
            f = d,
            g = d;
        if (h.canvas && h.bCanvas) {
            f = h.canvas.getContext("2d");
            f.clearRect(0, 0, h.Width, h.Height);
            h.__drawBackground(f, h.Width, h.Height)
        }
        h.__redrawUpOrLeftArrow(f, g);
        h.__redrawDownOrRightArrow(f, g)
    };
    c.prototype.__redrawUpOrLeftArrow = function(f, g) {
        var h = this;
        if (h.Horizontal) {
            h.__drawLeftButton(f, g)
        } else {
            h.__drawUpButton(f, g)
        }
    };
    c.prototype.__redrawDownOrRightArrow = function(f, g) {
        var h = this;
        if (h.Horizontal) {
            h.__drawRightButton(f, g)
        } else {
            h.__drawDownButton(f, g)
        }
    };
    c.prototype.__drawScroll = function(m) {
        var n = this,
            g = 0,
            f, k, l = m || "",
            h = d,
            j;
        if (n._maxPosition > 0 && n.canvas) {
            n.canvas.style.display = "";
            k = n.__caculateSlideSize();
            f = Math.ceil(n.scrollZeroPos + n._currentPosition * k / n._PagePositionSize);
            e.output("__drawScroll: " + [f, n.__getCurrentPage(), k].join(","));
            if (n.canvas && n.bCanvas) {
                h = n.canvas.getContext("2d")
            }
            n.__drawFrame();
            if (l == "mousedown" || l == "mousemove") {
                j = n.bgColor
            } else {
                j = n.bgColor
            }
            if (n.Horizontal) {
                n.__drawBox(h, f, 0, n.slideSize, n.Height, j, n.boxOuterBorderLightColor, n.boxOuterBorderDarkColor, n.boxInnerBorderLightColor, n.boxInnerBorderDarkColor)
            } else {
                n.__drawBox(h, 0, f, n.Width, n.slideSize, j, n.boxOuterBorderLightColor, n.boxOuterBorderDarkColor, n.boxInnerBorderLightColor, n.boxInnerBorderDarkColor)
            }
        } else {
            if (n.canvas) {
                n.canvas.style.display = "none"
            }
        }
    };
    c.prototype.__caculateDraggingNewPosition = function(f, m) {
        var l = this,
            g, j = 0,
            k = 0,
            h;
        g = l.__caculateSlideSize();
        slidePos = l.__caculateSlidePos();
        if (l.Horizontal) {
            startPos = f - l.arrowSize;
            k = f - l.mousePos_Dragging.x;
            h = f
        } else {
            startPos = m - l.arrowSize;
            k = m - l.mousePos_Dragging.y;
            h = m
        }
        e.output("__caculateDraggingNewPosition: " + [l._currentPosition, l._PagePositionSize, k, g].join(","));
        j = l._currentPosition + (l._PagePositionSize * k / g);
        if (j < 0) {
            j = 0
        }
        if (j > l._maxPosition) {
            j = l._maxPosition
        }
        l.mousePos_Dragging.x = f;
        l.mousePos_Dragging.y = m;
        return j
    };
    c.prototype.__getPosDirection = function(g, k) {
        var j = this,
            f, h;
        f = j.__caculateSlidePos();
        if (j.Horizontal) {
            h = g
        } else {
            h = k
        }
        if (h < f.start) {
            return -1
        } else {
            if (h <= f.end) {
                return 0
            } else {
                return 1
            }
        }
    };
    c.prototype.__caculateSlidePos = function() {
        var j = this,
            h = {
                start: 0,
                end: 0
            },
            g, f;
        g = j.__caculateSlideSize();
        f = j.scrollSize + j.arrowSize;
        h.start = j.__getCurrentPage() * g + j.arrowSize;
        h.end = h.start + j.slideSize;
        if (h.end >= f) {
            h.end = f;
            h.start = f - j.slideSize
        }
        return h
    };
    c.prototype.__caculateSlideSize = function() {
        var h = this,
            f = 0,
            g = 0;
        g = h.scrollSize;
        if (h._maxPosition > 0 && g > 0) {
            h.slideSize = g * (h._PagePositionSize / (h._maxPosition + h._PagePositionSize));
            if (h.slideSize < h.minslideSize) {
                h.slideSize = h.minslideSize;
                f = (g - h.slideSize) * h._PagePositionSize / (h._maxPosition)
            } else {
                f = h.slideSize
            }
        }
        return f
    };
    c.prototype.__fireEvent = function(f, g) {
        var h = this;
        if (b.isFunction(h[f])) {
            return h[f](g)
        }
        return a
    };
    c.prototype.SetVisible = function(f) {
        var g = this;
        if (g.canvas) {
            if (f) {
                g.canvas.style.display = "";
                g.__drawFrame();
                g.__drawScroll()
            } else {
                g._maxPosition = 0;
                g._currentPosition = 0;
                g.canvas.style.display = "none"
            }
        }
    };
    c.prototype.GetVisible = function() {
        var f = this;
        if (f.canvas) {
            if (f.canvas.style.display == "none") {
                return d
            } else {
                return a
            }
        }
        return d
    };
    c.prototype.Destroy = function() {
        var f = this;
        f._maxPosition = 0;
        f._currentPosition = 0
    };
    c.prototype.SetLocation = function(f, h) {
        var g = this;
        g.Left = f;
        g.Top = h;
        g.Right = f + g.Width;
        g.Bottom = f + g.Height;
        if (g.canvas) {
            if (g.canvas.parentNode) {
                g.canvas.parentNode.style.position = "relative"
            }
            g.canvas.style.position = "absolute";
            g.canvas.style.left = f + "px";
            g.canvas.style.top = h + "px"
        }
    };
    Dynamsoft.Lib.UI = Dynamsoft.Lib.UI || {};
    Dynamsoft.Lib.UI.ScrollBar = c
})(Dynamsoft.Lib);
(function(b) {
    if (!b.product.bChromeEdition) {
        return
    }
    var a = true,
        c = false,
        d = {
            output: function(f) {}
        };

    function e(f) {
        var g = this;
        g.__controlWidth = 0;
        g.__controlHeight = 0;
        g.drawWidth = 0;
        g.drawHeight = 0;
        g.Left = 0;
        g.Top = 0;
        g.Right = 0;
        g.Bottom = 0;
        g.imageControl = f;
        g.__mousedownStatus = 0;
        g.mouse_zero_x = -1;
        g.mouse_zero_y = -1;
        g.mouse_x = 0;
        g.mouse_y = 0;
        g.selectedCanvasArea = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        g.canvas = c;
        g.lastClick = c;
        g.bCanvas = c;
        if (b.product.bChromeEdition) {
            g.bCanvas = a
        }
    }
    e.prototype.GetEL = function() {
        var f = this;
        if (!f.canvas) {
            f.canvas = document.createElement("canvas");
            f.canvas.style.position = "absolute";
            f.canvas.style.left = "0";
            f.canvas.style.top = "0"
        }
        return f.canvas
    };
    e.prototype.ChangeControlSize = function(g, f) {
        var j = this,
            h;
        j.__controlWidth = g;
        j.__controlHeight = f;
        if (j.canvas) {
            if (j.bCanvas) {
                j.canvas.width = j.__controlWidth;
                j.canvas.height = j.__controlHeight
            } else {
                j.canvas.style.width = j.__controlWidth;
                j.canvas.style.height = j.__controlHeight
            }
        }
    };
    e.prototype.SetDrawImageLocationAndSize = function(j, h, g, f) {
        var k = this;
        d.output("SetLocationAndSize: " + [j, h, g, f].join(","));
        k.drawWidth = g;
        k.drawHeight = f;
        k.Left = j;
        k.Top = h;
        k.Right = k.Left + k.drawWidth;
        k.Bottom = k.Top + k.drawHeight
    };
    e.prototype.__fireEvent = function(f, g) {
        var h = this;
        if (b.isFunction(h[f])) {
            return h[f](g)
        }
        return true
    };
    e.prototype.__MouseShapeIsHand = function() {
        var f = this;
        return f.imageControl.iMouseShape == EnumDWT_MouseShape.Hand
    };
    e.prototype.__MouseShapeIsZoom = function() {
        var f = this;
        return f.imageControl.iMouseShape == EnumDWT_MouseShape.Zoom
    };
    e.prototype.__GetSelectionRectAspectRatio = function() {
        var f = this;
        return f.imageControl.__fSelectionRectAspectRatio
    };
    e.prototype.__restoreCanvas = function(g, f, j) {
        var k = this;
        if (g) {
            g.canvas.width = f;
            g.canvas.height = j
        }
    };
    e.prototype.__draw_dashRect = function(g, m, f, n) {
        var k = this,
            q = k.canvas.getContext("2d"),
            l = k.drawWidth,
            s = k.drawHeight,
            r = g,
            p = m,
            h = f,
            j = n;
        if (!k.canvas) {
            return
        }
        d.output("__select_rect: " + [g, m, f, n].join(","));
        if (h < 0) {}
        if (h > l) {
            h = l
        }
        if (j < 0) {}
        if (j > s) {
            j = s
        }
        if (r < 0) {
            r = 0
        } else {
            if (r + h > l) {
                h = l - r
            }
        }
        if (p < 0) {
            p = 0
        } else {
            if (p + j > s) {
                j = s - p
            }
        }
        q = k.canvas.getContext("2d");
        k.__restoreCanvas(q, q.canvas.width, q.canvas.height);
        if (h > 0 && j > 0) {
            q.__dashedLineRect(r + k.Left, p + k.Top, h, j)
        }
    };
    e.prototype.SetSelectedArea = function(h, r, s, g, k) {
        var p = this,
            u = p.canvas.getContext("2d"),
            w, t, f, n, j, l, q = p.drawWidth,
            v = p.drawHeight,
            m = false;
        d.output("SetSelectedArea: " + [h, r, s, g].join(","));
        if (!p.canvas) {
            return false
        }
        if (h < s) {
            w = h;
            f = s
        } else {
            w = s;
            f = h
        }
        if (r < g) {
            t = r;
            n = g
        } else {
            t = g;
            n = r
        }
        if (w < 0) {
            w = 0
        }
        if (t < 0) {
            t = 0
        }
        j = f - w;
        l = n - t;
        if (j > q) {
            j = q;
            f = w + j
        }
        if (l > v) {
            l = v;
            n = t + l
        }
        if (h > q || r > v) {
            m = true
        } else {
            if (Math.abs(j) + Math.abs(l) <= 5) {
                m = true
            }
        }
        if (m) {
            w = p.selectedCanvasArea.left;
            t = p.selectedCanvasArea.top;
            f = p.selectedCanvasArea.right;
            n = p.selectedCanvasArea.bottom;
            if (w == 0 && t == 0 && f == 0 && n == 0) {} else {
                p.selectedCanvasArea.left = 0;
                p.selectedCanvasArea.top = 0;
                p.selectedCanvasArea.right = 0;
                p.selectedCanvasArea.bottom = 0;
                p.__restoreCanvas(u, u.canvas.width, u.canvas.height);
                if (k) {
                    p.__fireEvent("onImageAreaDeSelected")
                }
            }
        } else {
            p.selectedCanvasArea.left = w;
            p.selectedCanvasArea.top = t;
            p.selectedCanvasArea.right = f;
            p.selectedCanvasArea.bottom = n;
            p.__draw_dashRect(w, t, j, l);
            if (k && (p.__mousedownStatus == 0)) {
                p.__fireEvent("onImageAreaSelected", {
                    left: w,
                    top: t,
                    right: f,
                    bottom: n,
                    fromScroll: false
                })
            }
        }
        return true
    };
    e.prototype.ReFireSelectedEventWhenImageMoved = function() {
        var k = this,
            g, h, j, f;
        g = k.selectedCanvasArea.left;
        h = k.selectedCanvasArea.top;
        j = k.selectedCanvasArea.right;
        f = k.selectedCanvasArea.bottom;
        if (g != 0 && h != 0 && j != 0 && f != 0) {
            k.__fireEvent("onImageAreaSelected", {
                left: g,
                top: h,
                right: j,
                bottom: f,
                fromScroll: true
            })
        }
    };
    e.prototype.SetMouseShape = function(k) {
        var m = this,
            f, h, j, l, g;
        if (m.canvas) {
            f = m.canvas.getContext("2d");
            if (k == EnumDWT_MouseShape.Hand) {
                m.canvas.style.cursor = "pointer";
                h = m.selectedCanvasArea.left;
                j = m.selectedCanvasArea.top;
                l = m.selectedCanvasArea.right;
                g = m.selectedCanvasArea.bottom;
                if (h == 0 && j == 0 && l == 0 && g == 0) {} else {
                    m.SetSelectedArea(0, 0, 0, 0, true)
                }
            } else {
                if (k == EnumDWT_MouseShape.Crosshair) {
                    m.canvas.style.cursor = "crosshair"
                } else {
                    if (k == EnumDWT_MouseShape.Zoom) {
                        if (b.env.bIE) {
                            m.canvas.style.cursor = ""
                        } else {
                            m.canvas.style.cursor = "zoom-in"
                        }
                    } else {
                        m.canvas.style.cursor = ""
                    }
                }
            }
        }
    };
    e.prototype.Destroy = function() {
        var j = this,
            h;
        d.output("Destroy:");
        if (j.canvas) {
            h = j.canvas.parentNode;
            if (h) {
                h.removeChild(j.canvas)
            }
        }
        var g = Dynamsoft.Lib.UI.ImageAreaSelectorEvt,
            f = g.indexOf(j);
        if (f >= 0) {
            g.splice(f, 1)
        }
    };
    e.prototype.__movingRect = function() {};
    e.prototype.__funReSelectArea = function(p) {
        var l = this,
            r, q, f, k, n, g = true;
        r = l.mouse_zero_x;
        q = l.mouse_zero_y;
        f = l.mouse_x;
        k = l.mouse_y;
        n = l.__GetSelectionRectAspectRatio();
        if (n > 0) {
            var j, h, m = 1;
            if (n < 1) {
                h = k - q;
                j = h * n;
                if (f > r && k > q || f < r && k < q) {
                    f = r + j;
                    m = -1
                } else {
                    if (f > r && k < q || f < r && k > q) {
                        f = r - j
                    }
                }
                if (f > l.drawWidth || f < 0) {
                    if (f > l.drawWidth) {
                        f = l.drawWidth
                    } else {
                        if (f < 0) {
                            f = 0
                        }
                    }
                    j = m * (r - f);
                    h = j / n;
                    k = q + h
                }
            } else {
                j = f - r;
                h = j / n;
                if (f > r && k > q || f < r && k < q) {
                    k = q + h;
                    m = -1
                } else {
                    if (f > r && k < q || f < r && k > q) {
                        k = q - h
                    }
                }
                if (k > l.drawHeight || k < 0) {
                    if (k > l.drawHeight) {
                        k = l.drawHeight
                    } else {
                        if (k < 0) {
                            k = 0
                        }
                    }
                    h = m * (q - k);
                    j = h * n;
                    f = r + j
                }
            }
        }
        l.SetSelectedArea(r, q, f, k, true)
    };
    e.prototype.BindEvents = function() {
        var g = this,
            f;
        f = g.canvas.getContext("2d");
        Dynamsoft.Lib.UI.ImageAreaSelectorEvt.push(g);
        Dynamsoft.Lib.addEventListener(g.canvas, "mousemove", function(j) {
            var h;
            h = b.DOM.getOffset(j, g);
            if (h.x < 0) {
                h.x = 0
            } else {
                if (h.x > g.drawWidth) {
                    h.x = g.drawWidth
                }
            }
            if (h.y < 0) {
                h.y = 0
            } else {
                if (h.y > g.drawHeight) {
                    h.y = g.drawHeight
                }
            }
            if (g.__mousedownStatus) {
                if (h.x == g.mouse_zero_x && h.y == g.mouse_zero_y) {
                    return
                }
            }
            g.mouse_x = h.x;
            g.mouse_y = h.y;
            g.__fireEvent("onMouseMove", {
                e: j,
                dragging: (g.__mousedownStatus != 0),
                x: h.x,
                y: h.y,
                origX: g.mouse_zero_x,
                origY: g.mouse_zero_y
            });
            if (!g.__MouseShapeIsHand()) {
                if (g.__mousedownStatus) {
                    g.__funReSelectArea()
                }
            }
        });
        Dynamsoft.Lib.addEventListener(g.canvas, "mousedown", function(l) {
            var k, j = new Date(),
                h;
            g.__mousedownStatus = 1;
            if (g.lastClick) {
                h = j.getTime() - g.lastClick.getTime()
            }
            g.lastClick = j;
            k = b.DOM.getOffset(l, g);
            if (k.x < 0) {
                k.x = 0
            } else {
                if (k.x > g.drawWidth) {
                    k.x = g.drawWidth
                }
            }
            if (k.y < 0) {
                k.y = 0
            } else {
                if (k.y > g.drawHeight) {
                    k.y = g.drawHeight
                }
            }
            d.output("click on selector canvase: " + [k.x, k.y].join(","));
            g.SetSelectedArea(0, 0, 0, 0, true);
            g.mouse_zero_x = parseInt(k.x);
            g.mouse_zero_y = parseInt(k.y);
            if (h < 500) {
                g.__fireEvent("onMouseDoubleClick", {
                    e: l,
                    x: k.x,
                    y: k.y
                });
                g.lastClick = false
            } else {
                if (l.which ? l.which == 3 : l.button == 2) {
                    g.__fireEvent("onMouseRightClick", {
                        e: l,
                        x: k.x,
                        y: k.y
                    })
                } else {
                    g.__fireEvent("onMouseClick", {
                        e: l,
                        x: k.x,
                        y: k.y
                    })
                }
            }
            b.stopPropagation(l)
        });
        Dynamsoft.Lib.addEventListener(g.canvas, "mouseup", function(l) {
            var j;
            if (g.mouse_zero_x < 0 && g.mouse_zero_y < 0) {
                g.__mousedownStatus = 0;
                g.mouse_zero_x = -1;
                g.mouse_zero_y = -1;
                return
            }
            j = b.DOM.getOffset(l, g);
            if (j.x < 0) {
                j.x = 0
            } else {
                if (j.x > g.drawWidth) {
                    j.x = g.drawWidth
                }
            }
            if (j.y < 0) {
                j.y = 0
            } else {
                if (j.y > g.drawHeight) {
                    j.y = g.drawHeight
                }
            }
            g.mouse_x = j.x;
            g.mouse_y = j.y;
            g.__mousedownStatus = 0;
            if (g.__MouseShapeIsHand()) {
                g.__restoreCanvas(f, f.canvas.width, f.canvas.height)
            } else {
                if (g.__MouseShapeIsZoom()) {
                    if (Math.abs(k) < 3 && Math.abs(h) < 3) {
                        g.__fireEvent("onZoom", {
                            e: l,
                            x: j.x,
                            y: j.y,
                            out: false
                        })
                    } else {
                        var n, m;
                        n = (j.x + g.mouse_zero_x) / 2;
                        m = (j.y + g.mouse_zero_y) / 2;
                        g.__fireEvent("onZoom", {
                            e: l,
                            x: n,
                            y: m,
                            out: false
                        });
                        g.__funReSelectArea()
                    }
                } else {
                    var k = j.x - g.mouse_zero_x,
                        h = j.y - g.mouse_zero_y;
                    if (Math.abs(k) < 3 && Math.abs(h) < 3) {} else {
                        g.__funReSelectArea();
                        g.__fireEvent("onMouseUp", {
                            e: l,
                            x: j.x,
                            y: j.y,
                            out: false
                        })
                    }
                }
            }
            g.mouse_zero_x = -1;
            g.mouse_zero_y = -1;
            b.stopPropagation(l)
        })
    };
    e.prototype.__InvokeMouseUpOutside = function(j) {
        var k = this;
        var g;
        if (k.mouse_zero_x < 0 && k.mouse_zero_y < 0) {
            k.__mousedownStatus = 0;
            k.mouse_zero_x = -1;
            k.mouse_zero_y = -1;
            return
        }
        g = b.DOM.getOffset(j, k);
        if (g.x < 0) {
            g.x = 0
        } else {
            if (g.x > k.drawWidth) {
                g.x = k.drawWidth
            }
        }
        if (g.y < 0) {
            g.y = 0
        } else {
            if (g.y > k.drawHeight) {
                g.y = k.drawHeight
            }
        }
        if (k.__mousedownStatus) {
            k.__mousedownStatus = 0;
            if (!k.__MouseShapeIsHand()) {
                var h = g.x - k.mouse_zero_x,
                    f = g.y - k.mouse_zero_y;
                if (Math.abs(h) < 3 && Math.abs(f) < 3) {} else {
                    k.__funReSelectArea(true)
                }
            }
        }
        k.mouse_zero_x = -1;
        k.mouse_zero_y = -1;
        k.__fireEvent("onMouseUp", {
            e: j,
            x: -1,
            y: -1,
            out: true
        })
    };
    e.prototype.__isInSelectedArea = function(l) {
        var k = this,
            g, h, j, f;
        g = k.selectedCanvasArea.left;
        h = k.selectedCanvasArea.top;
        j = k.selectedCanvasArea.right;
        f = k.selectedCanvasArea.bottom;
        d.output("__deselectWhenMouseClick: " + [l.x, l.y, k.selectedCanvasArea.left, k.selectedCanvasArea.top, k.selectedCanvasArea.right, k.selectedCanvasArea.bottom].join(","));
        if (g == 0 && h == 0 && j == 0 && f == 0) {
            return false
        }
        if ((l.x >= g && l.x <= j) && (l.y >= h && l.y <= f)) {
            return true
        }
        return false
    };
    Dynamsoft.Lib.UI = Dynamsoft.Lib.UI || {};
    Dynamsoft.Lib.UI.ImageAreaSelector = e;
    Dynamsoft.Lib.UI.ImageAreaSelectorEvt = [];
    Dynamsoft.Lib.addEventListener(window, "mouseup", function(f) {
        var g = Dynamsoft.Lib.UI.ImageAreaSelectorEvt;
        for (var h = 0; h < g.length; h++) {
            g[h].__InvokeMouseUpOutside(f)
        }
    })
})(Dynamsoft.Lib);
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    CanvasRenderingContext2D.prototype.__dashedLineRect = function(n, j, c, p, f) {
        if (typeof f === "undefined") {
            f = 3
        }
        var l = [n, n, n + c, n];
        var k = [j, j, j, j + p];
        var m = [n + c, n, n + c, n + c];
        var h = [j, j + p, j + p, j + p];
        for (var d = 0; d < 4; d++) {
            var t = (m[d] - l[d]);
            var r = (h[d] - k[d]);
            var b = Math.floor(Math.sqrt(t * t + r * r));
            var g = (f <= 0) ? b : (b / f);
            var q = (r / b) * f;
            var s = (t / b) * f;
            this.beginPath();
            for (var e = 0; e < g; e++) {
                if (e % 2) {
                    this.lineTo(l[d] + e * s, k[d] + e * q)
                } else {
                    this.moveTo(l[d] + e * s, k[d] + e * q)
                }
            }
            this.stroke()
        }
    }
})(Dynamsoft.Lib);
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    var c = {
        output: function(d) {}
    };

    function b(d) {
        var e = this;
        e.MaxWidth = -1;
        e.MaxHeight = -1;
        e.fZoomValue = -1;
        e.ctx = false;
        e.left = -1;
        e.top = -1;
        if (d) {
            e.MaxWidth = d.MaxWidth;
            e.MaxHeight = d.MaxHeight;
            e.fZoomValue = d.fZoomValue;
            e.ctx = d.ctx;
            e.left = d.left;
            e.top = d.top
        }
        e.aryOverlayInfo = []
    }
    b.prototype.SetContext = function(d) {
        this.ctx = d
    };
    b.prototype.SetLocation = function(d, f) {
        var e = this;
        e.left = d;
        e.top = f
    };
    b.prototype.SetImageSize = function(d, e) {
        var f = this;
        f.MaxWidth = d;
        f.MaxHeight = e
    };
    b.prototype.SetZoom = function(d) {
        var e = this;
        e.fZoomValue = d
    };
    b.prototype.Add = function(j, h, m, f, e, g, d) {
        var k = this,
            l;
        l = {
            l: j,
            t: h,
            r: m,
            b: f,
            c: e,
            o: g
        };
        k.aryOverlayInfo.push(l);
        if (d) {
            k.__drawOne(l)
        }
        return true
    };
    b.prototype.Clear = function() {
        var d = this;
        d.aryOverlayInfo.splice(0)
    };
    b.prototype.Destroy = function() {
        var d = this;
        d.ctx = false;
        d.Clear()
    };
    b.prototype.Draw = function() {
        var g = this,
            f, d, e;
        if (g.ctx) {
            f = g.aryOverlayInfo.length;
            for (d = 0; d < f; d++) {
                e = g.aryOverlayInfo[d];
                g.__drawOne(e)
            }
        }
    };
    b.prototype.__drawOne = function(n) {
        var m = this,
            k, h, p, f, e, d, g, l, j;
        if (!m.ctx) {
            return
        }
        k = n.l;
        h = n.t;
        p = n.r;
        f = n.b;
        g = n.c;
        l = n.o;
        if (k < 0) {
            k = 0
        }
        if (h < 0) {
            h = 0
        }
        if (p > m.MaxWidth) {
            p = m.MaxWidth
        }
        if (f > m.MaxHeight) {
            f = m.MaxHeight
        }
        k *= m.fZoomValue;
        h *= m.fZoomValue;
        p *= m.fZoomValue;
        f *= m.fZoomValue;
        e = p - k;
        d = f - h;
        if (Dynamsoft.Lib.isNumber(g)) {
            g = Dynamsoft.Lib.getColor(g)
        }
        j = m.ctx.globalAlpha;
        m.ctx.fillStyle = g;
        m.ctx.globalAlpha = parseFloat(l);
        m.ctx.fillRect(m.left + k, m.top + h, e, d);
        m.ctx.globalAlpha = j
    };
    Dynamsoft.Lib.UI = Dynamsoft.Lib.UI || {};
    Dynamsoft.Lib.UI.ImageOverlay = b
})(Dynamsoft.Lib);
(function(c) {
    if (!c.product.bChromeEdition) {
        return
    }
    var b = true,
        d = false,
        e = {
            isNaNOrUndefined: function(f) {
                return c.isUndefined(f) || c.isNaN(f)
            },
            getAdjustedImageSize: function(p, j, q, k) {
                var m = {
                        w: p,
                        h: j,
                        zoom: 1
                    },
                    f = Math.floor(q + 0.5),
                    n = Math.floor(k + 0.5);
                e.output(["image info:", p, ",", j, "; max is ", f, ",", n].join(""));
                if (f <= p || n <= j) {
                    if (f <= p && n <= j) {
                        var g = f / p,
                            l = n / j;
                        if (g < l) {
                            m.w = Math.floor(p * g + 0.5);
                            m.h = Math.floor(j * g + 0.5);
                            m.zoom = g
                        } else {
                            m.w = Math.floor(p * l + 0.5);
                            m.h = Math.floor(j * l + 0.5);
                            m.zoom = l
                        }
                    } else {
                        if (f <= p) {
                            m.zoom = f / p;
                            m.w = Math.floor(f + 0.5);
                            m.h = Math.floor(j * m.zoom + 0.5)
                        } else {
                            if (n <= j) {
                                m.zoom = n / j;
                                m.w = Math.floor(p * m.zoom + 0.5);
                                m.h = Math.floor(n + 0.5)
                            }
                        }
                    }
                }
                e.output(["change result:", m.w, ",", m.h].join(""));
                return m
            },
            getHex: function(g) {
                var f;
                f = Number(g).toString(16).toUpperCase();
                if (f.length == 1) {
                    f = ["0", f].join("")
                }
                return f
            },
            getColor: function(j) {
                var h, f, l, k;
                f = j >> 16;
                l = (j & 65280) >> 8;
                k = j & 255;
                h = ["#", e.getHex(k), e.getHex(l), e.getHex(f)].join("");
                return h
            },
            SetPageNumber: function(k, g) {
                var j = g * 1,
                    f, h;
                k.innerHTML = (j + 1);
                if (j >= 99 && j < 999) {
                    f = 32;
                    h = 24
                } else {
                    if (j >= 999 && j < 9999) {
                        f = 40;
                        h = 30
                    } else {
                        if (j >= 9999 && j < 99999) {
                            f = 46;
                            h = 34
                        } else {
                            if (j >= 99999) {
                                f = 55;
                                h = 36
                            } else {
                                f = 24;
                                h = 20
                            }
                        }
                    }
                }
                k.style.width = f + "px";
                k.style.height = h + "px";
                if (c.env.bFirefox) {} else {
                    k.style.lineHeight = h + "px"
                }
            },
            output: function(f) {
                if (Dynamsoft.WebTwainEnv.Debug) {
                    c.log(f)
                }
            }
        };

    function a(f) {
        var g = this;
        g._width = 0;
        g._height = 0;
        g.canvasWidth = 0;
        g.canvasHeight = 0;
        g.Left = 0;
        g.Top = 0;
        g.Right = 0;
        g.Bottom = 0;
        g.borderWidth = 1;
        g.borderColor = "#EEEEEE";
        g.selectionBorderColor = "#7DA2CE";
        g.backgroundColor = "#DDDDDD";
        g.bIfFitWindow = true;
        g.fitWindowType = 0;
        g.imageAreaSelector = false;
        g.bSelect = false;
        g.scrollH = false;
        g.scrollV = false;
        g.scrollArrowSize = 16;
        g.cIndex = -1;
        g.objImage = false;
        g.iMouseShape = EnumDWT_MouseShape.Default;
        g.fUserSetZoom = 1;
        g.fZoomValue = 1;
        g.fZoomInStep = 1.2;
        g.fZoomOutStep = 0.8;
        g.mousePosition = {
            x: -1,
            y: -1
        };
        g.mousePreviosPositionWhenMoving = {
            x: -1,
            y: -1
        };
        g.drawArea = {
            width: g.canvasWidth,
            height: g.canvasHeight,
            x: 0,
            y: 0
        };
        g.selectedImageArea = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        g.MoveStep = 10;
        g.__fSelectionRectAspectRatio = 0;
        g.bFocus = d;
        g.__overlay = d;
        g.bShowPageNumber = d;
        g.bVisible = b;
        g.divOut = d;
        g.divInner = d;
        g.divTag = d;
        g.canvas = d;
        g.bOrigMode = b;
        g.bHasOverlay = d;
        g._origImageWidth = -1;
        g._origImageHeight = -1;
        g.__init(f)
    }
    a.prototype.ChangeControlSize = function(g, f) {
        var h = this;
        h._width = g;
        h._height = f;
        h.canvasWidth = g;
        h.canvasHeight = f;
        h.Right = h.Left + h._width;
        h.Bottom = h.Top + h._height;
        h.divInner.style.height = h.canvasHeight + "px";
        h.__recaculateDrawArea();
        h.imageAreaSelector.ChangeControlSize(h.canvasWidth, h.canvasHeight);
        h.Show();
        return true
    };
    a.prototype.SetVisible = function(f) {
        var g = this;
        g.bVisible = f;
        if (f) {
            g.divOut.style.display = "";
            g.Show()
        } else {
            g.divOut.style.display = "none"
        }
        return true
    };
    a.prototype.SetOrigMode = function(g) {
        var f = this;
        if (f.bOrigMode && g == false && f.objImage) {
            f.objImage.onload = undefined;
            f.objImage.src = "data:,";
            f.objImage = d
        }
        this.bOrigMode = g
    };
    a.prototype.__init = function(f) {
        var h = this,
            g = window.document;
        if (f.Width) {
            h.canvasWidth = f.Width
        }
        if (f.Height) {
            h.canvasHeight = f.Height
        }
        if (f.index) {
            h.cIndex = f.index
        }
        h.divOut = g.createElement("div");
        h.divOut.style.position = "absolute";
        h.divOut.onselectstart = function() {
            return false
        };
        h.divInner = g.createElement("div");
        h.divInner.style.position = "relative";
        h.divInner.style.height = h.canvasHeight + "px";
        h.divTag = g.createElement("div");
        h.divTag.className = "imgTag";
        h.divTag.style.position = "absolute";
        h.divTag.style.height = "20px";
        h.canvas = g.createElement("canvas");
        h.canvas.width = h.canvasWidth;
        h.canvas.height = h.canvasHeight;
        h.divOut.appendChild(h.divInner);
        h.divInner.appendChild(h.divTag);
        h.divInner.appendChild(h.canvas);
        h.__createSelector(f);
        if (c.isFunction(f.onMouseRightClick)) {
            h.onMouseRightClick = f.onMouseRightClick
        }
        if (c.isFunction(f.onMouseClick)) {
            h.onMouseClick = f.onMouseClick
        }
        if (c.isFunction(f.onZoomChanged)) {
            h.onZoomChanged = f.onZoomChanged
        }
        h.__overlay = new Dynamsoft.Lib.UI.ImageOverlay()
    };
    a.prototype.bindEvents = function() {
        var g = this,
            f;
        f = g.divOut.parentNode;
        if (f) {
            g.imageAreaSelector.ChangeControlSize(g.canvasWidth, g.canvasHeight);
            g.imageAreaSelector.BindEvents();
            g.imageAreaSelector.SetMouseShape(g.iMouseShape)
        }
        return true
    };
    a.prototype.__getRealZoomValue = function() {
        var g = this,
            f;
        if (g.bOrigMode) {
            f = g.fZoomValue
        } else {
            if (g._origImageWidth <= 0) {
                g.__getImageOrignalSize()
            }
            if (g._origImageWidth > 0) {
                if (g.objImage != null && g.objImage.width != null) {
                    f = g.fZoomValue * g.objImage.width / g._origImageWidth
                }
            } else {
                e.output("cannot get image width.");
                f = -1
            }
        }
        return f
    };
    a.prototype.__getOrigImageWidth = function() {
        var f = this;
        if (f.bOrigMode && f.objImage) {
            return f.objImage.width
        } else {
            return f._origImageWidth
        }
    };
    a.prototype.__getOrigImageHeight = function() {
        var f = this;
        if (f.bOrigMode && f.objImage) {
            return f.objImage.height
        } else {
            return f._origImageHeight
        }
    };
    a.prototype.__checkNewZoomValue = function(f) {
        var h = this,
            g = Math.floor(f * 100);
        if (0 < g && g < 2500) {
            return true
        }
        return false
    };
    a.prototype.__checkZoomValue = function(f) {
        var h = this,
            g = 15000;
        if (h._origImageWidth <= 0 || h._origImageHeight <= 0) {
            return false
        }
        if (c.isUndefined(f)) {
            if (parseInt(h._origImageWidth * h.fZoomValue) > g || parseInt(h._origImageHeight * h.fZoomValue) > g) {
                return false
            }
        } else {
            if (parseInt(h._origImageWidth * f) > g || parseInt(h._origImageHeight * f) > g) {
                return false
            }
        }
        return true
    };
    a.prototype.__createSelector = function(f) {
        var h = this;
        if (!h.imageAreaSelector) {
            h.imageAreaSelector = new Dynamsoft.Lib.UI.ImageAreaSelector(h);
            var g = h.imageAreaSelector.GetEL();
            h.divInner.appendChild(g);
            h.imageAreaSelector.onMouseUp = function(j) {
                h.mousePreviosPositionWhenMoving.x = -1;
                h.mousePreviosPositionWhenMoving.y = -1
            };
            h.imageAreaSelector.onZoom = function(p) {
                var n, m, k, q, s = p.ddx,
                    r = p.ddy,
                    j;
                k = h.__getOrigImagePos();
                if (e.isNaNOrUndefined(k.x) || e.isNaNOrUndefined(k.y)) {
                    return
                }
                q = h.__getRealZoomValue();
                if (q < 0) {
                    return
                }
                n = (p.x + k.x) / q;
                m = (p.y + k.y) / q;
                var l = false;
                if (h.__checkZoomValue()) {
                    j = h.fZoomInStep * h.fZoomValue;
                    if (!h.__checkNewZoomValue(j)) {
                        j = 25;
                        l = true
                    }
                    if (h.fZoomValue != j) {
                        h.__zoomInAt(j, n, m, p.x, p.y)
                    } else {
                        l = true
                    }
                    h.__fireEvent("onZoomChanged", {
                        zoom: h.fZoomValue,
                        isMax: l,
                        index: h.cIndex
                    })
                } else {
                    h.__fireEvent("onZoomChanged", {
                        zoom: h.fZoomValue,
                        isMax: true,
                        index: h.cIndex
                    })
                }
                h.mousePreviosPositionWhenMoving.x = -1;
                h.mousePreviosPositionWhenMoving.y = -1
            };
            h.imageAreaSelector.onMouseMove = function(q) {
                var n, m, x, w, l, k = q.dragging,
                    u;
                l = h.__getOrigImagePos();
                if (e.isNaNOrUndefined(l.x) || e.isNaNOrUndefined(l.y)) {
                    return
                }
                u = h.__getRealZoomValue();
                if (u < 0) {
                    return
                }
                n = (q.x + l.x) / u;
                m = (q.y + l.y) / u;
                h.__fireEvent("onMouseMove", {
                    e: q.e,
                    x: n,
                    y: m,
                    index: h.cIndex
                });
                if ((h.iMouseShape == EnumDWT_MouseShape.Hand) && k) {
                    var t, s, r, p, j = h.__isShowScrollV(),
                        v = h.__isShowScrollH();
                    t = h.mousePreviosPositionWhenMoving.x;
                    s = h.mousePreviosPositionWhenMoving.y;
                    r = (t - q.x);
                    p = (s - q.y);
                    h.mousePreviosPositionWhenMoving.x = q.x;
                    h.mousePreviosPositionWhenMoving.y = q.y;
                    if (v && h.scrollH) {
                        h.scrollH.ManualMoving(r)
                    }
                    if (j && h.scrollV) {
                        h.scrollV.ManualMoving(p)
                    }
                }
            };
            h.imageAreaSelector.onMouseClick = function(m) {
                var n, l, k, j;
                k = h.__getOrigImagePos();
                if (e.isNaNOrUndefined(k.x) || e.isNaNOrUndefined(k.y)) {
                    return
                }
                j = h.__getRealZoomValue();
                if (j < 0) {
                    return
                }
                n = (m.x + k.x) / j;
                l = (m.y + k.y) / j;
                h.mousePreviosPositionWhenMoving.x = m.x;
                h.mousePreviosPositionWhenMoving.y = m.y;
                h.__fireEvent("onMouseClick", {
                    e: m.e,
                    x: n,
                    y: l,
                    index: h.cIndex
                })
            };
            h.imageAreaSelector.onMouseDoubleClick = function(m) {
                var n, l, k, j;
                k = h.__getOrigImagePos();
                if (e.isNaNOrUndefined(k.x) || e.isNaNOrUndefined(k.y)) {
                    return
                }
                j = h.__getRealZoomValue();
                if (j < 0) {
                    return
                }
                n = (m.x + k.x) / j;
                l = (m.y + k.y) / j;
                h.mousePreviosPositionWhenMoving.x = m.x;
                h.mousePreviosPositionWhenMoving.y = m.y;
                h.__fireEvent("onMouseDoubleClick", {
                    e: m.e,
                    x: n,
                    y: l,
                    index: h.cIndex
                })
            };
            h.imageAreaSelector.onMouseRightClick = function(m) {
                var n, l, k, j;
                k = h.__getOrigImagePos();
                if (e.isNaNOrUndefined(k.x) || e.isNaNOrUndefined(k.y)) {
                    return
                }
                j = h.__getRealZoomValue();
                if (j < 0) {
                    return
                }
                n = (m.x + k.x) / j;
                l = (m.y + k.y) / j;
                h.__fireEvent("onMouseRightClick", {
                    e: m.e,
                    x: n,
                    y: l,
                    index: h.cIndex
                })
            };
            h.imageAreaSelector.onImageAreaSelected = function(q) {
                var m = q.left,
                    p = q.top,
                    r = q.right,
                    l = q.bottom,
                    j = q.fromScroll,
                    n, k;
                e.output("selected Area in Selector: " + [m, p, r, l].join(","));
                if (h.fZoomValue > 0) {
                    n = h.__getOrigImagePos();
                    if (e.isNaNOrUndefined(n.x) || e.isNaNOrUndefined(n.y)) {
                        return
                    }
                    m = (m + n.x);
                    p = (p + n.y);
                    r = (r + n.x);
                    l = (l + n.y);
                    e.output("selected zoomed Image Area: " + [m, p, r, l].join(","));
                    k = h.__getRealZoomValue();
                    if (k < 0) {
                        return
                    }
                    m = m / k;
                    p = p / k;
                    r = r / k;
                    l = l / k;
                    e.output("selected orig Image Area: " + [m, p, r, l].join(","));
                    if (m < 0) {
                        m = 0
                    }
                    if (p < 0) {
                        p = 0
                    }
                    if (r > h.__getOrigImageWidth()) {
                        r = h.__getOrigImageWidth()
                    }
                    if (l > h.__getOrigImageHeight()) {
                        l = h.__getOrigImageHeight()
                    }
                    h.__fireEvent("onImageAreaSelected", {
                        index: h.cIndex,
                        left: m,
                        top: p,
                        right: r,
                        bottom: l,
                        fromScroll: j
                    })
                }
            };
            h.imageAreaSelector.onImageAreaDeSelected = function() {
                h.__fireEvent("onImageAreaDeSelected", h.cIndex)
            };
            if (c.isFunction(f.onMouseMove)) {
                h.onMouseMove = f.onMouseMove
            }
            if (c.isFunction(f.onMouseClick)) {
                h.onMouseClick = f.onMouseClick
            }
            if (c.isFunction(f.onMouseRightClick)) {
                h.onMouseRightClick = f.onMouseRightClick
            }
            if (c.isFunction(f.onMouseDoubleClick)) {
                h.onMouseDoubleClick = f.onMouseDoubleClick
            }
            if (c.isFunction(f.onImageAreaSelected)) {
                h.onImageAreaSelected = f.onImageAreaSelected
            }
            if (c.isFunction(f.onImageAreaDeSelected)) {
                h.onImageAreaDeSelected = f.onImageAreaDeSelected
            }
            if (c.isFunction(f.OnGetImageInfo)) {
                h.OnGetImageInfo = f.OnGetImageInfo
            }
        }
    };
    a.prototype.__isShowScrollH = function(g) {
        var h = this,
            f = g;
        if (!h.objImage) {
            return false
        }
        if (c.isUndefined(f)) {
            f = h.canvasHeight
        }
        return (f < h._height)
    };
    a.prototype.__isShowScrollV = function(g) {
        var h = this,
            f = g;
        if (!h.objImage) {
            return false
        }
        if (c.isUndefined(f)) {
            f = h.canvasWidth
        }
        return (f < h._width)
    };
    a.prototype.ImageMoveLeft = function() {
        var h = this,
            f = h.__isShowScrollH(),
            g;
        if (f && h.scrollH) {
            g = -0.2 * h.scrollH.GetPagePositionSize();
            h.scrollH.ManualMoving(g)
        }
        return true
    };
    a.prototype.ImageMoveRight = function() {
        var h = this,
            f = h.__isShowScrollH(),
            g;
        if (f && h.scrollH) {
            g = 0.2 * h.scrollH.GetPagePositionSize();
            h.scrollH.ManualMoving(g)
        }
        return true
    };
    a.prototype.ImageMoveUp = function() {
        var h = this,
            f = h.__isShowScrollV(),
            g;
        if (f && h.scrollV) {
            g = -0.2 * h.scrollV.GetPagePositionSize();
            h.scrollV.ManualMoving(g)
        }
        return true
    };
    a.prototype.ImageMoveDown = function() {
        var h = this,
            f = h.__isShowScrollV(),
            g;
        if (f && h.scrollV) {
            g = 0.2 * h.scrollV.GetPagePositionSize();
            h.scrollV.ManualMoving(g)
        }
        return true
    };
    a.prototype.ImageMovePageUp = function() {
        var h = this,
            f = h.__isShowScrollV(),
            g;
        if (f && h.scrollV) {
            g = -1 * h.scrollV.GetPagePositionSize();
            h.scrollV.ManualMoving(g)
        }
        return true
    };
    a.prototype.ImageMovePageDown = function() {
        var h = this,
            f = h.__isShowScrollV(),
            g;
        if (f && h.scrollV) {
            g = h.scrollV.GetPagePositionSize();
            h.scrollV.ManualMoving(g)
        }
        return true
    };
    a.prototype.ImageMoveHome = function() {
        var k = this,
            g = k.__isShowScrollV(),
            h = k.__isShowScrollH(),
            j, f;
        if (g && k.scrollV) {
            f = k.scrollV.GetMaxPosition();
            k.scrollV.ManualMoving(-f)
        }
        if (h && k.scrollH) {
            f = k.scrollH.GetMaxPosition();
            k.scrollH.ManualMoving(-f)
        }
        return true
    };
    a.prototype.ImageMoveEnd = function() {
        var k = this,
            g = k.__isShowScrollV(),
            h = k.__isShowScrollH(),
            j, f;
        if (g && k.scrollV) {
            f = k.scrollV.GetMaxPosition();
            k.scrollV.ManualMoving(f)
        }
        if (h && k.scrollH) {
            f = k.scrollH.GetMaxPosition();
            k.scrollH.ManualMoving(f)
        }
        return true
    };
    a.prototype.SetLocation = function(f, h) {
        var g = this;
        g.Left = f;
        g.Top = h;
        g.Right = f + g.canvasWidth;
        g.Bottom = h + g.canvasHeight;
        e.output("SetLocation:" + f + ", " + h);
        if (g.divOut) {
            if (g.divOut.parentNode) {
                g.divOut.parentNode.style.position = "relative"
            }
            g.divOut.style.left = f + "px";
            g.divOut.style.top = h + "px";
            g.__refreshImageAreaSelectorLocationAndSize();
            g.__refreshImageOverlayInfo()
        }
        return true
    };
    a.prototype.SetMouseShape = function(g) {
        var h = this,
            f = h.iMouseShape;
        h.iMouseShape = g;
        e.output("SetMouseShape: " + [f, h.iMouseShape].join("->"));
        if (h.imageAreaSelector) {
            h.imageAreaSelector.SetMouseShape(h.iMouseShape)
        }
        return true
    };
    a.prototype.SetBackgroundColor = function(f) {
        var g = this;
        e.output("SetBackgroundColor:" + f);
        g.backgroundColor = f;
        if (g.drawArea.width < g.canvasWidth || g.drawArea.height < g.canvasHeight) {
            g.Show()
        }
        return true
    };
    a.prototype.SetSelectionImageBorderColor = function(f) {
        var g = this;
        e.output("SetSelectionImageBorderColor:" + f);
        g.selectionBorderColor = f;
        g.__refreshBorder();
        return true
    };
    a.prototype.GetEL = function() {
        e.output("GetEL:");
        return this.divOut
    };
    a.prototype.__getOrigImagePos = function() {
        var k = this,
            h = k.drawArea.x,
            j = k.drawArea.y,
            f = k.drawArea.width,
            g = k.drawArea.height;
        if (f <= k.canvasWidth) {
            h = h + (k.canvasWidth - f) * 0.5
        }
        if (g <= k.canvasHeight) {
            j = j + (k.canvasHeight - g) * 0.5
        }
        return {
            x: h,
            y: j
        }
    };
    a.prototype.__getImageDrawLocationAndSize = function(k, j) {
        var m = this,
            h = k,
            l = j,
            f, g;
        if (e.isNaNOrUndefined(h)) {
            h = 0
        }
        if (e.isNaNOrUndefined(l)) {
            l = 0
        }
        f = m.drawArea.width;
        g = m.drawArea.height;
        if (f <= m.canvasWidth) {
            h = (m.canvasWidth - f) * 0.5;
            f = m.drawArea.width
        } else {
            h = h - m.drawArea.x;
            h = h < 0 ? 0 : h;
            f = m.canvasWidth
        }
        if (g <= m.canvasHeight) {
            l = (m.canvasHeight - g) * 0.5;
            g = m.drawArea.height
        } else {
            l = l - m.drawArea.y;
            l = l < 0 ? 0 : l;
            g = m.canvasHeight
        }
        h += m.borderWidth;
        l += m.borderWidth;
        return {
            left: h,
            top: l,
            width: f,
            height: g
        }
    };
    a.prototype.__refreshImageOverlayInfo = function() {
        var h = this,
            f, g = 1;
        f = h.__getImageDrawLocationAndSize();
        g = h.__getRealZoomValue();
        if (g < 0) {
            return
        }
        h.__overlay.SetLocation(f.left, f.top);
        h.__overlay.SetImageSize(h._origImageWidth, h._origImageHeight);
        h.__overlay.SetZoom(g);
        if (h.canvas) {
            h.__overlay.SetContext(h.canvas.getContext("2d"))
        } else {
            h.__overlay.SetContext(false)
        }
    };
    a.prototype.__refreshImageAreaSelectorLocationAndSize = function() {
        var g = this,
            f;
        if (g.imageAreaSelector) {
            f = g.__getImageDrawLocationAndSize();
            g.imageAreaSelector.SetDrawImageLocationAndSize(f.left, f.top, f.width, f.height);
            g.imageAreaSelector.ChangeControlSize(g.canvasWidth, g.canvasHeight)
        }
        return true
    };
    a.prototype.SetBindIndex = function(f) {
        this._bindIndex = f;
        return true
    };
    a.prototype.GetBindIndex = function() {
        return this._bindIndex
    };
    a.prototype.SetCurrentIndex = function(f) {
        var g = this;
        g.cIndex = f;
        return true
    };
    a.prototype.GetCurrentIndex = function() {
        var f = this;
        return f.cIndex
    };
    a.prototype.ClearImage = function() {
        var f = this;
        if (f.bOrigMode) {
            f.objImage.onload = undefined;
            f.objImage.src = "data:,"
        }
        f.objImage = d;
        f.bHasOverlay = d;
        f.__overlay.Clear();
        f._origImageWidth = -1;
        f._origImageHeight = -1;
        return true
    };
    a.prototype.__getImageOrignalSize = function() {
        var g = this;
        if (g.bOrigMode) {
            g._origImageWidth = g.objImage.width;
            g._origImageHeight = g.objImage.height
        } else {
            if (g.cIndex >= 0) {
                var f = g.__fireEvent("OnGetImageInfo", g.cIndex);
                g._origImageWidth = f.width;
                if (g.objImage != null && g.objImage.height != null && g.objImage.width != null) {
                    g._origImageHeight = g._origImageWidth * g.objImage.height / g.objImage.width
                }
            } else {
                g._origImageWidth = -1;
                g._origImageHeight = -1
            }
        }
    };
    a.prototype.AttachImage = function(s, t, q, g, f, j) {
        var n = this;
        e.output("AttachImage: objImage," + [t, q, g, j].join(","));
        if (n.bOrigMode) {
            n.objImage.onload = undefined;
            n.objImage.src = "data:,"
        }
        n.objImage = s;
        n.bOrigMode = j;
        n.__resetTag();
        if (f) {
            var l, h, m = f.length;
            n.__overlay.Clear();
            if (m) {
                n.bHasOverlay = b
            }
            for (l = 0; l < m; l++) {
                h = f[l];
                n.__overlay.Add(h.Left, h.Top, h.Right, h.Bottom, h.ColorRGB, h.Opacity)
            }
        }
        n.__getImageOrignalSize();
        var p = false;
        if (n.bIfFitWindow && (n.fitWindowType == 0 || n.fitWindowType == 1 || n.fitWindowType == 2 || n.fitWindowType == 4)) {
            p = false
        } else {
            p = j && (n.fUserSetZoom != 1)
        }
        if (p) {
            n.SetZoom(n.fUserSetZoom)
        } else {
            if (j && !n.bIfFitWindow) {
                var k = {},
                    r;
                k.x = n.drawArea.x;
                k.y = n.drawArea.y;
                k.fOldZoom = 1;
                k.fNewZoom = 1;
                k.oldIfFitWindow = true;
                k.oldFitWindowType = 0;
                k.oldCanvasWidth = n.canvasWidth;
                k.oldCanvasHeight = n.canvasHeight;
                n.fitWindowType = 3;
                n.__recaculateDrawArea();
                r = n.__getScrollInfoWithNewZoom(k);
                n.__setDrawArea(r.x, r.y, n.drawArea.width, n.drawArea.height);
                n.__resetScroll()
            } else {
                n.__recaculateDrawArea()
            }
        }
        return true
    };
    a.prototype.Show = function(k) {
        var j = this,
            f, h;
        if (j.bVisible) {
            j.divOut.style.display = ""
        } else {
            j.divOut.style.display = "none";
            return
        }
        e.output("Show:" + [j.canvasWidth, j.canvasHeight].join(","));
        f = j.canvas.getContext("2d");
        j.__restoreCanvas(f, j.canvasWidth, j.canvasHeight);
        if (j.drawArea.width <= 0 || j.drawArea.height <= 0 || j.canvasWidth <= 0 || j.canvasHeight <= 0) {
            return false
        }
        if (!k) {
            j.__resetScroll()
        }
        j.__resetTag();
        if (!j.objImage || j.objImage.src == "data:," || j.objImage.width == 0 || j.objImage.height == 0 || j.objImage.src == "") {
            f.fillStyle = j.backgroundColor;
            f.fillRect(0, 0, f.canvas.width, f.canvas.height);
            if (j._width > 53) {
                f.font = "12px Times New Roman";
                f.textAlign = "center";
                f.strokeText("Loading ...", f.canvas.width * 0.5, f.canvas.height * 0.5)
            }
            return false
        }
        f.clearRect(0, 0, j.canvasWidth, j.canvasHeight);
        if (j.cIndex == -1) {
            return
        }
        e.output("draw info: " + [j.objImage.width, j.objImage.height, j.drawArea.x, j.drawArea.y, j.drawArea.width, j.drawArea.height].join(","));
        if (j.drawArea.width < j.canvasWidth || j.drawArea.height < j.canvasHeight) {
            f.fillStyle = j.backgroundColor;
            f.fillRect(0, 0, j.canvasWidth, j.canvasHeight)
        }
        var g = function() {
            try {
                if (j.objImage) {
                    f.drawImage(j.objImage, Math.floor(-j.drawArea.x), Math.floor(-j.drawArea.y), Math.floor(j.drawArea.width), Math.floor(j.drawArea.height))
                }
                j.__overlay.Draw()
            } catch (l) {}
        };
        if (c.env.bIE) {
            setTimeout(g, 10)
        } else {
            g()
        }
        return true
    };
    a.prototype.SetSelect = function(f) {
        var g = this;
        e.output("SetSelect:" + f);
        g.bSelect = f;
        g.__resetTag();
        g.__refreshBorder();
        return true
    };
    a.prototype.GetIndex = function() {
        return this.cIndex
    };
    a.prototype.SetSelectedImageArea = function(l, h, r, g) {
        var n = this,
            u = l,
            t = h,
            f = 0,
            m = 0,
            j = 1;
        e.output("SetSelectedImageArea:" + [l, h, r, g].join(", "));
        if (r < l && g < h) {
            u = parseInt(r);
            t = parseInt(g);
            f = parseInt(l);
            m = parseInt(h)
        } else {
            f = parseInt(r);
            m = parseInt(g);
            u = parseInt(l);
            t = parseInt(h)
        }
        n.selectedImageArea.left = u;
        n.selectedImageArea.top = t;
        n.selectedImageArea.right = f;
        n.selectedImageArea.bottom = m;
        if (n.imageAreaSelector) {
            if (n._origImageWidth <= 0) {
                n.__getImageOrignalSize()
            }
            if (n._origImageWidth > 0) {
                j = n.__getRealZoomValue();
                if (j < 0) {
                    return false
                }
            } else {
                return false
            }
            var k = u * j,
                p = t * j,
                s = f * j,
                q = m * j;
            n.imageAreaSelector.SetSelectedArea(k, p, s, q);
            return true
        }
        return false
    };
    a.prototype.OverlayRectangle = function(l, k, j, g, f, h) {
        var m = this;
        e.output("OverlayRectangle:" + [l, k, j, g, f, h].join(", "));
        m.bHasOverlay = b;
        if (m._origImageWidth <= 0) {
            m.__getImageOrignalSize()
        }
        m.__refreshImageOverlayInfo();
        m.__overlay.Add(l, k, j, g, f, h, true);
        return true
    };
    a.prototype.GetMousePosition = function() {
        e.output("GetMousePosition:");
        return this.mousePosition
    };
    a.prototype.__setDrawArea = function(g, k, h, f) {
        var j = this;
        j.drawArea.x = g;
        j.drawArea.y = k;
        j.drawArea.width = h;
        j.drawArea.height = f;
        if (j.drawArea.width > j.canvasWidth && j.drawArea.x > j.drawArea.width - j.canvasWidth) {
            j.drawArea.x = j.drawArea.width - j.canvasWidth
        }
        if (j.drawArea.height > j.canvasHeight && j.drawArea.y > j.drawArea.height - j.canvasHeight) {
            j.drawArea.y = j.drawArea.height - j.canvasHeight
        }
        j.__refreshImageAreaSelectorLocationAndSize();
        j.__refreshImageOverlayInfo()
    };
    a.prototype.GetZoom = function() {
        var f = this;
        return f.fZoomValue
    };
    a.prototype.SetZoom = function(t, m, l, h, g) {
        var n = this,
            j, k = {},
            r, f, s;
        e.output("SetZoom:" + [j, t].join("->"));
        n.fUserSetZoom = t;
        k.x = n.drawArea.x;
        k.y = n.drawArea.y;
        k.fOldZoom = n.fZoomValue;
        k.fNewZoom = t;
        k.oldIfFitWindow = n.bIfFitWindow;
        k.oldFitWindowType = n.fitWindowType;
        k.oldCanvasWidth = n.canvasWidth;
        k.oldCanvasHeight = n.canvasHeight;
        k.bMoveCenter = false;
        if (!c.isUndefined(m) && !c.isUndefined(l)) {
            k.bMoveCenter = true;
            var q = (m / n.fZoomValue);
            var p = (l / n.fZoomValue);
            k.newRealCenterX = m;
            k.newRealCenterY = l;
            k.newClickX = h;
            k.newClickY = g
        }
        n.bIfFitWindow = false;
        n.fitWindowType = 3;
        n.fZoomValue = t;
        if (!n.objImage) {
            return
        }
        n.__recaculateDrawArea();
        r = n.__getScrollInfoWithNewZoom(k);
        n.__setDrawArea(r.x, r.y, n.drawArea.width, n.drawArea.height);
        n.__resetScroll();
        n.Show();
        return true
    };
    a.prototype.SetSelectionRectAspectRatio = function(f) {
        var g = this;
        e.output("SetSelectionRectAspectRatio:" + f);
        if (f < 0) {
            f = 0
        }
        g.__fSelectionRectAspectRatio = f;
        return true
    };
    a.prototype.SetIfFitWindow = function(g, f) {
        var h = this;
        e.output("SetIfFitWindow:" + [g, f].join(","));
        h.bIfFitWindow = g;
        if (g) {
            h.fitWindowType = f
        } else {
            h.fitWindowType = 3
        }
        h.__recaculateDrawArea();
        h.Show();
        return true
    };
    a.prototype.Stretch = function() {
        var f = this;
        e.output("Stretch");
        f.canvasWidth = f._width;
        f.canvasHeight = f._height;
        f.__setDrawArea(0, 0, f.canvasWidth, f.canvasHeight);
        f.__refreshImageAreaSelectorLocationAndSize();
        f.__refreshImageOverlayInfo();
        return true
    };
    a.prototype.Destroy = function() {
        var f = this;
        e.output("Destroy:");
        f.SetBindIndex(-1);
        f.ClearImage();
        if (f.imageAreaSelector) {
            f.imageAreaSelector.Destroy();
            f.imageAreaSelector = false
        }
        if (f.__overlay) {
            f.__overlay.Destroy()
        }
        return true
    };
    a.prototype.SetShowPageNumber = function(f) {
        var g = this;
        g.bShowPageNumber = f;
        g.__resetTag();
        return true
    };
    a.prototype.__getScrollInfoWithNewZoom = function(E) {
        var A = this,
            G = {
                x: 0,
                y: 0
            },
            h, g, v, u, n, l, p = false,
            r, D, q, x, y, j, f, s, z, H;
        r = A.fZoomValue;
        if (r <= 0 || !A.objImage) {
            return G
        }
        h = E.x;
        g = E.y;
        D = E.oldIfFitWindow;
        q = E.oldFitWindowType;
        if (D) {
            if (q == 0) {
                p = true
            } else {
                if (q == 1) {
                    p = true
                } else {
                    if (q == 2) {
                        p = true
                    } else {
                        if (q == 4) {
                            p = true
                        }
                    }
                }
            }
        }
        y = E.oldCanvasWidth;
        j = E.oldCanvasHeight;
        x = E.fOldZoom;
        if (!E.bMoveCenter) {
            if (p) {
                h = v = A.objImage.width * 0.5;
                g = u = A.objImage.height * 0.5;
                n = v * r;
                l = u * r
            } else {
                h = h + y * 0.5;
                g = g + j * 0.5;
                v = h / x;
                u = g / x;
                n = v * r;
                l = u * r
            }
        } else {
            n = E.newRealCenterX * r;
            l = E.newRealCenterY * r
        }
        bOldShowScrollV = A.__isShowScrollV(y), bOldShowScrollH = A.__isShowScrollH(j);
        z = A.__isShowScrollV(), H = A.__isShowScrollH();
        f = A.canvasWidth;
        s = A.canvasHeight;
        if (E.bMoveCenter) {
            var C = (A.drawArea.width - f) * 0.5,
                m = E.x,
                k = E.newRealCenterX * r,
                w = E.newRealCenterX * x,
                F = C - k - m + w;
            G.x = C - F;
            var t = (A.drawArea.height - s) * 0.5,
                B = E.y,
                k = E.newRealCenterY * r,
                w = E.newRealCenterY * x,
                F = t - k - B + w;
            G.y = t - F;
            return G
        }
        if (H) {
            G.x = n - f * 0.5;
            if (G.x < 0) {
                G.x = 0
            }
        } else {
            G.x = (A.drawArea.width - f) * 0.5
        }
        if (z) {
            G.y = l - s * 0.5;
            if (G.y < 0) {
                G.y = 0
            }
        } else {
            G.y = (A.drawArea.height - s) * 0.5
        }
        return G
    };
    a.prototype.__recaculateDrawArea = function() {
        var l = this,
            g = false,
            k = false,
            f, h = false,
            j = false;
        l.canvasWidth = l._width;
        l.canvasHeight = l._height;
        if (l.objImage) {
            if (l.bIfFitWindow) {
                if (l.fitWindowType == 0) {
                    f = e.getAdjustedImageSize(l.objImage.width, l.objImage.height, l.canvasWidth, l.canvasHeight);
                    l.fZoomValue = f.zoom
                } else {
                    if (l.fitWindowType == 1) {
                        f = e.getAdjustedImageSize(l.objImage.width, l.objImage.height, l.objImage.width, l.canvasHeight);
                        if (f.w > l._width) {
                            h = true;
                            l.canvasHeight = l._height - l.scrollArrowSize;
                            f = e.getAdjustedImageSize(l.objImage.width, l.objImage.height, l.objImage.width, l.canvasHeight)
                        }
                        l.fZoomValue = f.zoom
                    } else {
                        if (l.fitWindowType == 2) {
                            f = e.getAdjustedImageSize(l.objImage.width, l.objImage.height, l.canvasWidth, l.objImage.height);
                            if (f.h > l._height) {
                                h = true;
                                l.canvasWidth = l._width - l.scrollArrowSize;
                                f = e.getAdjustedImageSize(l.objImage.width, l.objImage.height, l.canvasWidth, l.objImage.height)
                            }
                            l.fZoomValue = f.zoom
                        } else {
                            if (l.fitWindowType == 4) {
                                g = true
                            } else {
                                f = {
                                    w: l.objImage.width,
                                    h: l.objImage.height
                                };
                                k = true;
                                l.fZoomValue = l.fUserSetZoom
                            }
                        }
                    }
                }
            } else {
                f = {
                    w: l.objImage.width * l.fZoomValue,
                    h: l.objImage.height * l.fZoomValue
                };
                k = true
            }
        } else {
            g = true
        }
        if (g) {
            l.Stretch()
        } else {
            if (k) {
                if (f.h > l._height) {
                    h = true;
                    l.canvasWidth = l._width - l.scrollArrowSize
                }
                if (f.w > l._width) {
                    h = true;
                    l.canvasHeight = l._height - l.scrollArrowSize
                }
            }
            l.drawArea.width = f.w;
            l.drawArea.height = f.h;
            if (l.drawArea.width < l.canvasWidth) {
                l.drawArea.x = (l.drawArea.width - l.canvasWidth) * 0.5
            } else {
                l.drawArea.x = 0
            }
            if (l.drawArea.height < l.canvasHeight) {
                l.drawArea.y = (l.drawArea.height - l.canvasHeight) * 0.5
            } else {
                l.drawArea.y = 0
            }
            e.output("draw Area: " + [l.drawArea.x, l.drawArea.y, l.drawArea.width, l.drawArea.height].join(","));
            l.__refreshImageAreaSelectorLocationAndSize();
            l.__refreshImageOverlayInfo()
        }
    };
    a.prototype.__resetScroll = function() {
        var h = this,
            k, g, f = h.__isShowScrollV(),
            l = h.__isShowScrollH(),
            q, j, p, m, n;
        if (h.canvas) {
            p = h.canvas.parentNode
        }
        if (!p) {
            return
        }
        if (f) {
            cPosition = h.drawArea.y;
            if (!h.scrollV) {
                k = {
                    Width: h.scrollArrowSize,
                    Height: h.canvasHeight,
                    Horizontal: false
                };
                k.onValueChanged = function(r) {
                    h.drawArea.y = r.Value;
                    if (h.drawArea.height > h.canvasHeight && h.drawArea.y > h.drawArea.height - h.canvasHeight) {
                        h.drawArea.y = h.drawArea.height - h.canvasHeight
                    }
                    h.__reselectArea();
                    h.Show(true)
                };
                h.scrollV = new Dynamsoft.Lib.UI.ScrollBar(k);
                h.scrollV.InitScroll(h.drawArea.height, h.canvasHeight);
                h.scrollV.SetLocation(1, 1);
                g = h.scrollV.GetEL();
                g.style.position = "absolute";
                p.appendChild(g)
            } else {
                g = h.scrollV.GetEL();
                if (h.scrollV.GetControlHeight() != h.canvasHeight) {
                    h.scrollV.ChangeControlSize(h.scrollArrowSize, h.canvasHeight)
                }
                g.style.display = "";
                h.scrollV.InitScroll(h.drawArea.height, h.canvasHeight);
                h.scrollV.SetPosition(cPosition)
            }
            g.style.top = h.borderWidth + "px";
            g.style.left = h.borderWidth + h._width - h.scrollArrowSize + "px";
            h.scrollV.Refresh()
        } else {
            if (h.scrollV) {
                g = h.scrollV.GetEL();
                g.style.display = "none"
            }
        }
        if (l) {
            cPosition = h.drawArea.x;
            if (!h.scrollH) {
                k = {
                    Width: h.canvasWidth,
                    Height: h.scrollArrowSize,
                    Horizontal: true
                };
                k.onValueChanged = function(r) {
                    h.drawArea.x = r.Value;
                    if (h.drawArea.width > h.canvasWidth && h.drawArea.x > h.drawArea.width - h.canvasWidth) {
                        h.drawArea.x = h.drawArea.width - h.canvasWidth
                    }
                    h.__reselectArea();
                    h.Show(true)
                };
                h.scrollH = new Dynamsoft.Lib.UI.ScrollBar(k);
                h.scrollH.InitScroll(h.drawArea.width, h.canvasWidth);
                h.scrollH.SetLocation(1, 1);
                g = h.scrollH.GetEL();
                g.style.position = "absolute";
                p.appendChild(g)
            } else {
                g = h.scrollH.GetEL();
                if (h.scrollH.GetControlWidth() != h.canvasWidth) {
                    h.scrollH.ChangeControlSize(h.canvasWidth, h.scrollArrowSize)
                }
                g.style.display = "";
                h.scrollH.InitScroll(h.drawArea.width, h.canvasWidth);
                h.scrollH.SetPosition(cPosition)
            }
            g.style.top = h.borderWidth + h._height - h.scrollArrowSize + "px";
            g.style.left = h.borderWidth + "px";
            h.scrollH.Refresh()
        } else {
            if (h.scrollH) {
                g = h.scrollH.GetEL();
                g.style.display = "none"
            }
        }
    };
    a.prototype.__restoreCanvas = function(g, f, j) {
        var k = this;
        g.canvas.width = f;
        g.canvas.height = j
    };
    a.prototype.__reselectArea = function() {
        var f = this;
        if (f.imageAreaSelector) {
            f.imageAreaSelector.ReFireSelectedEventWhenImageMoved()
        }
    };
    a.prototype.__zoomIn = function() {
        var f = this;
        f.SetZoom(1.1 * f.fZoomValue)
    };
    a.prototype.__zoomInAt = function(g, f, l, j, h) {
        var k = this;
        if (k.fitWindowType == 4) {
            k.SetIfFitWindow(true, 0);
            k.__zoomIn()
        } else {
            k.SetZoom(g, f, l, j, h)
        }
    };
    a.prototype.__zoomOut = function() {
        var f = this;
        f.SetZoom(0.9 * f.fZoomValue)
    };
    a.prototype.__refreshBorder = function() {
        var f = this;
        if (f.bSelect) {
            f.divOut.style.border = f.borderWidth + "px solid " + f.selectionBorderColor
        } else {
            f.divOut.style.border = f.borderWidth + "px solid " + f.borderColor
        }
    };
    a.prototype.__resetTag = function() {
        var f = this;
        if (f.bShowPageNumber) {
            e.SetPageNumber(f.divTag, f.cIndex);
            if (f.bSelect) {
                f.divTag.className = "imgTag imgTag_Selected"
            } else {
                f.divTag.className = "imgTag imgTag_Normal"
            }
            f.divTag.style.display = "block"
        } else {
            f.divTag.innerHTML = "";
            f.divTag.style.display = "none"
        }
    };
    a.prototype.ClearControl = function() {
        var f = this;
        f.ClearImage();
        f.bShowPageNumber = d;
        f.Show();
        return true
    };
    a.prototype.__fireEvent = function(f, g) {
        var h = this;
        if (c.isFunction(h[f])) {
            return h[f](g)
        }
        return true
    };
    c.UI = c.UI || {};
    c.UI.ImageControl = a
})(Dynamsoft.Lib);
var ___ii = 0,
    Funs2;
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    Funs2 = {
        getImageUrl: function(c, f, b, e) {
            var d = [c];
            if (f !== undefined && f !== null) {
                d.push("&index=");
                d.push(f)
            }
            d.push("&width=");
            d.push(b);
            d.push("&height=");
            d.push(e);
            d.push("&ticks=");
            d.push(___ii++);
            return d.join("")
        },
        getUrlByAct: function(c, e, b) {
            var d = [c];
            if (e !== undefined && e !== null) {
                d.push("&index=");
                d.push(e)
            }
            if (b) {
                d.push("&act=");
                d.push(b)
            }
            d.push("&ticks=");
            d.push(___ii++);
            return d.join("")
        },
        output: function(c, b) {
            if (Dynamsoft.WebTwainEnv.Debug) {
                a.log(b)
            }
        },
        print: function(l) {
            var b, t = 850,
                h = 1120,
                s = 0;
            var f = 0,
                c = 0,
                r = "";
            if (Dynamsoft.Lib.product.bChromeEdition) {
                if (a.env.bIE) {
                    h = 1289
                }
                if (a.env.bFirefox) {
                    h = 1169
                }
            }
            var e = h;
            for (s = 0; s < l.length; s++) {
                var k = l[s];
                var n = k.Width;
                var d = k.Height;
                var g = k.Url;
                var m = t / n,
                    j = e / d;
                if (m < j) {
                    e = parseInt(d * m)
                } else {
                    if (m > j) {
                        t = parseInt(n * j)
                    }
                }
                f += n;
                c += d;
                r = r + '<div style="width:850px;height:' + h + 'px"> <img id="D_img' + s + '" src="' + g + '" style="position:relative;left:0px;top:0px;width: ' + t + "px;height: " + e + 'px" /></div>'
            }
            var v, q = ["alwaysRaised=yes,z-look=yes,top=0,left=0,toolbar=no,menubar=no,location=no,status=no,width=", f, ",height=", c].join(""),
                b = '<html><body id="D_img">' + r + "</body></html>";
            var u = window.open("about:blank", "_blank", q);
            if (u) {
                u.document.write(b);
                u.document.close();
                u.focus();
                v = u.document.getElementById("D_img");
                if (v) {
                    v.onload = function() {
                        u.print();
                        u.close();
                        Dynamsoft.Lib.log("print image...ok")
                    }
                } else {
                    Dynamsoft.Lib.log("cannot find image")
                }
            }
        }
    }
})(Dynamsoft.Lib);
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    var h = document,
        e = [];

    function j(l, k, m) {
        var n = this;
        n.Url = l;
        n.Width = k;
        n.Height = m
    }

    function g() {
        var k = this;
        k.bIsDirty = false;
        k.imageToShow;
        k.imageWidth = 0;
        k.imageHeight = 0;
        k.rawWidth = 0;
        k.bOriginalImage = false;
        k.imageUrl;
        k.iImageControlWidth;
        k.iImageControlHeight;
        k.imageIndex = -1;
        k.aryOverlayRectangleData = []
    }
    g.prototype.Clear = function() {
        var k = this;
        if (k.imageToShow) {
            k.imageToShow.onload = undefined;
            k.imageToShow.src = "data:,"
        }
        k.imageToShow = false;
        k.imageUrl = "";
        k.aryOverlayRectangleData = []
    };

    function d(m, l, t, u, p, k, v, s, n, r) {
        var q = this;
        q.iControlIndex = m;
        q.iImageIndex = l;
        q.View = t;
        q.imgControl = u;
        q.modelImageControl = p;
        q.iWidth = k;
        q.iHeight = v;
        q.AttachImagesForControl = s;
        q.bOnlyFromServer = n;
        q.BaseUrl = r
    }

    function c(q, p, n, l, k, m) {
        var r = this;
        r.Left = q;
        r.Top = p;
        r.Right = n;
        r.Bottom = l;
        r.ColorRGB = k;
        r.Opacity = m
    }

    function f(k) {
        var l = this;
        if (!Dynamsoft.WebTwainEnv.ScanDirectly) {
            l.bFocus = false;
            l.borderWidth = a.isUndefined(k.borderWidth) ? 1 : k.borderWidth;
            l.canvas = document.createElement("div");
            if (l.canvas) {
                l.canvas.style.width = k.Width + "px";
                l.canvas.style.height = k.Height + "px";
                if (l.borderWidth > 0) {
                    l.canvas.style.border = l.borderWidth + "px solid #CCCCCC"
                }
                l.canvas.style.display = "block"
            }
            l.BaseUrl = false;
            k.Container.append(l.canvas);
            a.addEventListener(l.canvas, "mouseenter", function(m) {
                l.bFocus = true
            });
            a.addEventListener(l.canvas, "mouseleave", function(m) {
                l.bFocus = false
            });
            a.addEventListener(l.canvas, "mousewheel", function(m) {
                if (!l.bFocus) {
                    return true
                }
                var n = a.getWheelDelta(m);
                if (n < 0) {
                    l.__MousewheelValue--
                } else {
                    if (n > 0) {
                        l.__MousewheelValue++
                    }
                }
                a.stopPropagation(m);
                setTimeout(function() {
                    l.__MousewheelChanged(l)
                }, 200);
                return false
            });
            l.imageViewWidth = k.Width;
            l.imageViewHeight = k.Height;
            l.imagesPerRow = 1;
            l.imagesPerColumn = 1;
            l.MAX_ROWS = 128;
            l.MAX_COLUMNS = 128;
            l.bSingleMode = false;
            l.bVerticalMode = true;
            l.iMouseShape = EnumDWT_MouseShape.Default;
            l.bIfFitWindow = true;
            l.enumDWTFitWindowType = 0;
            l.fZoom = 1;
            l.zoomInStep = 1.2;
            l.zoomOutStep = 0.8;
            l.MIN_ZOOM = 0.02;
            l.MAX_ZOOM = 65;
            l.ImageMargin = 0;
            l.iControlWidth;
            l.iControlHeight;
            l.iCurrentRow = -1;
            l.iOldFirstVisibleRow = 0;
            l.iCurrentColumn = -1;
            l.iOldFirstVisibleColum = 0;
            l.AllowMultiSelect = true;
            l.SelectionImageBorderColor = "#7DA2CE";
            l.BackgroundColor = "#FFFFFF";
            l.cCurrentIndex = -1;
            l.sHowManyImages = 0;
            l.bScrollBar = true;
            l.__InitiHorizontalScrollBar(k);
            l.__InitiVerticalScrollBar(k)
        }
        l.aryCurrentSelectedImageIndicesInBuffer = [];
        l.aryModelImageControl = [];
        l.aryImageControls = [];
        l.bShowPageNumber = false;
        l.ratio = 0;
        l.__IfAutoScroll = true;
        l.__bAddingImage = false;
        l.__InitEvents(k);
        e.push(l);
        if (!Dynamsoft.WebTwainEnv.ScanDirectly) {
            if (l.canvas) {
                l.canvas.style.backgroundColor = l.BackgroundColor
            }
            l.__MousewheelValue = 0
        }
    }
    f.prototype.__InitEvents = function(k) {
        var l = this;
        if (a.isFunction(k.OnTopImageInTheViewChanged)) {
            l.OnTopImageInTheViewChanged = k.OnTopImageInTheViewChanged
        }
        if (a.isFunction(k.OnGetImageInfo)) {
            l.OnGetImageInfo = k.OnGetImageInfo
        }
        if (a.isFunction(k.onZoomChanged)) {
            l.onZoomChanged = k.onZoomChanged
        }
        if (a.isFunction(k.onMouseMove)) {
            l.onMouseMove = k.onMouseMove
        }
        if (a.isFunction(k.onMouseClick)) {
            l.onMouseClick = k.onMouseClick
        }
        if (a.isFunction(k.onMouseRightClick)) {
            l.onMouseRightClick = k.onMouseRightClick
        }
        if (a.isFunction(k.onMouseDoubleClick)) {
            l.onMouseDoubleClick = k.onMouseDoubleClick
        }
        if (a.isFunction(k.onImageAreaDeSelected)) {
            l.onImageAreaDeSelected = k.onImageAreaDeSelected
        }
        if (a.isFunction(k.onImageAreaSelected)) {
            l.onImageAreaSelected = k.onImageAreaSelected
        }
        if (a.isFunction(k.onSelected)) {
            l.onSelected = k.onSelected
        }
        if (a.isFunction(k.onRefreshUI)) {
            l.onRefreshUI = k.onRefreshUI
        }
        if (a.isFunction(k.onResetCurrentIndex)) {
            l.onResetCurrentIndex = k.onResetCurrentIndex
        }
    };
    f.prototype.__InitiHorizontalScrollBar = function(l) {
        var m = this;
        var k = {
            Width: l.Width,
            Height: 16,
            Value: 0,
            MaxValue: 0,
            Horizontal: true
        };
        k.onValueChanged = function(n) {
            m.__UpdateImageByScrollBar(n.Value)
        };
        m.horizontalScrollBar = new Dynamsoft.Lib.UI.ScrollBar(k);
        if (m.canvas && m.horizontalScrollBar) {
            m.canvas.appendChild(m.horizontalScrollBar.GetEL())
        }
        m.__SetHLocation(0, l.Height - m.__GetScrollWidth())
    };
    f.prototype.__InitiVerticalScrollBar = function(k) {
        var m = this;
        var l = {
            Width: 16,
            Height: k.Height,
            Value: 0,
            MaxValue: 0,
            Horizontal: false
        };
        l.onValueChanged = function(n) {
            m.__UpdateImageByScrollBar(n.Value)
        };
        m.verticalScrollBar = new Dynamsoft.Lib.UI.ScrollBar(l);
        if (m.canvas && m.verticalScrollBar) {
            m.canvas.appendChild(m.verticalScrollBar.GetEL())
        }
        m.__SetVLocation(k.Width - m.__GetScrollWidth(), 0)
    };
    f.prototype.__UpdateImageByScrollBar = function(n) {
        var r = this,
            k = -1,
            p = -1,
            m = -1,
            l, q;
        if (r.aryImageControls && r.aryImageControls.length > 0) {
            q = r.aryImageControls[0];
            if (q) {
                p = q.GetCurrentIndex();
                k = r.__GetRow(p)
            }
        }
        if (r.bVerticalMode == true) {
            m = parseInt(r.__GetVisibleRow(n) * r.imagesPerColumn);
            l = r.__GetRow(m);
            if (k == l) {
                return
            }
        } else {
            m = parseInt(r.__GetVisibleRow(n));
            if (m == p) {
                return
            }
        }
        Funs2.output(r, "__UpdateImageByScrollBar(value, newIndex): " + [n, m].join(","));
        r.__GoInner(m, false, true)
    };
    f.prototype.UpdateImage = function(m, p, l, k, t, r) {
        var q = this;
        var u = q.aryModelImageControl[m];
        u.imageToShow = p;
        u.imageWidth = l;
        u.imageHeight = k;
        u.iImageControlWidth = l;
        u.iImageControlHeight = k;
        u.aryOverlayRectangleData = t;
        u.imageUrl = r;
        var s = q.GetImageControl(m);
        if (null != s) {
            s.SetCurrentIndex(m);
            if (p != null && (p.src == "data:," || p.width == 0 || p.height == 0 || p.src == "")) {
                var n = q.__GetImageControlIndex(m);
                if (n >= 0) {
                    q.__SetArrayControlLoadImage(n, m, s, u, l, k, q.AttachImagesForControl, false)
                }
            } else {
                if (p == null) {
                    var n = q.__GetImageControlIndex(m);
                    if (n >= 0) {
                        var l = parseInt(q.imageViewWidth / 2);
                        var k = parseInt(q.imageViewHeight / 2);
                        if (q.imagesPerRow == 1 && q.imagesPerColumn == 1) {
                            if (q.bSingleMode == true) {
                                l = -1;
                                k = -1;
                                u.bOriginalImage = true
                            } else {
                                l = q.imageViewWidth;
                                k = q.imageViewHeight;
                                u.bOriginalImage = false
                            }
                        } else {
                            if (l < 300) {
                                l = 300
                            }
                            if (k < 300) {
                                k = 300
                            }
                            u.bOriginalImage = false
                        }
                        q.__SetArrayControlLoadImage(n, m, s, u, l, k, q.AttachImagesForControl, true)
                    }
                }
                q.AttachImagesForControl(s, u, m)
            }
        }
        q.iCurrentRow = -1;
        q.iCurrentColumn = -1;
        return true
    };
    f.prototype.__AddImage = function(l, m) {
        var n = this;
        n.__AddControl();
        var k = n.GetImageControl(l);
        k.SetCurrentIndex(l);
        n.AttachImagesForControl(k, m, l)
    };
    f.prototype.UpdateAllImage = function(p, k, m, l) {
        var n = this;
        return n.UpdateAllImageInner(p, k, false, m, l)
    };
    f.prototype.UpdateAllImageInner = function(s, k, p, n, m) {
        var r = this;
        r.aryModelImageControl = s;
        r.__OnlySetCurrentIndex(k);
        r.sHowManyImages = r.aryModelImageControl.length;
        var q = (r.imagesPerRow * r.imagesPerColumn) > r.sHowManyImages ? r.sHowManyImages : r.imagesPerRow * r.imagesPerColumn;
        var l = 0;
        for (l = r.aryImageControls.length - 1; l >= q; l--) {
            r.__RemoveControl(l)
        }
        for (l = r.aryImageControls.length; l < q; l++) {
            r.__AddControl()
        }
        if (!Dynamsoft.WebTwainEnv.ScanDirectly) {
            r.__ConfirmScrollMaxValue();
            r.__ConfirmScrollVisibity();
            r.iCurrentRow = -1;
            r.iCurrentColumn = -1;
            r.__SetCurrentIndex(r.cCurrentIndex);
            r.__ReInitChildrenPosition();
            r.__AttachImages(p, n, m)
        }
        return true
    };
    f.prototype.__AddControl = function() {
        var m = this,
            k = {};
        if (!Dynamsoft.WebTwainEnv.ScanDirectly) {
            if (a.isFunction(m.onImageAreaDeSelected)) {
                k.onImageAreaDeSelected = m.onImageAreaDeSelected
            }
            if (a.isFunction(m.onImageAreaSelected)) {
                k.onImageAreaSelected = m.onImageAreaSelected
            }
            k.onZoomChanged = function(n) {
                m.fZoom = n.zoom;
                m.__fireEvent("onZoomChanged", n)
            };
            k.onMouseClick = function(n) {
                m.__OnMouseClick(n);
                m.__fireEvent("onMouseClick", n)
            };
            k.onMouseRightClick = function(n) {
                m.__fireEvent("onMouseRightClick", n)
            };
            k.onMouseMove = function(n) {
                m.__fireEvent("onMouseMove", n)
            };
            k.onMouseDoubleClick = function(n) {
                m.__fireEvent("onMouseDoubleClick", n)
            };
            k.OnGetImageInfo = function(n) {
                return m.__fireEvent("OnGetImageInfo", n)
            }
        }
        var l = new Dynamsoft.Lib.UI.ImageControl(k);
        m.aryImageControls.push(l);
        Dynamsoft.Lib.imageControlCount++;
        m.__InitImageControl(l);
        if (!Dynamsoft.WebTwainEnv.ScanDirectly) {
            if (m.canvas) {
                m.canvas.appendChild(l.GetEL())
            }
            l.bindEvents()
        }
    };
    f.prototype.__InitImageControl = function(k) {
        var l = this;
        if (l.imagesPerRow == 1 && l.imagesPerColumn == 1) {
            k.SetMouseShape(l.iMouseShape);
            k.SetShowPageNumber(false)
        } else {
            k.SetMouseShape(EnumDWT_MouseShape.Hand);
            k.SetShowPageNumber(l.bShowPageNumber)
        }
        k.SetSelectionRectAspectRatio(l.ratio);
        k.SetBackgroundColor(l.BackgroundColor);
        k.SetSelectionImageBorderColor(l.SelectionImageBorderColor);
        if (l.bSingleMode) {
            if (l.bIfFitWindow) {
                k.SetIfFitWindow(true, l.enumDWTFitWindowType)
            } else {
                k.SetZoom(l.fZoom)
            }
        } else {
            k.SetIfFitWindow(true, 0)
        }
    };
    f.prototype.__OnMouseClick = function(l) {
        var p = this;
        var q = l.index;
        var t = p.aryCurrentSelectedImageIndicesInBuffer.indexOf(q),
            k = l.e.ctrlKey,
            r = l.e.shiftKey,
            s = l.e.metaKey;
        if (t == -1) {
            if (k || r || s || p.aryCurrentSelectedImageIndicesInBuffer.length < 1) {
                p.aryCurrentSelectedImageIndicesInBuffer.push(q)
            } else {
                if (p.aryCurrentSelectedImageIndicesInBuffer.length == 1) {
                    if (p.aryCurrentSelectedImageIndicesInBuffer[0] == q) {
                        return
                    }
                    p.aryCurrentSelectedImageIndicesInBuffer[0] = q
                } else {
                    p.aryCurrentSelectedImageIndicesInBuffer = [];
                    p.aryCurrentSelectedImageIndicesInBuffer.push(q)
                }
            }
        } else {
            if ((k || s) && p.aryCurrentSelectedImageIndicesInBuffer.length > 1) {
                p.aryCurrentSelectedImageIndicesInBuffer.splice(t, 1)
            } else {
                if (r) {
                    p.aryCurrentSelectedImageIndicesInBuffer.push(q)
                } else {
                    if (p.aryCurrentSelectedImageIndicesInBuffer.length == 1 && p.cCurrentIndex == q) {
                        return
                    }
                    p.aryCurrentSelectedImageIndicesInBuffer = [];
                    p.aryCurrentSelectedImageIndicesInBuffer.push(q)
                }
            }
        }
        if (r) {
            var w = p.aryCurrentSelectedImageIndicesInBuffer[0],
                n = p.aryCurrentSelectedImageIndicesInBuffer[p.aryCurrentSelectedImageIndicesInBuffer.length - 1];
            p.aryCurrentSelectedImageIndicesInBuffer = [];
            if (n == w) {
                p.aryCurrentSelectedImageIndicesInBuffer.push(parseInt(w))
            } else {
                if (n > w) {
                    var u = n - w + 1;
                    for (var m = 0; m < u; m++) {
                        p.aryCurrentSelectedImageIndicesInBuffer.push(parseInt(w + m))
                    }
                } else {
                    var u = w - n + 1;
                    p.aryCurrentSelectedImageIndicesInBuffer.push(parseInt(w));
                    for (var m = 0; m < u - 1; m++) {
                        p.aryCurrentSelectedImageIndicesInBuffer.push(parseInt(n + m))
                    }
                }
            }
        }
        if (p.aryCurrentSelectedImageIndicesInBuffer.length == 1) {
            p.__OnlySetCurrentIndex(p.aryCurrentSelectedImageIndicesInBuffer[0]);
            p.__SetCurrentIndexWithoutSetScroll(p.cCurrentIndex)
        }
        p.__SortCurrentSelectedImageIndicesInBuffer();
        p.__SetUnselectAll();
        var m = 0;
        for (m = 0; m < p.aryCurrentSelectedImageIndicesInBuffer.length; m++) {
            var v = p.GetImageControl(p.aryCurrentSelectedImageIndicesInBuffer[m]);
            if (null != v) {
                v.SetSelect(true)
            }
        }
        p.__fireEvent("onSelected", p.aryCurrentSelectedImageIndicesInBuffer)
    };
    f.prototype.__SortCurrentSelectedImageIndicesInBuffer = function() {
        var q = this;
        var p = q.aryCurrentSelectedImageIndicesInBuffer.length;
        if (p > 1) {
            var n, m, k;
            var l = false;
            for (m = 0; m < p - 1; m++) {
                l = false;
                for (k = 1; k < p; k++) {
                    if (q.aryCurrentSelectedImageIndicesInBuffer[k] < q.aryCurrentSelectedImageIndicesInBuffer[k - 1]) {
                        l = true;
                        n = q.aryCurrentSelectedImageIndicesInBuffer[k - 1];
                        q.aryCurrentSelectedImageIndicesInBuffer[k - 1] = q.aryCurrentSelectedImageIndicesInBuffer[k];
                        q.aryCurrentSelectedImageIndicesInBuffer[k] = n
                    }
                }
                if (!l) {
                    return
                }
            }
        }
    };
    f.prototype.__RemoveControl = function(k) {
        var m = this;
        if (k < m.aryImageControls.length && k >= 0) {
            var l = m.aryImageControls[k];
            l.Destroy();
            m.aryImageControls.splice(k, 1);
            if (!Dynamsoft.WebTwainEnv.ScanDirectly) {
                if (m.canvas) {
                    m.canvas.removeChild(l.GetEL())
                }
            }
            Dynamsoft.Lib.imageControlCount--
        }
    };
    f.prototype.__ConfirmScrollMaxValue = function() {
        var l = this;
        if (!l.bSingleMode) {
            if (l.bVerticalMode == true) {
                var k = l.__GetHowManyRows();
                l.__SetVScrollMaxValue(k, l.imagesPerRow)
            } else {
                l.__SetHScrollMaxValue(l.sHowManyImages, l.imagesPerColumn)
            }
        }
    };
    f.prototype.__GetHowManyRows = function() {
        var k = this;
        return parseInt((k.sHowManyImages + k.imagesPerColumn - 1) / k.imagesPerColumn)
    };
    f.prototype.__ConfirmScrollVisibity = function() {
        var k = this;
        if (k.bSingleMode) {
            k.__SetIfHScroll(false);
            k.__SetIfVScroll(false)
        } else {
            if (k.bVerticalMode == false) {
                if (k.bScrollBar && k.sHowManyImages > k.imagesPerRow * k.imagesPerColumn) {
                    k.__SetIfHScroll(true)
                } else {
                    k.__SetIfHScroll(false)
                }
                k.__SetIfVScroll(false)
            } else {
                if (k.bScrollBar && k.sHowManyImages > k.imagesPerRow * k.imagesPerColumn) {
                    k.__SetIfVScroll(true)
                } else {
                    k.__SetIfVScroll(false)
                }
                k.__SetIfHScroll(false)
            }
        }
    };
    f.prototype.__SetCurrentIndex = function(k) {
        var l = this;
        if (k >= 0) {
            l.__SetCurrentIndexInnerInner(k, true, false)
        }
    };
    f.prototype.__SetCurrentIndexInner = function(l, m, k) {
        var n = this;
        if (!k) {
            n.__SetCurrentIndexInnerInner(l, m, k)
        } else {
            n.__SetCurrentIndexInnerInner(l, m, true)
        }
    };
    f.prototype.__SetCurrentIndexWithoutSetScroll = function(k) {
        var l = this;
        l.__SetCurrentIndexInnerInner(k, true, false, true)
    };
    f.prototype.__SetCurrentIndexWithoutRefreshUI = function(k) {
        var l = this;
        l.__SetCurrentIndexInnerInner(k, true, false)
    };
    f.prototype.__SetCurrentIndexInnerInner = function(t, v, y, s) {
        var r = this,
            m = true;
        if (t < 0 || t >= r.aryModelImageControl.length) {
            return
        }
        if (r.__bAddingImage && !r.__IfAutoScroll) {
            m = false
        }
        if (m) {
            if (r.bVerticalMode == true) {
                var w = r.iCurrentRow;
                r.iCurrentRow = r.__GetRow(t);
                if (r.iCurrentRow != w && (r.iCurrentRow <= r.iOldFirstVisibleRow || ((r.iCurrentRow - r.iOldFirstVisibleRow) >= r.imagesPerRow))) {
                    if ((r.iCurrentRow - r.iOldFirstVisibleRow) == r.imagesPerRow) {
                        if (y == false) {
                            r.iCurrentRow = r.iOldFirstVisibleRow + 1
                        }
                    }
                    if (r.bSingleMode == false) {
                        if (!s || s == false) {
                            var q = r.iCurrentRow;
                            r.__SetVScrollPotion(q)
                        }
                    }
                    var n = r.__GetFirstVisibleRow();
                    if (r.iOldFirstVisibleRow != n) {
                        r.iOldFirstVisibleRow = n;
                        var u = n * r.imagesPerColumn;
                        r.__fireEvent("OnTopImageInTheViewChanged", u);
                        r.__AttachImages(false)
                    }
                }
            } else {
                var p = r.iCurrentColumn;
                r.iCurrentColumn = t;
                if (r.iCurrentColumn != p && (r.iCurrentColumn < r.iOldFirstVisibleColum || ((r.iCurrentColumn - r.iOldFirstVisibleColum) >= r.imagesPerColumn))) {
                    if ((r.iCurrentColumn - r.iOldFirstVisibleColum) == r.imagesPerColumn) {
                        r.iCurrentColumn = r.iOldFirstVisibleColum + 1
                    }
                    if (r.bSingleMode == false) {
                        if (!s || s == false) {
                            var l = r.iCurrentColumn;
                            r.__SetHScrollPotion(l)
                        }
                    }
                    var k = r.__GetFirstVisibleColumn();
                    if (r.iOldFirstVisibleColum != k) {
                        r.iOldFirstVisibleColum = k;
                        var u = k;
                        r.__fireEvent("OnTopImageInTheViewChanged", u);
                        r.__AttachImages(false)
                    }
                }
            }
        }
        if (v) {
            r.__SetUnselectAll();
            r.__OnlySetCurrentIndex(t);
            var x = r.GetImageControl(r.cCurrentIndex);
            if (null != x) {
                x.SetSelect(true)
            }
        }
    };
    f.prototype.__SetScrollByIndex = function(r) {
        var q = this;
        if (q.bVerticalMode == true) {
            var t = q.iCurrentRow;
            q.iCurrentRow = q.__GetRow(r);
            if (q.iCurrentRow != t && (q.iCurrentRow <= q.iOldFirstVisibleRow || ((q.iCurrentRow - q.iOldFirstVisibleRow) >= q.imagesPerRow))) {
                if ((q.iCurrentRow - q.iOldFirstVisibleRow) == q.imagesPerRow) {}
                if (q.bSingleMode == false) {
                    var n = q.iCurrentRow;
                    q.__SetVScrollPotion(n)
                }
                var m = q.__GetFirstVisibleRow();
                if (q.iOldFirstVisibleRow != m) {
                    q.iOldFirstVisibleRow = m;
                    var s = m * q.imagesPerColumn;
                    q.__fireEvent("OnTopImageInTheViewChanged", s);
                    q.__AttachImages(false)
                }
            }
        } else {
            var p = q.iCurrentColumn;
            q.iCurrentColumn = r;
            if (q.iCurrentColumn != p && (q.iCurrentColumn < q.iOldFirstVisibleColum || ((q.iCurrentColumn - q.iOldFirstVisibleColum) >= q.imagesPerColumn))) {
                if ((q.iCurrentColumn - q.iOldFirstVisibleColum) == q.imagesPerColumn) {
                    q.iCurrentColumn = q.iOldFirstVisibleColum + 1
                }
                if (q.bSingleMode == false) {
                    var l = q.iCurrentColumn;
                    q.__SetHScrollPotion(l)
                }
                var k = q.__GetFirstVisibleColumn();
                if (q.iOldFirstVisibleColum != k) {
                    q.iOldFirstVisibleColum = k;
                    var s = k;
                    q.__fireEvent("OnTopImageInTheViewChanged", s);
                    q.__AttachImages(false)
                }
            }
        }
    };
    f.prototype.__GetRow = function(k) {
        var l = this;
        return parseInt(k / l.imagesPerColumn)
    };
    f.prototype.__GetFirstVisibleColumn = function() {
        var k = this;
        return parseInt(k.__GetVisibleRow(k.__GetHScrollPosionValue()))
    };
    f.prototype.__GetFirstVisibleRow = function() {
        var k = this;
        return parseInt(k.__GetVisibleRow(k.__GetVScrollPosionValue()))
    };
    f.prototype.__GetVisibleRow = function(m) {
        var l = this;
        if (l.__GetHowManyRows() == 0) {
            return 0
        }
        var k = m;
        if (l.bSingleMode) {
            return l.cCurrentIndex
        } else {
            if (l.bVerticalMode == true) {
                if (l.__GetHowManyRows() - k < l.imagesPerRow) {
                    k = k - (l.imagesPerRow - (l.__GetHowManyRows() - k))
                }
            } else {
                if (l.sHowManyImages - k < l.imagesPerColumn) {
                    k = k - (l.imagesPerColumn - (l.sHowManyImages - k))
                }
            }
        }
        if (k < 0) {
            k = 0
        }
        return k
    };
    f.prototype.__AttachImages = function(m, l, k) {
        var n = this;
        n.__AttachImagesInner(m, true, l, k)
    };
    f.prototype.__AttachImagesInner = function(r, s, k, m) {
        var q = this;
        if (q.aryImageControls && q.aryImageControls.length > 0) {
            var t = 0;
            if (q.bVerticalMode == true) {
                t = q.__GetFirstVisibleRow() * q.imagesPerColumn
            } else {
                t = q.__GetFirstVisibleColumn()
            }
            if (t < 0) {
                t = 0
            }
            var n = 0;
            var l = t;
            var w = t + q.aryImageControls.length - 1;
            if (k && k > 0) {
                l = k
            }
            if (m && m > 0) {
                w = m
            }
            for (n = 0; n < q.aryImageControls.length; n++) {
                var u = q.aryImageControls[n];
                if (u) {
                    var p = t + n;
                    Funs2.output(q, "__AttachImagesInner(baseIndex, index): " + [t, p].join(","));
                    if (p < q.sHowManyImages) {
                        if (r) {
                            q.__InitImageControl(u)
                        }
                        if (s) {
                            var v = q.aryModelImageControl[p];
                            if (p >= l && p <= w || v.bIsDirty == true || u.GetCurrentIndex() != p) {
                                Funs2.output(q, "__AttachImagesInner() attach Image index -> control index:" + [p, n].join("->"));
                                q.__GetImageAndAttach(u, v, p, false)
                            }
                        }
                        u.SetVisible(true);
                        Funs2.output(q, "__AttachImagesInner() set control index Visible:" + [n].join());
                        if (q.__IfContains(q.aryCurrentSelectedImageIndicesInBuffer, p)) {
                            Funs2.output(q, "__AttachImagesInner() set control index selected:" + [n].join());
                            u.SetSelect(true)
                        } else {
                            u.SetSelect(false)
                        }
                    } else {
                        Funs2.output(q, "__AttachImagesInner() set control index InVisible:" + [n].join());
                        u.SetVisible(false)
                    }
                }
            }
        }
    };
    f.prototype.__IfContains = function(m, l) {
        var k = 0;
        if (m) {
            for (k = 0; k < m.length; k++) {
                if (m[k] == l) {
                    return true
                }
            }
        }
        return false
    };
    f.prototype.__ReInitChildrenPosition = function() {
        var p = this,
            l = 0,
            n = 0,
            m;
        p.__InitControlsSize();
        if (!p.bSingleMode) {
            l = p.ImageMargin;
            n = p.ImageMargin
        }
        for (m = 0; m < p.aryImageControls.length; m++) {
            var k = p.aryImageControls[m];
            k.ChangeControlSize(p.iControlWidth, p.iControlHeight);
            if (p.bSingleMode) {
                k.SetLocation(0, 0)
            } else {
                k.SetLocation(l, n);
                l = k.Right + p.ImageMargin;
                if (p.bVerticalMode == true) {
                    if ((m + 1) % p.imagesPerColumn == 0) {
                        l = p.ImageMargin;
                        n = k.Bottom + p.ImageMargin;
                        if (p.bScrollBar == false) {
                            if ((n + iControlHeight) > p.imageViewHeight) {
                                n = p.ImageMargin
                            }
                        }
                    }
                }
            }
        }
    };
    f.prototype.__InitControlsSize = function() {
        var r = this;
        if (r.bSingleMode == false) {
            var l = r.__GetScrollWidth();
            if (r.bVerticalMode == true) {
                if (r.__GetHowManyRows() <= r.imagesPerRow || r.bScrollBar == false) {
                    l = 0
                }
                if (r.ImageMargin <= 0 || (r.ImageMargin > (r.imageViewWidth - l - 3 * r.imagesPerColumn)) || (r.ImageMargin > (r.imageViewHeight - 3 * r.imagesPerRow))) {
                    var p = parseInt(r.imageViewHeight / (r.imagesPerRow * 10));
                    var q = parseInt((r.imageViewWidth - l) / (r.imagesPerColumn * 10));
                    var n = p < q ? p : q;
                    if (r.ImageMargin <= 0) {
                        r.ImageMargin = parseInt(n)
                    } else {
                        r.ImageMargin = parseInt(r.ImageMargin < n ? r.ImageMargin : n)
                    }
                }
            } else {
                if (r.sHowManyImages <= r.imagesPerColumn || r.bScrollBar == false) {
                    l = 0
                }
                if (r.ImageMargin <= 0 || (r.ImageMargin > (r.imageViewWidth - 3 * r.imagesPerColumn)) || (r.ImageMargin > (r.imageViewHeight - l - 3 * r.imagesPerRow))) {
                    var p = parseInt(r.imageViewHeight - l) / (r.imagesPerRow * 10);
                    var q = parseInt((r.imageViewWidth) / (r.imagesPerColumn * 10));
                    var n = p < q ? p : q;
                    if (r.ImageMargin <= 0) {
                        r.ImageMargin = parseInt(n)
                    } else {
                        r.ImageMargin = parseInt(r.ImageMargin < n ? r.ImageMargin : n)
                    }
                }
            }
            if (r.imagesPerColumn == r.imagesPerRow && r.imagesPerRow == 1) {
                r.ImageMargin = 0
            }
            var k = 0;
            var m = 0;
            if (r.bVerticalMode == true) {
                k = r.imageViewHeight - r.ImageMargin - 2 * r.borderWidth;
                m = r.imageViewWidth - l - r.ImageMargin - 2 * r.borderWidth
            } else {
                k = r.imageViewHeight - l - r.ImageMargin - 2 * r.borderWidth;
                m = r.imageViewWidth - r.ImageMargin - 2 * r.borderWidth
            }
            r.iControlWidth = parseInt(m / r.imagesPerColumn - r.ImageMargin);
            r.iControlHeight = parseInt(k / r.imagesPerRow - r.ImageMargin)
        } else {
            r.ImageMargin = 0;
            r.iControlWidth = r.imageViewWidth - 2 * r.borderWidth;
            r.iControlHeight = r.imageViewHeight - 2 * r.borderWidth
        }
    };
    f.prototype.GetDataImageControlList = function() {
        var k = this;
        return k.aryModelImageControl
    };
    f.prototype.SetDataImageControl = function(l, n) {
        var p = this;
        if (l > p.aryModelImageControl.length || p.aryModelImageControl.length <= 0) {
            return
        }
        var m;
        if (l == p.aryModelImageControl.length) {
            m = new g();
            m.imageIndex = l;
            m.rawWidth = n;
            p.aryModelImageControl.push(m)
        } else {
            m = p.aryModelImageControl[l];
            m.rawWidth = n
        }
        if (m != null) {
            m.bIsDirty = true
        }
        var k = p.GetImageControl(l);
        if (null != k) {
            p.__GetImageAndAttach(k, m, l, true)
        }
        return true
    };
    f.prototype.AttachImagesForControl = function(k, m, l) {
        if (k.GetBindIndex() == l) {
            k.AttachImage(m.imageToShow, m.imageWidth, m.imageHeight, m.imageIndex, m.aryOverlayRectangleData, m.bOriginalImage);
            k.Show()
        }
        return true
    };
    f.prototype.__SetSelectionWinBorderColor = function(k) {
        var l = this
    };
    f.prototype.__SetUnselectAll = function() {
        var m = this;
        var l = 0;
        for (l = 0; l < m.aryImageControls.length; l++) {
            var k = m.aryImageControls[l];
            k.SetSelect(false)
        }
    };
    f.prototype.GetImageControl = function(m) {
        var n = this;
        var l = n.__GetImageControlIndex(m);
        if (l >= 0 && l < n.aryImageControls.length) {
            var k = n.aryImageControls[l];
            return k
        } else {
            return null
        }
    };
    f.prototype.__GetImageControlIndex = function(l) {
        var m = this;
        var k = -1;
        if (m.bSingleMode == true) {
            k = 0
        } else {
            if (m.bVerticalMode == true) {
                k = l - m.__GetFirstVisibleRow() * m.imagesPerColumn
            } else {
                k = l - m.__GetFirstVisibleColumn()
            }
        }
        if (k >= 0 && k < m.aryImageControls.length) {
            return k
        } else {
            return -1
        }
    };
    f.prototype.__SetIfHScroll = function(k) {
        var l = this;
        Funs2.output(l, "__SetIfHScroll" + k);
        if (l.horizontalScrollBar) {
            l.horizontalScrollBar.SetVisible(k)
        }
    };
    f.prototype.__GetIfHScroll = function() {
        var k = this;
        if (k.horizontalScrollBar) {
            return k.horizontalScrollBar.GetVisible() == true ? true : false
        } else {
            return true
        }
    };
    f.prototype.__SetIfVScroll = function(k) {
        var l = this;
        Funs2.output(l, "__SetIfVScroll" + k);
        if (l.verticalScrollBar) {
            l.verticalScrollBar.SetVisible(k)
        }
    };
    f.prototype.__GetIfVScroll = function() {
        var k = this;
        if (k.verticalScrollBar) {
            return k.verticalScrollBar.GetVisible() == true ? true : false
        } else {
            return true
        }
    };
    f.prototype.__GetHScrollPosionValue = function() {
        var l = this;
        var k = 0;
        if (l.horizontalScrollBar) {
            k = l.horizontalScrollBar.GetCurrentPosition()
        }
        if (k && k >= 0) {
            return k
        } else {
            return 0
        }
    };
    f.prototype.__GetVScrollPosionValue = function() {
        var l = this;
        var k = 0;
        if (l.verticalScrollBar) {
            k = l.verticalScrollBar.GetCurrentPosition()
        }
        if (k && k >= 0) {
            return k
        } else {
            return 0
        }
    };
    f.prototype.__SetHScrollMaxValue = function(l, k) {
        var m = this;
        Funs2.output(m, "__SetHScrollMaxValue(totalSize,pageSize):" + l + "," + k);
        if (m.horizontalScrollBar) {
            m.horizontalScrollBar.InitScroll(l, k)
        }
    };
    f.prototype.__SetVScrollMaxValue = function(l, k) {
        var m = this;
        Funs2.output(m, "__SetVScrollMaxValue(totalSize,pageSize):" + l + "," + k);
        if (m.verticalScrollBar) {
            m.verticalScrollBar.InitScroll(l, k)
        }
    };
    f.prototype.__SetHScrollPotion = function(k) {
        var l = this;
        if (l.horizontalScrollBar) {
            l.horizontalScrollBar.GoPosition(k)
        }
    };
    f.prototype.__SetVScrollPotion = function(k) {
        var l = this;
        if (l.verticalScrollBar) {
            l.verticalScrollBar.GoPosition(k)
        }
    };
    f.prototype.__SetHLocation = function(k, m) {
        var l = this;
        if (l.horizontalScrollBar) {
            l.horizontalScrollBar.SetLocation(k, m)
        }
    };
    f.prototype.__SetVLocation = function(k, m) {
        var l = this;
        if (l.verticalScrollBar) {
            l.verticalScrollBar.SetLocation(k, m)
        }
    };
    f.prototype.__ChangeHControlSize = function(k, l) {
        var m = this;
        if (m.horizontalScrollBar) {
            m.horizontalScrollBar.ChangeControlSize(k, l)
        }
    };
    f.prototype.__ChangeVControlSize = function(k, l) {
        var m = this;
        if (m.verticalScrollBar) {
            m.verticalScrollBar.ChangeControlSize(k, l)
        }
    };
    f.prototype.__GetScrollWidth = function() {
        return 16
    };
    f.prototype.SetSelectedImageArea = function(m, q, p, n, l) {
        var r = this;
        var k = r.GetImageControl(m);
        if (null != k) {
            if (r.imagesPerRow == 1 && r.imagesPerColumn == 1) {
                return k.SetSelectedImageArea(q, p, n, l)
            } else {
                return false
            }
        }
        return false
    };
    f.prototype.OverlayRectangle = function(u, q, p, t, m, l, n) {
        var r = this;
        var s = r.GetImageControl(u);
        if (null != s) {
            s.OverlayRectangle(q, p, t, m, l, n)
        }
        var v = r.aryModelImageControl[u];
        var k = new c(q, p, t, m, l, n);
        return v.aryOverlayRectangleData.push(k)
    };
    f.prototype.GetMousePosition = function() {
        var l = this;
        var k = l.GetImageControl(l.cCurrentIndex);
        if (null != k) {
            return k.GetMousePosition()
        } else {
            return null
        }
    };
    f.prototype.ChangeImageViewSize = function(k, l) {
        var m = this;
        if (k >= 0) {
            m.imageViewWidth = k;
            m.__ChangeHControlSize(k, 16);
            m.__SetVLocation(k - m.__GetScrollWidth(), 0)
        }
        if (l >= 0) {
            m.imageViewHeight = l;
            m.__ChangeVControlSize(16, l);
            m.__SetHLocation(0, l - m.__GetScrollWidth())
        }
        if (m.canvas) {
            m.canvas.style.width = k + "px";
            m.canvas.style.height = l + "px"
        }
        m.UpdateAllImage(m.aryModelImageControl, m.cCurrentIndex);
        return true
    };
    f.prototype.SetViewMode = function(t, l) {
        var p = this;
        var m = p.imagesPerColumn;
        var q = p.imagesPerRow;
        var u = p.bSingleMode;
        var k = p.bVerticalMode;
        if (t > 0) {
            p.imagesPerColumn = t
        }
        if (l > 0) {
            p.imagesPerRow = l
        }
        if (t == -1 && l == -1) {
            p.imagesPerRow = 1;
            p.imagesPerColumn = 1;
            p.bSingleMode = true
        } else {
            p.bSingleMode = false;
            if (l == -1) {
                p.imagesPerRow = 1;
                p.bVerticalMode = false
            } else {
                p.bVerticalMode = true
            }
        }
        p.iOldFirstVisibleRow = 0;
        p.iOldFirstVisibleColum = 0;
        if (p.bSingleMode == false) {
            var n = 0;
            for (n = 0; n < p.aryImageControls.length; n++) {
                var r = p.aryImageControls[n];
                if (r != null) {
                    r.SetOrigMode(false)
                }
            }
        }
        if ((m != p.imagesPerColumn || q != p.imagesPerRow) || (u != p.bSingleMode) || (k != p.bVerticalMode)) {
            if (p.imagesPerRow == 1 && p.imagesPerColumn == 1) {
                var n = 0;
                for (n = 0; n < p.aryImageControls.length; n++) {
                    var r = p.aryImageControls[n];
                    if (r != null) {
                        r.ClearControl()
                    }
                }
            }
            if (p.aryCurrentSelectedImageIndicesInBuffer.length > 0) {
                var s = p.aryCurrentSelectedImageIndicesInBuffer[0];
                if (s >= 0 && s < p.aryModelImageControl.length) {
                    p.cCurrentIndex = s
                }
            }
            p.UpdateAllImageInner(p.aryModelImageControl, p.cCurrentIndex, true)
        }
        p.__SetUnselectAll();
        p.__SetSelectedImageIndicesInBuffer();
        return true
    };
    f.prototype.RemoveAllImages = function() {
        return this.Clear()
    };
    f.prototype.Clear = function() {
        var n = this;
        var l = n.aryImageControls.length;
        for (k = l - 1; k >= 0; k--) {
            n.__RemoveControl(k)
        }
        var k = 0;
        for (k = 0; k < n.aryModelImageControl.length; k++) {
            n.aryModelImageControl[k].Clear()
        }
        n.aryModelImageControl = [];
        if (!Dynamsoft.WebTwainEnv.ScanDirectly) {
            n.__SetVScrollMaxValue(0, 0);
            n.__SetHScrollMaxValue(0, 0);
            n.__SetIfHScroll(false);
            n.__SetIfVScroll(false)
        }
        for (k = Dynamsoft.Lib.aryControlLoadImage.length - 1; k >= 0; k--) {
            var m = Dynamsoft.Lib.aryControlLoadImage[k];
            if (m.imgControl && m.View == n) {
                m.imgControl.SetBindIndex(-1);
                m.imgControl.Destroy();
                Dynamsoft.Lib.aryControlLoadImage.splice(k, 1)
            }
        }
        n.cCurrentIndex = -1;
        return true
    };
    f.prototype.ShowImage = function(l, m) {
        var n = this;
        n.__OnlySetCurrentIndex(l);
        if (n.bSingleMode == true) {
            var k = n.GetImageControl(n.cCurrentIndex);
            if (null != k) {
                n.__GetImageAndAttach(k, m, l, false)
            }
        }
        return true
    };
    f.prototype.__GetImageAndAttach = function(t, q, m, p) {
        var r = this;
        var l = parseInt(r.imageViewWidth / 2);
        var k = parseInt(r.imageViewHeight / 2);
        if (r.imagesPerRow == 1 && r.imagesPerColumn == 1) {
            if (r.bSingleMode == true) {
                l = -1;
                k = -1;
                q.bOriginalImage = true
            } else {
                l = r.imageViewWidth;
                k = r.imageViewHeight;
                q.bOriginalImage = false
            }
        } else {
            if (l < 300) {
                l = 300
            }
            if (k < 300) {
                k = 300
            }
            q.bOriginalImage = false
        }
        var s = false;
        if (p) {
            s = true
        } else {
            if (q.bIsDirty == true || q.iImageControlWidth < l || q.iImageControlHeight < k || (q.iImageControlWidth > 0 && l == -1) || (q.iImageControlHeight > 0 && k == -1)) {
                s = true
            } else {
                s = false
            }
        }
        t.ClearImage();
        t.SetCurrentIndex(m);
        var n = r.__GetImageControlIndex(m);
        if (n >= 0) {
            r.__SetArrayControlLoadImage(n, m, t, q, l, k, r.AttachImagesForControl, s)
        }
    };
    f.prototype.__SetArrayControlLoadImage = function(n, m, u, r, l, k, t, p) {
        var s = this;
        var q = 0;
        for (q = 0; q < Dynamsoft.Lib.aryControlLoadImage.length; q++) {
            var v = Dynamsoft.Lib.aryControlLoadImage[q];
            if (v.iControlIndex == n && v.View == s) {
                v.iImageIndex = m;
                v.imgControl = u;
                v.modelImageControl = r;
                v.iWidth = l;
                v.iHeight = k;
                v.AttachImagesForControl = t;
                v.bOnlyFromServer = p;
                return
            }
        }
        Dynamsoft.Lib.aryControlLoadImage.push(new d(n, m, s, u, r, l, k, t, p, s.BaseUrl))
    };
    f.prototype.SetIfFitWindowAndType = function(l) {
        var m = this;
        if (m.bSingleMode == true) {
            m.bIfFitWindow = true;
            m.enumDWTFitWindowType = l;
            var k = m.GetImageControl(m.cCurrentIndex);
            if (null != k) {
                k.SetIfFitWindow(true, l);
                m.fZoom = k.GetZoom();
                k.Show()
            }
        } else {
            m.bIfFitWindow = true
        }
        return true
    };
    f.prototype.GetAllowMultiSelect = function() {
        var k = this;
        return k.AllowMultiSelect
    };
    f.prototype.SetAllowMultiSelect = function(k) {
        var l = this;
        l.AllowMultiSelect = k;
        return true
    };
    f.prototype.GetFitWindowType = function() {
        var k = this;
        return k.enumDWTFitWindowType
    };
    f.prototype.SetSelectionRectAspectRatio = function(k) {
        var l = this;
        l.ratio = k;
        l.__AttachImagesInner(true, false);
        return true
    };
    f.prototype.SetFitWindowType = function(k) {
        var l = this;
        l.enumDWTFitWindowType = k;
        if (l.bSingleMode) {
            l.__AttachImagesInner(true, false)
        } else {
            l.bIfFitWindow = true;
            l.enumDWTFitWindowType = 0
        }
        return true
    };
    f.prototype.GetIfFitWindow = function() {
        var k = this;
        return k.bIfFitWindow
    };
    f.prototype.SetIfFitWindow = function(k) {
        var l = this;
        l.bIfFitWindow = k;
        if (l.bSingleMode) {
            l.__AttachImagesInner(true, false)
        } else {
            l.bIfFitWindow = true;
            l.enumDWTFitWindowType = 0
        }
        return true
    };
    f.prototype.GetImageMargin = function() {
        var k = this;
        return k.ImageMargin
    };
    f.prototype.SetImageMargin = function(k) {
        var l = this;
        l.ImageMargin = k;
        l.__ReInitChildrenPosition();
        l.__AttachImagesInner(false, false);
        return true
    };
    f.prototype.GetSelectionImageBorderColor = function() {
        var k = this;
        return k.SelectionImageBorderColor
    };
    f.prototype.SetSelectionImageBorderColor = function(k) {
        var l = this;
        l.SelectionImageBorderColor = k;
        l.__AttachImagesInner(true, false);
        return true
    };
    f.prototype.GetZoom = function() {
        var l = this;
        if (l.bIfFitWindow) {
            var k = l.GetImageControl(l.cCurrentIndex);
            if (null != k) {
                return k.GetZoom()
            }
        }
        return l.fZoom
    };
    f.prototype.SetZoom = function(m) {
        var l = this;
        if (m < l.MIN_ZOOM) {
            m = l.MIN_ZOOM
        }
        if (m > l.MAX_ZOOM) {
            m = l.MAX_ZOOM
        }
        l.fZoom = m;
        if (l.bSingleMode == true) {
            l.bIfFitWindow = false;
            l.enumDWTFitWindowType = 0;
            var k = l.GetImageControl(l.cCurrentIndex);
            if (null != k) {
                k.SetZoom(l.fZoom)
            }
        } else {
            l.bIfFitWindow = true
        }
        return true
    };
    f.prototype.ZoomIn = function() {
        var p = this;
        if (p.bSingleMode == true) {
            var n = 15000;
            var l = p.aryModelImageControl[p.cCurrentIndex];
            var m = p.fZoom;
            if (p.bIfFitWindow) {
                var k = p.GetImageControl(p.cCurrentIndex);
                if (null != k) {
                    m = k.GetZoom()
                }
            }
            tempZoom = (Math.floor(m * 100 * p.zoomInStep) + 1);
            if (1 < tempZoom && tempZoom < 2501) {
                if (parseInt(l.imageWidth * p.fZoom) > n || parseInt(l.imageHeight * p.fZoom) > n) {
                    Funs2.output(p, "You have reached the limit for zooming in");
                    return false
                } else {
                    p.SetZoom(tempZoom / 100)
                }
            } else {
                Funs2.output(p, "You have reached the limit for zooming in");
                alert("You have reached the limit for zooming in");
                return false
            }
        }
        return true
    };
    f.prototype.ZoomOut = function() {
        var n = this;
        if (n.bSingleMode == true) {
            var l = n.fZoom;
            if (n.bIfFitWindow) {
                var k = n.GetImageControl(n.cCurrentIndex);
                if (null != k) {
                    l = k.GetZoom()
                }
            }
            var m = (Math.floor(l * 100 * n.zoomOutStep) - 1);
            if (1 < m && m < 6501) {
                n.SetZoom(m / 100)
            } else {
                Funs2.output(n, "You have reached the limit for zooming out");
                return false
            }
        }
        return true
    };
    f.prototype.GetMouseShape = function() {
        var k = this;
        return k.iMouseShape
    };
    f.prototype.SetMouseShape = function(k) {
        var l = this;
        l.iMouseShape = k;
        l.__AttachImagesInner(true, false);
        return true
    };
    f.prototype.SetMouseShapeByIndex = function(l, m) {
        var n = this;
        n.__OnlySetCurrentIndex(l);
        n.iMouseShape = m;
        var k = n.GetImageControl(l);
        if (null != k) {
            k.SetMouseShape(n.iMouseShape);
            k.Show();
            return true
        }
        return false
    };
    f.prototype.GetShowPageNumber = function() {
        var k = this;
        return k.bShowPageNumber
    };
    f.prototype.SetShowPageNumber = function(k) {
        var l = this;
        l.bShowPageNumber = k;
        l.__AttachImagesInner(true, false);
        return true
    };
    f.prototype.SetBackgroundColor = function(k) {
        var l = this;
        l.BackgroundColor = k;
        if (l.canvas) {
            l.canvas.style.backgroundColor = k
        }
        l.__AttachImagesInner(true, false);
        return true
    };
    f.prototype.Go = function(k) {
        var l = this;
        l.__GoInner(k, true, false);
        return true
    };
    f.prototype.SetCurrentIndexOnly = function(k) {
        var l = this;
        return l.__GoInner(k, true, false)
    };
    f.prototype.__GoInner = function(q, t, u) {
        var n = this,
            s = n.cCurrentIndex;
        if (q < n.aryModelImageControl.length && q >= 0) {
            if (u == false) {
                n.__OnlySetCurrentIndex(q)
            }
            if (t == true) {
                if (u == true) {
                    n.__SetCurrentIndex(n.cCurrentIndex)
                } else {
                    n.__SetCurrentIndexWithoutRefreshUI(n.cCurrentIndex)
                }
            }
            if (u == true) {
                n.__AttachImages(false)
            }
            n.iCurrentRow = -1;
            n.iCurrentColumn = -1;
            if (t == false) {
                if (n.bVerticalMode == true) {
                    var r = n.iCurrentRow;
                    n.iCurrentRow = n.__GetRow(q);
                    if (n.iCurrentRow != r && (n.iCurrentRow <= n.iOldFirstVisibleRow || (n.iCurrentRow > n.iOldFirstVisibleRow))) {
                        var l = n.__GetFirstVisibleRow();
                        if (n.iOldFirstVisibleRow != l) {
                            n.iOldFirstVisibleRow = l;
                            var p = l * n.imagesPerColumn;
                            n.__fireEvent("OnTopImageInTheViewChanged", p)
                        }
                    }
                } else {
                    var m = n.iCurrentColumn;
                    n.iCurrentColumn = q;
                    if (n.iCurrentColumn != m && (n.iCurrentColumn < n.iOldFirstVisibleColum || (n.iCurrentColumn > n.iOldFirstVisibleColum))) {
                        var k = n.__GetFirstVisibleColumn();
                        if (n.iOldFirstVisibleColum != k) {
                            n.iOldFirstVisibleColum = k;
                            var p = k;
                            n.__fireEvent("OnTopImageInTheViewChanged", p)
                        }
                    }
                }
            }
        }
        return true
    };
    f.prototype.PrintCurrent = function() {
        var p = this;
        if (p.cCurrentIndex < 0) {
            return
        }
        var l = Funs2.getImageUrl(p.BaseUrl, p.cCurrentIndex, -1, -1);
        var k = p.aryModelImageControl[p.cCurrentIndex];
        var n = [];
        var m = new j(l, k.imageWidth, k.imageHeight);
        n.push(m);
        Funs2.print(n);
        return true
    };
    f.prototype.Print = function() {
        var p = this;
        if (p.cCurrentIndex < 0) {
            return
        }
        var n = [];
        for (i = 0; i < p.aryModelImageControl.length; i++) {
            var l = Funs2.getImageUrl(p.BaseUrl, i, -1, -1);
            var k = p.aryModelImageControl[i];
            var m = new j(l, k.imageWidth, k.imageHeight);
            n.push(m)
        }
        Funs2.print(n);
        return true
    };
    f.prototype.SetSelectedImageCount = function(k) {
        var l = this;
        l.aryCurrentSelectedImageIndicesInBuffer.splice(k);
        l.__SetUnselectAll();
        l.__SetSelectedImageIndicesInBuffer();
        return true
    };
    f.prototype.SetSelectedImageIndex = function(p, n) {
        var r = this;
        r.aryCurrentSelectedImageIndicesInBuffer[p] = n;
        r.__SetUnselectAll();
        r.__SetSelectedImageIndicesInBuffer();
        var l = -1,
            k = r.aryCurrentSelectedImageIndicesInBuffer.length,
            q;
        for (var m = 0; m < k; m++) {
            var q = r.aryCurrentSelectedImageIndicesInBuffer[m];
            if (l == -1) {
                l = q
            } else {
                if (q < l) {
                    l = q
                }
            }
        }
        if (l >= 0 && l < r.aryModelImageControl.length && r.cCurrentIndex != l) {
            r.cCurrentIndex = l;
            r.__fireEvent("onResetCurrentIndex", r.cCurrentIndex)
        }
        return true
    };
    f.prototype.__SetSelectedImageIndicesInBuffer = function() {
        var n = this;
        if (n.aryCurrentSelectedImageIndicesInBuffer.length == 0) {
            if (n.cCurrentIndex >= 0) {
                n.aryCurrentSelectedImageIndicesInBuffer.push(n.cCurrentIndex)
            }
        }
        var l = 0;
        for (l = 0; l < n.aryCurrentSelectedImageIndicesInBuffer.length; l++) {
            var m = n.aryCurrentSelectedImageIndicesInBuffer[l];
            var k = n.GetImageControl(m);
            if (null != k) {
                k.SetSelect(true);
                k.Show()
            }
        }
    };
    f.prototype.__OnlySetCurrentIndex = function(k) {
        var m = this,
            l = m.cCurrentIndex;
        m.cCurrentIndex = k;
        if (l != k) {
            m.__fireEvent("onResetCurrentIndex", k)
        }
        if (m.aryCurrentSelectedImageIndicesInBuffer[0] != m.cCurrentIndex) {
            m.aryCurrentSelectedImageIndicesInBuffer = [];
            m.aryCurrentSelectedImageIndicesInBuffer.push(m.cCurrentIndex)
        }
    };
    f.prototype.__MousewheelChanged = function(k) {
        if (k.__MousewheelValue > 0) {
            k.__MousewheelUp(k.__MousewheelValue)
        } else {
            if (k.__MousewheelValue < 0) {
                k.__MousewheelDown(-k.__MousewheelValue)
            }
        }
        k.__MousewheelValue = 0
    };
    f.prototype.__MousewheelUp = function(n) {
        var p = this;
        if (p.bSingleMode == false) {
            if (p.__GetIfHScroll() == true || p.__GetIfVScroll() == true) {
                var l = 0,
                    m = 0;
                if (p.bVerticalMode == true) {
                    l = p.__GetFirstVisibleRow() * p.imagesPerColumn;
                    m = l - n * p.imagesPerColumn
                } else {
                    l = p.__GetFirstVisibleColumn();
                    m = l - n
                }
                if (m < 0) {
                    m = 0
                }
                Funs2.output(p, "__MousewheelUp(baseIndex, index): " + [l, m].join(","));
                p.__SetScrollByIndex(m)
            }
        } else {
            var k = p.GetImageControl(p.cCurrentIndex);
            if (null != k) {
                k.ImageMoveUp()
            }
        }
    };
    f.prototype.__MousewheelDown = function(n) {
        var p = this;
        if (p.bSingleMode == false) {
            if (p.__GetIfHScroll() == true || p.__GetIfVScroll() == true) {
                var l = 0,
                    m = 0;
                if (p.bVerticalMode == true) {
                    l = p.__GetFirstVisibleRow() * p.imagesPerColumn;
                    m = l + n * p.imagesPerColumn
                } else {
                    l = p.__GetFirstVisibleColumn();
                    m = l + n
                }
                if (l + p.imagesPerColumn * p.imagesPerRow < p.aryModelImageControl.length) {
                    Funs2.output(p, "__MousewheelDown(baseIndex, index): " + [l, m].join(","));
                    p.__SetScrollByIndex(m, true)
                }
            }
        } else {
            var k = p.GetImageControl(p.cCurrentIndex);
            if (null != k) {
                k.ImageMoveDown()
            }
        }
    };
    f.prototype.__Previous = function() {
        var k = this;
        k.Go(k.cCurrentIndex - 1);
        return true
    };
    f.prototype.__DoLeftArrow = function() {
        var l = this;
        if (l.bSingleMode == false) {
            l.Go(l.cCurrentIndex - 1)
        } else {
            var k = l.GetImageControl(l.cCurrentIndex);
            if (null != k) {
                k.ImageMoveLeft()
            }
        }
        return true
    };
    f.prototype.__Next = function() {
        var k = this;
        k.Go(k.cCurrentIndex + 1);
        return true
    };
    f.prototype.__DoRightArrow = function() {
        var l = this;
        if (l.bSingleMode == false) {
            l.__SetCurrentIndexInner(l.cCurrentIndex + 1, true)
        } else {
            var k = l.GetImageControl(l.cCurrentIndex);
            if (null != k) {
                k.ImageMoveRight()
            }
        }
        return true
    };
    f.prototype.__PreviousUp = function() {
        var m = this;
        if (m.bSingleMode == false) {
            var l = m.cCurrentIndex - m.imagesPerColumn;
            if (l >= 0) {
                m.Go(l)
            }
        } else {
            var k = m.GetImageControl(m.cCurrentIndex);
            if (null != k) {
                k.ImageMoveUp()
            }
        }
        return true
    };
    f.prototype.__NextDown = function() {
        var m = this;
        if (m.bSingleMode == false) {
            var l = m.cCurrentIndex + m.imagesPerColumn;
            if (l < m.aryModelImageControl.length) {
                m.__SetCurrentIndexInner(l, true)
            }
        } else {
            var k = m.GetImageControl(m.cCurrentIndex);
            if (null != k) {
                k.ImageMoveDown()
            }
        }
        return true
    };
    f.prototype.__PageUp = function() {
        var n = this;
        if (n.bSingleMode == false) {
            if (n.bVerticalMode == true) {
                var l = n.__GetFirstVisibleRow() * n.imagesPerColumn;
                var m = l - n.imagesPerColumn * n.imagesPerRow;
                if (m >= 0) {
                    n.__SetCurrentIndexInner(m, false)
                } else {
                    n.__SetCurrentIndexInner(0, false)
                }
            } else {}
        } else {
            var k = n.GetImageControl(n.cCurrentIndex);
            if (null != k) {
                k.ImageMovePageUp()
            }
        }
        return true
    };
    f.prototype.__PageDown = function() {
        var n = this;
        if (n.bSingleMode == false) {
            if (n.bVerticalMode == true) {
                var l = n.__GetFirstVisibleRow() * n.imagesPerColumn;
                var m = l + n.imagesPerColumn * n.imagesPerRow;
                if (m < n.aryModelImageControl.length) {
                    n.__SetCurrentIndexInner(m, false)
                } else {
                    n.__SetCurrentIndexInner(n.aryModelImageControl.length - 1, false, false)
                }
            } else {}
        } else {
            var k = n.GetImageControl(n.cCurrentIndex);
            if (null != k) {
                k.ImageMovePageDown()
            }
        }
        return true
    };
    f.prototype.__Home = function() {
        var l = this;
        if (l.bSingleMode == false) {
            l.__SetCurrentIndexInner(0, false)
        } else {
            var k = l.GetImageControl(l.cCurrentIndex);
            if (null != k) {
                k.ImageMoveHome()
            }
        }
        return true
    };
    f.prototype.__End = function() {
        var l = this;
        if (l.bSingleMode == false) {
            l.__SetCurrentIndexInner(l.aryModelImageControl.length - 1, false)
        } else {
            var k = l.GetImageControl(l.cCurrentIndex);
            if (null != k) {
                k.ImageMoveEnd()
            }
        }
        return true
    };
    f.prototype.__fireEvent = function(k, l) {
        var m = this;
        if (a.isFunction(m[k])) {
            return m[k](l)
        }
        return true
    };
    f.prototype.AddImage = function(n, l, s) {
        var p = this,
            q = n * 1,
            r, t, m, k;
        t = p.GetDataImageControlList();
        r = t.length;
        if (q < 0 || q > l) {
            return false
        }
        m = q;
        for (; m < r; m++) {
            k = t[m];
            k.imageIndex = (m + 1)
        }
        k = new Dynamsoft.Lib.UI.ModelImageControl();
        k.bIsDirty = true;
        k.rawWidth = s;
        if (q >= r) {
            k.imageIndex = r;
            q = r;
            t.push(k)
        } else {
            k.imageIndex = q;
            t.splice(q, 0, k)
        }
        p.__bAddingImage = true;
        p.UpdateAllImage(t, q, q, r);
        p.__bAddingImage = false;
        return true
    };
    f.prototype.RemoveImage = function(m, k) {
        var p = this,
            q = m * 1,
            s = k * 1,
            r, u, t;
        if (typeof(q) === "undefined" || q < 0) {
            return
        }
        u = p.GetDataImageControlList();
        r = u.length;
        if (r == 1) {
            p.RemoveAllImages();
            return
        }
        if (q >= r) {
            q = r - 1
        } else {
            var n = q,
                l;
            for (; n < u.length; n++) {
                l = u[n];
                l.imageIndex = (n - 1)
            }
        }
        t = u.splice(q, 1);
        if (t && t[0]) {
            t[0].Clear()
        }
        p.UpdateAllImage(u, s, q, r - 2);
        return true
    };
    f.prototype.MoveImage = function(l, u) {
        var p = this,
            s, t, n, m, r, q, k;
        t = p.GetDataImageControlList();
        s = t.length;
        n = l;
        r = t[l];
        for (; n < t.length; n++) {
            m = t[n];
            m.imageIndex = (n - 1)
        }
        t.splice(l, 1);
        n = u;
        for (; n < t.length; n++) {
            m = t[n];
            m.imageIndex = (n + 1)
        }
        t.splice(u, 0, r);
        r.imageIndex = u;
        if (l < u) {
            q = l;
            k = u
        } else {
            q = u;
            k = l
        }
        p.UpdateAllImage(t, p.GetCurrentImageIndex(), q, k);
        return true
    };
    f.prototype.GetCurrentImageIndex = function() {
        return this.cCurrentIndex
    };
    f.prototype.GetSelectedIndexes = function() {
        return this.aryCurrentSelectedImageIndicesInBuffer
    };
    f.prototype.HowManyImagesInBuffer = function() {
        return this.GetDataImageControlList().length
    };
    f.prototype.SwitchImage = function(m, l) {
        var r = this,
            k, q, p, n;
        q = r.GetDataImageControlList();
        k = q.length;
        if (m < q.length && m >= 0 && l < q.length && l >= 0) {
            p = q[m];
            p.imageIndex = l;
            n = q[l];
            n.imageIndex = m;
            q[l] = p;
            q[m] = n;
            r.UpdateImage(m, n.imageToShow, n.imageWidth, n.imageHeight, n.aryOverlayRectangleData, n.imageUrl);
            r.UpdateImage(l, p.imageToShow, p.imageWidth, p.imageHeight, p.aryOverlayRectangleData, p.imageUrl)
        }
        return true
    };
    f.prototype.GetIfAutoScroll = function() {
        return this.__IfAutoScroll
    };
    f.prototype.SetIfAutoScroll = function(k) {
        this.__IfAutoScroll = k ? true : false;
        return true
    };
    f.prototype.handlerKeyDownView = function(l) {
        var m = this,
            k = true;
        if (!m.bFocus) {
            return k
        }
        m.iCurrentRow = -1;
        m.iCurrentColumn = -1;
        switch (l.keyCode) {
            case 37:
                k = false;
                m.__DoLeftArrow();
                break;
            case 39:
                k = false;
                m.__DoRightArrow();
                break;
            case 38:
                k = false;
                m.__PreviousUp();
                break;
            case 40:
                k = false;
                m.__NextDown();
                break;
            case 33:
                k = false;
                m.__PageUp();
                break;
            case 34:
                k = false;
                m.__PageDown();
                break;
            case 35:
                k = false;
                m.__End();
                break;
            case 36:
                k = false;
                m.__Home();
                break;
            case 82:
                break;
            case 107:
                m.ZoomIn();
                break;
            case 109:
                m.ZoomOut();
                break
        }
        if (k == false) {
            a.stopPropagation(l)
        }
        return k
    };
    Dynamsoft.Lib.UI = Dynamsoft.Lib.UI || {};
    Dynamsoft.Lib.UI.ImageUIView = f;
    Dynamsoft.Lib.UI.ModelImageControl = g;
    var b = function(l) {
        var k = true;
        Dynamsoft.Lib.each(e, function(m) {
            if (m instanceof Dynamsoft.Lib.UI.ImageUIView) {
                if (m.bFocus) {
                    k = m.handlerKeyDownView(l);
                    if (!k) {
                        return false
                    }
                }
            }
        });
        return k
    };
    Dynamsoft.Lib.addEventListener(document.documentElement, "keydown", b)
})(Dynamsoft.Lib);
Dynamsoft.Lib.aryControlLoadImage = [];
Dynamsoft.Lib.imageControlCount = 0;
Dynamsoft.Lib.AttachAndShowImage = function() {
    if (Dynamsoft.WebTwainEnv.ScanDirectly) {
        return
    }
    if (Dynamsoft.Lib.aryControlLoadImage.length == 0) {
        setTimeout(Dynamsoft.Lib.AttachAndShowImage, 500);
        return
    }
    var c = 0;
    var e = Dynamsoft.Lib.aryControlLoadImage[0];
    Dynamsoft.Lib.aryControlLoadImage.splice(0, 1);
    if (e.iControlIndex >= 0 && e.iControlIndex < Dynamsoft.Lib.imageControlCount) {
        var b = 2,
            a = e.iWidth,
            d = e.iHeight;
        if (a > b) {
            a -= b
        }
        if (d > b) {
            d -= b
        }
        if (e.bOnlyFromServer) {
            Dynamsoft.Lib.OnGetImageFromServer(e, e.modelImageControl, e.iImageIndex, a, d, e.BaseUrl, e.AttachImagesForControl)
        } else {
            Dynamsoft.Lib.OnGetImageByURL(e, e.modelImageControl, e.iImageIndex, a, d, e.BaseUrl, e.AttachImagesForControl)
        }
    } else {
        setTimeout(Dynamsoft.Lib.AttachAndShowImage, 0)
    }
};
Dynamsoft.Lib.OnGetImageByURL = function(l, c, f, j, e, g, b) {
    var a, k, d = l.imgControl;
    if (b) {
        if (c.imageUrl && c.imageUrl != "") {
            d.ClearImage();
            d.SetBindIndex(f);
            k = new Image();
            k.src = c.imageUrl;
            k.onload = function() {
                d.tmpImage = false;
                c.imageToShow = k;
                c.imageWidth = k.width;
                c.imageHeight = k.height;
                c.iImageControlWidth = j;
                c.iImageControlHeight = e;
                c.bIsDirty = false;
                b(d, c, f);
                k.onload = undefined;
                k.onerror = undefined;
                setTimeout(Dynamsoft.Lib.AttachAndShowImage, 0)
            };
            k.onerror = function(m) {
                var n = d.GetBindIndex(),
                    p = l.View,
                    h;
                h = p.GetDataImageControlList().length;
                if (n >= 0 && n < h) {
                    k.src = c.imageUrl
                } else {
                    k.src = "data:,";
                    k.onload = undefined;
                    k.onerror = undefined;
                    k = null;
                    d.tmpImage = false;
                    setTimeout(Dynamsoft.Lib.AttachAndShowImage, 0)
                }
            };
            if (d.tmpImage) {
                d.tmpImage.src = "data:,";
                d.tmpImage.onload = undefined
            }
            d.tmpImage = k
        } else {
            Dynamsoft.Lib.OnGetImageFromServer(l, c, f, j, e, g, b)
        }
    } else {
        setTimeout(Dynamsoft.Lib.AttachAndShowImage, 0)
    }
    return true
};
Dynamsoft.Lib.OnGetImageFromServer = function(l, c, f, j, e, g, b) {
    var a, k, d = l.imgControl;
    if (b && g) {
        d.ClearImage();
        d.SetBindIndex(f);
        a = Funs2.getImageUrl(g, f, j, e);
        k = new Image();
        k.src = a;
        k.onload = function() {
            d.tmpImage = false;
            c.imageToShow = k;
            c.imageWidth = k.width;
            c.imageHeight = k.height;
            c.imageUrl = a;
            c.iImageControlWidth = j;
            c.iImageControlHeight = e;
            c.bIsDirty = false;
            b(d, c, f);
            k.onload = undefined;
            k.onerror = undefined;
            setTimeout(Dynamsoft.Lib.AttachAndShowImage, 0)
        };
        k.onerror = function(m) {
            var n = d.GetBindIndex(),
                p = l.View,
                h;
            h = p.GetDataImageControlList().length;
            if (n >= 0 && n < h) {
                a = Funs2.getImageUrl(g, d.GetBindIndex(), j, e);
                k.src = a
            } else {
                k.src = "data:,";
                k.onload = undefined;
                k.onerror = undefined;
                k = null;
                d.tmpImage = false;
                setTimeout(Dynamsoft.Lib.AttachAndShowImage, 0)
            }
        };
        if (d.tmpImage) {
            d.tmpImage.src = "data:,";
            d.tmpImage.onload = undefined
        }
        d.tmpImage = k
    } else {
        setTimeout(Dynamsoft.Lib.AttachAndShowImage, 0)
    }
    return true
};
setTimeout(Dynamsoft.Lib.AttachAndShowImage, 500);
(function(c) {
    if (!Dynamsoft.Lib.product.bChromeEdition) {
        return
    }
    var f = "eng",
        d = c.DOM,
        b = {
            btninfo: ["previous", "next", "", "rotateleft", "rotate", "rotateright", "deskew", "crop", "changeimagesize", "flip", "mirror", "", "zoomin", "originalsize", "zoomout", "stretch", "fit", "fitw", "fith", "print", "", "hand", "rectselect", "zoom", "", "restore", "save"],
            titlelan: ["eng", "chi"],
            titles: [
                ["Previous Image", "Next Image", "", "Rotate Left", "Rotate", "Rotate Right", "Deskew", "Crop Selected Area", "Change Image Size", "Flip", "Mirror", "", "Zoom In", "Original Size", "Zoom Out", "Stretch Mode", "Fit Canvas", "Fit Horizontally", "Fit Vertically", "Print", "", "Hand", "Select", "Zoom", "", "Restore", "Save Changes"],
                ["Previous Image", "Next Image", "", "Rotate Left", "Rotate", "Rotate Right", "Deskew", "Crop Selected Area", "Change Image Size", "Flip", "Mirror", "", "Zoom In", "Original Size", "Zoom Out", "Stretch Mode", "Fit Canvas", "Fit Horizontally", "Fit Vertically", "Print", "", "Hand", "Select", "Zoom", "", "Restore", "Save Changes"]
            ]
        },
        e = {
            isFunction: function(g) {
                return g && typeof(g) === "function"
            },
            init: function(k, h) {
                var l = k,
                    j = h || {},
                    g = Math.floor(Math.random() * 100000 + 1);
                l.container = j.Container;
                l.containerWidth = j.width ? j.width : 0;
                l.containerHeight = j.height ? j.height : 0;
                l.width = l.containerWidth;
                l.height = l.containerHeight;
                l.defaultIndex = 0;
                l.bEdit = j.bEdit || false;
                l.evt_switch = j.evt_switch || "";
                l.evt_mouseMove = j.evt_mouseMove || "";
                l.evt_mouseIn = j.evt_mouseIn || "";
                l.evt_mouseOut = j.evt_mouseOut || "";
                l.evt_mouseClick = j.evt_mouseClick || "";
                l.evt_mouseDblClick = j.evt_mouseDblClick || "";
                l.selectionImageBorderColor = false;
                l.backgroundColor = "rgb(255, 255, 255)";
                l.onRefreshUI = j.onRefreshUI || false;
                l.onMouseRightClick = j.onMouseRightClick || false;
                l.onMouseClick = j.onMouseClick || false;
                l.onMouseDoubleClick = j.onMouseDoubleClick || false;
                l.onMouseMove = j.onMouseMove || false
            },
            addClass: function(h, g) {
                var j = c.one(h);
                if (j) {
                    j.addClass(g)
                }
            },
            removeClass: function(h, g) {
                var j = c.one(h);
                if (j) {
                    j.removeClass(g)
                }
            },
            __createButton: function(m, h, l, g, k) {
                var j = document.createElement("img");
                j.src = Dynamsoft.WebTwainEnv.ResourcesPath + "/reference/imgs/" + h + ".png";
                j.className = "Class_D_DWT_Editor_Buttons_" + h;
                j.title = l;
                j.style.width = g + "px";
                j.style.height = k + "px";
                this.__btnBindEvents(m, j, h);
                return j
            },
            __btnBindEvents: function(j, h, g) {
                switch (g) {
                    case "previous":
                        h.onclick = function() {
                            j.previous_btn()
                        };
                        break;
                    case "next":
                        h.onclick = function() {
                            j.next_btn()
                        };
                        break;
                    case "rotateleft":
                        h.onclick = function() {
                            j.RotateLeft()
                        };
                        break;
                    case "rotate":
                        h.onclick = function() {
                            j.RotateAnyAngle(this)
                        };
                        break;
                    case "rotateright":
                        h.onclick = function() {
                            j.RotateRight()
                        };
                        break;
                    case "deskew":
                        h.onclick = function() {
                            j.Deskew()
                        };
                        break;
                    case "crop":
                        h.onclick = function() {
                            j.Crop_btn()
                        };
                        break;
                    case "changeimagesize":
                        h.onclick = function() {
                            j.ChangeImageSizeGetinput(this)
                        };
                        break;
                    case "flip":
                        h.onclick = function() {
                            j.Flip()
                        };
                        break;
                    case "mirror":
                        h.onclick = function() {
                            j.Mirror()
                        };
                        break;
                    case "zoomin":
                        h.onclick = function() {
                            j.ZoomIn()
                        };
                        break;
                    case "originalsize":
                        h.onclick = function() {
                            j.OriginalSize()
                        };
                        break;
                    case "zoomout":
                        h.onclick = function() {
                            j.ZoomOut()
                        };
                        break;
                    case "stretch":
                        h.onclick = function() {
                            j.StrechMode()
                        };
                        break;
                    case "fit":
                        h.onclick = function() {
                            j.FitsWindowSize()
                        };
                        break;
                    case "fitw":
                        h.onclick = function() {
                            j.FitsWindowWidth()
                        };
                        break;
                    case "fith":
                        h.onclick = function() {
                            j.FitsWindowHeight()
                        };
                        break;
                    case "print":
                        h.onclick = function() {
                            j.print()
                        };
                        break;
                    case "hand":
                        h.onclick = function() {
                            j.Hand_btn()
                        };
                        break;
                    case "rectselect":
                        h.onclick = function() {
                            j.RectSelect_btn()
                        };
                        break;
                    case "zoom":
                        h.onclick = function() {
                            j.Zoom_btn()
                        };
                        break;
                    case "restore":
                        h.style.display = "none";
                        h.onclick = function() {
                            j.RestoreImage()
                        };
                        break;
                    case "save":
                        h.style.display = "none";
                        h.onclick = function() {
                            j.SaveImage()
                        };
                        break
                }
            },
            getToolBar: function(t, h, w) {
                var s = this,
                    r;
                for (var n = 0; n < b.titlelan.length; n++) {
                    if (b.titlelan[n] == f) {
                        r = b.titles[n];
                        break
                    } else {
                        r = b.titles[0]
                    }
                }
                var l = document.createElement("ul"),
                    v, q, p;
                var m = b.btninfo.length,
                    u = false,
                    k;
                var g = (h / m - 4) > (w - 4) ? (w - 4) : (h / m - 4);
                g = Math.floor(g);
                l.style.paddingTop = "2px";
                for (q = 0; q < m; q++) {
                    v = document.createElement("li"), _w = g;
                    v.style.floatLeft = "true";
                    k = b.btninfo[q];
                    if (k == "") {
                        p = document.createElement("span");
                        p.style.paddingLeft = g + "px";
                        v.appendChild(p)
                    } else {
                        if (k == "hand" || k == "rectselect" || k == "zoom") {
                            _w = g - 6;
                            u = true
                        } else {
                            u = false
                        }
                        p = s.__createButton(t, k, r[q], _w, _w);
                        if (u) {
                            p.style.padding = "2px"
                        }
                        v.appendChild(p)
                    }
                    l.appendChild(v)
                }
                v = document.createElement("li");
                v.style["float"] = "right";
                var x = s.__createButton(t, "close", "Click to Close Window", g, g);
                x.onclick = function() {
                    t.CloseImageEditor()
                };
                v.appendChild(x);
                l.appendChild(v);
                return l
            },
            output: function(h, g) {
                if (Dynamsoft.WebTwainEnv.Debug) {
                    c.log(g)
                }
            }
        };

    function a(k, h) {
        var m = this,
            j = h || {},
            g, l = '<div class="D_ImageUIEditor noPaddingnoMarginInside thinborder"></div>';
        m._UIManager = k;
        m.aryModelImageControl = m.__NewAryModelImageControl(h.aryModelImageControl);
        m._UIView;
        m.iControlWidth = 0;
        m.iControlHeight = 0;
        m._stwain = h.stwain;
        m.BaseUrl = h.BaseUrl;
        m.cIndex = h.cIndex;
        m.totalImagesCount = m.aryModelImageControl.length;
        m._IfImageChanged = false;
        e.init(m, j);
        g = m.container;
        g.append(l);
        m.UIEditor = g.one(".D_ImageUIEditor");
        m.bShow = false;
        m.zoom = 1;
        m.aspectRatio = 1;
        m.__fitWindowType = 0;
        m.toolbar = {
            self: null,
            filled: false,
            width: 0,
            height: 0
        };
        m.Left = 0;
        m.Top = 0;
        m.Right = 0;
        m.Bottom = 0;
        window.onresize = function() {
            m.ShowImageEditorEx(-1, -1, -1, -1)
        }
    }
    a.prototype.__NewAryModelImageControl = function(j) {
        var l = this;
        var k = [];
        var h = 0;
        for (h = 0; h < j.length; h++) {
            var g = new Dynamsoft.Lib.UI.ModelImageControl();
            g.bIsDirty = true;
            g.imageToShow = null;
            g.imageWidth = -1;
            g.imageHeight = -1;
            g.iImageControlWidth = -1;
            g.iImageControlHeight = -1;
            g.imageIndex = j[h].imageIndex;
            g.aryOverlayRectangleData = [];
            k.push(g)
        }
        return k
    };
    a.prototype.ShowImageEditorEx = function(h, l, g, k) {
        var j = this;
        g = window.innerWidth;
        k = window.innerHeight;
        h = 0;
        l = 0;
        j.width = g - 2;
        j.height = k - 2;
        j.UIEditor.css({
            display: "",
            width: j.width + "px",
            height: j.height + "px",
            position: "fixed",
            left: h,
            top: l,
            "z-index": "9999"
        });
        j.isFitWindow = true;
        document.documentElement.scrollLeft = 0;
        document.documentElement.scrollTop = 0;
        document.body.style.overflow = "hidden";
        if (j.toolbar.filled) {
            j.toolbar.filled = false
        }
        j.toolbar.width = j.width;
        j.toolbar.height = Math.ceil(j.height / 20 < 20 ? 20 : j.height / 20);
        this.updateEditor();
        return true
    };
    a.prototype.updateEditor = function() {
        var p = this;
        e.output(p, 'Editor is under mode "' + p.mode + '"');
        if (p.toolbar.self) {
            if (!p.bShow) {
                return
            }
            if (p.toolbar.width + p.toolbar.height == 0) {
                e.addClass(p.toolbar.self, "notdisplayed")
            } else {
                p.toolbar.self.style.width = p.toolbar.width + "px";
                p.toolbar.self.style.height = p.toolbar.height + "px";
                if (!p.toolbar.filled) {
                    p.toolbar.filled = true;
                    while (p.toolbar.self.firstChild) {
                        p.toolbar.self.removeChild(p.toolbar.self.firstChild)
                    }
                    p.toolbar.self.appendChild(e.getToolBar(p, p.toolbar.width, p.toolbar.height));
                    if (p._IfImageChanged) {
                        var k = c.one(p.toolbar.self).one(".Class_D_DWT_Editor_Buttons_save"),
                            n = c.one(p.toolbar.self).one(".Class_D_DWT_Editor_Buttons_restore");
                        k[0].style.display = "";
                        n[0].style.display = ""
                    }
                }
                e.removeClass(p.toolbar.self, "notdisplayed");
                e.removeClass(p.toolbar.self, "overlay")
            }
            p.iControlWidth = p.width - 2;
            p.iControlHeight = (p.height - p.toolbar.height - 2);
            c.log("ChangeImageViewSize: " + [p.iControlWidth, p.iControlHeight].join(","));
            p._UIView.ChangeImageViewSize(p.iControlWidth, p.iControlHeight);
            p.updateMode()
        } else {
            var g = (Math.floor(Math.random() * 1000 + 1)).toString();
            var l, m, j = ["D_ImageUIEditor", "noPaddingnoMarginInside", "thinborder"];
            l = document.createElement("div");
            l.id = "ds-dwt-viewerToolbar" + g;
            l.style.width = p.toolbar.width + "px";
            l.style.height = p.toolbar.height + "px";
            l.style.whiteSpace = "normal";
            l.className = "ds-dwt-viewerToolbar";
            m = document.createElement("div");
            m.id = "ds-dwt-imageViewer" + g;
            m.style.width = p.width + "px";
            m.style.height = (p.height - p.toolbar.height) + "px";
            m.style.backgroundColor = p.backgroundColor;
            m.className = "ds-dwt-imageViewer";
            p.UIEditor.css({
                width: p.width + "px",
                height: p.height + "px"
            });
            p.UIEditor.append(l);
            p.UIEditor.append(m);
            p.iControlWidth = p.width - 2;
            p.iControlHeight = (p.height - p.toolbar.height - 2);
            var h = {
                Container: p.container.one(".ds-dwt-imageViewer"),
                Width: p.iControlWidth,
                Height: p.iControlHeight,
                borderWidth: 0
            };
            h.onImageAreaSelected = function(s) {
                c.log("__onImageAreaSelected: " + [s.left, s.top, s.right, s.bottom].join(","));
                p.Left = s.left;
                p.Top = s.top;
                p.Right = s.right;
                p.Bottom = s.bottom;
                var r = c.one(p.toolbar.self).one(".Class_D_DWT_Editor_Buttons_crop");
                if (r && r[0]) {
                    var q = r[0].src;
                    q = q.replace("crop_grey.", "crop.");
                    r[0].src = q;
                    r.style("cursor", "pointer")
                }
            };
            h.onImageAreaDeSelected = function() {
                c.log("__onImageAreaDeSelected: ");
                p.Left = 0;
                p.Top = 0;
                p.Right = 0;
                p.Bottom = 0;
                if (c.one(p.toolbar.self)) {
                    p.__SetCropButtonGrey(false)
                }
            };
            h.onZoomChanged = function(q) {
                p.__SetZoomInButtonEnable(!q.isMax);
                p.__SetZoomOutButtonEnable(true);
                p.__SetCropButtonGrey(true)
            };
            p._UIView = new Dynamsoft.Lib.UI.ImageUIView(h);
            p._UIView.BaseUrl = p.BaseUrl;
            p._UIView.aryModelImageControl = p.aryModelImageControl;
            p._UIView.cCurrentIndex = p.cIndex;
            p._UIView.__fireEvent("onResetCurrentIndex", p.cIndex);
            p._UIView.SetViewMode(-1, -1);
            p.UIEditor.attr("class", j.join(" "));
            p.toolbar.self = document.getElementById("ds-dwt-viewerToolbar" + g);
            p.updateEditor()
        }
    };
    a.prototype.updateMode = function(k) {
        var l = this,
            j;
        var h = c.one(l.toolbar.self).one(".Class_D_DWT_Editor_Buttons_next"),
            g = c.one(l.toolbar.self).one(".Class_D_DWT_Editor_Buttons_previous");
        if (l.totalImagesCount > 1) {
            if (h && h[0]) {
                if (l.cIndex == l.totalImagesCount - 1) {
                    j = h[0].src;
                    j = j.replace("next.", "next_grey.");
                    h[0].src = j;
                    h[0].style.cursor = "auto"
                } else {
                    j = h[0].src;
                    j = j.replace("next_grey.", "next.");
                    h[0].src = j;
                    h[0].style.cursor = "pointer"
                }
                if (l.cIndex == 0) {
                    j = g[0].src;
                    j = j.replace("previous.", "previous_grey.");
                    g[0].src = j;
                    g[0].style.cursor = "auto"
                } else {
                    j = g[0].src;
                    j = j.replace("previous_grey.", "previous.");
                    g[0].src = j;
                    g[0].style.cursor = "pointer"
                }
            }
        } else {
            if (h && h[0]) {
                j = h[0].src;
                j = j.replace("next.", "next_grey.");
                h[0].src = j;
                h[0].style.cursor = "auto";
                j = g[0].src;
                j = j.replace("previous.", "previous_grey.");
                g[0].src = j;
                g[0].style.cursor = "auto"
            }
        }
        l.__SetCropButtonGrey(true);
        l.RectSelect_btn()
    };
    a.prototype.CloseImageEditor = function() {
        var g = this;
        Dynamsoft.Lib.hide("J_ImgSizeEditor");
        Dynamsoft.Lib.hide("J_RotateAnyAngle");
        window.onresize = null;
        if (g._IfImageChanged) {
            g.ShowDialogForSaveImage(-1, true);
            return
        }
        document.body.style.overflow = "";
        g.__HideImageEditorInner()
    };
    a.prototype.__HideImageEditorInner = function() {
        var g = this;
        g._UIView.Clear();
        g.aryModelImageControl = [];
        g.container.remove()
    };
    a.prototype.previous_btn = function() {
        var j = this,
            g, h = c.one(j.toolbar.self).one(".Class_D_DWT_Editor_Buttons_previous");
        if (h && h[0]) {
            g = h[0].src;
            if (g.indexOf("grey") != -1) {
                return
            } else {
                j.previous()
            }
        }
    };
    a.prototype.next_btn = function() {
        var j = this,
            g, h = c.one(j.toolbar.self).one(".Class_D_DWT_Editor_Buttons_next");
        if (h && h[0]) {
            g = h[0].src;
            if (g.indexOf("grey") != -1) {
                return
            } else {
                j.next()
            }
        }
    };
    a.prototype.previous = function() {
        var g = this;
        g.go(g.cIndex - 1)
    };
    a.prototype.next = function() {
        var g = this;
        g.go(g.cIndex + 1)
    };
    a.prototype.go = function(g) {
        var h = this;
        if (h._IfImageChanged) {
            h.ShowDialogForSaveImage(g, false);
            return
        }
        h.__goInner(g)
    };
    a.prototype.__goInner = function(k) {
        var l = this;
        if (typeof(k) !== "undefined") {
            if (k < 0 || k >= l.totalImagesCount) {
                return
            }
            l.cIndex = k;
            l._UIView.ShowImage(k, l.aryModelImageControl[l.cIndex]);
            l._UIManager.getView().SetCurrentIndexOnly(k)
        }
        var h = c.one(l.toolbar.self).one(".Class_D_DWT_Editor_Buttons_previous"),
            g = c.one(l.toolbar.self).one(".Class_D_DWT_Editor_Buttons_next");
        if (k == 0) {
            if (h && h[0]) {
                var j = h[0].src;
                j = j.replace("previous.", "previous_grey.");
                h[0].src = j;
                h[0].style.cursor = "auto";
                if (l.totalImagesCount > 1) {
                    j = g[0].src;
                    j = j.replace("next_grey.", "next.");
                    g[0].src = j;
                    g[0].style.cursor = "pointer"
                }
            }
        } else {
            if (k == l.totalImagesCount - 1) {
                if (g && g[0]) {
                    var j = g[0].src;
                    j = j.replace("next.", "next_grey.");
                    g[0].src = j;
                    g[0].style.cursor = "auto";
                    if (l.totalImagesCount > 1) {
                        j = h[0].src;
                        j = j.replace("previous_grey.", "previous.");
                        h[0].src = j;
                        h[0].style.cursor = "pointer"
                    }
                }
            } else {
                if (l.totalImagesCount > 1) {
                    if (h && h[0]) {
                        var j = h[0].src;
                        j = j.replace("previous_grey.", "previous.");
                        h[0].src = j;
                        h[0].style.cursor = "pointer"
                    }
                    if (g && g[0]) {
                        var j = g[0].src;
                        j = j.replace("next_grey.", "next.");
                        g[0].src = j;
                        g[0].style.cursor = "pointer"
                    }
                }
            }
        }
        l._stwain._OnBitmapChanged(["0", l.cIndex.toString(), 4, l.cIndex, l._UIView.sHowManyImages]);
        if (l._IfImageChanged) {
            return
        }
    };
    a.prototype.Rotate = function(g, h) {
        var j = this;
        if (typeof g === "undefined" || typeof h === "undefined") {
            alert("Not enough paramters")
        } else {
            j._IfImageChanged = true;
            j._stwain.Rotate(j.cIndex, g, h)
        }
    };
    a.prototype.RotateEx = function(g, j, h) {
        var k = this;
        if (typeof g === "undefined" || typeof j === "undefined" || typeof h === "undefined") {
            alert("Not enough paramters")
        } else {
            k._IfImageChanged = true;
            k._stwain.RotateEx(k.cIndex, g, j, h)
        }
    };
    a.prototype.RotateLeft = function() {
        var g = this;
        g._IfImageChanged = true;
        g._stwain.RotateLeft(g.cIndex)
    };
    a.prototype.RotateAnyAngle = function(m) {
        var j = this;
        Dynamsoft.Lib.hide("J_ImgSizeEditor");
        if (!Dynamsoft.Lib.get("J_RotateAnyAngle")) {
            var p = ['<div id="J_RotateAnyAngle" class="ds-dwt-imgSizeEditor" style="display:none; z-index: 99999;">', "<ul>", '<li><label for="J_Angle"><b>Angle :</b>', '<input type="text" id="J_Angle" style="width:50%;" size="10"/></label></li>', '<li><label for="J_Angle_InterpolationMethod"><b>Interpolation:</b>&nbsp;', '<select size="1" id="J_Angle_InterpolationMethod"><option value = ""></option></select></li>', '<li><label for="J_KeepSize"><b></b>', '<input type="checkbox" id="J_KeepSize"/>Keep size</label></li>', "</ul>", "<div>", '<input id="J_btnRotateAnyAngleOK" type="button" value="  OK  "/>', '<span><input id= "J_btnCancelRotateAnyAngle" type="button" value="Cancel" /></span>', "</div>", "</div>"];
            c.one("body").append(p.join(""))
        }
        var q = Dynamsoft.Lib.get("J_Angle_InterpolationMethod");
        q.options.length = 0;
        q.options.add(new Option("NearestNeighbor", 1));
        q.options.add(new Option("Bilinear", 2));
        q.options.add(new Option("Bicubic", 3));
        var k = Dynamsoft.Lib.get("J_btnRotateAnyAngleOK");
        k.onclick = function() {
            var u = Dynamsoft.Lib.get("J_Angle").value;
            Dynamsoft.Lib.get("J_Angle").className = "";
            re = /^\d+$/;
            if (!re.test(u) || u <= 0) {
                Dynamsoft.Lib.get("J_Angle").className += " invalid";
                Dynamsoft.Lib.get("J_Angle").focus();
                alert("Error: The angle you entered is invalid.");
                return
            }
            var t = Dynamsoft.Lib.get("J_KeepSize");
            var s = t.checked;
            var r = j.RotateEx(u, s, Dynamsoft.Lib.get("J_Angle_InterpolationMethod").selectedIndex + 1);
            if (j._stwain.ErrorCode == 0) {
                Dynamsoft.Lib.hide("J_RotateAnyAngle");
                return
            }
        };
        var h = Dynamsoft.Lib.get("J_btnCancelRotateAnyAngle");
        h.onclick = function() {
            Dynamsoft.Lib.hide("J_RotateAnyAngle")
        };
        var g = Dynamsoft.Lib.get("J_RotateAnyAngle");
        Dynamsoft.Lib.toggle("J_RotateAnyAngle");
        var l = m.y;
        if (!l) {
            l = m.offsetTop + 1
        }
        var n = m.x;
        if (!n) {
            n = m.offsetLeft + 1
        }
        g.style.top = l + m.offsetHeight + document.documentElement.scrollTop + "px";
        g.style.left = n + document.documentElement.scrollLeft + "px";
        Dynamsoft.Lib.get("J_Angle").value = "45"
    };
    a.prototype.RotateRight = function() {
        var g = this;
        g._IfImageChanged = true;
        g._stwain.RotateRight(g.cIndex)
    };
    a.prototype.Deskew = function() {
        var g = this;
        g.RotateEx(g._stwain.GetSkewAngle(g.cIndex), true, 1)
    };
    a.prototype.Flip = function() {
        var g = this;
        g._IfImageChanged = true;
        g._stwain.Flip(g.cIndex)
    };
    a.prototype.Mirror = function() {
        var g = this;
        g._IfImageChanged = true;
        g._stwain.Mirror(g.cIndex)
    };
    a.prototype.ChangeImageSize = function(h, g, j) {
        var k = this;
        k._IfImageChanged = true;
        k._stwain.ChangeImageSize(k.cIndex, h, g, j)
    };
    a.prototype.ChangeImageSizeGetinput = function(m) {
        var j = this;
        Dynamsoft.Lib.hide("J_RotateAnyAngle");
        if (!Dynamsoft.Lib.get("J_ImgSizeEditor")) {
            var p = ['<div id="J_ImgSizeEditor" class="ds-dwt-imgSizeEditor" style="display:none;z-index: 99999;">', "<ul>", '<li><label for="J_img_height"><b>New Height :</b>', '<input type="text" id="J_img_height" style="width:50%;" size="10"/>pixel</label></li>', '<li><label for="J_img_width"><b>New Width :</b>&nbsp;', '<input type="text" id="J_img_width" style="width:50%;" size="10"/>pixel</label></li>', "<li>Interpolation method:", '<select size="1" id="J_InterpolationMethod"><option value = ""></option></select></li>', "</ul>", "<div>", '<input id="J_btnChangeImageSizeOK" type="button" value="  OK  "/>', '<span><input id= "J_btnCancelChange" type="button" value="Cancel" /></span>', "</div>", "</div>"];
            c.one("body").append(p.join(""))
        }
        var q = Dynamsoft.Lib.get("J_InterpolationMethod");
        q.options.length = 0;
        q.options.add(new Option("NearestNeighbor", 1));
        q.options.add(new Option("Bilinear", 2));
        q.options.add(new Option("Bicubic", 3));
        var g = Dynamsoft.Lib.get("J_btnChangeImageSizeOK");
        g.onclick = function() {
            var t = Dynamsoft.Lib.get("J_img_width").value,
                r = Dynamsoft.Lib.get("J_img_height").value;
            Dynamsoft.Lib.get("J_img_width").className = "";
            Dynamsoft.Lib.get("J_img_height").className = "";
            re = /^\d+$/;
            if (!re.test(r) || r <= 0) {
                Dynamsoft.Lib.get("J_img_height").className += " invalid";
                Dynamsoft.Lib.get("J_img_height").focus();
                alert("Error: The height you entered is invalid.");
                return
            }
            if (!re.test(t) || t <= 0) {
                Dynamsoft.Lib.get("J_img_width").className += " invalid";
                Dynamsoft.Lib.get("J_img_width").focus();
                alert("Error: The width you entered is invalid.");
                return
            }
            var s = j.ChangeImageSize(t, r, Dynamsoft.Lib.get("J_InterpolationMethod").selectedIndex + 1);
            if (j._stwain.ErrorCode == 0) {
                Dynamsoft.Lib.hide("J_ImgSizeEditor");
                return
            }
        };
        var k = Dynamsoft.Lib.get("J_btnCancelChange");
        k.onclick = function() {
            Dynamsoft.Lib.hide("J_ImgSizeEditor")
        };
        var h = Dynamsoft.Lib.get("J_ImgSizeEditor");
        Dynamsoft.Lib.toggle("J_ImgSizeEditor");
        var l = m.y;
        if (!l) {
            l = m.offsetTop + 1
        }
        var n = m.x;
        if (!n) {
            n = m.offsetLeft + 1
        }
        h.style.top = l + m.offsetHeight + document.documentElement.scrollTop + "px";
        h.style.left = n + document.documentElement.scrollLeft + "px";
        if (j.aryModelImageControl[j.cIndex].imageToShow) {
            Dynamsoft.Lib.get("J_img_width").value = j.aryModelImageControl[j.cIndex].imageToShow.width;
            Dynamsoft.Lib.get("J_img_height").value = j.aryModelImageControl[j.cIndex].imageToShow.height
        } else {
            Dynamsoft.Lib.get("J_img_width").value = 0;
            Dynamsoft.Lib.get("J_img_height").value = 0
        }
        return false
    };
    a.prototype.Crop_btn = function() {
        var j = this,
            g, h = c.one(j.toolbar.self).one(".Class_D_DWT_Editor_Buttons_crop");
        if (h && h[0]) {
            g = h[0].src;
            if (g.indexOf("grey") != -1) {
                return
            } else {
                j.Crop()
            }
        }
    };
    a.prototype.Crop = function() {
        var l = this;
        var k = l.Left;
        var j = l.Top;
        var h = l.Right;
        var g = l.Bottom;
        if (parseInt(k) - parseInt(h) != 0 && parseInt(j) - parseInt(g) != 0) {
            l._IfImageChanged = true;
            l._stwain.Crop(l.cIndex, parseInt(k), parseInt(j), parseInt(h), parseInt(g));
            l.__SetCropButtonGrey(true)
        } else {
            e.output(l, "No area selected for cropping");
            return
        }
    };
    a.prototype.StrechMode = function() {
        var g = this;
        g._UIView.SetIfFitWindowAndType(4);
        g.__SetZoomInButtonEnable(true);
        g.__SetZoomOutButtonEnable(true);
        g.__SetCropButtonGrey(true);
        return
    };
    a.prototype.FitsWindowSize = function() {
        var g = this;
        g._UIView.SetIfFitWindowAndType(0);
        g.__SetZoomInButtonEnable(true);
        g.__SetZoomOutButtonEnable(true);
        g.__SetCropButtonGrey(true);
        return
    };
    a.prototype.FitsWindowWidth = function(g) {
        var h = this;
        h._UIView.SetIfFitWindowAndType(2);
        h.__SetZoomInButtonEnable(true);
        h.__SetZoomOutButtonEnable(true);
        h.__SetCropButtonGrey(true);
        return
    };
    a.prototype.FitsWindowHeight = function(g) {
        var h = this;
        h._UIView.SetIfFitWindowAndType(1);
        h.__SetZoomInButtonEnable(true);
        h.__SetZoomOutButtonEnable(true);
        h.__SetCropButtonGrey(true);
        return
    };
    a.prototype.ZoomIn = function() {
        var g = this;
        if (g._UIView.ZoomIn()) {
            g.__SetZoomInButtonEnable(true);
            g.__SetZoomOutButtonEnable(true)
        } else {
            g.__SetZoomInButtonEnable(false);
            g.__SetZoomOutButtonEnable(true)
        }
        g.__SetCropButtonGrey(true)
    };
    a.prototype.ZoomOut = function() {
        var g = this;
        if (g._UIView.ZoomOut()) {
            g.__SetZoomOutButtonEnable(true);
            g.__SetZoomInButtonEnable(true)
        } else {
            g.__SetZoomOutButtonEnable(false);
            g.__SetZoomInButtonEnable(true)
        }
        g.__SetCropButtonGrey(true)
    };
    a.prototype.OriginalSize = function() {
        var g = this;
        g._UIView.SetZoom(1);
        g.__SetZoomInButtonEnable(true);
        g.__SetZoomOutButtonEnable(true);
        g.__SetCropButtonGrey(true);
        return
    };
    a.prototype.Hand_btn = function() {
        var h = this,
            g = EnumDWT_MouseShape.Hand;
        h._UIView.SetMouseShapeByIndex(h.cIndex, g);
        h.__EnableMouseShapButtons(g)
    };
    a.prototype.RectSelect_btn = function() {
        var h = this,
            g = EnumDWT_MouseShape.Crosshair;
        h._UIView.SetMouseShapeByIndex(h.cIndex, g);
        h.__EnableMouseShapButtons(g)
    };
    a.prototype.Zoom_btn = function() {
        var h = this,
            g = EnumDWT_MouseShape.Zoom;
        h._UIView.SetMouseShapeByIndex(h.cIndex, g);
        h.__EnableMouseShapButtons(g)
    };
    a.prototype.__EnableMouseShapButtons = function(p) {
        var j = this,
            n = c.one(j.toolbar.self),
            q, m, k;
        if (n) {
            var g = n.one(".Class_D_DWT_Editor_Buttons_hand"),
                h = n.one(".Class_D_DWT_Editor_Buttons_rectselect"),
                l = n.one(".Class_D_DWT_Editor_Buttons_zoom");
            e.removeClass(g.parent(), "ds-dwt-EditorButton-selected");
            e.removeClass(h.parent(), "ds-dwt-EditorButton-selected");
            e.removeClass(l.parent(), "ds-dwt-EditorButton-selected");
            if (p == EnumDWT_MouseShape.Hand) {
                e.addClass(g.parent(), "ds-dwt-EditorButton-selected")
            } else {
                if (p == EnumDWT_MouseShape.Crosshair) {
                    e.addClass(h.parent(), "ds-dwt-EditorButton-selected")
                } else {
                    if (p == EnumDWT_MouseShape.Zoom) {
                        e.addClass(l.parent(), "ds-dwt-EditorButton-selected")
                    }
                }
            }
        }
    };
    a.prototype.print = function() {
        var g = this;
        g._UIView.PrintCurrent()
    };
    a.prototype.RestoreImage = function() {
        var g = this;
        g.__RestoreImageInner(true, -1)
    };
    a.prototype.__RestoreImageInner = function(k, h, n) {
        var p = this,
            l;
        if (p.cIndex == -1) {
            if (n) {
                n()
            }
            return
        }
        var j = function(s, v, t) {
            if (k == true) {
                c.log("__RestoreImageInner: " + [v.imageIndex].join(","));
                v.bOriginalImage = true;
                if (s.GetBindIndex() == t) {
                    p._UIView.AttachImagesForControl(s, v)
                }
            }
            p._IfImageChanged = false;
            var q = p.aryModelImageControl[t];
            if (q != null) {
                q.imageToShow = v.imageToShow;
                q.imageWidth = v.imageWidth;
                q.imageHeight = v.imageHeight;
                q.imageUrl = v.imageUrl
            }
            p._UIManager.getView().SetDataImageControl(t);
            var r = c.one(p.toolbar.self).one(".Class_D_DWT_Editor_Buttons_save"),
                u = c.one(p.toolbar.self).one(".Class_D_DWT_Editor_Buttons_restore");
            if (r && r[0]) {
                r[0].style.display = "none";
                u[0].style.display = "none"
            }
            if (n) {
                n()
            }
            if (h == -1) {
                p._stwain._OnBitmapChanged(["0", p.cIndex.toString(), 4, p.cIndex, p._UIView.sHowManyImages])
            }
        };
        var m = true;
        if (p._IfImageChanged == true) {
            var g = p._UIView.GetImageControl(p.cIndex);
            if (null != g) {
                g.SetCurrentIndex(p.cIndex);
                p.OnGetImageFromServerForEdit(g, p.aryModelImageControl[p.cIndex], p.cIndex, 1, j);
                m = false
            }
        }
        if (m) {
            if (n) {
                n()
            }
        }
    };
    a.prototype.OnGetImageFromServerForEdit = function(g, m, k, l, n) {
        var p = this,
            j, h;
        if (n && p.BaseUrl) {
            g.ClearImage();
            g.SetBindIndex(k);
            j = Funs2.getUrlByAct(p.BaseUrl, k, l);
            h = new Image();
            h.src = j;
            h.onload = function() {
                g.tmpImage = false;
                m.imageToShow = h;
                m.imageWidth = h.width;
                m.imageHeight = h.height;
                m.imageUrl = j;
                m.bIsDirty = false;
                n(g, m, k);
                h.onerror = undefined;
                h.onload = undefined
            };
            h.onerror = function(s) {
                var t = g.GetBindIndex(),
                    r = p._stwain,
                    q = r.HowManyImagesInBuffer;
                if (t >= 0 && t < q) {
                    j = Funs2.getImageUrl(p.BaseUrl, g.GetBindIndex(), l);
                    h.src = j
                } else {
                    h.src = "data:,";
                    h.onload = undefined;
                    h.onerror = undefined;
                    h = null;
                    g.tmpImage = false
                }
            };
            if (g.tmpImage) {
                g.tmpImage.src = "data:,";
                g.tmpImage.onload = undefined
            }
            g.tmpImage = h
        }
        return true
    };
    a.prototype.ChangeSize = function(g, j) {
        var k = this;
        if (g >= 0) {
            k.containerWidth = g
        }
        if (j >= 0) {
            k.containerHeight = j
        }
        k.width = k.containerWidth - 2;
        if (k.width < 0) {
            k.width = 0
        }
        k.height = k.containerHeight - 2;
        if (k.height < 0) {
            k.height = 0
        }
        k.UIEditor.css({
            width: k.width + "px",
            height: k.height + "px"
        })
    };
    a.prototype.SaveImage = function() {
        var g = this;
        g.__SaveImageInner(true, function() {
            g._stwain._OnBitmapChanged(["0", g.cIndex.toString(), 4, g.cIndex, g._UIView.sHowManyImages])
        })
    };
    a.prototype.__SaveImageInner = function(j, m) {
        var n = this,
            k;
        if (n.cIndex == -1) {
            if (m) {
                m()
            }
            return
        }
        if (!n._IfImageChanged) {
            alert("You have not changed the current image");
            if (m) {
                m()
            }
            return
        }
        var h = function(r, u, s) {
            if (j == true) {
                c.log("__SaveImageInner: " + [u.imageIndex].join(","));
                u.bOriginalImage = true;
                if (r.GetBindIndex() == s) {
                    n._UIView.AttachImagesForControl(r, u)
                }
            }
            n._IfImageChanged = false;
            var p = n.aryModelImageControl[s];
            if (p != null) {
                p.imageToShow = u.imageToShow;
                p.imageWidth = u.imageWidth;
                p.imageHeight = u.imageHeight;
                p.imageUrl = u.imageUrl
            }
            n._UIManager.getView().SetDataImageControl(s);
            var q = c.one(n.toolbar.self).one(".Class_D_DWT_Editor_Buttons_save"),
                t = c.one(n.toolbar.self).one(".Class_D_DWT_Editor_Buttons_restore");
            if (q && q[0]) {
                q[0].style.display = "none";
                t[0].style.display = "none"
            }
            if (m) {
                m()
            }
        };
        var l = true;
        if (n._IfImageChanged == true) {
            var g = n._UIView.GetImageControl(n.cIndex);
            if (null != g) {
                g.SetCurrentIndex(n.cIndex);
                n.OnGetImageFromServerForEdit(g, n.aryModelImageControl[n.cIndex], n.cIndex, 2, h);
                l = false
            }
        }
        if (l) {
            if (m) {
                m()
            }
        }
    };
    a.prototype.ShowDialogForSaveImage = function(h, l) {
        var m = this;
        var j = ['<div id="J_waiting">', '<P style="white-space:nowrap;">', "You have changed the image, do you want to keep the change(s)?", "</P>", '<div style="width: 200px;white-space:nowrap;margin-left: auto;margin-right: auto;">', '<input id="J_btnSave" style="width: 100px; height:30px; margin-right: 10px; margin-top: 10px;"  type="button" value="  OK  "/>', '<input id= "J_btnCancel" style="width: 100px; height:30px;"  type="button" value="  NO  " />', "</div>", "</div>"];
        Dynamsoft.WebTwainEnv.ShowDialog(422, 107, j.join(""), true);
        var g = Dynamsoft.Lib.get("J_btnSave");
        g.onclick = function() {
            m.__SaveImageInner(false, function() {
                var n = m._stwain._strDWTControlContainerID;
                DCP_DWT_OnClickCloseInstall(n);
                Dynamsoft.Lib.bChangeImage = 1;
                if (h == -1) {
                    m.__HideImageEditorInner()
                } else {
                    m.__goInner(h)
                }
                if (l) {
                    document.body.style.overflow = ""
                }
            })
        };
        var k = Dynamsoft.Lib.get("J_btnCancel");
        k.onclick = function() {
            m.__RestoreImageInner(false, h, function() {
                var n = m._stwain._strDWTControlContainerID;
                DCP_DWT_OnClickCloseInstall(n);
                Dynamsoft.Lib.bChangeImage = 0;
                if (h == -1) {
                    m.__HideImageEditorInner()
                } else {
                    m.__goInner(h)
                }
                if (l) {
                    document.body.style.overflow = ""
                }
            })
        }
    };
    a.prototype.__SetCropButtonGrey = function(j) {
        var l = this;
        l.Left = 0;
        l.Top = 0;
        l.Right = 0;
        l.Bottom = 0;
        var k = c.one(l.toolbar.self).one(".Class_D_DWT_Editor_Buttons_crop");
        if (k && k[0]) {
            var h = k[0].src;
            h = h.replace("crop.", "crop_grey.");
            k[0].src = h;
            k.style("cursor", "auto")
        }
        if (j) {
            var g = l._UIView.GetImageControl(l.cIndex);
            if (null != g) {
                g.SetSelectedImageArea(0, 0, 0, 0)
            }
        }
    };
    a.prototype.__SetZoomInButtonEnable = function(g) {
        var k = this;
        var j = c.one(k.toolbar.self).one(".Class_D_DWT_Editor_Buttons_zoomin");
        if (j && j[0]) {
            var h = j[0].src;
            if (g == true) {
                h = h.replace("zoomin_grey.", "zoomin.");
                j[0].src = h;
                j.style("cursor", "pointer")
            } else {
                h = h.replace("zoomin.", "zoomin_grey.");
                j[0].src = h;
                j.style("cursor", "auto")
            }
        }
    };
    a.prototype.__SetZoomOutButtonEnable = function(g) {
        var k = this;
        var j = c.one(k.toolbar.self).one(".Class_D_DWT_Editor_Buttons_zoomout");
        if (j && j[0]) {
            var h = j[0].src;
            if (g == true) {
                h = h.replace("zoomout_grey.", "zoomout.");
                j[0].src = h;
                j.style("cursor", "pointer")
            } else {
                h = h.replace("zoomout.", "zoomout_grey.");
                j[0].src = h;
                j.style("cursor", "auto")
            }
        }
    };
    a.prototype.refresh = function(j) {
        var k = this;
        k.cIndex = j;
        k._UIView.SetDataImageControl(j);
        if (k._IfImageChanged) {
            var g = c.one(k.toolbar.self).one(".Class_D_DWT_Editor_Buttons_save"),
                h = c.one(k.toolbar.self).one(".Class_D_DWT_Editor_Buttons_restore");
            if (g && g[0]) {
                g[0].style.display = "";
                h[0].style.display = ""
            }
        }
        k.__SetCropButtonGrey(true)
    };
    Dynamsoft.Lib.UI = Dynamsoft.Lib.UI || {};
    Dynamsoft.Lib.UI.ImageUIEditor = a
})(Dynamsoft.Lib);
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    var c = a.DOM,
        b = Dynamsoft.WebTwainEnv,
        d = {
            getServerImageUrlPrefix: function(j) {
                var g = j.httpUrl,
                    f = false,
                    h = [g, "dwt/dwt_", b.Trial ? "trial_" : "", a.replaceAll(b.ServerVersionInfo, ",", ""), "/img?id=", j.clientId];
                return h.join("")
            },
            output: function(f) {
                if (Dynamsoft.WebTwainEnv.Debug) {
                    a.log(f)
                }
            }
        };

    function e(f, g) {
        var h = this;
        h._stwain = f;
        h.__SelectionImageBorderColor = 8233678;
        h.__BackgroundColor = 16777215;
        h.__BackgroundFillColor = 16777215;
        h.__Ratio = 0;
        g.OnTopImageInTheViewChanged = function(j) {
            if (Dynamsoft.Lib.isFunction(f.__OnTopImageInTheViewChanged)) {
                f.__OnTopImageInTheViewChanged(j)
            }
        };
        g.OnGetImageInfo = function(l) {
            var j = -1,
                k = -1;
            j = h.GetImageWidth(l);
            return {
                width: j,
                height: k
            }
        };
        h._UIView = new Dynamsoft.Lib.UI.ImageUIView(g);
        h._UIEditor = false
    }
    e.prototype.getTwain = function() {
        var f = this;
        return f._stwain
    };
    e.prototype.getView = function() {
        var f = this;
        return f._UIView
    };
    e.prototype.OnReady = function() {
        var g = this,
            f = g.getView();
        f.BaseUrl = d.getServerImageUrlPrefix(g._stwain);
        return true
    };
    e.prototype.count = function() {
        return this.getView().HowManyImagesInBuffer()
    };
    e.prototype.clear = function() {
        return this.getView().RemoveAllImages()
    };
    e.prototype.ChangeSize = function(f, g) {
        return this.getView().ChangeImageViewSize(f, g)
    };
    e.prototype.GetCurrentImageIndex = function() {
        return this.getView().GetCurrentImageIndex()
    };
    e.prototype.GetSelectedImageIndex = function(g) {
        var f = this.GetSelectedIndexes();
        if (g >= 0 && g < f.length) {
            return f[g]
        }
        return -1
    };
    e.prototype.GetSelectedIndexes = function() {
        return this.getView().GetSelectedIndexes()
    };
    e.prototype.add = function(g, h, f) {
        return this.getView().AddImage(g, h, f)
    };
    e.prototype.remove = function(g, f) {
        return this.getView().RemoveImage(g, f)
    };
    e.prototype.MoveImage = function(g, f) {
        return this.getView().MoveImage(g, f)
    };
    e.prototype.SwitchImage = function(g, f) {
        return this.getView().SwitchImage(g, f)
    };
    e.prototype.SetViewMode = function(g, f) {
        return this.getView().SetViewMode(g, f)
    };
    e.prototype.GetImageWidth = function(j) {
        var n = this,
            k = j * 1,
            g, m, l, h, f;
        m = n.getView();
        l = m.GetDataImageControlList();
        g = l.length;
        if (k < 0 || k > g) {
            return 0
        }
        h = l[k];
        if (h && h.rawWidth) {
            f = h.rawWidth
        } else {
            f = n._stwain.GetImageWidth(k)
        }
        return f
    };
    e.prototype.get = function(g) {
        var l = this,
            h = parseInt(g),
            f, k, j;
        k = l.getView();
        j = k.GetDataImageControlList();
        f = j.length;
        if (h < 0 || h > f) {
            return false
        }
        return j[h]
    };
    e.prototype.refresh = function(g, h, f, n) {
        var k = this;
        if (f) {
            var l = g * 1,
                m, j, p, q;
            j = k.getView();
            p = j.GetDataImageControlList();
            m = p.length;
            if (l < 0 || l > m) {
                return false
            }
            if (k._UIEditor && k._UIEditor._UIView) {
                k._UIEditor.refresh(l)
            }
            j.SetDataImageControl(l, n)
        }
        return true
    };
    e.prototype.ShowImageEditorEx = function(n, m, h, g, k) {
        var l = this,
            s = l.getView();
        var j, r, q = document,
            f, p;
        f = q.createElement("div");
        q.body.appendChild(f);
        p = {
            Container: a.one(f),
            aryModelImageControl: s.GetDataImageControlList(),
            BaseUrl: s.BaseUrl,
            cIndex: s.cCurrentIndex,
            stwain: l.getTwain()
        };
        r = new Dynamsoft.Lib.UI.ImageUIEditor(l, p);
        l._UIEditor = r;
        r.bShow = false;
        r.bShow = true;
        return r.ShowImageEditorEx(n, m, h, g, 0)
    };
    e.prototype.refreshEditor = function(f, g) {
        var h = this;
        if (h._UIEditor) {
            h._UIEditor.refresh(f)
        }
        return true
    };
    e.prototype.GetSelectionImageBorderColor = function() {
        return this.__SelectionImageBorderColor
    };
    e.prototype.SetSelectionImageBorderColor = function(g) {
        var j = this,
            h = g,
            f = j.getView();
        j.__SelectionImageBorderColor = h;
        if (Dynamsoft.Lib.isNumber(h)) {
            h = Dynamsoft.Lib.getColor(h)
        }
        return f.SetSelectionImageBorderColor(h)
    };
    e.prototype.GetBackgroundColor = function() {
        return this.__BackgroundColor
    };
    e.prototype.SetBackgroundColor = function(h) {
        var l = this,
            j = h,
            f, k, g = l.getView();
        l.__BackgroundColor = j;
        if (Dynamsoft.Lib.isNumber(j)) {
            j = Dynamsoft.Lib.getColor(j)
        }
        f = a.one("#" + l._stwain._strDWTControlContainerID);
        if (f) {
            k = f.one(".ds-dwt-container-box");
            if (k) {
                k.style("background-color", j)
            }
        }
        return g.SetBackgroundColor(j)
    };
    e.prototype.SetSelectionRectAspectRatio = function(h) {
        var l = this,
            j = h,
            f, k, g = l.getView();
        l.__Ratio = j;
        return g.SetSelectionRectAspectRatio(j)
    };
    e.prototype.GetSelectionRectAspectRatio = function() {
        return this.__Ratio
    };
    Dynamsoft.Lib.UI = Dynamsoft.Lib.UI || {};
    Dynamsoft.Lib.UI.ImageUIManager = e
})(Dynamsoft.Lib);
(function(a) {
    if (!a.product.bChromeEdition) {
        return
    }
    var b = Dynamsoft.WebTwainEnv;
    a.env.WSVersion = "12.0.0";
    a.env.WSSession = new Date().getTime();
    a.getHttpUrl = function(c) {
        if (c.ssl) {
            return ["https://", c.ip, ":", c.port, "/"].join("")
        } else {
            return ["http://", c.ip, ":", c.port, "/"].join("")
        }
    };
    a.getWSUrl = function(e, d, c) {
        if (c) {
            return ["wss://", e, ":", d].join("")
        } else {
            return ["ws://", e, ":", d].join("")
        }
    };
    a.getWS = function(h, d, c) {
        var j = this,
            f, g = a.getWSUrl(h, d, c),
            e = a.product.wsProtocol;
        if (j.detect.OnCreatWS) {
            j.detect.OnCreatWS(g, e)
        }
        if (typeof MozWebSocket != "undefined") {
            if (e) {
                f = new MozWebSocket(g, e)
            } else {
                f = new MozWebSocket(g)
            }
        } else {
            if (e) {
                f = new WebSocket(g, e)
            } else {
                f = new WebSocket(g)
            }
        }
        return f
    };
    a._init = function(l) {
        var k = Dynamsoft.Lib,
            f = false,
            g = k.LS.item("DWT_port"),
            d = k.LS.item("DWT_ssl"),
            c = null;
        k.detect.urls.splice(0);
        k.detect.cUrlIndex = 0;
        if (l && a.isLocalIP(l.ip)) {
            f = l.ip
        }
        if (f && g && d) {
            c = {
                port: g,
                ssl: (d == "true")
            }
        }
        var h = function(m) {
            if (!c) {
                return true
            }
            if (m) {
                if (m.port != c.port || m.ssl != c.ssl) {
                    return true
                }
            }
            return false
        };
        var e;
        if (k.detect.detectType === 1) {
            if (c !== null && c.ssl) {
                k.detect.urls.push(c)
            }
            for (var j in k.detect.ports) {
                e = k.detect.ports[j];
                if (e.ssl) {
                    if (h(e)) {
                        k.detect.urls.push(e)
                    }
                }
            }
        } else {
            if (k.detect.detectType === 0) {
                if (c !== null && !c.ssl) {
                    k.detect.urls.push(c)
                }
                for (var j in k.detect.ports) {
                    e = k.detect.ports[j];
                    if (e.ssl === false) {
                        if (h(e)) {
                            k.detect.urls.push(e)
                        }
                    }
                }
            } else {
                if (c !== undefined && c !== null) {
                    k.detect.urls.push(c)
                }
                for (var j in k.detect.ports) {
                    e = k.detect.ports[j];
                    if (h(e)) {
                        k.detect.urls.push(e)
                    }
                }
            }
        }
        e = null
    };
    a._reconnect = function() {
        var j = Dynamsoft.Lib,
            h, e, d, g;
        if (j.detect.aryReconnectSTwains.length > 0) {
            g = j.detect.aryReconnectSTwains[0]
        }
        if (!g || g.__bConnecting) {
            return
        }
        g.__bConnecting = true;
        h = g._ip;
        d = g._ssl;
        if (d) {
            e = g._portSSL
        } else {
            e = g._port
        }
        try {
            var c = j.getWS(h, e, bSSl);
            c.onopen = function() {
                if (c.readyState == 1) {
                    g._objWS = c;
                    if (!g.bReady) {
                        g._OnReady(true)
                    }
                    g.__bConnecting = false;
                    a.detect.hideMask();
                    j.detect.bOK = true
                } else {
                    if (c.readyState == 0) {
                        setTimeout(c.onopen, 100)
                    } else {
                        g.__bConnecting = false
                    }
                }
            };
            c.onclose = function() {
                c.onopen = null;
                g.__bConnecting = false;
                if (!g.bReady) {
                    g.__wsRetry++;
                    if (g.__wsRetry < 5) {
                        setTimeout(a._reconnect, 1000)
                    } else {
                        a.closeProgress("Reconnect");
                        a.Errors.Server_Restarted(g)
                    }
                } else {
                    a.closeProgress("Reconnect");
                    a.detect.hideMask()
                }
            }
        } catch (f) {
            a.log(f);
            g.__bConnecting = false;
            if (!g.bReady) {
                g.__wsRetry++;
                if (g.__wsRetry < 5) {
                    setTimeout(a._reconnect, 1000)
                }
            } else {
                a.detect.hideMask()
            }
        }
    };
    a.startWS = function() {
        var g = a.detect,
            j;
        if (!a.product.bChromeEdition) {
            a.appendMessage("This browser is currently not supported. Please try Chrome or Firefox!");
            return
        }
        if (!g.bNoControlEvent) {
            g.showMask()
        }
        if (g.OnDetectNext) {
            g.OnDetectNext()
        }
        if (g.tryTimes == 0 && g.cUrlIndex > 0 && g.arySTwains.length > 0) {
            if (!g.bNoControlEvent) {
                g.hideMask();
                if (a.isFunction(g.onNoControl)) {
                    var h, c, f;
                    h = g.arySTwains[0];
                    c = h._width;
                    f = h._height;
                    if (c <= 0) {
                        c = 270
                    }
                    if (f <= 0) {
                        f = 350
                    }
                    g.onNoControl(h._strDWTControlContainerID, c, f, h)
                }
                g.bNoControlEvent = true
            }
        }
        if (g.cUrlIndex >= g.urls.length) {
            g.cUrlIndex = 0;
            g.tryTimes++
        }
        if (g.arySTwains.length > 0) {
            j = g.arySTwains[0]
        } else {
            g.hideMask();
            g.bOK = true;
            return
        }
        if (j.bReady) {
            g.arySTwains.splice(0, 1);
            if (g.arySTwains.length <= 0) {
                g.hideMask();
                g.bOK = true
            } else {
                setTimeout(a.startWS, 100)
            }
            return
        }
        if (j.__bConnecting) {
            return
        }
        j.__bConnecting = true;
        try {
            var k = g.urls[g.cUrlIndex],
                d = a.getWS(a.product.ip, k.port, k.ssl);
            a.log(["connecting ... [port:", k.port, "]"].join(""));
            d.onopen = function() {
                j.__bConnecting = false;
                if (d.readyState == 1) {
                    j._objWS = d;
                    if (!j.bReady) {
                        j._port = k.port;
                        j._portSSL = k.port;
                        j._ssl = k.ssl;
                        j._OnReady()
                    }
                    g.arySTwains.splice(0, 1);
                    if (g.arySTwains.length <= 0) {
                        g.hideMask();
                        g.bOK = true
                    } else {
                        setTimeout(a.startWS, 100)
                    }
                } else {
                    if (d.readyState == 0) {
                        setTimeout(d.onopen, 100)
                    } else {}
                }
            };
            d.onclose = function() {
                d.onopen = null;
                j.__bConnecting = false;
                if (!j.bReady) {
                    g.cUrlIndex++;
                    setTimeout(a.startWS, 100)
                } else {
                    g.hideMask()
                }
            }
        } catch (e) {
            a.log(e);
            j.__bConnecting = false;
            if (!j.bReady) {
                g.cUrlIndex++;
                setTimeout(a.startWS, 100)
            } else {
                g.hideMask()
            }
        }
    };
    a.startWSByIP = function() {
        var h = a.detect,
            j;
        if (!a.product.bChromeEdition) {
            a.appendMessage("This browser is currently not supported. Please try Chrome or Firefox!");
            return
        }
        if (!h.bNoControlEvent) {
            h.showMask()
        }
        if (h.arySTwainsByIP.length > 0) {
            j = h.arySTwainsByIP[0]
        } else {
            h.hideMask();
            h.bOK = true;
            return
        }
        if (j.bReady) {
            h.arySTwainsByIP.splice(0, 1);
            if (h.arySTwainsByIP.length <= 0) {
                h.hideMask();
                h.bOK = true
            } else {
                setTimeout(a.startWSByIP, 100)
            }
            return
        }
        if (j.__bConnecting) {
            return
        }
        if (j.__wsRetry > 0) {
            if (!h.bNoControlEvent) {
                h.hideMask();
                if (a.isFunction(h.onNoControl)) {
                    var c, g;
                    c = j._width;
                    g = j._height;
                    if (c <= 0) {
                        c = 270
                    }
                    if (g <= 0) {
                        g = 350
                    }
                    h.onNoControl(j._strDWTControlContainerID, c, g, j)
                }
                h.bNoControlEvent = true
            }
        }
        j.__bConnecting = true;
        try {
            var e, d;
            e = j._ssl ? j._portSSL : j._port;
            d = a.getWS(j._ip, e, j._ssl);
            a.log(["connecting ... [port:", o.port, "]"].join(""));
            d.onopen = function() {
                j.__bConnecting = false;
                if (d.readyState == 1) {
                    j._objWS = d;
                    if (!j.bReady) {
                        j._OnReady()
                    }
                    h.arySTwainsByIP.splice(0, 1);
                    if (h.arySTwainsByIP.length <= 0) {
                        h.hideMask();
                        h.bOK = true
                    } else {
                        setTimeout(a.startWSByIP, 100)
                    }
                } else {
                    if (d.readyState == 0) {
                        setTimeout(d.onopen, 100)
                    } else {}
                }
            };
            d.onclose = function() {
                d.onopen = null;
                j.__bConnecting = false;
                if (!j.bReady) {
                    j.__wsRetry++;
                    setTimeout(a.startWSByIP, 100)
                } else {
                    h.hideMask()
                }
            }
        } catch (f) {
            a.log(f);
            j.__bConnecting = false;
            if (!j.bReady) {
                j.__wsRetry++;
                setTimeout(a.startWSByIP, 100)
            } else {
                h.hideMask()
            }
        }
    };
    a.html5.closeAll = function() {
        var h, f, k, g, e, d, c;
        a.dlgProgress = false;
        a.detect.bOK = false;
        a.detect.bFirst = true;
        for (h = a.detect.arySTwains.length - 1; h >= 0; h--) {
            k = a.detect.arySTwains[h];
            if (!k) {
                continue
            }
            g = k._strDWTControlContainerID;
            c = false;
            for (f = 0; f < Dynamsoft.WebTwainEnv.Containers.length; f++) {
                e = Dynamsoft.WebTwainEnv.Containers[f];
                if (!e) {
                    continue
                }
                d = e.ContainerId;
                if (g == d) {
                    c = true;
                    break
                }
            }
            if (c) {
                k.__unload();
                a.detect.arySTwains.splice(h, 1)
            }
        }
    };
    a.bio = false;
    a.progressMessage = "";
    a.dialogShowStatus = false;
    a.needShowTwiceShowDialog = false;
    a.dlgProgress = false;
    a.cancelFrome = 0;
    a.dlgRef = 0;
    a.showProgress = function(k, f, d) {
        var j = k;
        a.log("showProgress:" + f + ",bCancel:" + d);
        if ((a.cancelFrome == 0 && j.__IfShowProgressBar == true) || (a.cancelFrome != 0 && j.__IfShowCancelDialogWhenImageTransfer == true)) {
            var h = a.one("#btnCancel");
            if (h) {
                if (d == false) {
                    h[0].style.display = "none"
                } else {
                    h[0].style.display = ""
                }
            }
            if (a.dialogShowStatus == false) {
                if (a.dlgProgress) {
                    a.dlgProgress.showModal()
                }
                a.dialogShowStatus = true;
                var c = a.one("#finalMessage");
                var l = a.one("#progressBar"),
                    e = l && l[0];
                var g = a.one("#status");
                c && (c.innerHTML = "");
                g && (g.innerHTML = "0%");
                if (e) {
                    if (a.env.bIE) {
                        if (e.objProgressBar) {
                            e.objProgressBar.setValue(0)
                        } else {
                            e.value = 0
                        }
                    } else {
                        e.value = 0
                    }
                }
            }
            a.dlgRef++
        }
    };
    a.closeProgress = function(c) {
        a.log("closeProgress:" + c);
        var d = a.one("#btnCancel");
        if (a.needShowTwiceShowDialog == true && a.cancelFrome == 1) {
            if (d) {
                d.innerHTML = "Cancel"
            }
        } else {
            if (d) {
                d.innerHTML = "Cancel"
            }
            if (a.dialogShowStatus == true) {
                if (a.dlgProgress) {
                    a.dlgProgress.close()
                }
                a.dialogShowStatus = false
            }
            a.needShowTwiceShowDialog = false;
            a.cancelFrome = 0
        }
        a.dlgRef--;
        if (a.dlgRef <= 0) {
            a.dlgRef = 0
        }
    };
    a.html5.DynamicWebTwain = function(c) {
        var f, d, e;
        for (d = 0; d < a.detect.arySTwains.length; d++) {
            e = a.detect.arySTwains[d];
            if (e._strDWTControlContainerID == c.containerID) {
                return false
            }
        }
        f = new a.html5.STwain(c);
        a.detect.arySTwains.push(f);
        if (a.detect.bFirst) {
            a._init(c)
        }
        a.detect.bFirst = false;
        return f
    };
    a.html5.CreateDWTObject = function(k, j, h) {
        var c, g, d, e, f;
        d = a.get(k);
        if (!d) {
            return false
        }
        for (e = 0; e < a.detect.arySTwains.length; e++) {
            f = a.detect.arySTwains[e];
            if (f._strDWTControlContainerID == k) {
                return false
            }
        }
        c = {
            containerID: k,
            width: 300,
            height: 300,
            onWSReady: h
        };
        if (d.style.width) {
            c.width = d.style.width
        }
        if (d.style.height) {
            c.height = d.style.height
        }
        if (j) {
            c.customIP = true;
            c.ip = j.ip;
            c.port = j.port;
            c.portSSL = j.portSSL
        }
        g = new a.html5.STwain(c);
        if (j) {
            a.detect.arySTwainsByIP.push(g);
            return g
        }
        a.detect.arySTwains.push(g);
        if (a.detect.bFirst) {
            a._init(c)
        }
        a.detect.bFirst = false;
        return g
    };
    b.RemoveAllAuthorizations = function() {
        var e = a.LS.item("DWT_port"),
            g = a.LS.item("DWT_ssl"),
            c = "http://",
            d = a.product.ip,
            f;
        if (g == "true") {
            c = "https://"
        }
        f = [c, d, ":", e, "/dwt/dwt_", b.Trial ? "trial_" : "", a.replaceAll(b.ServerVersionInfo, ",", ""), "/RemoveAllAuthorizations?t=", a.now()].join("");
        new a.ajax({
            method: "GET",
            url: f,
            async: true
        });
        return true
    }
})(Dynamsoft.Lib);
(function(a, F) {
    var I = dynamsoft.navInfo,
        P = dynamsoft.dcp,
        N = !1,
        S = "The Dynamsoft WebTWAIN module not installed.",
        v = {
            curPortIndex: 0,
            bConnected: false,
            versionInfo: function(Y, X) {
                var W = 0,
                    U = function(ae, ab) {
                        var aa = [v._getPreUrl(Y[v.curPortIndex]), "f/VersionInfo?ts=", a.now()].join(""),
                            Z, ad;
                        Z = [F.Trial ? "dwt_trial_" : "dwt_", a.replaceAll(F.ServerVersionInfo, ",", "")].join("");
                        ad = a.stringify({
                            id: "1",
                            method: "VersionInfo",
                            version: Z,
                            parameter: []
                        });
                        if (F.OnWebTwainInitMessage) {
                            var ac = "checking WebTwain version ...";
                            F.OnWebTwainInitMessage(ac, EnumDWT_InitMsg.Info)
                        }
                        a.ajax({
                            method: "POST",
                            url: aa,
                            data: ad,
                            onSuccess: ae,
                            onError: ab
                        })
                    },
                    V = function() {
                        v.curPortIndex++;
                        v.bConnected = false;
                        if (v.curPortIndex < Y.length) {
                            setTimeout(function() {
                                U(T, V)
                            }, 1000)
                        } else {
                            F.OnWebTwainInitMessage && F.OnWebTwainInitMessage(S, EnumDWT_InitMsg.Error);
                            X && setTimeout(function() {
                                X(N, S)
                            }, 0)
                        }
                    },
                    T = function(aa) {
                        var Z = P._getJSON(aa);
                        if (Z && "result" in Z) {
                            Z = Z.result;
                            if (a.isArray(Z) && Z.length > 0) {
                                X && setTimeout(function() {
                                    var ab = Y[v.curPortIndex],
                                        ae = Z[0],
                                        ac = Z.length > 1 ? Z[1] : "";
                                    if (ac !== "") {
                                        F.OnWebTwainInitMessage && F.OnWebTwainInitMessage(ac, EnumDWT_InitMsg.Error)
                                    } else {
                                        var ad = "The WebTwain version is: " + ae;
                                        F.OnWebTwainInitMessage && F.OnWebTwainInitMessage(ad, EnumDWT_InitMsg.Info)
                                    }
                                    X(ab, ae, ac)
                                }, 0);
                                return
                            }
                        }
                        setTimeout(V, 1000)
                    };
                v.curPortIndex = 0;
                U(T, V)
            },
            _getPreUrl: function(T) {
                var U;
                if (I.bSSL) {
                    U = "https://"
                } else {
                    U = "http://"
                }
                return [U, dynamsoft.dcp.ip, ":", T, "/"].join("")
            }
        };
    a.DynamicWebTwain = N;
    var H = window,
        n = H.document,
        l, o, Q = "This browser is currently not supported.",
        B = "Duplicate ID detected for creating Dynamic Web TWAIN objects, please check and modify.",
        J = a.each,
        f = "dwt",
        j = 0,
        C = 1,
        u = 2,
        w = 3,
        A = !0,
        N = !1,
        d = function(T) {
            if (a.product.bPluginEdition) {
                a.DynamicWebTwain = a.plugin.DynamicWebTwain;
                a.closeAll = a.plugin.closeAll;
                if (a.isFunction(T)) {
                    T()
                }
            } else {
                if (a.product.bActiveXEdition) {
                    a.DynamicWebTwain = a.ie.DynamicWebTwain;
                    a.closeAll = a.ie.closeAll;
                    if (a.isFunction(T)) {
                        T()
                    }
                }
            }
        };
    a.__innerInitEvents = function(U, T) {
        T && J(["onAfterOperate", "onBeforeOperate", "onOperateStatus", "onBitmapChanged", "onGetFilePath", "onImageAreaDeSelected", "onImageAreaSelected", "onMouseClick", "onMouseDoubleClick", "onMouseMove", "onMouseRightClick", "onPreAllTransfers", "onPreTransfer", "onPostLoad", "onPostTransfer", "onPostAllTransfers", "onSourceUIClose", "onTopImageInTheViewChanged", "onTransferCancelled", "onTransferError", "onInternetTransferPercentage", "onInternetTransferPercentageEx"], function(V) {
            U["__O" + V.substring(1)] = T[V] || ""
        })
    };
    a.replaceControl = function(U, T) {
        F.ContainerMap[U] = T
    };
    l = function(ae, W, ab, T) {
        var U = (navigator.userAgent.toLowerCase()),
            ad = a.product;
        if (T && T._customIP && (!a.isLocalIP(T._ip))) {
            if (a.isFunction(H.OnRemoteWebTwainNotFoundCallback)) {
                var X = T._ssl ? T._portSSL : T._port;
                OnRemoteWebTwainNotFoundCallback(ad.name, T._ip, X, T._ssl)
            }
            return
        }
        if (a.env.bMac) {
            if (ae) {
                var V = a.one("#" + ae);
                V.before(a.install._strNonInstallDIV);
                var aa = a.get(a.install._divDWTNonInstallContainerID);
                if (aa) {
                    aa.style.width = W;
                    aa.style.height = ab
                }
                a.show(a.install._divDWTNonInstallContainerID);
                a.hide(ae)
            }
            if (a.install._divDWTemessageContainer != "") {
                a.hide(a.install._divDWTemessageContainer)
            }
            if (a.isFunction(H.OnWebTwainNotFoundOnMacCallback)) {
                var Y = ad.bChromeEdition ? ad.getChromeEditionPath() : ad.getPKGPath();
                OnWebTwainNotFoundOnMacCallback(ad.name, Y, ad.bChromeEdition, a.env.bIE, a.env.bSafari, a.detect.ssl, a.env.strIEVersion)
            }
        } else {
            if (a.env.bLinux) {
                if (ae) {
                    var V = a.one("#" + ae);
                    V.before(a.install._strNonInstallDIV);
                    var aa = a.get(a.install._divDWTNonInstallContainerID);
                    if (aa) {
                        aa.style.width = W;
                        aa.style.height = ab
                    }
                    a.show(a.install._divDWTNonInstallContainerID);
                    a.hide(ae)
                }
                if (a.install._divDWTemessageContainer != "") {
                    a.hide(a.install._divDWTemessageContainer)
                }
                if (a.isFunction(H.OnWebTwainNotFoundOnLinuxCallback)) {
                    var Z, ac;
                    Z = ad.getLinuxHTML5DebPath();
                    ac = ad.getLinuxHTML5RpmPath();
                    OnWebTwainNotFoundOnLinuxCallback(ad.name, Z, ac, ad.bChromeEdition, a.env.bIE, a.env.bSafari, a.detect.ssl, a.env.strIEVersion)
                }
            } else {
                if (U.match(/chrome\/([\d.]+)/) || U.match(/opera.([\d.]+)/) || U.match(/version\/([\d.]+).*safari/) || U.match(/firefox\/([\d.]+)/) || F.IfUseActiveXForIE10Plus == N || (!F.ActiveXInstallWithCAB && a.env.bIE)) {
                    if (ae) {
                        var V = a.one("#" + ae);
                        V.before(a.install._strNonInstallDIV);
                        var aa = a.get(a.install._divDWTNonInstallContainerID);
                        if (aa) {
                            aa.style.width = W;
                            aa.style.height = ab
                        }
                        a.show(a.install._divDWTNonInstallContainerID);
                        a.hide(ae)
                    }
                    if (a.install._divDWTemessageContainer != "") {
                        a.hide(a.install._divDWTemessageContainer)
                    }
                    if (a.isFunction(H.OnWebTwainNotFoundOnWindowsCallback)) {
                        var Y = "";
                        if (!F.ActiveXInstallWithCAB) {
                            if (ad.bChromeEdition) {
                                Y = ad.getChromeEditionPath()
                            } else {
                                if (a.env.bIE) {
                                    if (a.env.bWin64) {
                                        Y = ad.getActiveXCABx64Path()
                                    } else {
                                        Y = ad.getActiveXCABx86Path()
                                    }
                                } else {
                                    Y = ad.getMSIPath()
                                }
                            }
                        } else {
                            Y = ad.bChromeEdition ? ad.getChromeEditionPath() : ad.getMSIPath()
                        }
                        OnWebTwainNotFoundOnWindowsCallback(ad.name, Y, ad.bChromeEdition, a.env.bIE, a.env.bSafari, a.detect.ssl, a.env.strIEVersion)
                    }
                }
            }
        }
    };
    o = function(T) {
        var U = (navigator.userAgent.toLowerCase());
        if (U.match(/chrome\/([\d.]+)/)) {
            a.one("#" + T).before(a.install._strNonInstallDIV);
            a.show(a.install._divDWTNonInstallContainerID);
            a.hide(T);
            if (a.install._divDWTemessageContainer != "") {
                a.hide(a.install._divDWTemessageContainer)
            }
            if (a.isFunction(OnWebTwainOldPluginNotAllowedCallback)) {
                OnWebTwainOldPluginNotAllowedCallback(a.product.name)
            }
        }
    };
    a.detect.getVersionArray = function(T) {
        var U = T.toLowerCase().replace(a.product.name.toLowerCase() + " ", "");
        U = U.replace("trial".toLowerCase(), "");
        U = a.replaceAll(U, "[.]", ",");
        return U.split(",")
    };
    a.detect.isDWTVersionLatest = function(U) {
        if (a.isUndefined(U)) {
            return N
        }
        var X = U.toString().toLowerCase();
        var W = a.detect.getVersionArray(X),
            T, Y;
        if (a.env.bIE && (a.product.bPluginEdition || a.product.bActiveXEdition)) {
            T = F.ActiveXVersion
        } else {
            if (a.product.bPluginEdition) {
                T = F.PluginVersion
            } else {
                T = F.ServerVersionInfo
            }
        }
        T = a.replaceAll(new String(T), "[.]", ",");
        Y = T.split(",");
        index = W.length > Y.length ? W.length : Y.length;
        for (var V = 0; V < index; V++) {
            if (W[V] == null) {
                W[V] = 0
            }
            if (Y[V] == null) {
                Y[V] = 0
            }
            if (parseInt(W[V]) < parseInt(Y[V])) {
                return N
            } else {
                if (parseInt(W[V]) > parseInt(Y[V])) {
                    return A
                }
            }
        }
        return A
    };
    var L = function() {
            if (a.isFunction(H.OnWebTwainNeedUpgradeCallback)) {
                var T = {},
                    W;
                if (a.env.bWin) {
                    if (a.product.bChromeEdition) {
                        T["default"] = a.product.getChromeEditionPath()
                    } else {
                        if (!F.ActiveXInstallWithCAB && a.env.bIE) {
                            if (a.env.bWin64) {
                                T["default"] = a.product.getActiveXCABx64Path()
                            } else {
                                T["default"] = a.product.getActiveXCABx86Path()
                            }
                        } else {
                            T["default"] = a.product.getMSIPath()
                        }
                    }
                    W = EnumDWT_PlatformType.enumWindow
                } else {
                    if (a.env.bLinux) {
                        var V, U;
                        V = a.product.getLinuxHTML5DebPath();
                        U = a.product.getLinuxHTML5RpmPath();
                        T["default"] = V;
                        T.deb = V;
                        T.rpm = U;
                        W = EnumDWT_PlatformType.enumLinux
                    } else {
                        if (a.product.bChromeEdition) {
                            T["default"] = a.product.getChromeEditionPath()
                        } else {
                            T["default"] = a.product.getPKGPath()
                        }
                        W = EnumDWT_PlatformType.enumMac
                    }
                }
                H.OnWebTwainNeedUpgradeCallback(a.product.name, T, a.product.bChromeEdition, W, a.env.bIE, a.env.bSafari, a.detect.ssl, a.env.strIEVersion, a.detect.bPromptJSOrServerOutdated)
            }
        },
        m = function(T, V) {
            if (!a.detect.bNeedUpgradeEvent && !a.detect.isDWTVersionLatest(V.VersionInfo)) {
                a.detect.bNeedUpgradeEvent = A;
                if (!F.UseDefaultInstallUI && a.isFunction(F.OnWebTwainNeedUpgrade)) {
                    F.OnWebTwainNeedUpgrade();
                    return
                }
                if (V && V._customIP && (!a.isLocalIP(V._ip))) {
                    if (a.isFunction(H.OnRemoteWebTwainNeedUpgradeCallback)) {
                        var U = V._ssl ? V._portSSL : V._port;
                        OnRemoteWebTwainNeedUpgradeCallback(a.product.name, V._ip, U, V._ssl)
                    }
                    return
                }
                a.one("#" + T).before(a.install._strNonInstallDIV);
                a.show(a.install._divDWTNonInstallContainerID);
                a.hide(T);
                if (a.install._divDWTemessageContainer != "") {
                    a.hide(a.install._divDWTemessageContainer)
                }
                L()
            }
        };
    var q = function(T) {
            var U = T || {};
            if (U.basePath) {
                a.env.basePath = U.basePath
            }
            if (U.pathType) {
                a.env.pathType = U.pathType
            }
            if (!a.isUndefined(U.bDiscardBlankImage)) {
                a.config.bDiscardBlankImage = U.bDiscardBlankImage
            }
            if (U.msgPrefix) {
                a.config.msgPrefix = U.msgPrefix
            }
            if (U.msgSuffix) {
                a.config.msgSuffix = U.msgSuffix
            }
            if (U.detectType) {
                a.detect.detectType = U.detectType
            }
            if (U.tryTimes) {
                a.detect.tryTimes = U.tryTimes
            }
            if (U.onReady) {
                F.OnWebTwainReady = U.onReady
            }
            if (U.onNotAllowedForChrome) {
                a.detect.onNotAllowedForChrome = U.onNotAllowedForChrome
            }
            if (U.onNoControl) {
                a.detect.onNoControl = U.onNoControl
            }
        },
        E = function(W) {
            var T = F.Containers,
                X, V, Z, aa, Y;
            if (T.length > 0) {
                DCP_DWT_OnClickCloseInstall();
                if (!a.isUndefined(W)) {
                    aa = W._strDWTControlContainerID;
                    Y = W
                } else {
                    for (V = 0; V < T.length; V++) {
                        if (t(T[V])) {
                            aa = T[V].ContainerId;
                            Y = F.ContainerMap[aa];
                            if (Y) {
                                break
                            }
                        }
                    }
                }
                if (Y) {
                    if (a.product.bChromeEdition) {
                        var ab = Y.LogLevel;
                        if (Y.ErrorCode == -2207) {
                            if (!F.UseDefaultInstallUI && a.isFunction(F.OnWebTwainNeedUpgradeWebJavascript)) {
                                F.OnWebTwainNeedUpgradeWebJavascript(Y.ErrorString)
                            } else {
                                if (!a.detect.bPromptJSOrServerOutdated) {
                                    a.detect.bPromptJSOrServerOutdated = A
                                }
                            }
                        }
                    }
                    m(aa, Y)
                }
            }
            if (a.product.bChromeEdition) {
                for (V = 0; V < T.length; V++) {
                    Z = T[V].ContainerId;
                    X = F.ContainerMap[Z];
                    if (X) {
                        h(X);
                        if (X.Width <= 0 || X.Height <= 0) {
                            if (X.Width <= 0) {
                                X.Width = 270
                            }
                            if (X.Height <= 0) {
                                X.Height = 350
                            }
                        }
                    }
                }
            }
            T = null;
            var U = dynamsoft.initOrder;
            if (U[0] == f) {
                U.splice(0, 1)
            }
            F.inited = A;
            if (a.isFunction(F.OnWebTwainReady)) {
                F.OnWebTwainReady()
            } else {
                if (a.isFunction(Dynamsoft_OnReady)) {
                    Dynamsoft_OnReady()
                }
            }
        },
        h = function(T) {
            T.IfAllowLocalCache = A;
            T.BrokerProcessType = 1;
            T.IfShowFileDialog = A;
            T.IfDisableSourceAfterAcquire = A;
            if (a.env.bMac || a.env.bLinux) {
                T.ImageCaptureDriverType = 3
            }
        },
        t = function(T) {
            var U;
            if (!T || !T.ContainerId || T.ContainerId == "") {
                return N
            }
            if (!a.get(T.ContainerId)) {
                return N
            }
            return A
        },
        i = function(T) {
            if (t(T)) {
                var U;
                U = F.ContainerMap[T.ContainerId];
                if (U) {
                    return N
                }
                return A
            }
            return N
        },
        b = function() {
            if (!a.detect.StartWSTimeoutId && a.detect.arySTwains.length == 0) {
                a.detect.StartWSTimeoutId = setTimeout(function() {
                    a.detect.StartWSTimeoutId = N;
                    a.startWS()
                }, 100)
            }
        },
        s = function() {
            if (!a.detect.StartWSByIPTimeoutId && a.detect.arySTwainsByIP.length == 0) {
                a.detect.StartWSByIPTimeoutId = setTimeout(function() {
                    a.detect.StartWSByIPTimeoutId = N;
                    a.startWSByIP()
                }, 100)
            }
        };
    a.detect.__WebTwainCommonMain = function(T, V) {
        var U = F.UseDefaultInstallUI;
        if (U) {
            T.onNotAllowedForChrome = o;
            T.onNoControl = l
        } else {
            T.onNotAllowedForChrome = F.OnWebTwainOldPluginNotAllowed;
            T.onNoControl = F.OnWebTwainNotFound
        }
        q(T);
        if (a.isFunction(V)) {
            V()
        }
    };
    a.detect.__WebTwainMain = function(W, U) {
        var T, V;
        T = {
            containerID: W.ContainerId || "dwtcontrolContainer",
            width: W.Width,
            height: W.Height,
            HTTPPort: (a.detect.ssl ? 443 : 80)
        };
        a.detect.__WebTwainCommonMain(T, function() {
            var Z, X, aa, Y;
            if (a.product.bChromeEdition) {
                T.onWSReady = function(ab) {
                    a.replaceControl(T.containerID, ab);
                    if (a.isFunction(U)) {
                        U(ab)
                    }
                };
                Z = a.DynamicWebTwain(T)
            } else {
                T.onPluginReady = function() {
                    a.replaceControl(T.containerID, Z.getInstance())
                };
                T.onPluginNotReady = function() {
                    if (a.isFunction(Dynamsoft_OnNotReady)) {
                        Dynamsoft_OnNotReady()
                    }
                };
                Z = new a.DynamicWebTwain(T);
                aa = 0;
                Y = F.Containers;
                for (X = Y.length - 1; X >= 0; X--) {
                    _c = Y[X];
                    if (t(_c)) {
                        aa++
                    }
                }
                if (a.detect.arySTwains.length == aa) {
                    a.detect._varSeed = setInterval(a.detect._controlDetect, 200)
                }
            }
            return Z
        })
    };
    F.Unload = function() {
        var U = F.Containers,
            X, W, T, V;
        if (a.closeAll) {
            a.closeAll()
        }
        if (U) {
            if (a.product.bChromeEdition) {
                V = F.ContainerMap;
                for (k = 0; k < U.length; k++) {
                    T = U[k].ContainerId;
                    if (T && a.get(T) && (T in V)) {
                        W = V[T];
                        if (W) {
                            W.__unload();
                            delete V[T]
                        }
                    }
                }
            } else {
                for (k = U.length - 1; k >= 0; k--) {
                    W = document.getElementById(U[k].ContainerId);
                    if (W) {
                        W.innerHTML = ""
                    }
                }
            }
        }
        a.page.bUnload = A;
        if (a.page.OnUnload) {
            a.page.OnUnload()
        }
    };
    var G = function() {
            var V = F.Containers,
                U, T, W;
            for (T = 0; T < V.length; T++) {
                if (t(V[T])) {
                    W = V[T].ContainerId;
                    U = F.ContainerMap[W];
                    if (!U) {
                        setTimeout(G, 200);
                        return
                    }
                }
            }
            V = null;
            E()
        },
        e = function() {
            var U, V = F.Containers,
                T, W = N;
            if (a.config.usingMainMode) {
                return
            }
            if (!V || V.length === 0) {
                a.log("DEnv.Containers does not set.");
                return
            }
            a.DynamicWebTwain = a.html5.DynamicWebTwain;
            a.closeAll = a.html5.closeAll;
            for (U = V.length - 1; U >= 0; U--) {
                T = V[U];
                if (i(T)) {
                    W = T;
                    break
                }
            }
            if (!W) {
                return
            }
            b();
            for (U = 0; U < V.length; U++) {
                T = V[U];
                if (t(T)) {
                    if (T == W) {
                        a.detect.__WebTwainMain(T, E);
                        break
                    }
                    a.detect.__WebTwainMain(T)
                }
            }
        },
        x = function() {
            if (a.config.usingMainMode) {
                return
            }
            d(function() {
                var T, U = F.Containers;
                if (U === N || U.length === 0) {
                    a.log("DEnv.Containers does not set.");
                    return
                }
                for (T = 0; T < U.length; T++) {
                    _c = U[T];
                    if (i(_c)) {
                        a.detect.__WebTwainMain(_c)
                    }
                }
                setTimeout(G, 100)
            })
        },
        y = function(Z, Y, W, X) {
            var U;
            if (!a.product.bChromeEdition) {
                if (a.isFunction(X)) {
                    X(Q)
                }
                return N
            }
            if (F.Containers) {
                var T, V = F.Containers;
                for (T = 0; T < V.length; T++) {
                    if (V[T].ContainerId == Z) {
                        if (a.isFunction(X)) {
                            X(B)
                        }
                        return N
                    }
                }
            }
            U = F.DynamicDWTMap[Z];
            if (U) {
                if (a.isFunction(W)) {
                    W(U)
                }
                return A
            }
            if (Y) {
                s()
            } else {
                b()
            }
            a.html5.CreateDWTObject(Z, Y, function(ab) {
                DCP_DWT_OnClickCloseInstall();
                F.DynamicContainers.push(Z);
                F.DynamicDWTMap[Z] = ab;
                h(ab);
                var aa = ab.LogLevel;
                if (ab.ErrorCode == -2207) {
                    if (!a.detect.bPromptJSOrServerOutdated) {
                        a.detect.bPromptJSOrServerOutdated = A
                    }
                }
                m(Z, ab);
                if (a.isFunction(W)) {
                    W(ab)
                }
            })
        };
    F.Load = function() {
        if (a.detect.scriptLoaded) {
            O()
        } else {
            setTimeout(F.Load, 200)
        }
    };
    F.CreateDWTObject = function(U, aa, V, Z, Y, T) {
        p();
        if (F.initQueue.length == 0) {
            var W, ab, X;
            if (arguments.length <= 3) {
                W = dynamsoft.dcp.ip
            } else {
                W = aa;
                ab = V;
                X = Z
            }
            setTimeout(function() {
                z(W, ab, X)
            }, 10)
        }
        F.initQueue.push(arguments)
    };
    var p = function() {
            var T = dynamsoft.initOrder,
                V = N;
            for (var U = 0; U < T.length; U++) {
                if (T[U] == f) {
                    V = A;
                    break
                }
            }
            if (!V) {
                T.push(f)
            }
        },
        M = function(W, V) {
            var U = W.split(","),
                T = V.split(",");
            return (U.length > 3 && a.trim(U[0]) == T[0] && a.trim(U[1]) == T[1] && a.trim(U[2]) == T[2] && a.trim(U[3]) == T[3])
        },
        g = function(U, T) {
            if (a.isLocalIP(U)) {
                a.LS.item("DWT_port", T);
                a.LS.item("DWT_ssl", I.bSSL ? "true" : "false")
            }
        },
        r = function(X, U, T) {
            var ab = N,
                Y = N,
                V = a.detect,
                W = X.dwtPort,
                Z = dynamsoft.navInfo,
                aa;
            if (V.dcpStatus == u) {
                if (a.isFunction(X.callback)) {
                    X.callback()
                }
                return
            }
            if (W) {
                aa = [W]
            } else {
                aa = [];
                a.each(V.ports, function(ac) {
                    if (Z.bSSL) {
                        ac.ssl && aa.push(ac.port)
                    } else {
                        !ac.ssl && aa.push(ac.port)
                    }
                })
            }
            v.versionInfo(aa, function(ad, ac) {
                if (ac && ac.length > 0) {
                    if (M(ac, F.ServerVersionInfo)) {
                        a.detect.hideMask();
                        V.dcpStatus = u;
                        a.product.ip = dynamsoft.dcp.ip;
                        g(dynamsoft.dcp.ip, ad);
                        if (a.isFunction(X.callback)) {
                            X.callback()
                        }
                        return
                    }
                    if (U) {
                        setTimeout(function() {
                            r(X, A)
                        }, 1000);
                        return
                    }
                }
                if (!U) {
                    var ah;
                    if (Z.bMac) {
                        ah = "MacDWT_"
                    } else {
                        if (Z.bLinux) {
                            ah = "LinuxDWT_"
                        } else {
                            ah = "WinDWT_"
                        }
                    }
                    var af = [F.ResourcesPath, "/", ah, a.replaceAll(F.ServerVersionInfo, ",", "."), ".zip?t=", a.getRandom()].join(""),
                        ae = function(ak) {
                            var al = 100;
                            dynamsoft.dcp.loadZip(ak, al, function() {
                                if (F.OnWebTwainInitMessage) {
                                    var am = "The Dynamic Web TWAIN module loaded.";
                                    F.OnWebTwainInitMessage(am, EnumDWT_InitMsg.Info)
                                }
                                H.OnWebTWAINDllDownloadSuccessful && H.OnWebTWAINDllDownloadSuccessful();
                                setTimeout(function() {
                                    r(X, A)
                                }, 10)
                            }, aj)
                        },
                        aj = function(ak, an, am) {
                            a.detect.hideMask();
                            var ap = A;
                            if (F.OnWebTwainInitMessage) {
                                var aq = "Failed to download the Dynamic Web TWAIN module.";
                                F.OnWebTwainInitMessage(aq, EnumDWT_InitMsg.Error)
                            }
                            if (H.OnWebTWAINDllDownloadFailure) {
                                var ao = {},
                                    al;
                                if (am.status == 404) {
                                    a.Errors.WebTwainModuleNotExist(ao);
                                    al = A
                                } else {
                                    a.Errors.WebTwainModuleDownloadFailure(ao);
                                    al = N
                                }
                                ap = H.OnWebTWAINDllDownloadFailure(a.product.name, ao._errorCode, ao._errorString);
                                if (al) {
                                    ap = N
                                }
                            }
                            if (ap) {
                                setTimeout(function() {
                                    r(X)
                                }, 500)
                            }
                        };
                    if (F.OnWebTwainInitMessage) {
                        var ai = "Downloading the Dynamic Web TWAIN module.";
                        F.OnWebTwainInitMessage(ai, EnumDWT_InitMsg.Info)
                    }
                    new a.ajax({
                        method: "GET",
                        url: af,
                        async: true,
                        dataType: "blob",
                        contentType: "text/plain; charset=x-user-defined",
                        mimeType: "text/plain; charset=x-user-defined",
                        onSuccess: ae,
                        onError: aj
                    })
                } else {
                    var ag = T > 0 ? (T + 1) : 1;
                    setTimeout(function() {
                        r(X, A, ag)
                    }, 1000)
                }
            })
        },
        K = function(V, W) {
            var T = dynamsoft.initOrder,
                X = N;
            if (T.length > 0 && T[0] === f) {
                var U = a.detect;
                if (U.dcpStatus === j || W) {
                    if (U.dcpStatus === j) {
                        a.detect.showMask()
                    }
                    U.dcpStatus = C;
                    dynamsoft.dcp.versionInfo(function() {
                        var aa = dynamsoft.dcp.detect.bConnected;
                        if (aa) {
                            r(V)
                        } else {
                            U.dcpStatus = w;
                            if (!W) {
                                a.detect.hideMask();
                                if (F.OnWebTwainInitMessage) {
                                    var Z = "Please download and install the Dynamic Web TWAIN.";
                                    F.OnWebTwainInitMessage(Z, EnumDWT_InitMsg.Info)
                                }
                                if (!a.isLocalIP(V.ip)) {
                                    if (a.isFunction(H.OnRemoteWebTwainNotFoundCallback)) {
                                        var Y = I.bSSL;
                                        OnRemoteWebTwainNotFoundCallback(a.product.name, V.ip, V.dwtPort, Y)
                                    }
                                } else {
                                    l()
                                }
                            }
                            setTimeout(function() {
                                K(V, A)
                            }, 10000)
                        }
                    })
                } else {
                    if (U.dcpStatus === C || U.dcpStatus === w) {
                        setTimeout(function() {
                            K(V, W)
                        }, 500)
                    } else {
                        if (U.dcpStatus === u) {
                            r(V)
                        }
                    }
                }
            } else {
                setTimeout(function() {
                    K(V, W)
                }, 200)
            }
        },
        O = function() {
            a.page.bUnload = N;
            if (a.product.bChromeEdition) {
                p();
                K({
                    callback: e,
                    ip: dynamsoft.dcp.ip
                })
            } else {
                x()
            }
        },
        D = function(U, ab, V, Z, Y, T) {
            var ac = N,
                W = N,
                ae, X, aa, ad;
            if (arguments.length <= 3) {
                aa = ab;
                ad = V
            } else {
                W = ab;
                ae = V;
                X = Z;
                aa = Y;
                ad = T
            }
            if (!a.product.bChromeEdition) {
                if (a.isFunction(T)) {
                    T(Q)
                }
                return N
            }
            if (!a.detect.onNoControl) {
                a.detect.onNoControl = l
            }
            if (W && ae && X && ae > 0 && X > 0) {
                ac = {
                    ip: W,
                    port: ae,
                    portSSL: X
                }
            }
            y(U, ac, aa, ad)
        },
        z = function(W, U, V) {
            if (a.detect.scriptLoaded) {
                var T = I.bSSL ? V : U;
                dynamsoft.dcp.ip = W;
                K({
                    callback: c,
                    ip: W,
                    dwtPort: T
                })
            } else {
                setTimeout(function() {
                    z(W, U, V)
                }, 200)
            }
        },
        c = function() {
            var X = dynamsoft.initOrder,
                Y = N;
            if (X.length > 0 && X[0] === f) {
                var ac = F.initQueue,
                    aa;
                if (ac.length > 0) {
                    Y = A;
                    for (aa = 0; aa < ac.length; aa++) {
                        if (aa == 0) {
                            var U, ad, W, ab, Z, T, V = ac[aa];
                            if (V.length <= 3 && V.length > 0) {
                                U = V[0];
                                if (V.length > 1) {
                                    Z = V[1]
                                }
                                if (V.length > 2) {
                                    T = V[2]
                                }
                                D(U, Z, T)
                            } else {
                                if (V.length > 4) {
                                    U = V[0];
                                    ad = V[1];
                                    W = V[2];
                                    ab = V[3];
                                    if (V.length > 4) {
                                        Z = V[4]
                                    }
                                    if (V.length > 5) {
                                        T = V[5]
                                    }
                                    D(U, ad, W, ab, Z, T)
                                }
                            }
                        } else {
                            D.apply(H, ac[aa])
                        }
                    }
                    ac.splice(0)
                }
            }
            if (!Y) {
                setTimeout(c, 100)
            }
        };
    F.DeleteDWTObject = function(W) {
        var V = F.DynamicDWTMap,
            T;
        if (!a.product.bChromeEdition) {
            return N
        }
        if (V && W in V) {
            var U = V[W];
            if (U) {
                delete V[W];
                U.__unload()
            }
        }
        for (T = 0; T < F.DynamicContainers.length; T++) {
            if (F.DynamicContainers[T] == W) {
                F.DynamicContainers.splice(T, 1);
                break
            }
        }
        a.detect.hideMask();
        return A
    };
    F.GetWebTwain = function(U) {
        var W = U,
            V, T;
        V = F.Containers;
        if (!W && V && V.length > 0) {
            for (T = 0; T < V.length; T++) {
                if (t(V[T])) {
                    W = V[T].ContainerId;
                    break
                }
            }
        }
        V = F.DynamicContainers;
        if (!W && V && V.length > 0) {
            W = V[0]
        }
        V = null;
        if (W && a.get(W)) {
            var X = F.ContainerMap;
            if (X && (W in X)) {
                return X[W]
            }
            X = F.DynamicDWTMap;
            if (X && (W in X)) {
                return X[W]
            }
        }
        return null
    };
    var R = function() {
        if (!a.isUndefined(F.ProductKey)) {
            setTimeout(function() {
                var T = a.env.bFileSystem,
                    W = a.env.basePath,
                    U = Dynamsoft.WebTwainEnv.ResourcesPath;
                if (!T) {
                    var Y = U;
                    if (typeof(Y) == "undefined" || Y == "") {
                        Dynamsoft.WebTwainEnv.ResourcesPath = U = [W, "/"].join("")
                    } else {
                        if (Y.length > 0 && Y[0] != "/" && Y.indexOf("//") < 0 && W != "") {
                            Dynamsoft.WebTwainEnv.ResourcesPath = U = [W, "/", Y].join("")
                        }
                    }
                }
                var X = "?t=20170607",
                    V = A;
                if (a.env.bSafari) {
                    V = N
                }
                a.getScript([U, "/dynamsoft.webtwain.install.js", X].join(""), V, function() {
                    var aa = [U, "/reference/html5_editor.css", X].join(""),
                        Z = function() {
                            a.detect.scriptLoaded = A;
                            if (F.AutoLoad) {
                                O()
                            }
                        };
                    if (a.env.bSafari) {
                        a.getCss(aa);
                        Z()
                    } else {
                        a.getCss(aa, Z)
                    }
                });
                a.getCss([U, "/reference/hint.css", X].join(""))
            }, 100)
        } else {
            setTimeout(R, 100)
        }
    };
    a.ready(function() {
        var T = a.get("J_waiting");
        if (T) {
            T.parentNode.removeChild(T)
        }
        R()
    });
    if (!H.Dynamsoft_OnClickInstallButton) {
        H.Dynamsoft_OnClickInstallButton = function() {
            a.hide("dwt-btn-install");
            a.hide("dwt-install-url-div")
        }
    }
    a.main = function(V, T) {
        var U = function() {
                if (a.DynamicWebTwain) {
                    a.WebTwain = a.DynamicWebTwain;
                    a.product._strChromeEditionPath = a.product.getChromeEditionPath();
                    a.product._strMSIPath = a.product.getMSIPath();
                    a.product._strPKGPath = a.product.getPKGPath();
                    a.product.version = F.ServerVersionInfo;
                    a.product.IEVersion = F.ActiveXVersion;
                    if (a.isFunction(V)) {
                        V()
                    }
                    if (a.product.bChromeEdition) {} else {
                        a.detect._varSeed = setInterval(a.detect._controlDetect, 200)
                    }
                } else {
                    a.log("Error: the Dynamic Web Twain install failed.")
                }
            },
            W = function() {
                if (a.product.bChromeEdition) {
                    a.DynamicWebTwain = a.html5.DynamicWebTwain;
                    a.closeAll = a.html5.closeAll;
                    U()
                } else {
                    d(U)
                }
            };
        a.config.usingMainMode = A;
        F.UseDefaultInstallUI = N;
        F.OnWebTwainOldPluginNotAllowed = T.onNotAllowedForChrome;
        F.OnWebTwainNotFound = T.onNoControl;
        a.ready(function() {
            a.detect.__WebTwainCommonMain(T, W)
        })
    }
})(Dynamsoft.Lib, Dynamsoft.WebTwainEnv);
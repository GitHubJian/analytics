// seed code

// !(function(win, doc, ns) {
//   var fnname = '_SogouAReport'
//   win[fnname] = ns
//   if (!win[ns]) {
//     var _LX = function() {
//       _LX.q.push(arguments)

//       return _LX
//     }
//     _LX.q = _LX.q || []
//     _LX.l = +new Date()
//     win[ns] = _LX
//   }
// })(window, document, 'AReport')

// demo
// window.AReport('MV', 'test')

;(function() {
  var class2type = {}
  var toString = class2type.toString

  'Boolean Number String Function Array Date RegExp Object Error'
    .split(' ')
    .forEach(function(name) {
      class2type['[object ' + name + ']'] = name.toLowerCase()
    })

  function type(obj) {
    return obj == null
      ? String(obj)
      : class2type[toString.call(obj)] || 'object'
  }

  function hasOwn(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isFunction(fn) {
    return type(fn) === 'function'
  }

  function isArray(array) {
    return type(array) === 'array'
  }

  function isDefined(val) {
    var t = type(val)

    return t !== 'undefined' && t !== 'null'
  }

  function isObject(obj) {
    return type(obj) === 'object'
  }

  function isString(str) {
    return type(str) === 'string'
  }

  function isNumber(num) {
    return type(num) === 'number'
  }

  function slice(arr, start, end) {
    return Array.prototype.slice.call(arr, start, end)
  }

  function each(val, callback, thisArg) {
    var name, i, len
    if (isArray(val)) {
      for (i = 0, len = val.length; i < len; i++) {
        callback.call(thisArg, val[i], i, val)
      }
    } else {
      for (name in val) {
        if (hasOwn(val, name)) {
          callback(thisArg, val[name], name, val)
        }
      }
    }
  }

  function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }

  var key
  function _extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key])) target[key] = []
        _extend(target[key], source[key], deep)
      } else if (source[key] !== undefined) {
        target[key] = source[key]
      }
  }

  function extend(target) {
    var deep,
      args = Array.prototype.slice.call(arguments, 1)
    if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg) {
      _extend(target, arg, deep)
    })

    return target
  }

  function clone(val) {
    return extend(false, {}, val)
  }

  function isArrayLike(t) {
    if (!t) return false
    var len = t.length

    return (
      !!isArray(t) ||
      (!!(t && isNumber(len) && 0 <= len) &&
        (!isObject(t) || (!(1 < len) || n - 1 in t)))
    )
  }

  function find(val, callback, thisArg) {
    var o
    if (isArrayLike(val)) {
      each(val, function(t, n) {
        if (true === callback.call(thisArg, t, n, val)) {
          o = t
        }
      })
    }

    return o
  }

  var Utils = {
    isFunction: isFunction,
    isArray: isArray,
    isDefined: isDefined,
    isObject: isObject,
    isString: isString,
    isNumber: isNumber,
    slice: slice,
    each: each,
    extend: extend,
    clone: clone,
    find: find,
    hasOwn: hasOwn
  }

  // cookie
  function getCookie(name) {
    var res = document.cookie.match(
      new RegExp('(?:^|;)\\s*' + name + '=([^;]+)')
    )

    return res ? decodeURIComponent(res[1]) : ''
  }

  function setCookie(name, value, expires, domain) {
    var domain = domain || document.domain
    var now,
      o,
      a,
      str = name + '=' + encodeURIComponent(value) + ';path=/;domain=' + domain

    expires === void 0 ||
      isNaN(expires) ||
      ((now = new Date()),
      (o = 60 * parseInt(expires, 10) * 1e3),
      (a = now.getTime() + o),
      now.setTime(a),
      (str += ';expires=' + now.toUTCString()))

    try {
      return (document.cookie = str), true
    } catch (e) {
      return false
    }
  }

  function removeCookie(t, n) {
    var e = t + '=;path=/;domain=' + n,
      r = new Date()

    return (
      r.setFullYear(1970),
      (e += ';expires=' + r.toUTCString()),
      (Rn.cookie = e),
      !0
    )
  }

  var Cookie = {
    get: getCookie,
    set: setCookie,
    del: removeCookie
  }

  var cookieName = {
    cid: 'lx_report_cid',
    mid: 'lx_report_mid',
    os: 'lx_report_os'
  }

  function checkOS() {
    var ua = window.navigator.userAgent
    if (ua.match(/android/i)) {
      return 'android'
    }

    if (ua.match(/(ios)|(ipad)|(ipod)|(iphone)/i)) {
      return 'ios'
    }

    return 'unknown'
  }

  function createCid() {
    function Xr() {
      for (var t = 1 * new Date(), n = 0; t === 1 * new Date() && n < 200; ) n++
      return t.toString(16) + n.toString(16)
    }

    function Or() {
      let t = window.navigator.userAgent.toString(),
        n = void 0,
        e = void 0,
        i = [],
        r = 0
      function o(t, n) {
        let e = void 0,
          r = 0
        for (e = 0; e < n.length; e++) r |= i[e] << (8 * e)
        return t ^ r
      }

      for (n = 0; n < t.length; n++)
        (e = t.charCodeAt(n)),
          i.unshift(255 & e),
          4 <= i.length && ((r = o(r, i)), (i = []))
      return 0 < i.length && (r = o(r, i)), r.toString(16)
    }

    const t = (window.screen.height * window.screen.width).toString(16)

    return (
      Xr() +
      '-' +
      Math.random()
        .toString(16)
        .replace('.', '') +
      '-' +
      Or() +
      '-' +
      t +
      '-' +
      Xr()
    )
  }

  function createMid() {
    function Hr() {
      return Math.floor(1 + 65535 * Math.random())
        .toString(16)
        .substring(1)
    }

    var t = [],
      n = +new Date()

    t.push(n.toString(16))
    t.push(Hr())
    t.push(Hr())
    t.push(Hr())

    return t.join('-')
  }

  function createRid() {
    return (
      (+new Date()).toString(16) +
      '-' +
      Math.floor(65535 * Math.random()) +
      '-' +
      Math.floor(65535 * Math.random())
    )
  }

  // 全局数据
  var global = {
    category: null,
    cid: null
  }

  var report

  function initReport(callback) {
    report = new Report({})

    callback && callback(report)
  }

  function Report(opts) {
    this.opts = opts || {}

    this.isSendPV = false

    this.init()
  }

  Report.prototype.constructor = Report

  function getMetaLXContent(tags, name) {
    var content,
      tag,
      els = Array.prototype.slice.call(tags)

    tag = Utils.find(els, function(el) {
      return el.getAttribute('name') == name
    })

    tag && (content = tag.getAttribute('content'))

    return content
  }
  // 初始化参数
  Report.prototype.init = function() {
    // 初始化上报参数
    var metaTags = document.getElementsByTagName('meta'),
      cid = getMetaLXContent(metaTags, 'lx:cid'),
      autopv = 'off' !== getMetaLXContent(metaTags, 'lx:autopv'),
      category = getMetaLXContent(metaTags, 'lx:category')

    global.category = category
    global.autopv = autopv
    global.cid = cid

    // 初始化环境参数

    this.env = createEnvVal()

    global.autopv && this.PV()
  }

  function createEnvVal() {
    var ua = window.navigator.userAgent,
      sc = window.screen.width + '*' + window.screen.height

    var cid = Cookie.get(cookieName.cid)
    if (!cid) {
      cid = createCid()
      Cookie.set(cookieName.cid, cid)
    }

    var os = checkOS()

    return {
      ua: ua,
      sc: sc,
      cid: cid,
      os: os
    }
  }

  Report.prototype.config = function(key, value) {
    if (key !== void 0) {
      global[key] = value
    }

    return global[key]
  }

  /**
   * @param {Object} val 自定义参数
   * @param {String} cid 单次使用上报的参数
   */
  Report.prototype.PV = function(val, cid) {
    if (this.isSendPV) {
      return
    }

    val = val || {}
    cid = cid || global.cid

    if (global.category && cid) {
      this.isSendPV = true

      this.send({
        productid: global.category,
        type_page: cid,
        type: 'pv',
        env: this.env,
        val: val
      })
    }
  }

  Report.prototype.MV = function(bid, val, env) {
    if (!bid) return

    val = val || {}
    env = env || {}

    var originEnv = Utils.extend(true, {}, this.env)

    env = Utils.extend(true, originEnv, env)

    this.send({
      productid: global.category,
      type_page: global.cid,
      type: bid,
      val: val,
      env: env
    })
  }

  Report.prototype.MC = function(bid, val, env) {
    if (!bid) return

    val = val || {}
    env = env || {}

    var originEnv = Utils.extend(true, {}, this.env)

    env = Utils.extend(true, originEnv, env)

    this.send({
      productid: global.category,
      type_page: global.cid,
      type: bid,
      val: val,
      env: env
    })
  }

  Report.prototype.send = function(data) {
    send$1(data)
  }

  var _sendCounter = 0
  function send$1(data) {
    var ts = +new Date()
    var t = ts.toString(16) + _sendCounter++
    var qs = [],
      qsStr = ''

    for (var name in data) {
      if (Utils.hasOwn(data, name)) {
        qs.push(
          encodeURIComponent(name) +
            '=' +
            encodeURIComponent(
              Utils.isObject(data[name])
                ? JSON.stringify(data[name])
                : data[name]
            )
        )
      }
    }

    qsStr = qs.join('&')

    var image = new window.Image()
    var id = 'report_image_' + t
    window[id] = image
    image.src = '//sa.sogou.com/pv?' + qsStr + '&ts=' + ts

    image.onload = image.onerror = function() {
      image = null
      window[id] = null
    }
  }

  /**
   *
   * @param {Object} ctx report
   * @param {Function | String} api report api
   * @param {*} args api args
   * @param {Object} env env
   */
  function executeReport(ctx, api, args, env) {
    if (Utils.isFunction(ctx[api])) {
      return ctx[api].apply(ctx, args, env)
    }
  }

  // 上报入口
  function runReport(api) {
    var rest

    var args = [],
      len = arguments.length

    while (len--) args[len] = arguments[len]

    if (args.length) {
      rest = Utils.slice(args, 1, args.length)

      try {
        if (report) {
          executeReport(report, api, rest, report.env || null)
        } else {
          initReport(function(ctx, env) {
            report = ctx
            executeReport(report, api, rest, env || null)
          })
        }
      } catch (e) {}
    }
  }

  function errorReport(e) {
    console.log(e)
  }

  var fnname = '_SogouAReport'

  function createLXAnalytics() {
    var reportname = window[fnname]

    return window[reportname]
  }

  var reportQueue

  if (!window._report_dom_ready_) {
    window._report_dom_ready_ = true

    var isStarted = true,
      isFlushQueue = false

    reportQueue = (function() {
      var lx = createLXAnalytics()

      if (lx) {
        lx.q.push = function push() {
          try {
            var args = [],
              len = arguments.length

            var assign = (len && arguments[0]) || []
            len = assign.length

            while (len--) args[len] = assign[len]

            type = args && args[0]

            if (!type) return

            if (type === 'start') {
              isStarted = true
              isFlushQueue || flushQueue(queue)
            } else if (isStarted === false) {
              len && queue.push(args)
            } else {
              runReport.apply(null, args)
            }
          } catch (error) {
            try {
              errorReport(e.stack)
            } catch (e) {}
          }
        }
      }

      // 调整config 与 lx 配置选项的顺序
      var type,
        configArgs = [],
        lxArgs = [],
        q = lx && Utils.isArray(lx.q) ? lx.q : [],
        i = 0,
        len = q.length

      for (; i < len; i++) {
        type = q[i] && q[i][0]

        if (type === 'config') {
          configArgs.push(q[i])
        } else {
          lxArgs.push(q[i])
        }
      }

      q = configArgs.concat(lxArgs)

      return q
    })()

    function flushQueue(q) {
      if (!isFlushQueue) {
        if (q) {
          q.forEach(function(argv) {
            var args = [],
              len = argv.length

            while (len--) args[len] = argv[len]

            var type = args && args[0]

            if (type) {
              // 调用 report 接口
              runReport.apply(null, args)
            }
          })

          runReport(function() {
            console.log('上报')
          })

          isFlushQueue = true
        }
      }
    }

    if (reportQueue.length === 0) {
      // 初始化 report api
      initReport(function(ctx) {
        report = ctx
      })
    } else {
      isStarted && flushQueue(reportQueue)
    }
  }
})()

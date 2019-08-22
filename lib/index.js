/**
 * Analytics v1.0.0
 * (c) 2019-2020
 * 埋点统计
 */

!(function() {
  var utils = {}

  function _isArray(v) {
    return v && Array.isArray(v)
  }

  function _hasOwn(v, r) {
    return Object.prototype.hasOwnProperty.call(v, r)
  }

  utils.isArray = _isArray
  function _each(v, callback, thisArg) {
    var r, i, o
    if (_isArray(v)) {
      for (
        i = 0, o = v.length;
        i < o && !1 !== callback.call(thisArg, v[i], i, v);
        i++
      );
    } else {
      for (r in v) {
        if (_hasOwn(v, r) && !1 === callback.call(thisArg, v[r], r, v)) break
      }
    }
  }

  utils.each = _each

  utils.slice = function(v, begin, end) {
    return Array.prototype.slice.call(v, begin, end)
  }

  utils.isDef = function(v) {
    return v !== void 0 && v !== null
  }

  utils.isFunc = function(v) {
    return utils.isDef(v) && typeof v === 'function'
  }

  utils.isObj = function(v) {
    return '[object Object]' === Object.prototype.toString.call(v)
  }

  utils.isString = function(v) {
    return utils.isDef(v) && typeof v === 'string'
  }

  utils.isNumber = function(v) {
    return utils.isDef(v) && typeof v === 'number'
  }

  function _extend(deep, to, from) {
    var i = void 0,
      _deep = !0 === deep
    if (!_deep) {
      from = to
      to = deep
    }

    if (!(to && utils.isObj(to))) {
      to = {}
    }

    if (!(from && utils.isObj(from))) {
      from = {}
    }

    utils.each(from, function(t, n) {
      if (_deep && utils.isObj(from[n])) {
        i = to[n]
        to[n] = utils.isObj(i) ? i : {}
        _extend(_deep, to[n], from[n])
      } else {
        to[n] = from[n]
      }
    })

    return to
  }

  utils.extend = _extend

  utils.clone = function(v) {
    return _extend({}, v)
  }

  function _isArrayLike(t) {
    if (!t) return !1
    var n = t.length
    return (
      !!utils.isArray(t) ||
      (!!(t && utils.isNumber(n) && 0 <= n) &&
        (!utils.isObj(t) || (!(1 < n) || n - 1 in t)))
    )
  }

  utils.isArrayLike = _isArrayLike

  utils.run = function(v, callback) {
    _isArrayLike(v) ? utils.each(v, callback) : callback(v)
  }

  utils.find = function(e, r, i) {
    var o = void 0
    if (_isArrayLike(e)) {
      utils.each(e, function(t, n) {
        if (!0 === r.call(i, t, n, e)) {
          o = t
          return !1
        }
      })
    }
    return o
  }

  /* ---------------------------- 华丽分割线 ---------------------------- */

  var _method = 'post',
    _timeout = 5e3
  function createUrl(url) {
    return url
  }

  function XHR() {
    return window.XMLHttpRequest
  }

  function createXHR(url, method, contentType) {
    var xhr = new (XHR())()
    xhr.open(method || _method, createUrl(url), !0)
    xhr.timeout = _timeout
    xhr.setRequestHeader('Content-Type', contentType)

    return xhr
  }

  function error(resourceUrl, sec_category, unionId, content, jsError) {
    var data = [
      {
        project: 'web-lx-sdk',
        pageUrl: window.location.href,
        resourceUrl: resourceUrl,
        category: jsError ? 'jsError' : 'ajaxError',
        sec_category: sec_category,
        unionId: unionId,
        timestamp: +new Date(),
        content: '' + content || ''
      }
    ]

    var xhr = createXHR(
      '//sa.sogou.com/feed/error?v=1',
      _method,
      'application/x-www-form-urlencoded'
    )

    if (xhr) {
      xhr.onerror = xhr.onreadystatechange = function() {}
      xhr.send('c=' + encodeURIComponent(window.JSON(data)))
    }
  }

  /* ---------------------------- 华丽分割线 ---------------------------- */

  var isBindBeforeUnloadEvent = !1
  function bindBeforeUnloadEvent() {
    if (!isBindBeforeUnloadEvent) {
      isBindBeforeUnloadEvent = !0
      // 绑定 pageDisappear
    }
  }

  /* ---------------------------- 华丽分割线 ---------------------------- */
  var globalCallbackQueue = []
  function globalCallbackIfy(cb, cmd) {
    return {
      cb: cb,
      cmd: cmd
    }
  }
  /* ---------------------------- 华丽分割线 ---------------------------- */
  var globalCallbackMaps = {}
  function globalCallbackCreate(callback, callbackTimeout) {
    var name = 'fn_' + parseInt(1e6 * Math.random())
    globalCallbackMaps[name] = callback

    setTimeout(function() {
      globalCallbackRun(name, { code: -1, status: 408, type: 'overtime' })
    }, callbackTimeout || 2e3)

    return name
  }

  function globalCallbackRun(name, args) {
    if (globalCallbackMaps[name]) {
      try {
        globalCallbackMaps[name](args)
        setTimeout(function() {
          delete globalCallbackMaps[name]
        }, 0)
      } catch (e) {}
    }
  }
  /* ---------------------------- 华丽分割线 ---------------------------- */
  var _sendCounter = 0,
    _imageUri = 'http://sa.sogou.com/pv',
    _imageIdPrefix = '__$lx_beacon_',
    _imageIdCounter = 0,
    _imageQueryStringMaxLength = 2032
  function sendByImage(data, cb) {
    var t = (+new Date()).toString(16) + _sendCounter++,
      qs = [],
      qsStr = void 0,
      url = void 0
    for (var r in data) {
      if (_hasOwn(data, r)) {
        if (Object.prototype.toString.call(data[r]) === '[object Object]') {
          qs.push(
            encodeURIComponent(r) +
              '=' +
              encodeURIComponent(JSON.stringify(data[r]))
          )
        } else {
          qs.push(encodeURIComponent(r) + '=' + encodeURIComponent(data[r]))
        }
      }
    }

    qsStr = qs.join('&')

    if (-1 < _imageUri.indexOf('?')) {
      url = _imageUri + '&' + qsStr
    } else {
      url = _imageUri + '?' + qsStr
    }

    function $send(uri, options, retry) {
      var image = void 0,
        id = _imageIdPrefix + _imageIdCounter++
      options = options || {}
      retry = retry || 0

      if (2 >= retry) {
        window[id] = image = new Image()
        image.onload = function() {
          if (utils.isFunc(options.cb)) {
            options.cb(!0)
            window[id] = null
          }
        }

        image.onabort = image.onerror = function() {
          window[id] = null
          // setTimeout(function() {
          //   $send(uri, options, ++retry)
          // }, 100)
          if (utils.isFunc(options.cb)) {
            options.cb(!0)
            window[id] = null
          }
        }

        image.src = uri
      } else {
        utils.isFunc(options.cb) && options.cb(!1)
      }
    }

    $send((url = url + '&t=1&r=' + t), {
      cb: function(t) {
        if (t) {
          try {
            cb(200, 200, 'image-get')
          } catch (e) {}
        } else {
          try {
            cb(-3, 0, 'ajax-get-to-image-get')
          } catch (t) {}
        }
      }
    })
  }

  var _ajaxUri = 'http://sa.sogou.com/'
  function sendByAjax(data, cb) {
    var uri = (function(url) {
      var r,
        rnd = '_lxsdk_rnd=' + (+new Date()).toString(16) + sendCounter++

      if (-1 < url.indexOf('?')) {
        r = url + '?' + rnd
      } else {
        r = url + '&' + rnd
      }
      return r
    })(_ajaxUri)

    function $sendByAjax(uri, data, options, retry) {
      try {
        var method = 'post',
          cb = (utils.isFunc(options.cb) && opts.cb) || function() {}
        xhr = new window.XMLHttpRequest()
        xhr.open(method, uri, !0)
        xhr.timeout = 5e3
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState) {
            if (200 <= xhr.status && xhr.status < 400) {
              cb(200, xhr.status, 'ajax-' + method)
            } else {
              if (retry) {
                xhr.onreadystatechange = null
                $sendByAjax(uri, data, opts, !0)
              } else {
                cb(-1, xhr.status, 'ajax-' + method)
              }
            }
          }
        }

        xhr.onerror = function() {
          cb(500, xhr.status, 'ajax-' + method)
        }

        xhr.send((method === 'post' && JSON.stringify(data)) || null)
      } catch (e) {}
    }

    $sendByAjax(uri, data, {
      cb: function(t, n) {
        try {
          cb(t, n, 'ajax-post')
        } catch (e) {}
      }
    })
  }

  function $$send(data, opts) {
    opts = utils.extend({ cb: function() {} }, opts || {})

    var u,
      i = !(function(t) {
        for (var n = t.length, e = n, r = 0; r < n; r++) {
          127 < t.charCodeAt(r) && e++
        }
        return 1.5 * e < _imageQueryStringMaxLength
      })((u = JSON.stringify(data)))

    if (i) {
      sendByAjax(data, opts.cb)
    } else {
      sendByImage(data, opts.cb)
    }
  }
  /* ---------------------------- 分割线 ---------------------------- */
  function $$cidIfy(t) {
    t = t || {}
    !utils.isObj(t) && (t = { cid: '' + t })
    return t
  }

  var collectQueue = []
  function createCollectLog(cid, valBid, valLab) {
    return {
      cid: cid,
      bid: valBid,
      custom: valLab
    }
  }
  function getCollectQueue(cid, valBid, valLab) {
    var o = createCollectLog(cid, valBid, valLab)

    return {
      body: (function(t) {
        if (collectQueue && 0 < collectQueue.length) {
          var n = collectQueue
          collectQueue = []
          n.push(t)

          return n
        }

        return [t]
      })(o),
      ev: o
    }
  }

  function createEVSLog(envVal, ev) {
    utils.isArrayLike(ev) || (ev = [ev])

    envVal.evs = ev

    return envVal
  }

  function createEVSEnvVal(ob) {
    return utils.extend({}, ob.env)
  }

  function $$collect(type, cid, valBid, valLab, opts) {
    opts = opts || {}
    var that = this,
      cbkey = globalCallbackCreate(opts.callback, opts.callbackTimeout),
      mvDelay = opts.mvDelay

    var envVal = createEVSEnvVal(that)
    var cq = getCollectQueue(cid, valBid, valLab),
      body = cq.body

    if (mvDelay) {
      utils.run(body, function(t) {
        collectQueue.push(t)
      })

      return void setTimeout(function() {
        if (collectQueue.length) {
          var t = createEVSLog(envVal, collectQueue)

          that.send(t, {
            nm: type,
            cbkey: cbkey
          })

          collectQueue = []
        }
      }, mvDelay * 1e3)
    }

    var evsLog = createEVSLog(envVal, body)
    var d = utils.extend({}, evsLog)
    delete d.evs
    d['cid'] = evsLog['evs'] && evsLog['evs'][0]['cid']
    d['bid'] = evsLog['evs'] && evsLog['evs'][0]['bid']
    d['custom'] = evsLog['evs'] && evsLog['evs'][0]['custom']

    that.send(d, {
      nm: type,
      cbkey: cbkey
    })
  }

  var setCallbackMaps = {
    uid: true
  }

  function Cmd(envVal, opts) {
    this.env = envVal || {}
    this.opts = utils.extend(!0, {}, opts)
  }

  Cmd.prototype.set = function(envKey, envVal, callback) {
    var that = this,
      _env = this.env

    if (utils.isObj(envKey)) {
      utils.each(envKey, function(t, n) {
        that.set(n, t)
      })
    } else if (((_env[envKey] = envVal), setCallbackMaps[envKey])) {
      utils.isFunc(callback) && callback(_env, that)
    }
  }

  Cmd.prototype.get = function(envKey, callback) {
    utils.isFunc(callback) && callback(this.env[envKey], this)
  }

  Cmd.prototype.pageView = function(pageValLab, opts) {
    opts = $$cidIfy(opts) || {}
    var cbkey = globalCallbackCreate(opts.callback, opts.callbackTimeout)

    var valLab = utils.extend({}, pageValLab || {})
    var w = utils.extend(
      {
        custom: valLab
      },
      this.env
    )

    w['bid'] = globalConfig['valPid'] ? globalConfig['valPid'] : 'pv'

    this.send(w, { nm: 'PV', cbkey: cbkey })
  }

  Cmd.prototype.moduleView = function(valBid, valLab, opts) {
    opts = utils.extend({}, opts)
    var mvDelay = this.opts.mvDelay || opts.delay
    var cid = opts.cid || this.env.cid

    $$collect.call(this, 'MV', cid, valBid, valLab, {
      mvDelay: mvDelay,
      callback: opts.callback,
      callbackTimeout: opts.callbackTimeout
    })
  }

  Cmd.prototype.moduleClick = function(valBid, valLab, opts) {
    opts = utils.extend({}, opts)
    var mvDelay = this.opts.mvDelay || opts.delay
    var cid = opts.cid || this.env.cid

    $$collect.call(this, 'MC', cid, valBid, valLab, {
      mvDelay: mvDelay,
      callback: opts.callback,
      callbackTimeout: opts.callbackTimeout
    })
  }

  Cmd.prototype.send = function(data, opts) {
    var opts = utils.extend(
      {
        cb: function(code, status, type) {
          opts.cbkey &&
            globalCallbackRun(opts.cbkey, {
              code: code,
              status: status,
              type: type
            })
        }
      },
      opts
    )

    var v = utils.extend({}, data)

    v['productid'] = data.category
    v['type_page'] = data.cid
    v['type'] = data.bid

    $$send(v, opts)
  }
  /* ---------------------------- 分割线 ---------------------------- */
  var globalConfig = {
    // pageValLab: null,
    // pageEnv: null,
    category: null,
    cid: null,
    valPid: null
    // quit: null
  }

  function $$pageView(thisArg, valLab, envVal, opts) {
    var pageValLab = valLab

    utils.each(envVal, function(t, n) {
      thisArg._dt.set(n, t, void 0, !0)
    })

    var r = $$cidIfy(opts)
    var d = (thisArg.opts.cid = r.cid || thisArg.opts.cid)
    r = utils.extend({ cid: d }, r)
    thisArg._dt.pageView(pageValLab, { cid: opts.cid })
  }

  /**
   * page view
   * @param {Object} thisArg
   * @param {Object} valLab 自定义参数
   * @param {Object} envVal 环境变量参数
   * @param {Object | String} opts
   *  cid
   *  callback
   *  callbackTimeout
   */

  function GlobalAPI(envVal, opts) {
    this.env = envVal
    this.opts = opts

    this._t = []
  }

  GlobalAPI.prototype.set = function(envKey, envVal, callback) {
    this._dt.set(envKey, envVal, callback)
  }

  GlobalAPI.prototype.create = function(category, opts) {
    var e = utils.extend({}, this.env)
    e = utils.extend(e, { category: category })

    var r = utils.extend({ isDefault: !1 }, this.opts)
    r = utils.extend(r, opts || {})

    var cmd = new Cmd(e, r)

    this._t.push(cmd)

    opts.isDefault && (this._dt = cmd)

    return cmd
  }

  GlobalAPI.prototype.config = function(key, value) {
    if (void 0 !== key) {
      globalConfig[key] = value
    }

    return globalConfig[key]
  }

  GlobalAPI.prototype._initPV = function(envVal, cid) {
    $$pageView(
      this,
      this.config('pageValLab'),
      (envVal = utils.extend(envVal, this.config('pageEnv'))),
      {
        isauto: 6,
        cid: cid,
        isAutoInit: !0
      }
    )
  }

  GlobalAPI.prototype.MV = function(valBid, valLab, opts) {
    this._dt.moduleView(valBid, valLab, opts)
  }

  GlobalAPI.prototype.PV = function(valLab, envVal, cid) {
    $$pageView(this, valLab, envVal, cid)
  }

  GlobalAPI.prototype.MC = function(valBid, valLab, cid) {
    this._dt.moduleClick(valBid, valLab, cid)
  }
  /* -------------- */
  function getMetaLXContent(collection, name) {
    var e,
      el,
      elems = Array.prototype.slice.call(collection)

    el = utils.find(elems, function(el) {
      return el.getAttribute('name') == name
    })

    el && (e = el.getAttribute('content'))

    return e
  }

  var _init = 0,
    _beforeInit = -1,
    _afterInit = 1

  var globalAPI = '',
    globalAPIStatus = _beforeInit,
    category = null // 上报通道
  function initGlobalAPI(cb, cmd) {
    if (_afterInit === globalAPIStatus) {
      cb && cb(globalAPI)
    } else if (_init === globalAPIStatus) {
      cb && globalCallbackQueue.push(globalCallbackIfy(cb, cmd))
    } else {
      globalCallbackQueue = globalCallbackQueue.concat(
        globalCallbackIfy(cb, cmd)
      )

      var meta = document.getElementsByTagName('meta'),
        cid = getMetaLXContent(meta, 'lx:cid') || globalConfig.cid
      if (
        !(category = globalConfig.category = getMetaLXContent(
          meta,
          'lx:category'
        ))
      )
        return void (globalAPIStatus = _beforeInit)

      globalAPIStatus = _init // 设置初始化状态

      var mvDelay = getMetaLXContent(meta, 'lx:mvDelay')
      mvDelay = isNaN(mvDelay) ? 0 : parseInt(mvDelay, 10)

      var autopv = 'off' !== getMetaLXContent(meta, 'lx:autopv')
      globalConfig.autoPV = autopv

      Promise.all([initEnvVal()])
        .then(function(t) {
          var envVal = t[0],
            o = utils.extend({}, envVal || {})
          o = utils.extend(o, { cid: cid })

          globalAPI = new GlobalAPI(o, {
            isDefault: !0,
            mvDelay: mvDelay
          })

          category && globalAPI.create(category, { isDefault: !0 })

          envVal = utils.extend(!0, globalAPI._dt.env, envVal)

          try {
            var globalCallbackQueueFilter = []
            utils.each(globalCallbackQueue, function(t) {
              var callback = t.cb,
                cmd = t.cmd

              'config' === cmd || 'set' === cmd
                ? callback(globalAPI, envVal)
                : globalCallbackQueueFilter.push(t)
            })

            autopv && globalAPI && cid && globalAPI._initPV()

            utils.each(globalCallbackQueueFilter, function(t) {
              t && t.cb && t.cb(globalAPI, {})
            })
          } catch (t) {}
        })
        .then(
          function() {
            globalAPIStatus = _afterInit
          },
          function() {
            globalAPIStatus = _afterInit
          }
        )
    }
  }
  // lxcuid
  function createLXCuid() {
    function Xr() {
      for (var t = 1 * new Date(), n = 0; t === 1 * new Date() && n < 200; ) n++
      return t.toString(16) + n.toString(16)
    }

    function Or() {
      var t = window.navigator.userAgent.toString(),
        n = void 0,
        e = void 0,
        i = [],
        r = 0
      function o(t, n) {
        var e = void 0,
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

    var t = (window.screen.height * window.screen.width).toString(16)

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

  // msid
  function createMsid() {
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

  function createRequestId() {
    return (
      (+new Date()).toString(16) +
      '-' +
      Math.floor(65535 * Math.random()) +
      '-' +
      Math.floor(65535 * Math.random())
    )
  }

  function initEnvVal(t) {
    var envVal = {}
    // var d = createLXCuid()
    // envVal['lxcuid'] = d
    // envVal['uuid'] || (envVal['uuid'] = d) // 存储 no(t)
    // envVal['msid'] || (envVal['msid'] = createMsid()) // 存储 uo(t, n, e)
    envVal['req_id'] = createRequestId()

    return envVal
  }
  /**
   * 执行命令
   * @param {*} api 全局 api
   * @param {*} cmd 待执行命令名
   * @param {*} cmdArgs 配置参数
   * @param {*} envVal 环境变量
   */

  function commandLineInterface(api, cmd, cmdArgs, envVal) {
    if (utils.isFunc(cmd)) {
      cmd.call(api, cmdArgs)
    } else if (utils.isString(cmd)) {
      if (utils.isFunc(api[cmd])) {
        return api[cmd].apply(api, cmdArgs, envVal)
      }
      if ('onLoad' === cmd) {
        try {
          cmdArgs[0](utils.extend(!0, {}, envVal))
        } catch (t) {}
      }
    }
  }
  /**
   * 入口
   * @param {String} cmd
   */
  function bootstrap(cmd) {
    var args = arguments

    if (args.length) {
      var cmdArgs = utils.slice(args, 1, args.length)

      try {
        if (globalAPI) {
          commandLineInterface(
            globalAPI,
            cmd,
            cmdArgs,
            globalAPI._dt ? globalAPI._dt.env : null
          )
        } else {
          initGlobalAPI(function(api, api_dtEnv) {
            globalAPI = api
            commandLineInterface(globalAPI, cmd, cmdArgs, api_dtEnv)
            bindBeforeUnloadEvent()
          }, cmd)
        }
      } catch (e) {}
    }
  }
  /* -------------- */
  var cacheFunName = '_SogouALogObject'
  function createLXAnalytics() {
    var LXAnalyticsName = window[cacheFunName]
    return window[LXAnalyticsName]
  }
  if (!window._lxsdk_isDOMReady) {
    window._lxsdk_isDOMReady = !0

    var isStarted = !0,
      isFreshQueue = !1

    ;(function() {
      var queue = (function() {
        var LXAnalytics = createLXAnalytics()
        if (LXAnalytics) {
          LXAnalytics.q.push = function push(argv) {
            try {
              var e = argv,
                argv0 = e ? e[0] : ''

              if (utils.isArray(argv0)) {
                return void _each(e, function(t) {
                  push(t)
                })
              }

              if ('start' === argv0) {
                isStarted = !0
                isFreshQueue || freshQueue(queue)
              } else if (!1 === isStarted) {
                e && queue.push(e)
              } else {
                bootstrap.apply(void 0, e)
              }
            } catch (e) {
              try {
                error('sdk', 'api-error', '', e.stack, !0)
              } catch (e) {}
            }
          }
        }

        var n = void 0,
          e = void 0,
          useArgvList = [],
          configArgvList = [],
          lxArgvList = [],
          q = LXAnalytics && utils.isArray(LXAnalytics.q) ? LXAnalytics.q : [],
          i = 0,
          il = q.length

        for (; i < il; i++) {
          e = q[i][0]
          if ('config' === e) {
            configArgvList.push(q[i])
          } else if (n || 'use' !== e) {
            lxArgvList.push(q[i])
          } else {
            useArgvList.push(q[i])
            n = !0
          }
        }

        q = configArgvList.concat(useArgvList.concat(lxArgvList))

        return q
      })()

      function freshQueue(q) {
        if (!isFreshQueue) {
          if (q) {
            utils.each(q, function(v) {
              var argv = v,
                argv0 = argv ? argv[0] : ''

              if (utils.isArray(argv0)) {
                utils.each(argv, function(v) {
                  bootstrap.apply(null, v)
                })
              } else {
                if (argv0) {
                  bootstrap.apply(null, argv)
                }
              }
            })

            bootstrap(function() {
              bindBeforeUnloadEvent()
            })

            isFreshQueue = !0
          }
        }
      }

      if (0 === queue.length) {
        initGlobalAPI(function(api) {
          globalAPI = api

          bindBeforeUnloadEvent()
        })
      } else {
        isStarted && freshQueue(queue)
      }
    })()
  }
})()

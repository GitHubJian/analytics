/**
 * Magic Cube Invoke
 * @desc schema 唤起 app
 */

;(function(global, factory) {
  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory())
  } else if (typeof exports === 'object') {
    exports['MCI'] = factory()
  } else {
    global['MCI'] = factory()
  }
})(this, function() {
  var Clipboard = require('clipboard')

  function execLink(schema, callback) {
    var aElement = document.createElement('a')
    aElement.href = schema
    aElement.style.display = 'none'

    document.body.appendChild(aElement)

    aElement.click()

    var st = +new Date()

    setTimeout(function() {
      if (+new Date() - st < 1250) {
        callback &&
          setTimeout(function() {
            callback(schema)
          }, 5e2)
      }
    }, 1200)
  }

  function execIframe(schema, callback) {
    var iframe = document.createElement('iframe')
    iframe.src = schema
    iframe.style.display = 'none'

    document.body.appendChild(iframe)

    iframe.onload = function() {
      callback &&
        setTimeout(function() {
          callback(schema)
        }, 1200)
    }
  }

  function execTimer(schema, callback) {
    var iframe = document.createElement('iframe')
    iframe.src = schema
    iframe.style.display = 'none'

    document.body.appendChild(iframe)

    var st = +new Date()
    setTimeout(function() {
      if (+new Date() - st < 550) {
        callback &&
          setTimeout(function() {
            callback(schema)
          }, 1e3)
      }
    }, 5e2)
  }

  function execCopy(val) {
    let div = document.createElement('div')
    div.style.position = 'fixed' // ios8- maybe has some issue
    div.style.height = '0'
    div.style.overflow = 'hidden'
    div.style.top = '0'
    div.style.left = '0'
    document.body.appendChild(div)

    var btn = document.createElement('button')
    div.appendChild(btn)
    btn.setAttribute('class', 'btn')
    btn.setAttribute('data-clipboard-text', val)

    let clipboard = new Clipboard('.btn')
    clipboard.on('success', function(e) {
      console.info('Text:', e.text)
      console.log(`Clipboard Success`)

      e.clearSelection()

      clipboard.destroy()

      document.body.removeChild(div)
    })

    clipboard.on('error', function(e) {
      console.error(e)

      console.log(`Clipboard Failure`)

      clipboard.destroy()

      document.body.removeChild(div)
    })

    btn.click()
  }

  var type = {
    link: execLink,
    iframe: execIframe,
    timer: execTimer
  }

  function encode(value) {
    return encodeURIComponent(value)
  }

  function stringify(qs) {
    if (!qs) return ''

    var result = [],
      value
    for (var key in qs) {
      if (Object.prototype.hasOwnProperty.call(qs, key)) {
        value = qs[key]

        if (value === undefined) {
          continue
        }

        if (value === null) {
          result.push(encode(key))
        }

        result.push(encode(key) + '=' + encode(value))
      }
    }

    return result.filter(x => x.length).join('&')
  }

  function noop() {}

  function extend(to, _from) {
    for (var k in _from) {
      Object.prototype.hasOwnProperty.call(_from, k) && (to[k] = _from[k])
    }

    return to
  }

  function addEvent(element, event, handler) {
    if (document.addEventListener) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    } else {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }

  var defaultOptions = {
    method: 'link',
    data: null,
    copy: false,
    copyText: '',
    open: false,
    openback: noop,
    before: noop,
    fallback: noop
  }

  function invoke(options) {
    if (!options || !options.url) {
      console.log('options or options.url is undefined')

      return
    }

    options = extend(defaultOptions, options)

    // 执行前置钩子
    options.before()

    if (options.open) {
      options.openback()
      return
    }

    var schema =
      options.url.indexOf('?') > -1
        ? options.url + stringify(options.data)
        : options.url + '?' + stringify(options.data)

    var copy = options.copy
    var copyText = options.copyText
    var method = options.method
    var fallback = options.fallback

    copy && copyText && execCopy(copyText)

    if (!type[method]) {
      console.log('function is undefined named type.' + method)

      return
    }

    type[method](schema, fallback)
  }

  var tipsDefaultOptions = {
    before: noop,
    listener: noop
  }

  function tips(options) {
    // 下载
    options = extend(tipsDefaultOptions, options)

    var before = options.before
    var listener = options.listener

    before()

    var div = document.createElement('div')

    div.innerHTML =
      '您当前的浏览器版本可能无法自动唤起，若未正常唤起，请尝试手动唤起'

    document.body.appendChild(div)

    addEvent(div, 'click', listener)
  }

  return {
    invoke: invoke,
    tips: tips
  }
})

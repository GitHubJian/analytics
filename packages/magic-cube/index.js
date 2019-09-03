/**
 * Magic Cube
 * @desc schema 唤起 app
 */

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
          callback()
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
        callback()
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
          callback()
        }, 1e3)
    }
  }, 5e2)
}

function execTips(schema, callback) {
  var div = document.createElement('div')

  div.innerHTML =
    '您当前的浏览器版本可能无法自动唤起，若未正常唤起，请尝试手动唤起'

  document.body.appendChild(div)
}

function execCopy() {
  // TODO: copy function
  console.log(`Copy is Success`)
}

var type = {
  link: execLink,
  iframe: execIframe,
  timer: execTimer,
  tips: execTips
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

function stringifyUrl(url, data) {
  return url.indexOf('?') > -1
    ? url + stringify(data)
    : url + '?' + stringify(data)
}

function noop() {}

function invoke(options) {
  if (!options || !options.url) {
    console.log('options or options.url is undefined')

    return
  }

  var schema = stringifyUrl(options.url, options.data)

  var isCopy = options.isCopy || false
  var method = options.method || 'tips'
  var callback = options.callback || noop

  isCopy && execCopy()
  if (!type[method]) {
    console.log('function is undefined named type.' + method)

    return
  }

  type[method](schema, callback)
}

var ua = window.navigator.userAgent || ''

var isAndroid

export default {
  invoke: invoke,
  tips: function(options) {
    options.method = 'tips'

    invoke(options)
  }
}

function TTI() {}

TTI.prototype.getFirstConsistentlyInteractive = function() {
  var thisArg = this
  return new Promise(function(resolve) {
    thisArg.s = resolve
    'complete' == document.readyState
      ? u(thisArg)
      : window.addEventListener('load', function() {
          u(thisArg)
        })
  })
}

TTI.prototype.m = function() {}

TTI.prototype.l = function() {}

TTI.prototype.B = function() {}

Object.defineProperties(s.prototype, {
  g: {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return [].concat(this.f.values())
    }
  }
})

var ttiPolyfill = {
  getFirstConsistentlyInteractive: function(t) {
    t = t || {}
    'PerformanceLongTaskTiming' in window
      ? new TTI(t).getFirstConsistentlyInteractive()
      : Promise.resolve(null)
  }
}

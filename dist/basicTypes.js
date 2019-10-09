;(function(){
  function isString(v) {
    return Object.prototype.toString.call(v) === '[object String]'
  }
  function isNumber(v){
    return typeof v === 'number'
  }
  function isUndefined(v){
    return typeof v === 'undefined'
  }
  function isNull(v){
    // return typeof v === 'object'
    return Object.prototype.toString.call(v) === '[object Null]'
  }
  function isBoolean(v){
    // return typeof v === 'boolean'
    return Object.prototype.toString.call(v) === '[object Boolean]'
  }
  function isFunction(v){
    return Object.prototype.toString.call(v) === '[object Function]'
  }
  function isDate(v){
    return Object.prototype.toString.call(v) === '[object Date]'
  }

  function isArray(v){
    return Object.prototype.toString.call(v) === '[object Array]'
  }
})
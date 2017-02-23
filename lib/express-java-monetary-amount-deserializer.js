var flatten = require('flat')
var unflatten = require('flat').unflatten
var cc = require('currency-codes')
var deepAssign = require('deep-assign')

module.exports = function deserializeMonetaryAmount(request, response, next) {

  let bodyFlat = flatten(request.body)
  let deserialized = deserialize(bodyFlat)

  if(!deserialized)
    next()

  deserialized.forEach((element) => {
    deepAssign(request.body, unflatten(element, { object: false }))
  })

  next()
}

function deserialize(bodyFlat) {
  return Object.keys(bodyFlat).map((key) => {

    let value = bodyFlat[key]

    if(/^([A-Z]{3,3}) (\-*[0-9]+\.[0-9]{2,})$/.test(value) &&
      isValidCurrencyCode(value.substring(0, 3))) {
      let returnObj = {}
      let currency = value.substr(0, 3)
      let amount = value.substr(4, value.length - 3)
      returnObj[key] = {
        currency: currency,
        amount: parseFloat(amount)
      }
      return returnObj
    } else {
      return undefined
    }
  }).filter(n => n)
}

function isValidCurrencyCode(currenyCode) {
  return cc.codes().indexOf(currenyCode) > -1
}

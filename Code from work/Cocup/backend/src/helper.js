/*
Compares if two objects contain the same parameters and values. 
Works with nested objects as well.
*/
module.exports.isEqual = isEqual = function (expectedObject, actualObject) {
  const keys = Object.keys(expectedObject)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (typeof expectedObject[key] === 'object') {
      return isEqual(expectedObject[key], actualObject[key])
    }
    if (expectedObject[key] !== actualObject[key]) {
      return false
    }
  }
  return true
}

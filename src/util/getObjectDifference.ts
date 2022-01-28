/*
 * Compare two objects by reducing an array of keys in obj1, having the
 * keys in obj2 as the initial value of the result. Key points:
 *
 * — All keys of obj2 are initially in the result.
 *
 * — If the loop finds a key (from obj1, remember) not in obj2, it adds
 * it to the result.
 *
 * — If the loop finds a key that are both in obj1 and obj2, it compares
 * the value. If it’s the same value, the key is removed from the result.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getObjectDifference = (obj1: any, obj2: any) => {
  const diff = Object.keys(obj1).reduce((result, key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj2.hasOwnProperty(key)) {
      result.push(key)
    }
    return result
  }, Object.keys(obj2))
  return Object.fromEntries(
    diff.map(key => {
      return [key, obj2[key]]
    })
  )
}

export const objectToQueryUrl = (
  obj: object,
  callback?: (key: string, value: any) => string
): string | null => {
  return Object.entries(obj)
    .filter(val => val[1] !== null)
    .map(([key, val]) => {
      if (callback) {
        return callback(key, val) || `${key}=${val}`
      }

      return `${key}=${val}`
    })
    .join('&')
}

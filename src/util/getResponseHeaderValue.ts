import CryptoJS from 'crypto-js'

export const getContentDisposition = (headers: {}): string => {
  if ('content-disposition' in headers) {
    const headersArray: any = headers['content-disposition']

    return (
      headersArray
        .split(';')[1]
        .split('=')[1]
        .replace('"', '')
        .replace('"', '') || ''
    )
  }

  return null
}

export const getContentType = (headers: {}): string | null => {
  if ('content-type' in headers) {
    const headersArray: string = headers['content-type']

    const types = headersArray.split('/')
    if (types.length < 1) return null

    let type = null
    if (types.length === 2) type = types.pop()
    else type = types[0] || ''

    return type
  }

  return null
}

export const getFilename = (headers: {}): string => {
  const filename = getContentDisposition(headers)
  const type = getContentType(headers)

  return filename || CryptoJS.MD5(new Date().toISOString()) + '.' + type
}

export const formatPascalCase = (text: string): string =>
  text.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase()
  })

export const formatCpfCnpj = (value: string | number): string => {
  if (!value) return ''

  const cpfCnpj = value.toString()
  if (cpfCnpj.length === 11) {
    return cpfCnpj
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
  } else if (cpfCnpj.length === 14)
    return cpfCnpj
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')

  return cpfCnpj
}

export const formatTelephone = (value: string | number): string => {
  if (!value) return ''

  value = value.toString().replace(/\D/g, '')
  // Coloca parênteses em volta dos dois primeiros dígitos
  value = value.replace(/^(\d\d)(\d)/g, '($1) $2')
  // Número com 8 dígitos. Formato: (99) 9999-9999
  if (value.length < 14) value = value.replace(/(\d{4})(\d)/, '$1-$2')
  // Número com 9 dígitos. Formato: (99) 99999-9999
  else value = value.replace(/(\d{5})(\d)/, '$1-$2')

  return value
}

export const formatDecimal = (
  value: number,
  numberOfDecimalPlaces = 2
): string => {
  return value?.toLocaleString('pt-BR', {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: numberOfDecimalPlaces,
    maximumFractionDigits: numberOfDecimalPlaces,
  })
}

export const formatMoney = (value: number): string => {
  return value?.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export const formatPercent = (value: number): string => {
  return value?.toLocaleString('pt-BR', {
    style: 'percent',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const formatCep = (numberCep: string): string => {
  if (!numberCep) return ''
  const cep = numberCep.replace(/\D/g, '')

  return cep.replace(/(\d{5})(\d{3})/g, '$1-$2')
}

export const getOnlyNumbers = (value: string): string => {
  return value.replace(/\D/g, '')
}

export const getFirstLetter = (text: string): string | null => {
  const firstLetter = text
    ?.split(' ')
    ?.filter((value, index) => index === 0 && value.trim() !== '')
    ?.map(item => item[0])
    ?.toString()

  return firstLetter || ''
}

export const getOnlyNumbersAndLetters = (
  value: string,
  allowEspace = true
): string => {
  if (!allowEspace) return value.replace(/[^a-zA-Z0-9]/, '')

  return value.replace(/[^a-zA-Z0-9]/, '')
}

export const leftPad = (
  value: string | number,
  totalWidth = 8,
  paddingChar = '0'
): string => {
  if (!value) return ''

  const length = totalWidth - value.toString().length + 1
  return Array(length).join(paddingChar) + value
}

export const leftSpace = (value: string, size: number): string => {
  if (!value) return ''

  return Array(size).join('⠀') + value
}

export const removeMask = (value: string): string => {
  return value?.replace(/[^0-9]+/g, '')
}

export const b64EncodeUnicode = (str: string): string => {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(Number(`0x${p1}`))
    })
  )
}

export const toBase64 = (content: string): string => {
  return typeof window === 'undefined'
    ? Buffer.from(content).toString('base64')
    : window.btoa(content)
}
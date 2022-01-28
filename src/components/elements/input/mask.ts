import { formatTelephone } from './../../../util/stringUtil'

export const cep = (
  e: React.FormEvent<HTMLInputElement>
): React.FormEvent<HTMLInputElement> => {
  e.currentTarget.maxLength = 9

  let value = e?.currentTarget?.value
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{5})(\d)/, '$1-$2')
  e.currentTarget.value = value

  return e
}

export const currency = (
  e: React.FormEvent<HTMLInputElement>,
  input?: HTMLInputElement
): React.FormEvent<HTMLInputElement> => {
  let value = e?.currentTarget?.value || input?.value || ''

  // value = formatDecimal(Number(value))
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d)(\d{2})$/, '$1,$2')
  // value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
  if (value.length > 6) {
    value = value.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
}
  if (e) e.currentTarget.value = value
  if (input) input.value = value
  return e
}

export const currencyNegative = ( 
  e: React.FormEvent<HTMLInputElement>,
  input?: HTMLInputElement
): React.FormEvent<HTMLInputElement> => {

  let value = e?.currentTarget?.value || input?.value || ''

  let tmp = value + '';
  let neg = false;

  if (tmp.indexOf(".")) {
      tmp = tmp.replace(".", "");
  }

  if (tmp.indexOf("-") == 0) {
      neg = true;
      tmp = tmp.replace("-", "");
  }

  tmp = tmp.replace(/\D/g, '')
  tmp = tmp.replace(/(\d)(\d{2})$/, '$1,$2')
  // value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
  if (tmp.length > 6) {
    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }

  e.currentTarget.value = (neg ? '-' + tmp : tmp);
  return e
  }            

export const currencyModal = (
  e: React.FormEvent<HTMLInputElement>,
  input?: HTMLInputElement
): React.FormEvent<HTMLInputElement> => {
  let value = e?.currentTarget?.value || input?.value || ''

  // value = formatDecimal(Number(value))
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d)(\d{2})$/, '$1,$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')
  if (e) e.currentTarget.value = value
  if (input) input.value = value
  return e
}

export const cpfCnpj = (
  e: React.FormEvent<HTMLInputElement>,
  input?: HTMLInputElement
): React.FormEvent<HTMLInputElement> => {
  if (e) e.currentTarget.maxLength = 18
  if (input) input.maxLength = 18

  let value = e?.currentTarget?.value || input?.value || ''

  if (value.length <= 14) {
    if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
      value = value.replace(/\D/g, '')
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d{2})$/, '$1-$2')
      if (e) e.currentTarget.value = value
      if (input) input.value = value
    }
  } else if (value.length > 14) {
    value = value.replace(/\D/g, '')
    value = value.replace(/^(\d{2})(\d)/, '$1.$2')

    // Coloca ponto entre o quinto e o sexto dígitos
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')

    // Coloca uma barra entre o oitavo e o nono dígitos
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2')

    // Coloca um hífen depois do bloco de quatro dígitos
    value = value.replace(/(\d{4})(\d)/, '$1-$2')
    if (e) e.currentTarget.value = value
    if (input) input.value = value
  }
  // e.currentTarget.value = value

  return e
}

export const telephone = (
  e: React.FormEvent<HTMLInputElement>,
  input?: HTMLInputElement
): React.FormEvent<HTMLInputElement> => {
  if (e) e.currentTarget.maxLength = 15
  if (input) input.maxLength = 15

  const value = e?.currentTarget?.value || input?.value || ''
  if (e) e.currentTarget.value = formatTelephone(value)
  if (input) input.value = formatTelephone(value)
  return e
}

export const number = (
  e: React.FormEvent<HTMLInputElement>,
  input?: HTMLInputElement,
  maxLength?: number
): React.FormEvent<HTMLInputElement> => {
  if (e) e.currentTarget.maxLength = maxLength || 9
  if (input) input.maxLength = maxLength || 9

  let value = e?.currentTarget?.value || input?.value || ''
  value = value.replace(/\D/g, '')
  if (e) e.currentTarget.value = value
  if (input) input.value = value
  return e
}

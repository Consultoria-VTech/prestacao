import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type ContaBancariaInputs = {
  id: FieldProps<number>
  idBanco: FieldProps<number>
  agencia: FieldProps<number>
  agenciaDv: FieldProps<number>
  conta: FieldProps<number>
  contaDv: FieldProps<number>
  tipo: FieldProps<string>
  ativo: FieldProps<string | null>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ContaBancariaInputs => {
  return {
    id: {
      field: getFieldProps('id'),
      isInvalid: false,
    },
    idBanco: {
      field: getFieldProps('idBanco'),
      isInvalid: false,
    },
    agencia: {
      field: getFieldProps('agencia'),
      isInvalid:
        get(touched, 'agencia') &&
        get(errors, 'agencia') &&
        errors.agencia !== '',
    },
    agenciaDv: {
      field: getFieldProps('agenciaDv'),
      isInvalid:
        get(touched, 'agenciaDv') &&
        get(errors, 'agenciaDv') &&
        errors.agenciaDv !== '',
    },
    conta: {
      field: getFieldProps('conta'),
      isInvalid:
        get(touched, 'conta') && get(errors, 'conta') && errors.conta !== '',
    },
    contaDv: {
      field: getFieldProps('contaDv'),
      isInvalid:
        get(touched, 'contaDv') &&
        get(errors, 'contaDv') &&
        errors.contaDv !== '',
    },
    tipo: {
      field: getFieldProps('tipo'),
      isInvalid:
        get(touched, 'tipo') && get(errors, 'tipo') && errors.tipo !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid:
        get(touched, 'ativo') && get(errors, 'ativo') && errors.ativo !== '',
    },
  }
}

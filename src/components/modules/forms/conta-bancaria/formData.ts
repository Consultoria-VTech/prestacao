import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { Banco } from '../../../../types/models/banco'

type ContaBancariaInputs = {
  id: FieldProps<number>
  banco: FieldProps<Banco>
  agencia: FieldProps<number>
  agenciaDv: FieldProps<number>
  conta: FieldProps<number>
  contaDv: FieldProps<number>
  tipo: FieldProps<string>
  tipo_pessoa: FieldProps<string>
  ativo: FieldProps<boolean>
  observacao: FieldProps<string>
  saldoinicial: FieldProps<string>
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
    banco: {
      field: getFieldProps('banco'),
      isInvalid:
        get(touched, 'banco') && get(errors, 'banco') && errors.banco !== '',
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
    saldoinicial: {
      field: getFieldProps('saldoinicial'),
      isInvalid:
        get(touched, 'saldoinicial') &&
        get(errors, 'saldoinicial') &&
        errors.saldoinicial !== '',
    },
    tipo: {
      field: getFieldProps('tipo'),
      isInvalid:
        get(touched, 'tipo') && get(errors, 'tipo') && errors.tipo !== '',
    },
    tipo_pessoa: {
      field: getFieldProps('tipo_pessoa'),
      isInvalid:
        get(touched, 'tipo_pessoa') && get(errors, 'tipo_pessoa') && errors.tipo_pessoa !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid:
        get(touched, 'ativo') && get(errors, 'ativo') && errors.ativo !== '',
    },
    observacao: {
      field: getFieldProps('observacao'),
      isInvalid: false,
    },
  }
}

import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type ClienteFiltroInputs = {
  idempresa: FieldProps<number>
  id: FieldProps<number>
  nome: FieldProps<string>
  cnpj: FieldProps<string>
  filial: FieldProps<string>
  ativo: FieldProps<string | null>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ClienteFiltroInputs => {
  return {
    idempresa: {
      field: getFieldProps('idempresa'),
      isInvalid: false,
    },
    id: {
      field: getFieldProps('id'),
      isInvalid: false,
    },
    nome: {
      field: getFieldProps('nome'),
      isInvalid:
        get(touched, 'nome') && get(errors, 'nome') && errors.nome !== '',
    },
    cnpj: {
      field: getFieldProps('cnpj'),
      isInvalid:
        get(touched, 'cnpj') && get(errors, 'cnpj') && errors.cnpj !== '',
    },
    filial: {
      field: getFieldProps('filial'),
      isInvalid:
        get(touched, 'filial') && get(errors, 'filial') && errors.filial !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid: false,
    },
  }
}

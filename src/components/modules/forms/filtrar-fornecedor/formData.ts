import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type FornecedorFiltroInputs = {
  idempresa: FieldProps<number>
  id: FieldProps<number>
  nome: FieldProps<string>
  cnpj: FieldProps<string>
  ativo: FieldProps<string | null>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): FornecedorFiltroInputs => {
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

    ativo: {
      field: getFieldProps('ativo'),
      isInvalid: false,
    },
  }
}

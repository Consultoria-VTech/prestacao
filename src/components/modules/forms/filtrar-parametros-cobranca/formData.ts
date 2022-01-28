import { DataForm, FieldProps } from '../../../../types/formProps'

type ParametrosCobrancaInputs = {
  id: FieldProps<number>
  descricao: FieldProps<string>
  tipo: FieldProps<string | null>
  ativo: FieldProps<string | null>
  idempresa: FieldProps<number>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ParametrosCobrancaInputs => {
  return {
    id: {
      field: getFieldProps('id'),
      isInvalid: false,
    },
    descricao: {
      field: getFieldProps('descricao'),
      isInvalid: false,
    },

    tipo: {
      field: getFieldProps('tipo'),
      isInvalid: false,
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid: false,
    },
    idempresa: {
      field: getFieldProps('idempresa'),
      isInvalid: false,
    },
  }
}

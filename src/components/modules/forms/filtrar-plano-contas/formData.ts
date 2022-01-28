import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type CentroCustoFiltroInputs = {
  idempresa: FieldProps<number>
  id: FieldProps<number>
  descricao: FieldProps<string>
  ativo: FieldProps<string | null>
  idPlanoContasSintetica: FieldProps<number>
  receitaOuDespesa: FieldProps<string | null>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): CentroCustoFiltroInputs => {
  return {
    idempresa: {
      field: getFieldProps('idempresa'),
      isInvalid: false,
    },
    id: {
      field: getFieldProps('id'),
      isInvalid: false,
    },
    descricao: {
      field: getFieldProps('descricao'),
      isInvalid:
        get(touched, 'descricao') &&
        get(errors, 'descricao') &&
        errors.descricao !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid: false,
    },
    idPlanoContasSintetica: {
      field: getFieldProps('idPlanoContasSintetica'),
      isInvalid: false,
    },
    receitaOuDespesa: {
      field: getFieldProps('receitaOuDespesa'),
      isInvalid: false,
    },
  }
}

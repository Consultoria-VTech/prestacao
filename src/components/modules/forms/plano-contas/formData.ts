import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { PlanoContas } from '../../../../types/models/planoContas'

type PlanoContasInputs = {
  id: FieldProps<number>
  descricao: FieldProps<string>
  planoContasSintetica: FieldProps<PlanoContas>
  receitaOuDespesa: FieldProps<number>
  ativo: FieldProps<boolean>
  observacao: FieldProps<string>
  nconta: FieldProps<string>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): PlanoContasInputs => {
  return {
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
    planoContasSintetica: {
      field: getFieldProps('planoContasSintetica'),
      isInvalid:
        get(touched, 'planoContasSintetica') &&
        get(errors, 'planoContasSintetica') &&
        errors.planoContasSintetica !== '',
    },
    receitaOuDespesa: {
      field: getFieldProps('receitaOuDespesa'),
      isInvalid:
        get(touched, 'receitaOuDespesa') &&
        get(errors, 'receitaOuDespesa') &&
        errors.receitaOuDespesa !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid:
        get(touched, 'ativo') && get(errors, 'ativo') && errors.ativo !== '',
    },
    observacao: {
      field: getFieldProps('observacao'),
      isInvalid:
        get(touched, 'observacao') &&
        get(errors, 'observacao') &&
        errors.observacao !== '',
    },
    nconta: {
      field: getFieldProps('nconta'),
      isInvalid:
        get(touched, 'nconta') &&
        get(errors, 'nconta') &&
        errors.nconta !== '',
    },
  }
}

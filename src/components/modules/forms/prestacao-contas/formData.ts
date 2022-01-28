import { Contrato, Funcionario, Projeto, ProjetoSituacaoEnum } from '@types'
import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type PrestacaoContasInputs = {
  id: FieldProps<number>
  observacao: FieldProps<string>
  contrato: FieldProps<Contrato>
  dtEmissao: FieldProps<string>
  funcionario: FieldProps<Funcionario>
  projeto: FieldProps<Projeto>
  situacao: FieldProps<ProjetoSituacaoEnum>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): PrestacaoContasInputs => {
  return {
    id: {
      field: getFieldProps('id'),
      isInvalid: get(touched, 'id') && get(errors, 'id') && errors.id !== '',
    },
    observacao: {
      field: getFieldProps('observacao'),
      isInvalid:
        get(touched, 'observacao') &&
        get(errors, 'observacao') &&
        errors.observacao !== '',
    },
    contrato: {
      field: getFieldProps('contrato'),
      isInvalid:
        get(touched, 'contrato') &&
        get(errors, 'contrato') &&
        errors.contrato !== '',
    },
    funcionario: {
      field: getFieldProps('funcionario'),
      isInvalid:
        get(touched, 'funcionario') &&
        get(errors, 'funcionario') &&
        errors.funcionario !== '',
    },
    projeto: {
      field: getFieldProps('projeto'),
      isInvalid:
        get(touched, 'projeto') &&
        get(errors, 'projeto') &&
        errors.projeto !== '',
    },
    dtEmissao: {
      field: getFieldProps('dtEmissao'),
      isInvalid:
        get(touched, 'dtEmissao') &&
        get(errors, 'dtEmissao') &&
        errors.dtEmissao !== '',
    },
    situacao: {
      field: getFieldProps('situacao'),
      isInvalid:
        get(touched, 'situacao') &&
        get(errors, 'situacao') &&
        errors.situacao !== '',
    },
  }
}
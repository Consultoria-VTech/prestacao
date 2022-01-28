import { Contrato, ProjetoSituacaoEnum } from '@types'
import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type ProjetoInputs = {
  id: FieldProps<number>
  descricao: FieldProps<string>
  contrato: FieldProps<Contrato>
  dtInicio: FieldProps<string>
  dtFinalizacao: FieldProps<string>
  limiteAlmoco: FieldProps<string>
  limiteKm: FieldProps<string>
  situacao: FieldProps<ProjetoSituacaoEnum>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ProjetoInputs => {
  return {
    id: {
      field: getFieldProps('id'),
      isInvalid: get(touched, 'id') && get(errors, 'id') && errors.id !== '',
    },
    descricao: {
      field: getFieldProps('descricao'),
      isInvalid:
        get(touched, 'descricao') &&
        get(errors, 'descricao') &&
        errors.descricao !== '',
    },
    contrato: {
      field: getFieldProps('contrato'),
      isInvalid:
        get(touched, 'contrato') &&
        get(errors, 'contrato') &&
        errors.contrato !== '',
    },
    dtInicio: {
      field: getFieldProps('dtInicio'),
      isInvalid:
        get(touched, 'dtInicio') &&
        get(errors, 'dtInicio') &&
        errors.dtInicio !== '',
    },
    dtFinalizacao: {
      field: getFieldProps('dtFinalizacao'),
      isInvalid:
        get(touched, 'dtFinalizacao') &&
        get(errors, 'dtFinalizacao') &&
        errors.dtFinalizacao !== '',
    },
    limiteAlmoco: {
      field: getFieldProps('limiteAlmoco'),
      isInvalid:
        get(touched, 'limiteAlmoco') &&
        get(errors, 'limiteAlmoco') &&
        errors.limiteAlmoco !== '',
    },
    limiteKm: {
      field: getFieldProps('limiteKm'),
      isInvalid:
        get(touched, 'limiteKm') &&
        get(errors, 'limiteKm') &&
        errors.limiteKm !== '',
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
import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { PrestacaoDespesaTipoReembolso, PrestacaoDespesaStatus } from '../../../../types/models/prestacaoDespesa'
import { PrestacaoContas } from '../../../../types/models/prestacaoContas'

type PrestacaoDespesaInputs = {
  id: FieldProps<number>
  observacao: FieldProps<string>
  descricao: FieldProps<string>
  quilometragem: FieldProps<string>
  status: FieldProps<PrestacaoDespesaStatus>
  prestacaoContas: FieldProps<PrestacaoContas>
  tipoReembolso: FieldProps<PrestacaoDespesaTipoReembolso>
  valor: FieldProps<string>
  dtDespesa: FieldProps<string>
  comprovante: FieldProps<File>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): PrestacaoDespesaInputs => {
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
    quilometragem: {
      field: getFieldProps('quilometragem'),
      isInvalid:
        get(touched, 'quilometragem') &&
        get(errors, 'quilometragem') &&
        errors.quilometragem !== '',
    },
    descricao: {
      field: getFieldProps('descricao'),
      isInvalid:
        get(touched, 'descricao') &&
        get(errors, 'descricao') &&
        errors.descricao !== '',
    },
    prestacaoContas: {
      field: getFieldProps('prestacaoContas'),
      isInvalid:
        get(touched, 'prestacaoContas') &&
        get(errors, 'prestacaoContas') &&
        errors.prestacaoContas !== '',
    },
    tipoReembolso: {
      field: getFieldProps('tipoReembolso'),
      isInvalid:
        get(touched, 'tipoReembolso') &&
        get(errors, 'tipoReembolso') &&
        errors.tipoReembolso !== '',
    },
    valor: {
      field: getFieldProps('valor'),
      isInvalid:
        get(touched, 'valor') && get(errors, 'valor') && errors.valor !== '',
    },
    dtDespesa: {
      field: getFieldProps('dtDespesa'),
      isInvalid:
        get(touched, 'dtDespesa') &&
        get(errors, 'dtDespesa') &&
        errors.dtDespesa !== '',
    },
    status: {
      field: getFieldProps('status'),
      isInvalid:
        get(touched, 'status') && get(errors, 'status') && errors.status !== '',
    },
    comprovante: {
      field: getFieldProps('comprovante'),
      isInvalid:
        get(touched, 'comprovante') &&
        get(errors, 'comprovante') &&
        errors.comprovante !== '',
    },
  }
}
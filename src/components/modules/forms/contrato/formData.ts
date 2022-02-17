import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { CentroCusto } from '../../../../types/models/centroCusto'
import { Cliente } from '../../../../types/models/cliente'
import { ContratoTipoEnum } from '../../../../types/models/contrato'
import { Fornecedor } from '../../../../types/models/fornecedor'

type ContratoInputs = {
  id: FieldProps<number>
  cliente: FieldProps<Cliente>
  fornecedor: FieldProps<Fornecedor>
  centroCusto: FieldProps<CentroCusto>
  observacao: FieldProps<string>
  dtEmissao: FieldProps<string>
  dtVencimento: FieldProps<string>
  valor: FieldProps<string>
  status: FieldProps<string>
  nparcelas: FieldProps<number>
  tipo: FieldProps<ContratoTipoEnum>
  parcelas: FieldProps<string>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ContratoInputs => {
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
    centroCusto: {
      field: getFieldProps('centroCusto'),
      isInvalid:
        get(touched, 'centroCusto') &&
        get(errors, 'centroCusto') &&
        errors.centroCusto !== '',
    },
    cliente: {
      field: getFieldProps('cliente'),
      isInvalid:
        get(touched, 'cliente') &&
        get(errors, 'cliente') &&
        errors.cliente !== '',
    },
    fornecedor: {
      field: getFieldProps('fornecedor'),
      isInvalid:
        get(touched, 'fornecedor') &&
        get(errors, 'fornecedor') &&
        errors.fornecedor !== '',
    },
    valor: {
      field: getFieldProps('valor'),
      isInvalid:
        get(touched, 'valor') && get(errors, 'valor') && errors.valor !== '',
    },
    dtEmissao: {
      field: getFieldProps('dtEmissao'),
      isInvalid:
        get(touched, 'dtEmissao') &&
        get(errors, 'dtEmissao') &&
        errors.dtEmissao !== '',
    },
    dtVencimento: {
      field: getFieldProps('dtVencimento'),
      isInvalid:
        get(touched, 'dtVencimento') &&
        get(errors, 'dtVencimento') &&
        errors.dtVencimento !== '',
    },
    status: {
      field: getFieldProps('status'),
      isInvalid:
        get(touched, 'status') && get(errors, 'status') && errors.status !== '',
    },
    nparcelas: {
      field: getFieldProps('nparcelas'),
      isInvalid:
        get(touched, 'nparcelas') &&
        get(errors, 'nparcelas') &&
        errors.nparcelas !== '',
    },
    tipo: {
      field: getFieldProps('tipo'),
      isInvalid:
        get(touched, 'tipo') && get(errors, 'tipo') && errors.tipo !== '',
    },
    parcelas: {
      field: getFieldProps('parcelas'),
      isInvalid:
        get(touched, 'parcelas') && get(errors, 'parcelas') && errors.parcelas !== '',
    },
  }
}

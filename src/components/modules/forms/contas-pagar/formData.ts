import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { Fornecedor } from '../../../../types/models/fornecedor'
import { PlanoContas } from '../../../../types/models/planoContas'
import { Contrato } from '../../../../types/models/contrato'
import { CentroCusto } from '../../../../types/models/centroCusto'

type ContasPagarInputs = {
  planoContas: FieldProps<PlanoContas>
  fornecedor: FieldProps<Fornecedor>
  centroCusto: FieldProps<CentroCusto>
  // contaBancaria: FieldProps<ContaBancaria>
  contrato: FieldProps<Contrato>
  valor: FieldProps<string>
  dtEmissao: FieldProps<string>
  dtVencimento: FieldProps<string>
  tipoDoc: FieldProps<string>
  nDoc: FieldProps<string>
  nParcelas: FieldProps<string>
  parcelas: FieldProps<string>
  comprovante: FieldProps<File>
  
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ContasPagarInputs => {
  return {
    planoContas: {
      field: getFieldProps('planoContas'),
      isInvalid:
        get(touched, 'planoContas') &&
        get(errors, 'planoContas') &&
        errors.planoContas !== '',
    },
    fornecedor: {
      field: getFieldProps('fornecedor'),
      isInvalid:
        get(touched, 'fornecedor') &&
        get(errors, 'fornecedor') &&
        errors.fornecedor !== '',
    },
    centroCusto: {
      field: getFieldProps('centroCusto'),
      isInvalid:
        get(touched, 'centroCusto') &&
        get(errors, 'centroCusto') &&
        errors.centroCusto !== '',
    },
    contrato: {
      field: getFieldProps('contrato'),
      isInvalid:
        get(touched, 'contrato') &&
        get(errors, 'contrato') &&
        errors.contrato !== '',
    },
    // contaBancaria: {
    //   field: getFieldProps('contaBancaria'),
    //   isInvalid:
    //     get(touched, 'contaBancaria') &&
    //     get(errors, 'contaBancaria') &&
    //     errors.contaBancaria !== '',
    // },
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
    tipoDoc: {
      field: getFieldProps('tipoDoc'),
      isInvalid:
        get(touched, 'tipoDoc') &&
        get(errors, 'tipoDoc') &&
        errors.tipoDoc !== '',
    },
    nDoc: {
      field: getFieldProps('nDoc'),
      isInvalid:
        get(touched, 'nDoc') && get(errors, 'nDoc') && errors.nDoc !== '',
    },
    nParcelas: {
      field: getFieldProps('nParcelas'),
      isInvalid:
        get(touched, 'nParcelas') &&
        get(errors, 'nParcelas') &&
        errors.nParcelas !== '',
    },
    parcelas: {
      field: getFieldProps('parcelas'),
      isInvalid:
        get(touched, 'parcelas') &&
        get(errors, 'parcelas') &&
        errors.parcelas !== '',
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

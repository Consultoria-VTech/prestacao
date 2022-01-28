import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { Cliente } from '../../../../types/models/cliente'
import { Contrato } from '../../../../types/models/contrato'
import { PlanoContas } from '../../../../types/models/planoContas'
import { CentroCusto } from '../../../../types/models/centroCusto'

type ContasReceberInputs = {
  planoContas: FieldProps<PlanoContas>
  cliente: FieldProps<Cliente>
  contrato: FieldProps<Contrato>
  centroCusto: FieldProps<CentroCusto>
  // contaBancaria: FieldProps<ContaBancaria>
  valor: FieldProps<string>
  dtEmissao: FieldProps<string>
  dtVencimento: FieldProps<string>
  tipoDoc: FieldProps<string>
  nDoc: FieldProps<string>
  nParcelas: FieldProps<string>
  comprovante: FieldProps<File>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): ContasReceberInputs => {
  return {
    planoContas: {
      field: getFieldProps('planoContas'),
      isInvalid:
        get(touched, 'planoContas') &&
        get(errors, 'planoContas') &&
        errors.planoContas !== '',
    },
    cliente: {
      field: getFieldProps('cliente'),
      isInvalid:
        get(touched, 'cliente') &&
        get(errors, 'cliente') &&
        errors.cliente !== '',
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
    comprovante: {
      field: getFieldProps('comprovante'),
      isInvalid:
        get(touched, 'comprovante') &&
        get(errors, 'comprovante') &&
        errors.comprovante !== '',
    },
  }
}

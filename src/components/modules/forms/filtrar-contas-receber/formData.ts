import { DataForm, FieldProps } from '../../../../types/formProps'

type ContasReceberInputs = {
  idPlanoContas: FieldProps<number>
  idCliente: FieldProps<number>
  idContrato: FieldProps<number>
  dtEmissaoInicial: FieldProps<string>
  dtEmissaoFinal: FieldProps<string>
  dtVencimentoInicial: FieldProps<string>
  dtVencimentoFinal: FieldProps<string>
  tipoDoc: FieldProps<string>
  nDoc: FieldProps<string>
  status: FieldProps<string>
}

export const dataForm = ({ getFieldProps }: DataForm): ContasReceberInputs => {
  return {
    idPlanoContas: {
      field: getFieldProps('idPlanoContas'),
    },
    idCliente: {
      field: getFieldProps('idCliente'),
    },
    idContrato: {
      field: getFieldProps('idContrato'),
    },
    dtEmissaoInicial: {
      field: getFieldProps('dtEmissaoInicial'),
    },
    dtEmissaoFinal: {
      field: getFieldProps('dtEmissaoFinal'),
    },
    dtVencimentoInicial: {
      field: getFieldProps('dtVencimentoInicial'),
    },
    dtVencimentoFinal: {
      field: getFieldProps('dtVencimentoFinal'),
    },
    tipoDoc: {
      field: getFieldProps('tipoDoc'),
    },
    nDoc: {
      field: getFieldProps('nDoc'),
    },
    status: {
      field: getFieldProps('status'),
    },
  }
}

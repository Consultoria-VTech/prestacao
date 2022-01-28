import { DataForm, FieldProps } from '../../../../types/formProps'

type ContasPagarInputs = {
  natureza: FieldProps<number>
  fornecedor: FieldProps<number>
  dtEmissaoInicial: FieldProps<string>
  dtEmissaoFinal: FieldProps<string>
  dtVencimentoInicial: FieldProps<string>
  dtVencimentoFinal: FieldProps<string>
  tipoDoc: FieldProps<string>
  nDoc: FieldProps<string>
  status: FieldProps<string>
}

export const dataForm = ({ getFieldProps }: DataForm): ContasPagarInputs => {
  return {
    natureza: {
      field: getFieldProps('natureza'),
    },
    fornecedor: {
      field: getFieldProps('fornecedor'),
    },
    // centroCusto: {
    //   field: getFieldProps('centroCusto'),
    // },
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

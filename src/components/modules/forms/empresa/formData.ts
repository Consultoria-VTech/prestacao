import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type EmpresaInputs = {
  id: FieldProps<number>
  razao: FieldProps<string>
  cnpj: FieldProps<string>
  ie: FieldProps<string>

  cep: FieldProps<string>
  endereco: FieldProps<string>
  cidade: FieldProps<string>
  estado: FieldProps<string>
  numero: FieldProps<number>
  bairro: FieldProps<string>
  complemento: FieldProps<string>
  telefone: FieldProps<string>
  email: FieldProps<string>
  observacao: FieldProps<string>
  ativo: FieldProps<boolean>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): EmpresaInputs => {
  return {
    id: {
      field: getFieldProps('id'),
      isInvalid: false,
    },
    razao: {
      field: getFieldProps('razao'),
      isInvalid:
        get(touched, 'razao') && get(errors, 'razao') && errors.razao !== '',
    },
    cnpj: {
      field: getFieldProps('cnpj'),
      isInvalid:
        get(touched, 'cnpj') && get(errors, 'cnpj') && errors.cnpj !== '',
    },
    ie: {
      field: getFieldProps('ie'),
      isInvalid: get(touched, 'ie') && get(errors, 'ie') && errors.cnpj !== '',
    },
    cep: {
      field: getFieldProps('cep'),
      isInvalid: get(touched, 'cep') && get(errors, 'cep') && errors.cep !== '',
    },
    endereco: {
      field: getFieldProps('endereco'),
      isInvalid:
        get(touched, 'endereco') &&
        get(errors, 'endereco') &&
        errors.endereco !== '',
    },
    cidade: {
      field: getFieldProps('cidade'),
      isInvalid: false,
      // get(touched, 'cidade') && get(errors, 'cidade') && errors.cidade !== '',
    },
    estado: {
      field: getFieldProps('estado'),
      isInvalid: false,
      // get(touched, 'estado') && get(errors, 'estado') && errors.estado !== '',
    },
    numero: {
      field: getFieldProps('numero'),
      isInvalid:
        get(touched, 'numero') && get(errors, 'numero') && errors.numero !== '',
    },
    bairro: {
      field: getFieldProps('bairro'),
      isInvalid:
        get(touched, 'bairro') && get(errors, 'bairro') && errors.bairro !== '',
    },
    complemento: {
      field: getFieldProps('complemento'),
      isInvalid:
        get(touched, 'complemento') &&
        get(errors, 'complemento') &&
        errors.complemento !== '',
    },
    telefone: {
      field: getFieldProps('telefone'),
      isInvalid:
        get(touched, 'telefone') &&
        get(errors, 'telefone') &&
        errors.telefone !== '',
    },
    email: {
      field: getFieldProps('email'),
      isInvalid:
        get(touched, 'email') && get(errors, 'email') && errors.email !== '',
    },
    observacao: {
      field: getFieldProps('observacao'),
      isInvalid:
        get(touched, 'observacao') &&
        get(errors, 'observacao') &&
        errors.observacao !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid:
        get(touched, 'ativo') && get(errors, 'ativo') && errors.ativo !== '',
    },
  }
}
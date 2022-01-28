import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type FornecedorInputs = {
  empresa: FieldProps<number>
  id: FieldProps<number>
  razao: FieldProps<string>
  cnpj: FieldProps<string>
  cep: FieldProps<string>
  endereco: FieldProps<string>
  cidade: FieldProps<string>
  estado: FieldProps<string>
  numero: FieldProps<number>
  bairro: FieldProps<string>
  complemento: FieldProps<string>
  telefone: FieldProps<string>
  email: FieldProps<string>
  telefone2: FieldProps<string>
  email2: FieldProps<string>
  telefone3: FieldProps<string>
  email3: FieldProps<string>
  observacao: FieldProps<string>
  ativo: FieldProps<boolean>
  filial: FieldProps<string>
  idpessoa: FieldProps<number>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): FornecedorInputs => {
  return {
    empresa: {
      field: getFieldProps('empresa'),
      isInvalid: false,
    },
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
    telefone2: {
      field: getFieldProps('telefone2'),
      isInvalid:
        get(touched, 'telefone2') &&
        get(errors, 'telefone2') &&
        errors.telefone2 !== '',
    },
    email2: {
      field: getFieldProps('email2'),
      isInvalid:
        get(touched, 'email2') && get(errors, 'email2') && errors.email2 !== '',
    },
    telefone3: {
      field: getFieldProps('telefone3'),
      isInvalid:
        get(touched, 'telefone3') &&
        get(errors, 'telefone3') &&
        errors.telefone3 !== '',
    },
    email3: {
      field: getFieldProps('email3'),
      isInvalid:
        get(touched, 'email3') && get(errors, 'email3') && errors.email3 !== '',
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
    filial: {
      field: getFieldProps('filial'),
      isInvalid:
        get(touched, 'filial') && get(errors, 'filial') && errors.filial !== '',
    },
    idpessoa: {
      field: getFieldProps('idpessoa'),
      isInvalid: false,
    },
  }
}

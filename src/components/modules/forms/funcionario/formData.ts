import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { Empresa } from '../../../../types/models/empresa'

type FuncionarioInputs = {
  empresa: FieldProps<Empresa>
  id: FieldProps<number>
  nome: FieldProps<string>
  cpf: FieldProps<string>
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
  cargo: FieldProps<string>

  dtAdmissao: FieldProps<string>
  dtDemissao: FieldProps<string>
  fator: FieldProps<number>
  ativo: FieldProps<boolean>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): FuncionarioInputs => {
  return {
    empresa: {
      field: getFieldProps('empresa'),
      isInvalid: false,
    },
    id: {
      field: getFieldProps('id'),
      isInvalid: false,
    },
    nome: {
      field: getFieldProps('nome'),
      isInvalid:
        get(touched, 'nome') && get(errors, 'nome') && errors.nome !== '',
    },
    cpf: {
      field: getFieldProps('cpf'),
      isInvalid: get(touched, 'cpf') && get(errors, 'cpf') && errors.cpf !== '',
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
    cargo: {
      field: getFieldProps('cargo'),
      isInvalid:
        get(touched, 'cargo') && get(errors, 'cargo') && errors.cargo !== '',
    },
    dtAdmissao: {
      field: getFieldProps('dtAdmissao'),
      isInvalid:
        get(touched, 'dtAdmissao') &&
        get(errors, 'dtAdmissao') &&
        errors.dtAdmissao !== '',
    },
    dtDemissao: {
      field: getFieldProps('dtDemissao'),
      isInvalid:
        get(touched, 'dtDemissao') &&
        get(errors, 'dtDemissao') &&
        errors.dtDemissao !== '',
    },
    fator: {
      field: getFieldProps('fator'),
      isInvalid:
        get(touched, 'fator') && get(errors, 'fator') && errors.fator !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid:
        get(touched, 'ativo') && get(errors, 'ativo') && errors.ativo !== '',
    },
  }
}

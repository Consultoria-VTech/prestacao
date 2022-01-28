import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { Empresa } from '../../../../types/models/empresa'
import { UsuarioTipo } from '../../../../types/models/usuario'

type UsuarioInputs = {
  usuarioTipo: FieldProps<UsuarioTipo>
  nome: FieldProps<string>
  sobrenome: FieldProps<string>
  nomeUsuario: FieldProps<string>
  senha: FieldProps<string>
  repetirSenha: FieldProps<string>
  ativo: FieldProps<boolean>
  empresa: FieldProps<Empresa>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): UsuarioInputs => {
  return {
    usuarioTipo: {
      field: getFieldProps('usuarioTipo'),
      isInvalid:
        get(touched, 'usuarioTipo') &&
        get(errors, 'usuarioTipo') &&
        errors.usuarioTipo !== '',
    },
    empresa: {
      field: getFieldProps('empresa'),
      isInvalid:
        get(touched, 'empresa') &&
        get(errors, 'empresa') &&
        errors.empresa !== '',
    },
    nome: {
      field: getFieldProps('nome'),
      isInvalid:
        get(touched, 'nome') && get(errors, 'nome') && errors.nome !== '',
    },

    sobrenome: {
      field: getFieldProps('sobrenome'),
      isInvalid:
        get(touched, 'sobrenome') &&
        get(errors, 'sobrenome') &&
        errors.sobrenome !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid:
        get(touched, 'ativo') && get(errors, 'ativo') && errors.ativo !== '',
    },
    nomeUsuario: {
      field: getFieldProps('nomeUsuario'),
      isInvalid:
        get(touched, 'nomeUsuario') &&
        get(errors, 'nomeUsuario') &&
        errors.nomeUsuario !== '',
    },
    senha: {
      field: getFieldProps('senha'),
      isInvalid:
        get(touched, 'senha') && get(errors, 'senha') && errors.senha !== '',
    },
    repetirSenha: {
      field: getFieldProps('repetirSenha'),
      isInvalid:
        get(touched, 'repetirSenha') &&
        get(errors, 'repetirSenha') &&
        errors.repetirSenha !== '',
    },
  }
}
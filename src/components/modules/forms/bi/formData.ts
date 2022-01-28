import get from 'lodash/get'
import { EmpresaTipo } from '~/types/models/bi'
import { DataForm, FieldProps } from '../../../../types/formProps'

type BiInputs = {
  link: FieldProps<string>
  descricao: FieldProps<string>
  aplicacao: FieldProps<string>
  workspace: FieldProps<string>
  report: FieldProps<string>
  ativo: FieldProps<boolean>
  empresa: FieldProps<EmpresaTipo>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): BiInputs => {
  return {
    link: {
      field: getFieldProps('link'),
      isInvalid:
        get(touched, 'link') && 
        get(errors, 'link') && 
        errors.link !== '',
    },
    descricao: {
      field: getFieldProps('descricao'),
      isInvalid:
        get(touched, 'descricao') &&
        get(errors, 'descricao') &&
        errors.descricao !== '',
    },
    ativo: {
      field: getFieldProps('ativo'),
      isInvalid:
        get(touched, 'ativo') && 
        get(errors, 'ativo') && 
        errors.ativo !== '',
    },
    aplicacao: {
      field: getFieldProps('aplicacao'),
      isInvalid:
        get(touched, 'aplicacao') &&
        get(errors, 'aplicacao') &&
        errors.aplicacao !== '',
    },
    workspace: {
      field: getFieldProps('workspace'),
      isInvalid:
        get(touched, 'workspace') &&
        get(errors, 'workspace') &&
        errors.workspace !== '',
    },
    report: {
      field: getFieldProps('report'),
      isInvalid:
        get(touched, 'report') &&
        get(errors, 'report') &&
        errors.report !== '',
    },
    empresa: {
      field: getFieldProps('empresa'),
      isInvalid:
        get(touched, 'empresa') &&
        get(errors, 'empresa') &&
        errors.report !== '',
    },
  }
}
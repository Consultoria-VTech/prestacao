import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'
import { Projeto } from '../../../../types/models/projeto'
import { Tarefas } from '../../../../types/models/timeSheet'

type TimeSheetInputs = {
  projetos: FieldProps<Projeto>
  tarefas: FieldProps<Tarefas>
  hora: FieldProps<string>
  minuto: FieldProps<string>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,
}: DataForm): TimeSheetInputs => {
  return {
    projetos: {
      field: getFieldProps('projetos'),
      isInvalid:
        get(touched, 'projetos') &&
        get(errors, 'projetos') &&
        errors.fornecedor !== '',
    },
    tarefas: {
      field: getFieldProps('tarefas'),
      isInvalid:
        get(touched, 'tarefas') &&
        get(errors, 'tarefas') &&
        errors.tarefas !== '',
    },
    hora: {
      field: getFieldProps('hora'),
      isInvalid:
        get(touched, 'hora') && get(errors, 'hora') && errors.tarefas !== '',
    },
    minuto: {
      field: getFieldProps('minuto'),
      isInvalid:
        get(touched, 'minuto') &&
        get(errors, 'minuto') &&
        errors.tarefas !== '',
    },
  }
}
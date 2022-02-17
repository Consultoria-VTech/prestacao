import { PlanoContas, Usuario } from '@types'
import get from 'lodash/get'
import { DataForm, FieldProps } from '../../../../types/formProps'

type VincularUsuarioInputs = {
  usuario: FieldProps<Usuario>
}

export const dataForm = ({
  errors,
  touched,
  getFieldProps,

}: DataForm): VincularUsuarioInputs => {
  return { 
    usuario: {
      field: getFieldProps('usuario'),
      isInvalid:
        get(touched, 'usuario') && get(errors, 'usuario') && errors.usuario !== '',
    },
  }
}

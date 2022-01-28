import { useCallback } from 'react'
import * as Yup from 'yup'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({
        descricao: Yup.string()
          .required('Campo obrigatório!')
          .transform(v => (!v ? '' : v)),
      }),
    []
  )

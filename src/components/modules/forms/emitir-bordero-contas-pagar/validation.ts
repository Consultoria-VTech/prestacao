import { useCallback } from 'react'
import * as Yup from 'yup'
import { formatNumberPtBrToUs } from './../../../../util/numberUtil'

export const validation = (): any =>
  useCallback(
    () =>
      Yup.object().shape({ }),
    []
  )

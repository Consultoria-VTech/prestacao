import { FieldInputProps, FormikErrors, FormikTouched } from 'formik/dist/types'

export type FieldProps<T> = {
  field?: FieldInputProps<T>
  setField?: any
  isInvalid?: boolean
}

export type DataForm<T = any> = {
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>
  setFieldValue?: (name: string, value: T) => void
  errors?: FormikErrors<T>
  touched?: FormikTouched<T>
}

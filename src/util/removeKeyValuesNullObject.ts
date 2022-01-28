import _identity from 'lodash/identity'
import _pickBy from 'lodash/pickBy'

export const removeKeyValuesNullObject = (obj: object): object => {
  return _pickBy(obj, _identity)
}

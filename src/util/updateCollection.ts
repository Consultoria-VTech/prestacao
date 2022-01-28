import _find from 'lodash/find'
import _indexOf from 'lodash/indexOf'
import _remove from 'lodash/remove'

export const updateCollection = <T = any>(
  collection: T[],
  identificador: T,
  novoValor: T,
  excluir = false
): T => {
  if (excluir) {
    // Se for para excluir remove da lista
    _remove(collection, identificador)
  } else {
    const elemento = _find<T>(collection, identificador)

    if (!elemento) {
      // Se não encontrou Adiciona
      collection.push(novoValor)
    } else {
      // Se encontrou atualiza
      const index = _indexOf<T>(collection, elemento)
      collection.splice(index, 1, novoValor)
    }

    return elemento || novoValor
  }
}

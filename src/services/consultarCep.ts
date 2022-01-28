import cep, { CEP } from 'cep-promise'

export const ConsultarCep = async (cepValue: string | number): Promise<CEP> => {
  return await cep(cepValue)
}

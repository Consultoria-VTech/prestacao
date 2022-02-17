export const formatNumberPtBrToUs = (value: string | number): number | null => {
  try {
    if (!value) return null

    return Number(value.toString().replace(',', '.'))
  } catch (e) {
    console.error(e)
    return null
  }
}

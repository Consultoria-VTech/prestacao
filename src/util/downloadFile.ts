export const donwloadFile = (file: BlobPart[], filename: string): void => {
  if (!file || file.length < 1) return

  const blobFile = new Blob(file)
  const url = window.URL.createObjectURL(blobFile)

  const link = document.createElement('a')
  link.href = url

  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
}

import React, { useState } from 'react'
import { DropzoneOptions, useDropzone } from 'react-dropzone'
import { AiTwotoneDelete } from 'react-icons/ai'
import { FaDownload } from 'react-icons/fa'
import { donwloadFile } from './../../../util/downloadFile'
// import { Container } from './styles';
import Button, { BUTTON_STATE } from './../button/index'
import { Container, DropZoneStyled } from './styled'

// Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>
interface DropZonePreviewProps
  extends DropzoneOptions,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      | 'onChange'
      | 'accept'
      | 'onDragEnter'
      | 'onDragLeave'
      | 'onDragOver'
      | 'onDrop'
    > {
  onChange?: (files: File | File[] | null) => void
  messageError?: string
  isInvalid?: boolean
  multiFile?: boolean
  readonly?: boolean
  initialFiles?: File[]
  containerVisible?: boolean
  loading?: boolean
}

const bytesToSize = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'

  const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i))?.toFixed(0) + ' ' + sizes[i]
}

type DropZonePreviewListProps = {
  files: File[]
  readonly?: boolean
  onRemoveFile?: (filename: string) => void
}

const DropZonePreviewList: React.FC<DropZonePreviewListProps> = ({
  files = [],
  readonly,
  onRemoveFile,
}) => {
  return (
    <div className="pt-2">
      <div>
        {files.map(file => {
          return (
            <span className="text-sm fw-light" key={file.lastModified}>
              {file.name} {bytesToSize(file.size)}
              {!readonly && (
                <Button
                  tooltip="Remover"
                  className="btn btn-sm btn-light btn-outline-primary ms-2"
                  onClick={() => onRemoveFile && onRemoveFile(file.name)}>
                  <span>
                    <AiTwotoneDelete size={16} style={{ margin: 0 }} />
                  </span>
                </Button>
              )}
              <Button
                tooltip="Baixar"
                className={`btn btn-sm btn-light btn-outline-primary ${
                  readonly && 'ms-2'
                }`}
                onClick={() => donwloadFile([file], file.name)}>
                <span>
                  <FaDownload size={16} style={{ margin: 0 }} />
                </span>
              </Button>
            </span>
          )
        })}
      </div>
    </div>
  )
}

const DropZonePreviewDespesa: React.FC<DropZonePreviewProps> = ({
  required,
  placeholder,
  type,
  messageError,

  onChange,
  onBlur,
  name,
  value,
  isInvalid,
  readOnly,
  maxLength,
  multiFile = false,
  accept,
  readonly,
  initialFiles = [],
  containerVisible = true,
  loading = false,
}) => {
  const [files, setFiles] = useState<File[]>(initialFiles)

  const onDrop = React.useCallback(
    acceptedFiles => {
      const allFiles = [...files, ...acceptedFiles]
      if (!multiFile) setFiles(acceptedFiles)
      else setFiles(allFiles)
      // setFiles(...files
      //   acceptedFiles.map(file =>
      //     Object.assign(file, {
      //       preview: URL.createObjectURL(file),
      //     })
      //   )
      // )

      if (onChange)
        onChange(
          multiFile
            ? allFiles
            : acceptedFiles.length > 0
            ? acceptedFiles[0]
            : null
        )
    },
    [files, multiFile]
  )

  React.useEffect(() => {
    if (!initialFiles || initialFiles.length <= 0) return

    setFiles(initialFiles)
  }, [initialFiles, files])

  const {
    getRootProps,
    getInputProps,
    inputRef,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    noClick: false,
    maxFiles: 1,
    accept: accept,
    disabled: readOnly,
    onDrop,
    multiple: multiFile,
  })

  // const thumbs = files.map(file => (
  //   <Thumb key={file.name}>
  //     <ThumbInner>
  //       <Imagem src={file.preview} />
  //     </ThumbInner>
  //   </Thumb>
  // ))

  // useEffect(
  //   () => () => {
  //     // Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach(file => URL.revokeObjectURL(file.preview))
  //   },
  //   [files]
  // )

  const handleRemoveFile = React.useCallback(
    fileName => {
      const dt = new DataTransfer()
      const files = Array.from(inputRef.current.files)

      // Add selected fiels to DataTransfer object
      for (const file of files) {
        file.name !== fileName && dt.items.add(file) // Add only file name not matched files
      }

      inputRef.current.files = dt.files // Overwrite files
      onDrop(Array.from(dt.files))
      // setFiles(Array.from(dt.files)) // Set states to render file list
    },
    [inputRef]
  )

  // const filesList = acceptedFiles.map(file => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ))

  // React.useEffect(() => {
  //   if (onChange)
  //     onChange(multiFile ? files : files.length > 0 ? files[0] : null)
  // }, [files])

  return (
    <DropZoneStyled>
      <Container
        {...getRootProps({
          isDragActive,
          isDragAccept,
          isDragReject,
          className: 'dropzone',
        })}
        visible={containerVisible}
        className={isInvalid ? 'position-relative alert-validate' : ''}
        data-validate={messageError}>
        <input
          {...getInputProps()}
          name={name}
          id={name}
          readOnly={readonly}
          onBlur={onBlur}
          className={`${isInvalid ? 'pe-2-25 is-invalid' : ''}`}
        />
        <p>
          {loading
            ? 'Carregando...'
            : 'Arraste e solte alguns arquivos aqui ou clique para selecionar arquivos'}
        </p>
      </Container>
      {!containerVisible && loading && (
        <Button state={BUTTON_STATE.LOADING} buttonSize="sm" />
      )}
      <DropZonePreviewList
        files={files}
        readonly={readOnly}
        onRemoveFile={handleRemoveFile}
      />
      
      {/* {filesList.length > 0 ? (
        <div className="pt-2">
          <div>{filesList}</div>
        </div>
      ) : (
        ''
      )} */}
      {/* <ul>{filesList}</ul> */}
      {/* <ThumbsContainer>{thumbs}</ThumbsContainer> */}
    </DropZoneStyled>
  )
}

export default DropZonePreviewDespesa

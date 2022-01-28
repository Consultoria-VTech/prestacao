import React from 'react'
import { ConfirmationButtons, Message, NoButton, YesButton } from './styles'

interface MessageBoxProps {
  onConfirm: () => void
  onCancel: () => void
  message: string
}

const MessageBox: React.FC<MessageBoxProps> = props => {
  return (
    <>
      <Message>{props.message}</Message>
      <ConfirmationButtons>
        <YesButton onClick={props.onConfirm}>Yes</YesButton>
        <NoButton onClick={props.onCancel}>No</NoButton>
      </ConfirmationButtons>
    </>
  )
}

export default MessageBox

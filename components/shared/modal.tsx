import React from 'react'
// Styles
import { Modal, Button, Header } from 'semantic-ui-react'

export const ModalComponent = ({
  open,
  setOpen,
  message,
  setValue,
  acceptButton,
  action
}: {
  open: boolean
  setOpen: any
  message?: string
  setValue: any
  acceptButton?: boolean
  action: () => void
}): React.ReactElement => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="star" content="Status" />
      <Modal.Content>{message}</Modal.Content>
      <Modal.Actions>
        {acceptButton && (
          <Button
            color="green"
            onClick={() => {
              setOpen(false)
              action()
            }}
          >
            Accept
          </Button>
        )}
        <Button
          color="red"
          onClick={() => {
            setOpen(false)
            setValue('createdByStatus', 'Open')
          }}
        >
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

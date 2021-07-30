import React from 'react'
// Styles
import { Modal, Button, Header } from 'semantic-ui-react'

export const ModalComponent = ({
  showModal = false,
  setShowModal,
  message,
  headerText,
  deleteAction,
  deleteItemText
}: {
  showModal?: boolean
  setShowModal: (value: boolean) => void
  message?: string
  headerText?: string
  deleteAction: () => void
  deleteItemText?: string
}): React.ReactElement => {
  return (
    <Modal
      open={showModal}
      onOpen={() => setShowModal(true)}
      onClose={() => setShowModal(false)}
      closeOnEscape={showModal}
      closeOnDimmerClick={showModal}
    >
      <Header icon="trash" content={headerText} />
      <Modal.Content>
        <p>{message}</p>
        <strong>{deleteItemText}</strong>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setShowModal(false)}>
          No
        </Button>
        <Button positive onClick={() => deleteAction()}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

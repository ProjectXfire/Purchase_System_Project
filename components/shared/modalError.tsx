import React from 'react'
// Styles
import { Modal, Button, Header } from 'semantic-ui-react'

interface ShowErrorModal {
  showModal: boolean
  errorMessage: string
}

export const ModalErrorComponent = ({
  setShowErrorModal,
  showErrorModal,
  errorMessage
}: {
  setShowErrorModal: (value: ShowErrorModal) => void
  showErrorModal: boolean
  errorMessage: string
}): React.ReactElement => {
  return (
    <Modal
      open={showErrorModal}
      onOpen={() => setShowErrorModal({ showModal: true, errorMessage })}
      onClose={() => setShowErrorModal({ showModal: false, errorMessage: '' })}
      closeOnEscape={showErrorModal}
      closeOnDimmerClick={showErrorModal}
    >
      <Header icon="times" content="Error" />
      <Modal.Content>
        <strong>{errorMessage}</strong>
      </Modal.Content>
      <Modal.Actions>
        <Button
          negative
          onClick={() => {
            setShowErrorModal({ showModal: false, errorMessage: '' })
          }}
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

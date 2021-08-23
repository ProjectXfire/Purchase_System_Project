import React from 'react'
// Providers
import { useTranslation } from 'next-i18next'
// Styles
import { Modal, Button, Header } from 'semantic-ui-react'

export const ModalDeleteComponent = ({
  showModal = false,
  setShowModal,
  deleteAction,
  deleteItemText
}: {
  showModal?: boolean
  setShowModal: (value: boolean) => void
  deleteAction: () => void
  deleteItemText?: string
}): React.ReactElement => {
  const { t } = useTranslation('common')
  return (
    <Modal
      open={showModal}
      onOpen={() => setShowModal(true)}
      onClose={() => setShowModal(false)}
      closeOnEscape={showModal}
      closeOnDimmerClick={showModal}
    >
      <Header icon="trash" content={t('delete')} />
      <Modal.Content>
        <p>{t('delete_message')}</p>
        <strong>{deleteItemText}</strong>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={() => setShowModal(false)}>
          {t('no_button')}
        </Button>
        <Button positive onClick={() => deleteAction()}>
          {t('yes_button')}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

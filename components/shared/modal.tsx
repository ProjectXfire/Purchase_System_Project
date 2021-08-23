import React, { ChangeEvent, useState } from 'react'
// Providers
import { useTranslation } from 'next-i18next'
// Styles
import { Modal, Button, Header, TextArea, Form } from 'semantic-ui-react'

export const ModalComponent = ({
  open,
  setOpen,
  message,
  acceptButton,
  comment = false,
  action
}: {
  open: boolean
  setOpen: any
  message?: string
  acceptButton?: boolean
  comment?: boolean
  action: (option: string, comment: string) => void
}): React.ReactElement => {
  const { t } = useTranslation('common')
  const [commentText, setCommentText] = useState('')
  const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value)
  }
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
    >
      <Header icon="star" content="Status" />
      <Modal.Content>{message}</Modal.Content>
      {comment && (
        <Modal.Content>
          <Form>
            <TextArea
              name="comment"
              placeholder="Comments"
              onChange={e => handleComment(e)}
            />
          </Form>
        </Modal.Content>
      )}
      <Modal.Actions>
        {acceptButton && (
          <Button
            color="green"
            onClick={() => {
              action('ok', commentText)
            }}
          >
            {t('accept_button')}
          </Button>
        )}
        <Button
          color="red"
          onClick={() => {
            action('cancel', commentText)
          }}
        >
          {t('cancel_button')}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

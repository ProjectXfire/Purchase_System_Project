import React, { ChangeEvent, useState } from 'react'
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
            Accept
          </Button>
        )}
        <Button
          color="red"
          onClick={() => {
            action('cancel', commentText)
          }}
        >
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

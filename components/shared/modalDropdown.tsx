import React from 'react'
// Next
import Link from 'next/link'
// Styles
import { Modal, Button, Header, Icon, Dropdown } from 'semantic-ui-react'

export const ModalDeleteComponent = ({
  open,
  setOpen,
  headerMessage,
  textMessage,
  path,
  setItem
}: {
  open: boolean
  setOpen: any
  headerMessage: string
  textMessage: string
  path: string
  setItem: any
}): React.ReactElement => {
  const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' }
  ]

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="industry" content={headerMessage} />
      <Modal.Content>
        <Dropdown
          placeholder={textMessage}
          fluid
          search
          selection
          options={options}
          onChange={async (e, { value }) => {
            setItem(value)
          }}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          <Icon name="remove" /> Close
        </Button>
        <Link href={path}>
          <Button color="green" onClick={() => setOpen(false)}>
            <Icon name="checkmark" /> Select
          </Button>
        </Link>
      </Modal.Actions>
    </Modal>
  )
}

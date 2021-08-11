// React
import React from 'react'
// Next
import Link from 'next/link'
// Models
import { ApproverStatus } from '@models/requisition/approver.status.model'
// Styles
import { Header, Icon, Table, Button } from 'semantic-ui-react'

export const ApproverStatusDetailComponent = ({
  data
}: {
  data: ApproverStatus
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Approver Status <Header.Subheader>Detail</Header.Subheader>
        </Header.Content>
      </Header>
      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width="3">Name</Table.Cell>
            <Table.Cell>{data.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Description</Table.Cell>
            <Table.Cell>{data.description}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Link href="/requisition/status/approver">
        <Button type="button">Back</Button>
      </Link>
    </>
  )
}

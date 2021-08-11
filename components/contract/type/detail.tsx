// React
import React from 'react'
// Next
import Link from 'next/link'
// Models
import { Subledger } from '@models/expense/subledger.model'
// Styles
import { Header, Icon, Table, Button } from 'semantic-ui-react'

export const ContractTypeDetailComponent = ({
  data
}: {
  data: Subledger
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Contract Type <Header.Subheader>Detail</Header.Subheader>
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
      <Link href="/contract/type">
        <Button type="button">Back</Button>
      </Link>
    </>
  )
}

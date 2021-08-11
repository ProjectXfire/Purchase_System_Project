// React
import React from 'react'
// Next
import Link from 'next/link'
// Models
import { CostType } from '@models/account/costtype.model'
// Styles
import { Header, Icon, Table, Button, Checkbox } from 'semantic-ui-react'

export const CostTypeDetailComponent = ({
  data
}: {
  data: CostType
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Cost Type <Header.Subheader>Detail</Header.Subheader>
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
          <Table.Row>
            <Table.Cell>Is Expense?</Table.Cell>
            <Table.Cell>
              <Checkbox checked={data.isExpense} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Link href="/chartofaccount/costtype">
        <Button type="button">Back</Button>
      </Link>
    </>
  )
}

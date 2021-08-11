// React
import React from 'react'
// Next
import Link from 'next/link'
// Models
import { Contract } from '@models/contract/contract.model'
// Styles
import { Header, Icon, Table, Button } from 'semantic-ui-react'

export const ContractDetailComponent = ({
  data
}: {
  data: Contract
}): React.ReactElement => {
  return (
    <>
      <Header as="h2">
        <Icon name="suitcase" />
        <Header.Content>
          Contract <Header.Subheader>Detail</Header.Subheader>
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
            <Table.Cell>Area unit</Table.Cell>
            <Table.Cell>{data.areaUnit}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Area Unit Description</Table.Cell>
            <Table.Cell>{data.areaUnitDescription}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Client Code</Table.Cell>
            <Table.Cell>{data.clientCode}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Location</Table.Cell>
            <Table.Cell>{data.location.name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Type</Table.Cell>
            <Table.Cell>{data.contractType.name}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Link href="/contract">
        <Button type="button">Back</Button>
      </Link>
    </>
  )
}

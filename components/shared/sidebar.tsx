// React
import React from 'react'
// Next
import Link from 'next/link'
// Models
import { Permissions } from '@models/auth/permission.model'
// Styles
import { Icon, Menu, Sidebar, Dropdown } from 'semantic-ui-react'
import { Anchor } from '@styles/globalStyleComponents'

export const SidebarComponent = ({
  permissions,
  visible,
  setVisible,
  logout
}: {
  permissions: Permissions
  visible: boolean
  setVisible: any
  logout: any
}): React.ReactElement => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      onHide={() => setVisible(false)}
      vertical
      visible={visible}
    >
      <Menu.Item>
        <Icon name="home" />
        <Link href="/">Home</Link>
      </Menu.Item>
      {(permissions.admin || permissions.account_read) && (
        <Dropdown text="Account" item>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link href="/chartofaccount/account">
                <Anchor>Account</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/chartofaccount/costcode">
                <Anchor>Cost Code</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/chartofaccount/costtype">
                <Anchor>Cost Type</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/chartofaccount/budget">
                <Anchor>Budget</Anchor>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      {(permissions.admin || permissions.contract_read) && (
        <>
          <Dropdown text="Contract" item>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link href="/contract">
                  <Anchor>Contract</Anchor>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/contract/type">
                  <Anchor>Type</Anchor>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown text="Location" item>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link href="/contract/location">
                  <Anchor>Location</Anchor>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
      {(permissions.admin || permissions.expense_read) && (
        <Dropdown text="Expense" item>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link href="/expense">
                <Anchor>Expense</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/subledger">
                <Anchor>Subledger</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/expense/expense-subledger">
                <Anchor>All expenses - subledgers</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/expense/expense-account">
                <Anchor>All expenses - account</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/expense/expense-location">
                <Anchor>All expenses - locations</Anchor>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      {(permissions.admin || permissions.req_read) && (
        <Dropdown text="Requisition" item>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link href="/">
                <Anchor>Requisition</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/">
                <Anchor>Ship to</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/">
                <Anchor>Ship by</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/">
                <Anchor>Requestor</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/">
                <Anchor>Currency</Anchor>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      {permissions.admin && (
        <Dropdown text="Product" item>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link href="/">
                <Anchor>Product</Anchor>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      <Menu.Item as="a" onClick={logout}>
        <Icon name="log out" />
        Log out
      </Menu.Item>
    </Sidebar>
  )
}

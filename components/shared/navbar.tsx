// React
import React from 'react'
// Next
import Link from 'next/link'
// Models
import { Permissions } from '@models/auth/permission.model'
// Styles
import { Dropdown, Menu, Container, Icon } from 'semantic-ui-react'
import { Anchor, HeaderBold } from '@styles/globalStyleComponents'
// Components Media Query
import {
  NavbarContainer,
  NavbarContainerCollapse
} from '@styles/components/shared/navbar'

export const NavbarComponent = ({
  permissions,
  handleVisibleSidebar,
  openRequisitionModal,
  logout
}: {
  permissions: Permissions
  handleVisibleSidebar: any
  openRequisitionModal: () => void
  logout: any
}): React.ReactElement => {
  return (
    <>
      <NavbarContainer>
        <Menu compact inverted size="small" fixed="top">
          <Container>
            <Menu.Item header>
              <Icon name="home" />
              <Link href="/">Purchase System</Link>
            </Menu.Item>
            {(permissions.admin ||
              permissions.account_read ||
              permissions.expense_read ||
              permissions.contract_read) && (
              <Dropdown
                text="Financial Management"
                item
                simple
                className="link item"
              >
                <Dropdown.Menu>
                  {(permissions.admin ||
                    permissions.account_read ||
                    permissions.expense_read) && (
                    <>
                      {(permissions.admin || permissions.account_read) && (
                        <>
                          <Dropdown.Header>
                            <HeaderBold>Account Management</HeaderBold>
                          </Dropdown.Header>
                          <Dropdown.Item>
                            <i className="dropdown icon" />
                            <span className="text">Account</span>
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
                          </Dropdown.Item>
                        </>
                      )}
                      {(permissions.admin || permissions.expense_read) && (
                        <>
                          <Dropdown.Item>
                            <i className="dropdown icon" />
                            <span className="text">Expense</span>
                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <Link href="/expense">
                                  <Anchor>Expense</Anchor>
                                </Link>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <Link href="/expense/subledger">
                                  <Anchor>Subledger</Anchor>
                                </Link>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown.Item>
                        </>
                      )}
                    </>
                  )}
                  {(permissions.admin || permissions.contract_read) && (
                    <>
                      <Dropdown.Header>
                        <HeaderBold>Contract Management</HeaderBold>
                      </Dropdown.Header>
                      <Dropdown.Item>
                        <i className="dropdown icon" />
                        <span className="text">Contract</span>
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
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link href="/contract/location">
                          <Anchor>Location</Anchor>
                        </Link>
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
            {(permissions.admin || permissions.req_read) && (
              <Dropdown
                text="Purchase Management"
                item
                simple
                className="link item"
              >
                <Dropdown.Menu>
                  {(permissions.admin || permissions.req_read) && (
                    <>
                      <Dropdown.Header>
                        <HeaderBold>Requisition Management</HeaderBold>
                      </Dropdown.Header>
                      <Dropdown.Item onClick={() => openRequisitionModal()}>
                        Requisition
                      </Dropdown.Item>
                      {(permissions.admin || permissions.approval_read) && (
                        <Dropdown.Item>
                          <Link href="/requisition/approvals/list">
                            <Anchor>Approvals</Anchor>
                          </Link>
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item>
                        <i className="dropdown icon" />
                        <span className="text">Options</span>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Link href="/requisition/shipto">
                              <Anchor>Ship to</Anchor>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link href="/requisition/shipby">
                              <Anchor>Ship by</Anchor>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link href="/requisition/requestor">
                              <Anchor>Requestor</Anchor>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link href="/requisition/currency">
                              <Anchor>Currency</Anchor>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link href="/requisition/priority">
                              <Anchor>Priority</Anchor>
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>
                    </>
                  )}
                  {permissions.admin && (
                    <>
                      <Dropdown.Header>
                        <HeaderBold>Items Management</HeaderBold>
                      </Dropdown.Header>
                      <Dropdown.Item>
                        <Link href="/inventory/product">
                          <Anchor>Product</Anchor>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link href="/inventory/category">
                          <Anchor>Category</Anchor>
                        </Link>
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <Menu.Item as="a" position="right" onClick={logout}>
              Log out
            </Menu.Item>
          </Container>
        </Menu>
      </NavbarContainer>
      <NavbarContainerCollapse>
        <Menu compact inverted size="small" fixed="top">
          <Container>
            <Menu.Item header>
              <Icon name="home" />
              <Link href="/">Purchase System</Link>
            </Menu.Item>
            <Menu.Item as="a" position="right" onClick={handleVisibleSidebar}>
              <Icon name="sidebar" />
            </Menu.Item>
          </Container>
        </Menu>
      </NavbarContainerCollapse>
    </>
  )
}

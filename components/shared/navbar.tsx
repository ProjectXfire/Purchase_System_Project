// React
import React from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation('menu')
  return (
    <>
      <NavbarContainer>
        <Menu compact inverted size="small" fixed="top">
          <Container>
            <Menu.Item header>
              <Icon name="home" />
              <Link href="/">{t('home')}</Link>
            </Menu.Item>
            {(permissions.admin ||
              permissions.account_read ||
              permissions.expense_read ||
              permissions.contract_read) && (
              <Dropdown text={t('financial_management')} item simple>
                <Dropdown.Menu>
                  {(permissions.admin ||
                    permissions.account_read ||
                    permissions.expense_read) && (
                    <>
                      {(permissions.admin || permissions.account_read) && (
                        <>
                          <Dropdown.Header>
                            <HeaderBold>{t('account_management')}</HeaderBold>
                          </Dropdown.Header>
                          <Dropdown.Item>
                            <i className="dropdown icon" />
                            <span className="text">{t('account')}</span>
                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <Link href="/chartofaccount/account">
                                  <Anchor>{t('account')}</Anchor>
                                </Link>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <Link href="/chartofaccount/costcode">
                                  <Anchor>{t('costcode')}</Anchor>
                                </Link>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <Link href="/chartofaccount/costtype">
                                  <Anchor>{t('costtype')}</Anchor>
                                </Link>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <Link href="/chartofaccount/budget">
                                  <Anchor>{t('budget')}</Anchor>
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
                            <span className="text">{t('expense')}</span>
                            <Dropdown.Menu>
                              <Dropdown.Item>
                                <Link href="/expense">
                                  <Anchor>{t('expense')}</Anchor>
                                </Link>
                              </Dropdown.Item>
                              <Dropdown.Item>
                                <Link href="/expense/subledger">
                                  <Anchor>{t('subledger')}</Anchor>
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
                        <HeaderBold>{t('contract_management')}</HeaderBold>
                      </Dropdown.Header>
                      <Dropdown.Item>
                        <i className="dropdown icon" />
                        <span className="text">{t('contract')}</span>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Link href="/contract">
                              <Anchor>{t('contract')}</Anchor>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link href="/contract/type">
                              <Anchor>{t('type')}</Anchor>
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Link href="/contract/location">
                          <Anchor>{t('location')}</Anchor>
                        </Link>
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
            {(permissions.admin || permissions.req_read) && (
              <Dropdown
                text={t('purchase_management')}
                item
                simple
                className="link item"
              >
                <Dropdown.Menu>
                  {(permissions.admin || permissions.req_read) && (
                    <>
                      <Dropdown.Header>
                        <HeaderBold>{t('requisition_management')}</HeaderBold>
                      </Dropdown.Header>
                      <Dropdown.Item onClick={() => openRequisitionModal()}>
                        {t('requisition')}
                      </Dropdown.Item>
                      {(permissions.admin || permissions.approval_read) && (
                        <Dropdown.Item>
                          <Link href="/requisition/approvals/list">
                            <Anchor>{t('approvals')}</Anchor>
                          </Link>
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item>
                        <i className="dropdown icon" />
                        <span className="text">{t('options')}</span>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Link href="/requisition/shipto">
                              <Anchor>{t('ship_to')}</Anchor>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link href="/requisition/shipby">
                              <Anchor>{t('ship_by')}</Anchor>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link href="/requisition/requestor">
                              <Anchor>{t('requestor')}</Anchor>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link href="/requisition/currency">
                              <Anchor>{t('currency')}</Anchor>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Link href="/requisition/priority">
                              <Anchor>{t('priority')}</Anchor>
                            </Link>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Item>
                    </>
                  )}
                  {permissions.admin && (
                    <>
                      <Dropdown.Header>
                        <HeaderBold>{t('items_management')}</HeaderBold>
                      </Dropdown.Header>
                      <Dropdown.Item>
                        <Link href="/inventory/product">
                          <Anchor>{t('product')}</Anchor>
                        </Link>
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}
            <Menu.Item icon="log out" position="right" onClick={logout} />
            <Dropdown item simple icon="world">
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link href="/" locale={'en'}>
                    <Anchor>EN</Anchor>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link href="/" locale={'es'}>
                    <Anchor>ES</Anchor>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
      </NavbarContainer>
      <NavbarContainerCollapse>
        <Menu compact inverted size="small" fixed="top">
          <Container>
            <Menu.Item header>
              <Icon name="home" />
              <Link href="/">{t('home')}</Link>
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

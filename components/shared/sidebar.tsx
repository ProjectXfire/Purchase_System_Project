// React
import React from 'react'
// Next
import Link from 'next/link'
// Providers
import { useTranslation } from 'next-i18next'
// Models
import { Permissions } from '@models/auth/permission.model'
// Styles
import { Icon, Menu, Sidebar, Dropdown } from 'semantic-ui-react'
import { Anchor } from '@styles/globalStyleComponents'

export const SidebarComponent = ({
  permissions,
  visible,
  setVisible,
  openRequisitionModal,
  logout
}: {
  permissions: Permissions
  visible: boolean
  setVisible: any
  openRequisitionModal: () => void
  logout: any
}): React.ReactElement => {
  const { t } = useTranslation('menu')
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
        <Dropdown text={t('account')} item>
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
        </Dropdown>
      )}
      {(permissions.admin || permissions.contract_read) && (
        <>
          <Dropdown text={t('contract')} item>
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
          </Dropdown>
          <Dropdown text={t('location')} item>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link href="/contract/location">
                  <Anchor>{t('location')}</Anchor>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
      {(permissions.admin || permissions.expense_read) && (
        <Dropdown text={t('expense')} item>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link href="/expense">
                <Anchor>{t('expense')}</Anchor>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link href="/subledger">
                <Anchor>{t('subledger')}</Anchor>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      {(permissions.admin || permissions.req_read) && (
        <Dropdown text={t('requisition')} item>
          <Dropdown.Menu>
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
        </Dropdown>
      )}
      {permissions.admin && (
        <Dropdown text={t('product')} item>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link href="/inventory/product">
                <Anchor>{t('product')}</Anchor>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      <Dropdown item icon="world">
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link href="/" locale={'en-US'}>
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
      <Menu.Item as="a" onClick={logout}>
        <Icon name="log out" />
        Log out
      </Menu.Item>
    </Sidebar>
  )
}

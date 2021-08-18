// React
import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
// Next
import { useRouter } from 'next/router'
// Providers
import Cookies from 'js-cookie'
// Models
import { Permissions } from '@models/auth/permission.model'
// Components
import { NavbarComponent } from '@components/shared/navbar'
import { SidebarComponent } from '@components/shared/sidebar'
import { FooterComponent } from '@components/shared/footer'
import { ModalDropdownComponent } from '@components/shared/modalDropdown'
// Styles
import { Sidebar } from 'semantic-ui-react'

export const Layout = ({
  children,
  permissions
}: {
  children: JSX.Element
  permissions: Permissions
}): React.ReactElement => {
  const [visible, setVisible] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const router = useRouter()

  const handleVisibleSidebar = () => setVisible(!visible)

  const logout = () => {
    Cookies.remove('user')
    router.push('/auth/login')
  }

  // REQUISITION MODAL
  const [open, setOpen] = useState(false)
  const openRequisitionModal = () => {
    setOpen(true)
  }

  useEffect(() => {
    if (!isTabletOrMobile) {
      setVisible(false)
    }
  }, [isTabletOrMobile])

  return (
    <>
      <NavbarComponent
        permissions={permissions}
        handleVisibleSidebar={handleVisibleSidebar}
        openRequisitionModal={openRequisitionModal}
        logout={logout}
      />
      <SidebarComponent
        permissions={permissions}
        visible={visible}
        setVisible={setVisible}
        openRequisitionModal={openRequisitionModal}
        logout={logout}
      />
      <Sidebar.Pushable style={{ height: '100vh' }}>
        <Sidebar.Pusher dimmed={visible}>
          {children}
          <FooterComponent />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <ModalDropdownComponent
        open={open}
        setOpen={setOpen}
        headerMessage="Locations"
        textMessage="Select location"
        secondTextMessage="Select year"
        setVisible={setVisible}
      />
    </>
  )
}

import styled from 'styled-components'
import { device } from '@styles/globalStyleComponents'

export const NavbarContainer = styled.div`
  @media ${device.minSize} {
    display: none;
  }

  @media ${device.tablet} {
    display: block;
  }
`

export const NavbarContainerCollapse = styled.div`
  @media ${device.minSize} {
    display: block;
  }

  @media ${device.tablet} {
    display: none;
  }
`

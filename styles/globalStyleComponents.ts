import styled from 'styled-components'

const size = {
  minSize: '1px',
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  minSize: `(min-width: ${size.minSize})`,
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
}

export const Anchor = styled.a`
  color: black !important;
`

export const HeaderTitle = styled.p`
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const HeaderBold = styled.p`
  font-weight: 900;
  color: #bdbdbd;
`

export const TableContainer = styled.div`
  font-size: 0.8rem;
  display: block;
  min-width: 1px;
  overflow: scroll;
`
export const TitleLabel = styled.label`
  font-weight: bolder;
  font-size: 1.5rem;
`

export const Total = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-end;
`

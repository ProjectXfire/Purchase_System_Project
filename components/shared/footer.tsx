import React from 'react'
// Styles
import { Container, List, Segment } from 'semantic-ui-react'
import { Footer } from '@styles/components/shared/footer'

export const FooterComponent: React.FC = () => {
  return (
    <Footer>
      <Segment inverted vertical>
        <Container textAlign="center">
          <List horizontal inverted divided link size="medium">
            <List.Item as="a" href="#">
              Site Map
            </List.Item>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </Footer>
  )
}

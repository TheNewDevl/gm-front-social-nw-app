import styled from 'styled-components'
import { colors } from '../../../styles/colors'

export const AccoutInfoCard = styled.div`
  background-color: ${colors.quaternary};
  margin: 1em;
  padding: 1em;
`
export const AccountImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 1em;
`
export const AccountActions = styled.div`
  display: flex;
  justify-content: center;
`
export const ActionLink = styled.a`
  color: ${colors.primary};
  text-decoration: none;
  margin: 0.5em;
  cursor: pointer;
  &:hover {
    color: ${colors.secondary};
  }
  ${(props) =>
    props.toDelete &&
    `color: #a73b3b; 
    border-radius: 30px; 
    `}
`
export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`
export const InfoHeader = styled.div`
  padding: 0 3em;
  border-right: 2px solid ${colors.secondary};
`
export const InfoDetails = styled.div`
  padding: 0 3em;
`
export const CardTitle = styled.h2`
  text-align: center;
`

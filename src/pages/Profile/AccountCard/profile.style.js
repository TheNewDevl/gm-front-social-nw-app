import styled from 'styled-components'

export const AccoutInfoCard = styled.div`
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
  text-decoration: none;
  margin: 0.5em;
  cursor: pointer;
  &:hover {
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
`
export const InfoDetails = styled.div`
  padding: 0 3em;
`
export const CardTitle = styled.h2`
  text-align: center;
`

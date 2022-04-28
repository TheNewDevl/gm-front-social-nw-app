import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '../../styles/colors.js'

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  align-items: center;
  background-color: ${colors.quinary};
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  height: 100px;
`

export const StyledLink = styled(Link)`
  padding: 10px 15px;
  text-decoration: none;
  font-size: 1em;
  text-align: center;
  text-transform: uppercase;

  &:hover {
    color: ${colors.primary};
    text-decoration: none;
  }
`

export const Logo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: -20px;
`

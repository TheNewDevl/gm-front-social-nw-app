import styled from 'styled-components'
import { colors } from '../../styles/colors'

export const CardComments = styled.div`
  background-color: ${colors.quaternary};
  margin: 1em;
  padding: 1em;
`
export const CardTitle = styled.h2`
  text-align: center;
`
export const Post = styled.div`
  display: flex;
  align-items: center;
  margin: 1em;
  padding: 1em;
  background-color: ${colors.quaternary};
  border-radius: 0.5em;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.5);
`

export const PostImg = styled.img`
  object-fit: cover;
  object-position: center;
  width: 100px;
  height: 100px;
  border-radius: 0.5em;
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.5);
`
export const PostDetails = styled.div`
  margin-left: 1em;
  padding: 1em;
`

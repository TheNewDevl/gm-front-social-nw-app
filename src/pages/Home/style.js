import styled from 'styled-components'

export const AuthHeader = styled.header`
  text-align: center;
`

export const AuthChoicesWraper = styled.div`
  display: flex;
  margin: 2em;
  justify-content: center;
`

export const HomeWraper = styled.div`
  display: flex;
`
export const HomeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`
export const IllustrationContainer = styled.div`
  width: 60%;
  height: 100vh;
`
export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const AuthChoices = styled.h2`
  cursor: pointer;
  margin: 1.5em;
  padding: 0.5em;
  font-size: 1.5em;
  border-radius: 50px;
  font-weight: bold;
  background-color: #4671bf;
  &:hover {
    background-color: #8fa7d3;
  }
`
/* sign in input style material design */
export const SignInInput = styled.input`
  display: block;
  width: 100%;
  height: 56px;
  padding: 0px 12px;
  font-size: 16px;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin: 1em;
  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`

/* sign in button options 'sign in' and 'sign up' style material design */
export const SignInButton = styled.p`
  display: block;
  width: 100%;
  height: 56px;
  padding: 0px 12px;
  font-size: 16px;
  line-height: 1.5;
  color: #fff;
  background-color: #4671bf;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 4px;

  &:hover {
    background-color: #8fa7d3;
  }
`

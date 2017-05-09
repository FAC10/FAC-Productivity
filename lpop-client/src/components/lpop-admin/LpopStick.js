import React from 'react'
import styled from 'styled-components'

const Stick = styled.section`
  width: 100%;
  border-radius: 25px;
  height: 3.125rem;
  background-color: #d9b38c;
  color: rgba(0,0,0,0.65);
  text-align: right;
  font-size: 2.2rem;
  padding-right: 3rem;
  line-height: 3.5rem;
  box-sizing: border-box;
  font-family: 'Architects Daughter', cursive;
  box-shadow:
    0 0 0 .0625rem #d9b38c inset,
    0 .2rem 0 0 #ab8967;
`

export const LpopStick = (props) => {
  return (
    <Stick>
      {props.currentName}
    </Stick>
  )
}

import React from 'react'
import styled from 'styled-components'

const ResetButton = styled.button`
  background-color: rgb(45, 48, 61);
  border-radius: .5rem;
  border: none;
  outline: none;
  box-shadow:
    0 0 0 1px rgb(45, 48, 61) inset,
    0 6px 0 0 rgb(25, 27, 32);
  color: rgba(255,250,250, 0.9);
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  height: 3rem;
  padding-left: .5rem;
  padding-right: .5rem;
  line-height: 3rem;
  position: relative;
  top: 0;
  text-align: center;
  text-shadow: 0 1px 1px rgba(0,0,0, 0.5);
  transition: 0.15s all ease-out;
  &:hover, &:focus {
    background-color: rgb(58, 62, 79);
    box-shadow:
      0 0 0 1px rgb(45, 48, 61) inset,
      0 7px 0 0 rgb(25, 27, 32);
    top: -1px;
  }
  &:active {
    box-shadow:
      0 0 0 1px rgb(25, 27, 32) inset,
      0 0 0 1px rgba(0,0,0, 0.4);
    transform: translateY(8px);
  }
`

export const LpopReset = (props) => {
  return (
    <ResetButton onClick={() => { props.handleReset(true) } }>Reset</ResetButton>
  )
}

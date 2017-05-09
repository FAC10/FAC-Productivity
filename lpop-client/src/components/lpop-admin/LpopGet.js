import React from 'react'
import styled from 'styled-components'

const GetButton = styled.button`
  margin: 1.5rem 1rem .5rem 1rem;
  background-color: #C63702;
  border-radius: 50%;
  border: none;
  outline: none;
  box-shadow:
    0 0 0 .0625rem #C63702 inset,
    0 .375rem 0 0 #872906;
  color: rgba(255,250,250, 0.9);
  display: inline-block;
  font-size: 1.3rem;
  font-weight: bold;
  height: 5rem;
  width: 5rem;
  line-height: 5rem;
  position: relative;
  top: 0;
  text-align: center;
  text-shadow: 0 .0625rem .0625rem rgba(0,0,0, 0.5);
  transition: 0.1s all ease-out;

  &:hover, &:focus {
    background-color: #D13902;
    box-shadow:
      0 0 0 .0625rem #C63702 inset,
      0 .5rem 0 0 #872906;
    top: -0.125rem;
  }

  &:active {
    box-shadow:
      0 0 0 .0625rem #AD3002 inset;
    transform: translateY(7px);
  }
`

export const LpopGet = (props) => {
  return (
    <GetButton onClick={props.handlePop}>LPop!</GetButton>
  )
}

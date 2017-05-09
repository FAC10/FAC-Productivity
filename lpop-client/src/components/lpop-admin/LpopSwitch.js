import React from 'react'
import styled from 'styled-components'

const Switch = styled.button`
  width: 3.25rem;
  height: 1.78rem;
  display: block;
  margin: .25rem auto 0 auto;
  background-color: ${props => props.on ? '#20a64a' : '#4b718f'};
  border: none;
  padding-left: 0.225rem;
  border-radius: 0.77rem;
  font-size: 0;
  outline: none;
  transition: 0.15s all ease-out;
  box-shadow:
    0 .2rem .2rem rgba(0,0,0, 0.15) inset,
    0 0 .1rem .05rem rgba(0,0,0, .5) inset,
    0 .1rem .5rem .1rem rgba(255, 250, 250, 0.1),
    0 .05rem 0 .025rem rgba(255, 250, 250, 0.25);
  &:after {
    content: '';
    width: 1.5rem;
    height: 1.5rem;
    background-color: rgb(45, 48, 61);
    display: block;
    margin-left: ${props => props.on ? '1.47rem' : '-.1rem'};
    margin-top: -.3rem;
    border-radius: 50%;
    border: none;
    transition: 0.1s all ease-out;
    box-shadow:
      0 0 0 .0625rem rgba(255,250,250, 0.09) inset,
      0 0 .4rem 0.2rem rgba(255,250,250, 0.15) inset,
      0 .1875rem 0 0 rgba(0,0,0,.5),
      0 .1875rem 0 .0625rem rgba(0,0,0, 0.4),
      0 .1875rem .3rem .0625rem rgba(0,0,0, 0.7);
    }
`

const Container = styled.div`
  font-weight: bold;
  color: rgba(255,250,250, 0.9);
  text-shadow: 0 1px 1px rgba(0,0,0, 0.5);
  display: inline-block;
  font-size: .9rem;
  vertical-align: baseline;
`

export const LpopSwitch = (props) => {
  return(
    <Container>
    Free Pop
    <Switch on={props.on} onClick={props.handleSwitch}>Auth free LPop</Switch>
    </Container>
  )
}

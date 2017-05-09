import React from 'react'
import styled from 'styled-components'
import {partial} from './../../lib/utils'

const NameItem = styled.li`
  width: 90%;
  list-style: none;
  margin: 0 auto;
  padding: .5rem 0;
  background-color: ${props => props.selected ? '#375873' : '#31516a'};
  border-bottom: .125rem solid #486e8c;
  &:last-child {
    border-bottom: none;
  }
`

const Name = styled.span`
  text-decoration: ${props => props.selected ? 'line-through' : 'none'};
  font-size: 1.3rem;
  color: white;
`

const RemoveName = styled.a`
  margin-right: 1rem;
  background-color: #C63702;
  border-radius: 50%;
  text-decoration: none;
  outline: none;
  box-shadow:
    0 0 0 .0625rem #C63702 inset,
    0 0 0 0.125rem rgba(255,250,250, 0.25) inset,
    0 .1875rem 0 0 #AD3002,
    0 .1875rem 0 .0625rem rgba(0,0,0, 0.4),
    0 .1875rem .35rem .0625rem rgba(0,0,0, 0.5);
  color: rgba(255,250,250, 0.9);
  display: inline-block;
  font-size: 1.3rem;
  font-weight: bold;
  height: 2rem;
  width: 2rem;
  line-height: 2rem;
  position: relative;
  top: 0;
  text-align: center;
  text-shadow: 0 .0625rem .0625rem rgba(0,0,0, 0.5);
  transition: 0.1s all ease-out;

  &:hover, &:focus {
    background-color: #e3460f;
    box-shadow:
      0 0 0 .0625rem #C63702 inset,
      0 0 0 0.125rem rgba(255,250,250, 0.15) inset,
      0 .25rem 0 0 #AD3002,
      0 .25rem 0 .0625rem rgba(0,0,0, 0.4),
      0 .25rem .4rem .0625rem rgba(0,0,0, 0.6);
    top: -0.0625rem;
  }

  &:active {
    box-shadow:
      0 0 0 .0625rem #AD3002 inset,
      0 0 0 0.125rem rgba(255,250,250, 0.15) inset,
      0 0 0 .0625rem rgba(0,0,0, 0.4);
    transform: translateY(5px);
  }
`

export const LpopListItem = (props) => {
  const toggleCheck = partial(props.handleToggleCheck, props.id)
  const remove = partial(props.handleRemove, props.id)
  return (
    <NameItem onClick={toggleCheck} selected={props.selected}>
      <RemoveName onClick={remove} href="#">X</RemoveName>
      <Name selected={props.selected}>{props.name}</Name>
    </NameItem>
  )
}

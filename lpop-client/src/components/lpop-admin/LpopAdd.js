import React from 'react'
import styled from 'styled-components'

const FormWrapper = styled.div`
  width: 100%;
  padding: 1.5rem 0 .5rem 0;
  background-color: #478e75;
`
const AddForm = styled.form`
  width: 90%;
  margin: 0 auto;
  padding: 0;
`
const AddInput = styled.input`
  width: calc(100% - 3.1rem);
  font-size: 1.3rem;
  margin: 0 auto;
  padding: .4rem .4rem;
  box-sizing: border-box;
  border-style: none;
  display: inline-block;
  color: white;
  border-radius: .25rem;
  border: 0.125rem solid #486e8c;
  background-color: #254055;
  &:hover {
    background-color: #1f374a;
  }
  &:focus {
    background-color: #1a2c3b;
  }
`
const AddInputLabel = styled.label`
  width: 100%;
  font-size: 0;
`
const AddSubmit = styled.button`
  margin-right: 1rem;
  background-color: #20a64a;
  border-radius: 50%;
  border: none;
  outline: none;
  box-shadow:
    0 0 0 .0625rem #20a64a inset,
    0 0 0 0.125rem rgba(255,250,250, 0.25) inset,
    0 .1875rem 0 0 #146f30,
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
    background-color: #20b34e;
    box-shadow:
      0 0 0 .0625rem #20a64a inset,
      0 0 0 0.125rem rgba(255,250,250, 0.15) inset,
      0 .25rem 0 0 #146f30,
      0 .25rem 0 .0625rem rgba(0,0,0, 0.4),
      0 .25rem .4rem .0625rem rgba(0,0,0, 0.6);
    top: -0.0625rem;
  }

  &:active {
    box-shadow:
      0 0 0 .0625rem #146f30 inset,
      0 0 0 0.125rem rgba(255,250,250, 0.15) inset,
      0 0 0 .0625rem rgba(0,0,0, 0.4);
    transform: translateY(5px);
  }
`

export const LpopAdd = (props) => {
  return (
    <FormWrapper>
      <AddForm onSubmit={props.handleAdd}>
        <AddSubmit type='submit'>&#10004;</AddSubmit>
        <AddInputLabel>
          Add a name
          <AddInput placeholder="Add a name..." type="text" autocomplete="off" onChange={props.handleInputChange} value={props.newName}/>
        </AddInputLabel>
      </AddForm>
    </FormWrapper>
  )
}

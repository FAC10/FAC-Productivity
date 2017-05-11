import React, { Component } from 'react'
import styled from 'styled-components'

import io from 'socket.io-client'
const socket = io()

import {LpopStick, LpopGet, LpopAdd,
  LpopList, LpopReset, LpopSwitch} from './components/lpop-admin'
import {getUnchecked, check, uncheckAll, validateAdd,
  updateList, findById, toggleCheck, addName,
  removeName, generateId, updateById} from './lib/lpop/lpopHelpers'
import {partial} from './lib/utils'
import {getNames, addNameToDb, removeFromDb, setAllPop, checkId, setName, getAllPop} from './lib/lpop/lpopServer'

const AppContainer = styled.section`
  max-width: 90%;
  width: 31.875rem;
  margin: 7rem auto;
`
const LpopAdmin = styled.section`
  overflow: hidden;
  border-radius: 1rem;
  margin-top: 3rem;
  box-shadow:
    0 0 0 .0625rem #31516a inset,
    0 0 0 0.125rem rgba(255,250,250, 0.25) inset,
    0 .3rem 0 0 #1e3547,
    0 .3rem 0 .0625rem rgba(0,0,0, 0.4),
    0 .3rem .5rem .0625rem rgba(0,0,0, 0.5);
`
const ControlContainer = styled.section`
  background-color: #478e75;
  text-align: center;
  width: 100%;
`
const CenterControls = styled.section`
  margin: 0 auto;
  display: inline-block;
`

class App extends Component {
  state = {
    currentName: '',
    names: [],
    newName: '',
    allUsers: true,
  }


  handleNewName = ({n, id}, callback) => {
    if (id) {
      const name = check(findById(this.state.names, id))
      const updatedList = updateList(this.state.names, name)
      this.setState({currentName: n, names: updatedList})
    } else {
      this.setState({currentName: n})
    }
  }

  handleAllPop = ({n, id}, callback) => {
    if (!getUnchecked(this.state.names)[0] && findById(this.state.names, id)) {
      return this.handleReset(false, partial(this.handleAllPop, {n, id}))
    }
    this.handleNewName({n, id}, callback)
  }

  componentDidMount() {
    getNames((err, { names }) => this.setState({names}))
    socket.on('allName', this.handleAllPop)
    socket.on('name', this.handleNewName)
    socket.on('reset', () => this.handleReset(false))
    socket.on('allPop', ({on}) => this.setState({allUsers: on}))
    socket.on('update', () => getNames((err, {names}) => this.setState({names})))
    getAllPop((err, { allUsers }) => this.setState({allUsers}))
  }

  handleReset = (shouldEmmit, callback) => {
    const list = uncheckAll(this.state.names)
    callback ?
      this.setState({names: list}, callback) :
      this.setState({names: list})
    if (shouldEmmit) socket.emit('reset', {yes: true})
  }

  handleToggleCheck = (id) => {
    const name = findById(this.state.names, id)
    const toggled = toggleCheck(name)
    const updated = updateList(this.state.names, toggled)
    this.setState({names: updated}, () => {
      checkId(id, toggled.selected, (err) => {
        err ? console.log(err) : socket.emit('update')
      })
    })
  }

  handleRemove = (id, event) => {
    event.preventDefault()
    event.stopPropagation()
    const updated = removeName(this.state.names, id)
    this.setState({names: updated})
    removeFromDb(id, (err, res) => {
      if (err) return console.log(err)
      socket.emit('update')
    })
  }

  handleAdd = (event) => {
    event.preventDefault()
    const randomId = generateId()
    const newName = { name: this.state.newName, id: randomId, selected: false }
    const names = addName(this.state.names, newName)
    this.setState({names, newName: ''})

    addNameToDb(newName.name, (err, { id }) => {
      if (err) return console.log(err)
      const updated = updateById(this.state.names, randomId, {...newName, id})
      this.setState({names: updated})
      socket.emit('update')
    })
  }

  handleEmptyAdd = (event) => event.preventDefault()

  handleInputChange = (event) => {
    this.setState({newName: event.target.value})
  }

  handlePop = () => {
    // If nothing to pop, don't try...
    if (!this.state.names[0]) return;
    const list = getUnchecked(this.state.names)
    // Reset automatically when no more unchecked
    if (!list[0]) return this.handleReset(true, this.handlePop)
    // Pick a random name and check it off the list
    const name = list[Math.floor(Math.random() * list.length)]
    const updatedList = updateList(this.state.names, check(name))
    this.setState({currentName: name.name, names: updatedList})
    socket.emit('name', {n: name.name, id: name.id})
    // Set current name on the database
    setName(name.name)
  }

  handleSwitch = () => {
    this.setState({allUsers: !this.state.allUsers}, () => {
      setAllPop(this.state.allUsers, (err, res) => {
        err ? console.log(err) : socket.emit('allPop')
      })
    })
  }

  render() {
    const add = validateAdd(this.state.newName) ?
      this.handleAdd :
      this.handleEmptyAdd
    return (
      <AppContainer>
        <LpopStick currentName={this.state.currentName}/>
        <LpopAdmin>
          <ControlContainer>
            <CenterControls>
              <LpopSwitch
                on={this.state.allUsers}
                handleSwitch={this.handleSwitch}/>
              <LpopGet handlePop={this.handlePop}/>
              <LpopReset handleReset={this.handleReset}/>
            </CenterControls>
          </ControlContainer>
          <LpopAdd
            handleAdd={add}
            handleInputChange={this.handleInputChange}
            newName={this.state.newName}/>
          <LpopList
            handleToggleCheck={this.handleToggleCheck}
            handleRemove={this.handleRemove}
            names={this.state.names}/>
        </LpopAdmin>
      </AppContainer>
    );
  }
}

export default App;

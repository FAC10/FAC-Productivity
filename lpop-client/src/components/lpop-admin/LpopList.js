import React from 'react'
import styled from 'styled-components'

import {LpopListItem} from './LpopListItem'
import {getUnchecked, getChecked} from './../../lib/lpop/lpopHelpers'

const NameList = styled.ul`
  width: 100%;
  margin: 0 auto;
  padding: 0 0 1.25rem 0;
  background-color: #478e75;
`

export const LpopList = (props) => {
  const unchecked = getUnchecked(props.names)
  const checked = getChecked(props.names)
  const sortAlpha = ({name: a}, {name: b}) => {
    const [first, second] = [a.toLowerCase(), b.toLowerCase()]
    return first !== second ? first < second ? -1 : 1 : 0
  }
  return (
    <NameList>
      {unchecked.sort(sortAlpha).map(name => <LpopListItem {...name}
        handleToggleCheck={props.handleToggleCheck}
        handleRemove={props.handleRemove}
        key={name.id}/>)}
      {checked.sort(sortAlpha).map(name => <LpopListItem {...name}
        handleToggleCheck={props.handleToggleCheck}
        handleRemove={props.handleRemove}
        key={name.id}/>)}
    </NameList>
  )
}

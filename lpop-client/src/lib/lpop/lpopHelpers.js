export const getChecked = (list) => list ? list.filter(name => name.selected) : []

export const getUnchecked = (list) => list ? list.filter(name => !name.selected) : []

export const check = (item) => ({...item, selected: true})

export const toggleCheck = (item) => ({...item, selected: !item.selected})

export const uncheckAll = (list) => list.map(item => ({...item, selected: false}))

export const findById = (list, id) => list.find(item => item.id === id)

export const removeName = (list, id) => {
  const removeIndex = list.findIndex(item => item.id === id)
  return [
    ...list.slice(0, removeIndex),
    ...list.slice(removeIndex + 1)
  ]
}

export const addName = (list = [], item) => {
  return [...list, item]}

export const validateAdd = (input) => input.replace(/[^a-z]/gi, '').length > 1

export const generateId = () => Math.floor(Math.random() * 100000)

export const updateById = (list, id, updated) => {
  const updatedIndex = list.findIndex(item => item.id === id)
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex + 1)
  ]
}

export const updateList = (list, updatedItem) => {
  const updatedIndex = list.findIndex(item => item.id === updatedItem.id)
  return [
    ...list.slice(0, updatedIndex),
    updatedItem,
    ...list.slice(updatedIndex + 1)
  ]
}

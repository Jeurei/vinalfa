const categories = (state: any = [], action: any) => {
  switch (action.type) {
    case 'ADD_CATEGORIES':
      if (state.length >= 5) state.shift()
      
      return [ ...state, action.json ]
    default:
      return state
  }
}

export default categories
const car = (state: any = [], action: any) => {
  switch (action.type) {
    case 'ADD_CAR':
      if (state.length >= 5) state.shift()
      
      return [ ...state, action.json ]
    default:
      return state
  }
}

export default car
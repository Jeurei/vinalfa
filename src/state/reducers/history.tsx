const history = (state: any = [], action: any) => {
  switch (action.type) {
    case 'ADD_HISTORY':
      // if (state.find(item => {if (item.link === action.link.link) return item}))

      if (state.length >= 5) state.pop()
      
      document.title =  action.link.name === 'Главная' ? 'Оригинальные каталоги' : action.link.name
      return [ action.link, ...state ]
    default:
      return state
  }
}

export default history
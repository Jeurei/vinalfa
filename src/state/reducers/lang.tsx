const data = (window as any).vinalfaModul

const initLang = () => {
  if (data && data.lang) {
    if (data.lang.isAuto) {
      const l = ["ru", "be", "kk", "tg", "az", "hy", "ka", "ky", "tk", "uz"]
      
      return l.includes(window.navigator.language.substr(0, 2)) ? 'ru' : 'en'
    }
    else
    return data.lang.language
  } else {
    return "ru"
  }
}

const lang = (state: string = initLang(), action: any) => {
  switch (action.type) {
    case 'CHANGE_LANG':    
      return action.lang
    default:
      return state
  }
}

export default lang
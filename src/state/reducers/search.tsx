const autoKeyboardLang = (str) => {
  var s = [
    "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
    "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э",
    "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "o"
  ];

  var r = [
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "", "",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", "", "",
    "z", "x", "c", "v", "b", "n", "m", "", "", "0"
  ];

  for (let i = 0; i < s.length; i++) {
    let reg = new RegExp(s[i], 'mig');
    str = str.replace(reg, function (a) {
      return a === a.toLowerCase() ? r[i] : r[i].toUpperCase();
    });
  }
  return str;
}

const search = (state: string = '', action: any) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return autoKeyboardLang(action.value.toUpperCase())
    case 'DEL_SEARCH':
      return ''
    default:
      return state
  }
}

export default search
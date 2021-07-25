const quickSearch = (state: any = [], action: any) => {
  if (!action.data) {
    action.data = [];
  }

  switch (action.type) {
    case 'ADD_QUICK_SEARCH': {
      return [...state, ...action.data];
    }
    default:
      return state;
  }
};

export default quickSearch;

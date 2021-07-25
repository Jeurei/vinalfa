import { combineReducers } from 'redux';
import search from 'state/reducers/search';
import found from 'state/reducers/found';
import categories from 'state/reducers/categories';
import car from 'state/reducers/car';
import lang from 'state/reducers/lang';
import history from 'state/reducers/history';
import group from 'state/reducers/group';
import subgroup from 'state/reducers/subgroup';
import quickSearch from 'state/reducers/quickSearch';

export default combineReducers({
  search,
  found,
  categories,
  car,
  lang,
  history,
  group,
  subgroup,
  quickSearch,
});

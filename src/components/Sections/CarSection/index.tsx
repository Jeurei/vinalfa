// CUR COMPONENT
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addHistory } from 'state/actions/history';
import { setSearch } from 'state/actions/search';
import { addGroup } from 'state/actions/group';
import { getGroups } from 'fetch';
import './style.scss';

// COMPONENTS
import Card from 'components/Card';
import Sidebar from './Sidebar';
import Sections from './Sections';
import QuickSearch from './QuicSearch';
import Loading from 'components/Loading';
import Error from 'components/Error';

type Props = {
  groups: any;
  setSearch(value: string): void;
  addHistory(data: any): void;
  addGroup(json: any): void;
};

// РЕКУРСИВНЫЙ ПОИСК ПО ХЭШУ
const search = (tree, hash?) => {
  let res;
  for (const branch of tree) {
    if (res) return res;
    if (branch.hasChild) {
      res = search(branch.children, hash);
    }
    if (hash && branch.hash === hash) return branch;
    if (branch.hash) return branch;
  }
};

const Car: React.FC<Props> = ({ groups, setSearch, addHistory, addGroup }) => {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [filter, setFilter] = useState('');

  // ПОЛУЧИТЬ ДАННЫЕ
  useEffect(() => {
    let isSubscribed = true; // ОБНОВЛЯЕМ ПОДПИСКУ

    const isFilterSearch = location.pathname.slice(1).split('/')[0].indexOf('search_') !== -1;
    const sec = location.pathname.slice(1).split('/')[0].split('_').slice(1);

    // ОПРЕДЕЛЯЕМ ЗАПРОС
    const linkToServer = isFilterSearch ? getGroups(params.car) : getGroups(params.car);

    // ИЩЕМ В ХРАНИЛИЩЕ ГРУППУ
    const group = groups.find((i) => i.car === params.car);
    if (group) setData(group); // ОТОБРАЗИТЬ ЕСЛИ НАШИЛ В ХРАНИЛИЩЕ

    if (!group) {
      // НАЧИНАЕМ ЗАГРУЗКУ
      if (isSubscribed) {
        setLoadingStatus(true); // ОБНОВИТЬ ЗАГРУЗКУ
        setError(null); // ОБНОВИТЬ ОШИБКИ
      }

      // ЗАПРОС НА СЕРВЕР ЗА САЙДБАРОМ ПО ХЭШУ
      linkToServer
        .then((res) => {
          if (isSubscribed) {
            if (!isFilterSearch && res.response.vin !== params.vin) history.replace('/');
            res.response = { ...res.response, ...{ car: params.car } };
            setData(res.response); // ОТОБРАЗИТЬ
            addGroup(res.response); // В ХРАНИЛИЩЕ
          }
        })
        .catch((message) => {
          if (isSubscribed) setError(message || 'Error'); // ПОКАЗАТЬ ОШИБКУ
        })
        .finally(() => {
          if (isSubscribed) setLoadingStatus(false); // ЗАКОНЧИТЬ ЗАГРУЗКУ
        });
    }

    return () => {
      isSubscribed = false; // ОТПИСЫВАЕМСЯ
    };
  }, [params.car, setSearch]);

  // РЕДИРЕКТ НА ПЕРВУЮ ПОДГРУППУ
  useEffect(() => {
    if (data.data && !params.group) {
      const subgroup = search(data.data.sections);
      history.replace(history.location.pathname + '/' + subgroup.hash);
    }
  }, [params.group, data]);

  // ОБНОВИТЬ ИСТОРИЮ
  useEffect(() => {
    if (data.data && params.group) {
      const subgroup = search(data.data.sections, params.group);
      addHistory({ name: `${data.catalog} | ${subgroup.name}`, link: location.pathname });
    }
  }, [params.group, data]);

  return (
    <Error isError={error} isCard={true}>
      <Loading isLoaded={loadingStatus} isCard={true}>
        {data && data.data && (
          <div className='w-b'>
            <div className='qs'>
              <QuickSearch setFilter={setFilter} />
            </div>
            <div className='sb'>
              <Card>
                <div style={{ display: 'grid' }}>
                  <Sidebar data={data} />
                </div>
              </Card>
            </div>
            <div className='sections'>
              <Card>
                <Sections filter={filter} setFilter={setFilter} />
              </Card>
            </div>
          </div>
        )}
      </Loading>
    </Error>
  );
};

const mapStateToProps = (state) => ({
  groups: state.group,
});
const mapDispatchToProps = (dispatch) => ({
  setSearch: (value: string) => dispatch(setSearch(value)),
  addHistory: (link: any) => dispatch(addHistory(link)),
  addGroup: (data: any) => dispatch(addGroup(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Car);

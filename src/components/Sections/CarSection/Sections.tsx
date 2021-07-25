// CUR COMPONENTS
import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import { getSubgroup, searchByHash } from 'fetch';
import { connect } from 'react-redux';
import { addSubgroup } from 'state/actions/subgroup';

// LANG
import dataLang from 'lang/PartsList/Parts/lang.json';

// ICONS
import ListIcon from './Icon/ListIcon';
import GridIcon from './Icon/GridIcon';

// COMPONENTS
import Loading from 'components/Loading';
import Error from 'components/Error';
import Items, { LoadedItems } from './Items';

import { useParams } from 'react-router-dom';
import SearchClear from 'components/Search/SearchClear';

type Props = {
  lang: string;
  subgroup: any;
  filter: string;
  setFilter(str: string): void;
  addSubgroup(json: any): void;
};

const Sections: React.FC<Props> = ({ lang, subgroup, addSubgroup, filter, setFilter }) => {
  const { car, group } = useParams();

  const [data, setData] = useState({} as any);
  const [error, setError] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [showMode, setShowMode] = useState(false);
  const [searchedData, setSearchedData] = useState<any>([]);

  const servDelay = useRef<any>();

  const marks = [
    'Toyota',
    'Lexus',
    'Ford',
    'Honda',
    'Nissan',
    'Infiniti',
    'Datsun',
    'Mercedes-Benz',
    'Smart',
    'Maybach',
    'Chevrolet',
    'Saab',
    'Cadillac',
    'Buick',
    'Hummer',
    'Opel',
    'Pontiac',
    'Oldsmobile',
    'Daewoo',
    'Saturn',
    'Hyundai',
    'Kia',
    'Mitsubishi',
    'SsangYong',
    'Subaru',
    'Mazda',
    'Chrysler',
    'Dodge',
    'Jeep',
    'Fiat',
    'Lancia',
    'Alfa Romeo',
    'Abarth',
    'Volkswagen',
    'Audi',
    'Skoda',
    'Seat',
  ];
  // const marks = ['Toyota', 'Lexus', 'Ford', 'Honda', 'Nissan', 'Infiniti', 'Datsun', 'Mercedes-Benz']

  useEffect(() => {
    let isSubscribed = true; // ОБНОВЛЯЕМ ПОДПИСКУ

    if (group) {
      // ИЩЕМ В ХРАНИЛИЩЕ ГРУППУ
      const subgroups = subgroup.find((i) => i.hash === group);

      if (subgroups) setData(subgroups); // ОТОБРАЗИТЬ ЕСЛИ НАШЛИ В ХРАНИЛИЩЕ

      if (!subgroups) {
        // НАЧИНАЕМ ЗАГРУЗКУ
        if (isSubscribed) {
          setLoadingStatus(true); // ОБНОВИТЬ ЗАГРУЗКУ
          setError(null); // ОБНОВИТЬ ОШИБКИ
        }

        // ЗАПРОС НА СЕРВЕР ЗА ДЕТАЛЯМИ ПО ХЭШУ
        getSubgroup(group)
          .then((res) => {
            if (isSubscribed) {
              setData(res.response); // ОТОБРАЗИТЬ
              addSubgroup({ ...res.response, hash: group }); // В ХРАНИЛИЩЕ
            }
          })
          .catch((message) => {
            if (isSubscribed) setError(message); // ПОКАЗАТЬ ОШИБКУ
          })
          .finally(() => {
            if (isSubscribed) setLoadingStatus(false); // ЗАКОНЧИТЬ ЗАГРУЗКУ
          });
      }
    }

    return () => {
      isSubscribed = false; // ОТПИСЫВАЕМСЯ
    };
  }, [group]);

  // ПЕРКЛЮЧЕНИЕ МЕЖДУ СПИСКОМ И ПЛИТКОЙ
  const changeShowMode = (type) => {
    switch (type) {
      case 'l':
        setShowMode(false);
        break;
      case 'g':
        setShowMode(true);
        break;
    }
  };

  // ПОИСК
  const filterHandler = (e) => {
    const curval = e.target.value;
    setFilter(curval);
  };

  useEffect(() => {
    let isSubscribed = true;
    clearTimeout(servDelay.current);

    if (filter && marks.includes(data.catalog)) {
      if (isSubscribed) {
        setLoadingStatus(true); // ОБНОВИТЬ ЗАГРУЗКУ
        setError(null); // ОБНОВИТЬ ОШИБКИ
      }

      servDelay.current = setTimeout(() => {
        searchByHash(car, filter)
          .then((res) => {
            if (isSubscribed) setSearchedData(res.data);
          })
          .catch((message) => {
            if (isSubscribed) setError(message); // ПОКАЗАТЬ ОШИБКУ
          })
          .finally(() => {
            if (isSubscribed) setLoadingStatus(false); // ЗАКОНЧИТЬ ЗАГРУЗКУ
          });
      }, 250);
    } else {
      if (isSubscribed) {
        setLoadingStatus(false);
        setError(null);
      }
    }

    return () => {
      isSubscribed = false;
    };
  }, [filter]);

  const onClearClickHandler = () => {
    setFilter('');
  };

  return (
    <div className="section__items">
      <div className="car-toolbar">
        <div className="search-input__container search-input__container--hw">
          <input type="text" placeholder={`${dataLang[lang].parts_input}...`} className="search-input search-input_hw" onChange={filterHandler} value={filter} />
          {filter.length !== 0 && <SearchClear clickHandler={onClearClickHandler} />}
        </div>
        <div className="car-toolbar__view">
          <div className="list__view">
            <div className="view">
              {!(marks.includes(data.catalog) && filter) && (
                <>
                  <div className={`view__item ${!showMode ? 'view__item_active' : ''}`} onClick={() => changeShowMode('l')}>
                    <GridIcon />
                  </div>
                  <div className={`view__item ${showMode ? 'view__item_active' : ''}`} onClick={() => changeShowMode('g')}>
                    <ListIcon />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Error isError={error}>
        <Loading isLoaded={loadingStatus}>
          <div className={`car-items ${showMode || (marks.includes(data.catalog) && filter) ? 'car-items_active' : ''}`}>
            {marks.includes(data.catalog) && filter
              ? searchedData && searchedData.map((item, index) => <LoadedItems data={item} filter={item.foundParts.map((it) => it.ref)} key={index} />)
              : data && data.data && <Items data={data.data.units.filter((i) => i.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)} />}
          </div>
        </Loading>
      </Error>
    </div>
  );
};

const mapStateToProps = (state) => ({
  lang: state.lang,
  subgroup: state.subgroup,
});
const mapDispatchToProps = (dispatch) => ({
  addSubgroup: (json: any) => dispatch(addSubgroup(json)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sections);

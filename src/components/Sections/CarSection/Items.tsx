// CUR COMPONENT
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ReactComponent as InfoLogo } from './Icon/info-solid.svg';
import { getParts } from 'fetch';
import Loading from 'components/Loading';

// CONFIG
const config = (window as any).vinalfaModul;

type Props = {
  data: any;
};
const Items: React.FC<Props> = ({ data }) => {
  return data.map((item, index) => <Item item={item} key={index} />);
};

type LoadedProps = {
  data: any;
  filter: string[];
};
const LoadedItems: React.FC<LoadedProps> = ({ data, filter }) => {
  return <LoadedItem item={data} filter={filter} />;
};

type LoadedItemProps = {
  item: any;
  filter: string[];
};
const LoadedItem: React.FC<LoadedItemProps> = ({ item, filter }) => {
  const [loadedData, setLoadedData] = useState<any>();
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) setLoadingStatus(true);

    getParts(item.hash)
      .then((res) => {
        debugger;
        if (res.response.data && isSubscribed) {
          const data = res.response.data.parts ?? [];
          setLoadedData(
            data.filter((item) => {
              if (filter.includes(item.reference)) return item;
            })
          );
        }
      })
      .finally(() => {
        if (isSubscribed) setLoadingStatus(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return <Item item={item} loading={loadingStatus} loadedData={loadedData} />;
};

type ItemProps = {
  item: any;
  loading?: boolean;
  loadedData?: any;
};
const Item: React.FC<ItemProps> = ({ item, loading, loadedData }) => {
  let { url } = useRouteMatch();
  let dataArr: any[] = [];

  if (loadedData) {
    dataArr = loadedData.filter((el) => el.numbers.length);
  }

  return (
    <div className='car-items__item'>
      <div className='car-item'>
        <Link to={`${url}/${item.hash}`} className='car-item__thumb'>
          <img src={item.image} alt={item.name} />

          {Object.keys(item.info).length !== 0 && <ItemInfo info={Object.entries(item.info)} />}
        </Link>
        <div className='car-item__w'>
          <Link to={`${url}/${item.hash}`}>
            <h4 className='car-item__title'>{item.name}</h4>
          </Link>

          {typeof loading !== 'undefined' && (
            <Loading isLoaded={loading}>
              <div className='car-item__data'>
                {loadedData &&
                  dataArr &&
                  dataArr.map((jitem, i) =>
                    jitem.numbers.map((item, j) => (
                      <div className='csd' key={i + '_' + j}>
                        <div className='csd__label'>Артикул: {item.label}</div>
                        <div className='csd__article'>{item.number}</div>
                        {config && config.search && (
                          <a
                            href={config.search.replace('{article}', item.number)}
                            target='_blank'
                            rel='noopener noreferrer'>
                            <div className='csd__prices'>Цены</div>
                          </a>
                        )}
                      </div>
                    ))
                  )}
              </div>
            </Loading>
          )}
        </div>
      </div>
    </div>
  );
};

type InfoProps = {
  info: any;
};
const ItemInfo: React.FC<InfoProps> = ({ info }) => {
  return (
    <div className='info'>
      <div className='info__icon'>
        <InfoLogo />
      </div>
      <div className='info__data'>
        <ul className='info__list'>
          {info.map(([key, value], index) => (
            <li className='info__item' key={index}>
              <b>{key}:</b> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Items;
export { LoadedItems };

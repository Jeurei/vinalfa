// CUR COMPONENT
import './style.scss';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { addHistory } from 'state/actions/history';
import { getParts, getSubgroup, getGroups, getModifications } from 'fetch';

// COMPONENTS
import Card from 'components/Card';
import Loader from 'components/Loader';
import PanzoomSection from './PanzoomSection';
import DetailsTable from './DetailsTable';
import CustomSelectCategories from './CustomSelectCategories';
import Error from 'components/Error';
import Loading from 'components/Loading';

type Props = {
  addHistory(data: any): void;
};

const Part: React.FC<Props> = ({ addHistory }) => {
  const { part, car, vin, group } = useParams();
  const location = useLocation();
  const [data, setData] = useState({} as any);
  const [selectedItems, setSelectedItems] = useState([] as any[]);
  const [hoveredItem, setHoveredItem] = useState(null as any);
  const [error, setError] = useState<string>('');
  const [loadingStatus, setLoadingStatus] = useState(true);

  const hoverItem = (item) => {
    setSelectedItems((prev: any[]) => [...prev, item]);
  };
  const unhoverItem = (item) => {
    setSelectedItems((prev: any[]) => prev.filter((i) => i !== item));
  };
  const clickItem = (item = 'all', e) => {
    if (!(e && (e.target.closest('.more') || e.target.closest('.price')))) {
      if (item === 'all') {
        setSelectedItems([]);
      } else {
        if (selectedItems.includes(item)) {
          if (!e || e.target.closest('.detail-item__checkbox')) {
            unhoverItem(item);
          }
        } else {
          if (!e || e.target.closest('.detail-item__checkbox')) {
            hoverItem(item);
          }
        }
      }
    }
  };
  const hoverMItem = (item) => {
    if (item === hoveredItem) setHoveredItem(null);
    else setHoveredItem(item);
  };

  const checkGroupUrl = (el) => {
    if (el) {
      if (!el.children) {
        return el.hash === group;
      } else {
        return el.children.find((elem) => checkGroupUrl(elem));
      }
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      setLoadingStatus(true);
      setError('');
    }

    getModifications(vin).then((res) => {
      console.log(res.response.data.modifications.find((el) => el.hash === car));
      if (isSubscribed) {
        if (!res.response.data.modifications.find((el) => el.hash === car)) {
          setError('Ошибка в url, попробуйте начать поиск заново');
          return;
        }
      }
    });

    getGroups(car).then((res) => {
      if (isSubscribed) {
        if (!res.response.data.sections.find((el) => checkGroupUrl(el))) {
          setError('Ошибка в url, попробуйте начать поиск заново');
          return;
        }
      }
    });

    getParts(part)
      .then((res) => {
        if (isSubscribed) setData(res.response);
      })
      .catch((message) => {
        if (isSubscribed) setError(message);
      })
      .finally(() => {
        if (isSubscribed) setLoadingStatus(false);
      });

    return () => {
      isSubscribed = false;
    };
  }, [part]);
  useEffect(() => {
    if (data.data)
      addHistory({ name: `${data.catalog} | ${data.sectionName}`, link: location.pathname });
  }, [data]);

  return (
    <div className='part'>
      <Card>
        <Error isError={error}>
          <Loading isLoaded={loadingStatus}>
            {data && (
              <div className='section__title'>
                <h2 className='section__header'>{data.sectionName}</h2>

                <div className='part__wrapper'>
                  <div className='part__detail'>
                    <div className='part__s-actions'>
                      <div className='' style={{ flex: 1 }}>
                        <CustomSelectCategories />
                      </div>
                    </div>
                    <PanzoomSection
                      data={data.data}
                      selectedItems={selectedItems}
                      clickItem={clickItem}
                      hoveredItem={hoveredItem}
                      hoverMItem={hoverMItem}
                    />
                  </div>
                  <div className='part__table'>
                    <DetailsTable
                      data={data.data}
                      selectedItems={selectedItems}
                      clickItem={clickItem}
                      hoveredItem={hoveredItem}
                      hoverMItem={hoverMItem}
                    />
                  </div>
                </div>
              </div>
            )}
          </Loading>
        </Error>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  addHistory: (link: any) => dispatch(addHistory(link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Part);

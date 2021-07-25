// CUR COMPONENT
import React, { useEffect, useState } from 'react';
import './style.scss';
import { connect } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { addFound } from 'state/actions/found';
import { addHistory } from 'state/actions/history';
import { getModifications } from 'fetch';

// LANG
import dataLang from 'lang/Found/lang.json';

// COMPONENTS
import Error from 'components/Error';
import FoundItem from './FoundItem';
import Loading from 'components/Loading';

type Props = {
  lang: string;
  found: any[];
  addFound(json: any): void;
  addHistory(data: any): void;
};

const Found: React.FC<Props> = ({ lang, found, addFound, addHistory }) => {
  const { vin } = useParams();
  const location = useLocation();
  const [error, setError] = useState<any>(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    let isSubscribed = true;

    //ИЩЕМ МОДИФИКАЦИИ В ХРАНИЛИЩЕ
    const modifications = found.find((item) => item.vin === vin);

    // ЕСЛИ НАШЛИ СТАВИМ
    // ЕСЛИ НЕТ ДОСТАЕМ ИЗ БАЗЫ
    if (modifications) setData(modifications);
    if ((!data || data.vin !== vin) && !modifications) {
      // ОБНОВЛЯЕМ ОШИБКИ И ЗАГРУЗКУ
      if (isSubscribed) {
        setLoadingStatus(true);
        setError(null);
      }
      // ЗАПРАШИВАЕМ У СЕРВЕРА МОДИФИКАЦИЮ ПО ВИН
      getModifications(vin)
        .then((res) => {
          if (isSubscribed) {
            setData(res.response);
            addFound(res.response);
          }
        })
        .catch((message) => {
          if (isSubscribed) setError(message || 'Error'); // ПОСТАВИТЬ ОШИБКУ
        })
        .finally(() => {
          if (isSubscribed) setLoadingStatus(false); // ЗАКОНЧИТЬ ЗАГРУЗКУ
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [vin]);

  useEffect(() => {
    if (data) addHistory({ name: data.catalog, link: location.pathname });
  }, [data]);

  return (
    <Error isError={error}>
      <Loading isLoaded={loadingStatus}>
        {data && (
          <>
            <div className='section__title'>
              <h2 className='section__header section__header_wd'>{data.catalog}</h2>
              <span className='section__header'>
                {dataLang[lang].found_result.result}: {data.data.modifications.length}{' '}
                {dataLang[lang].found_result.elements}
              </span>
            </div>
            <div className='found-section'>
              <ul className='found-section__list'>
                {data.data.modifications.map((item, index) => (
                  <FoundItem item={item} key={index} />
                ))}
              </ul>
            </div>
          </>
        )}
      </Loading>
    </Error>
  );
};

const mapStateToProps = (state) => ({
  lang: state.lang,
  data: state.req,
  found: state.found,
});
const mapDispatchToProps = (dispatch) => ({
  addFound: (json: any) => dispatch(addFound(json)),
  addHistory: (link: any) => dispatch(addHistory(link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Found);

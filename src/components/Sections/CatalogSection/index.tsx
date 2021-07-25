// CUR COMPONENT
import React, { useEffect, useState } from 'react';
import './style.scss';
import { addHistory } from 'state/actions/history';
import { connect } from 'react-redux';
import { getCatalogs } from 'fetch';

// LANG
import dataLang from 'lang/Catalog/lang.json';

// COMPONENTS
import Brand from './Brand';
import Error from 'components/Error';
import Loading from 'components/Loading';

type Props = {
  lang: string;
  addHistory(data: any): void;
};

const Catalog: React.FC<Props> = ({ lang, addHistory }) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    setLoadingStatus(true);
    setError(null);
    getCatalogs()
      .then((res) => {
        if (isSubscribed) setData(res);
      })
      .catch((message) => {
        if (isSubscribed) setError(message || 'Error');
      })
      .finally(() => {
        if (isSubscribed) setLoadingStatus(false);
      });

    addHistory({ name: 'Главная', link: '/' });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <Error isError={error}>
        <Loading isLoaded={loadingStatus}>
          {data && (
            <>
              <h2 className='section__header'>{dataLang[lang].catalog_title}</h2>
              <div className='catalog__list'>
                {data.map((item) => (
                  <Brand key={item.id} brand={item} />
                ))}
              </div>
            </>
          )}
        </Loading>
      </Error>
    </>
  );
};

const mapStateToProps = (state) => ({
  lang: state.lang,
});
const mapDispatchToProps = (dispatch) => ({
  addHistory: (link: any) => dispatch(addHistory(link)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

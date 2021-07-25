// CUR COMPONENT
import React, { useState, useEffect } from 'react';
import './style.scss';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCar } from 'state/actions/car';
import { getModifications } from 'fetch';
import { setSearch } from 'state/actions/search';

// COMPONENTS
import Card from 'components/Card';
import Main from './Main';
import Error from 'components/Error';
import Loading from 'components/Loading';

type Props = {
  lang: string;
  carC: any; //CAR CACHE
  addCar(json: any): void;
  setSearch(value: string): void;
};

const AboutCar: React.FC<Props> = ({ lang, carC, addCar, setSearch }) => {
  const { vin, car } = useParams();
  const [data, setData] = useState({} as any);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState('');
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    let isSubscribed = true;
    // ИЩЕМ МОДИФИКАЦИЮ В ХРАНИЛИЩЕ
    const fCar = carC.find((item) => {
      if (item.vin === vin) return item;
    });

    // ЕСЛИ НАШЛИ СТАВИМ
    // ЕСЛИ НЕТ ДОСТАЕМ ИЗ БАЗЫ
    if (fCar) setData(fCar);
    if ((!data || data.car !== car) && !fCar) {
      // ОБНОВЛЯЕМ ОШИБКИ И ЗАГРУЗКУ
      if (isSubscribed) {
        setLoadingStatus(true);
        setError('');
      }
      // ЗАПРАШИВАЕМ У СЕРВЕРА МОДИФИКАЦИЮ ПО ВИН
      getModifications(vin)
        .then((res) => {
          if (isSubscribed) {
            if (!res.response.data.modifications.find((el) => el.hash === car)) {
              setError('Ошибка в url, попробуйте начать поиск заново');
              return;
            }
            setData(res.response);
            addCar(res.response);
            setSearch(res.response.vin);
          }
        })
        .catch((message) => {
          if (isSubscribed) setError(message);
        })
        .finally(() => {
          if (isSubscribed) setLoadingStatus(false);
        });
    }

    return () => {
      isSubscribed = false;
    };
  }, [car]);

  return (
    <div className='car'>
      <Card>
        <Error isError={error}>
          <Loading isLoaded={loadingStatus}>
            {data && data.data && <Main data={data} lang={lang} />}
          </Loading>
        </Error>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  carC: state.car,
  lang: state.lang,
});
const mapDispatchToProps = (dispatch) => ({
  addCar: (json: any) => dispatch(addCar(json)),
  setSearch: (value: string) => dispatch(setSearch(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutCar);

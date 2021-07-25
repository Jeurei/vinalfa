// // CUR COMPONENT
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
import SwiperCore, { Pagination } from 'swiper';
import React, { useEffect, useState } from 'react';
import { addQuickSearch } from 'state/actions/quickSearch';

// fetch
import { getQuickSearch } from 'fetch';

// componenets
import { Swiper, SwiperSlide } from 'swiper/react';
import Error from 'components/Error';
import Loading from 'components/Loading';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
// // LANG
// import dataLang from 'lang/PartsList/Sidebar/lang.json'

const QUANTITY_OF_ITEMS = 9;

interface Data {
  value: string;
  img: string;
  text: string;
}

type Props = {
  setFilter(str: string): void;
  searchData: Data[];
  addQuickSearch(data: any): void;
};

const getSliderQuickSearch = (arr, action) => {
  SwiperCore.use([Pagination]);

  return (
    <ul className='qs-list qs-list--slider'>
      <Swiper
        loop
        pagination={{
          dynamicBullets: true,
        }}
        slidesPerView='auto'>
        {arr.map((el, index) => (
          <SwiperSlide>
            <li className='qs-item' key={index}>
              <a href='/' className='qs-link' id={el.value} onClick={action}>
                <div className='qs-img-container'>
                  <img className='qs-img' src={el.img} alt={el.text} width='50' height='50' />
                </div>
                <span className='qs-text'>{el.text}</span>
              </a>
            </li>
          </SwiperSlide>
        ))}
      </Swiper>
    </ul>
  );
};

const getDefaultQuickSearch = (arr, quantity, action, showMore) => {
  return (
    <ul className='qs-list'>
      {arr.slice(0, quantity - 1).map((el, index) => (
        <li className='qs-item' key={index}>
          <a href='/' className='qs-link' id={el.value} onClick={action}>
            {el.img && (
              <div className='qs-img-container'>
                <img className='qs-img' src={el.img} alt={el.text} width='50' height='50' />
              </div>
            )}
            <span className='qs-text'>{el.text}</span>
          </a>
        </li>
      ))}
      {quantity < arr.length && (
        <li className='qs-item'>
          <button
            className='qs-show-more'
            type='button'
            aria-label='Показать ещё?'
            onClick={() => showMore((prev) => prev + QUANTITY_OF_ITEMS)}>
            Показать ещё?
          </button>
        </li>
      )}
    </ul>
  );
};

const QuickSearch: React.FC<Props> = ({ setFilter, searchData, addQuickSearch }) => {
  const TABLET_MIN_WIDTH = 720;
  const MIN_QUANTITY_FOR_SLIDER = 4;
  const [isSlider, setSlider] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState<number>(QUANTITY_OF_ITEMS);
  const [data, setData] = useState<Array<any>>([]);
  const [error, setError] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);

  const onElementClickHandler = (evt: React.MouseEvent<HTMLElement>): void => {
    evt.preventDefault();
    setFilter(evt.currentTarget.id);
  };

  const onResizeHandler = () => {
    if (window.screen.width <= TABLET_MIN_WIDTH) {
      setSlider(true);
    } else {
      setSlider(false);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    if (searchData.length) {
      setData(searchData);
    } else {
      setLoadingStatus(true);
      setError(null);

      getQuickSearch()
        .then((res) => {
          addQuickSearch(res.response);
          if (isSubscribed) setData(res.response);
        })
        .catch((message) => {
          if (isSubscribed) setError(message || 'Error');
        })
        .finally(() => {
          if (isSubscribed) setLoadingStatus(false);
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    onResizeHandler();
    window.addEventListener('resize', onResizeHandler);

    return () => {
      window.removeEventListener('resize', onResizeHandler);
    };
  }, []);

  return (
    <>
      <Error isError={error}>
        <Loading isLoaded={loadingStatus}>
          {isSlider && data.length > MIN_QUANTITY_FOR_SLIDER
            ? getSliderQuickSearch(data, onElementClickHandler)
            : getDefaultQuickSearch(
                data,
                currentQuantity,
                onElementClickHandler,
                setCurrentQuantity
              )}
        </Loading>
      </Error>
    </>
  );
};

const mapStateToProps = (state) => ({
  searchData: state.quickSearch,
});

const mapDispatchToProps = (dispatch) => ({
  addQuickSearch: (data: []) => dispatch(addQuickSearch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickSearch);

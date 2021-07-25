// CUR COMPONENT
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

// LANG
import dataLang from 'lang/PartsList/Sidebar/lang.json';

// COMPONENT
import { PlusIcon, MinusIcon } from './Icon/ActionIcon';
import SearchClear from 'components/Search/SearchClear';
import MobileSelect from 'components/Search/MobileSelect';

type Props = {
  lang: string;
  data: any;
};

const Sidebar: React.FC<Props> = ({ lang, data }) => {
  const MOBILE_MIN_WIDTH = 420;
  const [filter, setFilter] = useState('');
  const [isNativeSelect, setNativeSelect] = useState(false);
  const [isSlectHidden, setSelectHidden] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchHandler = (e) => {
    setFilter(e.target.value);
  };
  const getSearched = (array, search = '') => {
    if (search === '') return array;

    return array.filter((item) => isIsset(item, search));
  };
  const isIsset = (item, search) => {
    if (item.hasChild) {
      for (const el of item.children) {
        const isHas = isIsset(el, search);

        if (isHas) {
          return true;
        }
      }
    }
    return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  };

  const onResizeHandler = () => {
    if (window.screen.width <= MOBILE_MIN_WIDTH) {
      setNativeSelect(true);
    } else {
      setNativeSelect(false);
    }
  };

  useEffect(() => {
    onResizeHandler();
    window.addEventListener('resize', onResizeHandler);

    return () => {
      window.removeEventListener('resize', onResizeHandler);
    };
  }, []);

  const onSelectButtonClickHandler = () => {
    setSelectHidden(!isSlectHidden);
  };

  useEffect(() => {
    if (isSlectHidden) {
      searchInputRef.current?.focus();
    }
  }, [isSlectHidden]);

  const onClearClickHandler = () => {
    setFilter('');
  };

  return isNativeSelect && !isSlectHidden ? (
    <MobileSelect data={data.data.sections} setHidden={onSelectButtonClickHandler} />
  ) : (
    <>
      <div className='search-input__container'>
        <input
          placeholder={`${dataLang[lang].sidebar_input}...`}
          className='search-input'
          onChange={searchHandler}
          value={filter}
          ref={searchInputRef}
        />
        {filter.length !== 0 && <SearchClear clickHandler={onClearClickHandler} />}
      </div>
      <Groups setHidden={onSelectButtonClickHandler} isSelect={isNativeSelect}>
        {getSearched(data.data.sections, filter).map((el, index) => (
          <GroupItem item={el} key={index} filter={filter} />
        ))}
      </Groups>
    </>
  );
};

const Groups = ({ children, setHidden, isSelect }) => {
  return (
    <>
      <ul className='categories'>{children}</ul>
      {isSelect && (
        <button
          className='category-select-button category-select-button--back'
          type='button'
          onClick={setHidden}>
          Список груп
        </button>
      )}
    </>
  );
};

const GroupItem = ({ item, isOpen = false, filter }) => {
  const { group } = useParams();

  const [showStatus, setShowStatus] = useState(isOpen);

  useEffect(() => {
    if (filter) {
      setShowStatus(true);
    } else {
      setShowStatus(false);
    }
  }, [filter]);

  const showMenu = () => {
    setShowStatus((prev) => !prev);
  };

  return (
    <li
      className={`categories__item ${item && item.hash === group ? 'active' : ''} ${
        showStatus ? 'categories__item_active' : ''
      }`}>
      <div className='categories__text' onClick={showMenu}>
        {item.hash ? (
          <Link to={item.hash}>
            <span className='categories__title'>
              <FoundName title={item.name} filter={filter} />
            </span>
          </Link>
        ) : (
          <span className='categories__title'>
            <FoundName title={item.name} filter={filter} />
          </span>
        )}
        {item.hasChild && (
          <div className='categories__more'>{showStatus ? <MinusIcon /> : <PlusIcon />}</div>
        )}
      </div>

      {item.hasChild && (
        <ul>
          {item.children.map((el, index) => (
            <GroupItem item={el} filter={filter} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
};

const FoundName = ({ title, filter }) => {
  if (filter) {
    const re = new RegExp(`(${filter})`, 'i');
    const matched = title.match(re);

    if (matched) {
      const sI = matched.index;
      const eI = matched.index + matched[0].length;

      const replaced = title.slice(sI, eI);

      return (
        <span
          dangerouslySetInnerHTML={{
            __html: title.replace(replaced, `<b>${replaced}</b>`),
          }}></span>
      );
    }
  }

  return title;
};

const mapStateToProps = (state) => ({
  lang: state.lang,
});

export default connect(mapStateToProps)(Sidebar);

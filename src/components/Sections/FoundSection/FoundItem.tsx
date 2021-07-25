// CUR COMPONENT
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

// LANG
import dataLang from 'lang/Found/lang.json';

// COMPONENTS
import MoreIcon from './MoreIcon';

type Props = {
  lang: string;
  item: any;
};

const FoundItem: React.FC<Props> = ({ lang, item }) => {
  let { url } = useRouteMatch();

  const model = `${item.model}`;

  const date = item.date;
  const catalog = item.catalog;
  const transmission = item.transmission;
  const engine = item.engine;
  const equipments = item.equipments;

  return (
    <>
      <Link to={`${url}/${item.hash}`}>
        <div className='found-item'>
          <h3 className='found-item__title'>{model}</h3>
          <ul className='found-item__list'>
            <li>
              <b>{dataLang[lang].found_item.date}</b>: {date.toLocaleString()}
            </li>
            <li>
              <b>{dataLang[lang].found_item.catalog}</b>: {catalog}
            </li>
            <li>
              <b>{dataLang[lang].found_item.engine}</b>: {engine}
            </li>
            <li>
              <b>{dataLang[lang].found_item.transmission}</b>: {transmission}
            </li>
            {equipments.map((equipment: any, index: number) => {
              if (equipment.value)
                return (
                  <li key={index}>
                    <b>{equipment.key}</b>: {equipment.value}
                  </li>
                );
              return null;
            })}
          </ul>
          <p className='more'>
            {dataLang[lang].found_item.link} <MoreIcon />
          </p>
        </div>
      </Link>
    </>
  );
};

const mapStateToProps = (state) => ({
  lang: state.lang,
});

export default connect(mapStateToProps)(FoundItem);

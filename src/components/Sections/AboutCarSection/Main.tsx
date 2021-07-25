// CUR COMPONENT
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// LANG
import dataLang from 'lang/Car/lang.json';

type Props = {
  data: any;
  lang: string;
};

const Main: React.FC<Props> = ({ data, lang }) => {
  const [showStatus, setShowStatus] = useState(false);
  const { car } = useParams();
  const popoverHandler = () => {
    setShowStatus((prev) => !prev);
  };
  let currentMod;
  if (data) {
    currentMod = data.data.modifications.find((el) => el.hash === car);
  }

  return (
    <>
      <div className='section__title'>
        <h2 className='section__header section__header_wd'>{`${data.catalog} ${currentMod.model}`}</h2>
        <div className='section__header section__info'>
          <p>
            {dataLang[lang].car_info.year}: <b>{currentMod.date}</b>
          </p>
          <p>
            {dataLang[lang].car_info.transmission}: <b>{currentMod.transmission}</b>
          </p>
          <p>
            {dataLang[lang].car_info.engine_code}: <b>{currentMod.engine}</b>
          </p>
        </div>
      </div>
      <div className='section__button'>
        <label className={`car-button ${!showStatus ? 'active' : ''}`} htmlFor='car-popover'>
          {!showStatus ? dataLang[lang].car_more.default : dataLang[lang].car_more.active}
        </label>
      </div>
      <input
        type='checkbox'
        id='car-popover'
        className='hid-btn-popover'
        onChange={popoverHandler}
        hidden
      />
      <div className='car-popover sct-popover'>
        {currentMod.equipments.length ? (
          <ul className='car-equipments'>
            {currentMod.equipments.map((equipment: any, index: number) => (
              <li key={index}>
                <b>{equipment.key}:</b> {equipment.value}
              </li>
            ))}
          </ul>
        ) : (
          <p className='car-popover__warning'>{dataLang[lang].car_more.error}</p>
        )}
      </div>
    </>
  );
};

export default Main;

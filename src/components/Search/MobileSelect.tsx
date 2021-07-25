import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

type Props = {
  data: any;
  setHidden: () => void;
};

const SelectOption = (data, key) => {
  const { group } = useParams();
  return (
    <option key={key} value={data.hash} selected={data.hash === group}>
      {data.name}
    </option>
  );
};

const MobileSelect: React.FC<Props> = ({ data, setHidden }) => {
  const history = useHistory();

  const onChangeSelectHandler = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    if (evt.target.value) {
      history.push(evt.target.value);
    }
  };

  return (
    <div>
      <select
        className='category-select'
        name='category'
        id='category'
        onChange={onChangeSelectHandler}>
        {data.map((el, index) => SelectOption(el, index))}
      </select>
      <button className='category-select-button' type='button' onClick={setHidden}>
        Поиск по группам
      </button>
    </div>
  );
};

export default MobileSelect;

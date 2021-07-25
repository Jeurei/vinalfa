// CUR COMPONENT
import React, { useState, useEffect, useRef } from "react"
import "./style.scss"
import { connect } from "react-redux"

// LANG
import dataLang from "lang/Part/lang.json"

// COMPONENTS
import { ReactComponent as ArrowDownIcon } from "./Icon/info-solid.svg"
import { ReactComponent as ArrowRightIcon } from "./Icon/arrow-right-solid.svg"



const config = (window as any).vinalfaModul


type Props = {
  lang: string,
  data: any,
  selectedItems: any[],
  clickItem(item?, e?): void,
  hoveredItem: any,
  hoverMItem(item): void
}

const DetailsTable:React.FC<Props> = ({ lang, data, selectedItems, clickItem, hoveredItem, hoverMItem }) => {

  const [ filteredStatus, setFilteredStatus ] = useState(false)
  const filterHandler = (e) => {
    setFilteredStatus( prev => !prev )
  }
  const clearSelectedItems = () => {
    clickItem()
  }

  const countEl = useRef<number>(selectedItems.length)
  const tableEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedItems.length === 0)
      setFilteredStatus( false )
    
    // ЕСЛИ МАССИВ УВЕЛИЧИЛСЯ
    if (countEl.current < selectedItems.length) {
      // ЭЛЛЕМЕНТ К КОТОРОМУ НАДО ПРОКРУТИТЬ
      const foundedEl: HTMLTableRowElement = tableEl.current?.querySelector(`[data-prev="${selectedItems[selectedItems.length - 1]}"]`) as HTMLTableRowElement
  
      // ПРОКРУЧИВАЕМ ТАБЛИЦУ ДО НУЖНОГО ЭЛЕМЕНТА
      tableEl.current?.scrollTo({
        top: foundedEl ? foundedEl.offsetTop : 0,
        behavior: "smooth"
      })
    }

    // ОБНОВЛЯЕМ РАЗМЕР МАССИВА
    countEl.current = selectedItems.length
  }, [ selectedItems ])


  return (
    <>
      <div className="part__s-actions">
        <div className="">
          <button 
            onClick={ filterHandler } 
            disabled={ selectedItems.length === 0 }
            className={`bordered-button ${ !filteredStatus ? "bordered-button_active" : "" }`}
          >
            { !filteredStatus ? dataLang[lang].part_filter.show.default : dataLang[lang].part_filter.show.active }
          </button>
        </div>
        <div className="">
          <button
            onClick={ clearSelectedItems }
            className={`bordered-button`}
            disabled={ selectedItems.length === 0 }
          >
            { dataLang[lang].part_filter.clear }
          </button>
        </div>
      </div>

      <div className="owft" ref={tableEl}>
        <table className="table parts-table">
          <tbody>
            {data.parts.map((item, i) => (!filteredStatus ? (
              item.numbers.map((el, j) => (
                <TableItem
                  lang={lang}
                  item={item}
                  hoveredItem={hoveredItem}
                  selectedItems={selectedItems}
                  clickItem={clickItem}
                  key={el.number}
                  el={el}
                  hoverMItem={hoverMItem}
                />
            ))) : (
              item.numbers.filter(() => selectedItems.includes(item.reference)).map(( el, j ) => (
                <TableItem
                  lang={lang}
                  item={item}
                  hoveredItem={hoveredItem}
                  selectedItems={selectedItems}
                  clickItem={clickItem}
                  key={el.number}
                  el={el}
                  hoverMItem={hoverMItem}
                />
              ))
            )))}
          </tbody>
        </table>
      </div>
    </>
  )
}


const TableItem = ({ item, hoveredItem, selectedItems, clickItem, lang, hoverMItem, el }) => {

  const [ openStatus, setOpenStatus ] = useState(false)

  const changeMore = () => {
    setOpenStatus(prev => !prev)
  }

  return (
    <>
      <tr
        data-prev={item.reference}
        className={`detail-table__item detail-item ${ hoveredItem === item.reference ? "detail-item_hovered" : "" } ${ selectedItems.includes( item.reference ) ? "detail-item_selected" : "" }`}
        onMouseEnter={ () => hoverMItem(item.reference) }
        onMouseLeave={ () => hoverMItem(item.reference) }
        onClick={(e) => clickItem(item.reference, e)}
      >
        <td className="detail-item__checkbox">
          <input 
            className="chbtx"
            type="checkbox"
            readOnly={ true }
            checked={ selectedItems.includes(item.reference) ? true : false }
          />
        </td>
        <td className="detail-item__num">{ item.reference }</td>
        <td className="detail-item__title">
          <p className="detail-item__name">{ el.label }</p>
          <p className="detail-item__article">
            { el.number } { el.replace && el.replace !== "" && (<><span className="detail-item__arrow"><ArrowRightIcon /></span> { el.replace }</>)}
          </p>
        </td>
        <td className="detail-item__counts">{ parseInt(el.count) } { dataLang[lang].part_item.qty }</td>
        <td className="detail-item__prices">
          {(config && config.search) && (
            <a href={config.search.replace('{article}', el.number)} target="_blank" rel="noopener noreferrer">
              <div className="price">{ dataLang[lang].part_item.price }</div>
            </a>
          )}
        </td>
        <td className="detail-item__more">
          {el.description.length !== 0 && (
            <div className={`more ${ openStatus ? "more_active" : "" }`} onClick={ changeMore }>
              <ArrowDownIcon />
            </div>
          )}
        </td>
      </tr>
      <tr
        className={`detail-item__details ${ openStatus ? "detail-item__details_active" : "" }`}
      >
        <td colSpan={ 6 }>
          {el.description.map(({name, desc}, i) => (
            <div className="more-info" key={i}>
              <span className="more-info__key">{name}:</span><span className="more-info__value">{desc}</span>
            </div>
          ))}
        </td>
      </tr>
    </>
  )
}

const mapStateToProps = (state) => ({
  lang: state.lang
})

export default connect(
  mapStateToProps
)(DetailsTable)
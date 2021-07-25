// CUR COMPONENT
import React, { useState } from 'react'
import './style.scss'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { delSearch, setSearch } from "state/actions/search";

// LANG
import dataLang from 'lang/Search/lang.json'

// COMPONENTS
import SearchCount from './SearchCount';
import SearchButton from './SearchButton';
import SearchClear from './SearchClear';
import LocationHistory from './LocationHistory';



type Props = {
  lang: string,
  value: string,
  setSearch(value: string): void,
  delSearch(): void,
}

const Search: React.FC<Props> = ({ lang, value, setSearch, delSearch }) => {
  const [ active, setActive ] = useState( false )
  const history = useHistory()

  const inputHandler = (e) => {
    const el = e.target
    const curVal = e.target.value
    let caretE = e.target.selectionEnd

    //РУССКИЙ АНГЛИЙСКИЙ
    const next = curVal.match(/^[а-яА-Яa-zA-Z0-9]+$/)
    if ((next || !curVal.length))
      setSearch(curVal.slice(0, 17))
    else
      caretE = caretE - 1

    setTimeout(() => {
      el.setSelectionRange(caretE, caretE)
    }, 0)
  }
  const focusHandler = () => {
    setActive(prev => !prev)
  }
  const clickHandler = () => {
    delSearch()
  }
  const submitHandler = (e) => {
    e.preventDefault()

    if (value && `/${value}` !== history.location.pathname) {
      if (value) { 
        history.push({ pathname: `/${value}`, state: { type: 'search' }}) 
      } else {
        history.push({ pathname: `/`, state: { type: 'search' }})
      }
    }
  }

  return (
    <>
      <form action="" className="search-form form" onSubmit={ submitHandler }>
        <h1 className="section__header">{ dataLang[lang].search_title } <LocationHistory /></h1>
        <div className="form__ib">
          <input  type="text" className="form__input" placeholder={ dataLang[lang].search_input } onChange={ inputHandler }
                  onFocus={ focusHandler } onBlur={ focusHandler } value={ value }/>
          <div className="search__actions">
            {
              ( value.length !== 0 ) && <SearchClear clickHandler={ clickHandler } />
            }
            {
              (( active && value.length !== 17 ) || ( value.length !== 0 ) && ( value.length !== 17 )) && <SearchCount length={ value.length } />
            }
            {
              (( !active && ( value.length === 0 )) || value.length === 17 ) && <SearchButton  />
            }
          </div>
        </div>
      </form>
    </>
  )
}

const mapStateToProps = (state) => ({
  value: state.search,
  lang: state.lang
})
const mapDispatchToProps = (dispatch) => ({
  setSearch: (value: string) => dispatch(setSearch(value)),
  delSearch: () => dispatch(delSearch()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
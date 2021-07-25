// CUR COMPONENT
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './style.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getGroups } from 'fetch'

// LANG
import dataLang from 'lang/Part/lang.json'



type Props = {
  lang: string,
  categories?: any
}

const CustomSelectCategories:React.FC<Props> = ({ lang, categories }) => {
  const { car } = useParams()
  const [ filter, setFilter ] = useState("")
  const [ list, setList ] = useState<any>(null)
  const [ openStatus, setOpenStatus ] = useState(false)

  const focusHandler = () => {
    setOpenStatus(true)
  }
  const blurHandler = () => {
    setOpenStatus(false)
  }
  const inputHandler = (e) => {
    setOpenStatus(true)
    setFilter(e.target.value)
  }
  const getSearched = (array, search = '') => {
    if (search === '') return array

    return array.filter(( item ) => isIsset( item, search ))
  }
  const isIsset = ( item, search ) => {
    if (item.hasChild) {
      for (const el of item.children) {
        const isHas = isIsset( el, search )
        
        if (isHas) {
          return true
        }
      }
    }
    return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  }
  useEffect(() => {
    let isSubscribed = true 

    getGroups(car)
    .then(res => {
      if (isSubscribed) {
        if (res.status === 'success') {
          setList(res.response.data.sections)
        }
      }
    })
    
    return () => { isSubscribed = false }
  }, [categories])

  return (
    <div 
      className={`custom-categories ${(openStatus && list) ? 'custom-categories_active' : ''}`} 
      onClick={ focusHandler }
      onMouseLeave={ blurHandler}
    >
      <input 
        placeholder={ dataLang[lang].part_categories } 
        onInput={ inputHandler }
        className="custom-categories__input bordered-button bordered-button_transparent fw" 
      />
      {(openStatus && list) && (
        <ul className="custom-categories__list">
          {getSearched(list, filter).map(( item, i ) => (
            <CustomSelectItem item={ item } lvl={0} filter={filter} key={ i } />
          ))}
        </ul>
      )}
    </div>
  )
}

const CustomSelectItem = ({ item, lvl = 0, filter }) => {

  return (
    <>
      {item.hasChild ? (
        <li className="custom-categories__item">{ Array(lvl).fill('       ').join('') }<FoundName title={item.name} filter={filter} /></li>
      ) : (
        <Link to={`../${item.hash}`}><li className="custom-categories__item">{ Array(lvl).fill('       ').join('') }<FoundName title={item.name} filter={filter} /></li></Link>
      )}
      {item.hasChild && (item.children.map(( el, i ) => (
        <CustomSelectItem item={ el } lvl={ lvl + 1 } filter={filter} key={ i } />
      )))}
    </>
  )
}

const FoundName = ({ title, filter }) => {

  if (filter) {
    const re = new RegExp(`(${filter})`, 'i')
    const matched = title.match(re)
  
    if (matched) {
      const sI = matched.index
      const eI = matched.index + matched[0].length
  
      const replaced = title.slice( sI, eI )
      
      return <span dangerouslySetInnerHTML={{__html: title.replace(replaced, `<b>${replaced}</b>`)}}></span>
    }
  }

  return title
}

const mapStateToProps = (state) => ({
  lang: state.lang,
  categories: state.categories
})

export default connect(
  mapStateToProps,
)(CustomSelectCategories)
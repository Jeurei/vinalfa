// CUR COMPONENT
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { changeLang } from 'state/actions/lang'
import HistoryItem from './HistoryItem'

// COMPONENTS
import { RuLang, EnLang } from './Icon/Lang'
const langagues = [
  {
    lang: "ru",
    name: "Русский"
  },
  {
    lang: "en",
    name: "English"
  }
]



type Props = {
  slang: string,
  changeLang(lang: string): void
}

const LangSelect:React.FC<Props> = ({ slang, changeLang }) => {
  const [ lang, setLang ] = useState(slang)
  const [ openStatus, setOpenStatus ] = useState(false)

  const openMenu = () => {
    setOpenStatus(true)
  }
  const closeMenu = () => {
    setOpenStatus(false)
  }
  const selectLang = (lang) => {
    setLang(lang)
    changeLang(lang)
  }

  return (
    <HistoryItem
      isRounded={true}
      className={`history__lang-select ${openStatus ? 'history__lang-select_active' : ''}`}
      onClick={ !openStatus ? openMenu : closeMenu }
    >
      <div className="cur-lang">
        <CurLang lang={lang} />
      </div>
      {openStatus && (
        <ul className="lang-select">
          {langagues.map((item, i) => (
            <div key={ i } className="lang-select__item" onClick={ () => selectLang(item.lang) }>
              <CurLang lang={item.lang} /> {item.name}
            </div>
          ))}
        </ul>
      )}
    </HistoryItem>
  )
}

type CurLangProps = {
  lang: any
}
const CurLang:React.FC<CurLangProps> = ({ lang }) => {
  switch (lang) {
    case "ru":
      return <RuLang />
    case "en":
      return <EnLang />
    default:
      return <RuLang />
  }

}

const mapStateToProps = (state) => ({
  slang: state.lang
})
const mapDispatchToProps = (dispatch) => ({
  changeLang: (lang: string) => dispatch(changeLang(lang))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LangSelect)
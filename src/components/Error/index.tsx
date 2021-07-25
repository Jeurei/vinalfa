// CUR COMPONENT
import './style.scss'
import React from 'react'
import { connect } from 'react-redux'
import dataLang from 'lang/Error/lang.json'
import Card from 'components/Card'

// LANG

// COMPONENTS



type Props = {
  lang: string,
  isError: boolean,
  isCard?: boolean
}

const Error: React.FC<Props> = ({ isError, isCard, lang, children }) => {
  if (!isError) return (<>
    { children }
  </>)
  if (isCard) return (
    <div style={{flex: "0 0 100%"}}>
      <Card>
        <Er message={isError} lang={lang} />
      </Card>
    </div>
  )
  return <Er message={isError} lang={lang} />
}



const Er = ({ message, lang }) => {
  return (
    <div className="section__title">
      <h3 className="section__header section__header_wd">{ dataLang[lang].error_er }</h3>
      <p className="section__header">{ message }</p>
    </div>
  )
}

const mapStateToProps = (state) => ({
  lang: state.lang
})

export default connect(
  mapStateToProps
)(Error)


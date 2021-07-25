// CUR COMPONENT
import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import './style.scss'

// LANG
import dataLang from 'lang/HistoryActions/lang.json'

// COMPONENTS
import Lang from './Lang'
import HistoryItem from './HistoryItem'
import Tooltip from 'components/Tooltip'
import { ArrowIconLeft, ArrowIconRight, LinkIcon, BugIcon, ChatIcon, HomeIcon } from './Icon/HistoryIcons';



type Props = {
  lang: string
}

const HistoryActions:React.FC<Props> = ({ lang }) => {
  const history = useHistory()
  
  const [ href, setHref ] = useState(document.URL)
  const link = useRef<HTMLInputElement>(null)

  const copyHandler = async (e) => {
    await setHref(document.URL)

    const el = link.current
    el?.select()
    el?.setSelectionRange(0, 99999)

    document.execCommand("copy")
  }

  return (
    <div className="history">
      <div className="history__actions">

        <Tooltip 
          text={ dataLang[lang].action_back } 
          align="left"
        >
          <HistoryItem 
            isRounded={true}
            className="history__prev" 
            onClick={() => {history.goBack()}}
          >
            <ArrowIconLeft />
          </HistoryItem>
        </Tooltip>

        <Tooltip text={ dataLang[lang].action_forward } align="left">
          <HistoryItem 
            isRounded={ true }
            className="history__next"
            onClick={() => {history.goForward()}}
          >
            <ArrowIconRight />
          </HistoryItem>
        </Tooltip>
        
        <Tooltip text={ dataLang[lang].action_home } align="left">
          <Link to="/">
            <HistoryItem 
              isRounded={ true }
              className="history__home"
            >
              <HomeIcon />
            </HistoryItem>
          </Link>
        </Tooltip>



        <div className="history__actions history__item_r">

          {/* <Tooltip text={ dataLang[lang].action_bugtracker }>
            <HistoryItem 
              isRounded={ true }
              className="history__bugtracker"
            >
              <BugIcon />
            </HistoryItem>
          </Tooltip> */}

          {/* <Tooltip text={ dataLang[lang].action_feedback }>
            <HistoryItem 
              isRounded={ true }
              className="history__chat"
            >
              <ChatIcon />
            </HistoryItem>
          </Tooltip> */}

          <Tooltip text={ dataLang[lang].action_copy.default } clickedText={ dataLang[lang].action_copy.active }>
            <HistoryItem 
              isRounded={ true }
              className="history__share"
              onClick={copyHandler}
            >
              <LinkIcon />
              <input type="text" readOnly={ true } value={href} ref={ link } style={{ position: 'absolute', top: -99999, right: `100%` }} />
            </HistoryItem>
          </Tooltip>

          <Lang />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  lang: state.lang
})

export default connect(
  mapStateToProps
)(HistoryActions)
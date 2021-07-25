// CUR COMPONENT
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// ICONS
import HistoryIcon from './Icon/HistoryIcon';



type Props = {
  history
}

const LocationHistory:React.FC<Props> = ({ history }) => {
  return (
    <div className="hist-section">
      <HistoryIcon />
      {(history.length !== 0) && (
        <ul className="hist-locations">
          {history.map(( el, i ) => (
            <Link to={el.link} key={ i }>
              <li className="hist-locations__item" >{ el.name }</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  history: state.history
})

export default connect(
  mapStateToProps
)(LocationHistory)
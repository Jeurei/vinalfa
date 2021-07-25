import React from 'react'
import './style.scss'



type Props = {
  children: any
}

const Card:React.FC<Props> = ({ children }) => {
  return (
    <div className="cwp">
      <div className="cwp-w">
        { children }
      </div>
    </div>
  )
}

export default Card
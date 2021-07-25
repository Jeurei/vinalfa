//CUR COMPONENT
import React from 'react'
import './style.scss'



type Props = {
  children: React.ReactNode,
}

const Col:React.FC<Props> = ({ children }) => {


  return (
    <div className="container">
      { children }
    </div>
  )
}

export default Col
//CUR COMPONENT
import React from 'react'
import './style.scss'



type Props = {
  children: React.ReactNode,
}

const Wrapper:React.FC<Props> = ({ children }) => {


  return (
    <div className="wrapper">
      { children }
    </div>
  )
}

export default Wrapper
// CUR COMPONENT
import React, { useState } from "react"
import "./style.scss"



type Props = {
  children: React.ReactNode,
  text: string,
  clickedText?: string
  align?: string
}

const Tooltip:React.FC<Props> = ({ children, text, clickedText, align = "right" }) => {
  const [ clickedStatus, setClickedStatus ] = useState(false)

  const clickHandler = (e) => {
    if (clickedText)
      setClickedStatus(true)
  }
  const blurHandler = (e) => {
    setTimeout(() => {
      setClickedStatus(false)
    }, 150)
  }

  return (
    <div className="tooltip-b" onClick={ clickHandler } onMouseLeave={ blurHandler }>
      { children }
      <div className={`module-tooltip tooltip_${align}`}>{ !clickedStatus ? text : clickedText }</div>
    </div>
  )
}

export default Tooltip
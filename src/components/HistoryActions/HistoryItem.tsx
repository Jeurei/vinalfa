// CUR COMPONENTS
import React from 'react'



type Props = {
  onClick?: any,
  isRounded?: boolean,
  className?: string,
}

const HistoryItem:React.FC<Props> = ({ children, onClick, isRounded, className }) => {

  const classes = ["history__item"]
  if (isRounded) classes.push("history__item_rounded")
  if (className) classes.push(className)

  return (
    <div 
      className={classes.join(" ")}
      onClick={onClick}  
    >
      { children }
    </div>
  )
}

export default HistoryItem 
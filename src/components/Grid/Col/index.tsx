//CUR COMPONENT
import React from 'react'
import './style.scss'



type Props = {
  children: React.ReactNode,
  xs?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  className?: string
}

const Col:React.FC<Props> = ({ children, xs, sm, md, lg, xl, className }) => {

  const classes = ["col"]
  if (xs) classes.push(`col-xs-${xs}`)
  if (sm) classes.push(`col-sm-${sm}`)
  if (md) classes.push(`col-md-${md}`)
  if (lg) classes.push(`col-lg-${lg}`)
  if (xl) classes.push(`col-xl-${xl}`)
  if (className) classes.push(className)

  return (
    <div className={classes.join(" ")}>
      { children }
    </div>
  )
}

export default Col
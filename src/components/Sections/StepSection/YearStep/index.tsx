// CUR COMPONENT
import React from "react"
import { Link, useLocation } from "react-router-dom"

// COMPONENTS



type Props = {
  nextStep?: any
}

const YearStep:React.FC<Props> = ({ nextStep }) => {
  const { pathname } = useLocation()

  return (
    <>
      <p>YearStep</p>
      { nextStep && (
        <Link to={`${pathname}/${nextStep.generate('next')}`}>Next step</Link>
      )}
    </>
  )
}

export default YearStep
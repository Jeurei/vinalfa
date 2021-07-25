// CUR COMPONENT
import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

// COMPONENTS



type Props = {
  nextStep: any
}

const LocationStep:React.FC<Props> = ({ nextStep }) => {
  const { pathname } = useLocation()
  const [data , setData] = useState(null as any)

  useEffect(() => {
    let isSubscribed = true
    
    // ЗАПРОС НА СЕРВЕР
    setData([{
      location: "ru"
    }, {
      location: "en"
    }])

    return () => {
      isSubscribed = false
    }
  }, [])
  
  return (
    <>
      <p>LocationStep</p>
      {
        data.map(() => {
          
        })
      }
      <Link to={`${pathname}/${nextStep.generate('next')}`}>Next step</Link>
    </>
  )
}

export default LocationStep
// CUR COMPONENT
import React from 'react'

// COMPONENTS
import Loader from 'components/Loader'
import Card from 'components/Card'



type Props = {
  isLoaded: boolean
  isCard?: boolean
}

const Loading: React.FC<Props> = ({ isLoaded, children, isCard }) => {
  
  if (!isLoaded) return (
    <>
      {children}
    </>
  )
  if (isCard) return (
    <div style={{flex: "0 0 100%"}}>
      <Card>
        <Loader />
      </Card>
    </div>
  )
  return <Loader />
}

export default Loading


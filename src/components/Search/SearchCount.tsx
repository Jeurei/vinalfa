// CUR COMPONENT
import React from 'react'



type Props = {
  length: number
}

const SearchCount:React.FC<Props> = ({ length }) => {
  return (
    <p className="search-count">
      <span className="search-count__count">{length}</span>
    </p>
  )
}

export default SearchCount
import React from 'react'
import { connect } from 'react-redux'
import { setSearch } from 'state/actions/search'
import { Link } from 'react-router-dom'



const Brand: React.FC<Props> = ({brand, setSearch}) => {
  const clickHandler = () => {
    setSearch(brand.vin)
  }

  return (
    // <Link to={`search/${brand.make_name}`}>
    <div>
      <div className="catalog__brand" onClick={clickHandler}>
        <img src={`https://vinalfa.com/img/oem/${brand.img}.svg`} alt={brand.make_name}/>
      </div>
    </div>
    // </Link>
  )
}

type Props = {
  brand: {
    id: number,
    make_name: string,
    img: string,
    vin: string,
  },
  setSearch(value: string): void
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({
  setSearch: (value: string) => dispatch(setSearch(value))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Brand)
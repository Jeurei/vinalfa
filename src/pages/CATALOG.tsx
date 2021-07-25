// CUR COMPONENT
import React from "react"

// COMPONENTS
import Card from "components/Card"
import CatalogSection from "components/Sections/CatalogSection"



const CATALOG:React.FC = () => {

  return (
    <div className="catalog">
      <Card>
        <CatalogSection />
      </Card>
    </div>
  )
}

export default CATALOG
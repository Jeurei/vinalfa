// CUR COMPONENT
import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"
import { modificationRoute, groupRoute, partRoute } from "routes"

// COMPONENTS
import CarSection from "components/Sections/CarSection"
import PartSection from "components/Sections/PartSection"
import AboutCarSection from "components/Sections/AboutCarSection"




const SECTION_CAR:React.FC = () => {

  return (
    <>
      <AboutCarSection />
      
      <Switch>

        <Route exact path={modificationRoute.path}>
          <CarSection />
        </Route>

        <Route exact path={groupRoute.path}>
          <CarSection />
        </Route>

        <Route exact path={partRoute.path}>
          <PartSection />
        </Route>
        
      </Switch>
    </>
  )
}

export default SECTION_CAR
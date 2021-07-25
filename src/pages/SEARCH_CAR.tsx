// CUR COMPONENT
import React from "react"
import { Link, Switch, Route, useLocation } from "react-router-dom"
import { search, searchStep1, searchStep2 } from "routes"

// COMPONENTS
import Card from 'components/Card'
import LocationStep from 'components/Sections/StepSection/LocationStep'
import ModelStep from 'components/Sections/StepSection/ModelStep'
import YearStep from 'components/Sections/StepSection/YearStep'




const SEARCH_CAR:React.FC = () => {

  return (
    <>
      <Card>
        <Switch>

          {/* STEP 1 */}
          <Route exact path={search.path} >
            <LocationStep nextStep={searchStep1} />
          </Route>

          {/* STEP 2 */}
          <Route exact path={searchStep1.path} >
            <ModelStep nextStep={searchStep2} />
          </Route>

          {/* STEP 3 */}
          <Route exact path={searchStep2.path} >
            <YearStep />
          </Route>

        </Switch>
      </Card>
    </>
  )
}

export default SEARCH_CAR
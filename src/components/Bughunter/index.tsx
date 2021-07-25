// CUR COMPONENT
import React from 'react'

// COMPONENTS
import Card from 'components/Card'



class Bughunter extends React.Component {
  public state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return (
        <Card>
          <h1>Что-то пошло не так.</h1>
        </Card>
      )
    }

    return this.props.children
  }
}

export default Bughunter
// CUR COMPONENT
import Panzoom from '@panzoom/panzoom'
import React, { useRef } from 'react'
import './style.scss'

// COMPONENTS
import { ReactComponent as MinusIcon } from './Icon/minus-solid.svg'
import { ReactComponent as PlusIcon } from './Icon/plus-solid.svg'
import { ReactComponent as RedoIcon } from './Icon/redo-solid.svg'



type Props = {
  data: any,
  selectedItems: any[],
  clickItem(item, e?): void,
  hoverMItem(item): void,
  hoveredItem: any,
}
let panzoom

const PanzoomSection:React.FC<Props> = ({ data, selectedItems, clickItem, hoverMItem, hoveredItem }) => {
  const panzoomEl = useRef<HTMLDivElement>(null)

  const zoomHandler = () => {
    if (panzoom) panzoom.zoomIn()
  }
  const zoomClearHandler = () => {
    if (panzoom) panzoom.reset()
  }
  const unzoomHandler = () => {
    if (panzoom) panzoom.zoomOut()
  }
  const createPanzoom = (e) => {
    if (panzoomEl && panzoomEl.current) {
      const el = panzoomEl.current

      const elImg = e.target as HTMLImageElement
      const elParent = el.parentElement as HTMLDivElement

      setTimeout(() => {
        elParent.classList.remove('panzoom_loading')
      }, 600)
      
      const sScale = elParent.offsetHeight / elImg.offsetHeight < elParent.offsetWidth / elImg.offsetWidth ? elParent.offsetHeight / elImg.offsetHeight * 0.9 : elParent.offsetWidth / elImg.offsetWidth * 0.9


      panzoom = Panzoom(panzoomEl.current, {
        maxScale: 1.5,
        canvas: true,
        startScale: sScale,
        startX:  (elParent.offsetWidth - elImg.offsetWidth) / 2,
        startY:  (elParent.offsetHeight - elImg.offsetHeight) / 2,
        transition: .1,
      })

      panzoomEl.current.parentElement?.addEventListener('wheel', panzoom.zoomWithWheel)
      panzoomEl.current.parentElement?.addEventListener('wheel', function(event) {
        if (!event.shiftKey) return panzoom.zoomWithWheel(event)
      })
    }
  }

  return (
    <div className="part__pz">
      <div className="panzoom panzoom_loading">
        <div className="part__panzoom" ref={ panzoomEl }>
          <div className="dots">
            {data.parts.map(( item: any, i ) => (item.points && item.points.map((hotspot, j) => (
              <div 
                className={`dots__dot ${ selectedItems.includes(item.reference) ? 'dots__dot_selected' : '' } ${ hoveredItem === item.reference ? 'dots__dot_hovered' : '' } `} 
                onClick={ () => clickItem( item.reference ) }
                onMouseEnter={ () => hoverMItem(item.reference) }
                onMouseLeave={ () => hoverMItem(item.reference) }
                style={
                  { 
                    fontSize: `${hotspot.height}px`, 
                    lineHeight: `${hotspot.height}px`,
                    minWidth: `${hotspot.width}px`, 
                    top: `${hotspot.y}px`, 
                    left: `${hotspot.x}px`,
                  }
                }
                key={ i + '' + j } 
              >{ item.reference }</div>
            )))) }
          </div>
          <img src={ data.image } alt="" onLoad={ createPanzoom } style={{position: "absolute"}}/>
        </div>
      </div>
      <div className="panzoom__actions">
        <div className="panzoom__awr">
          <button className="panzoom__action" onClick={ unzoomHandler }><MinusIcon /></button>
          <button className="panzoom__action" onClick={ zoomHandler }><PlusIcon /></button>
          <button className="panzoom__action" onClick={ zoomClearHandler }><RedoIcon /></button>
        </div>
      </div>
    </div>
  )
}

export default PanzoomSection
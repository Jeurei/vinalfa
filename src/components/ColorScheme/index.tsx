// CUR COMPONENT
import React, { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import { colorConvert, colorReConvert } from './color'

// COMPONENTS
import ReactColorPicker from '@super-effective/react-color-picker';


const data = (window as any).vinalfaModul
if (data && data.font) {
  const font = document.createElement('link')
  font.href = data.font.url
  font.rel = 'stylesheet'

  document.head.appendChild(font)
}

const ColorTheme = () => {
  const [color, setColor] = useState(data ? data.colorTheme.colorTheme : "#515151" as any)
  const [csl, setCSL] = useState(null as any)

  const handleChangeComplete = (updatedColor) => {
    setColor(updatedColor)
  }

  useEffect(() => {
    const hsl = colorConvert(color.slice(1, color.length))
    hsl.S = hsl.S * 1
    hsl.L = hsl.L * .8
    const primaryColor = Object.values(colorReConvert({H: hsl.H, S: hsl.S, L: hsl.L})).join('')
    const l1Color = Object.values(colorReConvert({H: hsl.H, S: hsl.S, L: hsl.L * 1.7})).join('')
    const l2Color = Object.values(colorReConvert({H: hsl.H, S: hsl.S, L: hsl.L * 1.2})).join('')
    const slColor = Object.values(colorReConvert({H: hsl.H, S: hsl.S, L: hsl.L + 47})).join('')
    const isDark = (hsl.H === 0 && hsl.L < 50) ? true : false

    setCSL({ primaryColor, l1Color, l2Color, slColor, isDark})
  }, [color])


  useEffect(() => {
    const input = document.getElementById('colorThemeInput_b34')
    
    if (input) {
      input?.addEventListener('input', (e: any) => {handleChangeComplete(e.target.value)})
      input?.addEventListener('change', () => {input.dispatchEvent(new Event('input'))})
    }
  }, [])

  return (
    <>
      {csl && (
        <ColorScheme 
          hsl={csl.hsl} 
          primaryColor={csl.primaryColor} 
          l1Color={csl.l1Color} 
          l2Color={csl.l2Color} 
          slColor={csl.slColor} 
          isDark={csl.isDark} 
        />
      )}
    </>
  )
}

const ColorScheme = createGlobalStyle`
  #module {
    .colorScheme_b32 {
      .module {
        font-family: '${data ? data.font.name : "Open Sans"}', ${data ? data.font.style : 'sans-serif'};
        
        
        .dots .dots__dot {
          border-color: #${props => props.primaryColor};
          
          &.dots__dot_selected, &.dots__dot:hover, &.dots__dot.dots__dot_hovered {
            background-color: #${props => props.primaryColor};
            border: #${props => props.primaryColor};
          }
        }
        .loader {
          border-color: #${props => props.primaryColor}20;
          border-left-color: #${props => props.primaryColor};
        }
        .search-input:focus {
          border-color: #${props => props.primaryColor};
        }
        .part {
          .part__table {
      
            tr {
  
              &:hover {
                background-color: #${props => props.primaryColor}20;
              }
              &.detail-item_hovered {
                background-color: #${props => props.primaryColor}20;
              }
            }
            .bordered-button {
              border-color: #${props => props.primaryColor};
        
              &.bordered-button_active {
                background-color: #${props => props.primaryColor};
              }
              &:hover {
                background-color: #${props => props.primaryColor};
              }
            }
            .detail-item {
              &.detail-item_selected {
                border-left-color: #${props => props.primaryColor};
              }
              .detail-item__prices .price, .detail-item__more .more {
                
                &:hover, &.more_active {
                  border-color: #${props => props.primaryColor};
                  background-color: #${props => props.primaryColor};
                }
              }
            }
          }
        }
        .car-item:hover .car-item__thumb {
          border-color: #${props => props.primaryColor};
        }
        .car-button {
          background-color: #${props => props.primaryColor};
    
          &:hover {
            background-color: #${props => props.l2Color};
          }
        }
        .categories .categories__item {
          
          &.active > .categories__text ~ ul .categories__title:after {
            background-color: #${props => props.l1Color};
          }
          .categories__title:hover:after {
            background-color: #${props => props.l2Color}!important;
          }
          .categories__title:after {
            background-color: #${props => props.slColor};
          }
          &.active > .categories__text > a > .categories__title:after {
            background-color: #${props => props.primaryColor}!important;
          }
        }
        .view .view__item {

          &.view__item_active path {
            fill: #${props => props.primaryColor}
          }
        }
        .history .history__item {
    
          path {
            fill: #${props => props.primaryColor};
          }
          &.history__item_rounded {
        
            &:hover {
              background-color: #${props => props.primaryColor};
        
              svg path {
                fill: #${props => props.isDark ? 'fff' : props => props.slColor };
              }
            }
          }
        }
      }
    }
  }
`

export default ColorTheme
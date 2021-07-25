import React from 'react'
import './style.scss'



const data = (window as any).vinalfaModul

const Catalog: React.FC = () => {
  return (
    <div className="module-footer">
      <a href="https://vinalfa.com" target="_blank" rel="noopener noreferrer">
        <p className="module-footer__watermark"><b>BETA Vinalfa</b> <span>•</span> OEM <span className="module-footer__version">{ data && data.versionPath && data.versionPath.slice(1) }</span></p>
      </a>
    </div>
  )
}

export default Catalog
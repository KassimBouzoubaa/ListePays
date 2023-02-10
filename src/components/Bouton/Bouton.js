import React from 'react'

function Bouton(props) {
    const btnCss = `btn ${props.typeBtn} ${props.css} m-1`
  return (
    <>
    <button  style={{
            opacity : props.isCurrent === props.children ? "1" : "0.5",
            cursor:"pointer"
        }} className={btnCss} onClick={props.clic}>{props.children}</button>
    </>
    )
}

export default Bouton
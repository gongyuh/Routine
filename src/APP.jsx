import React from 'react'
import ReactDom from 'react-dom'

const APP=()=>{
    return (
        <div>
            <h1>react也来试试</h1>
        </div>
    )
}

export default APP
ReactDom.render(<APP/>,document.getElementById('app'))
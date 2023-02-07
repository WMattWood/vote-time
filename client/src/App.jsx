import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)

  let valA = count1;
  let valB = count2;
  let valC = count3;
  
  const values = [valA, valB, valC]
  const total = values.reduce( (x, y) =>  x + y)

  let percentage1 = count1 ? Math.floor( (count1 / total).toFixed(2) * 100 ) : 0
  let percentage2 = count2 ? Math.floor( (count2 / total).toFixed(2) * 100 ) : 0
  let percentage3 = count3 ? Math.floor( (count3 / total).toFixed(2) * 100 ) : 0

  const circlesAndValues = {  '.pieA': valA, 
                              '.pieB': valB, 
                              '.pieC': valC }
  
  // Find the dasharray string values based on the 
  const attributeStrings = findAttrStrings(values)
  
  // Helper function to format the dasharray string values
  function findAttrStrings( values ) {
    
    const attrStrings = []
    const firstSegment = values[0]
    const lastSegment = values[values.length - 1]
    const middleSegments = values.slice(1, values.length - 1)
    
    attrStrings.push(`calc(${firstSegment}/${total}) calc(${total - firstSegment}/${total})`)
    
    middleSegments.forEach( currentSegment => {
      let val1 = `0`
      let val2 = `calc(${firstSegment}/${total})`
      let val3 = `calc(${currentSegment}/${total})`
      let remaining = total - (firstSegment + currentSegment)
      let val4 = `calc(${remaining}/${total})`
      attrStrings.push( [val1, val2, val3, val4].join(' ') )
    })
    
    attrStrings.push(`0 calc(${total - lastSegment}/${total}) calc(${lastSegment}/${total})`)
    
    return attrStrings
  }

  // Wait until page is loaded before iterating over circlesAndValues object
  if (document.readyState === 'complete') {
    Object.keys(circlesAndValues).forEach( (key, idx) => {
      let element = document.querySelector(`${key}`)
      console.log(element)
      element.style.strokeDasharray = `${attributeStrings[idx]}`
    })
  }

  return (
    <div className="App">

      <div className="chartDisplay">
        {/* My Pie Chart! */}
        <svg width="400" height="400" className="chart">
          <defs>
            {/* Blur Filter --> url(#blur) */}
            <filter id="blur" width="3" height="3" x="-1" y="-1">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
            {/* Lighting Filter --> url(#lighting) */}
            <filter id="lighting" width="3" height="3" x="-1" y="-1">
              <feDiffuseLighting in="SourceGraphic" result="light" lighting-color="white">
                <fePointLight x="-20" y="200" z="60"/>
              </feDiffuseLighting>

              <feComposite
                in="SourceGraphic"
                in2="light"
                operator="arithmetic"
                k1="1"
                k2="0"
                k3="0"
                k4="0" />
            </filter>
          </defs>
          {/* Segments */}
          <circle r="100" cx="200" cy="200" className="pieA" pathLength="1" filter="url(#lighting)"/>
          <circle r="100" cx="200" cy="200" className="pieB" pathLength="1" filter="url(#lighting)"/>
          <circle r="100" cx="200" cy="200" className="pieC" pathLength="1" filter="url(#lighting)"/>
        </svg>
      </div>

      <h1>VOTE TIME</h1>

      <div className="card">
          <button onClick={() => setCount1((count1) => count1 + 1)}>
            Red is {percentage1}%
          </button>
      
          <button onClick={() => setCount2((count2) => count2 + 1)}>
            Purple is {percentage2}%
          </button>

          <button onClick={() => setCount3((count3) => count3 + 1)}>
            Blue is {percentage3}%
          </button>
      </div>

    </div>
  )
}

export default App

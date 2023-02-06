import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import styled from 'styled-components'
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

    
  // // OPEN AI ASSISTED VERSION
  // let colors = ['#F44336', '#9C27B0', '#2196F3']
  // let startAngle = 0;
  // if (document.readyState === 'complete') {

  //             if ( document.querySelector('.chart') === null ) {
  //               let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  //                 svg.setAttribute('width', '400');
  //                 svg.setAttribute('height', '400');
  //                 svg.setAttribute('cx', '0');
  //                 svg.setAttribute('cy', '0');
  //                 svg.classList.add('chart');
  //                 document.querySelector('.chartDisplay').appendChild(svg);
  //               }
                
              
  //             for (let i = 0; i < values.length; i++) {
  //               // calculate end angle
  //               let endAngle = (values[i] / total) * Math.PI * 2 + startAngle;
  //               // create arc
  //               let arc = document.createElementNS("http://www.w3.org/2000/svg", 'path');
  //               let x = 200,
  //                 y = 200,
  //                 r = 150;
  //               let startX = x + r * Math.cos(startAngle);
  //               let startY = y + r * Math.sin(startAngle);
  //               let endX = x + r * Math.cos(endAngle);
  //               let endY = y + r * Math.sin(endAngle);
  //               let d = `M ${x} ${y} L ${startX} ${startY} A ${r} ${r} 0 ${(endAngle - startAngle > Math.PI) ? 1 : 0} 1 ${endX} ${endY} Z`;
  //               arc.setAttribute('d', d);
  //               arc.setAttribute('fill', colors[i]);
  //               // arc.setAttribute('stroke', 'none');
  //               document.querySelector('.chart').appendChild(arc);
  //               // update start angle
  //               startAngle = endAngle;
  //             }
  //   }

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
          <circle r="100" cx="200" cy="200" className="pieA" pathLength="1"/>
          <circle r="100" cx="200" cy="200" className="pieB" pathLength="1"/>
          <circle r="100" cx="200" cy="200" className="pieC" pathLength="1"/>
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

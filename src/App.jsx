import styled from 'styled-components'
import { useState, useEffect, useContext } from 'react'
import { BrowserContext } from './BrowserContext'
import './App.css'
 
import { initializeApp } from "firebase/app"
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getDatabase, ref, set, update } from "firebase/database"

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { connectFirestoreEmulator } from 'firebase/firestore'

import Moment from 'react-moment';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyC2D0ck265uZEPfbUhZ2XcR6g6mJCxyfac",
  authDomain: "pie-chart-demo.firebaseapp.com",
  databaseURL: "https://pie-chart-demo-default-rtdb.firebaseio.com",
  projectId: "pie-chart-demo",
  storageBucket: "pie-chart-demo.appspot.com",
  messagingSenderId: "164237282596",
  appId: "1:164237282596:web:dc8c7ead80c411e36137b1"
});

const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

function App() {
  const { brightness } = useContext(BrowserContext)

  const [user] = useAuthState(auth)
  const [countdown, setCountdown] = useState("...")
  
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)
  
  const values = [count1, count2, count3]
  const total = values.reduce( (x, y) =>  x + y)
  const circlesAndValues = {  '.pieA': count1, 
                              '.pieB': count2, 
                              '.pieC': count3 }
                                
  const attributeStrings = findAttributeStrings(values)
    
  // return array of formatted dasharray string values
  function findAttributeStrings( values ) {

    // return an equally divided piechart if all values set to 0
    if ( values.every( x => x === 0 ) ) {
      return ['calc(1px/3) calc(2px/3) 0 0',
              '0 calc(1px/3) calc(1px/3) calc(1px/3)',
              '0 calc(2px/3) calc(1px/3), 0']
    }
    
    const attrStrings = []
    const firstSegment = values[0]
    const lastSegment = values[values.length - 1]
    const middleSegments = values.slice(1, values.length - 1)
    
    attrStrings.push(`calc(${firstSegment}px/${total}) calc(${total - firstSegment}px/${total})`)
    
    middleSegments.forEach( currentSegment => {
      let val1 = `0`
      let val2 = `calc(${firstSegment}px/${total})`
      let val3 = `calc(${currentSegment}px/${total})`
      let remaining = total - (firstSegment + currentSegment)
      let val4 = `calc(${remaining}px/${total})`
      attrStrings.push( [val1, val2, val3, val4].join(' ') )
    })
    
    attrStrings.push(`0 calc(${total - lastSegment}px/${total}) calc(${lastSegment}px/${total})`)
    
    return attrStrings
  }

  // return formatted percentage of each value
  function calcPercentage( count ) {
    return count ? Math.floor( (count / total).toFixed(2) * 100 ) : 0
  }
  
  // populate the dasharray attributes
  useEffect( ()=> {
    Object.keys(circlesAndValues).forEach( (key, idx) => {
      let element = document.querySelector(`${key}`)
      element.style.strokeDasharray = `${attributeStrings[idx]}`
    })
  })

  useEffect( ()=> {
    signInAnonymously(auth)
  }, [])

  useEffect( ()=> {
    set (ref(db, 'points'), {
      red: 0,
      blue: 0,
      purple: 0
    })
  }, [])

  function setDbCount( color, value ) {
    update(ref(db, 'points'), {
      [color]: value
    });
  }

  function countDownTimer( value ) {
    value = 30 - +value % 30
    console.log(value)
    console.log(value === 30 )
    if ( value === 30 ) {
      setCount1(0)
      setCount2(0)
      setCount3(0)
      set (ref(db, 'points'), {
        red: 0,
        blue: 0,
        purple: 0
      });
    }
    setCountdown(value)
  }

  // JSX
  return (
    <div className="App">
      <Moment style={ { display: 'none' } } interval={1000} format="ss" aria-hidden={true} onChange={(val) => countDownTimer(val)}/>
      {/* <Moment interval={30000} format="ss" display="none" onChange={(val) => console.log(val)}/> */}
      <h1>{`${countdown}`}</h1>
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
              <feDiffuseLighting in="SourceGraphic" result="light" lightingColor="white">
                <fePointLight x="-20" y="200" z={`${brightness}`}/>
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
          <button onClick={() => {
            setCount1((count1) => count1 + 1)
            setDbCount('red', count1 + 1 )
            }
            }>
            Red is {calcPercentage(count1)}%
          </button>
      
          <button onClick={() => {
            setCount2((count2) => count2 + 1)
            setDbCount('purple', count2 + 1 )
            }
            }>
            Purple is {calcPercentage(count2)}%
          </button>

          <button onClick={() => {
            setCount3((count3) => count3 + 1)
            setDbCount('blue', count3 + 1 )
            }
            }>
            Blue is {calcPercentage(count3)}%
          </button>
      </div>

    </div>
  )
}

export default App

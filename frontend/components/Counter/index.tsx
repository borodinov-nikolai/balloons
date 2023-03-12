import React from "react"
import { useCountUp } from "react-countup"
import VisibilitySensor from "react-visibility-sensor"

function Counter(props: { number: number }) {
  const { number } = props
  let play = true
  return (
    <VisibilitySensor offset={{ top: 100, bottom: -100 }}>
      {/* @ts-ignore */}
      {({ isVisible }) => (
        <>
          {isVisible ? (
            play ? (
              ((play = false), (<CounterText endNumber={number} />))
            ) : (
              <div>{number}</div>
            )
          ) : (
            <div>{number}</div>
          )}
        </>
      )}
    </VisibilitySensor>
  )
}

function CounterText(props: { endNumber: number }) {
  const { endNumber } = props
  const countUpRef = React.useRef(null)
  let redrawCount = false
  // eslint-disable-next-line no-unused-vars
  const countUp = useCountUp({
    ref: countUpRef,
    start: 0,
    end: endNumber,
    duration: 2,
    // @ts-ignore
    redraw: redrawCount,
  })

  return <div ref={countUpRef} />
}

export default Counter

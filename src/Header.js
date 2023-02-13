import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {increment,incrementByAmount  } from "./redux/counterSlice";
const Header = (props) => {
    const dispatch=useDispatch()
    let count =useSelector(state=>state)
    console.log(count);
  return (
    <div>
    <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>

        <button
          aria-label="Increment value"
          onClick={() => dispatch(incrementByAmount(50))}
        >
          Increment incrementByAmount
        </button>

<h4>{count.counter.value}</h4>
      header{props.tata}{props.name}
    </div>
  )
}

export default Header

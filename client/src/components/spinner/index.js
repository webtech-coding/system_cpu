import React from "react";

const Spinner = props => {
  const spinnerAnimation = props.terminate
    ? "spinner_animation spinner_animation-terminate"
    : "spinner_animation";
  return (
    <div className='spinner_container'>
      <div className='spinner'>
        <div className={spinnerAnimation}></div>
        <div className='spinner_text'>{props.message}</div>
      </div>
    </div>
  );
};

export default Spinner;

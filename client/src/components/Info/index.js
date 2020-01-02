import React from "react";

const Info = props => {
  const { model } = props;
  return (
    <section className='info'>
      <div className='info_text'>{model}</div>
    </section>
  );
};

export default Info;

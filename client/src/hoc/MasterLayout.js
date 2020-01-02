import React from "react";
import Styles from "./MasterLayout.module.css";
const MasterLayout = props => {
  return (
    <main className={Styles.dashboard}>
      <section className='chart'>{props.children}</section>
    </main>
  );
};

export default MasterLayout;

import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NaviagtionItems/NaviagationItems";
import classes from "./SideDrawer.css";
import BackDrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";
const sideDrawer = (props) => {
  return (
    <Aux>
      <BackDrop show/>
      <div className={classes.SideDrawer}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};
export default sideDrawer;

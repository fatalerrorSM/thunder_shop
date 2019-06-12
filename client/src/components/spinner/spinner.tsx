import * as React from "react";
import "./spinner.css";

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="center">
        <span uk-spinner="ratio: 5" />
      </div>
    );
  }
}

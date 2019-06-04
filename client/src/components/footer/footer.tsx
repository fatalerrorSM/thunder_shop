import * as React from "react";
import "./footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <a uk-icon="icon: reddit" className="uk-margin-right" />
        <a uk-icon="icon: github" className="uk-margin-right" />
        <a uk-icon="icon: facebook" />
      </div>
    );
  }
}

import * as React from "react";

export default class Category extends React.Component {
  render() {
    return (
      <div
        className="uk-text-center uk-child-width-1-3 uk-grid-match"
        uk-grid="true"
      >
      <div>
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="uk-card-media-top">
              <img src="https://wallpapercave.com/wp/wp1943804.jpg" alt=""/>
          </div>
          <div className="uk-card-body">Shooter</div>
        </div>
      </div>
      <div>
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="uk-card-media-top">
              <img src="https://www.zastavki.com/pictures/originals/2015/Games_Strategy_game_Total_War_Rome_II_096281_.jpg" alt=""/>
          </div>
          <div className="uk-card-body">Strategy</div>
        </div>
      </div>
      <div>
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="uk-card-media-top">
              <img src="https://wallpapersite.com/images/wallpapers/steep-3840x2160-2016-games-ubisoft-sports-game-open-world-4k-1330.jpg" alt=""/>
          </div>
          <div className="uk-card-body">Sports</div>
        </div>
      </div>
      
      </div>
    );
  }
}

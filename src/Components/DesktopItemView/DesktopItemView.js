import React,{Component} from 'react';
import './DesktopItemView.scss';
class DesktopItemView extends Component{

    render() {
        return (<span className={"desktop-item-view"}>
            { //<div id = {this.props.type} className={"desktop-item-"+this.props.type}></div>
          /* <div id="title" className={"desktop-item-"+this.props.type}>{this.props.name}</div> */}
           <div className="top-bar">
           <div className="top-bar-button-pallet">
                    <button className="minimize-it">-</button>
                    <button className="top-bar-button-pallet-close-it">X</button>
            </div>

           </div>


        </span>)
      }


}
export default DesktopItemView;



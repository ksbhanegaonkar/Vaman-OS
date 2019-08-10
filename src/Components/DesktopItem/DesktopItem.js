import React,{Component} from 'react';
import $ from 'jquery';
import './DesktopItem.scss';
class DesktopItem extends Component{

    render() {
        return (<div id="desktop-item" className={"desktop-item-"+this.props.type}>
            { //<div id = {this.props.type} className={"desktop-item-"+this.props.type}></div>
          /* <div id="title" className={"desktop-item-"+this.props.type}>{this.props.name}</div> */}

        </div>)
      }


}
export default DesktopItem;
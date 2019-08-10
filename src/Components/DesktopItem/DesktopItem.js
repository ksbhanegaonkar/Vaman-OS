import React,{Component} from 'react';
import $ from 'jquery';
import './DesktopItem.scss';
class DesktopItem extends Component{

    render() {
        return (<div className="desktop-item">
            <div className={this.props.type}></div>
           <div className="title">{this.props.name}</div>

        </div>)
      }


}
export default DesktopItem;
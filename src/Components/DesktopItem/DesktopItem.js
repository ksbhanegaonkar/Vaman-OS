import React,{Component} from 'react';
import $ from 'jquery';
import './DesktopItem.scss';
import folderImg from '../../images/Folder.png';
class DesktopItem extends Component{

    render() {

      console.log("icon is :::"+this.props.icon);

      var style={
        top:this.props.top,
        left:this.props.left
      };
        return (<div className={"desktop-item"}
          style={style}
          onDoubleClick={()=>this.props.onDoubleClick(this.props.name)}
        >

          <img id="icon-image" title="test" src={this.props.icon}
          />
          <div id="title" className={"desktop-item-"+this.props.type}>{this.props.name}</div> 

        </div>)
      }


}
export default DesktopItem;
// <div id = {this.props.type} className={"desktop-item-"+this.props.type}></div>


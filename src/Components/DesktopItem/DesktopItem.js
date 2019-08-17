import React,{Component} from 'react';
import $ from 'jquery';
import './DesktopItem.scss';
class DesktopItem extends Component{

    render() {

      var style={
        top:this.props.top,
        left:this.props.left
      };
        return (<span className={"desktop-item"}
          style={style}
          onDoubleClick={()=>this.props.onDoubleClick(this.props.name)}
        >

        
          <div id = {this.props.type} className={"desktop-item-"+this.props.type}></div>
          <div id="title" className={"desktop-item-"+this.props.type}>{this.props.name}</div> 
           
        </span>)
      }


}
export default DesktopItem;



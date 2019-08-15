import React,{Component} from 'react';
import './DesktopItemView.scss';
class DesktopItemView extends Component{


    render() {

      console.log("on minimize view ::::: "+this.props.activeStatus);
      var btColour;
      if(this.props.activeStatus === 'none'){
       
      }else{
        
      }
      var style={
        display:this.props.activeStatus
      };
        return (<span className={"desktop-item-view"} style={style}>
            { //<div id = {this.props.type} className={"desktop-item-"+this.props.type}></div>
          /* <div id="title" className={"desktop-item-"+this.props.type}>{this.props.name}</div> */}
           <div className="top-bar">
           <div className="top-bar-button-pallet">
                    <button className="minimize-it"
                    onClick={()=>this.props.onMinimize(this.props.name)}>-</button>
                    <button className="top-bar-button-pallet-close-it"
                    onClick={()=>this.props.onClose(this.props.name)}
                    >X</button>
            </div>

           </div>


        </span>)
      }


}
export default DesktopItemView;



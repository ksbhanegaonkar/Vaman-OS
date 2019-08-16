import React,{Component} from 'react';
import './DesktopItemView.scss';
class DesktopItemView extends Component{


    render() {
      var status;
      var zIndex;
      if(this.props.activeStatus === 'inFocus'){
        status = 'block';
        zIndex=1;
      }else if(this.props.activeStatus === 'block'){
        status = 'block';
        zIndex=0;
      }else{
        status = 'none';
        zIndex=0;
      }
      var style={
        "display":status,
        "z-index":zIndex
      };
        return (<span className={"desktop-item-view"} style={style}>
            { //<div id = {this.props.type} className={"desktop-item-"+this.props.type}></div>
          /* <div id="title" className={"desktop-item-"+this.props.type}>{this.props.name}</div> */}
           <div className="top-bar">
           {this.props.name}
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



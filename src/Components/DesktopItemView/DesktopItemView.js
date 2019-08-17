import React,{Component} from 'react';
import './DesktopItemView.scss';
import FolderPlugin from '../DesktopItemViewPlugins/FolderPlugin/FolderPlugin';
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
        "zIndex":zIndex
      };
        return (<div className={"desktop-item-view"} style={style}>
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

            {this.renderDesktopItemViewPlugin()}
        </div>)
      }

      renderDesktopItemViewPlugin(){
        if(this.props.desktopItemViewData['type']==='folder'){
          return(
            <div className="desktop-item-view-plugin">
              <FolderPlugin itemData={this.props.desktopItemViewData}
              onDoubleClick={this.props.onDoubleClick}
              ></FolderPlugin>
            </div>
          );
        }else if(this.props.desktopItemViewData['type']==='file'){

        }

      }

}
export default DesktopItemView;



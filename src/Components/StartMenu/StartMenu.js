import React,{Component} from 'react';
import $ from 'jquery';
import './StartMenu.scss';
class StartMenu extends Component{


    render() {
        return (
        <div className="start-Menu-content">
          {this.openStartMenu()}
          <button className="start-menu-button">
          
          My Personal Space
          
        </button>
        </div>
)
      }

      openStartMenu(){
       if(this.props.visible){


       var contextMenuItems = [];

       for(var i=0;i<this.props.menuItemList.length;i++){
           contextMenuItems.push(<div key={this.props.menuItemList[i]} className="start-Menu-content--option"
           
           onClick={this.props.onContextMenuClick}
           
           >{this.props.menuItemList[i]}</div>);
       }
       return contextMenuItems;

       }else{

       }

      }

 
}
export default StartMenu;
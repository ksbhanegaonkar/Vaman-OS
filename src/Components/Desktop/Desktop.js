import React,{Component} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import $ from 'jquery';
import './Desktop.css';
import TaskBar from '../TaskBar/TaskBar';
import StartMenu from '../StartMenu/StartMenu';
import MyContextMenu from '../ContextMenu/MyContextMennu';
import DesktopItem from '../DesktopItem/DesktopItem';
class Desktop extends Component{

  constructor(){
    super();
    this.state.contextMenuOption = {
      "desktop-wallpaper":['New Sprint','New User Story','Copy','Cut','Paste'],
      "start-menu-button":['Option 1','Option 2','Option 3','Option 4'],
      "task-bar":['Option 5','Option 6','Option 7','Option 8'],
      "folder":['Open folder','Open folder in new window','Copy Folder','Delete Folder'],
      "file":['Open file','Open file in new window','Copy file','Delete file'],
      "title":['Rename'],
      "desktop-item":['New Sprint','New User Story','Copy','Cut','Paste']
    };
    this.state.startMenuOption =['Start menu optionn 1','Start menu optionn 2','Start menu optionn 3','Start menu optionn 4'];
    
    

  
  }

  state = { 
    contextMenuVisible: false,
    startMenuVisible:false,
    mouseXposition:0,
    mouseYposition:0,
    mouseButtonType:'',
    clickedComponentClass:''


};

    componentDidMount() {
      document.addEventListener('contextmenu', this.handleContextMenu.bind(this));
      document.addEventListener('click', this.handleClick.bind(this));
      //document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
    document.removeEventListener('contextmenu', this.handleContextMenu.bind(this));
    document.removeEventListener('click', this.handleClick.bind(this));
    //document.removeEventListener('scroll', this._handleScroll);
    }

    handleContextMenu(event){
      const componentClicked = event.target.className;
      console.log(componentClicked);
      if(componentClicked === 'desktop-wallpaper' 
        ||componentClicked === 'start-menu-button' 
        ||componentClicked === 'task-bar' 
        ||componentClicked === 'desktop-item'
        ||componentClicked === 'folder'
        ||componentClicked === 'file'
        ||componentClicked === 'title' ){
          event.preventDefault();
          const xPosition = event.clientX;
          const yPosition = event.clientY;
          
          this.setState(
              { mouseXposition:xPosition,
                mouseYposition:yPosition,
                clickedComponentClass:componentClicked,
                mouseButtonType:'right-click',
                contextMenuVisible:true,
                startMenuVisible:false
              });
        }


    }



    handleClick(event){
      event.preventDefault();
      const xPosition = event.clientX;
      const yPosition = event.clientY;
      const componentClicked = event.target.className;
      var isStartMenuVisible = false;
      if(componentClicked === 'start-menu-button'){
        isStartMenuVisible=true;
      }


      this.setState(
          { mouseXposition:xPosition,
            mouseYposition:yPosition,
            clickedComponentClass:componentClicked,
            mouseButtonType:'left-click',
            contextMenuVisible:false,
            startMenuVisible:isStartMenuVisible
          });

    };

    onContextMenuOptionClick(event){
      console.log(event.target);
    }

    renderDesktopItems(){
      var desktopItems = [];
      desktopItems.push(<DesktopItem name="My folder" type="folder"></DesktopItem>);
      desktopItems.push(<DesktopItem name="My file" type="file"></DesktopItem>);
      /*for(var i=0;i<2;i++){
        desktopItems.push(<DesktopItem></DesktopItem>);
      }*/
      return desktopItems;
    }

    render() {
        return (<div 
        className="desktop-wallpaper">

        <MyContextMenu visible={this.state.contextMenuVisible} 
              xPosition={this.state.mouseXposition}
              yPosition={this.state.mouseYposition} 
              menuItemList={this.state.contextMenuOption[this.state.clickedComponentClass]}
              onContextMenuClick={this.onContextMenuOptionClick.bind(this)}         
              
        ></MyContextMenu>
         <TaskBar></TaskBar>
         <StartMenu visible={this.state.startMenuVisible}
          menuItemList={this.state.startMenuOption}>
         </StartMenu>
         {this.renderDesktopItems()}
        </div>)
      }


}
export default Desktop;
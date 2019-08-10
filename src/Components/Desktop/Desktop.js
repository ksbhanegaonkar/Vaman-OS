import React,{Component} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import $ from 'jquery';
import './Desktop.css';
import TaskBar from '../TaskBar/TaskBar';
import StartMenu from '../StartMenu/StartMenu';
import MyContextMenu from '../ContextMenu/MyContextMennu';
class Desktop extends Component{

  constructor(){
    super();
    this.state.contextMenuOption = {
      "desktop-wallpaper":['New Sprint','New User Story','Copy','Cut','Paste'],
      "start-menu-button":['Option 1','Option 2','Option 3','Option 4'],
      "task-bar":['Option 5','Option 6','Option 7','Option 8']
    };

  
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
      if(componentClicked === 'desktop-wallpaper' 
        ||componentClicked === 'start-menu-button' 
        ||componentClicked === 'task-bar' ){
          event.preventDefault();
          const xPosition = event.clientX;
          const yPosition = event.clientY;
          
          this.setState(
              { mouseXposition:xPosition,
                mouseYposition:yPosition,
                clickedComponentClass:componentClicked,
                mouseButtonType:'right-click',
                contextMenuVisible:true
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
          menuItemList={this.state.contextMenuOption[this.state.clickedComponentClass]}
         >

         </StartMenu>
        </div>)
      }


}
export default Desktop;
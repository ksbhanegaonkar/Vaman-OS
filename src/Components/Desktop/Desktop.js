import React,{Component} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import $ from 'jquery';
import './Desktop.css';
import TaskBar from '../TaskBar/TaskBar';
import StartMenu from '../StartMenu/StartMenu';
import MyContextMenu from '../ContextMenu/MyContextMennu';
import DesktopItem from '../DesktopItem/DesktopItem';
import { visitLexicalEnvironment } from 'typescript';
class Desktop extends Component{

  constructor(props){
    super(props);
   

    this.state.contextMenuOption = {
      "desktop-wallpaper":['New Sprint','New User Story','Refresh','Copy','Cut','Paste'],
      "start-menu-button":['Option 1','Option 2','Option 3','Option 4'],
      "task-bar":['Option 5','Option 6','Option 7','Option 8'],
      "desktop-item-folder":['Open folder','Open folder in new window','Bookmark folder','Copy Folder','Rename Folder','Delete Folder'],
      "desktop-item-file":['Open file','Open file in new window','Bookmark file','Copy file','Rename File','Delete file']
    };
    this.state.startMenuOption =['My Folder','My Bookmarks','My Notes','Logout'];
    
    

  
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
      document.addEventListener('dragend', this.onDragFinish.bind(this));
      document.addEventListener('contextmenu', this.handleContextMenu.bind(this));
      document.addEventListener('click', this.handleClick.bind(this));
      //document.addEventListener('drag', this.mouseUp.bind(this));

      //document.addEventListener('scroll', this._handleScroll);
      fetch(new Request("http://localhost:8080/Vaman-OS-backend/webapi/services/getContextMenuList"))
      .then((res)=>res.json())
      .then(data=>{
        this.setState({startMenuOption:data['start-button-menu']});
      });
    };

    componentWillUnmount() {
    document.removeEventListener('dragend', this.onDragFinish.bind(this));
    document.removeEventListener('contextmenu', this.handleContextMenu.bind(this));
    document.removeEventListener('click', this.handleClick.bind(this));
    //document.removeEventListener('drag', this.mouseUp.bind(this));

    //document.removeEventListener('scroll', this._handleScroll);
    }

    handleContextMenu(event){
      const componentClicked = event.target.className;
      console.log(componentClicked);
      if(componentClicked === 'desktop-wallpaper' 
        ||componentClicked === 'start-menu-button' 
        ||componentClicked === 'task-bar' 
        ||componentClicked === 'desktop-item-folder'
        ||componentClicked === 'desktop-item-file'){
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
      //event.preventDefault();
        const componentClicked = event.target.className;
        console.log('class name from left click : '+componentClicked);
        var isStartMenuVisible = false;
        if(componentClicked === 'start-menu-button'){
          isStartMenuVisible=true;
        }
        this.setState(
            { 
              contextMenuVisible:false,
              startMenuVisible:isStartMenuVisible
            });
      


    };


    onDragFinish(event) {
      if(event.target.className.includes('desktop-item')){
        console.log('true');
        console.log('On mouse finish'+event.target.style);
        console.log(event.clientX+" and "+event.clientY);
        
        /*This is used for grid alignment of icons
        event.target.style.left=`${event.clientX-event.clientX%70-25}px`;
        event.target.style.top=`${event.clientY-event.clientY%80-25}px`;*/

        event.target.style.left=`${event.clientX-30}px`;
        event.target.style.top=`${event.clientY-30}px`;

      }

    }
    
    mouseUp(event) {
      console.log('On mouse drag');
    }

    onContextMenuOptionClick(event){
      console.log(event.target);
    }

    renderDesktopItems(){
      var desktopItems = [];
      desktopItems.push(<DesktopItem name="My folder" type="folder"></DesktopItem>);
      desktopItems.push(<DesktopItem name="My file" type="file"></DesktopItem>);
      // for(var i=0;i<20;i++){
      //   desktopItems.push(<DesktopItem></DesktopItem>);
      // }
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
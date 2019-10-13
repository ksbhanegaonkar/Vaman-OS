import React,{Component} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import $ from 'jquery';
import './Desktop.css';
import TaskBar from '../TaskBar/TaskBar';
import StartMenu from '../StartMenu/StartMenu';
import MyContextMenu from '../ContextMenu/MyContextMennu';
import DesktopItem from '../DesktopItem/DesktopItem';
import { visitLexicalEnvironment } from 'typescript';
import DesktopItemView from '../DesktopItemView/DesktopItemView';
import LoadingScreen from '../LodingScreen/LoadingScreen';
import { get } from 'https';
import { delay } from 'q';
import {withRouter} from 'react-router-dom';
import {postRequest} from '../Utils/RestUtil';
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
    clickedComponentClass:'',
    
    iconsList:{},

    desktopItems:{},
    desktopItemViews:{},

    taskBarItems:{},

    dataloding:false,

    jwtToken:'',

    loggedInUserName:''

};

    componentDidMount() {
      document.addEventListener('dragend', this.onDragFinish.bind(this));
      document.addEventListener('contextmenu', this.handleContextMenu.bind(this));
      document.addEventListener('click', this.handleClick.bind(this));
      //document.addEventListener('drag', this.mouseUp.bind(this));
      //document.addEventListener('scroll', this._handleScroll);
      this.initDesktop();
     // this.loadDesktopIcons();
      this.loadDesktopItems();

    }

    componentWillUnmount() {
    document.removeEventListener('dragend', this.onDragFinish.bind(this));
    document.removeEventListener('contextmenu', this.handleContextMenu.bind(this));
    document.removeEventListener('click', this.handleClick.bind(this));
    //document.removeEventListener('drag', this.mouseUp.bind(this));
    //document.removeEventListener('scroll', this._handleScroll);
    }



    handleContextMenu(event){
      const componentClicked = event.target.className;
      event.preventDefault();
      if(componentClicked === 'desktop-wallpaper' 
        ||componentClicked === 'start-menu-button' 
        ||componentClicked === 'task-bar' 
        ||componentClicked === 'desktop-item-folder'
        ||componentClicked === 'desktop-item-file'){
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

             // this.sendDesktopUpdate(event.target.innerText);
        }

      }



    
      initDesktop(){ 
        this.setState({dataloding:true});
        postRequest('/onaction',{state:'init'},
        (data) =>{
          this.setState(data);
        });
        this.setState({dataloding:false});
      }

      // loadDesktopIcons(){
      //   this.setState({dataloding:true});
      //   postRequest('/onaction',{state:"update",action:"on-desktop-icons-load"},
      //   (data) =>{
      //     this.setState({iconsList:data});
      //   });
      // }
      loadDesktopItems(){
        this.setState({dataloding:true});
        postRequest('/onaction',{state:"update",action:"on-desktop-item-load"},
        (data) =>{
            this.setState({desktopItems:data,dataloding:false});         
        }
        );
      }


    handleClick(event){
      //event.preventDefault();
        const componentClicked = event.target.className;
        var isStartMenuVisible = false;
        if(componentClicked === 'start-menu-button'){
          isStartMenuVisible=true;
        }
        this.setState(
            { 
              contextMenuVisible:false,
              startMenuVisible:isStartMenuVisible
            });
            
            //this.sendDesktopUpdate(event.target.innerText);
            

    };


    onDragFinish(event) {
      if(event.target.className.includes('desktop-item')){
        /*This is used for grid alignment of icons
        event.target.style.left=`${event.clientX-event.clientX%70-25}px`;
        event.target.style.top=`${event.clientY-event.clientY%80-25}px`;*/

        event.target.style.left=`${event.clientX-30}px`;
        event.target.style.top=`${event.clientY-30}px`;

      }

    }
    
    mouseUp(event) {
    }

    onContextMenuOptionClick(event){
      console.log(event.target);
    }

    renderDesktopItems(){
      var desktopItemList = [];
      var rowNo =1;
      var columnNo =1;
      var horizontalGridSize=90;
      var vertialGridSize=100;
       for(var item in this.state.desktopItems){
         let type = this.state.desktopItems[item];
         console.log("Type is ::"+type);
        desktopItemList.push(<DesktopItem
        icon={this.state.iconsList[type]}  
        key={item} name={item} top={rowNo*vertialGridSize+'px'} left={columnNo*horizontalGridSize+'px'}
        onDoubleClick={this.onDesktopIconDoubleClick.bind(this)}
        ></DesktopItem>);
        rowNo++;
        if(rowNo >5){
          rowNo=1;
          columnNo++;
        }
        
       }
      return desktopItemList;
    }

    onDesktopIconDoubleClick(name){
          this.setState({dataloding:true});
          postRequest('/onaction',{state:"update",action:"on-double-click",desktopItem:name},
          (data) =>{
            var newTaskBarItems = this.state.taskBarItems;
              for(var i in newTaskBarItems){
                if(newTaskBarItems[i] == 'block'){
                  newTaskBarItems[i]='none';
                }
              }
              var itemName = data['desktop-item-data'].name;
              console.log("Desktop item data "+data);
              console.log("item name is :::"+itemName);
              newTaskBarItems[itemName] = 'block';
              var newDesktopItemViews = this.state.desktopItemViews;
              newDesktopItemViews[itemName]=data['desktop-item-data'];
              this.setState({desktopItemViews:newDesktopItemViews,taskBarItems:newTaskBarItems,dataloding:false});         
              console.log(this.state.desktopItemViews);
          }
          );
    }

    onDesktopItemViewClose(name){
      var newTaskBarItems = this.state.taskBarItems;
      var newDesktopItemViews = this.state.desktopItemViews;
      delete newTaskBarItems[name];
      delete newDesktopItemViews[name]
      this.setState({desktopItemViews:newDesktopItemViews,taskBarItems:newTaskBarItems});
    }

    onDesktopItemViewMinimize(name){
      var newTaskBarItems = this.state.taskBarItems;
      newTaskBarItems[name] = 'none';
      this.setState({taskBarItems:newTaskBarItems});    
    }

    onDesktopItemViewActive(name){
      var newTaskBarItems = this.state.taskBarItems;
        for(var i in newTaskBarItems){
          if(newTaskBarItems[i] == 'block'){
            newTaskBarItems[i]='none';
          }
        }
        newTaskBarItems[name] = 'block';
        this.setState({taskBarItems:newTaskBarItems});  
    }

    onDesktopItemViewInFocus(name){
      var newTaskBarItems = this.state.taskBarItems;
        for(var i in newTaskBarItems){
          if(newTaskBarItems[i] == 'inFocus'){
            newTaskBarItems[i]='block';
          }
        }
        newTaskBarItems[name] = 'inFocus';
        this.setState({taskBarItems:newTaskBarItems});  
    }

    onTaskBarItemClick(name){
      // if(this.state.taskBarItems[name]==='block'){
      //   this.onDesktopItemViewMinimize(name);
      // }
      // else {
        this.onDesktopItemViewActive(name);
      // }

    }

    onStartMenuItemClick(event){
      let clickedButton = event.target.childNodes[0].data;
      console.log(clickedButton);
      if(clickedButton==='Logout'){
        console.log('user is logged out...');
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
        
      }
    }

    renderDesktopItemView(){
      var desktopItemViewList = [];
       for(var item in this.state.desktopItemViews){
        desktopItemViewList.push(<DesktopItemView
          key={item} name={item} 
          onClose={this.onDesktopItemViewClose.bind(this)}
          onMinimize={this.onDesktopItemViewMinimize.bind(this)}
          activeStatus={this.state.taskBarItems[item]}
          onDoubleClick={this.onDesktopIconDoubleClick.bind(this)}
          desktopItemViewData={this.state.desktopItemViews[item]}
        ></DesktopItemView>);
       }
      return desktopItemViewList;
    }

    render() {
        return (<div 
        className="desktop-wallpaper">
          <LoadingScreen isLoading={this.state.dataloding}></LoadingScreen>
        <MyContextMenu visible={this.state.contextMenuVisible} 
              xPosition={this.state.mouseXposition}
              yPosition={this.state.mouseYposition} 
              menuItemList={this.state.contextMenuOption[this.state.clickedComponentClass]}
              onContextMenuClick={this.onContextMenuOptionClick.bind(this)}>
          </MyContextMenu>
         <TaskBar taskBarItems={this.state.taskBarItems}
         onItemClick={this.onTaskBarItemClick.bind(this)}
         ></TaskBar>
         <StartMenu visible={this.state.startMenuVisible}
          menuItemList={this.state.startMenuOption}
          loggedUserName={this.state.loggedInUserName}
          onStartMenuItemClick={this.onStartMenuItemClick.bind(this)}>
         </StartMenu>
         {this.renderDesktopItems()}
         {this.renderDesktopItemView()}
         
        </div>)
      }


}
export default withRouter(Desktop);
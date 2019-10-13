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

    }

    componentWillUnmount() {
    document.removeEventListener('dragend', this.onDragFinish.bind(this));
    document.removeEventListener('contextmenu', this.handleContextMenu.bind(this));
    document.removeEventListener('click', this.handleClick.bind(this));
    //document.removeEventListener('drag', this.mouseUp.bind(this));
    //document.removeEventListener('scroll', this._handleScroll);
    }

    initDesktop(){
 /*     var newState = this.state;
      var menuOptions;
      fetch(new Request("http://localhost:8080/Vaman-OS-backend/webapi/services/getContextMenuList"))
      .then((res)=>res.json())
      .then(data=>{

        menuOptions =
        {
          "desktop-wallpaper":data['desktop-wallpaper'],
          "start-menu-button":data['start-button-context-menu'],
          "task-bar":data['task-bar'],
          "desktop-item-folder":data['desktop-item-folder'],
          "desktop-item-file":data['desktop-item-file']
        };
        this.setState({contextMenuOption:menuOptions});
        
      });

     */
    //this.getAuthenticationToken();
    this.initDesktopData();
    
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

      getAuthenticationToken(){
        //this.setState({dataloding:true});
        let headers = new Headers();
        headers.set( 'Content-Type', 'application/json');
        headers.set('Access-Control-Allow-Origin',"*");
        fetch(new Request("http://localhost:8083/authenticate"),
          {
            headers:headers,
             method: 'POST', // or 'PUT'
             //mode:"no-cors",
             body: JSON.stringify({username:'kedar',password:'kedar'}) // data can be `string` or {object}!
   
          }
             )
        .then((res)=>res.json())
        .then(data=>{
         
          this.setState({jwtToken:this.jsonEscape('Bearer '+data.token)})
          console.log('Token is :::: '+this.state.jwtToken);
          this.initDesktopData();

          //this.setState({
            // startMenuOption:data['start-menu-list'],
            // contextMenuOption:data['context-menu-list'],
            // desktopItems:data['desktop-items'],
            // desktopItemViews:data['desktop-item-views']
         // });
        });
      }

      jsonEscape(str)  {
        return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
    }
    
      initDesktopData(){
       
        this.setState({dataloding:true});
      
        fetch(new Request("http://localhost:8083/onaction"),
          {
            headers:{
              'Content-Type': 'text/plain',
             // ,'Access-Control-Allow-Origin':"*",
              'Authorization':localStorage.getItem("jwtToken")
            },
             method: 'POST', // or 'PUT'
             //mode:"no-cors",
             body: JSON.stringify({state:'init'}) // data can be `string` or {object}!
            
          }
             )

        .then((res)=>res.json())
        .then(data=>{
          data.dataloding=false;
          this.setState(data);
          //this.setState({
            // startMenuOption:data['start-menu-list'],
            // contextMenuOption:data['context-menu-list'],
            // desktopItems:data['desktop-items'],
            // desktopItemViews:data['desktop-item-views']
         // });
        }).catch(err =>{
          localStorage.removeItem("jwtToken");
          this.props.history.push("/");
        });
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
        desktopItemList.push(<DesktopItem type={this.state.desktopItems[item]}
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

            fetch(new Request("http://localhost:8083/onaction"),
            {
              method: 'POST', 
              body: JSON.stringify({state:"update",action:"on-double-click",desktopItem:name}), 
              headers:{
                'Content-Type': 'text/plain',
                //,'Access-Control-Allow-Origin':"*"
                'Authorization':localStorage.getItem("jwtToken")
              }}
              )
          .then((res)=>res.json())
          .then(data=>{
            var newTaskBarItems = this.state.taskBarItems;
            for(var i in newTaskBarItems){
              if(newTaskBarItems[i] == 'block'){
                newTaskBarItems[i]='none';
              }
            }
            var itemName = data['desktop-item-data']['name'];
            newTaskBarItems[itemName] = 'block';
            var newDesktopItemViews = this.state.desktopItemViews;
            newDesktopItemViews[itemName]=data['desktop-item-data'];
            this.setState({desktopItemViews:newDesktopItemViews,taskBarItems:newTaskBarItems,dataloding:false});         
          });
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
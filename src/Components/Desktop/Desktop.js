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
import {postRequest,getRequest,downloadFilePostRequest,uploadFilePostRequest} from '../Utils/RestUtil';
import { conditionalExpression } from '@babel/types';
class Desktop extends Component{
  
  constructor(props){
    super(props);
   

    this.state.contextMenuOption = {
      "desktop-wallpaper":['New Sprint','New User Story','Refresh','Copy','Cut','Paste'],
      "start-menu-button":['Option 1','Option 2','Option 3','Option 4'],
      "task-bar":['Option 5','Option 6','Option 7','Option 8'],
      "folder":['Open folder','Open folder in new window','Bookmark folder','Copy Folder','Rename Folder','Delete Folder'],
      "file":['Open file','Open file in new window','Bookmark file','Copy file','Rename File','Delete file']
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
    rightClickedAppName:'',
    
    iconsList:{},

    desktopItems:[],
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
      console.log("Handled event is ::::");
      console.dir(event.target );
      const componentClicked = event.target.className;
      const xPosition = event.clientX;
      const yPosition = event.clientY;
      console.log("Component right clicked :::"+componentClicked);
      event.preventDefault();
      if(componentClicked === 'desktop-wallpaper' 
        ||componentClicked === 'start-menu-button' 
        ||componentClicked === 'task-bar'
        ||componentClicked === 'desktop-item-view-folder'){

          
          this.setState(
              { mouseXposition:xPosition,
                mouseYposition:yPosition,
                clickedComponentClass:componentClicked,
                rightClickedAppName:componentClicked,
                mouseButtonType:'right-click',
                contextMenuVisible:true,
                startMenuVisible:false
              });

             // this.sendDesktopUpdate(event.target.innerText);
        }
        else if(componentClicked.includes("app/file")){
          this.setState(
            { mouseXposition:xPosition,
              mouseYposition:yPosition,
              clickedComponentClass:"file",
              mouseButtonType:'right-click',
              rightClickedAppName:componentClicked,
              contextMenuVisible:true,
              startMenuVisible:false
            });
        }
        else if(componentClicked.includes("app/folder")){
          this.setState(
            { mouseXposition:xPosition,
              mouseYposition:yPosition,
              clickedComponentClass:"folder",
              rightClickedAppName:componentClicked,
              mouseButtonType:'right-click',
              contextMenuVisible:true,
              startMenuVisible:false
            });
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
        getRequest('/getdesktopitems',
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
      console.log(event.target.childNodes[0].data +" on app "+this.state.rightClickedAppName);
      if(event.target.childNodes[0].data.includes("Download")){

        downloadFilePostRequest('/downloadapp',{item:this.state.rightClickedAppName,option:"Download File"},
        (response) => {
                  const [app, type, id, name] = this.state.rightClickedAppName.split("/");
                  let filename = name;
                  //let disposition = response.headers.get('Content-Disposition');
                  //console.log("Disposition is ::: "+disposition);
                      // let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                      // let matches = filenameRegex.exec(disposition);
                      // if (matches != null && matches[1]) { 
                      //   filename = matches[1].replace(/['"]/g, '');
                      // }

        
        
                  response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                    });
             

        }
        );

      }else if(event.target.childNodes[0].data.includes("Upload")){
        this.refs.fileUploader.click();
      }else if(event.target.childNodes[0].data.includes("Refresh")){

      }else{
        console.log("right clicked target object is :::");
        console.dir(this.state.rightClickedAppName);
        console.dir(event.target);
        postRequest('/oncontextmenuaction',{item:this.state.rightClickedAppName,option:event.target.childNodes[0].data},
        (data) => this.loadDesktopItems()
        );
      }

    }

    renderDesktopItems(){
      let desktopItemList = [];
      let rowNo =1;
      let columnNo =1;
      let horizontalGridSize=90;
      let vertialGridSize=100;
       for(let i=0;i<this.state.desktopItems.length;i++){
         let item = this.state.desktopItems[i];
         let type = item.appType;
        desktopItemList.push(<DesktopItem
        icon={this.state.iconsList[type]}  
        key={item.appId} item={item} top={rowNo*vertialGridSize+'px'} left={columnNo*horizontalGridSize+'px'}
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

    onDesktopIconDoubleClick(item){
           this.setState({dataloding:true});
          // console.log("name is ::::"+name);
          // postRequest('/onaction',{state:"update",action:"on-double-click",desktopItem:name},
          // (data) =>{
          //   var newTaskBarItems = this.state.taskBarItems;
          //     for(var i in newTaskBarItems){
          //       if(newTaskBarItems[i] == 'block'){
          //         newTaskBarItems[i]='none';
          //       }
          //     }
          //     var itemName = data['desktop-item-data'].name;
          //     newTaskBarItems[itemName] = 'block';
          //     var newDesktopItemViews = this.state.desktopItemViews;
          //     newDesktopItemViews[itemName]=data['desktop-item-data'];
          //     this.setState({desktopItemViews:newDesktopItemViews,taskBarItems:newTaskBarItems,dataloding:false});         
          // }
          // );
          if(this.state.taskBarItems[item.appId]===undefined){
            var newTaskBarItems = this.state.taskBarItems;
            newTaskBarItems[item.appId] = 'block';
            var newDesktopItemViews = this.state.desktopItemViews;
            newDesktopItemViews[item.appId] = item;
            this.setState({desktopItemViews:newDesktopItemViews,taskBarItems:newTaskBarItems,dataloding:false});
          }else{
            var newTaskBarItems = this.state.taskBarItems;
            newTaskBarItems[item.appId] = 'block';
            this.setState({taskBarItems:newTaskBarItems,dataloding:false});
          }

    }

    onDesktopItemViewClose(appId){
      var newTaskBarItems = this.state.taskBarItems;
      var newDesktopItemViews = this.state.desktopItemViews;
      delete newTaskBarItems[appId];
      delete newDesktopItemViews[appId]
      this.setState({desktopItemViews:newDesktopItemViews,taskBarItems:newTaskBarItems});
    }

    onDesktopItemViewMinimize(appId){
      var newTaskBarItems = this.state.taskBarItems;
      newTaskBarItems[appId] = 'none';
      this.setState({taskBarItems:newTaskBarItems});    
    }

    onDesktopItemViewActive(appId){
      var newTaskBarItems = this.state.taskBarItems;
        for(var i in newTaskBarItems){
          if(newTaskBarItems[i] == 'block'){
            newTaskBarItems[i]='none';
          }
        }
        newTaskBarItems[appId] = 'block';
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

    onTaskBarItemClick(appId){
      
      if(this.state.taskBarItems[appId]==='block'){
        this.onDesktopItemViewMinimize(appId);
      }
      else {
        this.onDesktopItemViewActive(appId);
      }

    }

    onStartMenuItemClick(event){
      let clickedButton = event.target.childNodes[0].data;
      if(clickedButton==='Logout'){
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
        
      }
    }

    renderDesktopItemView(){
      var desktopItemViewList = [];
      //  for(var item in this.state.desktopItemViews){
      //   desktopItemViewList.push(<DesktopItemView
      //     key={item} name={item} 
      //     onClose={this.onDesktopItemViewClose.bind(this)}
      //     onMinimize={this.onDesktopItemViewMinimize.bind(this)}
      //     activeStatus={this.state.taskBarItems[item]}
      //     onDoubleClick={this.onDesktopIconDoubleClick.bind(this)}
      //     desktopItemViewData={this.state.desktopItemViews[item]}
      //   ></DesktopItemView>);
      //  }
        for(let appId in this.state.desktopItemViews){
         let item = this.state.desktopItemViews[appId];
          desktopItemViewList.push(<DesktopItemView
          key={item.appId} item={item} 
          onClose={this.onDesktopItemViewClose.bind(this)}
          onMinimize={this.onDesktopItemViewMinimize.bind(this)}
          activeStatus={this.state.taskBarItems[item.appId]}
          onDoubleClick={this.onDesktopIconDoubleClick.bind(this)}
        ></DesktopItemView>);
       }

      return desktopItemViewList;
    }

     readUploadedFileAsText (inputFile) {
      const temporaryFileReader = new FileReader();
  
      return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
          temporaryFileReader.abort();
          reject(new DOMException("Problem parsing input file."));
        };
  
        temporaryFileReader.onload = () => {
          resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsText(inputFile);
      });
    };
  
    uploadFile = async e => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      uploadFilePostRequest("/upload",formData,(data)=>{
        this.loadDesktopItems()
      })
    };

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
         desktopItemViews={this.state.desktopItemViews}
         onItemClick={this.onTaskBarItemClick.bind(this)}
         ></TaskBar>
          <StartMenu visible={this.state.startMenuVisible}
          menuItemList={this.state.startMenuOption}
          loggedUserName={this.state.loggedInUserName}
          onStartMenuItemClick={this.onStartMenuItemClick.bind(this)}>
         </StartMenu> 
         {this.renderDesktopItems()}
         {this.renderDesktopItemView()}
         <input type="file" id="FileUpload" ref="fileUploader" style={{display: "none"}} onChange={this.uploadFile.bind(this)}/>
        </div>)
      }


}
export default withRouter(Desktop);
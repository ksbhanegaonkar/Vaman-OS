import React,{Component} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import $ from 'jquery';
import './Desktop.css';
import TaskBar from '../TaskBar/TaskBar';
import StartMenu from '../StartMenu/StartMenu';
import MyContextMenu from '../ContextMenu/MyContextMennu';
class Desktop extends Component{

    render() {
        return (<div className="Desktop-wallpaper">
          <MyContextMenu></MyContextMenu>
         <TaskBar></TaskBar>
         <StartMenu></StartMenu>
        </div>)
      }


}
export default Desktop;
import React,{Component} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import $ from 'jquery';
import './Desktop.css';
import TaskBar from '../TaskBar/TaskBar';
import StartMenu from '../StartMenu/StartMenu';
import MyContextMenu from '../ContextMenu/MyContextMennu';
class Desktop extends Component{

  state = {
    visible: false,
    contextMenuOption :['New Sprint','New User Story','Copy','Cut','Paste'],
    startButtonContextMenuOption :['Option 1','Option 2','Option 3','Option 4'],
    taskBarContextMenuOption :['Option 5','Option 6','Option 7','Option 8']
};

    componentDidMount() {
      //document.addEventListener('contextmenu', this._handleContextMenu);
      //document.addEventListener('click', this._handleClick);
      //document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
    //document.removeEventListener('contextmenu', this._handleContextMenu);
    //document.removeEventListener('click', this._handleClick);
    //document.removeEventListener('scroll', this._handleScroll);
    }

    render() {
        return (<div className="Desktop-wallpaper">
        <MyContextMenu></MyContextMenu>
         <TaskBar></TaskBar>
         <StartMenu></StartMenu>
        </div>)
      }


}
export default Desktop;
import React,{Component} from 'react';
import $ from 'jquery';
import './Desktop.css';
import TaskBar from '../TaskBar/TaskBar';
import StartMenu from '../StartMenu/StartMenu';
class Desktop extends Component{

    render() {
        return (<div className="Desktop-wallpaper">

         <TaskBar></TaskBar>
         <StartMenu></StartMenu>
        </div>)
      }


}
export default Desktop;
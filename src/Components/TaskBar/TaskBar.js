import React,{Component} from 'react';
import $ from 'jquery';
import './TaskBar.css';
import StartMenu from '../StartMenu/StartMenu';
class TaskBar extends Component{

    render() {
        return (<div className="Task-bar">
          <StartMenu></StartMenu>
        </div>)
      }


}
export default TaskBar;
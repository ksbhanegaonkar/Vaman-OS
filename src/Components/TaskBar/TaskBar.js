import React,{Component} from 'react';
import $ from 'jquery';
import './TaskBar.css';
import StartMenu from '../StartMenu/StartMenu';
class TaskBar extends Component{

    render() {
        return (<div className="task-bar">
          <div className="os-info">Vaman-OS</div>
          <div className="developer">Kedar Bhanegaonkar</div>
           

        </div>)
      }


}
export default TaskBar;
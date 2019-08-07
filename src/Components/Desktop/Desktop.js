import React,{Component} from 'react';
import $ from 'jquery';
import './Desktop.css';
import TaskBar from '../TaskBar/TaskBar';
class Desktop extends Component{

    render() {
        return (<div className="Desktop-wallpaper">
         <TaskBar></TaskBar>
        </div>)
      }


}
export default Desktop;
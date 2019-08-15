import React,{Component} from 'react';
import $ from 'jquery';
import './TaskBar.scss';
import StartMenu from '../StartMenu/StartMenu';
class TaskBar extends Component{

    render() {
        return (<div className="task-bar">
          <div className="os-info">Vaman-OS</div>
          <div className="developer">Kedar Bhanegaonkar</div>
           {this.renderTaskBarItems()}


        </div>)
      }

    renderTaskBarItems(){
     

      var taskBarItemsList = [];
      var clickFun;


      for(var item in this.props.taskBarItems){

        if(this.props.taskBarItems[item] == 'none'){
          clickFun = this.props.onActive;
        }else{
          clickFun = this.props.onMinimize;
        }

        taskBarItemsList.push(<button key={item} className={'task-bar-item-'+this.props.taskBarItems[item]}
        onClick={()=> 
          clickFun(item)
        }
        >{item}</button>);
      }
     return taskBarItemsList;
    }


}
export default TaskBar;
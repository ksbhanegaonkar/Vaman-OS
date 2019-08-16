import React,{Component} from 'react';
import './TaskBarItem.scss';
class TaskBarItem extends Component{

    render() {
        return (<button id={"task-bar-item-"+this.props.activeStatus}
        onClick={()=>this.props.onItemClick(this.props.name)}
        >
          {this.props.name}
        </button>)
      }




}
export default TaskBarItem;
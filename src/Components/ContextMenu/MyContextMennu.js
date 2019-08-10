import React,{Component} from 'react';
import $ from 'jquery';
import './MyContextMenu.scss';

class MyContextMenu extends Component {
    currentContextMenuOption = 'Desktop-wallpaper';
    state = {
        visible: false,
        contextMenuOption :['New Sprint','New User Story','Copy','Cut','Paste'],
        startButtonContextMenuOption :['Option 1','Option 2','Option 3','Option 4'],
        taskBarContextMenuOption :['Option 5','Option 6','Option 7','Option 8']
    };
    
    render(){
        if(this.props.visible){
            const style = {
                position:'absolute',
                top:this.props.top,
                left:this.props.left
            };
            return(
                <div className="contextMenu" style={style}>
                    {this.renderMenuItem()}
                </div>
            );
        }
        else return null;

    }

    renderMenuItem(){
        console.log('Iterating menu item...');
        var contextMenuItems = [];

        for(var i=0;i<this.props.menuItemList.length;i++){
            contextMenuItems.push(<div key={this.props.menuItemList[i]} className="contextMenu--option"
            
            onClick={this.props.onContextMenuClick}
            
            >{this.props.menuItemList[i]}</div>);
        }
        return contextMenuItems;
    }
}

export default MyContextMenu;
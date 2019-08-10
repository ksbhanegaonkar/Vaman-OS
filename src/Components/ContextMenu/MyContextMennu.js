import React,{Component} from 'react';
import $ from 'jquery';
import './MyContextMenu.scss';

class MyContextMenu extends Component {
    state = {
        visible: false,
        contextMenuOption :['New Sprint','New User Story','Copy','Cut','Paste']
    };
    
    componentDidMount() {
        document.addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
      document.removeEventListener('contextmenu', this._handleContextMenu);
      document.removeEventListener('click', this._handleClick);
      document.removeEventListener('scroll', this._handleScroll);
    }
    
    _handleContextMenu = (event) => {
        event.preventDefault();
        console.log(event.target.className);
        if(event.target.className === 'Desktop-wallpaper'){
            this.setState({ visible: true });
            const clickX = event.clientX;
            const clickY = event.clientY;
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            const rootW = this.root.offsetWidth;
            const rootH = this.root.offsetHeight;
            
            const right = (screenW - clickX) > rootW;
            const left = !right;
            const top = (screenH - clickY) > rootH;
            const bottom = !top;
            
            if (right) {
                this.root.style.left = `${clickX + 5}px`;
            }
            
            if (left) {
                this.root.style.left = `${clickX - rootW - 5}px`;
            }
            
            if (top) {
                this.root.style.top = `${clickY + 5}px`;
            }
            
            if (bottom) {
                this.root.style.top = `${clickY - rootH - 5}px`;
            }
        }else if(event.target.className === 'start-menu-button'){
            console.log('Right clicked on start menu');

        }else if(event.target.className === 'Task-bar'){
            console.log('Right clicked on task bar');
        }

    };

    _handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);
        
        if (wasOutside && visible) this.setState({ visible: false, });
    };

    _handleScroll = () => {
        const { visible } = this.state;
        
        if (visible) this.setState({ visible: false, });
    };
    
    render() {
        const { visible } = this.state;
        
        return(visible || null) && 
            <div ref={ref => {this.root = ref}} className="contextMenu">
                {this.renderMenuItem()}
            </div>
    };

    shareThis(){
        console.log("Share this");
    }

    renderMenuItem(){
        console.log('Iterating menu item...');
        var contextMenuItems = [];
        for(var i=0;i<this.state.contextMenuOption.length;i++){
            contextMenuItems.push(<div key={this.state.contextMenuOption[i]} className="contextMenu--option">{this.state.contextMenuOption[i]}</div>);
        }
        return contextMenuItems;
    }
}

export default MyContextMenu;
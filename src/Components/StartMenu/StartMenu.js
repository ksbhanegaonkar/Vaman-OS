import React,{Component} from 'react';
import $ from 'jquery';
import './StartMenu.css';
class StartMenu extends Component{

    
    render() {
        return (<div className="start-menu">
          <button onMouseEnter={this.onEnter} onMouseLeave={this.onLeave} >testing</button>
          <div id="panel">Hello javatpoint.com!   
It is the best tutorial website to learn jQuery and other languages.</div>  
          
        </div>)
      }

      onEnter = () => {
        console.log('test btn clicked');
        $("#panel").slideDown("slow");
      };
      onLeave = () => {
        console.log('test btn clicked');
        $("#panel").slideUp("slow");
      };
}
export default StartMenu;
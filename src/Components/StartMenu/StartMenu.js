import React,{Component} from 'react';
import $ from 'jquery';
import './StartMenu.css';
class StartMenu extends Component{

    
    render() {
        return (<button className="start-menu" >
          
          Extras
          
        </button>)
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
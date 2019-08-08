import React,{Component} from 'react';
import $ from 'jquery';
import './StartMenu.css';
class StartMenu extends Component{

    
    render() {
        return (<button className="start-menu" onClick={this.openStartMenu}>
          
          Extras
          
        </button>)
      }

      openStartMenu(){
        console.log('Clicked start menu');
      }

      onEnter = () => {
        console.log('Mouse entered task bar');
       // $("#panel").slideDown("slow");
      };
      onLeave = () => {
        console.log('Mouse left task bar');
       // $("#panel").slideUp("slow");
      };
}
export default StartMenu;
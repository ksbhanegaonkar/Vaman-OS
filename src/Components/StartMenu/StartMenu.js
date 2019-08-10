import React,{Component} from 'react';
import $ from 'jquery';
import './StartMenu.scss';
class StartMenu extends Component{

  state = {
    visible: false,
    startMenuOption :['New Sprint','New User Story','Copy','Cut','Paste']
    };
    render() {
        return (
        <div ref={ref => {this.root = ref}}>
          <button className="start-menu-button" onClick={this.openStartMenu.bind(this)}
          
          >
          
          Extras
          
        </button>
        </div>
)
      }

      openStartMenu(event){
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);
        
        if (wasOutside && visible) this.setState({ visible: false, });
      }

      onStartButtonRightClick = (event) => {
        console.log('onStartButtonRightClick');
        event.preventDefault();
       // $("#panel").slideDown("slow");
      };
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
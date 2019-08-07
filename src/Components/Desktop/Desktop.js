import React,{Component} from 'react';
import $ from 'jquery';
class Desktop extends Component{

    render() {
        return (<div>
          <button onMouseEnter={this.onEnter} onMouseLeave={this.onLeave} >testing</button>
        </div>)
      }

      onEnter = () => {
        console.log('test btn clicked');
        $("p").slideDown();
      };
      onLeave = () => {
        console.log('test btn clicked');
        $("p").slideUp();
      };
}
export default Desktop;
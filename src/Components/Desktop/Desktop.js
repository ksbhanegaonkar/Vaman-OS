import React,{Component} from 'react';
import $ from 'jquery';
class Desktop extends Component{

    render() {
        return (<div>
          <button onClick={this.arrFunc}>testing</button>
        </div>)
      }

      arrFunc = () => {
        console.log('test btn clicked');
        $("p").slideToggle();
      };
}
export default Desktop;
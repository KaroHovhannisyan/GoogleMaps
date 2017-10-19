/**
 * Created by Karo on 13.10.2017.
 */
import React,{Component,PropTypes} from 'react';
import {Button,Tooltip,OverlayTrigger} from 'react-bootstrap';



export default class Marker extends Component {
   render(){
       const tooltip = (
           <Tooltip id="tooltip">
               <h4>{this.props.title} </h4>
               <img style={{height:'100px',width:'90%'}} src={this.props.imgSrc} />

               <small>{this.props.description}</small><br/>
               <Button bsStyle="info">More Info</Button>
           </Tooltip>
       );

       return(<div className="marker">
           <OverlayTrigger placement="top" overlay={tooltip}>
               <img src="http://www.iconsdb.com/icons/preview/caribbean-blue/map-marker-2-xxl.png" />
           </OverlayTrigger>

       </div>)
   }
}


Marker.propTypes = {
    title:PropTypes.string.isRequired,
    imgSrc:PropTypes.string.isRequired,
    description:PropTypes.string.isRequired
};
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import CircularProgress from 'material-ui/CircularProgress';
var key ='TRELOGHYCT4CW63USW'
var clientSecret = 'IWNZ5AVI4ZVXW3PFKITMBWSJC72FN77HTPSMQKIR7HKWY4T2P7'
var oAuthtoken = 'YZ6KJWVMZEMOEH5CS7YS'
var aninomous = 'TIXNZU7YQN3GI5Y56CMX'
import { connect } from 'react-redux'

const style = {
    width:'100%',
    height:'90%',
    left:0,
    right:0,
    top:54,
    position:'absolute'

}

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            center:{
                lat:40.177200,
                lng:44.503490
            },
            zoom:11
        }
    }

    render() {

        if(!this.props.EventsList || !this.props.coordinates||this.props.isLoading){return(<CircularProgress style={{marginLeft:'40%',marginTop:'150px'}} size={200} thickness={5} />)}

               const events = this.props.EventsList.map(place => {
                       const {name, description, venue, logo,id} = place;
                             if(description.name) {
                                  var dsc = description.text.slice(0, 150) + "...";
                                                  }
                                    return (
                                              <Marker
                                                    key = {id}
                                                    title={name.text}
                                                    description={dsc||name.text}
                                                    imgSrc={logo?logo.original.url:'https://news.uaf.edu/wp-content/uploads/2011/08/events-icon.jpg'}
                                                    lat={venue.address.latitude}
                                                    lng={venue.address.longitude}
                                               />
                                            );
        });
        return (
            <GoogleMapReact
                center={this.props.coordinates}
                defaultZoom={this.state.zoom}
                style = {style}
            >
                {events}
            </GoogleMapReact>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        EventsList: state.events.eventsList,
        isLoading:state.events.isLoading,
        coordinates:{
            lng:state.events.city ?parseFloat(state.events.city.longitude) : 40.177200,
            lat:state.events.city ? parseFloat(state.events.city.latitude ): 44.503490
        }
    }
};



export default connect(mapStateToProps)(Map)
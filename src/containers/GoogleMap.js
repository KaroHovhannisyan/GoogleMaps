/**
 * Created by Karo on 05.10.2017.
 */
import React ,{Component} from 'react';
import Navbar from '../components/NavBar';
import Map from '../components/Map'




class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentWillMount(){

    }


    close() {


    }

    open() {

    }

    render(){
        return(
            <div>
                <Navbar />
                <Map />
            </div>

    );
    }



    }


    export default GoogleMap
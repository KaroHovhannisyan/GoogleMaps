/**
 * Created by Karo on 05.10.2017.
 */

import React, { Component } from 'react'
import RaisedButton  from 'material-ui/RaisedButton'
import {withRouter} from 'react-router-dom';

class HomePage extends Component {


    login(){
        this.props.history.replace('/login');
    }
    register(){
        this.props.history.replace('/register')
    }

    componentWillMount(){
        var token = localStorage.getItem('access_token');
        var LoggedIn =localStorage.getItem('isLoggedIn');
        if( token && LoggedIn ){
            this.props.history.replace('./map');
        }
    }
    componentDidMount(){

    }

    render() {
        return(
            <div className = "welcome">
                <img src="https://www.dwrl.utexas.edu/wp-content/uploads/2016/11/google-maps-new-interface1.jpg" />
                <div className="auth">
                    <h1>Welcome !!!! </h1>
                    <br/>
                    <br/>
                    <RaisedButton  label="Login" primary={true} onClick ={this.login.bind(this)}  />
                    <RaisedButton  label="Register" secondary={true}  style = {{marginLeft:5}} onClick = {::this.register} />
                    <br/>
                </div>

            </div>
        )
    }
}

export default HomePage


/**
 * Created by Karo on 11.10.2017.
 */
import React, {Component} from 'react';
import HomePage from '../components/HomePage';
import { Switch,Route,withRouter ,Redirect} from 'react-router-dom'
import GoogleMap from './GoogleMap'
import Login from './Login';
import Notfound from '../components/Notfound'
import RegisterForm from './RegisterForm'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import {connect } from 'react-redux'

class App extends Component{

    auth(){
            var  isLoggedIn= JSON.parse(localStorage.getItem('isLoggedIn'));
            //   var access_token = JSON.parse(localStorage.getItem('access_token'));
            if(isLoggedIn){
                return <GoogleMap/>
            }
            return  <Login/>
        }

    render(){
        return(
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
              <Switch>
                <Route exact path = '/' component={HomePage} />
                <Route path = '/login' component={Login} />
                <Route path = '/register' component={RegisterForm} />
                  <Route path="/map" render ={this.auth} />
                  <Route path="*" component={Notfound}/>
              </Switch>
            </MuiThemeProvider>
        )
    }

    componentWillUnmount(){
        localStorage.setItem('isLoggedIn',false)
}

}

export default App



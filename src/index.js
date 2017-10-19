import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import './styles/app.css';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App'
import configureStore from './store/configureStore'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const store = configureStore()







render(
    <Provider store={store} >
       <BrowserRouter>
           <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <App/>
           </MuiThemeProvider>
       </BrowserRouter>
    </Provider>,
  document.getElementById('root')
)


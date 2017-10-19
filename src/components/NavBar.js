/**
 * Created by Karo on 13.10.2017.
 */
/**
 * Created by Karo on 05.10.2017.
 */
import React ,{Component} from 'react';
import {Navbar,Nav,NavDropdown,MenuItem,FormGroup,Button
} from 'react-bootstrap';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar';
import Settings from 'material-ui/svg-icons/action/build';
import Help from 'material-ui/svg-icons/action/help';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import AutoComplete from 'material-ui/AutoComplete'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [
                'Yerevan', 'Gyumri', 'Moscow', 'Amsterdam', "Losangelos", "Berlin", "Kiev", 'Rome', "Chicago", "Dubai", "Paris", 'Jinan', "Minsk",
                "Patna", "Hamburg", "Dakar", "Tunis"],
            search: ''
        }
    }

    search(search) {
        this.setState({search: search});
    }
    exit(){
        this.props.onExit();
        this.props.history.replace('./');

    }
    dispatch() {
        if(this.state.search){
        this.props.onSearch(this.state.search)}
    }

    componentWillMount(){
        this.props.onSearch('Yerevan');
        this.props.onAuthenticate();


    }

    render() {
        const city = `Events in ${this.props.city}`;

            return (
                <div>
                    <Navbar defult collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand className="NavBarHeader">
                                {city}
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>

                            <Navbar.Form pullLeft>
                                <FormGroup>
                                    <AutoComplete
                                        style={{marginLeft: '50px'}}
                                        hintText="Search.."
                                        dataSource={this.state.cities}
                                        onUpdateInput={::this.search}

                                    />
                                </FormGroup>
                                {' '}
                                <Button onClick={::this.dispatch} id="search" type="submit"
                                        bsStyle="info">Search</Button>
                            </Navbar.Form>
                            <Nav pullRight>
                                <NavDropdown eventKey={5} title="My Page" id="basic-nav-dropdown">
                                    <MenuItem eventKey={5.1}>
                                        <List>
                                            <ListItem
                                                disabled={false}
                                                leftAvatar={<Avatar size={40}>{this.props.username[0]}</Avatar>}> {this.props.username}
                                            </ListItem>
                                            <Divider />
                                            <ListItem primaryText="Settings" leftIcon={<Settings />}/>
                                            <ListItem primaryText="Help" leftIcon={<Help />}/>
                                            <ListItem onClick = {::this.exit} primaryText="Exit" leftIcon={<Exit />}/>
                                        </List>
                                    </MenuItem>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>

            );



    }
}

function mapStateToProps(state){
    return {
            city: state.events.city.address,
            username:state.login.userName
        }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (s) => {
            dispatch({
                type: 'EVENTS_FETCH_REQUESTED',
                payload: {
                    cityName: s
                }
            })
        },
        onAuthenticate: () => {
            dispatch({
                type: 'AUTHENTICATE_REQUEST',
                payload: {

                }
            })
        },
        onExit:() =>{
            dispatch({
                type:'EXIT_REQUEST'
            })
        }
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavBar))
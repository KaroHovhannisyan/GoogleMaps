import React from 'react'
import {Button,
        Modal,
        Form ,
        FormGroup,
        ControlLabel,
        Col,
        FormControl,
        Checkbox,
        HelpBlock
} from 'react-bootstrap'
import HomePage from '../components/HomePage'
import {withRouter } from 'react-router-dom';
import {connect } from 'react-redux'

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError:null,
            passwordError:null,
            isLoading: false,
            info : ''
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.done){
            this.props.history.replace('/map')
        }
    }

    close() {
        this.props.history.replace('/')
    }

    mailValidator(e)   {
        var email=e.target.value;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)) {
            this.setState ({email: email,
                emailError:'sucess',isLoading:false,
                info:''});
        }else {this.setState ({emailError:'error',isLoading:true})}
    }

    password(e){
        var password =  e.target.value;
        if(password.length < 6){
            this.setState({passwordError:'error',isLoading:true});
        }
        else
            this.setState({password:password,
                passwordError:'sucess',isLoading:false,info:''});
    }

    handleClick() {
        var user = {
            email:this.state.email,
            password:this.state.password,
        }
        this.props.onLogin(user)
    }

    render() {
        let isLoading = this.state.isLoading;
        return (
            <div>
                <HomePage />
            <Modal show={true} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    {
                    this.props.err ? <Modal.Title style={{color: 'red'}}>Wrong username or password!!</Modal.Title> :
                        <Modal.Title  >Login</Modal.Title>
                     }
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup  validationState = {this.state.emailError} controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10}>
                                <FormControl onBlur = {this.mailValidator.bind(this)} type="email" placeholder="Enter Email" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword" validationState = {this.state.passwordError}>
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" onBlur = {this.password.bind(this)} placeholder="Enter Password"  />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Checkbox>Remember</Checkbox>
                            </Col>
                        </FormGroup>
                        <HelpBlock bsStyle = "danger">{this.state.info}</HelpBlock>
                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button
                                    type = 'button'
                                    bsStyle="primary"
                                    disabled={isLoading}
                                    onClick={!isLoading ? this.handleClick.bind(this) : null}>
                                    {isLoading ? 'Loading ...' : 'Login '}
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (user) => {
            dispatch({
                type: 'LOGIN_USER_REQUEST',
                payload: {
                    email:user.email,
                    password:user.password
                }
            })
        }
    }
}
const mapStateToProps = (state) => {
    return {
        done:state.login.done,
        err:state.login.error
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
import React from 'react'
import {Button,
    Modal,
    Form ,FormGroup,ControlLabel,Col,FormControl,HelpBlock
} from 'react-bootstrap'

import HomePage from '../components/HomePage'

import {connect } from 'react-redux'
import { withRouter } from 'react-router-dom'





class RegisterForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            password2:'',
            userName:'',
            userNameError:null,
            emailError:null,
            passwordError:null,
            passwordMatchError:null,
            isLoading: true,
            register:false,
            info : ''
        }
    }


    componentWillReceiveProps(nextProps,nextState){
        if(nextProps.done){
            this.props.history.replace('/map');
        }
    }


    close() {this.props.history.replace('/');}

    mailValidator(e)   {
        var email=e.target.value;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)) {
            this.setState ({email: email,
                emailError:'sucess',isLoading:false,
                info:''});
        }else {this.setState ({emailError:'error'})}
    }

    setUserName(e){
        var nickName = e.target.value ;
        console.log(nickName)
        if (nickName.length >5 ){
            this.setState({userName:nickName,
                           userNameError:null})
        } else {
            this.setState({userNameError:'error'
                           })
        }

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

    passwordMatch(e){
        if(e.target.value === this.state.password) {
            this.setState({
                passwordMatchError: null,
                password2: e.target.value
            });
        }
            else {
                this.setState({passwordMatchError:'error'})
            }
        }


    handleClick(){
        var user = {
            email:this.state.email,
            password:this.state.password,
            username:this.state.userName
        }
       this.props.onRegister(user);
    }

    render() {
        let { isLoading, register } = this.state;
        return (
            <div>
                < HomePage />
            <Modal show={true} onHide={this.close.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title >Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup  validationState = {this.state.emailError} controlId="formBasicText">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    onBlur = {this.mailValidator.bind(this)}
                                    type="email"
                                    placeholder="Enter Email "
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup  validationState = {this.state.userNameError} controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                UserName
                            </Col>
                            <Col sm={10}>
                                <FormControl  type="text" placeholder="Choose Username" onChange = {::this.setUserName} />
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

                        <FormGroup controlId="formHorizontalPassword" validationState = {this.state.passwordMatchError}>
                            <Col componentClass={ControlLabel} sm={2}>
                                Password again
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" onBlur = {::this.passwordMatch} placeholder="Enter Password again"  />
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
                                    {register ? 'Registering ...' : 'Register '}
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
        onRegister: (user) => {
            dispatch({
                type: 'REGISTER_USER_REQUEST',
                payload: {
                    email:user.email,
                    password:user.password,
                    username:user.username
                }
            })
        }
    }
}
const mapStateToProps = (state) => {
    return {
        done:state.login.done
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(RegisterForm));
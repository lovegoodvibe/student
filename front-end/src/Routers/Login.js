import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from "axios";
import _ from "lodash";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from "../history";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            password: '',
            email: '',
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/api/student/`)
            .then(res => {
                const persons = res.data;
                this.setState({persons});
            })
            .catch(error => console.log(error))
    }

    handleChange = (e, data) => {
        const {name, value} = data;
        this.setState({
            [name]: value
        })
    }
    logIn = () => {
        const {persons, email, name} = this.state;
        const find = _.find(persons, function (r) {
            return r.name === name && r.email === email;
        });
        if (find) {
            history.push("/main");
            history.go(0);
            //history.back();
        } else {
            toast.error(`tai khoan voi email: ${email} khong co tren he thong`, {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    }

    render() {
        const {email, password} = this.state
        return (
            <div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            label={<label>{"email"}<span>*</span></label>}
                            placeholder='email'
                            name={"email"}
                            value={email}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            type={'password'}
                            label={<label>{"password"}<span>*</span></label>}
                            placeholder='password'
                            name={"password"}
                            value={password}
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Button type='submit' onClick={this.logIn}>Submit</Button>
                </Form>
                <ToastContainer/>
            </div>
        )
    }
}

export default Login;
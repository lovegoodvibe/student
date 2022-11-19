import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import {Link} from "react-router-dom";
import axios from "axios";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons:[],
            name: '',
            email:'',
            check: '/'
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/api/student/`)
            .then(res => {
                console.log(res.data)
                const persons = res.data;
                this.setState({ persons });
            })
            .catch(error => console.log(error));
    }
    handleChange = (e, data) => {
        const {name, value} = data;
        this.setState( {
            [name]: value
        })
    }
    logIn = () => {
        this.state.persons && this.state.persons.map((item,) => {
            if(this.state.email === item.email && this.state.name === item.name){
                this.setState({check:'/main'})
            }
        })
    }

    render() {
        const { email, name } = this.state
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
                            label={<label>{"name"}<span>*</span></label>}
                            placeholder='name'
                            name={"name"}
                            value={name}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Link to ={this.state.check} >
                    <Button type='submit' onClick={this.logIn}>Submit</Button>
                    </Link>
                </Form>
            </div>
        )
    }
}

export default Login;
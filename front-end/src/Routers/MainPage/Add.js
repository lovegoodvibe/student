import React, {Component} from 'react'
import {Button, Icon, Modal, Form} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import axios from "axios";
class Add extends Component {
    //const [open, setOpen] = React.useState(false)
    constructor(props) {
        super(props);
        this.state = {
            setOpen: false,
            name: '',
            age: 0,
            email: '',
            classId: 0,
            address: '',
            score: 0,
            description: ''
        }
    }
    handleChange = (e, data) => {
        const {name, value} = data;
        this.setState( {
            [name]: value
        })
    }
    createUser = async () => {
        let {name, age, email, classId, address, score, description} = this.state
        await axios.post(`http://localhost:3001/api/student/insert`,{name, age, email, classId, address, score, description})
            .then(res => {
                alert(res.data)
            })
            .catch(error => console.log(error));
        this.setState({setOpen:false})
    }
    render() {
        let {name, age, email, classId, address, score, description} = this.state
        return (
            <Modal
                //onClose={() => this.setState({setOpen:false})}
                onOpen={() => this.setState({setOpen:true})}
                open={this.state.setOpen}
                trigger={<Button
                    floated='right'
                    icon
                    labelPosition='left'
                    primary
                    size='small'><Icon name='user'/>Add User</Button>}
            >
                <Modal.Header>Select a Photo</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
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
                                    label={<label>{"age"}<span>*</span></label>}
                                    placeholder='age'
                                    name={"age"}
                                    value={age}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label={<label>{"classId"}<span>*</span></label>}
                                    placeholder='classId'
                                    name={"classId"}
                                    value={classId}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label={<label>{"address"}<span>*</span></label>}
                                    placeholder='address'
                                    name={"address"}
                                    value={address}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label={<label>{"score"}<span>*</span></label>}
                                    placeholder='score'
                                    name={"score"}
                                    value={score}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.TextArea
                                label='About'
                                placeholder='Tell us more about you...'
                                name={"description"}
                                value={description}
                                onChange={this.handleChange}
                            />
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => this.setState({setOpen:false})}>
                        Cancel
                    </Button>
                    <Button
                        content="Submit"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={this.createUser}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}
export default Add;
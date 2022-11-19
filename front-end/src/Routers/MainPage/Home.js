import React, {Component} from "react";
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react';
import axios from "axios";
import Add from "./Add";
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            persons:[]
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/api/student/`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Table compact celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Class</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.persons && this.state.persons.map((item,) => {
                           return(
                               <Table.Row>
                                   <Table.Cell collapsing>
                                       <Checkbox slider />
                                   </Table.Cell>
                                   <Table.Cell>{item.name}</Table.Cell>
                                   <Table.Cell>{item.email}</Table.Cell>
                                   <Table.Cell>{item.age}</Table.Cell>
                                   <Table.Cell>{item.address}</Table.Cell>
                                   <Table.Cell>{item.classId}</Table.Cell>
                                   <Table.Cell>{item.score}</Table.Cell>
                               </Table.Row>
                           )
                        })}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='6'>
                                <Add></Add>
                                <Button size='small'>Approve</Button>
                                <Button disabled size='small'>
                                    Approve All
                                </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}
export default Home;
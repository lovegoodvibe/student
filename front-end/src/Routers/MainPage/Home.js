import React, {Component} from "react";
import { Button, Table } from 'semantic-ui-react';
import axios from "axios";
import Add from "./Add";
import Edit from "./Edit";
import _ from 'lodash'
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            tbl: []
        }
    }
    componentDidMount()  {
        axios.get(`http://localhost:3001/api/student/`)
            .then(res => {
                const persons = res.data;
                this.setState({ persons });
            })
            .catch(error => console.log(error));
        axios.get(`http://localhost:3001/api/class/`)
            .then(res => {
                const tbl_class = res.data;
                this.setState({tbl_class});
            })
            .catch(error => console.log(error));
    }
    onDelete = (e,id) => {
        console.log(this.state.persons)
        axios.delete(`http://localhost:3001/api/student/delete`, {data: {id: id}} )
            .then(res => {
                console.log(res.data);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Table compact celled definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell/>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Age</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Class</Table.HeaderCell>
                            <Table.HeaderCell>Score</Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.persons && this.state.persons.map((item,) => {
                            const className = _.find(this.state.tbl_class, function(o) {
                                return o.classId === item.classId; }).className
                           return(
                               <Table.Row>
                                   <Table.Cell/>
                                   <Table.Cell>{item.name}</Table.Cell>
                                   <Table.Cell>{item.email}</Table.Cell>
                                   <Table.Cell>{item.age}</Table.Cell>
                                   <Table.Cell>{item.address}</Table.Cell>
                                   <Table.Cell>{className}</Table.Cell>
                                   <Table.Cell>{item.score}</Table.Cell>
                                   <Table.Cell>
                                       <Edit students={item} _class={this.state.tbl_class}/>
                                       <Button  onClick={(e) =>{this.onDelete(e,item.id)}}>Delete</Button>
                                   </Table.Cell>
                               </Table.Row>
                           )
                        })}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell colSpan='7'>
                                <Add></Add>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}
export default Home;
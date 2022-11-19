import '../App.css';
import {Component} from "react";
import {Link} from "react-router-dom";
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
export default class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeItem: ''
        }
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        return(
            <div>
                <Menu>
                    <Menu.Item
                        name='editorials'
                        active={this.activeItem === 'editorials'}
                        content='Editorials'
                        onClick={this.handleItemClick}
                    ><Link to='/main/home'>Home</Link></Menu.Item>

                    <Menu.Item
                        name='reviews'
                        active={this.activeItem === 'reviews'}
                        content='Reviews'
                        onClick={this.handleItemClick}
                    ><Link to='/main/student'>Student</Link></Menu.Item>

                    <Menu.Item
                        name='upcomingEvents'
                        active={this.activeItem === 'upcomingEvents'}
                        content='Upcoming Events'
                        onClick={this.handleItemClick}

                    ><Link to='/main/class'>Class</Link></Menu.Item>
                    <Menu.Item
                        name='upcomingEvents'
                        active={this.activeItem === 'upcomingEvents'}
                        content='Upcoming Events'
                        onClick={this.handleItemClick}

                    ><Link to='/main/point'>Point</Link></Menu.Item>
                </Menu>
            </div>
        )
    }

}
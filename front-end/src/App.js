import './App.css';
import {Component} from "react";
import {Route, Routes} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import MainPage from "./Routers/MainPage";
import Login from "./Routers/Login";
import Home from "./Routers/MainPage/Home";
import Class from "./Routers/MainPage/Class";
import Student from "./Routers/MainPage/Student";
import Point from "./Routers/MainPage/Point";
export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeItem: ''
        }
    }

    render() {
        return(
            <div>
                <hr/>
                <Routes>
                    <Route path='/main' element={<MainPage/>}/>
                    <Route path='/main/home' element={<Home/>}/>
                    <Route path='/main/class' element={<Class/>}/>
                    <Route path='/main/student' element={<Student/>}/>
                    <Route path='/main/point' element={<Point/>}/>
                    <Route path='/' element={<Login/>}/>
                </Routes>
            </div>
        )
    }

}

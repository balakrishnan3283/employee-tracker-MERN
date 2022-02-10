import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ViewExercise extends Component {

    constructor(props){
        super();
        this.state = {
            username: "",
            description: "",
            duration: 0,
            date: new Date(),
            completed: false,
            users: []
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date),
                    completed: res.data.completed
                })
            })
            .catch(function (error){
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({ 
                        users: response.data.map(user => user.username)
                    });
                }
            })
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value})
    }
    onChangeDescription(e) {
        this.setState({ description: e.target.value})
    }
    onChangeDuration(e) {
        this.setState({ duration: e.target.value})
    }
    onChangeDate(date) {
        this.setState({ date: date})
    }
    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
            completed: this.state.completed
        }

        console.log(exercise);

        axios.post('http://localhost:5000/exercises/update/'+this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = "/";
    }
    
    render() { 
        return ( 
            <div className="container">
                <h3>View Info</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input
                            type="text" required
                            className="form-control"
                            value={this.state.username}                            
                            disabled
                        />

                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text" required
                            className="form-control"
                            value={this.state.description}                            
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration(in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value=" Back" className="btn btn-primary" />
                    </div>
                </form>
            </div>
         );
    }
}
 
export default ViewExercise;
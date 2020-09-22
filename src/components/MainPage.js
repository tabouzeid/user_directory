import React from "react";

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    state = {
        filterString: "",
        employees: []
    }

    componentDidMount(){
        fetch('https://randomuser.me/api/?results=100')
        .then(response => response.json())
        .then((data) => {
            this.setState({employees: data.results})
        });
    }
    
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Employee Directory</h1>
                        <input type="text" onChange={this.handleTextInput}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Cell Number</th>
                                    <th scope="col">Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.employees
                                .filter((employee) => {
                                    if(this.state.filterString.length){
                                        return (employee.name.first.toLowerCase() + " " + employee.name.last.toLowerCase()).includes(this.state.filterString.toLowerCase());
                                    } else {
                                        return true;
                                    }
                                })
                                .map((employee) => {
                                    return (<tr key={employee.email}> 
                                        <td><img src={employee.picture.thumbnail} alt="employee"/></td>
                                        <td>{employee.name.first}</td>
                                        <td>{employee.name.last}</td>
                                        <td>{employee.location.street.number + " " + employee.location.street.name + ", " + employee.location.city + ", " + employee.location.state + ", " + employee.location.postcode}</td>
                                        <td>{employee.cell}</td>
                                        <td>{employee.dob.age}</td>
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    handleTextInput(event){
        this.setState({filterString: event.target.value});
    }
}

export default MainPage;
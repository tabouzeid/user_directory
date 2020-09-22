import React from "react";

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.handleTextInput = this.handleTextInput.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    state = {
        filterString: "",
        employees: []
    }

    componentDidMount(){
        fetch('https://randomuser.me/api/?results=100')
        .then(response => response.json())
        .then((data) => {
            data.results.forEach(element => {
                element.address = element.location.street.number + " " + element.location.street.name + ", " + element.location.city + ", " + element.location.state + ", " + element.location.postcode;
            });
            this.setState({employees: data.results})
        });
    }
    
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 className="text-center m-5">Employee Directory</h1>
                        <input className="form-control input-md m-3" type="text" placeholder="Filter by name" onChange={this.handleTextInput}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th fieldname="name.first" onClick={this.handleOnClick} scope="col">First</th>
                                    <th fieldname="name.last" onClick={this.handleOnClick} scope="col">Last</th>
                                    <th fieldname="address" onClick={this.handleOnClick}scope="col">Address</th>
                                    <th fieldname="cell" onClick={this.handleOnClick} scope="col">Cell Number</th>
                                    <th fieldname="dob.age" onClick={this.handleOnClick} scope="col">Age</th>
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
                                        <td>{employee.address}</td>
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

    handleOnClick(event) {
        let fieldName = event.target.getAttribute('fieldname');
        let properties = Array.isArray(fieldName) ? fieldName : fieldName.split(".")
    
        let tmp = [].concat(this.state.employees);
        tmp = tmp.sort((a,b) => {
            let aVal = properties.reduce((prev, curr) => prev && prev[curr], a);
            let bVal = properties.reduce((prev, curr) => prev && prev[curr], b);
            if(aVal < bVal) { return -1; }
            if(aVal > bVal) { return 1; }
            return 0;
        });
        this.setState({employees: tmp});
    }
}

export default MainPage;
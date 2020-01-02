import React from 'react';
import axios from 'axios';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import AddForm from './AddForm.js';
import ListItem from './ListItem.js';


let List =({members, updateMembers}) => (
  <tbody>
  {
    members.map((member,i) => <ListItem updateMembers={updateMembers} member={member} members={members} key={i} count={i}/>)
  }
  </tbody>
)

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      showModalAdd: false,
      membersList: [],
      changes: 0
    }
  }

  getForm = (e) => { 
    e.preventDefault();
    let dateNow = new Date(Date.now());
    let tempDate = new Date(Date.now());
    let months = e.target.elements['membershiplength'].value;
    let dateEnd = new Date(tempDate.setMonth(tempDate.getMonth()+Number(months)));
    let newMember = {
      name: e.target.name.value.trim(),
      surname: e.target.surname.value.trim(),
      option: e.target.option.value,
      birthday: e.target.birthday.value,
      startDate: dateNow.toJSON().substring(0,10),
      endDate: dateEnd.toJSON().substring(0,10)
    }
    // console.log(newMember);
    axios.post('https://gym-control-panel.herokuapp.com/add', newMember)
      .then(res => {
          this.setState({membersList: [...this.state.membersList, newMember], changes: this.state.changes+1})
          console.log(res.data);
        
      })
  }

  updateMembers = () => {
        this.setState({changes: this.state.changes+1})
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.changes !== this.state.changes){
      axios.get("https://gym-control-panel.herokuapp.com/")
      .then(res => {
        this.setState({membersList: res.data})
      })
      .catch(err => console.log(err)) 
    }
  }

  componentDidMount() {
    axios.get("https://gym-control-panel.herokuapp.com/")
      .then(res => {
        this.setState({membersList: res.data})
      })
      .catch(err => console.log(err))
  }

  render(){

    return (
      <div className="container-custom">
        <AddForm 
        state={this.state.showModalAdd} 
        onSub={(e) => {
          this.getForm(e); 
          this.setState({showModalAdd: false});
          }} 
        onHid={() => this.setState({showModalAdd: false})}
        />
        <div className="row m-1">
          <div className="w-100 btn bg-warning font-weight-bold" >
            GYM MEMBERSHIP MANAGMENT PLATFORM
          </div>
          <button className="w-100 col btn btn-success" onClick={() => this.setState({showModalAdd: true})}>ADD NEW MEMBER</button>
        </div>
        <div className="row">
          <div className="col overflow-auto h-100">
              <table className="table table-sm table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Option</th>
                    <th scope="col">Birthday</th>
                    <th scope="col">Membership start</th>
                    <th scope="col">Membership end</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                {
                this.state.membersList.length ? <List updateMembers={() => this.updateMembers()} members={this.state.membersList}/> : <div>Loading</div>
                }
                
              </table>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;

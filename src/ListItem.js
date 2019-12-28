import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';

  class ListItem extends React.Component {
    constructor(props){
      super(props);


      this.state = {
        showModalManage: false,
        confirmDelete: false
      }

      
    }

    extendMembership(e) {
      document.getElementById("memberExtend").value = e.target.value;
    }

    render() {
      return(
        <tr id={this.props.count+1}>
          <th scope="row">{this.props.count+1}</th>
          <td>{this.props.member.name}</td>
          <td>{this.props.member.surname}</td>
          <td>{this.props.member.option}</td>
          <td>{this.props.member.birthday.substring(0,10)}</td>
          <td>{this.props.member.startDate.substring(0,10)}</td>
          <td>{this.props.member.endDate.substring(0,10)}</td>
          <td><button className="btn btn-outline-success w-100 font-weight-bold" onClick={() => {
            this.setState({showModalManage: true})
            // console.log(this.state.member);

            }}>MANAGE</button></td>
          <Modal animation={false} show={this.state.showModalManage} onHide={() => this.setState({showModalManage: false})}>
            <Modal.Header closeButton>
              <Modal.Title>Manage membership</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col">
                  Name: {this.props.member.name}
                </div>
                <div className="col">
                  Surname: {this.props.member.surname}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Option: {this.props.member.option}
                </div>
                <div className="col">
                  Birthday: {this.props.member.birthday.substring(0,10)}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  Membership started: <br></br>{this.props.member.startDate.substring(0,10)}
                </div>
                <div className="col">
                  Membership ends: <br></br>{this.props.member.endDate.substring(0,10)}
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col border border-primary rounded p-1 mx-2">
                    <div className="btn btn-sm bg-warning w-100">Extend membership by:</div>
                    <div className="input-group m-1 pr-2">
                      <div className="input-group-prepend" id="button-addon3">
                        <button className="btn btn-sm btn-info" type="button" value="1" onClick={(e) => this.extendMembership(e)}>1</button>
                        <button className="btn btn-sm btn-info" type="button" value="3" onClick={(e) => this.extendMembership(e)}>3</button>
                        <button className="btn btn-sm btn-info" type="button" value="6" onClick={(e) => this.extendMembership(e)}>6</button>
                        <button className="btn btn-sm btn-info" type="button" value="12" onClick={(e) => this.extendMembership(e)}>12</button>
                      </div>
                      <input type="number" id="memberExtend" className="form-control" placeholder="months..."/>
                    </div>

                </div>
                <div className="col border border-primary rounded p-1 mx-2">
                <div className="btn btn-sm bg-warning w-100">Change option:</div>
                <form id="newOption" className="col form-group">
                  <div className="custom-control custom-radio custom-control-inline">
                    <input id="basic" type="radio" name="memberOption"  className="custom-control-input" value="Basic"></input>
                    <label className="custom-control-label" htmlFor="basic">Basic</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input id="advanced" type="radio" name="memberOption" className="custom-control-input" value="Advanced" ></input>
                    <label className="custom-control-label" htmlFor="advanced">Advanced</label>
                  </div>
                  <div className="custom-control custom-radio custom-control-inline">
                    <input id="premium" type="radio" name="memberOption" className="custom-control-input" value="Premium"></input>
                    <label className="custom-control-label" htmlFor="premium">Premium</label>
                  </div>
                </form>
                </div>
              </div>
              <hr></hr>
              <div className="row">
                <div className="col text-left">
                    <Button id="deleteButton" variant="danger" onClick={() => {
                      if(!this.state.confirmDelete) {
                        this.setState({confirmDelete: true});
                        document.getElementById("deleteButton").childNodes[0].textContent = 'Marked for deletion';
                      }
                      else {
                        this.setState({confirmDelete: false});
                        document.getElementById("deleteButton").childNodes[0].textContent = 'Delete Member';
                      }
                          
                    }}>
                      Delete Member
                    </Button>
                </div>
                <div className="col text-right">
                    <Button variant="secondary" onClick={() => this.setState({showModalManage: false, confirmDelete: false})}>
                      Cancel
                    </Button>
                    <Button variant="success" form="newMemberForm" onClick={() => {
                      if(this.state.confirmDelete) {
                        axios.delete("https://gym-control-panel.herokuapp.com/"+this.props.member._id)
                        .then(res => {
                          console.log(res.data);
                          this.props.updateMembers();
                          this.setState({showModalManage: false, confirmDelete: false})
                        })
                      }
                      else {
                        let newOption = document.getElementById("newOption").elements["memberOption"].value; 
                        let months = document.getElementById("memberExtend").value;
                        let oldEnd = new Date(this.props.member.endDate);
                        let newEnd = new Date(oldEnd.setMonth(oldEnd.getMonth()+Number(months)))
                        let updatedData = {
                          newDate: newEnd.toJSON().substring(0,10) || this.props.member.endDate,
                          option: newOption || this.props.member.option
                        }
                        // console.log(updatedData);
                        axios.post("https://gym-control-panel.herokuapp.com/"+this.props.member._id, updatedData)
                          .then(res => {
                            console.log(res.data);
                            document.getElementById(this.props.count+1).classList.remove("memberRowChange")
                            void document.getElementById(this.props.count+1).offsetWidth;
                            document.getElementById(this.props.count+1).classList.add("memberRowChange");
                            this.props.updateMembers();
                            this.setState({showModalManage: false, confirmDelete: false})
                          })
                      }
                    }}>
                      Save changes
                    </Button>
                </div>
              </div>
              
            </Modal.Body>
            
        </Modal>
    </tr>
      )
    }
  }

  export default ListItem;
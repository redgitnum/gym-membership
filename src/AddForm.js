import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Modal} from 'react-bootstrap';

let AddForm = ({state, onSub, onHid}) => (
    <Modal show={state} onHide={onHid} animation={false}>
    <Modal.Header closeButton>
      <Modal.Title>Add new member</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form id="newMemberForm" onSubmit={onSub}>
        <div className="row">
          <div className="col">
            <label htmlFor="name">Name: </label>
            <input className="form-control" id="name" type="text" required onChange={(e) => {
              if(e.target.value === " ") {
                e.target.value = '';
              }
            }}></input>
          </div>
          <div className="col">
            <label htmlFor="surname">Surname: </label>
            <input className="form-control" id="surname" type="text" required onChange={(e) => {
              if(e.target.value === " ") {
                e.target.value = '';
              }
            }}></input>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col">
            <label htmlFor="option">Option: </label><br></br>
            <select className="custom-select" id="option">
              <option value="Basic">Basic</option>
              <option value="Advanced">Advanced</option>
              <option value="Premium">Premium</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="birthday">Birthday: </label><br></br>
            <input className="form-control" id="birthday" type="date" defaultValue="1970-01-01" min="1900-01-01" max="2014-01-01"></input>
          </div>
        </div>
        <hr></hr>
        <div className="row">
          <div className="col form-group text-center">
            <legend>Membership length</legend>
              <div className="custom-control custom-radio custom-control-inline">
                <input id="length1" type="radio" name="membershiplength"  className="custom-control-input" value="1" defaultChecked></input>
                <label className="custom-control-label" htmlFor="length1">1 month</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input id="length3" type="radio" name="membershiplength" className="custom-control-input" value="3" ></input>
                <label className="custom-control-label" htmlFor="length3">3 months</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input id="length6" type="radio" name="membershiplength" className="custom-control-input" value="6"></input>
                <label className="custom-control-label" htmlFor="length6">6 months</label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input id="length12" type="radio" name="membershiplength" className="custom-control-input" value="12"></input>
                <label className="custom-control-label" htmlFor="length12">12 months</label>
              </div>
          </div>
        </div>
      </form>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHid}>
        Cancel
      </Button>
      <Button variant="success" type="submit" form="newMemberForm">
        Add
      </Button>
    </Modal.Footer>
  </Modal>    
);

export default AddForm;
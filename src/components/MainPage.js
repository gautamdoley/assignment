
import React, { Component,useState } from 'react'
import Select from 'react-select'
import { submitPosts } from './../actions';
import { connect,useDispatch } from 'react-redux';
//import { createStructuredSelector } from 'reselect';
import FormInput from './FormInput';
import Button from './Button';
import Picker from "./datepicker";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
 
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
class MainPage extends React.Component {

  state = {
    warranty: {
      custName: "",
      custMobile: "",
      modelPur: "",
      pinCode: "",
      _state: "",
      dateOfInvoice: "",
      batteryNo: "",
      chassisNo: "",
      modelColor: "",
      financeThrough:true
    },
    errors: {},
    selectedOption: null,
    submitted: false
  };
  constructor (props) {
    super(props)
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(date) {
    const { warranty } = this.state;
    this.setState({startDate: date})
    warranty["dateOfInvoice"] = date;
    this.setState({ warranty });
    
  }
  onClick(){

  }
  
  //const [date, setDate] = useState(new Date());
  //const handleDateChange = date => setDate(date);
  //<DatePicker selected={date} onChange={handleDateChange} />
  handleChange = event => {
    const { warranty } = this.state;
    warranty[event.target.name] = event.target.value;
    this.setState({ warranty });
  };
  
  handleColorChange = (selectedOption,event) => {
    const { warranty } = this.state;
    this.setState({ selectedOption });
    warranty[event.name] = selectedOption.value;
    this.setState({ warranty });
  };
  toggleChange = event => {
  const { warranty } = this.state;
      warranty['financeThrough']= !warranty.financeThrough;
     this.setState({ warranty });
  }
  onSubmit = (data) => {
    const {
      warranty: { custName,custMobile,modelPur,pinCode, _state,dateOfInvoice,batteryNo,chassisNo,modelColor,financeThrough}
    } = this.state;
    let err = {};

    if (!custName) {
      err.custName = "Enter customer name!";
    }
    if(!custMobile){
        err.custMobile = "Enter customer Mobile!";
    }
    if(!modelPur){
        err.modelPur = "Enter model number!";
    }
    if(!pinCode){
        err.pinCode = "Pincode is required!";
    }
    if(pinCode.length  !== 6){
        err.pinCode = "Enter valid pincode!";
    }
    
    if(!_state){
        err._state = "Enter State!";
    }
    if(!dateOfInvoice){
        err.dateOfInvoice = "Enter date of Invoice!";
    }
    if(!batteryNo){
        err.batteryNo = "Enter battery No.!";
    }
    if(!chassisNo){
        err.chassisNo = "Enter chassis no.!";
    }
    

    this.setState({ errors: err }, () => {
      if (Object.getOwnPropertyNames(this.state.errors).length === 0) {
        this.setState({ submitted: true });
        this.props.submitPosts(this.state.warranty);      
      }
    
    });
  };

  render() {
  const { posts } = this.props;
    const {
      submitted,
      errors,
      warranty: {
          custName,
          custMobile,
          modelPur,
          pinCode,
          _state,
          dateOfInvoice,
          batteryNo,
          chassisNo,
          modelColor,
         financeThrough
        },
   selectedOption
    } = this.state;
     const options = [
              { value: 'red', label: 'Red' },
              { value: 'blue', label: 'Blue' },
              { value: 'white', label: 'White' },
              { value: 'others', label: 'Others' }
            ]
    return (
      <React.Fragment>
        {submitted ? (
          <p>Hi, {custName}, Your data has been successfully submited!</p>
        ) : (
          <React.Fragment>
            <h2 style={{marginBottom: "50px"}}>WARRANTY REGISTRATION</h2>
            <FormInput
              label="Customer Name *"
              name="custName"
              type="text"
              value={custName}
              onChange={this.handleChange}
              placeholder="Enter name..."
              error={errors.custName}
              required
              className="input"
            />
            <FormInput
              label="Customer Mobile *"
              name="custMobile"
              type="text"
              value={custMobile}
              onChange={this.handleChange}
              placeholder="Enter mobile number..."
              error={errors.custMobile}
              required
              className="input"
            />
            <FormInput
              label="Model Purchased *"
              name="modelPur"
              type="text"
              value={modelPur}
              onChange={this.handleChange}
              placeholder="Enter model number..."
              error={errors.modelPur}
              required
              className="input"
            />
            <FormInput
              label="Pincode *"
              name="pinCode"
              type="number"
              value={pinCode}
              onChange={this.handleChange}
              placeholder="Enter pin code..."
              error={errors.pinCode}
              required
              className="input"
            />
            <FormInput
              label="State *"
              name="_state"
              type="text"
              value={_state}
              onChange={this.handleChange}
              placeholder="Enter state..."
              error={errors._state}
              required
              className="input"
            />
              
            
            <div className="form-group">
            <label style={{display: "flex",fontFamily: "emoji",color: "red",fontWeight: "bold"}}>
            Date of Invoice *</label>
            <DatePicker
              selected={ this.state.startDate }
              onChange={ this.handleDateChange }
              name="dateOfInvoice"
              dateFormat="dd-MM-yyyy"
              value={dateOfInvoice}
            />
          </div>

             <FormInput
              label="Battery No. *"
              name="batteryNo"
              type="number"
              value={batteryNo}
              onChange={this.handleChange}
              placeholder="Enter battery no...."
              error={errors.batteryNo}
              required
              className="input"
            />
             <FormInput
              label="Chassis No. *"
              name="chassisNo"
              type="number"
              value={chassisNo}
              onChange={this.handleChange}
              placeholder="Enter Chassis no..."
              error={errors.chassisNo}
              required
              className="input"
            />
            
            <label style={{display: "block",fontFamily: "emoji", color: "red",fontWeight: "bold",marginBottom: "5px"}}>Model color
            <Select
                placeholder="Select model color..."
                name="modelColor"
                value={selectedOption}
                onChange={this.handleColorChange}
                options={options}
              />
              </label>
             <label style={{display: "block",fontFamily: "emoji", color: "red",fontWeight: "bold"}}>Finance through Bajaj
                <input type="checkbox"
                    style={{marginLeft:"50px"}}
                  defaultChecked={this.state.warranty.financeThrough}
                  onChange={this.toggleChange}
                />
             </label>
              <hr style={{margin: "20px"}}/>
            <Button
              type="submit"
              label="Submit"
              className="button"
              handleClick={this.onSubmit}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({ 
  data: state.warranty
})

const mapDispatchToProps = { submitPosts }

export default connect(mapStateToProps,mapDispatchToProps)(MainPage);

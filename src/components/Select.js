import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
class Select extends Component{
    render(){
        return (
            <Form.Select defaultValue={this.props.defaultValue} aria-label={this.props.aria_lable} onChange={this.props.change}>
                <option></option>
                {Object.keys(this.props.data).map((x,index) => 
                    <option value={x} key={index}>{this.props.data[x]}</option>)}
            </Form.Select>
          );
    }
}

export default Select;
import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import SelectMenu from "./selectMenu";

class Form extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    // We get the property that is changed from target property of the parameter passed
    // Then we can make use that to set the state of the react component
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let err of error.details) errors[err.path[0]] = err.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const input = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(input, schema);

    return error ? error.details[0].message : null;
  };

  renderButton(label) {
    return (
      <button
        type="submit"
        disabled={this.validate()}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelectMenu(name, label) {
    const { errors, items, data } = this.state;
    return (
      <SelectMenu
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        options={items}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;

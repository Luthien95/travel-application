import React from "react";
import { Col } from "react-bootstrap";

class InputField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInputValue: false,
    };

    this.disableInputLabel = this.disableInputLabel.bind(this);
  }

  componentDidMount() {
    if (this.props.defaultValue) {
      this.setState({
        isInputValue: true,
      });
    }
  }

  disableInputLabel = (e) => {
    const inputValue = e.target.value;

    this.setState({
      isInputValue: inputValue.length > 0 ? true : false,
    });
  };

  render() {
    let { inputName, placeholderText, defaultValue, addInputData } = this.props;
    let isInputValue = this.state.isInputValue;

    return (
      <Col md={12} className="p-0">
        <input
          className="new-article__input"
          name={inputName}
          placeholder=""
          onChange={addInputData}
          onBlur={this.disableInputLabel}
          defaultValue={defaultValue ? defaultValue : null}
          required
        />
        {isInputValue === true ? null : (
          <label className="new-article__label">{placeholderText}</label>
        )}
      </Col>
    );
  }
}

export default InputField;

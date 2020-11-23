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

  disableInputLabel = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length > 0) {
      this.setState({
        isInputValue: true,
      });
    } else {
      this.setState({
        isInputValue: false,
      });
    }
  };

  render() {
    let { inputName, placeholderText, addInputData } = this.props;
    let isInputValue = this.state.isInputValue;

    return (
      <Col md={12} className="p-0">
        <input
          className="new-article__input"
          name={inputName}
          placeholder=""
          onChange={addInputData}
          onBlur={this.disableInputLabel}
          required
        />
        {isInputValue == true ? null : (
          <label className="new-article__label">{placeholderText}</label>
        )}
      </Col>
    );
  }
}

export default InputField;

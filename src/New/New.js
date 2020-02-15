import React from 'react';

import './New.css';

/**
 * Resuable component used for adding category and item
 */
class New extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            textValue: '',
            message: ''
        }
    }

    updateTextValue = (event) => {
        event.preventDefault();
        this.setState({
            textValue: event.target.value,
            message: ''
        });
    }

    updateValue = (event) => {
        event.preventDefault();
        const textValue = this.state.textValue;
        let message = '';
        if(textValue === '') {
            message = this.props.message.emptyField
        } else {
            message = '';
        }
        this.setState({
            textValue: '',
            message
        }, () => {
            if(textValue !== '') {
                this.props.getValue(textValue);
            }
        });
    };

    render() {
        return (
            <>
                <div className="new">
                    <input type="text" 
                        placeholder={this.props.placeholder} 
                        className="new-text"
                        style={this.props.style}
                        value={this.state.textValue}
                        maxLength={this.props.maxLength || 50}
                        onChange={this.updateTextValue}
                    />
                    <span 
                        className="new-bttn"
                        onClick={this.updateValue}
                    >+</span>
                </div>
                {this.state.message !== '' && (
                    <div className="new-error">{this.state.message}</div>
                )}
            </>
        );
    }
}

export default New;
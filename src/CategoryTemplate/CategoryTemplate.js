import React from 'react';
import New from '../New/New';
import './CategoryTemplate.css';

/**
 * content = {
 *  name: '',
 *  id: ''
 * }
 */

class CategoryTemplate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
    }

    /**
     * Helps to delete the item. Used the filter method to remove
     * the deleted item from the DS
     */
    deleteItem = (id) => {
        const content = this.props.category.content.filter(content => (
            content.id !== id
        ));
        this.props.category.content = content;
        this.setState({
            message: 'Item successfully deleted.'
        }, () => {
            this.props.updateContent(this.props.category);
        });
    }

    /**
     * Helps to mark the item complete or incomplete
     * Used map to change the value and update it to state
     */
    markCompleted = (id, isChecked) => {
        const content = this.props.category.content.map(content => {
            if(content.id === id) {
                content.isCompleted = isChecked;
            }
            return content;
        });
        this.props.category.content = content;
        this.setState({
            message: isChecked ? 'Item marked complete.' : 'Item marked incomplete.'
        }, () => {
            this.props.updateContent(this.props.category);
        });
    }
    
    /**
     * Helps to render the content
     */
    renderContent = () => (
        <div>
            {this.props.category.content.map( (content) => (
                <div key={content.id} className="cat-item">
                    <input 
                        type="checkbox" 
                        value={content.id} 
                        id={content.id}
                        checked={content.isCompleted}
                        onChange={(event) => {
                            this.markCompleted(content.id, event.target.checked)
                        }}
                    />
                    <label htmlFor={content.id} className={content.isCompleted ? 'strickThrough' : ''}>{content.name}</label>
                    <span onClick={() => {
                        this.deleteItem(content.id);
                    }}>X</span>
                </div>
            ) )}
        </div>
    );

    render() {
        return (
            <React.Fragment>
                {this.state.message !== '' && (
                    <div className="message">
                        <span>{this.state.message}</span>
                        <span className="message-close" onClick={() => {
                            this.setState({
                                message: ''
                            })
                        }}>X</span>
                    </div>
                )}
                <h2>{this.props.category.title}</h2>
                {this.props.category.content.length > 0 ? this.renderContent()
                : (
                    <div>This category is empty.</div>
                )}
                <div className="new-cat-item-bttn">
                    <New 
                        placeholder="New Item" 
                        message={{emptyField: 'Item cannot be empty.'}}
                        style={{
                            width: '200px'
                        }}
                        getValue={(value) => {
                            const id = Math.max(this.props.category.content.map(content => content.id)) + 1;
                            this.props.category.content.push({
                                id,
                                name: value
                            });
                            this.setState({
                                message: 'Item added successfully',
                                isAdded: true
                            }, () => {
                                this.props.updateContent(this.props.category);
                            })
                        }}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default CategoryTemplate;
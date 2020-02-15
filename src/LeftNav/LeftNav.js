import React from 'react';

import './LeftNav.css';

import { NavLink } from 'react-router-dom';
import New from '../New/New';

class LeftNav extends React.Component {

    /**
     * Renders the navigation based on the category
     */
    renderNav = () => (
        this.props.categories.map( (category, index) => (
            <li key={`${category}-${index}`}>
                <NavLink 
                    to={category.url}
                    activeStyle={{
                        color: '#f50606',
                        backgroundColor: 'yellow'
                    }}
                >{category.title}</NavLink>
            </li>
        ) )
    );

    render() {
        return (
            <div className="left-nav">
                <ul>
                    {this.renderNav()}
                </ul>
                <New 
                    placeholder="New Category" 
                    message={{emptyField: 'Category cannot be empty.'}}
                    maxLength={10}
                    getValue={(value) => {
                        this.props.updateCategory(value);
                    }}
                />
            </div>
        );
    }
}

export default LeftNav;
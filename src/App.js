import React from 'react';
import './App.css';
import LeftNav from './LeftNav/LeftNav';

import { BrowserRouter as Router,
  Switch, Route, Redirect
} from 'react-router-dom';
import CategoryTemplate from './CategoryTemplate/CategoryTemplate';

class App extends React.Component {

  constructor(props) {
    super(props);

    // Holds the state for entire app
    this.state = {
      categories: [
        { url: 'planfortoday', category: 'Plan for Today', title : 'Plan for Today', content: [
          { id: 1, name: 'Buy Groceries', isCompleted: false }
        ]}
      ]
    }
  }

  /**
   * Helps to update the category. That is add a new category
   */
  updateCategory = (category) => {
    if(category) {
      const newState = {...this.state};
      newState.categories.push({
        url: category.replace(/\s/g, '').toLowerCase(),
        category,
        title: category,
        content: []
      });
      this.setState({});
    }
  }

  /**
   * Helps to add new item to the category
   */
  updateContent = (newCategory) => {
    const newState = {...this.state};
    for(let count = 0; count < newState.categories.length; count++) {
      if(newCategory.url === newState.categories[count].url) {
        newState.categories[count] = newCategory;
      }
    }
    this.setState(newState);
  }

  /**
   * Has the left nav and the content with Routing
   */
  render() {
    return (
      <Router>
        <div className="App">
          <div className="nav">
            <LeftNav 
              categories={this.state.categories}
              updateCategory={this.updateCategory}
            />
          </div>
          <div className="body">
            <Switch>
              {
                this.state.categories.map( category => (
                  <Route exact path={`/${category.url}`} key={category.url}>
                    <CategoryTemplate 
                      category={category}
                      updateContent={this.updateContent}
                    />
                  </Route>
                ))
              }
              <Redirect path="/" to={this.state.categories[0].url}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

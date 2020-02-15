Following steps to run the App

1) Do `npm install` to install the packages
2) Run `npm start` to run the application

Assumptions:-

1) For now, I have used the state at the parent component and the update method is passed down as props to child components. We can avoid passing of the props to all child components by using the react hooks and context.

2) Added basic media queries to support diffrent devices

3) For styling, I have used just basic colors for hightlighting stuff.

4) Basic empty field validations for the text boxes and maxLenght validation is added

5) Tried to create a re-usable component for the Add text box. Same component is used for Add Category and Add item, but with different props
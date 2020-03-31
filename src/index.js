import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import InitRoute from 'components/InitRoute/InitRoute';
import Create from 'components/Create';
import FormDemo from 'components/Form/Form';
import FormRepeatDemo from './containers/FormRepeatDemo/FormRepeatDemo';
import Lang from 'components/Lang/Lang';
import TableCell from 'components/TableCell/TableCell';
import reducer from './redux';
import { data } from 'components/Form/data';
import PdfDemo from './containers/PdfDemo/PdfDemo';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div id="main_body">
        <InitRoute />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/create" exact component={Create} />
          <Route path="/edit/:id" exact component={Create} />
          <Route path="/form" exact>
            <FormDemo data={data} />
          </Route>
          <Route path="/lang" exact>
            <Lang />
          </Route>
          <Route path="/tableCell" exact>
            <TableCell />
          </Route>
          <Route path="/pdf">
            <PdfDemo />
          </Route>
          <Route path="/formRepeat">
            <FormRepeatDemo />
          </Route>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

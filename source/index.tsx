import * as ReactDOM from 'react-dom';

import {BrowserRouter, Switch, Router} from 'react-router-dom';
import Wrapper from '@Containers/Wrapper';
import './styles/common.global.pcss';

function AppRouting () {
  return (
    <BrowserRouter>
      <Switch>
        <Router exact path='/' component={Wrapper}></Router>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <AppRouting />,
  document.querySelector('#MountApp')
);
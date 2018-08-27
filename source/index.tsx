import './styles/common.global.pcss';
import Wrapper from '@Containers/Wrapper';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Router, Switch } from 'react-router-dom';

function AppRouting() {
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

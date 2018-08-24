import * as React from 'react';
import Hello from '../../components/Hello';
import './styles/main.pcss';

class App extends React.Component {
  public render() {
    return <React.Fragment>
      <Hello compiler='TypeScript' framework='React' />
    </React.Fragment>;
  }
}

export default App;

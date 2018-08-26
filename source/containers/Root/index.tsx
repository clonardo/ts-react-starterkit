import Hello from '@Components/Hello';
import * as React from 'react';
import './styles/main.pcss';

class Root extends React.Component {
  public render() {
    return <React.Fragment>
      <Hello compiler='TypeScript' framework='React' />
    </React.Fragment>;
  }
}

export default Root;

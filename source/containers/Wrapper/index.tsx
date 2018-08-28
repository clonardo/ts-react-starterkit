import * as React from 'react';

import './styles/Wrapper.pcss';
import Hello from '@Components/Hello';

class Wrapper extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Hello compiler='TypeScript' framework='React' />
      </React.Fragment>
    );
  }
}

export default Wrapper;

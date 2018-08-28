import * as React from 'react';
import * as css from './styles/Hello.pcss';

class Hello extends React.Component<HelloProps, {}> {
  public render() {
    return (
      <React.Fragment>
        <h1 className={css.mainTitle}>
          Hello from {this.props.compiler} and {this.props.framework}!
        </h1>
      </React.Fragment>
    );
  }
}

export interface HelloProps { compiler: string; framework: string; }
export default Hello;

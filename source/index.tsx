import './stylesheet/common.glob.pcss';
import Wrapper from '@Containers/Wrapper';
import * as ReactDOM from 'react-dom';

function AppRouting() {
  return (
    <Wrapper />
  );
}

ReactDOM.render(
  <AppRouting />,
  document.querySelector('#MountApp')
);

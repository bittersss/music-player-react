import 'core-js/fn/object/assign';

// import 'react-hot-loader/patch';
// import { AppContainer } from 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';

// const render = Component => {
//   ReactDOM.render(
//     <AppContainer>
//         <Component />
//     </AppContainer>,
//     document.getElementById('app')
//   );
// }
// render(App);

// if (module.hot) {
//   module.hot.accept('./root', () => { render(App) });
// }
ReactDOM.render(<Root />,document.getElementById('app'));
// Render the main component into the dom
// render(
// 		<AppContainer>
// 		   <Root />
// 		</AppContainer>,
// 		document.getElementById('app')
// 		);






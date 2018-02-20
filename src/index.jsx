import React from 'react';
import ReactDOM from 'react-dom';
import VersionView from './Views/VersionView';
import WorksView from './Views/WorksView';

class App extends React.Component {
};

ReactDOM.render(<WorksView />, document.getElementById('app'));
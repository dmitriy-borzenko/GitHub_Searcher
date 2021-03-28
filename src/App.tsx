import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { UserDatailsPage } from './pages/UserDetailsPage/UserDetailsPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App center">
        <h1>GitHub Searcher </h1>
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/:login" component={UserDatailsPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;

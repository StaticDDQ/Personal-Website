import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// Pages
import MainPage from "./routes";
import NotFound from "./routes/404";
import Progress from "./routes/progress";
import Project from "./routes/project";
import Update from "./routes/update";
import ProjectCreate from "./routes/projectCreate";
import UpdateCreate from "./routes/updateCreate";

class App extends React.Component {

    render() {

        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path="/" component={MainPage} />
                        <Route exact path="/progress" component={Progress} />

                        <Route path="/project" component={Project} />
                        <Route path="/update" component={Update} />

                        <Route path="/createupdate" component={UpdateCreate} />
                        <Route path="/createproject" component={ProjectCreate} />

                        <Route exact path="/404" component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default (App);

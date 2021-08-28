import React, {Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Spinner} from 'react-rainbow-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'shards-ui/dist/css/shards.min.css';
import {Header} from '../components';

const Movies = React.lazy(() => import('../pages/movies'));
const MovieDetails = React.lazy(() => import('../pages/movie-details'));

const App = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Router>
                <Header />
                <Switch>
                    <Route
                        path="/movie/:movieId"
                        exact
                        component={MovieDetails}
                    />
                    <Route path="/movies/:category" exact component={Movies} />
                    <Route path="/" exact component={Movies} />
                </Switch>
            </Router>
        </Suspense>
    );
};

export default App;

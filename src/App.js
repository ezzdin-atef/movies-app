import React from "react";
import MoviesList from "./components/moviesList";
import SeriesList from "./components/seriesList";
import MovieView from "./components/movieView";
import TvView from "./components/tvView";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Switch>
        <Route path="/movie/:id" component={MovieView} />
        <Route path="/tv/:id" component={TvView} />
        <Route path="/movies/pages/:id" component={MoviesList} />
        <Route path="/series/pages/:id" component={SeriesList} />
        <Redirect from="/movies" to="/movies/pages/1" />
        <Redirect from="/series" to="/series/pages/1" />
        <Redirect from="/" to="/movies" />
      </Switch>
    </div>
  );
}

export default App;

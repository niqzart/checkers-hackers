import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import { CssBaseline, useMediaQuery } from "@material-ui/core"

import HomePage from "./pages/home"
import LobbyPage from "./pages/lobby"
import GamePage from "./pages/game"


function JoinPage(props) {
  return <div>Joining {props.match.params.id}...</div>
}

function Main() {
  return <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/lobby/" component={LobbyPage} />
    <Route exact path="/game/" component={GamePage} />
    <Route exact path="/join/:id/">
      {true ? <Redirect to="/dashboard" /> : <JoinPage />}
    </Route>
  </Switch>
}


export default function App() {
  return (
    <ThemeProvider
      theme={createTheme({ palette: { type: useMediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light", } })}
    >
      <CssBaseline />
      <Main />
    </ThemeProvider>
  )
}

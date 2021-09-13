import React from "react"
import { Switch, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import { CssBaseline, useMediaQuery } from "@material-ui/core"

import HomePage from "./pages/home"
import LobbyPage from "./pages/lobby"


function Main() {
  return <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/lobby/" component={LobbyPage} />
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

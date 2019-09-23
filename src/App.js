import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import { fetchWords } from "./redux";
import { connect } from "react-redux";


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.props.fetchWords()}
        >
          LOAD
        </Button>
        <Box className="Box">
          {this.props.loading ?
            <CircularProgress color="primary" /> :
            this.props.error ?
              <p>Error, try again</p> :
              <p>
                {this.props.words.join(" ")}
              </p>
          }
        </Box>  
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapsDispatchToProps = dispatch => {
  return {
    fetchWords: () => {
      dispatch(fetchWords());
    }
  };
};

const ConnectedApp = connect(
  mapStateToProps,
  mapsDispatchToProps
)(App);

export default ConnectedApp;

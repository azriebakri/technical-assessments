import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

interface IbitlyAPI {
  [key: string]: any
}

class App extends React.Component<IbitlyAPI> {
  constructor(props:any) {
    super(props);
    this.getBitlyShortURL = this.getBitlyShortURL.bind(this);
  } 

  
  state = {
    generalAccessToken: 'b853531ceca87d5e0a4129cd09bc6b34e93c619f',
    group_guid: null,
    long_url: '',
    short_url: '',
    respond_data: {} as IbitlyAPI,

  };

  componentDidMount(){
    this.getBitlyGroup();
  }

  getBitlyGroup(){
    fetch('https://api-ssl.bitly.com/v4/groups', {
      method: 'get',
      headers : {
        'Content-Type': 'application/json',
        'Authorization' : this.state.generalAccessToken
      }
    })
    .then(res => res.json())
    .then(res => {
      this.setState({
        group_guid:res.groups[0].guid
      })
    });
  }

  getBitlyShortURL(){
    console.log(this.state);
    let body = {
      'long_url': this.state.long_url,
      'groud_guid': this.state.group_guid
    };

    fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : this.state.generalAccessToken
      },
      body: JSON.stringify(body)})
      .then(res => res.json())
      .then(res => {

        this.setState({
          respond_data: res
        })

      })
  }

  handleInputOnChange = (e:any) => {
    this.setState({
      long_url: e.target.value
    }, () => {
      console.log(this.state.long_url)
    })
  }
  

  render(){

    let { long_url, respond_data } = this.state;
    let link = <span> </span>;
    
    if(respond_data){
      if(!respond_data.hasOwnProperty('errors'))
        link = <a id="error" target="_blank" rel="noopener noreferrer" href={respond_data.link}> {respond_data.link} </a>
      else
        link = <span id="error"> It seems that the URL is invalid :(  </span>

    }

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
 
          <div>
            <TextField id="outlined-basic" label="Website Url" variant="outlined" value={long_url} onChange={this.handleInputOnChange}/>

          </div>
          <div>
            <Button variant="outlined" size="medium" color="primary" onClick={this.getBitlyShortURL}>
              Shorten it!
            </Button>
          </div>
          <div id="link-div">
            {link} 
          </div>
        </header>
      </div>
    );
  }
}

export default App;

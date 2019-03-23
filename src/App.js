import React, { Component } from 'react';
import {Row, Col, Layout, Input, Button, Card} from 'antd'
import "antd/dist/antd.css";
import './App.css'

const {
  Header, Footer, Content,
} = Layout;

const { TextArea } = Input;

const ButtonGroup = Button.Group;

class App extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.delet = this.delet.bind(this);
    this.bold = this.bold.bind(this);
    this.addcode = this.addcode.bind(this);
    this.quote = this.quote.bind(this);
    this.list = this.list.bind(this);
    this.bars = this.bars.bind(this);
    this.italic = this.italic.bind(this);
    this.state = { value: '' , listNum: 0};
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  delet(e){
    this.setState({value: ''});
  }

  italic(e){
    var prev = this.state.value.split("\n");
    var lastLine = prev[prev.length-1].split(" ")
    lastLine[lastLine.length-1] = "`" + lastLine[lastLine.length-1] + "`"
    prev[prev.length-1] = lastLine.join(" ")
    var letter = "";
    for (let index = 0; index < prev.length; index++) {
      letter += prev[index] + "\n";
    }
    this.setState({value: letter});
  }
  addcode(){
    this.setState(prevState => ({
      value : prevState.value +  "\n```\n```"
    }));
  }

  bold(e){
    var prev = this.state.value.split("\n");
    var lastLine = prev[prev.length-1].split(" ")
    lastLine[lastLine.length-1] = "**" + lastLine[lastLine.length-1] + "**"
    prev[prev.length-1] = lastLine.join(" ")
    var letter = "";
    for (let index = 0; index < prev.length; index++) {
      letter += prev[index] + "\n";
    }
    this.setState({value: letter});
  }

  quote(){
    this.setState(prevState => ({
      value: prevState.value+"\n> "
    }));
  }

  bars(){
    this.setState(prevState => ({
      value: prevState.value+"\n* "
    }));
  }

  list(){
    this.setState(prevState => ({
      value: prevState.value+"\n" + (prevState.listNum+1).toString() +". " ,
      listNum: prevState.listNum + 1
    }));
  }

  rawMarkup = (value) => {
    var Remarkable = require('remarkable');
    var md = new Remarkable('full');
    return {__html: md.render(this.state.value)};
  }
  render() {
    return (
      <div>
        <Layout style={{backgroundColor:"#ffffff"}}>
        <Header>
          <div id="header">Markdown Preview</div>
        </Header>
        <Content>
        <Row>
        <Col span={12}>
          <ButtonGroup>
            <Button icon="bold" onClick={this.bold}></Button>
            <Button icon="italic" onClick={this.italic}></Button>
            <Button icon="read" onClick={this.quote}></Button>
            <Button icon="redo" onClick={this.delet}></Button>
            <Button icon="bars" onClick={this.bars}></Button>
            <Button icon="ordered-list" onClick={this.list}></Button>
            <Button icon="code" onClick={this.addcode}></Button>
          </ButtonGroup>
        </Col>
        <Col span={12}></Col>
        </Row>
        <Row>
          <Col span={12}>
            <TextArea
              style = {{minHeight:555}}
              autosize = "true"
              onChange={this.handleChange}
              value = {this.state.value}
            />
          </Col>
          <Col span={12}>
            <Card title="Viewer" style={{minHeight:555}}>
              <div dangerouslySetInnerHTML={this.rawMarkup()}></div>
            </Card>
          </Col>
        </Row>
        </Content>
            <Footer><div id="footer">Made by CHUN</div></Footer>
        </Layout>
      </div>
    );
  }
}

export default App;

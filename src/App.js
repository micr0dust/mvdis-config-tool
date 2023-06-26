//import Option from './option.json';
import React, { Component } from 'react';
import { Button,Stack } from 'react-bootstrap';
import Card from './components/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

class App extends Component{
  constructor(props) {
      super(props);
      this.state={
        opt: [{
          "licenseTypeCode": "",
          "dmvNoLv1": "",
          "dmvNo": "",
          "target": "",
          "date": "",
          "signup":{
              "idNo": "",
              "birthdayStr": "",
              "name": "",
              "contactTel": "",
              "email": ""
          }
        }]
      };
      this.handler = this.handler.bind(this);
      this.addChild = this.addChild.bind(this);
      this.removeChild = this.removeChild.bind(this);
  }
  handler(index, event) {
    let data = [...this.state.opt];
    if(event.name.length===1)
      data[index][event.name[0]] = event.value;
    else
    data[index][event.name[0]][event.name[1]] = event.value;
    this.setState({opt:data});
    //console.log(data);
  }
  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  removeChild(index){
    let data = [...this.state.opt];
    data.splice(index, 1);
    this.setState({opt:data});
  }
  addChild(){
      this.setState({opt: this.state.opt.concat([
        {
          "licenseTypeCode": "",
          "dmvNoLv1": "",
          "dmvNo": "",
          "target": "",
          "date": "",
          "signup":{
              "idNo": "",
              "birthdayStr": "",
              "name": "",
              "contactTel": "",
              "email": ""
          }
        }
      ])});
  }
  loadData = event => {
    this.setState({opt:[]});
    const fileReader = new FileReader();
    const { files } = event.target;
    fileReader.readAsText(files[0], "UTF-8");
    fileReader.onload = e => {
      document.getElementById('import').style.display='none';
      this.setState({opt:JSON.parse(e.target.result)});
    };
  };
  exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(this.state.opt))}`;
    //const data = this.state.opt;
    //console.log(data);
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "option.json";
    link.click();
  };
  render(){
    return (
      <Container className='mt-5'>
        <Row>
          <Col md={10}>
            {this.state.opt.map((data,index)=>{
              return <Card key={index} lstID={index} data={data} handler={this.handler} remover={this.removeChild}/>
            })}
            <Stack className='m-5 justify-content-between' direction="horizontal" gap={2}>
              <Button variant="success" onClick={this.exportData}>
                導出為 option.json
              </Button>
              <Button id='import' variant="light" onClick={()=>{document.getElementById('upload').click()}}>
                導入 json 檔
              </Button>
              <Form.Control  id="upload" accept="application/JSON" type="file" style={{ display: 'none' }} onChange={this.loadData}/>
              <Button variant="primary" onClick={this.addChild}>
                新增 +
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

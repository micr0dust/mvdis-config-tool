import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Select from './Select';
import Accordion from 'react-bootstrap/Accordion';
import { Button, Row, Col } from 'react-bootstrap';

class CardBlock extends Component{
    constructor(props) {
        super(props);
        this.state={
            area:this.props.data.dmvNoLv1
        };
    }
    strDateFormat(str){
        return `${parseInt(str.slice(0,3))+1911}-${str.slice(3,5)}-${str.slice(5,7)}`;
    }
    formatToStr(str){
        const date = new Date(str);
        return `${('000'+(date.getFullYear()-1911)).slice(-3)}${('00'+(date.getMonth()+1)).slice(-2)}${('00'+date.getDate()).slice(-2)}`;
    }
    getArea={
        "20":{
            "21":"士林監理站(臺北市士林區承德路5段80號)",
            "25":"基隆監理站(基隆市七堵區實踐路296號)",
            "26":"金門監理站(金門縣金湖鎮黃海路六之一號)"
        },
        "40":{
            "40":"臺北區監理所(新北市樹林區中正路248巷7號)",
            "41":"板橋監理站(新北市中和區中山路三段116號)",
            "43":"宜蘭監理站(宜蘭縣五結鄉中正路二段9號)",
            "44":"花蓮監理站(花蓮縣吉安鄉中正路二段152號)",
            "45":"玉里監理分站(花蓮縣玉里鎮中華路427號)",
            "46":"蘆洲監理站(新北市蘆洲區中山二路163號)"
        },
        "50":{
            "50":"新竹區監理所(新竹縣新埔鎮文德路三段58號)",
            "51":"新竹市監理站(新竹市自由路10號)",
            "52":"桃園監理站(桃園市介壽路416號)",
            "53":"中壢監理站(桃園縣中壢市延平路394號)",
            "54":"苗栗監理站(苗栗市福麗里福麗98號)"
        },
        "60":{
            "60":"臺中區監理所(臺中市大肚區瑞井里遊園路一段2號)",
            "61":"臺中市監理站(臺中市北屯路77號)",
            "62":"埔里監理分站(南投縣埔里鎮水頭里水頭路68號)",
            "63":"豐原監理站(臺中市豐原區豐東路120號)",
            "64":"彰化監理站(彰化縣花壇鄉南口村中山路二段457號)",
            "65":"南投監理站(南投縣南投市光明一路301號)"
        },
        "70":{
            "70":"嘉義區監理所(嘉義縣朴子市朴子七路29號)",
            "71":"東勢監理分站(雲林縣東勢鄉新坤村新坤路333號)",
            "72":"雲林監理站(雲林縣斗六市雲林路二段411號)",
            "73":"新營監理站(臺南市新營區大同路55號)",
            "74":"臺南監理站(臺南市崇德路1號)",
            "75":"麻豆監理站(臺南市麻豆區北勢里新生北路551號)",
            "76":"嘉義市監理站(嘉義市東區保建街89號)"
        },
        "30":{
            "30":"高雄市區監理所(高雄市楠梓區德民路71號)",
            "31":"苓雅監理站(高雄市苓雅區安康路22號)",
            "33":"旗山監理站(高雄市旗山區旗文路123-1號)"
        },
        "80":{
            "80":"高雄區監理所(高雄市鳳山區武營路361號)",
            "81":"臺東監理站(臺東市正氣北路441號)",
            "82":"屏東監理站(屏東市忠孝路222號)",
            "83":"恆春監理分站(屏東縣恒春鎮草埔路11號)",
            "84":"澎湖監理站(澎湖縣馬公市光華里121號)"
        }
    };
    render(){
        return (
            <Card className='m-3'>
                <Card.Body className='m-3'>
                <Row className='justify-content-between'>
                    <Col className='col-11'>
                        <h3 className='m-3'>#{this.props.lstID+1}</h3>
                    </Col>
                    <Col className='col-1'>
                        <Button className='mb-2' variant="danger" onClick={event => this.props.remover(this.props.lstID)}>
                            X
                        </Button>
                    </Col>
                </Row>
                <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>報名資訊</Accordion.Header>
                    <Accordion.Body>
                        <InputGroup className="mb-3">
                        <InputGroup.Text>
                            報考照類 Type of Test
                        </InputGroup.Text>
                        <Select
                            defaultValue={this.props.data.licenseTypeCode}
                            change={event => this.props.handler(this.props.lstID, {name:["licenseTypeCode"],value:event.target.value})}
                            data={{
                            "3": "普通重型機車",
                            "5": "普通輕型機車 (50cc 以下)",
                            "A": "普通小型車",
                            "B": "職業小型車",
                            "C": "普通大貨車",
                            "D": "職業大貨車",
                            "E": "普通大客車",
                            "F": "職業大客車",
                            "G": "普通聯結車",
                            "H": "職業聯結車"
                        }}></Select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            預計考試日期 Date of Test
                        </InputGroup.Text>
                        <Form.Control type="date"
                            name="date"
                            defaultValue={this.props.data.date}
                            onChange={event => this.props.handler(this.props.lstID, {name:["date"],value:event.target.value})}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            考試地點 Place of Test
                        </InputGroup.Text>
                        <Select 
                            id="dmvNoLv1"
                            change={(event)=>{
                                this.setState({area: event.target.value});
                                this.props.handler(this.props.lstID, {name:["dmvNoLv1"],value:event.target.value});
                            }}
                            defaultValue={this.props.data.dmvNoLv1}
                            data={{
                            "20": "臺北市區監理所（含金門馬祖）",
                            "40": "臺北區監理所（北宜花）",
                            "50": "新竹區監理所（桃竹苗）",
                            "60": "臺中區監理所（中彰投）",
                            "70": "嘉義區監理所（雲嘉南）",
                            "30": "高雄市區監理所",
                            "80": "高雄區監理所（高屏澎東）"
                        }}></Select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            考試地點 Place of Test
                        </InputGroup.Text>
                        <Select 
                            id="dmvNo"
                            name="dmvNo"
                            defaultValue={this.props.data.dmvNo}
                            change={event => this.props.handler(this.props.lstID, {name:["dmvNo"],value:event.target.value})}
                            data={this.state.area?this.getArea[this.state.area]:{"":""}}
                        ></Select>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>
                            關鍵字
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="target"
                            defaultValue={this.props.data.target}
                            onChange={event => this.props.handler(this.props.lstID, {name:["target"],value:event.target.value})}
                        />
                    </InputGroup>
                    </Accordion.Body>
                </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>個人資料</Accordion.Header>
                        <Accordion.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>
                                    身分證
                                </InputGroup.Text>
                                <Form.Control
                                type="text"
                                name="idNo"
                                defaultValue={this.props.data.signup.idNo}
                                onChange={event => this.props.handler(this.props.lstID, {name:["signup","idNo"],value:event.target.value})}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>
                                    生日
                                </InputGroup.Text>
                                <Form.Control
                                type="date"
                                name="birthdayStr"
                                defaultValue={this.strDateFormat(this.props.data.signup.birthdayStr)}
                                onChange={event => this.props.handler(this.props.lstID, {name:["signup","birthdayStr"],value:this.formatToStr(event.target.value)})}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>
                                    姓名
                                </InputGroup.Text>
                                <Form.Control
                                type="text"
                                name="name"
                                defaultValue={this.props.data.signup.name}
                                onChange={event => this.props.handler(this.props.lstID, {name:["signup","name"],value:event.target.value})}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>
                                    電話
                                </InputGroup.Text>
                                <Form.Control
                                type="text"
                                name="contactTel"
                                defaultValue={this.props.data.signup.contactTel}
                                onChange={event => this.props.handler(this.props.lstID, {name:["signup","contactTel"],value:event.target.value})}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>
                                    Email
                                </InputGroup.Text>
                                <Form.Control
                                type="text"
                                name="email"
                                defaultValue={this.props.data.signup.email}
                                onChange={event => this.props.handler(this.props.lstID, {name:["signup","email"],value:event.target.value})}
                                />
                            </InputGroup>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                </Card.Body>
            </Card>
        );
    }
}
export default CardBlock;
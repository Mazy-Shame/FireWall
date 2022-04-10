const e = require('cors');
const cors = require('cors');
const express = require('express');
const fs = require("fs");
const base64 = require('base-64');
const utf8 = require('utf8');

const app = express();

const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.options('*', cors());

const filepath = "data/data.json"
const dataPath = "data/packages.json";

app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});

app.post("/appendSachet", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);
      
    const b = req.body

    let sachet = b;
      
    let data = fs.readFileSync(filepath, "utf8");
    
    
    let config = JSON.parse(data);

    config.push(sachet);

    var configJSON = JSON.stringify(config);

    fs.writeFileSync(filepath, configJSON);

    res.send(sachet);
});

//метод возвращающий пакеты
app.get("/getPackages", function(req,res) {

    const packList = fs.readFileSync(dataPath,"utf-8");
    const list = JSON.parse(packList);


    let data = fs.readFileSync(filepath, "utf8");
    //берем из data пакетики
    let parse = JSON.parse(data);

    let hosts = []

    //парсинг хостов
    parse.forEach(el => {

        if (!hosts.includes(el.ip_src)) {
            hosts.push(el.ip_src)
        }
    });


    hosts = hosts.map( el => {
        return({
            "ip": el,
            "packages": [],
            "isSafe": true,
            "dangerous": null,
            "allowed": true
        })
    })

    
    // добавление пакетов, которые исходят от ip адреса
    parse.forEach( el => {

        hosts.forEach( el1 => {

            if (el1.ip == el.ip_src){
                el1.packages.push(el)
            }

        })
    })


    //начинаются проверки
    hosts.forEach( el => {
        let i = 0
        el.packages.forEach( pack => {

            //проверка на TCP SYN Flood
            i++
            if (pack.tcp_flags_ack == 0 && pack.tcp_flags_syn == 1 && i>=5){
                el.isSafe = false
                el.dangerous = "TCP SYN flood"
            }

            //проверка на base64
            if (pack.json_body != null) {
                let code = pack.json_body.code.split('')
                console.log(code);

                code.forEach( word => {
                    if (word != ' ' && code[code.length - 1] == '=' && code.length % 4 == 0) {
                        el.isSafe = "unknown"
                        el.dangerous = "Base64 Encode"
                    }
                })
                
            }

            if (pack.json_body != null){
                let code = pack.json_body.code
                let bytes = base64.decode(code);
                let text = utf8.decode(bytes);

                pack.json_body = text
            }

            //проверка на deauthWifi
            if (pack.wlan_type == "12"){
                el.isSafe = false
                el.dangerous = "WiFi Deauth DOS attack"
                el.ip = pack.wlan_address_src
                pack.mac_src = pack.wlan_address_src
                pack.mac_dst = pack.wlan_address_dst
            }

        })

    })

    res.send(hosts);

})

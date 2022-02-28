const e = require('cors');
const cors = require('cors');
const express = require('express');
const fs = require("fs");

const app = express();
const jsonParser = express.json();

app.use(express.static(__dirname + "/public"));
app.use(cors());
app.options('*', cors());

const filePath = "data/data.json";

const dataPath = "data/packages.json";

app.listen(3333, () => {
    console.log('Application listening on port 3333!');
});

app.get("/whitelist", function(req, res){
       
    const content = fs.readFileSync(filePath,"utf8");
    const list = JSON.parse(content);
    res.send(list);
});

app.delete("/whitelist/:name", function(req, res){
       
    const name = req.params.name;
    let data = fs.readFileSync(filePath, "utf8");
    let list = JSON.parse(data);
    let index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i < list.length; i++){
        if(list[i].name== name){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        const host = list.splice(index, 1)[0];
        data = JSON.stringify(list);
        fs.writeFileSync(filePath, data);
        // отправляем удаленного пользователя
        res.send(host);
    }
    else{
        res.status(404).send("not found");
    }
});

app.post("/addhost", jsonParser, function (req, res) {
      
    if(!req.body) return res.sendStatus(400);
      
    const hostIP = req.body.ip;
    const hostMAC = req.body.mac;
    const hostVLAN = req.body.vlan;
    const hostNAME = req.body.name;

    let host = {ip: hostIP, mac: hostMAC, vlan: hostVLAN, name: hostNAME};
      
    let data = fs.readFileSync(filePath, "utf8");
    let list = JSON.parse(data);
      
    // находим максимальный id
    const id = Math.max.apply(Math,list.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    host.id = id+1;
    // добавляем пользователя в массив
    list.push(host);
    data = JSON.stringify(list);
    // перезаписываем файл с новыми данными
    fs.writeFileSync(filePath, data);
    res.send(host);
});

//метод возвращающий пакеты
app.get("/getPackages", function(req,res) {

    const packList = fs.readFileSync(dataPath,"utf-8");
    const list = JSON.parse(packList);

    //парсинг пакетов
    let parse = list.map( (el) => {

        let protocols = el._source.layers.frame["frame.protocols"].split(":")


        return (
            {
                "ip_src": el._source.layers.ip["ip.src"],
                "ip_dst": el._source.layers.ip["ip.dst"],
                "protocols": protocols,
                "mac_src": el._source.layers.eth["eth.src"],
                "mac_dst": el._source.layers.eth["eth.dst"],
                "tcp_flags_syn": el._source.layers.tcp["tcp.flags_tree"]["tcp.flags.syn"],
                "tcp_flags_ack": el._source.layers.tcp["tcp.flags_tree"]["tcp.flags.ack"],
                "frame_time_relative": el._source.layers.frame["frame.time_relative"]
            }
        )
    })

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

    
    //проверка на TCP SYN Flood
    hosts.forEach( el => {
        el.packages.forEach( pack => {

            if (pack.tcp_flags_ack == 0 && pack.tcp_flags_syn == 1){
                el.isSafe = false
                el.dangerous = "TCP SYN flood"
            }
        })
    })

    res.send(hosts);

})

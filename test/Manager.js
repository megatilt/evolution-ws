import assert from "assert";
import { Manager } from "../lib";

var defaultUrl = "ws://127.0.0.1:11011";
var faultyNodeList = [
    {url: "wss://bitsqsdqsdhares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bitazdazdshares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bitshaazdzares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bit.btzadazdsabc.org/ws", location: "Hong Kong"},
    {url: "ws://127.0.0.1:8091", location: "Hangzhou, China"},
    {url: "wss://evolution.dacplay.org:8089/ws", location:  "Hangzhou, China"},
    {url: "wss://secure.freedomledger.com/ws", location: "Toronto, Canada"},
    {url: "wss://testnet.evolution.eu/ws", location: "Public Testnet Server (Frankfurt, Germany)"}
];

var noWorkingNodes = [
    {url: "wss://bitsqsdqsdhares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bitazdazdshares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bitshaazdzares.openledger.info/ws", location: "Nuremberg, Germany"},
    {url: "wss://bit.btzadazdsabc.org/ws", location: "Hong Kong"},
    {url: "ws://127.23230.0.1:8091", location: "Hangzhou, China"},
    {url: "wss://bitshasdares.dacplay.org:8089/ws", location:  "Hangzhou, China"},
    {url: "wss://secuasdre.freedomledger.com/ws", location: "Toronto, Canada"},
    {url: "wss://testnet.evolution.eu/wqsdsqs", location: "Public Testnet Server (Frankfurt, Germany)"}
];

var goodNodeList = [
    {url: "ws://127.0.0.1:11011", location: "Nuremberg, Germany"}
];

describe("Connection Manager", function() {

    it("Instantiates", function() {
        let man = new Manager({url: defaultUrl, urls: faultyNodeList.map(a => a.url)});
        assert.equal(man.url, defaultUrl);
    });

    it("Tries to connect default url", function() {
        this.timeout(3000);
        let man = new Manager({url: defaultUrl, urls: faultyNodeList.map(a => a.url)});
        return new Promise( function(resolve, reject) {
            man.connect().then(resolve)
            .catch(reject)
        });
    });

    it("Tries to connect to fallback", function() {
        this.timeout(15000);
        let man = new Manager({url: "ws://127.0.0.1:8092", urls: faultyNodeList.map(a => a.url)});
        return new Promise( function(resolve, reject) {
            man.connectWithFallback().then(resolve)
            .catch(reject)
        });
    });

    it("Rejects if no connections are successful ", function() {
        this.timeout(15000);
        let man = new Manager({url: "ws://127.0.0.1:8092", urls: noWorkingNodes.map(a => a.url)});
        return new Promise( function(resolve, reject) {
            man.connectWithFallback().then(reject)
            .catch(resolve);
        });
    });

    it("Can check connection times for all connections", function() {
        this.timeout(20000);
        let man = new Manager({url: "ws://127.0.0.1:8090", urls: goodNodeList.map(a => a.url)});
        return new Promise( function(resolve, reject) {
            man.checkConnections().then(resolve).catch(reject);
        });
    })

});

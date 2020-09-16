var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../server");
let should = chai.should();
chai.use(chaiHttp);
process.env.NODE_ENV='test';
let mongoose=require("mongoose");
let Flight=require('../Flights/models/flight.model')


chai.use(chaiHttp);



describe ("ADMIN OPERATIONS", ()=>{

        it("Should add FLIGHTS in DB", (done) => {
            let flights = 
           
            chai.request('http://localhost:4545')
                .post('/api/flight/add-flight')
                .send({
                    flightName: "INDIGO CHN-BOM",
                    src: "CHENNAI",
                    dest: "BOMBAY",
                    arrivalTime: "16:00:00",
                    deptTime:"17:30:40",
                    fare:3422
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    console.log("Response Body:", res.body);
                                 
                })
                done() 
        
    })

    it("Should not add FLIGHTS in DB if data provided is incorrect", (done) => {
        
       
        chai.request('http://localhost:4545')
            .post('/api/flight/add-flight')
            .send({
                flightName: "INDIGO CHN-BOM",
               
                arrivalTime: "16:00:00",
                deptTime:"17:30:40",
                fare:3422
            })
            .end((err, res) => {
                res.should.have.status(500);
                             
            })
            done() 
    
})



    it("Should display all FLIGHTS in DB", (done) => {
        
       
        chai.request('http://localhost:4545')
            .get('/api/flight/get-all-flights')
            
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
              
                             
            })
            done() 
    
})
it("Should delete the specific FLIGHT in DB", (done) => {
        
       
    chai.request('http://localhost:4545')
        .post('/api/flight/delete-flight')
        .send({
            flightName: "INDIGO CHN-BOM"
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.be.eql('Flight removed successfully');
          
                         
        })
        done() 

})
it("Should update the specific FLIGHT in DB", (done) => {
        
       
    chai.request('http://localhost:4545')
        .put('/api/flight/update-flight')
        .send({
            flightName: "INDIGO CHN-BOM",
            src: "CHENNAI",
            dest: "BOMBAY",
            arrivalTime: "16:30:00",
            deptTime:"17:30:45",
            fare:8977

        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
                         
        })
        done() 

})
     
})
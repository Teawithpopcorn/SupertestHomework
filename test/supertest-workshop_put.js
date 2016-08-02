var request = require('supertest');
var chai = require('chai');
var expect = require('chai').expect;
var endpoint = 'https://sheets.googleapis.com/v4/spreadsheets'

var spreadsheetId2 = '1Y99VfFnJ9DolTzvUC6YJQxh7Pem22ik0TjpS1FojnwU'
var token = 'Bearer ya29.CjAzA9oOhiU7LFIZHcDudrdT86ot75dNmqudTMM-8Q4eDSIIIqMkTiWYdH124FTG8v0'

describe('sheet', function () {

    this.timeout(10000)

    request = request(endpoint)

    it('put sheet', function(done){
        var range = 'zoe!A6:D10'
        var requestBody = {
            "range": range,
            "majorDimension": "ROWS",
            "values": [
                ["Item", "Cost", "Stocked", "Ship Date"],
                ["Wheel", "$20.50", "4", "3/1/2016"],
                ["Door", "$15", "2", "3/15/2016"],
                ["Engine", "$100", "1", "30/20/2016"],t
                ["Engine", "$100", "1", "30/20/2016"]
            ]
        }

        request.put('/'+spreadsheetId2+'/values/'+range)
            .query({
                valueInputOption:'USER_ENTERED'
            })
            .set('Authorization', token)
            .set('Content-Type', 'application/json')

            .send(requestBody)

            .expect(200)

            .expect(function(res){
                console.log(res)
                expect(res.body.spreadsheetId).to.equal(spreadsheetId2)
                expect(res.body.updatedRange).to.equal(range)
            })

            .end(function(err,res){

                done(err);

            })

    })

    it('read a single range', function(done){
        var range = 'zoe!A6:D10'
        var requestBody = {
            "range": range,
            "majorDimension": "ROWS",
            "values": [
                ["Item", "Cost", "Stocked", "Ship Date"],
                ["Wheel", "$20.50", "4", "3/1/2016"],
                ["Door", "$15", "2", "3/15/2016"],
                ["Engine", "$100", "1", "30/20/2016"],
                ["Engine", "$100", "1", "30/20/2016"]
            ]
        }


        request.get('/'+spreadsheetId2+'/values/'+range)

            .set('Authorization', token)
            .set('Content-Type', 'application/json')

            .expect(200)

            .expect(function(res){
                console.log(res.body)
                console.log(100*'*')
                console.log(requestBody)
                expect(res.body).to.eql(requestBody)
            })

            .end(function(err,res){

                done(err);

            })

    })

})
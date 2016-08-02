var request = require('supertest');
var chai = require('chai');
var expect = require('chai').expect;
var endpoint = 'https://sheets.googleapis.com/v4/spreadsheets'

var spreadsheetId = '1Y99VfFnJ9DolTzvUC6YJQxh7Pem22ik0TjpS1FojnwU'
var token = 'Bearer ya29.CjAzA9oOhiU7LFIZHcDudrdT86ot75dNmqudTMM-8Q4eDSIIIqMkTiWYdH124FTG8v0'

describe.only('sheet', function () {

    this.timeout(10000)

    request = request(endpoint)

    var sheetId
    var sheetName = 'zxx'

    it('add a sheet', function(done){
        var requestBody = {
            "requests": [
                {
                    "addSheet": {
                        "properties": {
                            "title": sheetName
                        }
                    }
                }
            ]
        }

        request.post('/' + spreadsheetId + ':batchUpdate')


            .set('Authorization', token)
            .set('Content-Type', 'application/json')

            .send(requestBody)

            .expect(200)



            .expect(function(res){
                sheetId = res.body.replies[0].addSheet.properties.sheetId
                expect(res.body.spreadsheetId).to.equal(spreadsheetId)
                expect(res.body.replies[0].addSheet.properties.title).to.equal(sheetName)
            })

            .end(function(err,res){

                done(err);

            })
    })

    it('add multiple range', function(done){
        var requestBody = {
            "valueInputOption": "USER_ENTERED",
            "data": [
                {
                    "range": "zoe!A1:A4",
                    "majorDimension": "COLUMNS",
                    "values": [
                        ["ZItem", "ZWheel", "ZDoor", "ZEngine"]
                    ]
                },
                {
                    "range": "zoe!B1:D2",
                    "majorDimension": "ROWS",
                    "values": [
                        ["ZCost", "ZStocked", "ZShip Date"],
                        ["$200.50", "40", "3/10/2016"]
                    ]
                }
            ]
        }

        request.post('/' + spreadsheetId + '/values:batchUpdate')


            .set('Authorization', token)
            .set('Content-Type', 'application/json')

            .send(requestBody)

            .expect(200)



            .expect(function(res){

                expect(res.body.spreadsheetId).to.equal(spreadsheetId)
                expect(res.body.responses[0].spreadsheetId).to.equal(spreadsheetId)
                expect(res.body.responses[0].updatedRange).to.contain('zoe')
            })

            .end(function(err,res){

                done(err);

            })
    })

    it('delete a sheet', function(done){
        var requestBody = {
            "requests": [
                {
                    "deleteSheet": {
                        "sheetId": sheetId
                    }
                }
            ]
        }

        //1Y99VfFnJ9DolTzvUC6YJQxh7Pem22ik0TjpS1FojnwU/values/zoe!A6:D10

        request.post('/'+spreadsheetId+':batchUpdate')

            .set('Authorization', token)
            .set('Content-Type', 'application/json')

            .send(requestBody)

            .expect(200)

            .expect(function(res){
                expect(res.body.spreadsheetId).to.equal(spreadsheetId)
            })

            .end(function(err,res){

                done(err);

            })

    })

})
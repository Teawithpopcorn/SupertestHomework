var request = require('supertest');
var chai = require('chai');
var expect = require('chai').expect;
var endpoint = 'https://www.googleapis.com/books/v1'

/* Configurate endpoint in a separate config file
var config = require('../config/host_config.js')
var endpoint = config.host['google_books']
*/


// Test Google Books API
describe('Test Google Books API' ,function(){

    describe('Test Google Books - Volumes API', function(){
        var id;

        this.timeout(10000)

        request = request(endpoint + '/volumes')

        it('Search books with a mandatory parameter(q="test") - Return 200 OK', function(done){


            request
                .get('?q=test')
                .expect(200, done)

        })

        it('Search books whose name contains "cucumber", max number of results to return is 2', function(done){

            var q = 'hello'
            var maxResults = 2


            request.get('/')
                .query({
                    q: q,
                    maxResults: maxResults
                })
                .expect(200)
                .expect(function(res){
                    var itemLength = res.body.items.length
                    console.log(itemLength)
                    id = res.body.items[0].id
                    var selfLink = res.body.items[0].selfLink
                    var selfLinkLength = selfLink.split('/').length
                    console.log(selfLinkLength)
                    var idInSelfLink = selfLink.split('/')[selfLinkLength-1]
                    console.log(idInSelfLink)

                    expect(res.body.items[0].volumeInfo.title.toLowerCase()).to.contain(q);
                    expect(itemLength).be.at.least(maxResults);
                    expect(idInSelfLink).to.equal(id)
                    expect(res.body).to.include.keys('kind','totalItems','items');

                })
                .end(function(err,res){

                    done(err);

                })


        })

        it('Retrieves a Volume resource based on ID', function(done){

            request
                .get('/'+id)
                .expect(200)
                .expect(function(res){
                    expect(res.body.id).to.equal(id)
                    console.log(res.body.id)
                    console.log(id)
                })
                .end(function (err, res) {
                    done(err);
                })
        })



    })

//    describe('Test Google Books - Bookshelf API', function(){
//
//       request = request(endpoint + '/users/userId/bookshelves')
//
//       it('Test....', function(){
//
//
//    })

})
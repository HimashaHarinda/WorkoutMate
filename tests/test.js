var request = require("request"),
    assert = require('assert'),
    base_url = "http://localhost:3000/";

describe("workoutmate Test", function(){
    describe("GET /", function() {
        it("returns status code 200", function() {
            request.get(base_url, function(error, response, body) {
                
            });
    });
  });
});



const fs = require("fs");
const {
	expect
} = require("chai");
const scrapero = require(__dirname + "/server.js");
const axios = require("axios");

describe("Scrapero API", function() {

	this.timeout(1000 * 5);

	before(function() {
		try {
			fs.unlinkSync(__dirname + "/data/x.json");
			fs.rmdirSync(__dirname + "/data");
		} catch(error) {
			
		}
	});

	after(function() {
		try {
			fs.unlinkSync(__dirname + "/data/x.json");
			fs.rmdirSync(__dirname + "/data");
		} catch(error) {
			throw error;
		}
	});

	it("accepts data", async function() {
		try {

			const {
				app,
				server
			} = await scrapero.start(5788);
			const response = await axios.post("http://127.0.0.1:5788", {
				namespace: "x",
				data: {whatever: "8"}
			});
			const {
				data
			} = response;
			const x = require(__dirname + "/data/x.json");
			expect(x.whatever).to.equal("8");
			server.close();
		} catch (error) {
			//console.error(error);
			server.close();
			throw error;
		}
	});

});
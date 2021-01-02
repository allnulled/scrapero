const fs = require("fs");
const http = require("http");
const path = require("path");
const cors = require("cors");
const express = require("express");
const body_parser = require("body-parser");
const args = require("yargs").argv;
const append_slash = text => text.replace(/\/$/g, "") + "/";

const startScrapero = function(other_port = undefined, other_storage = undefined) {
	const final_port = other_port || args.port || process.env.SCRAPERO_PORT || 9898;
	const storage_path = append_slash(other_storage || args.storage || process.env.SCRAPERO_STORAGE || path.resolve(process.cwd(), "data"));
	const app = express();
	app.use(cors());
	app.use(body_parser.urlencoded({ extended: true, limit: '50mb' }));
	app.use(body_parser.json({ extended: true, limit: '50mb' }));
	app.all("/", function(request, response) {
		try {
			const params = Object.assign({}, request.query, request.body);
			const namezpace = params.namespace;
			const data = typeof(params.data) === "string" ? JSON.parse(params.data) : params.data;
			console.log("[SCRAPERO] received:", namezpace, data);
			if(typeof namezpace === "undefined" || typeof data === "undefined") {
				return response.status(500).json({error: "Required namespace or data"});
			}
			if(!fs.existsSync(storage_path + namezpace + ".json")) {
				fs.writeFileSync(storage_path + namezpace + ".json", "{}", "utf8");
			}
			const current_data = JSON.parse(fs.readFileSync(storage_path + namezpace + ".json").toString());
			const updated_data = Object.assign({}, current_data, data);
			const updated_data_json = JSON.stringify(updated_data, null, 4);
			fs.writeFileSync(storage_path + namezpace + ".json", updated_data_json, "utf8");
			return response.status(200).json({status: "Data inserted successfully"});
		} catch(error) {
			console.error("[SCRAPERO] failed:", error);
			return response.status(500).json({error: "Errors arised", error_data: error});
		}
	});
	return new Promise(function(ok, fail) {
		const server = http.createServer(app);
		if(!fs.existsSync(storage_path)) {
			try {
				fs.mkdirSync(storage_path);
			} catch(error) {
				return fail(new Error("Scrapero could not create a folder at: " + storage_path));
			}
		}
		server.listen(final_port, function(error) {
			if(error) {
				console.error("[SCRAPERO] failed deployment due to:", error);
				return fail(error);
			}
			console.log();
			console.log();
			console.log();
			console.log();
			console.log("[SCRAPERO] * Started listening on port " + final_port);
			console.log("           * Instructions: [ GET | POST ] { namespace , data }");
			console.log(`           * Files at: ${storage_path}`);
			console.log();
			return ok({ app, server });
		});
	});
	return server;
};

module.exports = { start: startScrapero };
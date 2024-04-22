var client

import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json'

import { generateClient } from 'aws-amplify/api';
import { createUserLog } from './graphql/mutations';


export function finish_experiment(){
	show_instructions(0,instructions_text_finished,instructions_urls_finished,function(){
		save(data_log,"fourinarow_data_" + "test" + ".json")
	},"Finish");
}

export function get_image_path(filename){
	return "static/images/" + filename;
}

async function save(data, filename) {
	var blob = new Blob([JSON.stringify(data)], {type: 'text/csv'});
	// var elem = window.document.createElement('a');
	// elem.href = window.URL.createObjectURL(blob);
	// elem.download = filename;
	// document.body.appendChild(elem);
	// elem.click();
	// document.body.removeChild(elem);

	// const result = {
	// 	userLog : JSON.stringify(data)
	// }
	console.log(JSON.stringify(data));
	let formData = new FormData();
	formData.append('data', JSON.stringify(data));

	const newResponse = await fetch("https://decisionstyleapp-c31ebfb6e483.herokuapp.com/updateData", {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		credentials: "include", // include, *same-origin, omit
		body : formData
	})


	// client.graphql({
	// 	query: createUserLog,
	// 	variables: {
	// 		input: result
	// 	}
	// })

	// window.location.href = "https://decisionstyleapp-c31ebfb6e483.herokuapp.com/games"
}

export function log_data(data){
	data["event_time"] = Date.now()
	data["credentials"] = "test"
	console.log(data)
	data_log.push(data)
	console.log(data_log)
}

$(document).ready(function(){
	window.log_data = log_data
	window.finish_experiment = finish_experiment
	window.get_image_path = get_image_path
	Amplify.configure(amplifyconfig)
	client = generateClient()
	// user_credentials = "test"
	//enter_credentials(start_game)
	initialize_task(2,1,start_experiment)
});


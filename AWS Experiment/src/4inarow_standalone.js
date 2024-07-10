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

export async function show_debriefing(){
	$('.overlayed').show()
	$('#debriefing').show()
	await save(data_log,"fourinarow_data_" + "test" + ".json")
}

function generate_random_string(length) {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
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
	user_id = generate_random_string(15);
	const newResponse = await fetch("https://decisionstyleapp-c31ebfb6e483.herokuapp.com/updateDataTurk", {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		// credentials: "include",
		mode: "cors",// include, *same-origin, omit
		headers:{
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-Custom-Header': 'custom-value'
		},
		body : new URLSearchParams({'user_id':user_id,'data': JSON.stringify(data), 'exp_id':'-1'})
	})


	// client.graphql({
	// 	query: createUserLog,
	// 	variables: {
	// 		input: result
	// 	}
	// })

	// window.location.href = "https://decisionstyleapp-c31ebfb6e483.herokuapp.com/games"
}

export function set_user_id(){
	var urlParams = new URLSearchParams(window.location.search);
	var workerID = urlParams.get('workerId');
	if (workerID === null || workerID === undefined || workerID === '')  {
		return;
	}
	console.log(workerID);
	data_log.push({'workerID': workerID});
	user_id = workerID;
}

export function log_data(data){
	data["event_time"] = Date.now()
	data["credentials"] = user_id;
	console.log(data)
	data_log.push(data)
	console.log(data_log)
}

$(document).ready(function(){
	window.log_data = log_data
	window.finish_experiment = finish_experiment
	window.get_image_path = get_image_path
	window.show_debriefing = show_debriefing
	window.set_user_id = set_user_id
	Amplify.configure(amplifyconfig)
	client = generateClient()
	// user_credentials = "test"
	//enter_credentials(start_game)
	initialize_task(10,2,start_experiment)
});


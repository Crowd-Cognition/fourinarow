import {DataStore} from 'aws-amplify/datastore';

function finish_experiment(){
	show_instructions(0,instructions_text_finished,instructions_urls_finished,function(){
		save(data_log,"fourinarow_data_" + user_credentials + ".json")	
	},"Finish");
}

function get_image_path(filename){
	return "static/images/" + filename;
}

async function save(data, filename) {
	var blob = new Blob([JSON.stringify(data)], {type: 'text/csv'});
	var elem = window.document.createElement('a');
	elem.href = window.URL.createObjectURL(blob);
	elem.download = filename;
	document.body.appendChild(elem);
	elem.click();
	document.body.removeChild(elem);

	try{
		const result = await DataStore.save(
			new Data({
				id: Math.random(1, 100000),
				log_data: blob
			})
		)
		console.log("post saved successfully")
	} catch (error) {
		console.log('Error saving post', error)
	}

	try {
		const result = await uploadData({
			key: filename,
			data: blob,
			options: {
				accessLevel: 'guest',
				onProgress
			}
		}).result;
		console.log('Success:', result);
	} catch (error) {
		console.log("error: ", error)
	}
}

function log_data(data){
	data["event_time"] = Date.now()
	data["credentials"] = user_credentials
	console.log(data)
	data_log.push(data)
}

$(document).ready(function(){
	user_credentials = "test"
	//enter_credentials(start_game)
	initialize_task(4,2,start_experiment)
});
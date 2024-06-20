// import {log_data, finish_experiment} from'./4inarow_standalone'
var b,bp,wp,user_color,m,num_games,num_practice_games
var tiles = [];
var game_status = "ready"
//game_status = "ready";
//move_index = 0;
//last_move = 99;
var M=9,N=4
var winning_color = "#22ddaa",
	losing_color = "#aa0000",
	square_color = "#999999",
	highlight_color = "#bbbbbb";
var data_log =[]
var start_category = 1
var dismissed_click_prompt = false;
var lastresult = "win"
var attention_check_games = [1, 5, 8]
const is_second_try = true

function create_board() {
	bp = new Array(M*N).fill(0)
	wp = new Array(M*N).fill(0)
	$(".canvas").empty();
	$(".canvas").append($("<div class='topLeftLabelTitle'></div>"))
	for (var i = 1; i < M + 1 ; i++) {
		$(".canvas").append($("<div class='topLabelTile'><p class='topLabelText'>"+i+"</p></div>"))
	}
	$(".canvas").append("<br>");
	for (i=0; i<N; i++) {
		$(".canvas").append($("<div class='leftLabelTile'> <p class='leftLabelText'>"+ ['a', 'b','c','d'][i]+"</p></div>"))
		for(var j=0; j<M; j++) {
			$(".canvas").append($("<div>", {"class" : "tile", "id": "tile_" + (i*M + j).toString()}))
		}
		$(".canvas").append("<br>");
	}
}

function add_piece(i, color) {
	if(color == 0) {//BLACK
		$("#tile_" + i.toString()).append(
			$("<div>",{"class" : "blackPiece"})
		).removeClass("tile").addClass("usedTile").off('mouseenter').off('mouseleave').css("backgroundColor", square_color);
		bp[i] = 1;
	} else {
		$("#tile_" + i.toString()).append(
			$("<div>",{"class" : "whitePiece"})
		).removeClass("tile").addClass("usedTile").off('mouseenter').off('mouseleave').css("backgroundColor", square_color);
		wp[i] = 1;
	}
}

function remove_piece(i){
	$("#tile_" + i.toString()).empty().removeClass("usedTile").addClass("tile").off().css("backgroundColor", square_color);
	bp[i]=0
	wp[i]=0
}


function show_last_move(i, color) {
	if(color == 0) {//BLACK
		$(".blackShadow").remove();
		$("#tile_" + i.toString()).append($("<div>" , {"class" : "blackShadow"}))
	} else {
		$(".whiteShadow").remove();
		$("#tile_" + i.toString()).append($("<div>" , {"class" : "whiteShadow"}))
	}
}

function check_win(color){
	fourinarows = [[ 0,  9, 18, 27],
				   [ 1, 10, 19, 28],
				   [ 2, 11, 20, 29],
				   [ 3, 12, 21, 30],
				   [ 4, 13, 22, 31],
				   [ 5, 14, 23, 32],
				   [ 6, 15, 24, 33],
				   [ 7, 16, 25, 34],
				   [ 8, 17, 26, 35],
				   [ 0, 10, 20, 30],
				   [ 1, 11, 21, 31],
				   [ 2, 12, 22, 32],
				   [ 3, 13, 23, 33],
				   [ 4, 14, 24, 34],
				   [ 5, 15, 25, 35],
				   [ 3, 11, 19, 27],
				   [ 4, 12, 20, 28],
				   [ 5, 13, 21, 29],
				   [ 6, 14, 22, 30],
				   [ 7, 15, 23, 31],
				   [ 8, 16, 24, 32],
				   [ 0,  1,  2,  3],
				   [ 1,  2,  3,  4],
				   [ 2,  3,  4,  5],
				   [ 3,  4,  5,  6],
				   [ 4,  5,  6,  7],
				   [ 5,  6,  7,  8],
				   [ 9, 10, 11, 12],
				   [10, 11, 12, 13],
				   [11, 12, 13, 14],
				   [12, 13, 14, 15],
				   [13, 14, 15, 16],
				   [14, 15, 16, 17],
				   [18, 19, 20, 21],
				   [19, 20, 21, 22],
				   [20, 21, 22, 23],
				   [21, 22, 23, 24],
				   [22, 23, 24, 25],
				   [23, 24, 25, 26],
				   [27, 28, 29, 30],
				   [28, 29, 30, 31],
				   [29, 30, 31, 32],
				   [30, 31, 32, 33],
				   [31, 32, 33, 34],
				   [32, 33, 34, 35]]
	
	for(var i=0;i<fourinarows.length;i++){
		var n = 0;
		for(var j=0;j<N;j++){
			if(color==0)//BLACK
				n+=bp[fourinarows[i][j]]
			else
				n+=wp[fourinarows[i][j]]
		}
		if(n==N)
			return fourinarows[i]
	}
	return []
}

function check_draw(){
	for(var i=0; i<M*N; i++)
		if(bp[i]==0 && wp[i]==0)
			return false;
	return true;
}

function show_win(color, pieces, to_color) {
	for(i=0; i<pieces.length; i++){
		if(color==0)
			$("#tile_" + pieces[i] + " .blackPiece").animate({"backgroundColor": to_color}, 250)
		else
			$("#tile_" + pieces[i] + " .whitePiece").animate({"backgroundColor": to_color}, 250)
	}
}

function user_move(game_num) {
	color_string = (user_color == 0 ? 'black' : 'white')
	window.log_data({"event_type": "your turn", "event_info" : {"bp" : bp.join(""), "wp": wp.join(""), "user_color" : color_string}})
	$('.headertext h1').text('Your turn. You play ' + color_string + ".");
	$('.canvas, .tile').css('cursor', 'pointer');
	$('.usedTile, .usedTile div').css('cursor', 'default');
	$('.tile').off().on('mouseenter', function(e){ 
		$(e.target).animate({"background-color":highlight_color}, 50)
	}).on('mouseleave', function(e){ 
		$(e.target).animate({"background-color": square_color}, 50)
	});
	$('.tile').off('click').on('click', function(e){
		$('.tile').off('mouseenter').off('mouseleave').off('click');
		$('.canvas, .canvas div').css('cursor', 'default');
		tile_ind = parseInt(e.target.id.replace("tile_", ""));
		window.log_data({"event_type": "user move", "event_info" : {"tile" : tile_ind, "bp" : bp.join(""), "wp": wp.join(""), "user_color" : color_string}})
		add_piece(tile_ind,user_color);
		show_last_move(tile_ind, user_color);
		$(".clickprompt").hide();
		dismissed_click_prompt = true;
		winning_pieces = check_win(user_color)
		if(winning_pieces.length==N){
			show_win(user_color,winning_pieces, winning_color)
			window.log_data({"event_type": "user win", "event_info" : {"bp" : bp.join(""), "wp": wp.join(""), "winning_pieces" : winning_pieces, "user_color" : color_string}})
			$('.headertext h1').text('Game over, you win').css('color', '#000000');
			end_game(game_num,'win')
		}
		else if (check_draw()){
			window.log_data({"event_type": "draw", "event_info" : {"bp" : bp.join(""), "wp": wp.join(""), "user_color" : color_string}})
			$('.headertext h1').text('Game over, draw').css('color', '#000000');
			end_game(game_num,'draw')
		}
		else {
			make_opponent_move(game_num)
		}
	});
}

function make_opponent_move(game_num) {
	opponent_color = (user_color+1)%2
	color_string = (opponent_color == 0 ? 'black' : 'white')
	window.log_data({"event_type": "waiting for opponent", "event_info" : {"bp" : bp.join(""), "wp": wp.join(""), "opponent_color" : color_string}})
	$('.headertext h1').text('Waiting for opponent').css('color', '#333333');
	setTimeout(function(){
		seed = Date.now()
		tile_ind = makemove(seed,bp.join(""),wp.join(""),opponent_color,level);
		setTimeout(function(){
			window.log_data({"event_type": "opponent move", "event_info" : {"tile" : tile_ind, "bp" : bp.join(""), "wp": wp.join(""), "level" : level, "opponent_color" : color_string}})
			add_piece(tile_ind,opponent_color);
			show_last_move(tile_ind, opponent_color);
			winning_pieces = check_win(opponent_color)
			if(winning_pieces.length==N){
				window.log_data({"event_type": "opponent win", "event_info" : {"bp" : bp.join(""), "wp": wp.join(""), "winning_pieces" : winning_pieces, "opponent_color" : color_string}})
				show_win(opponent_color,winning_pieces, losing_color)
				$('.headertext h1').text('Game over, you lose').css('color', '#000000');
				end_game(game_num, 'opponent win')
			}
			else if (check_draw()){
				window.log_data({"event_type": "draw", "event_info" : {"bp" : bp.join(""), "wp": wp.join(""), "opponent_color" : color_string}})
				$('.headertext h1').text('Game over, draw').css('color', '#000000');
				end_game(game_num, 'draw')
			}
			else {
				user_move(game_num)
			}
		},1000);
	},0)
}

function start_game(game_num){
	$("#attention_button_col").hide();
	window.log_data({"event_type": "start game", "event_info" : {"game_num" : game_num}})
	create_board()
	level = (category-1)*40 + Math.floor(Math.random()*40)
	if(game_num<num_practice_games){
		$('.gamecount').text("Practice game " + (game_num+1).toString() + " out of " + num_practice_games.toString());
	}
	else{
		$('.gamecount').text("Game " + (game_num-num_practice_games+1).toString() + " out of " + num_games.toString());
	}
	if (!dismissed_click_prompt) $('.clickprompt').show();
	window.log_data({"event_type": "start game", "event_info": {"game_num": game_num, "is_practice": game_num<num_practice_games, "level": level, "user_color" : (user_color == 0 ? 'black' : 'white')}})
	if(user_color==0)
		user_move(game_num)
	else
		make_opponent_move(game_num)
}

function adjust_level(result){
	old_level = level
	if(result=='win'){
		if(lastresult=='win'){
			category = Math.min(category+1,5)
		}
	}
	if(result=='opponent win')
		category=Math.max(category-1,1)
	lastresult = result	
	window.log_data({"event_type": "adjust level", "event_info" : {"category" : category}})
}

function end_game(game_num,result){
	window.log_data({"event_type": "end game", "event_info" : {"game_num" : game_num, "result" : result,"level" : level}})
	adjust_level(result)
	$("#nextgamebutton").show().css({"display" :"inline"}).off("click").on("click",function(){
		$("#nextgamebutton").hide()
		user_color = (user_color+1)%2
		$(".canvas").empty();
		if(game_num == num_practice_games + num_games-1){
			if (is_second_try) {
				create_questionnaire(0)
			}
			else {
				window.finish_experiment()
			}
		}
		else if (game_num == num_practice_games -1){
			show_instructions(0,instructions_text_after_practice,instructions_urls_after_practice,function(){
				start_game(game_num+1)
			},"Start")
		}
		else{
			if (attention_check_games.includes(game_num - num_practice_games)){
				show_attention_check(attention_check_games.indexOf(game_num - num_practice_games), game_num + 1)
			} else {
				start_game(game_num + 1)
			}
		}
	})
}

function show_instructions(i,texts,urls,callback,start_text){
	window.log_data({"event_type": "show instructions", "event_info" : {"screen_number": i}})
	category = start_category
	$('.overlayed').show();
	$('#instructions').show();
	$('#instructions p').remove();
	$('#instructions_text').empty();
	$('#instructions_text').append("<p style='width: 100%'>"+texts[i]+"</p>");
	if(urls[i]==""){
		$('#instructions img').hide()
		$('#instructions_text').css({"align-items": "center", "vertical-align": "middle", "height": '80%'})
	}
	else{
		$('#instructions_text').css({"height": '10%'})
		$('#instructions img').show().attr("src",window.get_image_path(urls[i] + ".png"));
	}
	if(i==0){
		$('#previousbutton').hide()
	}
	else {
		$('#previousbutton').show().off("click").on("click",function(){
			show_instructions(i-1,texts,urls,callback,start_text);
		});
	}
	if(i == texts.length - 1 || i == urls.length - 1){
		$('#nextbutton').text(start_text)
		$('#nextbutton').off("click").on("click",function(){
			$('#instructions').hide();
			$('.overlayed').hide();
			callback();
		})
	}
	else {
		$('#nextbutton').text("Next")
		$('#nextbutton').off("click").on("click",function(){
			show_instructions(i+1,texts,urls,callback,start_text);
		});
	}
}

function attention_answered(is_correct, attention_id, game_number) {
	log_data({"event_type": "attention_answered", "event_info" : {"was_correct": is_correct, "attention_id": attention_id}});
	$('#next_game_col').show();
	$('#attention_button_col').hide();
	start_game(game_number)
}

function show_attention_check(attention_id, game_number) {
	black_coords = ['111001111111110110111111111010011011', '000000010101000000000100000001000000',
		'111111011101101111111111111111110101', '011111011010111101101111100110001111',
		'000001010000000000100001000001000001']
	right_answers = [true, true, true, false, false]
	create_board()
	selected_coord = black_coords[attention_id];
	right_answer = right_answers[attention_id];
	for(let i=0; i < selected_coord.length;i++){
		console.log(selected_coord[i])
		if(selected_coord[i] == 1) {//BLACK
			$("#tile_" + i.toString()).append(
				$("<div>",{"class" : "blackPiece"})
			).removeClass("tile").addClass("usedTile").off('mouseenter').off('mouseleave').css("backgroundColor", square_color);
		} else if (selected_coord[i] == 0) {
			$("#tile_" + i.toString()).append(
				$("<div>",{"class" : "whitePiece"})
			).removeClass("tile").addClass("usedTile").off('mouseenter').off('mouseleave').css("backgroundColor", square_color);
		}
	}
	$(".gamecount").text("");
	$("#next_game_col").hide();
	$('#attention_button_col').show();
	$('.headertext h1').text('Which color has more pieces on the board');
	$('#blackGameButton').off("click").on("click", function(){
		attention_answered(right_answer, attention_id, game_number)
	})
	$('#whiteGameButton').off("click").on("click", function(){
		attention_answered(!right_answer, attention_id, game_number)
	})
}

function initialize_task(_num_games,_num_practice_games,callback){
	num_games = _num_games
	num_practice_games = _num_practice_games
	user_color = 0
	instructions_text = ["You will be playing a board game called 4-in-a-row.</br> </br>" +
							" You will be playing for a few rounds.</br></br>" +
							" Your opponent in this game is the computer.",
						 "In this game, you and the computer place black or white pieces on a game board.",
						 "The goal of the game is to place 4 pieces of your playing color in one consecutive line while preventing the opponent from placing their own 4-piece in line.",
						 "The 4-piece line can be <b><u>horizontal</u></b>, <b><u>vertical</u></b>, or <b><u>diagonal</u></b>",
						 "If the computer gets 4-in-a-row before you do, you <b><u>lose</u></b>",
						 "If the board without any 4-piece line, it is a <b><u>tie</u></b>",
						 "Your playing color will change after each round. </br> </br> (You will be white if you were black in the last game)",
						 "First, You will play " + _num_practice_games.toString() + " practice games. Click \"Start\" to begin."
						 ]

	instructions_urls = ["",
						 "black-about-to-win",
						 "black-won",
						 "three-win",
						 "opponent-win",
						 "draw",
						 "",
						 ""]
	instructions_text_after_practice = ["You will now play " + num_games.toString() + " games"]
	instructions_urls_after_practice = [""]

						 
	instructions_text_finished = ["Thank you for playing!"]

	instructions_urls_finished = [""]
	callback()
}

async function start_experiment(){
	makemove = Module.cwrap('makemove', 'number', ['number','string','string','number','number'])
	$(document).on("contextmenu",function(e){
		e.preventDefault()
	})
	$('#instructions').hide();
	$('.overlayed').hide();
	category = start_category
	// const userResponse = await fetch("https://decisionstyleapp-c31ebfb6e483.herokuapp.com/user", {
	// 	method: "GET",
	// 	credentials: "include"// *GET, POST, PUT, DELETE, etc.
	// })

	// const newResponse = await fetch("https://decisionstyleapp-c31ebfb6e483.herokuapp.com/user", {
	// 	method: "GET", // *GET, POST, PUT, DELETE, etc.
	// 	credentials: "include", // include, *same-origin, omit
	// })

	// if (newResponse.status===401) {
	// 	window.location.href = "https://gleaming-sarong-crab.cyclic.app/login"
	// }

	// const newPostResponse = await fetch("https://gleaming-sarong-crab.cyclic.app/user", {
	// 	method: "POST", // *GET, POST, PUT, DELETE, etc.
	// 	credentials: "include", // include, *same-origin, omit
	//
	// })
	// console.log(newResponse.headers)
	// start_game(0)
	// create_questionnaire(2);
	// show_instructions(0,instructions_text,instructions_urls,function(){
	// 	start_game(0)
	// },"Start")

	$('.overlayed').show();
	$('#consent_popup').show();
}

async function consented() {
	$('#consent_popup').hide()
	$('#instructions').show();
	show_instructions(0,instructions_text,instructions_urls,function(){
		start_game(0)
	},"Start")
	// render_demography()
}


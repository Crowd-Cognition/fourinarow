var resp_est = {
    type: "survey-multi-choice",
    preamble: "Please answer the following questions.",
    questions: [

        {
            prompt: "How responsible did you feel for the development of i-sight's new device?",
            name: 'Resp_est',
            options: ['Not at All', 'A Little', 'Quite a Lot', 'A Lot', 'Very Much'],
            required: true
        },

        {
            prompt: "How afraid were you of making mistakes?",
            name: 'Err_est',
            options: ['Not at All', 'A Little', 'Quite a Lot', 'A Lot', 'Very Much'],
            required: true
        },

        {
            prompt: "Did you think that your performance would impact the development of isight's new device?",
            name: 'Err_est',
            options: ['Not at All', 'A Little', 'Quite a Lot', 'A Lot', 'Very Much'],
            required: true
        }
    ]
}

var question1 = {
    type: "survey-multi-choice",
    preamble: 'The following statements refer to thoughts and behaviors which may occur to everyone in everyday life. For each statement, Choose the reply which best seems to fit you and the degree of disturbance which such thoughts or behaviors may create.',
    questions: [

        {
            prompt: "I try to put off making decisions.",
            name: '1',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "I always know exactly what I want.",
            name: '2',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "I find it easy to make decisions.",
            name: '3',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "I have a hard time planning my free time.",
            name: '4',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "I like to be in a position to make decisions.",
            name: '5',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "Once I make a decision, I feel fairly confident that it is good one.",
            name: '6',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "When ordering form a menu, I usually find it difficult to decide what to eat.",
            name: '7',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "I usually make decisions quickly.",
            name: '8',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        }
    ],
};

var question2 = {
    type: "survey-multi-choice",
    questions: [

        {
            prompt: "Once I make a decision, I stop worrying about it.",
            name: '9',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "I become anxious when making a decision.",
            name: '10',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "I often worry about making a wrong decision.",
            name: '11',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "After I have chosen or decided something, I often believe I've made the wrong choice or decision.",
            name: '12',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "I do not get assignments done on time because I cannot decide what to do first.",
            name: '13',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "I have trouble completing assignments because I can't prioritize what is most important.",
            name: '14',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        },
        {
            prompt: "It seems that deciding on the most trivial thing takes me a long time",
            name: '15',
            options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
            required: true
        }
    ],
};

var questionnaires = [question1, question2]

function send_questionnaire_data(questionnaire_id) {

    for (var q_id in questionnaires[questionnaire_id].questions){
        const question_name = "questionnaire" + questionnaire_id + "_" + q_id
        if ($('input[name='+question_name+']:checked').length == 0){
            alert("No choice is selected for one of the questionnaire questions" + question_name)
            return;
        }
    }
    var responses = []
    for (var q_id in questionnaires[questionnaire_id].questions) {
        const question_name = "questionnaire" + questionnaire_id + "_" + q_id
        var input_value = $('input[name='+question_name+']:checked').val()
        responses.push(input_value)
    }
    $('#questionnaire_body').empty()
    log_data({"event_type": "did_questionnaire", "event_info" : {
            "questionnaire_id": questionnaire_id,
            "inputs": responses
        }})
    if (questionnaire_id < questionnaires.length - 1) {
        create_questionnaire(questionnaire_id + 1)
    } else {
        window.show_debriefing()
    }
}

function create_questionnaire(questionnaire_id) {

    let body = $('#questionnaire_body')
    $('#main_game').hide()
    // $body.empty()
    var preamble_text = $('<h2></h2>').text(questionnaires[questionnaire_id].preamble);
    body.append(preamble_text)
    body.append($('<br><br>'))
    for (var q_id in questionnaires[questionnaire_id].questions) {
        var question = questionnaires[questionnaire_id].questions[q_id];
        let text = $('<p></p>').text(question.prompt).css('font-size', '2.5vh');
        text.addClass('text-left');
        body.append(text);
        const question_name = "questionnaire" + questionnaire_id + "_" + q_id
        var form_group = $('<div> </div>').addClass('form_group media-left');
        for (var o_id in question.options) {
            var option = question.options[o_id];
            var optionDiv = $('<div></div>').addClass('form-check media-left')
            var optionInput = $('<input>').addClass('form-check-input').css({'text-align':'left'})
                .attr('type', 'radio').attr('name', question_name).attr('id',question_name+"_"+o_id).attr('value', o_id)
            var optionLabel = $('<label></label>').addClass('form-check-label')
                .attr('for',question_name+"_"+o_id).text(option).css({'text-align':'left'})
            optionDiv.append(optionInput)
            optionDiv.append(optionLabel)
            form_group.append(optionDiv)
            form_group.append($('<br>'))
        }
        body.append(form_group)
    }
    var next_button = $('<button> </button>').addClass('mybutton').attr('type', 'button').attr('id', 'form_next')
        .css({'transform':'translate(100%,0%)'});
    if (questionnaire_id == questionnaires.length - 1) {
        next_button.text('Submit')
    } else {
        next_button.text('Next')
    }
    next_button.off("click").on("click", function() {
        send_questionnaire_data(questionnaire_id)
    })
    body.append(next_button)
}
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
    preamble: '<p> The following statements refer to thoughts and behaviors which may occur to everyone in everyday life.  <p> For each statement, Choose the reply which best seems to fit you and the degree of disturbance <p> which such thoughts or behaviors may create.',
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

var questionnaires = [resp_est, question1, question2]

function create_questionnaire(id) {
    let body = $('.questionnaire_body')
    console.log(questionnaires[id].questions)
    // $body.empty()
    for (var q_id in questionnaires[id].questions) {
        var question = questionnaires[id].questions[q_id];
        console.log(question.name)
        console.log(question.prompt)
        let text = $('<p></p>').text(question.prompt);
        body.append(text);
        const question_name = "\"questionnaire" + id + "_" + q_id + "\""
        for (var o_id in question.options) {
            console.log(o_id)
            var option = question.options[o_id];
            var optionDiv = $('<div></div>').addClass('form-check')
            var optionInput = $('<input>').addClass('form-check-input')
                .attr('type', 'radio').attr('name', question_name).attr('id',question_name+"_"+o_id)
            var optionLabel = $('<label></label>').addClass('form-check-label')
                .attr('for',question_name+"_"+o_id).text(option)
            optionDiv.append(optionInput)
            optionDiv.append(optionLabel)
            body.append(optionDiv)
        }
        console.log(body);
    }
}
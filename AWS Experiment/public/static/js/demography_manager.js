var demography_multiple_choice = [
    {
        prompt: 'What is your gender?',
        options: ['Man', 'Woman', 'Non-binary', 'Prefer not to say'],
        required: true
    },
    {
        prompt: 'What is your highest completed education level?',
        options: [
            'No schooling completed',
            'Primary education (age: 5–10)',
            'Secondary education (age: 11–17)',
            'University undergraduate degree/professional equivalent',
            'Postgraduate degree',
            'Prefer not to say'
        ],
        required: true
    }
]

function check_demography(){
    // check if all demography questions are answered
    for (var q_id in demography_multiple_choice){
        const question_name = "demo" + "_" + q_id
        if ($('input[name='+question_name+']:checked').length == 0){
            alert("No choice is selected for one of the questionnaire questions")
            return;
        } else {
            console.log($('input[name='+question_name+']:checked').val())
        }
    }
    var age = $('#year_input').val()
    if (age==="") {
        alert("Please select an age")
        return;
    }

    // log demography data
    var question_name = "demo" + "_" + 0
    var gender_val = $('input[name='+question_name+']:checked').val()
    question_name = "demo" + "_" + 1
    var education_val = $('input[name='+question_name+']:checked').val()
    window.log_data({"event_type": "fill demography", "event_info":
            {"gender": gender_val,
            "education": education_val,
            "age": age}})

    // go to the instructions
    $('#demography_popup').hide();
    show_instructions(0,instructions_text,instructions_urls,function(){
        	start_game(0)
        },"Start")
}


function render_demography() {
    window.log_data({"event_type": "show demography"})
    $('#demography_popup').show();
}

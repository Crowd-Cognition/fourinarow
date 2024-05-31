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
        const question_name = "questionnaire" + "_" + q_id
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
    var question_name = "questionnaire" + "_" + 0
    var gender_val = $('input[name='+question_name+']:checked').val()
    question_name = "questionnaire" + "_" + 1
    var education_val = $('input[name='+question_name+']:checked').val()
    window.log_data({"event_type": "fill demography", "event_info":
            {"gender": gender_val,
            "education": education_val,
            "age": age}})

    // go to the instructions

}

function render_demography(texts,urls,callback,start_text) {
    window.log_data({"event_type": "show instructions", "event_info" : {"screen_number": i}})
    window.log_data({"event_type": "show demography"})
    let body = $('<div></div>').addClass('container')
    $('#instructions p').remove();
    // $('#instructions').hide();
    $('#instructions h4').show().text('Demography Questions');
    $('#instructions img').hide();
    body.empty()
    body.append($('<h5></h5>').text('Before going further, please answer the questions below:').css('text-align', 'left'
    ));
    for (var q_id in demography_multiple_choice) {
        var question = demography_multiple_choice[q_id]
        let text = $('<p></p>').text(question.prompt).css({'margin-left': '0%', 'font-size':'2vh'});
        body.append(text);
        const question_name = "questionnaire" + "_" + q_id
        var form_group = $('<div> </div>').addClass('form_group media-left');

        for (var o_id in question.options) {
            var option = question.options[o_id];
            var optionDiv = $('<div></div>').addClass('form-check')
            optionDiv.addClass('media-left')
            var optionInput = $('<input>').addClass('form-check-input').css({'text-align':'left'})
                .attr('type', 'radio').attr('name', question_name).attr('id',question_name+"_"+o_id).attr('value',o_id)
            var optionLabel = $('<label></label>').addClass('form-check-label')
                .attr('for',question_name+"_"+o_id).text(option).css({'margin-left': '5px'})
            optionDiv.append(optionInput)
            optionDiv.append(optionLabel)
            if (q_id != 0) optionDiv.css({'display':'table'})
            form_group.append(optionDiv)
        }
        body.append(form_group)
    }
    body.append($('<br>'))
    var year_block = $('<div> </div>').addClass('form-inline media-left');
    var year_question = $('<label></label>').text('What is your age?').attr('style', 'margin-left:0%').attr('for','year_input');
    year_block.append(year_question);
    var year_input = $('<input>').addClass('form-control').attr('id', 'year_input').attr('type', 'number').
    css({'style':'display:table-cell', 'margin-left':'5px'});
    year_block.append(year_input);
    body.append(year_block);
    $('#instructions').append(body)
    $('#nextbutton').off("click").on("click", function() {
        check_demography()
        // show_instructions(1,texts,urls,callback,start_text);
    }).text('Next')
}

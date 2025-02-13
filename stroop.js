var jsPsych = initJsPsych();

var timeline = [];

var start_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Press any key when ready for the next trial."
};
timeline.push(start_trial);

var judgment_trials = {
    type: jsPsychHtmlButtonResponse,
    // prompt: '<p>Press any key when ready for the next trial.</p>',
    timeline: [
        {
            type: jsPsychHtmlKeyboardResponse, 
            stimulus: "Press any key when ready for the next trial.",
            choices: "ALL_KEYS"
        },
        {
            type: jsPsychHtmlButtonResponse,
            stimulus: function(){
                let word = jsPsych.timelineVariable('word')
                let color = jsPsych.timelineVariable('color')
                return `<p style="color:${color}; font-size:40px;">${word}</p>`;
            },
            choices: ['MATCH', 'NOT'],
            data: function() {
                let word = jsPsych.timelineVariable('word');
                let color = jsPsych.timelineVariable('color');
                return {
                    // word: word,
                    // color: color,
                    congruent: word === color  //true if correct, false if not
                };
            },
        }
    ],
    
    timeline_variables: [
            { word: "red", color: "red" },
            { word: "red", color: "blue" },
            { word: "red", color: "green" },
            { word: "blue", color: "blue" },
            { word: "blue", color: "red" },
            { word: "blue", color: "green" },
            { word: "green", color: "green" },
            { word: "green", color: "red" },
            { word: "green", color: "blue" }
    ],
    randomize_order: true
};
timeline.push(judgment_trials)

const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "xte9VlHVTxVU",
    filename: filename,
    data_string: ()=>jsPsych.data.get().csv()
  };

  timeline.push(save_data)
jsPsych.run(timeline)
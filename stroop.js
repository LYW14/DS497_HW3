var jsPsych = initJsPsych();

var timeline = [];

// var start_trial = {
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: "Press any key when ready for the next trial."
// };
// timeline.push(start_trial);
var timeline_variables = [
    { word: "red", color: "red" },
    { word: "red", color: "blue" },
    { word: "red", color: "green" },
    { word: "blue", color: "blue" },
    { word: "blue", color: "red" },
    { word: "blue", color: "green" },
    { word: "green", color: "green" },
    { word: "green", color: "red" },
    { word: "green", color: "blue" }
]
var tvTwice = timeline_variables.concat(timeline_variables);
var judgment_trials = {
    type: jsPsychHtmlButtonResponse,
    timeline_variables: tvTwice,  // Use duplicated list
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
    randomize_order: true
};
timeline.push(judgment_trials)

// const subject_id = jsPsych.randomization.randomID(10);
const filename = 'HW3_data.csv';

const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "xte9VlHVTxVU",
    filename: filename,
    data_string: ()=>jsPsych.data.get().csv(),
    on_finish: function(data){alert(data.result.message)}
  };

//   timeline.push(save_data)
jsPsych.run(timeline, save_data)
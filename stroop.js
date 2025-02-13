const colors = ["red", "blue", "green"];
const words = ["red", "blue", "green"];

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
            type: jsPsychHtmlButtonResponse,
            stimulus: function(){
                let word = jsPsych.timelineVariable('word')
                let color = jsPsych.timelineVariable('color')
                return `<p style="color:${color}; font-size:40px;">${word}</p>`;
            },
            choices: ['MATCH', 'NOT']
            // trial_duration: 2500
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
}
// timeline.push(trial_1);

var trial_1 = {
    type: jsPsychHtmlButtonResponse, //should be button press
    stimulus: 'This is trial 2.'
}
// timeline.push(trial_2);
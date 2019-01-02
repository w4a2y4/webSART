/****************************** define stimulus ******************************/


var instructions = {
    start: {
        stimulus: '<h2>實驗驗說明完畢。 </h2>'
            + '<h2>準備好後請按下Continue以開始實驗。<br/><br/><br/></h2>'
    },
    ready: {
        stimulus: '<h1><i>請稍事休息或繼續實驗</i><br/><br/><br/></h1>'
    },
    intro: [
        {
            stimulus: '<h2>感謝您參加本實驗!</h2>'
                + '<h2>於以下實驗中，您將會看到不同的數字呈現在螢幕中央。</h2>'
                + '<h2>當數字出現時，請盡可能【迅速且正確】地按下螢幕下方的按鈕。</h2>'
                + '<h2 style="color: red">然而若是看到數字【3】請不要按下任何按鈕!<br/><br/><br/></h2>'
        },
        {
            stimulus: '<h2>過程中偶爾會出現以下問句:</h2>'
                + '<img src="img/probe/Probe1.jpg" style="height: 50vh"/>'
                + '<h2>請您依這段時間的實際狀態，進行選擇。<br/><br/><br/></h2>'
        },
        {
            stimulus: '<h2>也會出現以下問句:</h2>'
                + '<img src="img/probe/Probe1.jpg" style="height: 50vh"/>'
                + '<h2>請您依這段時間的實際感受，進行選擇。<br/><br/><br/></h2>'
        },
        {
            stimulus: '<h2>當您看到以下指示時:</h2>'
                + '<h1><br/><i>" 請稍事休息或繼續實驗 "</i><br/><br/></h1>'
                + '<h2>表示現在是可以休息的時間。</h2>'
                + '<h2>您可以選擇稍事<span style="color: red">休息1~2分鐘</span>， </h2>'
                + '<h2>或是直接繼續實驗。<br/><br/><br/></h2>'
        }
    ],
    probe: [
        {
            type: "image-keyboard-response",
            stimulus: "img/probe/Probe1.jpg",
            choices: ["1", "2", "3"],
        },
        {
            type: "image-keyboard-response",
            stimulus: "img/probe/Probe2.jpg",
            choices: ["1", "2", "3", "4", "5", "6", "7"],
        }
    ],
    end: {
        stimulus: '<h2>本階段實驗結束，謝謝您的參與。<h2/>'
            + '<p>(請通知主試者)<br/><br/><br/></p>'
    },
    pre_sleep: {
        type: "image-keyboard-response",
        stimulus: "img/preSleepiness.jpg",
        choices: ["1", "2", "3", "4"]
    },
    post_sleep: {
        type: "image-keyboard-response",
        stimulus: "img/postSleepiness.jpg",
        choices: ["1", "2", "3", "4"]
    }
}

var target_stumuli = {
    stimulus: "<h1>3</h1>",
    data: { correct_response: null, isTarget: true }
}

var non_target_stimuli = [];
for (var i = 0; i < 10; i++) {
    if (i == 3) continue;
    non_target_stimuli.push({
        stimulus: "<h1>" + i + "</h1>",
        data: { correct_response: '0', isTarget: false }
    });
}

var probe_attention = {
    type: 'survey-multi-choice',
    questions: [{
        prompt: '<h2>請問你前15秒鐘的時間內，腦海正在想些什麼?</h2>',
        options: [
            '1 專注在這個作業上',
            '2 被別的刺激分心',
            '3 在思考與作業無關的事情'
        ]
    }],
}

var probe_performance = {
    type: 'survey-likert',
    questions: [{
        prompt: '<h2>呈上題，你覺得自己在那前15秒鐘的作業表現如何?</h2>1 相當不好 <-> 7 相當好',
        labels: ['1', '2', '3', '4', '5', '6', '7']
    }],
}

var pre_sleep = {
    type: 'survey-likert',
    questions: [{
        prompt: '<h2>實驗正式開始前，請問你現在的睏睡程度如何?</h2>1 完全不睏睡 <-> 4 相當睏睡',
        labels: ['1', '2', '3', '4']
    }],
}

var post_sleep = {
    type: 'survey-likert',
    questions: [{
        prompt: '<h2>請問你現在的睏睡程度如何?</h2>1 完全不睏睡 <-> 4 相當睏睡',
        labels: ['1', '2', '3', '4']
    }],
}
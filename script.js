$(document).ready(function() {
    const questions = [
        {
            question: "Is there a class that you DON'T want to play?",
            choices: ["Druid", "Hunter", "Mage", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"],
            type: "multiple"
        },
        {
            question: "Do you want to heal?",
            choices: [
                "Yes I mainly want to heal 😇", 
                "It would be nice to be able to heal sometimes so I can find groups faster",
                "I don't care about healing"],
            type: "single"
        },
        {
            question: "Do you want to tank?",
            choices: ["Yes I want to main tank and be the best tank 🛡️", 
            "It would be nice to be able to tank sometimes so I can find groups faster", 
            "I don't care about tanking"],
            type: "single"
        },
        {
            question: "Do you care about topping dps meters in pve?",
            choices: ["It's all I care about", 
            "I want to at least have a viable dps spec", 
            "I don't care"],
            type: "single"
        },
        {
            question: "Does the leveling experience matter to you?",
            choices: ["It's all I care about and won't be doing endgame content", 
            "Leveling is more important, but I'll still play endgame content", 
            "Leveling is as important as endgame",
            "No, I wouldn't mind auto attacking for 200 hours"],
            type: "single"
        },
        {
            question: "Do you want to pvp?",
            choices: ["Yes, all the time", 
            "Yes, but it's not a priority",
            "No"],
            type: "single"
        }
    ];

    let scores = {
        Druid: 0,
        Hunter: 0,
        Mage: 0,
        Paladin: 0,
        Priest: 0,
        Rogue: 0,
        Shaman: 0,
        Warlock: 0,
        Warrior: 0
    }

    let currentQuestion = 0


    function loadQuestion() {
        const question = questions[currentQuestion];
        $('#question').text(question.question);
        $('#choices').empty();

        // Render choices based on question type
        for (let i = 0; i < question.choices.length; i++) {
            if (question.type === "single") {
                $('#choices').append(`
                    <label>
                        <input type="radio" name="choice" value="${i}"> 
                        ${question.choices[i]}
                    </label><br>
                `);
            } else if (question.type === "multiple") {
                $('#choices').append(`
                    <label>
                        <input type="checkbox" name="choice" value="${i}"> 
                        ${question.choices[i]}
                    </label><br>
                `);
            }
        }
    }

    function checkAnswer() {


        var selectedValues = (questions[currentQuestion].type == "multiple") ? 
            $('input[type="checkbox"]:checked').map(function() {
                return this.value;
            }).get() :
            $('input[name="choice"]:checked').val()

        if (currentQuestion == 0){
            selectedValues.forEach((value, key) => {
                c = questions[currentQuestion].choices[value]
                scores[c] = scores[c] - 100
            });
        }
        // heal
        if (currentQuestion == 1){
            if (selectedValues == 0){
                scores.Druid += 1
                scores.Hunter -= 100
                scores.Mage -= 100
                scores.Paladin += 1
                scores.Priest += 1
                scores.Rogue -= 100
                scores.Shaman += 1
                scores.Warlock -= 100
                scores.Warrior -= 100
            }
            if (selectedValues == 1){
                scores.Druid += 1
                scores.Paladin += 1
                scores.Priest += 1
                scores.Shaman += 1
            }
        }
        // tank
        if (currentQuestion == 2){
            if (selectedValues == 0){
                scores.Druid -= 100
                scores.Hunter -= 100
                scores.Mage -= 100
                scores.Paladin -= 100
                scores.Priest -= 100
                scores.Rogue -= 100
                scores.Shaman -= 100
                scores.Warlock -= 100
                scores.Warrior += 1
            }
            if (selectedValues == 1){
                scores.Druid +1
                scores.Paladin +1
                scores.Warrior +1
            }
        }
        // dps
        if (currentQuestion == 3){
            if (selectedValues == 0){
                scores.Druid -= 100
                scores.Hunter -= 100
                scores.Mage += 1
                scores.Paladin -= 100
                scores.Priest -= 100
                scores.Rogue += 1
                scores.Shaman -= 100
                scores.Warlock += 1
                scores.Warrior += 2
            }
            if (selectedValues == 1){
                scores.Paladin -= 100
            }
        }
        // leveling
        if (currentQuestion == 4){
            if (selectedValues == 0){
                scores.Druid += 1
                scores.Hunter += 1
                scores.Mage += 1
                scores.Paladin -= 100
                scores.Priest -= 100
                scores.Rogue -= 100
                scores.Shaman -= 100
                scores.Warlock += 1
                scores.Warrior -= 100
            }
            if (selectedValues == 1){
                scores.Druid += 2
                scores.Hunter += 2
                scores.Mage += 2
                scores.Paladin -= 100
                scores.Priest += 1
                scores.Rogue += 1
                scores.Shaman += 1
                scores.Warlock += 1
            }
            if (selectedValues == 2){
                scores.Paladin -= 100
            }
        }
        // pvp
        if (currentQuestion == 5){
            if (selectedValues == 0){
                scores.Druid += 1
                scores.Hunter += 1
                scores.Mage += 1
                scores.Paladin += 1
                scores.Priest += 1
                scores.Rogue += 2
                scores.Warlock += 2
                scores.Warrior += 1
            }
        }
        

        console.log(scores)

        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }

    }

    function getTopClasses() {
        // Find the highest score
        let maxScore = -Infinity;
        for (let className in scores) {
            if (scores[className] > maxScore) {
                maxScore = scores[className];
            }
        }
    
        // Find classes with the highest score
        let topClasses = [];
        for (let className in scores) {
            if (scores[className] === maxScore) {
                topClasses.push(className);
            }
        }
    
        return {
            topClasses: topClasses,
            score: maxScore
        };
    }

    function showResult() {
        const result = getTopClasses();
        console.log(`Top class(es): ${result.topClasses.join(', ')} with a score of ${result.score}`);
        if (result.score < 0){
            $('#quiz-container').html(`<h2>There isn't a perfect class for you, but you can try: ${result.topClasses.join(', ')}</h2>`);
        }
        else {
            $('#quiz-container').html(`<h2>You should play: ${result.topClasses.join(', ')}</h2>`);
        }
    }

    $('#submit').click(checkAnswer);
    loadQuestion();
});
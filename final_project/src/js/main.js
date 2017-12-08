const questionListContainer = document.querySelector('.question-list-container')
const tabQuestionContainer = document.querySelector('.tab-question-container')

const ajaxSearch = function () {

    const API_URL = `http://fvi-grad.com:4004/quiz`

    $.ajax({
        type: 'GET',
        url: API_URL,
        dataType: 'json',
        success: function (data) {
            console.log(data);

            for (let i in data) {
                var id = data[i].id;

                var btn = document.createElement('button');
                btn.classList.add('btn', 'btn-primary', 'btn-block', 'submit-button')

                btn.innerHTML = 'CHECK';

                questionListContainer.innerHTML += `
                    <a class="list-group-item list-group-item-action" id="list-question${i}-list" href="#list-question${i}" data-toggle="list">Question ${parseInt([i]) + 1}</a>
                `;

                tabQuestionContainer.innerHTML += `
                    <div class="tab-pane fade" id="list-question${i}" role="tabpanel">
                        <div> ${data[i].questionText} </div>
                        <div class="answer-container-${i}" id="answer-container-${i}">
                            Select correct answer:
                            <form id="form${id}">
                            ${
                                data[i].answers.map(answer => {
                                    return `<input type="radio" id="${answer}" value="${answer}" name="answer"> ${answer} `;
                                }).join('<br/>')
                            }
                            </form>

                            
                        </div>
                    </div>
                `;

                var cont = '#answer-container-' + i;
                // console.log($(cont).html());

                btn.onclick = function (e) {
                    var _id = "#form" + id;
                    var result = $(_id).serializeArray();

                    console.log(result);

                    e.preventDefault();
                    checkAnswer(id, result)
                };

                $(cont).append(btn);

            }
        },
        error: function (error) {
            console.log("There was an error");
        }
    })
}

const checkAnswer = function (id, selected) {

    const API_URL_ANSWER = `http://fvi-grad.com:4004/quiz-get-answer/${id}`

    $.ajax({
        type: 'GET',
        url: API_URL_ANSWER,
        dataType: 'json',
        success: function (data) {
            if (data === selected) {
                console.log("Beast Mode")
            } else {
                console.log("Flex some more");
            }
        },

    })
};

ajaxSearch();




data[a].answers.map(answer => {
    return `<input type="radio" id="${answer}" value="${answer}" name="answer"> ${answer} `;
}).join('<br/>')
document.addEventListener('DOMContentLoaded', function () {
    let currentQuestion = 0;
    const questions = document.querySelectorAll('.question');
    const centers = {
        '本能': 0,
        '感情': 0,
        '思考': 0
    };

    const directions = {
        '要求する': 0,
        '努力して得る': 0,
        '退く': 0
    };

    questions.forEach((question, index) => {
        question.style.display = index === 0 ? 'block' : 'none';
    });

    document.querySelectorAll('.answer').forEach(button => {
        button.addEventListener('click', function () {
            const center = button.getAttribute('data-center');
            const direction = button.getAttribute('data-direction');

            if (center) centers[center]++;
            if (direction) directions[direction]++;

            questions[currentQuestion].classList.add('fade-out');
            setTimeout(() => {
                questions[currentQuestion].style.display = 'none';
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    questions[currentQuestion].style.display = 'block';
                    questions[currentQuestion].classList.add('fade-in');
                } else {
                    document.querySelector('.submit-button').style.display = 'block';
                }
            }, 500);
        });
    });

    document.getElementById('enneagram-test').addEventListener('submit', function (event) {
        event.preventDefault();

        const primaryCenter = Object.keys(centers).reduce((currentMax, currentKey) => centers[currentMax] > centers[currentKey] ? currentMax : currentKey);
        const primaryDirection = Object.keys(directions).reduce((currentMax, currentKey) => directions[currentMax] > directions[currentKey] ? currentMax : currentKey);

        // センターと方向性の組み合わせに基づいてタイプを決定
        const typeMapping = {
            '本能努力して得る': 'result1.html',
            '感情努力して得る': 'result2.html',
            '感情要求する': 'result3.html',
            '感情退く': 'result4.html',
            '思考退く': 'result5.html',
            '思考努力して得る': 'result6.html',
            '思考要求する': 'result7.html',
            '本能要求する': 'result8.html',
            '本能退く': 'result9.html',
        };

        const resultPage = typeMapping[primaryCenter + primaryDirection];

        // 結果ページにリダイレクト
        window.location.href = resultPage;
    });
});

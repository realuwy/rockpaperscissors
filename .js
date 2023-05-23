# rockpaperscissors

<!DOCTYPE html>
<html>
<body>
    <center>
    <div style="position: relative; display: inline-block;">
        <div id="game"></div>
    </div>
    </center>

    <div id="announcement" style="text-align: center; margin-top: 20px;"></div>

    <div style="text-align: center;">
        <button id="rockButton" style="margin-right: 10px;">Predict Rock</button>
        <button id="paperButton" style="margin-right: 10px;">Predict Paper</button>
        <button id="scissorsButton">Predict Scissors</button>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <script>
        let predictedWinner = null;
        let gameStarted = false;
        let items = [];

        const outcomes = {
            '🌑,🌑': '🌑',
            '🌑,📄': '📄',
            '🌑,✂': '🌑',
            '📄,📄': '📄',
            '📄,🌑': '📄',
            '📄,✂': '✂',
            '✂,✂': '✂',
            '✂,🌑': '🌑',
            '✂,📄': '✂',
        };

        function initializeGame() {
            items = Array(10).fill('🌑').concat(Array(10).fill('📄'), Array(10).fill('✂')).map((item, i) => {
                return {
                    type: item,
                    x: Math.random() * 400,
                    y: Math.random() * 400,
                    dx: (Math.random() - 0.5) * 1.65, // increase speed by 0.65
                    dy: (Math.random() - 0.5) * 1.65  // increase speed by 0.65
                };
            });
        }

        function setup() {
            let canvas = createCanvas(410, 410);
            canvas.parent('game');  // add canvas to div
            textSize(20);

            const rockButton = document.getElementById('rockButton');
            const paperButton = document.getElementById('paperButton');
            const scissorsButton = document.getElementById('scissorsButton');

            rockButton.addEventListener('click', () => {
                if (!gameStarted) {
                    predictedWinner = '🌑';
                    gameStarted = true;
                    initializeGame();
                    document.getElementById('announcement').textContent = '';
                    loop();
                }
            });

            paperButton.addEventListener('click', () => {
                if (!gameStarted) {
                    predictedWinner = '📄';
                    gameStarted = true;
                    initializeGame();
                    document.getElementById('announcement').textContent = '';
                    loop();
                }
            });

            scissorsButton.addEventListener('click', () => {
                if (!gameStarted) {
                    predictedWinner = '✂';
                    gameStarted = true;
                    initializeGame();
                    document.getElementById('announcement').textContent = '';
                    loop();
                }
            });
        }

        function draw() {
            if (!gameStarted) return;

            background(220);
            stroke(0);
            noFill();
            rect(5, 5, 400, 400);

            for (let item of items) {
                item.x += item.dx;
                item.y += item.dy;

                if (item.x < 10) {
                    item.dx = Math.abs(item.dx);
                } else if (item.x > 395) {
                    item.dx = -Math.abs(item.dx);
                }

                if (item.y < 10) {
                    item.dy = Math.abs(item.dy);
                } else if (item.y > 395) {
                    item.dy = -Math.abs(item.dy);
                }

                for (let other of items) {
                    if (other === item) continue;
                    const dx = other.x - item.x;
                    const dy = other.y - item.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 40) {  // increase collision distance to 40
                        const collision = [item.type, other.type].sort().join(',');
                        if (collision in outcomes) {
                            item.type = outcomes[collision];
                        }
                    }
                }

                text(item.type, item.x, item.y);
            }

            if (new Set(items.map(item => item.type)).size === 1) {
                noLoop();
                gameStarted = false;
                const actualWinner = items[0].type;
                textSize(18);
                fill(0); // Black color
                textStyle(BOLD); // Bold font
                const msg = predictedWinner === actualWinner 
                    ? `Congrats! You predicted correctly.`
                    : `Oh no! You predicted wrong.`;
                document.getElementById('announcement').textContent = msg;
                document.getElementById('announcement').style.color = predictedWinner === actualWinner ? 'green' : 'red';
            }
        }

        setup();
        draw();
    </script>
</body>
</html>

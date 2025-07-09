const imageMap = {
  1: 'images/bastard.jpg',
  2: 'images/goblin.jpg',
  3: 'images/wolf.jpg',
  4: 'images/cherry_bomb.jpg',
  5: 'images/flower_boy.jpg',
  6: 'images/igor.jpg',
  7: 'images/cmiygl.jpg',
  8: 'images/cmiygl_2.jpg',
  9: 'images/chromakopia.jpg'
};

    // CREATE MATRIX
function pattern(row, col) {
  return (3 * (row % 3) + Math.floor(row / 3) + col) % 9;
}

const matrix = [];

for (let row = 0; row < 9; row++) {
  const newRow = [];
  for (let col = 0; col < 9; col++) {
    newRow.push(pattern(row, col) + 1);
  }
  matrix.push(newRow);
}

// mix array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// mix every three rows
function shuffleRows(matrix) {
  for (let block = 0; block < 3; block++) {
    const rows = [0, 1, 2].map(i => block * 3 + i);
    shuffleArray(rows);
    const temp = rows.map(r => matrix[r]);
    for (let i = 0; i < 3; i++) {
      matrix[block * 3 + i] = temp[i];
    }
  }
}

// mix every three columns
function shuffleCols(matrix) {
  for (let block = 0; block < 3; block++) {
    const cols = [0, 1, 2].map(i => block * 3 + i);
    shuffleArray(cols);
    for (let row = 0; row < 9; row++) {
      const temp = cols.map(c => matrix[row][c]);
      for (let i = 0; i < 3; i++) {
        matrix[row][block * 3 + i] = temp[i];
      }
    }
  }
}

shuffleRows(matrix);
shuffleCols(matrix);



    // DELET MATRIX NUMBERS
    // check if it is possible to put num in (row, col) without conflicts
function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;    
    if (board[i][col] === num) return false;     
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (board[boxRow + r][boxCol + c] === num) return false;
    }
  }
  return true;
}

// find a solution (less than 2)
function solveSudokuCount(board, count = {num:0}) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === ' ') {  //*
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            solveSudokuCount(board, count);
            if (count.num > 1) return; // more then 1 solution = stop
            board[row][col] = ' '; //*
          }
        }
        return; // no solutions = exit
      }
    }
  }
  count.num++;
}

// create unique solution
function createPuzzle(board, toRemove = 40) {
  let removed = 0;
  const positions = [];
  // collect all positions
  for (let r=0; r<9; r++) {
    for (let c=0; c<9; c++) {
      positions.push([r,c]);
    }
  }
  
  // mix positions
  positions.sort(() => Math.random() - 0.5);
  
  for (let [r,c] of positions) {
    if (removed >= toRemove) break;
    
    const temp = board[r][c];
    board[r][c] = ' '; //*
    
    // create copy to compare solution
    const copyBoard = board.map(row => row.slice());
    let count = {num: 0};
    solveSudokuCount(copyBoard, count);
    
    if (count.num !== 1) {
      // if solution is not 1 = remove
      board[r][c] = temp;
    } else {
      removed++;
    }
  }
  return board;
}



    createPuzzle(matrix, 40); 
    
// create copy
const originalMatrix = matrix.map(row => row.slice());
const fixedCells = originalMatrix.map(row => row.map(cell => cell !== ' '));

   
// create container on top
const topCenter = document.createElement("div");
topCenter.id = "top-center";
document.body.appendChild(topCenter);

//create buttons
for (let i = 1; i <= 9; i++) {
  const addBtn = document.createElement("button");
  addBtn.textContent = i;
  addBtn.style.margin = "0 5px";  
  topCenter.appendChild(addBtn);

  addBtn.addEventListener("mousedown", (e) => {
    e.preventDefault();

    const rect = addBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const btn = document.createElement("button");
    btn.textContent = i;
    btn.style.position = "absolute";
    btn.style.left = `${centerX}px`;
    btn.style.top = `${centerY}px`;
    btn.style.transform = "translate(-50%, -50%)";
    btn.style.zIndex = "1000";

    document.body.appendChild(btn);

    let offsetX = e.clientX - rect.left;
    let offsetY = e.clientY - rect.top;

    function onMouseMove(e) {
      btn.style.left = `${e.pageX - offsetX}px`;
      btn.style.top = `${e.pageY - offsetY}px`;
      btn.style.transform = "";
    }

    //delete button
    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      

        //assign value
const btnRect = btn.getBoundingClientRect();
const btnCenterX = btnRect.left + btnRect.width / 2;
const btnCenterY = btnRect.top + btnRect.height / 2;


const tableButtons = container.querySelectorAll('button');
for (const tableBtn of tableButtons) {
  const rect = tableBtn.getBoundingClientRect();


  if (
    btnCenterX >= rect.left &&
    btnCenterX <= rect.right &&
    btnCenterY >= rect.top &&
    btnCenterY <= rect.bottom
  ) {
   
    /*if (tableBtn.textContent.trim() === '') {
     
      tableBtn.textContent = btn.textContent;

     
      const index = Array.from(container.children).indexOf(tableBtn);
      const row = Math.floor(index / 9);
      const col = index % 9;
      matrix[row][col] = Number(btn.textContent);

        if (!matricesAreEqual(matrix, originalMatrix)) {
  location.reload();
}
    }*/
      const index = Array.from(container.children).indexOf(tableBtn);
const row = Math.floor(index / 9);
const col = index % 9;


if (fixedCells[row][col]) {
  alert("WRONG!");
  btn.remove(); 
  return;
}


if (!isValid(matrix, row, col, Number(btn.textContent))) {
  alert("WRONG!");
  btn.remove();
  return;
}


//tableBtn.textContent = btn.textContent; replaced
      const num = Number(btn.textContent);
tableBtn.innerHTML = `<img src="${imageMap[num]}" style="width:100%; height:100%;" />`;

      
matrix[row][col] = Number(btn.textContent);


      
    break;
  }
}

btn.remove();
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}

  // compare matrix with original matrix
function matricesAreEqual(mat1, mat2) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (mat1[i][j] !== mat2[i][j]) return false;
    }
  }
  return true;
}



    
// create main sudoku table
   const container = document.createElement('div');
container.id = 'container';
document.body.appendChild(container);

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    const btn = document.createElement('button');
    //btn.textContent = matrix[i][j]; replaced
      const value = matrix[i][j];
if (value !== ' ') {
  btn.innerHTML = `<img src="${imageMap[value]}" style="width:100%; height:100%;" />`;
} else {
  btn.textContent = ''; 
}

      


    if (i % 3 === 0) btn.style.borderTopWidth = '3px';
    if (j % 3 === 0) btn.style.borderLeftWidth = '3px';
    if (j === 8) btn.style.borderRightWidth = '3px';
    if (i === 8) btn.style.borderBottomWidth = '3px';

    container.appendChild(btn);
  }
}
    


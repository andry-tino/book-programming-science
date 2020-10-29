(function () {
    const rowsnum = 9;
    const colsnum = 9;
    const cellsize = 20; // In px
    const initConfig = ["3:4", "3:5", "4:3", "4:4", "5:4"];

    let t = 0; // Cycles (time)

    function create() {
        let container = getContainer();
        container.style.width = (colsnum * cellsize + colsnum) + "px";

        for (let i = 1; i <= rowsnum; i++) {
            for (let j = 1; j <= colsnum; j++) {
                let cell = document.createElement("div");
                cell.id = i + ":" + j;
                cell.classList.add("cell");
                cell.style.width = cellsize + "px";
                cell.style.height = cellsize + "px";

                container.appendChild(cell);
            }
        }
    }

    function initializeGrid() {
        for (let i = 1; i <= rowsnum; i++) {
            for (let j = 1; j <= colsnum; j++) {
                if (initConfig.indexOf(i + ":" + j) >= 0) {
                    set(i, j, 1);
                } else {
                    set(i, j, 0);
                }
            }
        }
    }

    function initializeButton() {
        let button = document.getElementById("buttonNext");
        button.addEventListener("click", function(){
            next();
            updateCycleText();
            updateBlackCountText();
        });
    }

    function getContainer() {
        return document.getElementById("ca");
    }

    function getCell(i, j) {
        return document.getElementById(i + ":" + j);
    }

    function set(i, j, value) {
        let cell = getCell(i, j);
        cell.setAttribute("data-value", value);
    }

    function get(i, j) {
        let cell = getCell(i, j);
        let value = cell.getAttribute("data-value") || 0;
        return parseInt(value);
    }

    function setTmp(i, j, value) {
        let cell = getCell(i, j);
        cell.setAttribute("data-tmpvalue", value);
    }

    function getTmp(i, j) {
        let cell = getCell(i, j);
        return parseInt(cell.getAttribute("data-tmpvalue"));
    }

    function removeTmpValue(i, j) {
        let cell = getCell(i, j);
        cell.removeAttribute("data-tmpvalue");
    }

    function next() {
        // Calculate the values
        for (let i = 2; i <= rowsnum - 1; i++) {
            for (let j = 2; j <= colsnum - 1; j++) {
                // Cell (i,j)'s state
                let cell = get(i, j);

                // States of cell (i,j)'s neighbors
                let north = get(i - 1, j);
                let south = get(i + 1, j);
                let east = get(i, j + 1);
                let west = get(i, j - 1);
                let northeast = get(i - 1, j + 1);
                let southeast = get(i + 1, j + 1);
                let northwest = get(i - 1, j - 1);
                let southwest = get(i + 1, j - 1);
                let sum = north + south + east + west + northeast + southeast + northwest + southwest;

                // Calculate new state and save it
                setTmp(i, j, calculateState(cell, sum));
            }
        }

        // Apply the values
        for (let i = 2; i <= rowsnum - 1; i++) {
            for (let j = 2; j <= colsnum - 1; j++) {
                set(i, j, getTmp(i, j));
                removeTmpValue(i, j); // Clean up
            }
        }

        t++;
    }

    function calculateState(state, neighSum) {
        if (state === 1 && neighSum < 2) {
            return 0; // Any active cell with fewer than 2 active neighbors becomes inactive
        }
        if (state === 1 && neighSum >= 2 && neighSum <= 3) {
            return 1; // Any active cell with 2 or 3 active neighbors remains active
        }
        if (state === 1 && neighSum > 3) {
            return 0; // Any active cell with more than 3 active neighbors becomes inactive
        }
        if (state === 0 && neighSum === 3) {
            return 1; // Any inactive cell with exactly 3 active neighbors becomes active
        }
        return state; // Otherwise the cell's state remains the same
    }

    function updateCycleText() {
        let text = document.getElementById("cycleText");
        text.textContent = "cycle " + t;
    }

    function updateBlackCountText() {
        let count = 0;
        for (let i = 1; i <= rowsnum; i++) {
            for (let j = 1; j <= colsnum; j++) {
                if (get(i, j) === 1) {
                    count++;
                }
            }
        }

        let text = document.getElementById("blackCountText");
        text.textContent = "black cells: " + count;
    }

    window.addEventListener("load", function () {
        if (rowsnum < 9 || colsnum < 9) {
            throw new Error("The CA must be at least 9x9.");
        }
        if (cellsize < 4) {
            throw new Error("Cells are too small. A cell must be at least 4px!");
        }

        create();
        initializeGrid();
        initializeButton();
        updateCycleText();
        updateBlackCountText();
    });
})();
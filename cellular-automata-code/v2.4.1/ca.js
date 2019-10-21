(function () {
    const rowsnum = 40;
    const colsnum = 40;
    const cellsize = 14; // In px
    const initConfig = [];

    let t = 0; // Cycles (time)

    function setInitialCondition() {
        for (let i = 1; i <= rowsnum; i++) {
            for (let j = 1; j <= colsnum; j++) {
                if ((i >= 9 && i <= 15) && (j >= 9 && j <= 15)) {
                    initConfig.push(i + ":" + j);
                    continue;
                }
                if ((i >= 20 && i <= 25) && (j >= 20 && j <= 25)) {
                    initConfig.push(i + ":" + j);
                    continue;
                }
                if ((i >= 15 && i <= 20) && (j >= 11 && j <= 12)) {
                    initConfig.push(i + ":" + j);
                    continue;
                }
                if ((i >= 20 && i <= 23) && (j >= 11 && j <= 23)) {
                    initConfig.push(i + ":" + j);
                    continue;
                }
            }
        }
    }

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
        const N = 3; // Turning Point

        if (neighSum > N) {
            return 1;
        } else {
            return 0;
        }
    }

    function updateCycleText() {
        let text = document.getElementById("cycleText");
        text.textContent = "cycle " + t;
    }

    window.addEventListener("load", function () {
        if (rowsnum < 9 || colsnum < 9) {
            throw new Error("The CA must be at least 9x9.");
        }
        if (cellsize < 4) {
            throw new Error("Cells are too small. A cell must be at least 4px!");
        }

        setInitialCondition();
        create();
        initializeGrid();
        initializeButton();
        updateCycleText();
    });
})();
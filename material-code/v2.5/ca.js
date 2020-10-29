(function () {
    const rowsnum = 9;
    const colsnum = 9;
    const cellsize = 30; // In px
    const initConfig = ["3:4", "3:5", "4:3", "4:4", "4:5", "4:6", "5:4", "5:5", "5:6", "6:4", "6:5", "6:6", "7:7", "8:8"];

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
                    setCellText(i, j, 1);
                } else {
                    set(i, j, 0);
                    setCellText(i, j, 0);
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
        return parseFloat(value);
    }

    function setTmp(i, j, value) {
        let cell = getCell(i, j);
        cell.setAttribute("data-tmpvalue", value);
    }

    function getTmp(i, j) {
        let cell = getCell(i, j);
        return parseFloat(cell.getAttribute("data-tmpvalue"));
    }

    function removeTmpValue(i, j) {
        let cell = getCell(i, j);
        cell.removeAttribute("data-tmpvalue");
    }

    function setCellText(i, j, value) {
        let cell = getCell(i, j);
        cell.textContent = `${value}`.substring(0, 5);
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

                // Calculate new state and save it
                let newState = calculateStateThreshold(cell, 
                    north, south, east, west,
                    northeast, southeast, northwest, southwest);
                setCellText(i, j, newState);
                setTmp(i, j, newState);
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

    function calculateStateCGL(state, n, s, e, w, ne, se, nw, sw) {
        let neighSum = n + s + e + w + ne + se + nw + sw;
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

    function calculateStateAVG(state, n, s, e, w, ne, se, nw, sw) {
        const wg = 1/8;
        const mu = 0.5;

        let neighSum = 0;
        neighSum += wg * (n - state);
        neighSum += wg * (s - state);
        neighSum += wg * (e - state);
        neighSum += wg * (w - state);
        neighSum += wg * (ne - state);
        neighSum += wg * (se - state);
        neighSum += wg * (nw - state);
        neighSum += wg * (sw - state);

        return state + mu * neighSum;
    }

    function calculateStateThreshold(state, n, s, e, w, ne, se, nw, sw) {
        const N = 3;

        let neighSum = n + s + e + w + ne + se + nw + sw;
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

        create();
        initializeGrid();
        initializeButton();
        updateCycleText();
    });
})();
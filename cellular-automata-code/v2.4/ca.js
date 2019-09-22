(function () {
    const rowsnum = 9;
    const colsnum = 9;
    const cellsize = 20; // In px
    const initConfig = ["2:2", "4:7", "7:4", "5:5", "3:8"];

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
                set(i, j, 0);
            }
        }
    }

    function initializeButton() {
        let button = document.getElementById("buttonNext");
        button.addEventListener("click", function(){
            next();
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
        return parseInt(cell.getAttribute("data-value"));
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
                let cell = get(i, j);

                // Neighborhood
                let north = get(i - 1, j);
                let south = get(i + 1, j);
                let east = get(i, j + 1);
                let west = get(i, j - 1);
                let northeast = get(i - 1, j + 1);
                let southeast = get(i + 1, j + 1);
                let northwest = get(i - 1, j - 1);
                let southwest = get(i + 1, j - 1);

                // Calculate new state
                let sum = north + south + east + west + northeast + southeast + northwest + southwest;
                if (cell + sum >= 5) {
                    setTmp(i, j, 1);
                } else {
                    setTmp(i, j, 0);
                }
            }
        }

        // Apply the values
        for (let i = 1; i <= rowsnum; i++) {
            for (let j = 1; j <= colsnum; j++) {
                set(i, j, getTmp(i, j));
                removeTmpValue(i, j); // Clean up
            }
        }

        t++;
    }

    function updateCycleText() {
        let text = document.getElementById("cycleText");
        text.textContent = "cycle " + t;
    }

    window.addEventListener("load", function () {
        if (rowsnum < 9 || colsnum < 9) {
            throw new Error("The CA must be at least 9x9.");
        }

        create();
        initializeGrid();
        initializeButton();
    });
})();
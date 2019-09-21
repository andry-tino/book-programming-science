(function(){
    const rowsnum = 9;
    const colsnum = 9;
    const cellsize = 20; // In px

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

    function initialize() {
        for (let i = 1; i <= rowsnum; i++) {
            for (let j = 1; j <= colsnum; j++) {
                off(i, j);
            }
        }
    }

    function getContainer() {
        return document.getElementById("ca");
    }

    function getCell(i, j) {
        return document.getElementById(i + ":" + j);
    }

    function on(i, j) {
        let cell = getCell(i, j);
        cell.setAttribute("data-value", "1");
    }

    function off(i, j) {
        let cell = getCell(i, j);
        cell.setAttribute("data-value", "0");
    }

    function get(i, j) {
        let cell = getCell(i, j);
        return parseInt(cell.getAttribute("data-value"));
    }

    function _on(i, j) {
        let cell = getCell(i, j);
        cell.setAttribute("data-tmpvalue", "1");
    }

    function _off(i, j) {
        let cell = getCell(i, j);
        cell.setAttribute("data-tmpvalue", "0");
    }

    function _get(i, j) {
        let cell = getCell(i, j);
        return parseInt(cell.getAttribute("data-tmpvalue"));
    }

    function removeTmpValue(i, j) {
        let cell = getCell(i, j);
        cell.removeAttribute("data-tmpvalue");
    }

    function next() {
        // Calculate
        for (let i = 1; i <= rowsnum; i++) {
            for (let j = 1; j <= colsnum; j++) {
                let cell = get(i, j);

                // Neighborhood
                let north = get(i-1, j);
                let south = get(i+1, j);
                let east = get(i, j+1);
                let west = get(i, j-1);
                let northeast = get(i-1, j+1);
                let southeast = get(i+1, j+1);
                let northwest = get(i-1, j-1);
                let southwest = get(i+1, j-1);

                // Calculate new state
                let sum = north + south + east + west + northeast + southeast + northwest + southwest;
                if (cell + sum >= 5) {
                    _on(i, j);
                } else {
                    _off(i, j);
                }

                removeTmpValue(i, j);
            }
        }

        // Apply
        for (let i = 1; i <= rowsnum; i++) {
            for (let j = 1; j <= colsnum; j++) {
                if (_get(i, j) == 1) {
                    on(i, j);
                } else {
                    off(i, j);
                }
            }
        }

        t++;
    }

    window.addEventListener("load", function(){
        create();
        initialize();
    });
})();
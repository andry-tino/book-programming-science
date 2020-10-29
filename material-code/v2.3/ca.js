(function(){
    const rowsnum = 9;
    const colsnum = 9;
    const cellsize = 20; // In px

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

    function getContainer() {
        return document.getElementById("ca");
    }

    window.addEventListener("load", function(){
        create();
    });
})();
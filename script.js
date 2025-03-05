document.addEventListener("DOMContentLoaded", function () {
    fetch("courses.json")
        .then(response => response.json())
        .then(data => {
            let tableIds = ["year1-sem1", "year1-sem2", "year2-sem1", "year2-sem2"];

            // Clear tables before inserting new data (prevents duplication)
            tableIds.forEach(id => {
                document.querySelector(`#${id} tbody`).innerHTML = "";
            });

            data.courses.forEach(course => {
                let tableId = "";

                if (course.year_level === "1st" && course.sem === "1st") {
                    tableId = "year1-sem1";
                } else if (course.year_level === "1st" && course.sem === "2nd") {
                    tableId = "year1-sem2";
                } else if (course.year_level === "2nd" && course.sem === "1st") {
                    tableId = "year2-sem1";
                } else if (course.year_level === "2nd" && course.sem === "2nd") {
                    tableId = "year2-sem2";
                }

                if (tableId) {
                    const tbody = document.querySelector(`#${tableId} tbody`);
                    const row = document.createElement("tr");

                    row.innerHTML = `
                        <td>${course.code}</td>
                        <td>${course.description}</td>
                        <td>${course.credit}</td>
                    `;

                    tbody.appendChild(row);
                }
            });
        })
        .catch(error => console.error("Error fetching courses:", error));
});

function searchSubjects() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tables = document.querySelectorAll("table");

    tables.forEach(table => {
        let rows = table.querySelectorAll("tbody tr");
        let visibleRows = 0;

        rows.forEach(row => {
            let text = row.textContent.toLowerCase();
            if (text.includes(input)) {
                row.style.display = "";
                visibleRows++;
            } else {
                row.style.display = "none";
            }
        });

        // Hide table if no visible rows remain
        table.style.display = visibleRows > 0 ? "" : "none";
    });
}

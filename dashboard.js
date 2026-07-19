function updateDateTime() {

    const now = new Date();

    const dateElement =
        document.getElementById("dateTime");

    if (dateElement) {
        dateElement.textContent =
            now.toLocaleString();
    }
}

function loadDashboard() {

    const assets =
        JSON.parse(localStorage.getItem("assets")) || [];

    const tickets =
        JSON.parse(localStorage.getItem("tickets")) || [];

    const totalAssets =
        document.getElementById("totalAssets");

    const openTickets =
        document.getElementById("openTickets");

    const closedTickets =
        document.getElementById("closedTickets");

    const progressTickets =
        document.getElementById("progressTickets");

    if (totalAssets)
        totalAssets.textContent = assets.length;

    if (openTickets)
        openTickets.textContent =
            tickets.filter(t =>
                t.status === "Open"
            ).length;

    if (closedTickets)
        closedTickets.textContent =
            tickets.filter(t =>
                t.status === "Closed"
            ).length;

    if (progressTickets)
        progressTickets.textContent =
            tickets.filter(t =>
                t.status === "In Progress"
            ).length;

    if (document.getElementById("recentAssets")) {
        loadRecentAssets(assets);
    }

    if (document.getElementById("recentTickets")) {
        loadRecentTickets(tickets);
    }
}

function loadRecentAssets(assets) {

    const table =
        document.getElementById("recentAssets");

    if (!table) return;

    table.innerHTML = `
    <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Status</th>
    </tr>
    `;

    assets.slice(-5).reverse().forEach(asset => {

        table.innerHTML += `
        <tr>
            <td>${asset.id}</td>
            <td>${asset.name}</td>
            <td>${asset.status}</td>
        </tr>
        `;
    });
}

function loadRecentTickets(tickets) {

    const table =
        document.getElementById("recentTickets");

    if (!table) return;

    table.innerHTML = `
    <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Status</th>
    </tr>
    `;

    tickets.slice(-5).reverse().forEach(ticket => {

        table.innerHTML += `
        <tr>
            <td>${ticket.id}</td>
            <td>${ticket.title}</td>
            <td>${ticket.status}</td>
        </tr>
        `;
    });
}

updateDateTime();
loadDashboard();
setInterval(updateDateTime, 1000);
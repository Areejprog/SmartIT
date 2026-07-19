let tickets =
    JSON.parse(localStorage.getItem("tickets")) || [];

renderTickets();

function saveTicket() {

    const title =
        document.getElementById("ticketTitle").value;

    const priority =
        document.getElementById("ticketPriority").value;

    const description =
        document.getElementById("ticketDescription").value;

    if (!title) return;

    const ticket = {

        id:
            "TCK-" +
            String(Date.now()).slice(-4),

        title,

        priority,

        description,

        status: "Open",

        date:
            new Date().toLocaleDateString()

    };

    tickets.push(ticket);

    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );

    renderTickets();

}

function renderTickets() {

    const table =
        document.getElementById("ticketsTable");

    table.innerHTML = "";

    tickets.forEach((t, index) => {

        table.innerHTML += `

        <tr>

            <td>${t.id}</td>

            <td>${t.title}</td>

            <td>

                <span class="badge ${t.priority.toLowerCase()}">
                    ${t.priority}
                </span>

            </td>

            <td>

                <span class="badge open">
                    ${t.status}
                </span>

            </td>

            <td>${t.date}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteTicket(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;
    });

    updateStats();

}

function deleteTicket(index){

    tickets.splice(index,1);

    localStorage.setItem(
        "tickets",
        JSON.stringify(tickets)
    );

    renderTickets();

}

function updateStats(){

    document.getElementById(
        "totalTickets"
    ).innerText = tickets.length;

    document.getElementById(
        "openTickets"
    ).innerText =
        tickets.filter(
            x=>x.status==="Open"
        ).length;

    document.getElementById(
        "progressTickets"
    ).innerText =
        tickets.filter(
            x=>x.status==="In Progress"
        ).length;

    document.getElementById(
        "closedTickets"
    ).innerText =
        tickets.filter(
            x=>x.status==="Closed"
        ).length;

}
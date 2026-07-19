console.log("START");

const assets =
JSON.parse(localStorage.getItem("assets")) || [];

const tickets =
JSON.parse(localStorage.getItem("tickets")) || [];

console.log("Assets:", assets);
console.log("Tickets:", tickets);

/* Dashboard Cards */

document.getElementById("reportAssets").textContent =
assets.length;

document.getElementById("reportOpen").textContent =
tickets.filter(t =>
    t.status?.toLowerCase().includes("open") ||
    t.status?.includes("يفتح")
).length;

document.getElementById("reportClosed").textContent =
tickets.filter(t =>
    t.status?.toLowerCase().includes("closed") ||
    t.status?.includes("مغلق")
).length;

document.getElementById("reportProgress").textContent =
tickets.filter(t =>
    t.status?.toLowerCase().includes("progress") ||
    t.status?.includes("تقدم")
).length;



/*الاولويات */


const low =
tickets.filter(t =>
t.priority?.trim().toLowerCase() === "low"
).length;

const medium =
tickets.filter(t =>
t.priority?.trim().toLowerCase() === "medium"
).length;

const high =
tickets.filter(t =>
t.priority?.trim().toLowerCase() === "high"
).length;

const critical =
tickets.filter(t =>
t.priority?.trim().toLowerCase() === "critical"
).length;
/* Assets Statistics */

const active =
assets.filter(a =>
a.status?.trim().toLowerCase() === "active"
).length;

const maintenance =
assets.filter(a =>
a.status?.trim().toLowerCase() === "maintenance"
).length;

const outService =
assets.filter(a =>
a.status?.trim().toLowerCase() === "out of service"
).length;


/* Assets Chart */

new Chart(
    document.getElementById("assetsChart"),
    {
        type: "pie",

        data: {
            labels: [
                "Active",
                "Maintenance",
                "Out of Service"
            ],

            datasets: [{
                data: [
                    active,
                    maintenance,
                    outService
                ],

                backgroundColor: [
                    "#2ecc71",
                    "#f39c12",
                    "#e74c3c"
                ]
            }]
        },

       options:{
    responsive:true,
    maintainAspectRatio:false
}
    }
);


/* Tickets Statistics */

const openCount =
tickets.filter(t =>
t.status?.trim().toLowerCase() === "open"
).length;

const closedCount =
tickets.filter(t =>
t.status?.trim().toLowerCase() === "closed"
).length;

const progressCount =
tickets.filter(t =>
t.status?.trim().toLowerCase() === "in progress"
).length;

/* Tickets Chart */

new Chart(
    document.getElementById("ticketsChart"),
    {
        type: "bar",

        data: {
            labels: [
                "Low",
                "Medium",
                "High",
                "Critical"
            ],

            datasets: [{
                label: "Tickets",

                data: [
                    low,
                    medium,
                    high,
                    critical
                ],

                backgroundColor: [
                    "#3498db",
                    "#f1c40f",
                    "#e67e22",
                    "#e74c3c"
                ]
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    }
);
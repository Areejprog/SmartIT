console.log("assets.js loaded");

let assets =
JSON.parse(localStorage.getItem("assets")) || [];

let editingIndex = -1;

renderAssets();

function addAsset() {

    const name =
        document.getElementById("assetName").value.trim();

    const type =
        document.getElementById("assetType").value.trim();

    const status =
        document.getElementById("assetStatus").value;

    if (name === "" || type === "") {

        alert("Please fill all fields");
        return;
    }

    const assetData = {

        id:
            editingIndex === -1
                ? "AST-" +
                  String(assets.length + 1)
                  .padStart(4, "0")
                : assets[editingIndex].id,

        name: name,
        type: type,
        status: status
    };

    if (editingIndex === -1) {

        assets.push(assetData);

    } else {

        assets[editingIndex] = assetData;

        editingIndex = -1;
    }

    saveAssets();

    renderAssets();

    document.getElementById("assetName").value = "";
    document.getElementById("assetType").value = "";
    document.getElementById("assetStatus").value = "Active";
}

function renderAssets() {

    const table =
        document.getElementById("assetsTable");

    table.innerHTML = "";

    assets.forEach((asset, index) => {

        table.innerHTML += `

        <tr>

            <td>${asset.id}</td>

            <td>${asset.name}</td>

            <td>${asset.type}</td>

            <td>${asset.status}</td>

            <td>

                <button
                    onclick="editAsset(${index})">

                    Edit

                </button>

                <button
                    onclick="deleteAsset(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;
    });
}

function saveAssets() {

    localStorage.setItem(
        "assets",
        JSON.stringify(assets)
    );
}

function deleteAsset(index) {

    if (
        confirm("Delete this asset?")
    ) {

        assets.splice(index, 1);

        saveAssets();

        renderAssets();
    }
}

function editAsset(index) {

    const asset = assets[index];

    document.getElementById("assetName").value =
        asset.name;

    document.getElementById("assetType").value =
        asset.type;

    document.getElementById("assetStatus").value =
        asset.status;

    editingIndex = index;
}

function searchAssets() {

    const keyword =
        document
            .getElementById("searchAsset")
            .value
            .toLowerCase();

    const rows =
        document.querySelectorAll(
            "#assetsTable tr"
        );

    rows.forEach(row => {

        row.style.display =
            row.innerText
                .toLowerCase()
                .includes(keyword)
                ? ""
                : "none";
    });
}
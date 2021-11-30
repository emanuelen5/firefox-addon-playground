const elements_div = document.getElementById("elements");
const TYPE_UNHIDE = "type_unhide";

function render(ids) {
    for (let i=0; i<ids.length; i++) {
        console.log(`ID of hidden header: ${ids[i]}`);
        const row = document.createElement("li");
        row.innerHTML = `Unhide ID=${ids[i]}`
        Object.assign(row.style, {
            width: "100%",
            cursor: "pointer",
            color: "red",
            fontWeight: "bold"
        });
        row.addEventListener("click", ((id) => {
            return (e) => {
                console.log(`Removing child with ID=${id}!`)
                let sending = browser.tabs.sendMessage(tab.id, {
                  type: TYPE_UNHIDE,
                  targetElementId: info.targetElementId
                });
                sending.then(
                  response => {
                    console.log(`Message response from the content-script: ${response}`);
                  },
                  error => {
                    console.log(`Error from the content-script: ${error}`);
                  }
                );
            };
        })(ids[i]));
        elements_div.appendChild(row);
    }
}

async function init() {
    let { hidden_header_ids } = await browser.storage.local.get("hidden_header_ids");
    console.log("popup reading ids:")
    console.log(hidden_header_ids);
    if (!hidden_header_ids || hidden_header_ids.length === 0) {
        console.log("No configuration stored yet.");
        return;
    }
    render(hidden_header_ids);
}

init().catch(e => console.error(e));

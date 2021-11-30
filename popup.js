const elements_div = document.getElementById("elements");

function render(hidden_headers) {
    for (let i=0; i<hidden_headers.length; i++) {
        console.log(hidden_headers[i]);
    }
}

async function init() {
    let { hidden_headers } = browser.storage.local.get("hidden_headers");
    if (!hidden_headers) {
        console.log("No configuration stored yet.");
        return;
    }
    render(hidden_headers);
    console.log(hidden_headers);
}

init().catch(e => console.error(e));

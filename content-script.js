const MENU_SELECT = "menu-marked";
const TYPE_UNHIDE = "type_unhide";

let overlays = [];
let hide_overlays = {};

let overlay_id_counter = 1;

async function save() {
  const hidden_header_ids = Object.keys(hide_overlays);
  const save_as = {hidden_header_ids};
  console.log("Saving as:");
  console.log(save_as);
  await browser.storage.local.set(save_as);
  console.log("Saved!");
}

function hide_overlay(node) {
  const display_style = node.style.display;
  node.style.display = "none";
  const start_counter = overlay_id_counter;
  while (true) {
    overlay_id_counter += 1;
    if (start_counter == overlay_id_counter) {
      console.error("Could not allocate an ID for the overlay.");
      return;
    } else if (!hide_overlays[overlay_id_counter]) {
      break;
    }
  }
  hide_overlays[overlay_id_counter] = {
    id: overlay_id_counter,
    node: node,
    overridden_style: {
      display: display_style
    }
  };
  save();
}


function create_overlay(node) {
  const el = document.createElement("div");
  const viewport_offset = node.getBoundingClientRect();
  Object.assign(el.style, {
    top: viewport_offset.top,
    left: viewport_offset.left,
    width: viewport_offset.width + "px",
    height: viewport_offset.height + "px",
    position: "fixed",
    opacity: 0.5,
    border: "solid 5px red",
    zIndex: 100,
    transition: "opacity 2s",
  });
  document.body.appendChild(el);
  overlays.push(el);
  setTimeout(() => {
    el.style.opacity = 0;
    el.addEventListener("transitionend", () => {
      document.body.removeChild(el);
      overlays.splice(overlays.indexOf(el), 1);
    }, true);
  }, 1000);
}


function find_header(node, depth=0) {
  const style = window.getComputedStyle(node);
  // Make sure that we don't overlay an existing overlay
  if (overlays.indexOf(node) !== -1) {
    return {depth: depth, node: undefined, searched_nodes: [node]};
  } else if (style.position == "fixed" || style.position == "sticky") {
    return {depth: depth, node: node, searched_nodes: [node]};
  } else if (node.parentElement == undefined || node.parentElement === document.body) {
    return {depth: depth, node: undefined, searched_nodes: [node]};
  } else {
    let result = find_header(node.parentElement, depth+1);
    result.searched_nodes.push(node);
    return result;
  }
}


browser.runtime.onMessage.addListener(
  (request, sender, send_response) => {
    console.debug("Got a request:");
    console.debug(request);
    switch (request.type) {
      case MENU_SELECT:
        const target = browser.menus.getTargetElement(request.targetElementId);
        const header = find_header(target);
        if (header.node) {
          console.log(`Found a parent that seems to be a header at depth ${header.depth}:`);
          console.log(header.node);
          // create_overlay(header.node);
          hide_overlay(header.node);
        } else {
          console.log(`Could not find a parent that seems to be a header... Searched ${header.depth} nodes upwards from selection.`);
        }
        break;
      case TYPE_UNHIDE:
        console.log("Unhide message!");
        console.log(request);
        break;
      default:
        console.error(`Unknown background message received: ${request.type}`)
        break;
    }
});

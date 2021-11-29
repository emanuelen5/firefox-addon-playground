let overlays = [];

function create_overlay(node) {
  const el = document.createElement("div");
  const viewport_offset = node.getBoundingClientRect();
  el.style.top = viewport_offset.top;
  el.style.left = viewport_offset.left;
  el.style.width = viewport_offset.width + "px";
  el.style.height = viewport_offset.height + "px";
  el.style.position = "fixed";
  el.style.opacity = 0.5;
  el.style.border = "solid 5px red";
  el.style.zIndex = 100;
  el.style.transition = "opacity 2s";
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
  } else if (style.position == "fixed") {
    return {depth: depth, node: node, searched_nodes: [node]};
  } else if (style.position == "sticky") {
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
    console.log("Version 1.1");
    console.log("Message from the content script: " + JSON.stringify(request));
    const target = browser.menus.getTargetElement(request.targetElementId);
    const header = find_header(target);
    if (header.node) {
      console.log(`Found a parent that seems to be a header at depth ${header.depth}:`);
      console.log(header.node);
      create_overlay(header.node);
    } else {
      console.log(`Could not find a parent that seems to be a header... Searched ${header.depth} nodes upwards from selection.`);
      console.log("Searched nodes:");
      for (let i=0; i<header.searched_nodes.length; i++) {
        console.log(header.searched_nodes[i]);
      }
    }
});

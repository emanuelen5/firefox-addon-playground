function find_header(node, depth=0) {
  const style = window.getComputedStyle(node);
  if (style.position == "fixed") {
    return {depth: depth, node: node};
  } else if (style.position == "sticky") {
    return {depth: depth, node: node};
  } else if (node.parentElement == undefined) {
    return {depth: depth, node: undefined};
  } else {
    return find_header(node.parentElement, depth+1);
  }
}


browser.runtime.onMessage.addListener(
  (request, sender, send_response) => {
    console.log("Message from the content script: " + JSON.stringify(request));
    const target = browser.menus.getTargetElement(request.targetElementId);
    const header = find_header(target);
    if (header.node) {
      console.log(`Found a parent that seems to be a header at depth ${header.depth}:`)
      console.log(header.node)
    } else {
      console.log(`Could not find a parent that seems to be a header... Searched ${header.depth} nodes upwards from selection.`)
    }
});

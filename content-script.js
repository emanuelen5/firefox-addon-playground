browser.runtime.onMessage.addListener(
  (request, sender, send_response) => {
    console.log("Message from the content script: " + JSON.stringify(request));
    const target = browser.menus.getTargetElement(request.targetElementId);
    console.log(target);
});

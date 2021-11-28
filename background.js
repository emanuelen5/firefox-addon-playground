const MENU_SELECT = "menu-marked";

browser.menus.create({
  id: MENU_SELECT,
  title: browser.i18n.getMessage("menuItemMarked"),
  contexts: ["all"]
}, 
function on_item_created() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
});


browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case MENU_SELECT:
      console.log("Sending message");
      let sending = browser.tabs.sendMessage(tab.id, {
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
      console.log("Sent message");
      break;
  }
});

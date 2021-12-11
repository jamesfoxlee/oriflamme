import { getMessages, sendMessage } from "./requests-xhr.js";
import { showMessages } from "./ui.js";

function addEventListeners() {
  document
    .querySelector(".button-send")
    .addEventListener("click", async (event) => {
      event.preventDefault();
      const input = document.querySelector(".compose__input");
      const val = input.value;
      input.value = "";
      try {
        await sendMessage({
          content: val,
        });
        const messages = await getMessages();
        showMessages(messages);
      } catch (err) {
        console.error("no data, it's all fucked");
        console.error(err);
      }
    });
}

window.addEventListener("DOMContentLoaded", async (event) => {
  addEventListeners();
  try {
    const messages = await getMessages();
    showMessages(messages);
  } catch (err) {
    console.error("no data, it's all fucked");
    console.error(err);
  }
});

// $x("//div[contains(text(), '-')]").filter((e) => /[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}/.test(e.innerText)).map((e) => e.style.filter = "blur(5px)");

setUUIDElementsBlur = (maxCount = 80, delayMillseconds = 20) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    const intervalId = window.setInterval(() => {
      if (maxCount <= count++) {
        window.clearInterval(intervalId);
        reject(`The trial count exceeds the limit(${maxCount}).`);
      }
      const expression = "(//div|//span|//code)[text()[contains(., '-')]][not(contains(@style, 'blur'))]";
      const targets = document.evaluate(expression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
      if (targets.snapshotLength > 0) {
        let found = false;
        for (i = 0; i < targets.snapshotLength; i++) {
          const el = targets.snapshotItem(i);
          if (/.*[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}.*/.test(el.innerText)) {
            el.style.filter = "blur(5px)";
            found = true;
          }
        }
        if (found) {
          console.log('Found uuid.');
          window.clearInterval(intervalId);
          resolve();
        }
      }
    }, delayMillseconds);
  });
}

setUUIDElementsBlur()
  .catch(e => console.log(`e: ${e}`));

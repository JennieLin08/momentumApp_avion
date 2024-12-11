export const quote = function () {
  return fetch("https://dummyjson.com/quotes?limit=10")
    .then((data) => data.json())
    .then((data) => {
      appStateLS.appRandomQuotes = data.quotes;
      localStorage.setItem("appStateLS", JSON.stringify(appStateLS));

      let quotelength = appStateLS.appRandomQuotes.length - 1;
      const randomNumber = Math.floor(Math.random() * quotelength + 1);
      // console.log(appStateLS.appRandomQuotes[randomNumber].quote);
      quoteDis.innerHTML = appStateLS.appRandomQuotes[randomNumber].quote;
    });
};

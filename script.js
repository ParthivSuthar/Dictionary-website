const form = document.querySelector("form");
const result = document.querySelector(".result");
const input = document.querySelector("#input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const inputValue = input.value;
  getWordInfo(inputValue);
});

const getWordInfo = async function (word) {
  try {
    result.innerHTML = "Fetching data.....";
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    console.log(data);
    let definitions = data[0].meanings[0].definitions[0];
    result.innerHTML = `<h2><strong>Word: </strong>${data[0].word}</h2>
                <p class="partofspeech">${data[0].meanings[0].partOfSpeech}</p>
                <p><strong>Meaning: </strong>${
                  definitions.definition === undefined
                    ? "Not Found"
                    : definitions.definition
                }</p>
                <p><strong>Example: </strong>${
                  definitions.example === undefined
                    ? "Not Found"
                    : definitions.example
                }</p>
                <p><strong>Antonyms:</strong></p>
                <ul class="antonyms"></ul>
                <p><strong>Synonyms:</strong></p>
                <ul class="synonyms"></ul>
                `;

    // Fetching Antonyms
    const antonyms = definitions.antonyms;
    const antonymsList = result.querySelector(".antonyms");
    if (!antonyms || antonyms.length === 0) {
      antonymsList.innerHTML += `<li>Not Found</li>`;
    } else {
      for (let i = 0; i < antonyms.length; i++) {
        antonymsList.innerHTML += `<li>${antonyms[i]}</li>`;
      }
    }

    // Fetching Synonyms
    const synonyms = definitions.synonyms;
    const synonymsList = result.querySelector(".synonyms");
    if (!synonyms || synonyms.length === 0) {
      synonymsList.innerHTML += `<li>Not Found</li>`;
    } else {
      for (let i = 0; i < synonyms.length; i++) {
        synonymsList.innerHTML += `<li>${synonyms[i]}</li>`;
      }
    }

    // Adding audio

    let listenAudio = new Audio();
    listenAudio.src = data[0].phonetics[2].audio;
    listenAudio.play();

    // Adding Read More link

    result.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
  } catch (error) {
    result.innerHTML = `<p>Sorry, the word could not be found</p>`;
  }
};

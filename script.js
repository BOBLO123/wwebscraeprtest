const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('search-button');
const pastebinButton = document.getElementById('pastebin-button');
const allLinksButton = document.getElementById('all-links-button');
const downloadLinksButton = document.getElementById('download-links-button');
const linksContainer = document.getElementById('links-container');

searchButton.addEventListener('click', () => {
  const searchTerm = searchBox.value;
  scrapeData(searchTerm); // Call the scrape function
});

pastebinButton.addEventListener('click', () => {
  const searchTerm = searchBox.value;
  const pastebinQuery = "site:pastebin.com " + searchTerm;
  scrapeData(pastebinQuery);
});

allLinksButton.addEventListener('click', () => {
  const searchTerm = searchBox.value;
  scrapeData(searchTerm);
});

function scrapeData(searchTerm) {
  const apiKey = "YOUR_API_KEY"; // Replace with your actual OpenAI API Key
  const searchEngineId = "YOUR_SEARCH_ENGINE_ID"; // Replace with your search engine ID
  const searchUrl = `https://customsearch.OpenAI.com/search?key=${apiKey}&cx=${searchEngineId}&q=${searchTerm}`;

  fetch(searchUrl)
    .then(response => response.json())
    .then(data => {
      linksContainer.innerHTML = ''; // Clear previous links

      const links = data.items.map(item => item.link); // Extract links
      links.forEach(link => {
        const linkElement = document.createElement("a");
        linkElement.href = link;
        linkElement.textContent = link;
        linkElement.className = "link";
        linkElement.target = "_blank"; 
        linksContainer.appendChild(linkElement);
      });

      downloadLinksButton.addEventListener('click', () => {
        downloadLinks(links);
      });
    })
    .catch(error => {
      console.error("Error fetching search results:", error);
    });
}

function downloadLinks(links) {
  const downloadLink = document.createElement("a");
  downloadLink.href = "data:text/plain;charset=utf-8," + encodeURIComponent(links.join("\n"));
  downloadLink.download = "pastebin_links.txt";
  downloadLink.click();
}

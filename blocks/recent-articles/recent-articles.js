export default async function decorate($block) {
  try {
    // Fetch data from query-index.json file to get list of 3 latest articles
    const response = await fetch('/query-index.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Check if data.data is defined
    if (!data.data) {
      throw new Error('data.data is undefined');
    }

    // Iterate over the list and create a card for each article
    const articles = data.data.slice(0, 4); // Fetch up to 4 articles
    const cardList = document.createElement('div');
    cardList.classList.add('card-list');
    articles.forEach((article) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <div class="card-image">
            <img src="${article.image}" alt="${article.title}">
          </div>
          <div class="card-text">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.path}" class="button primary">Read More</a>
          </div>
        `;
      cardList.append(card);
    });

    // Replace content of the block with the list of cards
    $block.replaceChildren(cardList);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in decorate function:', error);
  }
}

async function fetchFragment(url) {
  if (url && url.startsWith('/')) {
    const response = await fetch(url);
    if (response.ok) {
      const domParser = new DOMParser();
      return domParser.parseFromString(await response.text(), 'text/html');
    }
  }
  return null;
}

function extractMetadata(attribute, documentObj = document) {
  const attributeType = attribute && attribute.includes(':') ? 'property' : 'name';
  const metadata = [...documentObj.head.querySelectorAll(`meta[${attributeType}="${attribute}"]`)].map((metaTag) => metaTag.content).join(', ');
  return metadata || '';
}

export default async function decorate($block) {
  const anchor = $block.querySelector('a');
  const url = anchor ? anchor.getAttribute('href') : $block.textContent.trim();
  const documentFragment = await fetchFragment(url);
  if (!documentFragment) {
    return;
  }

  const headline = extractMetadata('og:title', documentFragment);
  const description = extractMetadata('og:description', documentFragment);

  const preTitle = document.createElement('p');
  preTitle.classList.add('pretitle');
  preTitle.textContent = 'Featured Article';

  const heading = document.createElement('h2');
  heading.textContent = headline;

  const paragraph = document.createElement('p');
  paragraph.textContent = description;

  const linkContainer = document.createElement('div');
  linkContainer.append(anchor);
  anchor.textContent = 'Read More';
  anchor.className = 'button primary';

  const textContainer = document.createElement('div');
  textContainer.classList.add('text');
  textContainer.append(preTitle, heading, paragraph, linkContainer);

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image');
  const heroImage = documentFragment.querySelector('body > main picture');
  if (heroImage) {
    imageContainer.append(heroImage);
  }

  $block.replaceChildren(imageContainer, textContainer);
}

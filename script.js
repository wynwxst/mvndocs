
// The JSON structure is assumed to be:
// {
//   "pages": [
//     {
//       "heading": "Getting Started",
//       "subpages": [
//         {"title": "Installation", "url": "installation.html"},
//         {"title": "Quick Start", "url": "quickstart.html"}
//       ]
//     },
//     {
//       "heading": "API Reference",
//       "subpages": [
//         {"title": "Authentication", "url": "auth.html"},
//         {"title": "Endpoints", "url": "endpoints.html"}
//       ]
//     }
//   ]
// }
const sidebarJsonUrl = 'https://wynwxst.github.io/mvndocs/pages.json'; // Change this to your actual JSON URL

// Example markdown file URL (or you could inline the markdown)
markdownUrl = 'page.md'; // 
function setMDURL(url){
  markdownUrl = url;
  return
}

// Array of sample tarot card image URLs
const tarotCards = [
  'https://via.placeholder.com/100x150?text=Tarot+1',
  'https://via.placeholder.com/100x150?text=Tarot+2',
  'https://via.placeholder.com/100x150?text=Tarot+3',
  'https://via.placeholder.com/100x150?text=Tarot+4',
  'https://via.placeholder.com/100x150?text=Tarot+5'
];

// Load sidebar data from JSON
fetch(sidebarJsonUrl)
  .then(response => response.json())
  .then(data => {
    const sidebarContent = document.getElementById('sidebar-content');
    data.pages.forEach((page, index) => {
      // Create heading with dropdown icon
      const heading = document.createElement('h2');
      heading.textContent = page.heading;

      // Create dropdown icon element (using a simple arrow)
      const icon = document.createElement('span');
      icon.classList.add('dropdown-icon');
      icon.textContent = '▼'; // icon can be toggled

      heading.appendChild(icon);
      sidebarContent.appendChild(heading);

      // Create list for subpages
      const list = document.createElement('ul');
      page.subpages.forEach(subpage => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = subpage.url;
        link.textContent = subpage.title;
        listItem.appendChild(link);
        list.appendChild(listItem);
      });
      sidebarContent.appendChild(list);

      // Toggle list visibility on heading click
      heading.addEventListener('click', () => {
        if (list.style.display === 'none' || list.style.display === '') {
          list.style.display = 'block';
          icon.textContent = '▲';
        } else {
          list.style.display = 'none';
          icon.textContent = '▼';
        }
      });
    });
  })
  .catch(err => console.error('Error loading sidebar JSON:', err));

// Load and render markdown content
fetch(markdownUrl)
  .then(response => response.text())
  .then(markdownText => {
    const contentDiv = document.getElementById('markdown-content');
    contentDiv.innerHTML = marked.parse(markdownText);
  })
  .catch(err => console.error('Error loading markdown file:', err));

// Function to set random tarot card images and positions
function setRandomTarotCards() {
  // Randomly select a card for each container
  const leftCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
  const rightCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];

  const tarotLeft = document.getElementById('tarot-left');
  const tarotRight = document.getElementById('tarot-right');

  tarotLeft.style.backgroundImage = `url(${leftCard})`;
  tarotRight.style.backgroundImage = `url(${rightCard})`;

  // Randomly adjust the vertical position within a range (but not overlapping the main content)
  tarotLeft.style.top = `${20 + Math.random() * 100}px`;
  tarotRight.style.top = `${20 + Math.random() * 100}px`;
}

// Set tarot cards on load and optionally on reloads
setRandomTarotCards();

const card = document.createElement('div');
card.classList.add('counselor-card');

card.innerHTML = `
  <div class="card-header">
    <img src="${expert.profilePicture || 'https://www.example.com/default-image.jpg'}" alt="${expert.name}" class="expert-image">
    <h3>${expert.name}</h3>
    <p class="expert-field">${expert.industry}</p>
    <p class="expert-experience">${expert.yearsOfExperience} years of experience</p>
  </div>
  <button onclick="showExpertDetails('${doc.id}')" class="btn more-info-btn">More Info</button>
`;

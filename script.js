// script.js

document.getElementById('careerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Get form values
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  // Create a new card element
  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <a href="#" class="btn">View Roadmap</a>
  `;

  // Append the new card to the submittedCareers section
  document.getElementById('submittedCareers').appendChild(newCard);

  // Clear the form
  document.getElementById('careerForm').reset();
});




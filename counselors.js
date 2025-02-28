// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzWlkk8LgLttBhuZmFMU4WksoBMokZDc8",
  authDomain: "tech-udaan.firebaseapp.com",
  projectId: "tech-udaan",
  storageBucket: "tech-udaan.appspot.com",
  messagingSenderId: "403694571314",
  appId: "1:403694571314:web:274300acf549146b33512b",
  measurementId: "G-HW76PPPM67"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

// Fetch and display experts
document.addEventListener('DOMContentLoaded', async function () {
  const expertsList = document.getElementById('experts-list');

  try {
    const querySnapshot = await db.collection('experts').get();
    querySnapshot.forEach((doc) => {
      const expert = doc.data();
      const card = document.createElement('div');
      card.classList.add('counselor-card');

      // Check if the profile picture exists or use default if not
      const imageURL = expert.profilePicture || 'default-image-url'; // Set your default image URL

      card.innerHTML = `
        <h3>${expert.name}</h3>
        <img src="${imageURL}" alt="${expert.name}" class="expert-image">
        <p>Years of Guidance: ${expert.yearsOfGuidance}</p>
        <p>Field: ${expert.field}</p>
        <button onclick="showExpertDetails('${doc.id}')" class="btn">More Info</button>
      `;
      expertsList.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching experts: ', error);
  }
});

// Show expert details in modal
function showExpertDetails(id) {
  const modal = document.getElementById('expert-modal');
  const modalName = document.getElementById('modal-name');
  const modalYears = document.getElementById('modal-years');
  const modalField = document.getElementById('modal-field');
  const modalEmail = document.getElementById('modal-email');
  const modalLinkedIn = document.getElementById('modal-linkedin');
  const modalWebsite = document.getElementById('modal-website');
  const modalTools = document.getElementById('modal-tools');
  const modalAvailability = document.getElementById('modal-availability');
  const modalTimezone = document.getElementById('modal-timezone');
  const modalExperience = document.getElementById('modal-experience');
  const modalEducation = document.getElementById('modal-education');
  const modalCertifications = document.getElementById('modal-certifications');
  const modalLanguages = document.getElementById('modal-languages');
  const modalTestimonials = document.getElementById('modal-testimonials');
  const modalExpertImage = document.getElementById('modal-expert-image'); // Image element in modal

  db.collection('experts').doc(id).get().then((doc) => {
    const expert = doc.data();
    // Set expert details in the modal
    modalName.textContent = expert.name;
    modalYears.textContent = `Years of Guidance: ${expert.yearsOfGuidance}`;
    modalField.textContent = `Field: ${expert.field}`;
    modalEmail.textContent = `Email: ${expert.email || 'N/A'}`;
    modalLinkedIn.textContent = `LinkedIn: ${expert.linkedin || 'N/A'}`;
    modalWebsite.textContent = `Website: ${expert.website || 'N/A'}`;
    modalTools.textContent = `Tools/Technologies: ${expert.tools || 'N/A'}`;
    modalAvailability.textContent = `Availability: ${expert.availability || 'N/A'}`;
    modalTimezone.textContent = `Time Zone: ${expert.timezone || 'N/A'}`;
    modalExperience.textContent = `Experience: ${expert.experience || 'N/A'}`;
    modalEducation.textContent = `Education: ${expert.education || 'N/A'}`;
    modalCertifications.textContent = `Certifications: ${expert.certifications || 'N/A'}`;
    modalLanguages.textContent = `Languages: ${expert.languages || 'N/A'}`;
    modalTestimonials.textContent = `Testimonials: ${expert.testimonials || 'N/A'}`;

    // Display profile picture in the modal
    const imageURL = expert.profilePicture || 'default-image-url'; // Set your default image URL
    modalExpertImage.src = imageURL;

    modal.style.display = 'block';
  });

  // Close modal
  const closeBtn = document.querySelector('.close');
  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };

  // Book a Slot
  const bookSlotBtn = document.getElementById('book-slot');
  bookSlotBtn.onclick = () => {
    alert('Booking slot for ' + modalName.textContent);
    modal.style.display = 'none';
  };
}

// Handle file upload and saving image URL to Firestore
async function handleFileUpload(file) {
  const storageRef = storage.ref('experts/' + file.name); // You can change the path if needed
  try {
    await storageRef.put(file); // Upload file to Firebase Storage
    const downloadURL = await storageRef.getDownloadURL(); // Get the file's download URL
    return downloadURL; // Return the URL
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}

// Save expert details including profile picture URL to Firestore
async function saveExpertDetails(name, yearsOfGuidance, field, file) {
  const imageURL = file ? await handleFileUpload(file) : 'default-image-url'; // Upload image and get URL

  const expertData = {
    name: name,
    yearsOfGuidance: yearsOfGuidance,
    field: field,
    profilePicture: imageURL,
    email: 'N/A',
    linkedin: 'N/A',
    website: 'N/A',
    tools: 'N/A',
    availability: 'N/A',
    timezone: 'N/A',
    experience: 'N/A',
    education: 'N/A',
    certifications: 'N/A',
    languages: 'N/A',
    testimonials: 'N/A',
  };

  try {
    await db.collection('experts').add(expertData); // Add expert to Firestore
    console.log('Expert added successfully!');
  } catch (error) {
    console.error('Error saving expert:', error);
  }
}

// Example usage: Call saveExpertDetails when the form is submitted
document.getElementById('expert-form').onsubmit = (e) => {
  e.preventDefault();

  const name = document.getElementById('expert-name').value;
  const yearsOfGuidance = document.getElementById('years-of-guidance').value;
  const field = document.getElementById('expert-field').value;
  const file = document.getElementById('profile-picture').files[0]; // Get the file from input

  saveExpertDetails(name, yearsOfGuidance, field, file); // Call function to save details
};

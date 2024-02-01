import domtoimage from 'dom-to-image';

//* CONSTANTS 
const nameElement = document.getElementById('name') as HTMLInputElement;
const collegeNameElement = document.getElementById('collegeName') as HTMLInputElement;
const locationElement = document.getElementById('location') as HTMLInputElement;
const profileImageElement = document.getElementById('profileImage') as HTMLInputElement;
const cardNameElement: HTMLElement = document.getElementById('cardName');
const cardCollegeNameElement: HTMLElement = document.getElementById('cardCollegeName');
const cardLocationElement: HTMLElement = document.getElementById('cardLocation');
const userPhoto: HTMLElement = document.getElementById('userPhoto');
const collegeCard: HTMLElement = document.getElementById('collegeCard');
const generateCardBtn: HTMLElement = document.getElementById('submitButton');

window.onload = function (): void {
  clearAllFields();
  collegeCard.style.display = 'none';
}

//* EVENT LISTENERS
profileImageElement.addEventListener('change', function (e: Event): void {
  const target = e.target as HTMLInputElement;
  const file: File = target.files[0];

  const reader: FileReader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = function (): void {
    const result: string | ArrayBuffer = reader.result;
    userPhoto.innerHTML = result ? `<img src="${result}" alt="user photo" width="125px" height="150px"/>` : '';
  }
});

generateCardBtn.addEventListener('click', generateCard);


//* FUNCTIONS
function generateCard(): void {
  
  //get value of Student name from form input and assign it to the cardNameElement
  const nameValue: string = nameElement.value;
  cardNameElement.textContent = nameValue;

  //get value of College name from form input and assign it to the cardCollegeNameElement
  const collegeValue: string = collegeNameElement.value;
  cardCollegeNameElement.textContent = collegeValue;

  //get value of Location name from form input and assign it to the cardLocationElement
  const locationValue: string = locationElement.value;
  cardLocationElement.textContent = locationValue;

  //Display final generated card to the user
  collegeCard.style.display = 'block';

  //Display a default image if user doesn't upload any image
  if (!profileImageElement.value) {
    userPhoto.innerHTML = `<i class="fas fa-user-circle" alt="user photo" width="100%" height="100%"></i>`;
  }

  //Download the generated card
  downloadCard();

  clearAllFields();
}

function downloadCard(): void {
  domtoimage.toPng(collegeCard, { quality: 0.95 })
    .then(function (dataUrl: string) {
        var link: HTMLAnchorElement = document.createElement('a');
        link.download = 'my-id-card.png';
        link.href = dataUrl;
        link.click();
        document.body.removeChild(link);
    })
}

function clearAllFields(): void {
  nameElement.value = '';
  collegeNameElement.value = '';
  locationElement.value = '';
  profileImageElement.value = '';
}
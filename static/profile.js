function submitProfile(evt) {
  evt.preventDefault();

  const data = {
    name: document.querySelector('#name-field').value,
    age: document.querySelector('#age-field').value,
    occupation: document.querySelector('#occupation-field').value,
    salary: document.querySelector('select[name="salary"]').value,
    education: document.querySelector('select[name="education"]').value,
    state: document.querySelector('#state-field').value,
    garden: document.querySelector('input[name="garden"]:checked').value,
    tv: document.querySelector('select[name="tv"]').value
  };

  const checkboxes = document.getElementsByName('city');
  for(let i = 0; i < checkboxes.length; i++ ){
    if(checkboxes[i].checked === true) {
      const cityType = checkboxes[i].value;
      data[cityType] = cityType;
    }
  }

  //console.log(data);
  
  fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(responseJson => {
    const profiles = document.querySelector('#profiles')
    profiles.insertAdjacentHTML(
      'beforeend', 
      `<p>Full Name: ${responseJson.fullname}</p>
      <p>Age: ${responseJson.age}</p>
      <p>Occupation: ${responseJson.occupation}</p>
      <p>Salary: ${responseJson.salary}</p>
      <p>Education: ${responseJson.education}</p>
      <p>State: ${responseJson.state}</p>
      <p>Do you garden: ${responseJson.garden}</p>
      <p>How much TV: ${responseJson.tv}hrs</p>`
      );
    //console.log(responseJson);
    const cityType = []
    if(responseJson.urban){
      cityType.push(responseJson.urban)
    }
    if(responseJson.rural){
      cityType.push(responseJson.rural)
    }
    if(responseJson.suburban){
      cityType.push(responseJson.suburban)
    }
    for(type of cityType){
      profiles.insertAdjacentHTML('beforeend', `<p>City Type: ${type}</p>`)
    }
  });
}

document.querySelector('#profile-form').addEventListener('submit', submitProfile);

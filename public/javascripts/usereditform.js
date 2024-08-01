 // Get the "Edit Profile" button element
 const editBtn = document.querySelector('.editbtn');

 // Get the element with the class "profileducation"
 const profileEducation = document.querySelector('.profileducation');
 const profiledivthree = document.querySelector('.profiledivthree');
 // Add an event listener to the "Edit Profile" button
 const useredtidetailsform=document.querySelector('.useredtidetailsform');
 editBtn.addEventListener('click', function() {
     // Hide the element with the class "profileducation"
     profileEducation.style.display = 'none';
     profiledivthree.style.display = 'none';
     useredtidetailsform.style.display='block';

     document.querySelector('#chooseclass').value=document.querySelector('.classvalue').innerText;
     document.querySelector('#choosetheuniversity').value=document.querySelector('.uniname').innerHTML;
     document.querySelector('#choosecollege').value=document.querySelector('.collegename').innerHTML;
     document.querySelector('#chooseemail').value=document.querySelector('.parentemail').innerHTML;
     document.querySelector('#choosemobileno').value=document.querySelector('.parentmobileno').innerHTML
 });

 const savebtn = document.querySelector('.savebtn');

savebtn.addEventListener('click',function(){
    document.querySelector('.classvalue').innerText=document.querySelector('#chooseclass').value;
    document.querySelector('.uniname').innerText=document.querySelector('#choosetheuniversity').value;
    document.querySelector('.collegename').innerText=document.querySelector('#choosecollege').value;
    document.querySelector('.parentemail').innerText=document.querySelector('#chooseemail').value;
    document.querySelector('.parentmobileno').innerText=document.querySelector('#choosemobileno').value;



    useredtidetailsform.style.display='none';

    profileEducation.style.display = 'block';
    profiledivthree.style.display = 'block';

});

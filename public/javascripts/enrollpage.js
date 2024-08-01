var items = document.querySelectorAll('.onepayment');

// Add click event listener to each list item
items.forEach(function (item) {
  var hiddenDiv = item.querySelector('.hidden-div');

  item.addEventListener('click', function () {
    // Reset background color for all items to liteblue
    items.forEach(function (el) {
      el.style.backgroundColor = 'rgb(209, 240, 230)';
    });

    // Set background color for the clicked item to white
    item.style.backgroundColor = 'white';

    // Toggle the visibility of the hidden div
    if (hiddenDiv.style.display === 'none' || hiddenDiv.style.display === '') {
      // Close all other divs
      closeAllDivs();

     
      // Open the div for the clicked item
      hiddenDiv.style.display = 'block';
    } else {
      // Close the div for the clicked item
     
    }
  });
});

function closeAllDivs() {
  // Close all hidden divs
  items.forEach(function (item) {
    var hiddenDiv = item.querySelector('.hidden-div');
    hiddenDiv.style.display = 'none';
    listofViewBanks.style.display = 'none';

  
    
  });
}

// Open the first list item's div by default
var firstItem = document.querySelector('.default-open');
var firstHiddenDiv = firstItem.querySelector('.hidden-div');
firstItem.style.backgroundColor = 'rgb(209, 240, 230)';
firstHiddenDiv.style.display = 'block';




// Open the first list item's div by default
var firstItem = document.querySelector('.default-open');
var firstHiddenDiv = firstItem.querySelector('.hidden-div');
firstItem.style.backgroundColor = 'white';
firstHiddenDiv.style.display = 'block';


//By continuing to pay, I understand and agree with the privacy policy, the user agreement and terms of service of makemytrip.
const banks = [
  {
      name: 'Axis Bank',
      logo: '/images/axix.png',
      website: 'https://www.axisbank.com',

  },
  {
      name: 'HDFC Bank',
      logo: '/images/hdfc.png',
      website: "https://www.hdfcbank.com/personal/pay/bill-payments",

  },
  {
      name: 'ICICI Bank',
      logo: '/images/icici.png',
      website: "https://www.icicibank.com/business-banking/cash-management-services/eazypay-contactless-collections",

  },
  {
      name: 'State bank of india',
      logo: '/images/sbi.png',
      website: "https://www.sbiepay.sbi/",

    },
  {
      name:'Canera Bank',
      logo: '/images/canerabank.png',
      website: "https://bankinggenie.wordpress.com/2019/05/01/canara-easy-fee/",

    },
  {
    name:'Bank Of India',
    logo: '/images/banofindia.png',
    website: "https://easypay.in/",

  },
{
  name:'City Bank',
  logo: '/images/citybank.png',
  website: "https://www.online.citibank.co.in/personal-banking/online-services/online-payments/e-pay",

},
{
  name:'AU small finance',
  logo: '/images/au.png',
  website: "https://www.aubank.in/business-banking/collection-receivable-solutions/payment-gateway",

},
{
  name:'Bank Of Baroda',
  logo: '/images/bankofbaroda.png',
  website: "https://www.bankofbaroda.in/personal-banking/digital-products/cards/credit-cards/easy",

},
{
  name:'Bajaj Finance',
  logo: '/images/bj.png',
  website: "https://www.bajajfinserv.in/bajaj-payment-online",

},
{
  name:'RBL Bank',
  logo: '/images/rblbank.png',
  website: "http://www.rblbank.com/credit-card-payments",

},
{
  name:'HDFC Bank',
  logo: '/images/hdfc.png',
  website: "https://www.hdbfs.com/customer-services/make-payment",

},
{
  name:'Kotak Mahindra Bank',
  logo: '/images/kotak.png',
  website: "https://www.kotak.com/en/personal-banking/cards/debit-cards/debit-card-services/easy-pay-debit-card.html",
  
},
{
  name:'IDFC Bank',
  logo: '/images/idfc.png',
  website: "https://reporting.idfcfirstbank.com/QuickPay/Login/LoginEMI.aspx",
},
{
  name:"YES Bank",
  logo:"/images/yesbank.png",
  website:"https://www.yesbank.in/yes-pay-easy",
},

];

// Function to display the list of banks with radio buttons
function displayBanks() {
  const bankList = document.getElementById('bankList');
  bankList.innerHTML = '';

  banks.forEach((bank, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
          <label>
              <input type="radio" name="bank" value="${bank.name}">
              <img src="${bank.logo}"   width="50" height="50">
              ${bank.name}
          </label>
      `;
      bankList.appendChild(listItem);
  });
 // Add a click event listener to the "Pay" button
          
        }

// Initial display of banks
displayBanks();


  const viewAllBanksButton = document.querySelector('.viewallbank');
  const listofViewBanks = document.querySelector('.listoftheviewbanks');
  const divs= document.querySelector(".payment_one");


///////////////////////////
document.querySelector('.paybutton').addEventListener('click', function () {
  const selectedBankName = document.querySelector('input[name="bank"]:checked');
  if (selectedBankName) {
    const selectedBank = banks.find((bank) => bank.name === selectedBankName.value);
    if (selectedBank) {
      // Open the selected bank's website in a new tab
      window.open(selectedBank.website, '_blank');
    }
  } else {
    alert(`
    VIVAAKS TECHNOLOGY please select bank !!`);
  }





});
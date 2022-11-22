
let contacts = [
	{
		name: 'Darian',
		surname: 'Piro',
		phoneNumber: '015777918455',
		email: 'strayvagrant@gmail.com',
		street: 'Beermannstrasse 8',
		zipCode: '01435',
		city: 'Berlin'
	},
	{
		name: 'Debora',
		surname: 'Heinen',
		phoneNumber: '024188888',
		email: 'dheinen@gmx.net',
		street: 'Musterstr. 6',
		zipCode: '01435',
		city: 'Berlin'
	},
];

let addContact = function(name, surname, phoneNumber, email, street, zipCode, city){
	let newContact = {
		name: name,
		surname: surname,
		phoneNumber: phoneNumber,
		email: email,
		street: street,
		zipCode: zipCode,
		city: city
	};
	Object.keys(newContact).forEach(key => {
		if (newContact[key] === '') delete newContact[key]
	});
	contacts.push(newContact);
	contacts.sort((a,b) => a.name.localeCompare(b.name));
	$('#list').html(listNames());
};

let printName = function(personId) {
	return `<li><a href='#' class='name-link' id='${personId.name}'> ${personId.name} ${personId.surname} </a> <span class="delete" id='${personId.name}'>&times;</span></li>`;
};

let printAdress = function(personId) {
	let adress = `Name: ${personId.name}<br>
				Surname: ${personId.surname} <br>
				Phone Number: ${personId.phoneNumber}<br>
				Email: ${personId.email}<br>
				Street: ${personId.street}<br>
				zipCode: ${personId.zipCode}<br>
				City: ${personId.city}<br>
				`
	return adress
};

let listNames = function(){
	let nameList = [];
	contacts.forEach(el => nameList.push(printName(el)));
	return nameList.join('');
};

$('#list').html(listNames());

$('#contacts').click(function(){
	$('#list').html(listNames());
});

$('#searchInput').on('keyup', function() {
  let val = $(this).val().toLowerCase();
  $("#list li").show().filter(function() {
    return $(this).text().toLowerCase().indexOf(val) == -1;
  }).hide();
});

$('#add-contact').click(function(){
	$('#adress-form').show();
	$('#form').show();
});

$('.close').click(function(){
	$('#adress-form').hide();
	$('#success').text('');
	$('#form').find('input:text').val('');
});

$('#form').on('submit', function(event) {
	let name=$(this).find('#name').val();
	let surname=$(this).find('#surname').val();
	let phoneNumber=$(this).find('#phoneNumber').val();
	let email=$(this).find('#email').val();
	let street=$(this).find('#street').val();
	let zipCode=$(this).find('#zipCode').val();
	let city=$(this).find('#city').val();
	addContact(name, surname, email, phoneNumber, email, street, zipCode, city)
	$('#form').hide();
	$('#success').text(name + ' added!');
	$(this).find('input:text').val('');
	event.preventDefault();
});

//$('#list').html(printAdress(contacts[0]));


$('.delete').click(function(){
	return console.log($(this));
});

$("#Darian").click(function(){
	let id = $(this).attr('id');
	return console.log($(this).attr('id'));
});

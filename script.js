
let contacts = [
		{
		name: 'Adam',
		surname: 'Mustermann',
		phoneNumber: '0741 250152',
		email: 'adam@gmx.net',
		street: 'Frankfurter Allee 29',
		zipCode: '78628',
		city: 'Rottweil'
	},
	{
		name: 'Florence',
		surname: 'Jones',
		phoneNumber: '030905884',
		email: 'random@gmail.com',
		street: 'Beispielstr. 9',
		zipCode: '01435',
		city: 'Berlin'
	},
	{
		name: 'Cathrine',
		surname: '',
		phoneNumber: '024188888',
		email: 'Cathrine89@gmail.net',
		street: 'Musterstr. 6',
		zipCode: '37293',
		city: 'Herleshausen'
	},
	{
		name: 'John',
		surname: 'Doe',
		phoneNumber: '07044 24 66 60',
		email: 'JD@googlemail.com',
		street: 'Meinekestrasse 16',
		zipCode: '49143',
		city: 'Bissendorf'
	},
];

let loadNames = function(){
	if (contacts.length == 0) $('#list').html('<p class="center">Adressbook empty</p>'); 
		else{
			let printName = function(personId) {
				if (personId.surname === '' || personId.surname === undefined && contacts.indexOf(personId) !== contacts.length-1) {
					let $constructed = $('#constructor1').clone().html().replace(/\${personId.name}/g, personId.name)
					return $constructed += $('.sm-li').html();
				}
				else if (personId.surname === '' || personId.surname === undefined && contacts.indexOf(personId) == contacts.length-1) {
					let $constructed = $('#constructor1').clone().html().replace(/\${personId.name}/g, personId.name)
					return $constructed;
				}
				else if (contacts.indexOf(personId) !== contacts.length-1) {
					let $constructed = $('#constructor2').clone().html().replace(/\${personId.name}/g, personId.name).replace(/\${personId.surname}/g, personId.surname)
					return $constructed += $('.sm-li').html();
				}
				else {
					let $constructed = $('#constructor2').clone().html().replace(/\${personId.name}/g, personId.name).replace(/\${personId.surname}/g, personId.surname)
					return $constructed;
				}
			};
			let nameList = [];
			contacts.sort((a,b) => a.name.localeCompare(b.name)).forEach(el => nameList.push(printName(el)));
			$('#list').html(nameList.join(''));
		}
};
				
let fillForm = function(a){
	let personId = contacts.findIndex(x => x.name === $(a).attr('id'));
	$('#name').val(contacts[personId].name);
	$('#surname').val(contacts[personId].surname);
	$('#phoneNumber').val(contacts[personId].phoneNumber);
	$('#email').val(contacts[personId].email);
	$('#street').val(contacts[personId].street);
	$('#zipCode').val(contacts[personId].zipCode);
	$('#city').val(contacts[personId].city);
};

let clearForm = function() {
	$('#form input').not(':submit').val('');
	$('.text-input').css("background-color", "transparent");
};

let readonlyOn = () => $('#form input').attr('readonly', true);

let readonlyOff = function() {
	$('#form input').attr('readonly', false);
	$('.text-input').css("background-color", "#EAEBEA");
};

loadNames();

$('#searchInput').on('keyup', function() {
  let input = $(this).val().toUpperCase();
  $("#list div").filter(function() {
  	$(this).toggle($(this).text().toUpperCase().indexOf(input) > -1)
  });
});

$(".top").on( "click", ".back", function() {
	$('.back, #profile, .profile-edit, #save-contact').hide();
	$('.contacts-title, .search-bar, #add-contact').show();
	$('#adress-list').show();
	readonlyOn();
	clearForm();
});

$(".main").on( "click", ".name-link", function() {
	fillForm(this)
	$('.contacts-title, .search-bar, #adress-list, #add-contact').hide();
	$('.back, .profile-edit').show();
	$('#profile').show('slow');
	readonlyOn();
});

$(".main").on( "click", ".edit", function() {
	fillForm(this)
	$('.contacts-title, .search-bar, #adress-list, #add-contact').hide();
	$('.back, #save-contact').show();
	$('#profile').show('slow');
	readonlyOff();
});

$(".main").on( "click", ".delete", function() {
	let personId = contacts.findIndex(x => x.name === $(this).attr('id'));
	contacts.splice(personId, 1);
	loadNames();
});

$('.main').on('submit', function(event) {
	let newContact = {
		name: $(this).find('#name').val(),
		surname: $(this).find('#surname').val(),
		phoneNumber: $(this).find('#phoneNumber').val(),
		email: $(this).find('#email').val(),
		street: $(this).find('#street').val(),
		zipCode: $(this).find('#zipCode').val(),
		city: $(this).find('#city').val()
	};
	for(i=0; i<contacts.length-1; i++){
		if (contacts[i].name === $(this).find('#name').val()) delete contacts[i]
	}
	Object.keys(newContact).forEach(key => {
		if (newContact[key] === '') delete newContact[key]
	});
	contacts.push(newContact);
	contacts.sort((a,b) => a.name.localeCompare(b.name));
	loadNames();
	$('.back, #profile, .profile-edit, #save-contact').hide();
	$('.contacts-title, .search-bar, #add-contact').show();
	$('#adress-list').show();
	clearForm();
	event.preventDefault();
});

$(".bottom").on( "click", "#add-contact", function() {
	$('#adress-list, #add-contact, .contacts-title').hide();
	$('.back, #save-contact').show();
	$('#profile').show('slow');
	clearForm();
	readonlyOff();
});

$(".bottom").on( "click", ".edit", function() {
	$('.profile-edit').hide();
	$('#save-contact').show();
	readonlyOff();
});

$(".bottom").on( "click", ".delete", function() {
	let personId = contacts.findIndex(x => x.name == $('#name').val());
	contacts.splice(personId, 1);
	$('.back, #profile, .profile-edit').hide();
	$('.contacts-title, .search-bar, #add-contact').show();
	$('#adress-list').show();
	loadNames();
	clearForm();
});
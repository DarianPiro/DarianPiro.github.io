
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
		name: 'Darian',
		surname: 'Piro',
		phoneNumber: '030905884',
		email: 'random@gmail.com',
		street: 'Beispielstr. 9',
		zipCode: '01435',
		city: 'Berlin'
	},
	{
		name: 'Cassendre',
		surname: '',
		phoneNumber: '024188888',
		email: 'Cassendre89@gmail.net',
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

let nameList = function(){
	let printName = function(personId) {
		if (personId.surname === '' || personId.surname === undefined) return `<div class="name"><li class='container'><div><a href='#' class='name-link' id='${personId.name}'> ${personId.name}</a></div> <div><i class="fa fa-solid fa-gear edit button" id='${personId.name}'></i> <i class="fa fa-regular fa-trash delete button" id='${personId.name}'></i></li><hr class="small-line"></div>`;
		else return `<div class="name"><li class='container'><div><a href='#' class='name-link' id='${personId.name}'> ${personId.name} ${personId.surname} </a></div> <div><i class="fa fa-solid fa-gear edit button" id='${personId.name}'></i> <i class="fa fa-regular fa-trash delete button" id='${personId.name}'></i></div></li><hr class="small-line"></div>`;
	};
	let nameList = [];
	contacts.sort((a,b) => a.name.localeCompare(b.name));
	contacts.forEach(el => nameList.push(printName(el)));
	if (contacts.length == 0) return '<p class="center">Adressbook empty</p>'
	else return nameList.join('');
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
}

$('#list').html(nameList());

// ------ Search/Filter code inspired by this https://www.w3schools.com/jquery/jquery_filters.asp -------
$('#searchInput').on('keyup', function() {
  let input = $(this).val().toUpperCase();
  $("#list div").filter(function() {
  	$(this).toggle($(this).text().toUpperCase().indexOf(input) > -1)
  });
});

$(".top").on( "click", ".back", function() {
	$('.back').hide()
	$('#profile').hide();
	$('.profile-edit').hide();
	$('#save-contact').hide()
	$('.text-input').css("background-color", "transparent");
	$('#form input').not(':submit').val('')
	$('#form input').attr('readonly', false);
	$('.contacts-title').show()
	$('.search-bar').show();
	$('#adress-list').slideToggle( "fast" )
	$('#add-contact').show();
});

$(".main").on( "click", ".name-link", function() {
	fillForm(this)
	$('#form input').attr('readonly', true);
	$('.contacts-title').hide();
	$('.search-bar').hide();
	$('#adress-list').hide();
	$('#add-contact').hide();
	$('.back').show();
	$('#profile').slideToggle( "slow" )
	$('.profile-edit').show();
});

$(".main").on( "click", ".edit", function() {
	fillForm(this)
	$('#form input').attr('readonly', false);
	$('.text-input').css("background-color", "#EAEBEA");
	$('.contacts-title').hide();
	$('.search-bar').hide();
	$('#adress-list').hide();
	$('#add-contact').hide();
	$('.back').show();
	$('#profile').show('slow')
	$('#save-contact').show()
});

$(".main").on( "click", ".delete", function() {
	let personId = contacts.findIndex(x => x.name === $(this).attr('id'));
	contacts.splice(personId, 1);
	$('#list').html(nameList());
	$('#form input').not(':submit').val('')
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
	$('#list').html(nameList());
	$('.back').hide()
	$('#profile').hide();
	$('.profile-edit').hide();
	$('#save-contact').hide()
	$('.text-input').css("background-color", "transparent");
	$('#form input').not(':submit').val('')
	$('.contacts-title').show()
	$('.search-bar').show();
	$('#adress-list').slideToggle( "fast" )
	$('#add-contact').show();
	event.preventDefault();
});

$(".bottom").on( "click", "#add-contact", function() {
	$('#adress-list').hide();
	$('#add-contact').hide();
	$('.contacts-title').hide()
	$('#profile').show('slow')
	$('.back').show()
	$('#save-contact').show()
	$('.text-input').css("background-color", "#EAEBEA");
});

$(".bottom").on( "click", ".delete", function() {
	let personId = contacts.findIndex(x => x.name === $(this).attr('id'));
	contacts.splice(personId, 1);
	$('#list').html(nameList());
	$('.back').hide()
	$('#profile').hide();
	$('.profile-edit').hide();
	$('.text-input').css("background-color", "transparent");
	$('#form input').not(':submit').val('')
	$('.contacts-title').show()
	$('.search-bar').show();
	$('#adress-list').slideToggle( "fast" )
	$('#add-contact').show();
});

$(".bottom").on( "click", ".edit", function() {
		$('#form input').attr('readonly', false);
		$('.text-input').css("background-color", "#EAEBEA");
		$('.profile-edit').hide();
		$('#save-contact').show()
});
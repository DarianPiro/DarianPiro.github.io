$('.form').on('submit', function() {
	let $input = $(this).find('#usermsg').val();
	let $outgoing = $('#outgoing').clone();
	let $incoming = $('#incoming').clone();
	let time = new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"})
	if ($input === '') {} 
		else {
			$outgoing.find('.time-right').text(time)
			$incoming.find('.time-left').html('<b>Bot</b> '+ time)
			$outgoing.find('.message').text($input)
			$incoming.find('.answer').text('Answer')
			$outgoing.appendTo('.content')
			$incoming.appendTo('.content')
		}
	$('.form input').not(':submit').val('');
	event.preventDefault();
});

	

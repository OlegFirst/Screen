var gallery = null;

$(document).ready(function() {
	
	// Tag for save
	const targetTag = document.querySelector("html");
	gallery = document.querySelectorAll("#screenSaver>img");
	
	// Options
	const screenSaverOptions = {
		delay: 4000,
		interval: 4000,
		events: ["mosedown", "click", "mouseup", "focus", "blur", "mousemove", "keyup", "keydown", "keypressed"],
	}
	
	gallery.forEach((item) => {
		size(item);
	});
	
	// Screen saver class
	class screenSaver {		
		// - Constructor
		constructor(){
			this.waiter = null;
		}
		// - Create
		static create() {
			screenSaverOptions.events.forEach((item) => {
				targetTag.addEventListener(item, function() {
					screenSaver.stop();
				});
			});
		}
		// - Gallery show
		static start() {
			this.waiter = setTimeout(() => {
				$("#screenSaver").css('display', 'block');
				this.galleryShowing = setInterval(() => {
					let index = Math.round(Math.random()*(gallery.length-1));
					gallery.forEach((item) => {
						let status = $(item).css('display');
						if (status === 'block')
							$(item).fadeOut("slow");
					});
					$(gallery[index]).fadeIn("slow");
				}, screenSaverOptions.interval);
			}, screenSaverOptions.delay);
		}
		// - Waiter interrupted
		static stop() {
			clearTimeout(this.waiter);
			clearInterval(this.galleryShowing);
			$("#screenSaver").css('display', 'none');
			screenSaver.start();
		}
	}
	
	// Create screen saver`s instance
	new screenSaver();
	screenSaver.create();
	screenSaver.start();

	
	
	
	
	// Parameters
	$('button').on('click', function() {
		let par ={};
		par.delay = prompt("Please enter delay, seconds");
		par.interval = prompt("Please enter interval, seconds");
		if (par.delay !== null)
			if (par.delay > 0 )
				screenSaverOptions.delay = par.delay*1000;
			else
				par.delay = null;
		if (par.interval !== null)
		if (par.interval > 0 )
			screenSaverOptions.interval = par.interval*1000;
		else
			par.interval = null;
		if (par.delay === null || par.interval === null)
			alert ("Value of delay and(or) interval - wrong");
	});

});

// Correction screen and image size
function size(e) {
	e.classList.remove('proportion1');
	e.classList.remove('proportion2');
	let target = {
		width: window.innerWidth,
		height: window.innerHeight
	};
	let proportion = target.width / target.height;
	if (e.width/e.height > proportion) {
		e.classList.add('proportion1');
	}
	else {
		e.classList.add('proportion2');
	}	
}

$(window).resize(function() {
	gallery.forEach((item) => {
		size(item);
	});
});
document.getElementById('sequence').addEventListener('touchend', e => {
  	if(e.target && e.target.nodeName == 'LI') {
  		e.target.style.display = 'none';
  	}
    if (e.target && e.target.className == 'nextArrow') {
        e.target.parentElement.parentElement.style.display = 'none';
    }
    if (e.target && e.target.className == 'down') {
        e.target.parentElement.parentElement.parentElement.style.display = 'none';
    }
});

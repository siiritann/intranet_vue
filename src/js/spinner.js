
function spinner(element, text = undefined) {
    console.log('spinner')
    if (element.classList.contains('loading')) {
        element.innerHTML = text;
        element.disabled = false;
        element.classList.remove('loading')
    } else {
        element.classList.add('loading')
        element.disabled = true;
        element.innerHTML = "<div class='spinner-border text-info' role='status'><span class='visually-hidden'>Loading...</span></div>"
    }
    
}

export default spinner 
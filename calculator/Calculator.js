document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('input[type=button]');
    const display = document.querySelector('input[name=display]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if (this.value === 'AC') {
                display.value = '';
            } else if (this.value === 'DE') {
                display.value = display.value.slice(0, -1);
            } else if (this.value === '=') {
                try {
                    display.value = eval(display.value);
                } catch {
                    display.value = 'Error';
                }
            } else {
                display.value += this.value;
            }
        });
    });
});

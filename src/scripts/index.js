/* DOM */

userName = document.getElementById('username');
password = document.getElementById('password');
form = document.querySelector('.login-form')

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (userName.value  && password.value ) {
        if (userName.value === 'admin' && password.value === 'admin') {
            window.location.href = './admin.html';
        }
        else{
            window.location.href = './user.html';
        }
}})

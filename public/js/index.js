'use strict';

const btnSearch       = document.querySelector('.btn__search');
const btnSearchSubmit = document.querySelector('.btn__search--submit');

btnSearch.addEventListener('click', search);
btnSearchSubmit.addEventListener('click', search);

function search() {

    window.addEventListener('keyup', trackKeys);

    const inputSearchWrapper = document.querySelector('.input__search--wrapper');
    const searchInput        = inputSearchWrapper.querySelector('.input__search');

    if (inputSearchWrapper.classList.contains('d-none')) {
        inputSearchWrapper.classList.remove('d-none');
        btnSearch.classList.add('d-none');

    } else if (searchInput.value) {
    
        searchInput.value = '';
        window.location.href = 'category-all.html';

    } else {
        inputSearchWrapper.classList.add('d-none');
        btnSearch.classList.remove('d-none');
        window.removeEventListener('keyup', trackKeys);
    }
    
};

function trackKeys(e) {
    const inputSearchWrapper = document.querySelector('.input__search--wrapper');
    const searchInput        = document.querySelector('.input__search');

    if(searchInput.value && e.keyCode === 13)
        window.location.href = 'category-all.html';
    else if (e.keyCode === 27) {
        inputSearchWrapper.classList.add('d-none');
        btnSearch.classList.remove('d-none');
    }   
}

const basket = document.querySelector('.basket');

basket.addEventListener('click', function(){
    window.location.href = 'shopping-bag.html';
});


if(localStorage['poltavarost']){
    countProducts();
}

function countProducts() {
    const amount = document.querySelector('.amount');
    let amountValue = 0;
    JSON.parse(localStorage['poltavarost']).forEach(function(elem){
        amountValue += elem.amount;
    });
    amount.innerText = amountValue;
}

let ordersArr = [];
const btnAddToCart = document.querySelector('.btn__cart');

if (btnAddToCart)
    btnAddToCart.addEventListener('click', addItemToCart);

function addItemToCart() {
    const productName  = document.querySelector('.product__name').getAttribute('data').replace(/ /g, '_').toLowerCase();
    const productPrice = parseFloat(document.querySelector('.product__price').getAttribute('data'));

    const sizesList = document.querySelector('.sizes__list');
    const sizes     = sizesList.querySelectorAll('input');
    let productSize;

    for (let i = 0; i < sizes.length; i++) {

        let elem = sizes[i];

        if(elem.checked === true) {
            productSize = elem.getAttribute('id');

            if(!localStorage['poltavarost'] || JSON.parse(localStorage['poltavarost']).length === 0) {
                
                ordersArr.push({productName: productName, productPrice: productPrice, productSize: productSize, amount: 1});
                localStorage['poltavarost'] = JSON.stringify(ordersArr);
                document.querySelector('.amount').innerText = '1';
                elem.checked = false;

            } else if (JSON.parse(localStorage['poltavarost']).length !== 0) {
                
                ordersArr = JSON.parse(localStorage['poltavarost']);

                for (let i = 0; i < ordersArr.length; i++) {
                    let el = ordersArr[i];

                    if(el.productName === productName && el.productSize === productSize) {
                        el.amount++;
                        localStorage['poltavarost'] = JSON.stringify(ordersArr);
                        countProducts();
                        elem.checked = false;
                        return;
                    }
                }

                for (let i = 0; i < ordersArr.length; i++) {
                    let el = ordersArr[i];
                    if(el.productName === productName && el.productSize !== productSize) {
                        if (i === ordersArr.length - 1) {
                            ordersArr.push({productName: productName, productPrice: productPrice, productSize: productSize, amount: 1});
                            localStorage['poltavarost'] = JSON.stringify(ordersArr);
                            countProducts();
                            elem.checked = false;
                        }
                    }
                }

                for (let i = 0; i < ordersArr.length; i++) {
                    let el = ordersArr[i];
                    if(el.productName !== productName && el.productSize !== productSize) {
                        if (i === ordersArr.length - 1) {
                            ordersArr.push({productName: productName, productPrice: productPrice, productSize: productSize, amount: 1});
                            localStorage['poltavarost'] = JSON.stringify(ordersArr);
                            countProducts();
                            elem.checked = false;
                        }
                    }
                }
            }
        }
    }

    if (!productSize) {
        let alert       = document.createElement('div');
        let alertHeader = document.createElement('h4');

        alert.classList.add('alert');
        alertHeader.classList.add('alert__header');

        alertHeader.innerText = 'Choose the size firstly!';
        alert.appendChild(alertHeader);

        document.body.appendChild(alert);

        setTimeout(function(){
            document.body.removeChild(alert);
        }, 5000);
    }
}

const addEmail = document.querySelector('.btn-add');

if (addEmail)
    addEmail.addEventListener('click', function(){
        const subscribeInput = document.querySelector('.subscribe__input');

        subscribeInput.value = '';
    });
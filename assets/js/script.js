let formData = new FormData();

document.getElementById('submitMyApplication').addEventListener('submit', function(e) {
    e.stopPropagation();
    e.preventDefault();

    const element = e.submitter;
    element.disabled = true;

    const plan = document.getElementById('plan').textContent;
    const price = document.getElementById('planPrice').textContent;
    const ownerEmail = document.getElementById('ownerEmail').value;
    const appName = document.getElementById('appName').value;
    const dockerized = document.getElementById('dockerized').value;
    const notes = document.getElementById('notes').value;
    const yourApp = document.getElementById('yourApp');
    const file = yourApp.files[0];

    formData = new FormData();
    formData.append('plan', plan);
    formData.append('price', price);
    formData.append('ownerEmail', ownerEmail);
    formData.append('appName', appName);
    formData.append('dockerized', dockerized);
    formData.append('notes', notes);
    formData.append('yourApp', file);

    $('#submitRequirementsModal').modal('hide');
    $('#paymentModal').modal('show');

    element.disabled = false;
});

document.getElementById('paymentModal').addEventListener('submit', function(e) {
    e.stopPropagation();
    e.preventDefault();

    const element = e.submitter;
    const originalInnerHTML = element.innerHTML;
    element.innerHTML = '<div class="spinner-border" role="status"></div>';
    element.disabled = true;

    const paymentReceipt = document.getElementById('paymentReceipt');
    const file = paymentReceipt.files[0];

    formData.append('paymentReceipt', file);
    
    $('#submitRequirementsModal').modal('hide');

    fetch('https://host-api.ow3ndesu.com/host', {
        method: 'POST',
        body: formData,
    }).then(response => {
        if (response.ok) {
            response = response.json();

            element.innerHTML = originalInnerHTML;
            $('#paymentModal').modal('hide');
        }

        Swal.fire((response.ok ? 'Success!' : 'An Error Occurred!'), response.message, response.status);

        element.innerHTML = originalInnerHTML;
        element.disabled = false;
    }).catch(error => {
        Swal.fire('An Error Occurred!', error.responseText, 'error');
        element.innerHTML = originalInnerHTML;
        element.disabled = false;
    })
});

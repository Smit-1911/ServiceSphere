// Function to save a service to localStorage
function saveService(service) {
    let services = JSON.parse(localStorage.getItem('services')) || [];
    services.push(service);
    localStorage.setItem('services', JSON.stringify(services));
}

// Function to clear the form
function clearForm() {
    document.getElementById('providerForm').reset();
}

// Function to display services
function displayServices() {
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = ''; // Clear the list

    let services = JSON.parse(localStorage.getItem('services')) || [];
    services.forEach((service, index) => {
        const serviceHTML = `
            <div>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <p>Provider: ${service.provider}</p>
                <button onclick="deleteService(${index})">Delete</button>
            </div>
        `;
        servicesList.insertAdjacentHTML('beforeend', serviceHTML);
    });
}

// Function to delete a service
function deleteService(index) {
    let services = JSON.parse(localStorage.getItem('services')) || [];
    services.splice(index, 1);
    localStorage.setItem('services', JSON.stringify(services));
    displayServices(); // Update the display
}

document.getElementById('providerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceName = document.getElementById('serviceName').value;
    const serviceDescription = document.getElementById('serviceDescription').value;
    const serviceProvider = document.getElementById('serviceProvider').value;

    if (serviceName && serviceDescription && serviceProvider) {
        const service = {
            name: serviceName,
            description: serviceDescription,
            provider: serviceProvider
        };

        saveService(service);
        clearForm();
        displayServices(); // Update the services display
    } else {
        alert('Please fill in all fields.');
    }
});

// Display services on page load
displayServices();
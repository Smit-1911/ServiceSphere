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
                <button onclick="requestService(${index})">Request Service</button>
            </div>
        `;
        servicesList.insertAdjacentHTML('beforeend', serviceHTML);
    });
}

// Function to request a service
function requestService(index) {
    let services = JSON.parse(localStorage.getItem('services')) || [];
    const requestedService = services[index];

    // Here you can add logic to send a request to the provider
    // For demonstration, we'll just alert the service details
    // alert(Requesting service: ${requestedService.name} from ${requestedService.provider});

    // You can also add logic to save the requested service in a separate storage
    // For demonstration, we'll just log it to the console
    // console.log(Requested service: ${requestedService.name} from ${requestedService.provider});
}

// Display services on page load
displayServices();
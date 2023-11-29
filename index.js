// A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening.

const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events`;

let events = [];

const eventList = document.querySelector("#events");

async function render() {
    await getEvents();
    renderEvents();
}
render();

async function getEvents() {
    try {
        const response = await fetch(API_URL);
        const parties = await response.json();
        events = parties.data
        return events;
    } catch (error) {
        console.log(error);
    }
}

function renderEvents() {
    if (!events.length) {
        eventList.textContent = "No upcoming parties";
        return;
    }

    const eventInfo = events.map((event) => {
        const element = document.createElement("h3");
        element.innerHTML = `
            <h3>Event Name: ${event.name}</h3>
            <p>Date: ${event.date}</p>
            <p>Event Location: ${event.location}</p>
            <p>Description:</br>${event.description}</p></br>`

        return element;
    });
    eventList.replaceChildren(...eventInfo);
    console.log(events)
}

// function getDateTime () {
//     for (let i = 0; i<events.length, i++) {

//     }
// }

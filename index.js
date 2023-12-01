// A user enters the website and finds a list of the names, dates, times, locations, and descriptions of all the parties that are happening.
// Next to each party in the list is a delete button. The user clicks the delete button for one of the parties. That party is then removed from the list.
// There is also a form that allows the user to enter information about a new party that they want to schedule. After filling out the form and submitting it, the user observes their party added to the list of parties.

// GET - read information from an API
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-GHP-ET-WEB-FT-SF/events`;

let events = [];

const eventList = document.querySelector("#events");

const addParty = document.querySelector("#addParty");
addParty.addEventListener("submit", createEvent);

async function render() {
    await fetchEvents();
    renderEvents();
}
render();

// fetch events from the API
async function fetchEvents() {
    try {
        const response = await fetch(API_URL);
        const parties = await response.json();
        events = parties.data
        return events;
    } catch (error) {
        console.log(error);
    }
}

// POST - create events that will be added to the API
async function createEvent(ev) {
    ev.preventDefault();

    try {
        let dateTime = `${addParty.date.value}T${addParty.time.value}:00.000Z`
        const response = await fetch(API_URL, {
            method: "POST",
            // Good to have. Can copy paste
            headers: {
                "Content-Type": "application/json"
            }, // Saying that we're expecting json
            body: JSON.stringify({
                name: addParty.name.value,
                date: dateTime,
                location: addParty.location.value,
                description: addParty.description.value,
            }),
        });
        const createdEvent = await response.json();
        // console.log(createdEvent);
        // console.log(addParty.name.value)
        // console.log(addParty.date.value)
        // console.log(addParty.time.value)
        // console.log(dateTime)
        // console.log(addParty.location.value)
        // console.log(addParty.name.value)

        // if something is wrong, stop the execution and log the error
        if (!response.ok) {
            throw new Error("Failed to create event");
        }

        render();

    } catch (error) {
        console.log(error);
    }

}

// render the events so that they show up on the page
function renderEvents() {
    if (!events.length) {
        eventList.textContent = "No upcoming parties";
        return;
    }

    const eventInfo = events.map((event) => {
        const element = document.createElement("li");
        element.innerHTML = `
            <h3>Event Name: ${event.name}</h3>
            <p>Date: ${date(event.date)}</p>
            <p>Time: ${time(event.date)}</p>
            <p>Event Location: ${event.location}</p>
            <p>Description:</br>${event.description}</p></br>`

        // delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Event"
        element.append(deleteButton);

        // need to call the function since we are passing an argument
        deleteButton.addEventListener("click", () => deleteEvent(event.id));

        return element;
    });
    eventList.replaceChildren(...eventInfo);
    console.log(events)
}

// splits the date from the whole date key when received from the API
function date(str) {
    let date = str.slice(0, 10)
    return date;
}

// splits the time from the whole date key when received from the API
function time(str) {
    let time = str.slice(11, 16);
    return time;
}

// DELETE - delete events that will be removed to the API
async function deleteEvent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        render();
    } catch (error) {
        console.log(error)
    }
}
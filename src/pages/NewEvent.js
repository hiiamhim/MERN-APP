import EventForm from "../components/EventForm";


function NewEvent(){
    console.log("new event")
   
    return <EventForm method={"POST"}events={""}/>
    // return <h1>New event</h1>

}
export default NewEvent

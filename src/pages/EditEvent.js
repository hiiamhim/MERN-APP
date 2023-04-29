import EventForm  from "../components/EventForm"
import { useRouteLoaderData} from "react-router-dom"
 
function EditEventPage (){
    const event=useRouteLoaderData("event-detail")

    return <EventForm method={"PATCH"} events={event} ></EventForm>

}
export default EditEventPage 
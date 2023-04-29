import { Suspense } from "react"
import {Await, defer, json,redirect,useRouteLoaderData} from "react-router-dom"
import EventItem from "../components/EventItem"
import EventsList from "../components/EventsList"
function EventDetailPage(){
    const {event,events}=useRouteLoaderData("event-detail")

  return <>

  <Suspense fallback={<p style={{textAlign:"center"}}> ..Loading Single event</p>}>
    <Await resolve={event}>
    { event=> <EventItem event={event}/>}
    </Await>
  </Suspense>

  <Suspense fallback={<p style={{textAlign:"center"}}> ..Loading All events</p>}>
    <Await resolve={events}>
    { events=> <EventsList events={events}/>}
    </Await>
    </Suspense>
   
    </>

}
export default EventDetailPage


async  function loaderEvents(){
  console.log("loader")

  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
  //  throw new Response(JSON.stringify({message:"Cannot find the events"}),{status:500})
  throw json({message:"Cannot find the events"},{status:500})
  } else {
    
    const resData=await response.json()
    return resData.events
  }

}


async function loaderEvent(id){
  
 const response =await fetch("http://localhost:8080/events/" + id)
  if(!response.ok){
      throw json({message:"The detail youre trying to access is not getting fetched"},{status:500})
  }
  const res=await response.json()
  return res.event


}


export async function loader({request,params}){
    const id=params.id

    return defer({
      event: await loaderEvent(id),
      events:loaderEvents()
    })



}

export async function action({params,request}){
  const id=params.id
  const response=await  fetch("http://localhost:8080/events/" + id,{
    method:request.method
  })

  if(!response.ok){
    throw json({message:"Cannot delete the specified page"},{status:500})
}
return redirect("/events")
}
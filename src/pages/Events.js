import EventsList from '../components/EventsList';
import { useLoaderData ,json,defer, Await} from 'react-router-dom';
import { Suspense } from 'react';

function EventsPage() {
  const {events}=useLoaderData()
  console.log("events compo")
  
  return (
  
    <Suspense fallback={<p style={{textAlign:'center'}}>...Loading</p>}>
    <Await resolve={events}>
    {(loadevent)=><EventsList events={loadevent} />}
    </Await>
    </Suspense>
    
   
  );
}

export default EventsPage

async  function loaderEvent(){
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

export function loader(){
  return defer({
    events:loaderEvent()
})

}
import { Form, useNavigate ,useNavigation,useActionData,json,redirect} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, events }) {
  const data=useActionData()
  const navigate = useNavigate();
  const navigation=useNavigation()
  function cancelHandler() {
    navigate('..');
  }

  const state=navigation.state==="submitting"


  return (
    <Form  method={method}  className={classes.form}>

    
      {data && data.errors && (
        <ul>
       { Object.values(data.errors).map(err=>(<li key={err}>{err}</li>))}
        </ul>
      )}
     
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue={events.event ? events.event.title:""} required />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={events.event ? events.event.image:""}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue={events.event ? events.event.date:""} required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" defaultValue={events.event ? events.event.description:""} rows="5" required />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={state}>
          Cancel
        </button>
        <button >{ state? 'Submitting':'Save'}</button>
      </div>
    </Form>
  );
}



export default EventForm;

export  async function action({request,params,}){
 
  const data =await request.formData()
  
  const id=params.id
  const eventData={
      title:data.get("title"),
      image:data.get("image"),
      date:data.get("date"),
      description:data.get("description")
  }
   
  let url="http://localhost:8080/events"
   if(request.method==='PATCH'){
    url="http://localhost:8080/events/"+id;
   }
  const response=await fetch(url,{
      method:request.method,
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify(eventData)
  })

  if(response.status===422){
      return response

  }
  if(!response.ok){
      throw json({message:"Cannot transfer data"},{status:500})
  }

  return redirect("/events")

}

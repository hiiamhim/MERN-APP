import PageContent from "./PageContent"
import { useRouteError } from "react-router-dom"

function ErrorPage(){
    let error=useRouteError()
   
    let title="Error Occurred"
    let message="Cannot find the event"
    if(error.status===500){
        title="ERROR 500"
        message=error.data.message
    }
    if(error.status===404){
        title="ERROR 404"
        message="Cannot find the resource"
    }
   return <PageContent title={title}>
    <p>{message}</p>
    </PageContent>
}

export default ErrorPage
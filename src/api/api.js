/**
 * Created by Karo on 15.10.2017.
 */
import axios from 'axios'


export default function getEventsList(city) {
   return  axios.get(`https://www.eventbriteapi.com/v3/events/search/?location.address=${city}&expand=organizer%2Cvenue&token=YZ6KJWVMZEMOEH5CS7YS`)
}


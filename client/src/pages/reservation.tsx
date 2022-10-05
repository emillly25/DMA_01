import Layout from '../components/Layout'
import Map from '../components/reservation/Map'
import ReservationForm from '../components/reservation/ReservationForm'
export default function Reservation() {
  const LOCATION = {
    latitude: 37.277605531135805,
    longitude: 127.1539796272544,
  }
  return (
    <Layout>
      <div className="container mx-auto flex gap-5 flex-col md:flex-row mb-10 mt-3">
        <ReservationForm />
        <Map latitude={LOCATION.latitude} longitude={LOCATION.longitude} />
      </div>
    </Layout>
  )
}

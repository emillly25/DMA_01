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
      <h1 className="text-lg font-bold text-center py-5">상담예약</h1>
      <div className="container mx-auto flex gap-5 flex-col md:flex-row mb-10 ">
        <ReservationForm />
        <div className="w-full h-[400px]">
          <Map latitude={LOCATION.latitude} longitude={LOCATION.longitude} />
        </div>
      </div>
    </Layout>
  )
}

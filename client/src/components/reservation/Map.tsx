import { useEffect } from 'react'

interface MapProps {
  latitude: number
  longitude: number
}

export default function Map({ latitude, longitude }: MapProps) {
  useEffect(() => {
    //script태그를 만들어서 index.html의 head에 넣어주자
    const mapScript = document.createElement('script')
    mapScript.async = true
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`
    document.head.appendChild(mapScript)

    //지도를 생성해보자
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        //1. 지도넣을 div를 가져오고 option설정
        const container = document.getElementById('map')
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        }
        //2. 지도넣을 공간에 해당 option을 가지고 지도 만들기
        const map = new window.kakao.maps.Map(container, options)

        //3. 위도와 경도로 위치 찾기
        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude)

        //3-1. 지도 줌, 스카이뷰 기능 추가
        const mapTypeControl = new window.kakao.maps.MapTypeControl()
        map.addControl(
          mapTypeControl,
          window.kakao.maps.ControlPosition.TOPRIGHT,
        )
        const zoomControl = new window.kakao.maps.ZoomControl()
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT)

        //4. 찾은 위치에 마커 찍기
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })
        //5. 마커가 지도에 반영되도록 표시하기
        marker.setMap(map)
      })
    }
    //6. script가 읽어질때 위 함수 실행되도록, 로드가 끝나면 함수 종료
    mapScript.addEventListener('load', onLoadKakaoMap)
    return () => mapScript.removeEventListener('load', onLoadKakaoMap)
  }, [latitude, longitude])
  return (
    <div className="w-full h-[600px] p-3 md:w-[40%] ">
      <h2 className="font-bold text-lg text-center mb-3 md:text-2xl md:mb-5">
        오시는 길
      </h2>
      <div id="map" className="w-full h-[500px] "></div>
    </div>
  )
}

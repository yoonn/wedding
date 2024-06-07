
document.addEventListener("DOMContentLoaded", function(){
    addPhotos('photo_wedding', 'img/photos/', 'jpeg', 42);
    addPhotos('photo_snap', 'img/snap/', 'jpg', 82);
    addPhotos('photo_1st', 'img/1st/', 'jpeg', 2);
    getDDay();

    makeMap();
    Kakao.init('5b530fd96142df42568888e8aba54815'); // 사용하려는 앱의 JavaScript 키 입력
});

/*카카오 맵 불러오기*/
function makeMap() {
    var mapContainer = document.getElementById('map'),
        mapOption = {
            center: new kakao.maps.LatLng(37.517701, 126.899744),
            level: 5
        };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    map.setDraggable(false);
    map.setZoomable(false);

    var geocoderCenter = new kakao.maps.services.Geocoder();
    geocoderCenter.addressSearch('서울특별시 영등포구 문래로 175', function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var centerCords = new kakao.maps.LatLng(result[0].y, result[0].x);

            var geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch('서울특별시 영등포구 문래로 164 SK 리더스뷰 4층', function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var cords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    var marker = new kakao.maps.Marker({
                        map: map,
                        position: cords
                    });

                    var infowindow = new kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:center;padding:6px 0;font-size: 18px;">진현♡윤진<br/>JK아트컨벤션<br/>아트리움홀</div>'
                    });
                    infowindow.open(map, marker);

                    map.setCenter(centerCords);
                }
            });
        }
    });
}

/*지도 연결하기*/
function clickTMap() {
    location.href = "tmap://search?name=JK아트컨벤션";
}
function clickKaKaoNavi() {
    Kakao.Navi.start({
      name: 'JK아트컨벤션',
      x: 126.899744,
      y: 37.517701,
      coordType: 'wgs84',
    });
}
function clickNaverMap() {
    location.href = "https://naver.me/5GxkMFcq";
}
function clickKaKaoMap() {
    location.href = "https://map.kakao.com/link/map/19244225";
}

function addPhotos(elemId, dirPrefix, extension, photoCount) {
    const photoCarousel = document.getElementById(elemId);
    let photoHeight = 0;

    for (let i=1; i<=photoCount; i++ ) {
        const baseDiv = document.createElement("div");
        baseDiv.className = i == 1 ? "carousel-item active" : "carousel-item";

        const baseImg = document.createElement("img");
        baseImg.className = "w-100";
        baseImg.src = `${dirPrefix}${i}.${extension}`;

        if (i == 1) {
            const clientWidth = document.documentElement.clientWidth > 430 ? 430 : document.documentElement.clientWidth;
            const galleryPadding = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
            photoHeight = (clientWidth - galleryPadding) / 853 * 1280;
        }
        baseDiv.style.height = photoHeight + 'px';
        baseDiv.style.lineHeight = photoHeight + 'px';

        baseDiv.appendChild(baseImg);
        photoCarousel.appendChild(baseDiv);
    }
}

function copyUrl() {
    var tempElem = document.createElement('textarea');
    tempElem.value = document.location.href;
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);

    alert("청첩장 주소 복사완료!");
}

function getDDay() {
    const setDate = new Date("2023-05-28T00:00:00+0900");
    const now = new Date();
    const distance = setDate.getTime() - now.getTime();

    const day = -Math.floor(distance/(1000*60*60*24));
    const dDayElem = document.getElementById("dday");
    dDayElem.innerHTML = day + 1 + '일';
}

function shareMessage() {
    Kakao.Share.sendDefault({
        objectType: 'location',
        address: '서울특별시 영등포구 문래로 164 SK 리더스뷰 4층',
        addressTitle: 'JK아트컨벤션',
        content: {
            title: '진현♥︎윤진 결혼식에 초대합니다!',
            description: '2023년 05월 28일 오후 1시',
            imageUrl: 'https://yoonn.github.io/wedding/img/main_fade_out.png',
            link: {
                // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
                mobileWebUrl: 'https://yoonn.github.io/wedding',
                webUrl: 'https://yoonn.github.io/wedding',
            },
        },
        buttons: [
            {
                title: '청첩장 보기',
                link: {
                    mobileWebUrl: 'https://yoonn.github.io/wedding',
                    webUrl: 'https://yoonn.github.io/wedding',
                },
            },
        ],
    });
}

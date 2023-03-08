
document.addEventListener("DOMContentLoaded", function(){
    makeMap();
    addPhotos();
    getDDay();

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

    /*var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch('서울특별시 영등포구 문래로 164 SK 리더스뷰 4층', function(result, status) {
         if (status === kakao.maps.services.Status.OK) {
            var cords = new kakao.maps.LatLng(result[0].y, result[0].x);
            console.log(cords);
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
    });*/
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

function addPhotos() {
    const photoCarousel = document.getElementById("photoCarousel");

    const photoPrefix = 'img/photos/';
    const photoSuffix = '.jpeg';
    let photoName = '';
    let photoHeight = 0;

    for (let i=1; i<=42; i++ ) {
        const baseDiv = document.createElement("div");
        baseDiv.className = i == 1 ? "carousel-item active" : "carousel-item";

        photoName = photoPrefix + i + photoSuffix;

        const baseImg = document.createElement("img");
        baseImg.className = "d-block w-100";
        baseImg.src = photoName;

        // 608
        if (i == 1) {
            const clientWidth = document.documentElement.clientWidth > 430 ? 430 : document.documentElement.clientWidth;
            const galleryPadding = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.5;
            photoHeight = (clientWidth - galleryPadding) / 853 * 1280;
        }
        baseDiv.style.height = photoHeight + 'px';

        if (baseImg.height < baseImg.width) {
            baseImg.style.position = "absolute";
            baseImg.style.top = "25%";
        }

        baseDiv.appendChild(baseImg);
        photoCarousel.appendChild(baseDiv);
    }
}

function payLink(receiver) {
    let payLinkList = {
        'yj': 'https://qr.kakaopay.com/Ej9EyDt36',
        'jh': 'https://qr.kakaopay.com/Ej7p42wyT'
    };

    location.href = payLinkList[receiver];
}

function copyAccount(receiver) {
    let accountList = {
        'yj': '110235459512',
        'jh': '01031211578',
        'dg': '84907008765',
        'sa': '110048188537'
    };

    var tempElem = document.createElement('textarea');
    tempElem.value = accountList[receiver];
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand("copy");
    document.body.removeChild(tempElem);

    alert("계좌번호 복사완료!");
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
    const setDateYear = setDate.getFullYear();
    const setDateMonth = setDate.getMonth() + 1;
    const setDateDay = setDate.getDate();

    const now = new Date();

    const distance = setDate.getTime() - now.getTime();

    const day = Math.floor(distance/(1000*60*60*24));

    const dDayElem = document.getElementById("dday");
    dDayElem.innerHTML = day + '일';

//    const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
//    const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
//    const seconds = Math.floor((distance % (1000*60))/1000);

//    console.log(
//    `${setDateYear}년 ${setDateMonth}월 ${setDateDay}일까지
//      ${day}일
//      ${hours < 10 ? `0${hours}` : hours}시간
//      ${minutes < 10 ? `0${minutes}` : minutes}분
//      ${seconds < 10 ? `0${seconds}` : seconds}초 남았습니다.`);
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

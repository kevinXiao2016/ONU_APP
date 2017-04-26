function getUserAddress() {
    var map = new plus.maps.Map("map");
    map.getUserLocation(function(state, pos) {
        if(0 == state) {
            map.setCenter(pos);
            map.centerAndZoom(pos, 12);
            getUserGeo(pos)
        }
    })
}

function alertTest() {
    alert("11111111");
}

function getUserLocationWithoutMap() {
    alertTest()
    plus.geolocation.getCurrentPosition(function(p) {
        var pos = new plus.maps.Point(p.coords.longitude, p.coords.latitude);
        getUserGeo(pos);
    }, function(e) {
        alert("GeoLocation error: " + e.message)
    })
}

function getUserGeo(pt) {
    plus.maps.Map.reverseGeocode(pt, {}, function(event) {
        var address = event.address;
        getMapDetail(address);
    }, function(e) {
        alert(JSON.stringify(e))
    })
}

function getMapDetail(add) {
    mui.ajax('http://api.map.baidu.com/place/v2/search?query=' + add + '&region= &output=json&ak=aOZi2ycTnVHcwirh2CbiM1vW8shb97BQ&mcode=DA:6C:A0:CE:72:D5:81:09:7D:0B:57:0B:AD:A3:53:E5:5B:A9:E9:46;com.topvision.terminal', {
        dataType: 'json',
        type: 'post',
        timeout: 10000,
        //					data: {
        //						q: "饭店",
        //						region: "北京",
        //						output: 'json',
        //						ak:'aOZi2ycTnVHcwirh2CbiM1vW8shb97BQ',
        //						mcode:'DA:6C:A0:CE:72:D5:81:09:7D:0B:57:0B:AD:A3:53:E5:5B:A9:E9:46;com.topvision.terminal'
        //					},
        success: function(data) {
            myStorage.setItem("placeRecommend", JSON.stringify(data))
        },
        error: function(xhr, type, errorThrown) {
            alert("error: " + type)
        }
    })
}

function showPlaceRecommend() {
    var placeRec = JSON.parse(myStorage.getItem('placeRecommend'));
    if(placeRec) {
        var hl = document.getElementById("searchRecommend");
        hl.innerHTML = null;
        var html = template('searchPlaceList', {
            items: placeRec.results
        });
        hl.innerHTML = html;
    }
}

function backToPreconfig() {
    mui.openWindow({
        id: 'setting',
        url: '../setting/setting.html'
    });
}
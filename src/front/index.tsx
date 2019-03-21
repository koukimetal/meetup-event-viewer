import * as React from 'react';
const axios = require('axios'); // IDK why I can't compile
const ReactDOMServer = require('react-dom/server');

interface IProps {
    name: string;
    link: string;
    date: string;
}

const Content: React.SFC<IProps> = ({name, link, date}) => {
    return (
        <div>
            <div>{name}</div>
            <div>{date}</div>
            <div><a href={link} target="_blank">detail</a></div>
        </div>
    );
}

(window as any).initMap = async () => {
    const {data} = await axios.get('./events.json');

    const { google } = window as any;
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 35.6804054, lng: 139.7328307},
        zoom: 12
    });

    data.events.filter((event: any) => event.venue).forEach((event: any) => {
        const {name, local_date, local_time, link} = event;
        const {lat, lon} = event.venue;
        console.log(event);

        var infowindow = new google.maps.InfoWindow({
            content: ReactDOMServer.renderToString(<Content name={name} link={link} date={local_date + " " + local_time} />)
        });
        var marker = new google.maps.Marker({
            position: {lat: lat, lng: lon},
            map: map,
            title: name
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    })
}
